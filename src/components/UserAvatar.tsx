import React, { useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { colors, borderRadius, typography } from '../styles/theme';

export interface UserAvatarProps {
  photoURL?: string | null;
  name?: string | null;
  size?: number;
}

export const UserAvatar: React.FC<UserAvatarProps> = ({
  photoURL,
  name,
  size = 56,
}) => {
  const [hasError, setHasError] = useState(false);

  const getInitials = (fullName?: string | null): string => {
    if (!fullName) return '?';
    const parts = fullName.trim().split(' ').filter(Boolean);
    if (parts.length === 0) return '?';
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  };

  const containerStyle = {
    width: size,
    height: size,
    borderRadius: borderRadius.full,
  };

  if (photoURL && !hasError) {
    return (
      <Image
        source={{ uri: photoURL }}
        style={[styles.image, containerStyle]}
        onError={() => setHasError(true)}
        accessibilityRole="image"
        accessibilityLabel={name ? `${name}'s profile picture` : 'Profile picture'}
      />
    );
  }

  return (
    <View style={[styles.fallbackContainer, containerStyle]}>
      <Text style={[styles.initialsText, { fontSize: Math.max(14, Math.floor(size * 0.4)) }]}>
        {getInitials(name)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    backgroundColor: colors.surfaceElevated,
    borderWidth: 2,
    borderColor: colors.glassBorderLight,
  },
  fallbackContainer: {
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.glassBorderLight,
  },
  initialsText: {
    color: colors.primaryText,
    fontWeight: typography.fontWeight.bold,
    fontFamily: typography.fontFamily,
  },
});
