import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
  SafeAreaView,
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

  return (
    <SafeAreaView style={styles.safeArea}>
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
          {/* Brand Logo & Header */}
          <View style={styles.headerContainer}>
            <View style={styles.logoBadge}>
              <Text style={styles.logoText}>HB+</Text>
            </View>
            <Text style={styles.appTitle}>HB Plus</Text>
            <View style={styles.domainPill}>
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
            <Text style={styles.noticeText}>
              🔒 Access is strictly restricted to verified <Text style={styles.highlightText}>@hbplus.fit</Text> Google accounts. Personal accounts will be denied.
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
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.md,
  },
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    alignItems: 'center',
    width: '100%',
    ...shadows.card,
  },
  cardDesktop: {
    maxWidth: layout.maxContentWidth,
    padding: spacing.xxl,
  },
  cardMobile: {
    maxWidth: '100%',
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  logoBadge: {
    width: 64,
    height: 64,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
    ...shadows.button,
  },
  logoText: {
    color: colors.primaryText,
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
  },
  appTitle: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.bold,
    fontFamily: typography.fontFamily,
  },
  domainPill: {
    marginTop: spacing.xs,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    backgroundColor: colors.surfaceElevated,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  domainPillText: {
    color: colors.primary,
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.semibold,
    letterSpacing: 0.5,
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
    marginTop: spacing.md,
    marginBottom: spacing.lg,
  },
  noticeContainer: {
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: borderRadius.md,
    padding: spacing.sm,
    width: '100%',
  },
  noticeText: {
    color: colors.textMuted,
    fontSize: typography.fontSize.xs,
    lineHeight: typography.fontSize.xs * typography.lineHeight.normal,
    textAlign: 'center',
  },
  highlightText: {
    color: colors.primary,
    fontWeight: typography.fontWeight.semibold,
  },
});
