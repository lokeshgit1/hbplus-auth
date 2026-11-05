import { UserRole } from './user.types';

export type AuthStatus =
  | 'initializing'
  | 'unauthenticated'
  | 'authenticating'
  | 'authorizing'
  | 'authorized'
  | 'rejected'
  | 'error';

export type AuthErrorCode =
  | 'DOMAIN_NOT_ALLOWED'
  | 'EMAIL_INVALID'
  | 'CANCELLED'
  | 'NETWORK'
  | 'POPUP_BLOCKED'
  | 'SESSION_EXPIRED'
  | 'CONFIG'
  | 'UNKNOWN';

export interface AppUser {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  emailVerified: boolean;
  role: UserRole;
}

export type AuthResult =
  | { type: 'authorized'; user: AppUser }
  | { type: 'rejected'; reason: string; email?: string }
  | { type: 'cancelled' }
  | { type: 'error'; code: AuthErrorCode; message: string };

export interface AuthContextValue {
  status: AuthStatus;
  user: AppUser | null;
  error: AuthErrorCode | null;
  errorMessage: string | null;
  isLoading: boolean;
  isAdmin: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  clearError: () => void;
}
