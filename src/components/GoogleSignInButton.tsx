import React from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { colors, spacing, borderRadius, typography, layout, shadows } from '../styles/theme';

export interface GoogleSignInButtonProps {
  onPress: () => void;
  isLoading?: boolean;
  disabled?: boolean;
}

export const GoogleSignInButton: React.FC<GoogleSignInButtonProps> = ({
  onPress,
  isLoading = false,
  disabled = false,
}) => {
  const isButtonDisabled = disabled || isLoading;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        isButtonDisabled && styles.buttonDisabled,
      ]}
      onPress={onPress}
      disabled={isButtonDisabled}
      activeOpacity={0.85}
      accessibilityRole="button"
      accessibilityLabel="Continue with Google"
      testID="google-sign-in-button"
    >
      <View style={styles.content}>
        {isLoading ? (
          <ActivityIndicator size="small" color={colors.googleText} style={styles.spinner} />
        ) : (
          <View style={styles.iconContainer}>
            <Text style={styles.googleG}>G</Text>
          </View>
        )}
        <Text style={[styles.text, isButtonDisabled && styles.textDisabled]}>
          {isLoading ? 'Signing in...' : 'Continue with Google'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.googleWhite,
    borderColor: colors.googleBorder,
    borderWidth: 1,
    borderRadius: borderRadius.md,
    minHeight: layout.minTouchTarget,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    ...shadows.button,
  },
  buttonDisabled: {
    opacity: 0.6,
    backgroundColor: '#E2E8F0',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    width: 24,
    height: 24,
    borderRadius: borderRadius.full,
    backgroundColor: '#EA4335',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  googleG: {
    color: '#FFFFFF',
    fontWeight: typography.fontWeight.bold,
    fontSize: 14,
  },
  spinner: {
    marginRight: spacing.md,
  },
  text: {
    color: colors.googleText,
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semibold,
    fontFamily: typography.fontFamily,
  },
  textDisabled: {
    color: colors.textMuted,
  },
});
