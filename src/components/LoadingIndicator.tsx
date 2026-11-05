import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../styles/theme';

export interface LoadingIndicatorProps {
  fullScreen?: boolean;
  message?: string;
  size?: 'small' | 'large';
  color?: string;
}

export const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
  fullScreen = false,
  message,
  size = 'large',
  color = colors.primary,
}) => {
  if (fullScreen) {
    return (
      <View style={styles.fullScreenContainer} testID="loading-indicator-fullscreen">
        <ActivityIndicator size={size} color={color} />
        {message ? <Text style={styles.messageText}>{message}</Text> : null}
      </View>
    );
  }

  return (
    <View style={styles.inlineContainer} testID="loading-indicator-inline">
      <ActivityIndicator size={size} color={color} />
      {message ? <Text style={styles.inlineMessageText}>{message}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  inlineContainer: {
    padding: spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  messageText: {
    marginTop: spacing.md,
    color: colors.textSecondary,
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily,
    textAlign: 'center',
  },
  inlineMessageText: {
    marginLeft: spacing.sm,
    color: colors.textSecondary,
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily,
  },
});
