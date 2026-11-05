import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, spacing, borderRadius, typography } from '../styles/theme';

export interface ErrorMessageProps {
  message: string | null;
  onRetry?: () => void;
  onDismiss?: () => void;
  isRetryable?: boolean;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  onRetry,
  onDismiss,
  isRetryable = false,
}) => {
  if (!message) {
    return null;
  }

  return (
    <View
      style={styles.container}
      accessibilityRole="alert"
      accessibilityLiveRegion="polite"
      testID="error-message-banner"
    >
      <View style={styles.textContainer}>
        <Text style={styles.icon}>⚠️</Text>
        <Text style={styles.messageText}>{message}</Text>
      </View>

      <View style={styles.actionsContainer}>
        {isRetryable && onRetry ? (
          <TouchableOpacity
            style={styles.retryButton}
            onPress={onRetry}
            accessibilityRole="button"
            accessibilityLabel="Retry authentication"
          >
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        ) : null}

        {onDismiss ? (
          <TouchableOpacity
            style={styles.dismissButton}
            onPress={onDismiss}
            accessibilityRole="button"
            accessibilityLabel="Dismiss error message"
          >
            <Text style={styles.dismissText}>✕</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.dangerBg,
    borderColor: colors.dangerBorder,
    borderWidth: 1,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginVertical: spacing.sm,
    width: '100%',
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  icon: {
    fontSize: 16,
    marginRight: spacing.sm,
    marginTop: 1,
  },
  messageText: {
    flex: 1,
    color: colors.danger,
    fontSize: typography.fontSize.sm,
    lineHeight: typography.fontSize.sm * typography.lineHeight.normal,
    fontWeight: typography.fontWeight.medium,
    fontFamily: typography.fontFamily,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  retryButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    backgroundColor: colors.dangerBorder,
    borderRadius: borderRadius.sm,
    marginRight: spacing.sm,
  },
  retryText: {
    color: colors.primaryText,
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.semibold,
  },
  dismissButton: {
    padding: spacing.xs,
  },
  dismissText: {
    color: colors.danger,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.bold,
  },
});
