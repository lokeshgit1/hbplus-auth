export const colors = {
  background: '#090D16',       // Deep midnight canvas for glassmorphism
  surface: '#151D30',          // Deep tinted glass surface
  surfaceElevated: '#1E293B',  // Slate 800
  border: 'rgba(255, 255, 255, 0.10)',
  borderLight: 'rgba(255, 255, 255, 0.18)',

  // Glass tokens
  glassSurface: 'rgba(21, 29, 48, 0.65)',
  glassCard: 'rgba(27, 38, 59, 0.55)',
  glassCardHover: 'rgba(37, 51, 78, 0.70)',
  glassElevated: 'rgba(30, 41, 59, 0.50)',
  glassBorder: 'rgba(255, 255, 255, 0.12)',
  glassBorderLight: 'rgba(255, 255, 255, 0.24)',
  glassBorderSubtle: 'rgba(255, 255, 255, 0.06)',
  glassBorderAccent: 'rgba(96, 165, 250, 0.40)',
  glassBorderSuccess: 'rgba(52, 211, 153, 0.40)',
  glassBorderDanger: 'rgba(248, 113, 113, 0.40)',
  glassHighlight: 'rgba(255, 255, 255, 0.05)',
  glassInput: 'rgba(11, 16, 27, 0.60)',

  // Ambient Aura & Glow Orbs
  ambientOrbBlue: 'rgba(59, 130, 246, 0.22)',
  ambientOrbViolet: 'rgba(139, 92, 246, 0.20)',
  ambientOrbCyan: 'rgba(6, 182, 212, 0.18)',
  ambientOrbEmerald: 'rgba(16, 185, 129, 0.16)',

  // Brand & Action
  primary: '#3B82F6',          // Blue 500
  primaryHover: '#2563EB',     // Blue 600
  primaryGlow: '#60A5FA',      // Blue 400
  primaryText: '#FFFFFF',

  // Semantic Status
  success: '#10B981',          // Emerald 500
  successGlow: '#34D399',
  successBg: 'rgba(16, 185, 129, 0.12)',
  successBorder: 'rgba(52, 211, 153, 0.35)',

  danger: '#EF4444',           // Red 500
  dangerGlow: '#F87171',
  dangerBg: 'rgba(239, 68, 68, 0.14)',
  dangerBorder: 'rgba(248, 113, 113, 0.35)',

  warning: '#F59E0B',          // Amber 500
  warningBg: 'rgba(245, 158, 11, 0.14)',
  warningBorder: 'rgba(251, 191, 36, 0.35)',

  // Typography
  textPrimary: '#F8FAFC',      // Slate 50
  textSecondary: '#94A3B8',    // Slate 400
  textMuted: '#64748B',        // Slate 500
  textInverse: '#0F172A',

  // Google Brand
  googleWhite: '#FFFFFF',
  googleText: '#1F1F1F',
  googleBorder: 'rgba(255, 255, 255, 0.25)',
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
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 20,
    elevation: 8,
  },
  cardGlow: {
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 10,
  },
  button: {
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  glass: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.45,
    shadowRadius: 28,
    elevation: 12,
  },
};

export const glassStyles = {
  backdropBlur: {
    // For React Native Web, backdropFilter applies cleanly
    // For iOS and Android, the semi-transparent dark slate surface provides the sleek glass look
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
  } as any,
};
