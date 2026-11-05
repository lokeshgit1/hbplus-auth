export const colors = {
  background: '#0F172A',       // Slate 900
  surface: '#1E293B',          // Slate 800
  surfaceElevated: '#334155',  // Slate 700
  border: '#334155',           // Slate 700
  borderLight: '#475569',      // Slate 600

  // Brand & Action
  primary: '#3B82F6',          // Blue 500
  primaryHover: '#2563EB',     // Blue 600
  primaryText: '#FFFFFF',

  // Semantic Status
  success: '#10B981',          // Emerald 500
  successBg: 'rgba(16, 185, 129, 0.12)',
  successBorder: '#059669',

  danger: '#EF4444',           // Red 500
  dangerBg: 'rgba(239, 68, 68, 0.12)',
  dangerBorder: '#DC2626',

  warning: '#F59E0B',          // Amber 500
  warningBg: 'rgba(245, 158, 11, 0.12)',
  warningBorder: '#D97706',

  // Typography
  textPrimary: '#F8FAFC',      // Slate 50
  textSecondary: '#94A3B8',    // Slate 400
  textMuted: '#64748B',        // Slate 500
  textInverse: '#0F172A',

  // Google Brand
  googleWhite: '#FFFFFF',
  googleText: '#1F1F1F',
  googleBorder: '#747775',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const typography = {
  fontFamily: 'System',
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 22,
    xxl: 28,
    display: 34,
  },
  fontWeight: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
};

export const borderRadius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};

export const layout = {
  minTouchTarget: 44,
  maxContentWidth: 440,
  maxDashboardWidth: 1080,
  breakpoints: {
    mobile: 640,
    tablet: 1024,
  },
};

export const shadows = {
  card: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  button: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
};
