import {
  User as FirebaseUser,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  getRedirectResult,
  Unsubscribe,
} from 'firebase/auth';
import { Platform } from 'react-native';
import { auth } from './firebase';
import { signInWithGoogleWeb } from './googleAuth.web';
import { signInWithGoogleNative } from './googleAuth.native';
import { validateUserDomain } from '../utils/domainValidation';
import { mapAuthError } from '../utils/errorMapper';
import { syncUserProfile } from './userService';
import { AppUser, AuthResult } from '../types/auth.types';

/**
 * Initiates platform-specific Google Sign-In, validates the email domain,
 * synchronizes the user profile in Firestore, and enforces immediate sign-out
 * if the domain check fails.
 */
export async function signInWithGoogle(): Promise<AuthResult> {
  try {
    const credential =
      Platform.OS === 'web'
        ? await signInWithGoogleWeb()
        : await signInWithGoogleNative();

    const firebaseUser = credential.user;

    // Immediate domain validation
    const domainCheck = validateUserDomain({
      email: firebaseUser.email,
      emailVerified: firebaseUser.emailVerified,
    });

    if (!domainCheck.isValid) {
      // Immediate rejection sign-out (SEC-07): Do not leave user authenticated in Firebase
      await firebaseSignOut(auth);
      return {
        type: 'rejected',
        reason: domainCheck.message || 'Access restricted. Please login using your official domain email.',
        email: firebaseUser.email || undefined,
      };
    }

    // Synchronize Firestore profile & resolve assigned role
    let userRole: 'admin' | 'user' = 'user';
    try {
      const profile = await syncUserProfile(firebaseUser);
      userRole = profile.role;
    } catch (profileError) {
      if (typeof __DEV__ !== 'undefined' && __DEV__) {
        console.warn('[Profile Sync Warning] Could not sync user profile with Firestore:', profileError);
      }
    }

    const appUser: AppUser = {
      uid: firebaseUser.uid,
      displayName: firebaseUser.displayName,
      email: firebaseUser.email,
      photoURL: firebaseUser.photoURL,
      emailVerified: firebaseUser.emailVerified,
      role: userRole,
    };

    return {
      type: 'authorized',
      user: appUser,
    };
  } catch (error: any) {
    const mapped = mapAuthError(error);

    if (mapped.code === 'CANCELLED') {
      return { type: 'cancelled' };
    }

    return {
      type: 'error',
      code: mapped.code,
      message: mapped.message,
    };
  }
}

/**
 * Signs the user out of Firebase Authentication and clears session tokens.
 */
export async function signOut(): Promise<void> {
  await firebaseSignOut(auth);
}

/**
 * Returns the current authenticated Firebase user.
 */
export function getCurrentUser(): FirebaseUser | null {
  return auth.currentUser;
}

/**
 * Subscribes to Firebase Authentication state change events.
 */
export function subscribeToAuthChanges(
  callback: (user: FirebaseUser | null) => void
): Unsubscribe {
  if (Platform.OS === 'web') {
    try {
      getRedirectResult(auth).catch(() => {});
    } catch (_) {}
  }
  return onAuthStateChanged(auth, callback);
}
