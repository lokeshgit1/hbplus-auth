import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
  ReactNode,
} from 'react';
import {
  AuthStatus,
  AuthErrorCode,
  AppUser,
  AuthContextValue,
} from '../types/auth.types';
import * as authService from '../services/authService';
import { validateUserDomain } from '../utils/domainValidation';
import { syncUserProfile } from '../services/userService';

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [status, setStatus] = useState<AuthStatus>('initializing');
  const [user, setUser] = useState<AppUser | null>(null);
  const [error, setError] = useState<AuthErrorCode | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isAuthenticatingRef = useRef(false);

  // Restore existing session and observe auth changes
  useEffect(() => {
    const unsubscribe = authService.subscribeToAuthChanges(async (firebaseUser) => {
      // If we are actively in the middle of a sign-in operation, let signIn() drive the transitions
      if (isAuthenticatingRef.current) {
        return;
      }

      if (!firebaseUser) {
        setUser(null);
        setStatus('unauthenticated');
        return;
      }

      setStatus('authorizing');

      // Re-validate domain on restored session
      const domainCheck = validateUserDomain({
        email: firebaseUser.email,
        emailVerified: firebaseUser.emailVerified,
      });

      if (!domainCheck.isValid) {
        // Immediate signout on domain rejection
        await authService.signOut();
        setUser(null);
        setError('DOMAIN_NOT_ALLOWED');
        setErrorMessage(
          domainCheck.message ||
            'Access restricted. Please login using your official domain email.'
        );
        setStatus('rejected');
        return;
      }

      // Sync user profile & fetch role
      let userRole: 'admin' | 'user' = 'user';
      try {
        const profile = await syncUserProfile(firebaseUser);
        userRole = profile.role;
      } catch (e) {
        if (typeof __DEV__ !== 'undefined' && __DEV__) {
          console.warn('[AuthContext] Session restore profile sync warning:', e);
        }
      }

      setUser({
        uid: firebaseUser.uid,
        displayName: firebaseUser.displayName,
        email: firebaseUser.email,
        photoURL: firebaseUser.photoURL,
        emailVerified: firebaseUser.emailVerified,
        role: userRole,
      });
      setError(null);
      setErrorMessage(null);
      setStatus('authorized');
    });

    return () => unsubscribe();
  }, []);

  const signIn = useCallback(async () => {
    // Re-entrancy guard
    if (isAuthenticatingRef.current || status === 'authenticating') {
      return;
    }

    isAuthenticatingRef.current = true;
    setStatus('authenticating');
    setError(null);
    setErrorMessage(null);

    try {
      const result = await authService.signInWithGoogle();

      if (result.type === 'authorized') {
        setUser(result.user);
        setError(null);
        setErrorMessage(null);
        setStatus('authorized');
      } else if (result.type === 'rejected') {
        setUser(null);
        setError('DOMAIN_NOT_ALLOWED');
        setErrorMessage(result.reason);
        setStatus('rejected');
      } else if (result.type === 'cancelled') {
        setStatus('unauthenticated');
      } else if (result.type === 'error') {
        setUser(null);
        setError(result.code);
        setErrorMessage(result.message);
        setStatus('error');
      }
    } catch (e: any) {
      setUser(null);
      setError('UNKNOWN');
      setErrorMessage('An unexpected error occurred. Please try again.');
      setStatus('error');
    } finally {
      isAuthenticatingRef.current = false;
    }
  }, [status]);

  const signOut = useCallback(async () => {
    setStatus('initializing');
    try {
      await authService.signOut();
    } finally {
      setUser(null);
      setError(null);
      setErrorMessage(null);
      setStatus('unauthenticated');
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
    setErrorMessage(null);
    if (status === 'rejected' || status === 'error') {
      setStatus('unauthenticated');
    }
  }, [status]);

  const isLoading =
    status === 'initializing' ||
    status === 'authenticating' ||
    status === 'authorizing';

  const isAdmin = user?.role === 'admin';

  const contextValue: AuthContextValue = {
    status,
    user: status === 'authorized' ? user : null,
    error,
    errorMessage,
    isLoading,
    isAdmin,
    signIn,
    signOut,
    clearError,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
