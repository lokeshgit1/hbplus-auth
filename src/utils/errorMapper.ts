import { AuthErrorCode } from '../types/auth.types';

export interface MappedAuthError {
  code: AuthErrorCode;
  message: string;
  isRetryable: boolean;
  isSilent: boolean;
}

export function mapAuthError(rawError: unknown): MappedAuthError {
  if (!rawError) {
    return {
      code: 'UNKNOWN',
      message: 'An unexpected error occurred. Please try again.',
      isRetryable: true,
      isSilent: false,
    };
  }

  const errorObj = rawError as { code?: string; message?: string };
  const errorCode = errorObj.code || '';

  // 1. User cancellation
  if (
    errorCode === 'auth/popup-closed-by-user' ||
    errorCode === 'auth/cancelled-popup-request' ||
    errorCode === 'SIGN_IN_CANCELLED' ||
    errorCode === '12501' // Android Google Sign In cancelled code
  ) {
    return {
      code: 'CANCELLED',
      message: '',
      isRetryable: false,
      isSilent: true,
    };
  }

  // 2. Domain rejection
  if (errorCode === 'DOMAIN_NOT_ALLOWED') {
    return {
      code: 'DOMAIN_NOT_ALLOWED',
      message: 'Access restricted. Please login using your official domain email.',
      isRetryable: false,
      isSilent: false,
    };
  }

  // 3. Email verification / invalid
  if (errorCode === 'EMAIL_INVALID') {
    return {
      code: 'EMAIL_INVALID',
      message: 'Access restricted. Please login using your official domain email.',
      isRetryable: false,
      isSilent: false,
    };
  }

  // 4. Popup blocked by browser
  if (errorCode === 'auth/popup-blocked') {
    return {
      code: 'POPUP_BLOCKED',
      message: 'Pop-up window was blocked by your browser. Please allow pop-ups for this site and try again.',
      isRetryable: true,
      isSilent: false,
    };
  }

  // 5. Network issues
  if (errorCode === 'auth/network-request-failed') {
    return {
      code: 'NETWORK',
      message: 'Network connection failed. Please check your internet connection and retry.',
      isRetryable: true,
      isSilent: false,
    };
  }

  // 6. Session expiration
  if (errorCode === 'SESSION_EXPIRED' || errorCode === 'auth/user-token-expired') {
    return {
      code: 'SESSION_EXPIRED',
      message: 'Your session has expired. Please sign in again.',
      isRetryable: true,
      isSilent: false,
    };
  }

  // 7. Configuration errors
  if (
    errorCode === 'CONFIG' ||
    errorCode === 'auth/invalid-api-key' ||
    errorCode === 'auth/configuration-not-found' ||
    errorCode === 'auth/app-not-authorized'
  ) {
    if (typeof __DEV__ !== 'undefined' && __DEV__) {
      console.error('[Auth Diagnostics] Firebase Configuration Error:', errorObj);
    }
    return {
      code: 'CONFIG',
      message: 'Application authentication service is improperly configured. Please check environment variables.',
      isRetryable: false,
      isSilent: false,
    };
  }

  // Fallback unknown error
  if (typeof __DEV__ !== 'undefined' && __DEV__) {
    console.error('[Auth Diagnostics] Unhandled Authentication Error:', errorObj);
  }

  return {
    code: 'UNKNOWN',
    message: 'An unexpected authentication error occurred. Please try again.',
    isRetryable: true,
    isSilent: false,
  };
}
