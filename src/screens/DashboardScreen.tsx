import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  useWindowDimensions,
} from 'react-native';
import { useAuth } from '../hooks/useAuth';
import { UserAvatar } from '../components/UserAvatar';
import {
  colors,
  spacing,
  borderRadius,
  typography,
  layout,
  shadows,
} from '../styles/theme';

export interface DashboardScreenProps {
  navigation: any;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({ navigation }) => {
  const { width } = useWindowDimensions();
  const { user, signOut, isAdmin, isLoading } = useAuth();

  const isDesktop = width >= layout.breakpoints.tablet;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View
          style={[
            styles.container,
            isDesktop ? styles.containerDesktop : styles.containerMobile,
          ]}
        >
          {/* Top Navbar */}
          <View style={styles.navbar}>
            <View style={styles.navBrand}>
              <View style={styles.logoBadge}>
                <Text style={styles.logoText}>HB+</Text>
              </View>
              <Text style={styles.navTitle}>HB Plus</Text>
            </View>

            <View style={styles.navActions}>
              <View
                style={[
                  styles.roleBadge,
                  isAdmin ? styles.roleBadgeAdmin : styles.roleBadgeUser,
                ]}
              >
                <Text
                  style={[
                    styles.roleBadgeText,
                    isAdmin ? styles.roleBadgeTextAdmin : styles.roleBadgeTextUser,
                  ]}
                >
                  {isAdmin ? 'ADMIN' : 'MEMBER'}
                </Text>
              </View>

              <TouchableOpacity
                style={styles.signOutButton}
                onPress={signOut}
                disabled={isLoading}
                accessibilityRole="button"
                accessibilityLabel="Sign out"
              >
                <Text style={styles.signOutText}>Sign Out</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Hero Welcome Card */}
          <View style={styles.heroCard}>
            <View style={styles.profileHeader}>
              <UserAvatar
                photoURL={user?.photoURL}
                name={user?.displayName}
                size={72}
              />
              <View style={styles.profileMeta}>
                <Text style={styles.welcomeGreeting}>
                  Welcome back,
                </Text>
                <Text style={styles.userName}>
                  {user?.displayName || 'Authorized Employee'}
                </Text>
                <View style={styles.emailRow}>
                  <Text style={styles.userEmail}>{user?.email}</Text>
                  <View style={styles.verifiedBadge}>
                    <Text style={styles.verifiedText}>✓ Verified</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* Authentication & Security Details */}
          <View style={styles.grid}>
            <View style={styles.infoCard}>
              <Text style={styles.cardHeader}>Session Identity</Text>
              <View style={styles.divider} />
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Domain Status:</Text>
                <Text style={styles.detailSuccess}>Authorized (@hbplus.fit)</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Firebase UID:</Text>
                <Text style={styles.detailCode} numberOfLines={1}>
                  {user?.uid}
                </Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Assigned Role:</Text>
                <Text style={styles.detailValue}>
                  {user?.role ? user.role.toUpperCase() : 'USER'}
                </Text>
              </View>
            </View>

            <View style={styles.infoCard}>
              <Text style={styles.cardHeader}>Access & Privileges</Text>
              <View style={styles.divider} />
              <Text style={styles.privilegeDescription}>
                {isAdmin
                  ? 'You hold administrative privileges. You can inspect registered users and manage organizational permissions in the Admin Console.'
                  : 'You hold standard member access. You have full access to internal tools and workspace resources.'}
              </Text>

              {isAdmin ? (
                <TouchableOpacity
                  style={styles.adminConsoleButton}
                  onPress={() => navigation.navigate('Admin')}
                  accessibilityRole="button"
                  accessibilityLabel="Open Admin Console"
                >
                  <Text style={styles.adminConsoleButtonText}>
                    Open Admin Console →
                  </Text>
                </TouchableOpacity>
              ) : null}
            </View>
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
    alignItems: 'center',
    padding: spacing.md,
  },
  container: {
    width: '100%',
  },
  containerDesktop: {
    maxWidth: layout.maxDashboardWidth,
    paddingTop: spacing.lg,
  },
  containerMobile: {
    paddingTop: spacing.sm,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    marginBottom: spacing.lg,
  },
  navBrand: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoBadge: {
    width: 38,
    height: 38,
    borderRadius: borderRadius.md,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  logoText: {
    color: colors.primaryText,
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.bold,
  },
  navTitle: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
  },
  navActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  roleBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
    marginRight: spacing.md,
    borderWidth: 1,
  },
  roleBadgeAdmin: {
    backgroundColor: 'rgba(59, 130, 246, 0.15)',
    borderColor: colors.primary,
  },
  roleBadgeUser: {
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    borderColor: colors.success,
  },
  roleBadgeText: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.bold,
    letterSpacing: 0.5,
  },
  roleBadgeTextAdmin: {
    color: colors.primary,
  },
  roleBadgeTextUser: {
    color: colors.success,
  },
  signOutButton: {
    backgroundColor: colors.surfaceElevated,
    borderColor: colors.borderLight,
    borderWidth: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
    minHeight: layout.minTouchTarget,
    justifyContent: 'center',
  },
  signOutText: {
    color: colors.danger,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
  },
  heroCard: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    marginBottom: spacing.lg,
    ...shadows.card,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  profileMeta: {
    marginLeft: spacing.lg,
    flex: 1,
    minWidth: 220,
  },
  welcomeGreeting: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.sm,
  },
  userName: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.bold,
    marginVertical: spacing.xs,
  },
  emailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  userEmail: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.md,
    marginRight: spacing.sm,
  },
  verifiedBadge: {
    backgroundColor: colors.successBg,
    borderColor: colors.successBorder,
    borderWidth: 1,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.full,
  },
  verifiedText: {
    color: colors.success,
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.medium,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.lg,
  },
  infoCard: {
    flex: 1,
    minWidth: 280,
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    ...shadows.card,
  },
  cardHeader: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.md,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  detailLabel: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.sm,
  },
  detailSuccess: {
    color: colors.success,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
  },
  detailCode: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.xs,
    fontFamily: 'monospace',
    maxWidth: 160,
  },
  detailValue: {
    color: colors.primary,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.bold,
  },
  privilegeDescription: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.sm,
    lineHeight: typography.fontSize.sm * typography.lineHeight.relaxed,
    marginBottom: spacing.lg,
  },
  adminConsoleButton: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    minHeight: layout.minTouchTarget,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.button,
  },
  adminConsoleButtonText: {
    color: colors.primaryText,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.bold,
  },
});
