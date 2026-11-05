import { isAllowedDomain, validateUserDomain } from '../src/utils/domainValidation';

describe('domainValidation', () => {
  describe('isAllowedDomain', () => {
    it('allows valid hbplus.fit email addresses', () => {
      expect(isAllowedDomain('employee@hbplus.fit')).toBe(true);
      expect(isAllowedDomain('john.doe@hbplus.fit')).toBe(true);
      expect(isAllowedDomain('admin.ops+tag@hbplus.fit')).toBe(true);
    });

    it('normalizes email casing and surrounding whitespace', () => {
      expect(isAllowedDomain('EMPLOYEE@HBPLUS.FIT')).toBe(true);
      expect(isAllowedDomain('  user@hbplus.fit  ')).toBe(true);
      expect(isAllowedDomain('Admin@HBPlus.Fit')).toBe(true);
    });

    it('rejects general public email providers', () => {
      expect(isAllowedDomain('employee@gmail.com')).toBe(false);
      expect(isAllowedDomain('user@yahoo.com')).toBe(false);
      expect(isAllowedDomain('person@outlook.com')).toBe(false);
      expect(isAllowedDomain('contact@icloud.com')).toBe(false);
    });

    it('rejects other organizational domains', () => {
      expect(isAllowedDomain('employee@anothercompany.com')).toBe(false);
      expect(isAllowedDomain('consultant@externalpartner.org')).toBe(false);
    });

    it('rejects subdomains of hbplus.fit', () => {
      expect(isAllowedDomain('employee@sub.hbplus.fit')).toBe(false);
      expect(isAllowedDomain('user@corp.hbplus.fit')).toBe(false);
    });

    it('rejects domain spoofing and suffix extension attacks', () => {
      expect(isAllowedDomain('employee@hbplus.fit.example.com')).toBe(false);
      expect(isAllowedDomain('hacker@hbplus.fit.attacker.org')).toBe(false);
      expect(isAllowedDomain('fake@fake-hbplus.fit')).toBe(false);
    });

    it('rejects malformed or empty email strings', () => {
      expect(isAllowedDomain('')).toBe(false);
      expect(isAllowedDomain('   ')).toBe(false);
      expect(isAllowedDomain('notanemail')).toBe(false);
      expect(isAllowedDomain('employee@')).toBe(false);
      expect(isAllowedDomain('@hbplus.fit')).toBe(false);
      expect(isAllowedDomain('user@hbplus@fit')).toBe(false);
      expect(isAllowedDomain(null as any)).toBe(false);
      expect(isAllowedDomain(undefined as any)).toBe(false);
    });
  });

  describe('validateUserDomain', () => {
    it('approves verified hbplus.fit users', () => {
      const result = validateUserDomain({
        email: 'employee@hbplus.fit',
        emailVerified: true,
      });

      expect(result.isValid).toBe(true);
      expect(result.errorCode).toBeUndefined();
    });

    it('rejects users with unverified emails even if domain matches', () => {
      const result = validateUserDomain({
        email: 'employee@hbplus.fit',
        emailVerified: false,
      });

      expect(result.isValid).toBe(false);
      expect(result.errorCode).toBe('EMAIL_INVALID');
      expect(result.message).toBe('Email address is not verified by Google.');
    });

    it('rejects unauthorized domains with the exact PRD mandated error message', () => {
      const result = validateUserDomain({
        email: 'user@gmail.com',
        emailVerified: true,
      });

      expect(result.isValid).toBe(false);
      expect(result.errorCode).toBe('DOMAIN_NOT_ALLOWED');
      expect(result.message).toBe(
        'Access restricted. Please login using your official domain email.'
      );
    });

    it('rejects missing or null email inputs', () => {
      expect(validateUserDomain(null).isValid).toBe(false);
      expect(validateUserDomain(undefined).isValid).toBe(false);
      expect(validateUserDomain({ email: null, emailVerified: true }).isValid).toBe(false);
      expect(validateUserDomain({ email: '', emailVerified: true }).isValid).toBe(false);
    });
  });
});
