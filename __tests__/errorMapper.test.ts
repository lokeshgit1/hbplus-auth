import { mapAuthError } from '../src/utils/errorMapper';

describe('errorMapper', () => {
  it('maps popup closed / cancelation to silent CANCELLED code', () => {
    const error1 = mapAuthError({ code: 'auth/popup-closed-by-user' });
    expect(error1.code).toBe('CANCELLED');
    expect(error1.isSilent).toBe(true);

    const error2 = mapAuthError({ code: 'auth/cancelled-popup-request' });
    expect(error2.code).toBe('CANCELLED');
    expect(error2.isSilent).toBe(true);

    const error3 = mapAuthError({ code: 'SIGN_IN_CANCELLED' });
    expect(error3.code).toBe('CANCELLED');
    expect(error3.isSilent).toBe(true);
  });

  it('maps DOMAIN_NOT_ALLOWED to the exact PRD required restriction message', () => {
    const error = mapAuthError({ code: 'DOMAIN_NOT_ALLOWED' });
    expect(error.code).toBe('DOMAIN_NOT_ALLOWED');
    expect(error.message).toBe(
      'Access restricted. Please login using your official domain email.'
    );
    expect(error.isRetryable).toBe(false);
    expect(error.isSilent).toBe(false);
  });

  it('maps popup-blocked to informative browser instruction', () => {
    const error = mapAuthError({ code: 'auth/popup-blocked' });
    expect(error.code).toBe('POPUP_BLOCKED');
    expect(error.message).toContain('Pop-up window was blocked');
    expect(error.isRetryable).toBe(true);
  });

  it('maps network failures to retryable message', () => {
    const error = mapAuthError({ code: 'auth/network-request-failed' });
    expect(error.code).toBe('NETWORK');
    expect(error.isRetryable).toBe(true);
    expect(error.message).toContain('Network connection failed');
  });

  it('maps configuration errors safely without leaking internal secrets', () => {
    const error = mapAuthError({ code: 'auth/invalid-api-key' });
    expect(error.code).toBe('CONFIG');
    expect(error.message).toContain('improperly configured');
  });

  it('handles unknown errors gracefully with a safe fallback', () => {
    const error = mapAuthError({ code: 'unexpected_crash_123', message: 'secret server error' });
    expect(error.code).toBe('UNKNOWN');
    expect(error.message).toContain('An unexpected authentication error occurred');
    expect(error.message).not.toContain('secret server error');
  });
});
