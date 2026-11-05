import { ALLOWED_DOMAIN } from '../constants/config';

/**
 * Validates whether an email string strictly belongs to the allowed organizational domain.
 * Rules:
 * - Must be a valid string with exactly one '@' character.
 * - Both local part and domain part must be non-empty.
 * - Domain part must match ALLOWED_DOMAIN exactly (case-insensitive, normalized).
 * - Subdomains (e.g. employee@sub.hbplus.fit) or spoofed suffixes (e.g. hbplus.fit.evil.com) are rejected.
 */
export function isAllowedDomain(email: string | null | undefined): boolean {
  if (!email || typeof email !== 'string') {
    return false;
  }

  const normalizedEmail = email.trim().toLowerCase();
  const emailParts = normalizedEmail.split('@');

  if (emailParts.length !== 2) {
    return false;
  }

  const [localPart, domainPart] = emailParts;

  if (!localPart || !domainPart) {
    return false;
  }

  // Exact complete domain match required
  return domainPart === ALLOWED_DOMAIN.toLowerCase().trim();
}

export interface DomainCheckInput {
  email: string | null | undefined;
  emailVerified: boolean;
}

export interface DomainValidationResult {
  isValid: boolean;
  errorCode?: 'DOMAIN_NOT_ALLOWED' | 'EMAIL_INVALID';
  message?: string;
}

/**
 * Evaluates an authenticated user's email and verification status.
 */
export function validateUserDomain(user: DomainCheckInput | null | undefined): DomainValidationResult {
  if (!user || !user.email) {
    return {
      isValid: false,
      errorCode: 'EMAIL_INVALID',
      message: 'Email address is missing or unavailable.',
    };
  }

  if (!user.emailVerified) {
    return {
      isValid: false,
      errorCode: 'EMAIL_INVALID',
      message: 'Email address is not verified by Google.',
    };
  }

  if (!isAllowedDomain(user.email)) {
    return {
      isValid: false,
      errorCode: 'DOMAIN_NOT_ALLOWED',
      message: 'Access restricted. Please login using your official domain email.',
    };
  }

  return { isValid: true };
}
