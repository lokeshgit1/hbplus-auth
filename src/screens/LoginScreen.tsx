import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
  SafeAreaView,
  Platform,
  TouchableOpacity,
  Image,
  Linking,
} from 'react-native';
import { useAuth } from '../hooks/useAuth';
import { GoogleSignInButton } from '../components/GoogleSignInButton';
import { ErrorMessage } from '../components/ErrorMessage';
import {
  colors,
  spacing,
  borderRadius,
  typography,
  layout,
  shadows,
} from '../styles/theme';

export const LoginScreen: React.FC = () => {
  const { width } = useWindowDimensions();
  const { signIn, isLoading, errorMessage, clearError, error } = useAuth();

  const isDesktop = width >= layout.breakpoints.tablet;

  const handleOpenRepo = () => {
    Linking.openURL('https://github.com/lokeshgit1/hbplus-auth');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Ambient Atmospheric Luminous Orbs for Glass Refraction */}
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        <View style={styles.ambientOrbTop} />
        <View style={styles.ambientOrbRight} />
        <View style={styles.ambientOrbBottom} />
      </View>

      {/* Top Right GitHub Repository Link */}
      <View style={styles.topRightHeader}>
        <TouchableOpacity
          style={styles.repoButton}
          onPress={handleOpenRepo}
          activeOpacity={0.75}
          accessibilityRole="link"
          accessibilityLabel="Project repo on GitHub"
        >
          <Image
            source={require('../../assets/github-mark.png')}
            style={styles.repoIcon}
            resizeMode="contain"
          />
          <Text style={styles.repoButtonText}>Project repo</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View
          style={[
            styles.card,
            isDesktop ? styles.cardDesktop : styles.cardMobile,
          ]}
        >
          {/* Top Specular Sheen Highlight */}
          <View style={styles.specularTopLine} />

          {/* Brand Logo & Header */}
          <View style={styles.headerContainer}>
            <View style={styles.logoHalo}>
              <View style={styles.logoBadge}>
                <Text style={styles.logoText}>HB+</Text>
              </View>
            </View>
            <Text style={styles.appTitle}>HB Plus</Text>
            <View style={styles.domainPill}>
              <View style={styles.pulseDot} />
              <Text style={styles.domainPillText}>@hbplus.fit ONLY</Text>
            </View>
          </View>

          {/* Welcome Text */}
          <View style={styles.contentContainer}>
            <Text style={styles.heading}>Welcome Back</Text>
            <Text style={styles.subheading}>
              Sign in using your official organizational Google account to access your workspace.
            </Text>
          </View>

          {/* Error Banner */}
          {errorMessage ? (
            <ErrorMessage
              message={errorMessage}
              onRetry={error === 'NETWORK' ? signIn : undefined}
              onDismiss={clearError}
              isRetryable={error === 'NETWORK'}
            />
          ) : null}

          {/* Action Button */}
          <View style={styles.actionContainer}>
            <GoogleSignInButton
              onPress={signIn}
              isLoading={isLoading}
              disabled={isLoading}
            />
          </View>

          {/* Domain Restriction Notice */}
          <View style={styles.noticeContainer}>
            <View style={styles.noticeIconWrapper}>
              <Text style={styles.noticeIcon}>🔒</Text>
            </View>
            <Text style={styles.noticeText}>
              Access is strictly restricted to verified{' '}
              <Text style={styles.highlightText}>@hbplus.fit</Text> accounts. Personal accounts will be denied.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  // Top Right GitHub Repository Link
  topRightHeader: {
    position: 'absolute',
    top: Platform.OS === 'web' ? spacing.lg : spacing.md,
    right: Platform.OS === 'web' ? spacing.lg : spacing.md,
    zIndex: 20,
  },
  repoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.glassSurface,
    borderColor: colors.glassBorderLight,
    borderWidth: 1,
    borderRadius: borderRadius.full,
    paddingHorizontal: spacing.md,
    paddingVertical: 7,
    ...shadows.button,
    ...Platform.select({
      web: {
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        cursor: 'pointer',
      } as any,
    }),
  },
  repoIcon: {
    width: 18,
    height: 18,
    marginRight: spacing.sm,
    tintColor: '#FFFFFF',
  },
  repoButtonText: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.semibold,
    letterSpacing: 0.3,
  },
  // Ambient Glowing Orbs behind the Glass Card
  ambientOrbTop: {
    position: 'absolute',
    top: -60,
    left: '15%',
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: colors.ambientOrbBlue,
    ...Platform.select({
      web: { filter: 'blur(75px)' } as any,
      default: { opacity: 0.6 },
    }),
  },
  ambientOrbRight: {
    position: 'absolute',
    top: '35%',
    right: -40,
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: colors.ambientOrbViolet,
    ...Platform.select({
      web: { filter: 'blur(80px)' } as any,
      default: { opacity: 0.5 },
    }),
  },
  ambientOrbBottom: {
    position: 'absolute',
    bottom: -50,
    left: '25%',
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: colors.ambientOrbCyan,
    ...Platform.select({
      web: { filter: 'blur(70px)' } as any,
      default: { opacity: 0.4 },
    }),
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.md,
    paddingTop: Platform.OS === 'web' ? spacing.md : spacing.xl,
  },
  card: {
    backgroundColor: colors.glassCard,
    borderColor: colors.glassBorder,
    borderWidth: 1.5,
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    alignItems: 'center',
    width: '100%',
    overflow: 'hidden',
    position: 'relative',
    ...shadows.glass,
    ...Platform.select({
      web: {
        backdropFilter: 'blur(28px)',
        WebkitBackdropFilter: 'blur(28px)',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.12)',
      } as any,
    }),
  },
  cardDesktop: {
    maxWidth: layout.maxContentWidth,
    padding: spacing.xxl,
  },
  cardMobile: {
    maxWidth: '100%',
  },
  specularTopLine: {
    position: 'absolute',
    top: 0,
    left: 20,
    right: 20,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.22)',
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  logoHalo: {
    padding: 3,
    borderRadius: borderRadius.xl,
    backgroundColor: 'rgba(59, 130, 246, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(96, 165, 250, 0.35)',
    marginBottom: spacing.sm,
    ...shadows.button,
  },
  logoBadge: {
    width: 60,
    height: 60,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.button,
  },
  logoText: {
    color: colors.primaryText,
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    letterSpacing: 0.5,
  },
  appTitle: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.bold,
    fontFamily: typography.fontFamily,
    letterSpacing: -0.5,
  },
  domainPill: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.xs,
    paddingHorizontal: spacing.md,
    paddingVertical: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: colors.glassBorderLight,
  },
  pulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.success,
    marginRight: 6,
    ...Platform.select({
      web: { boxShadow: '0 0 6px #10B981' } as any,
    }),
  },
  domainPillText: {
    color: colors.primaryGlow,
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.bold,
    letterSpacing: 0.8,
  },
  contentContainer: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  heading: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    marginBottom: spacing.xs,
    textAlign: 'center',
    letterSpacing: -0.3,
  },
  subheading: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.sm,
    lineHeight: typography.fontSize.sm * typography.lineHeight.normal,
    textAlign: 'center',
    paddingHorizontal: spacing.sm,
  },
  actionContainer: {
    width: '100%',
    marginTop: spacing.sm,
    marginBottom: spacing.lg,
  },
  noticeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.glassInput,
    borderColor: colors.glassBorderSubtle,
    borderWidth: 1,
    borderLeftWidth: 3,
    borderLeftColor: colors.primaryGlow,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    width: '100%',
  },
  noticeIconWrapper: {
    marginRight: spacing.sm,
  },
  noticeIcon: {
    fontSize: 14,
  },
  noticeText: {
    flex: 1,
    color: colors.textMuted,
    fontSize: typography.fontSize.xs,
    lineHeight: typography.fontSize.xs * typography.lineHeight.normal,
  },
  highlightText: {
    color: colors.primaryGlow,
    fontWeight: typography.fontWeight.semibold,
  },
});
