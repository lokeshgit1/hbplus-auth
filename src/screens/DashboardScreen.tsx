import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  useWindowDimensions,
  Platform,
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
      {/* Ambient Atmospheric Luminous Orbs for Depth */}
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        <View style={styles.ambientOrbLeft} />
        <View style={styles.ambientOrbRight} />
        <View style={styles.ambientOrbBottom} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View
          style={[
            styles.container,
            isDesktop ? styles.containerDesktop : styles.containerMobile,
          ]}
        >
          {/* Floating Glass Navbar */}
          <View style={styles.navbar}>
            <View style={styles.navBrand}>
              <View style={styles.logoHalo}>
                <View style={styles.logoBadge}>
                  <Text style={styles.logoText}>HB+</Text>
                </View>
              </View>
              <View>
                <Text style={styles.navTitle}>HB Plus</Text>
                <Text style={styles.navSubtitle}>Workspace Portal</Text>
              </View>
            </View>

            <View style={styles.navActions}>
              <View
                style={[
                  styles.roleBadge,
                  isAdmin ? styles.roleBadgeAdmin : styles.roleBadgeUser,
                ]}
              >
                <View
                  style={[
                    styles.roleDot,
                    isAdmin ? styles.roleDotAdmin : styles.roleDotUser,
                  ]}
                />
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
                activeOpacity={0.75}
                accessibilityRole="button"
                accessibilityLabel="Sign out"
              >
                <Text style={styles.signOutText}>Sign Out</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Hero Welcome Glass Card */}
          <View style={styles.heroCard}>
            <View style={styles.specularTopLine} />
            <View style={styles.profileHeader}>
              <View style={styles.avatarGlowContainer}>
                <UserAvatar
                  photoURL={user?.photoURL}
                  name={user?.displayName}
                  size={76}
                />
              </View>
              <View style={styles.profileMeta}>
                <Text style={styles.welcomeGreeting}>Welcome back,</Text>
                <Text style={styles.userName}>
                  {user?.displayName || 'Authorized Employee'}
                </Text>
                <View style={styles.emailRow}>
                  <Text style={styles.userEmail}>{user?.email}</Text>
                  <View style={styles.verifiedBadge}>
                    <View style={styles.verifiedDot} />
                    <Text style={styles.verifiedText}>Verified</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* Authentication & Security Bento Tiles */}
          <View style={styles.grid}>
            {/* Session Identity Tile */}
            <View style={styles.infoCard}>
              <View style={styles.cardHeaderRow}>
                <Text style={styles.cardHeader}>Session Identity</Text>
                <View style={styles.headerPill}>
                  <Text style={styles.headerPillText}>Active</Text>
                </View>
              </View>
              <View style={styles.divider} />

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Domain Status</Text>
                <View style={styles.domainStatusPill}>
                  <View style={styles.statusDotActive} />
                  <Text style={styles.detailSuccess}>Authorized (@hbplus.fit)</Text>
                </View>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Firebase UID</Text>
                <View style={styles.uidPill}>
                  <Text style={styles.detailCode} numberOfLines={1}>
                    {user?.uid}
                  </Text>
                </View>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Assigned Role</Text>
                <View style={styles.roleValuePill}>
                  <Text style={styles.detailValue}>
                    {user?.role ? user.role.toUpperCase() : 'USER'}
                  </Text>
                </View>
              </View>
            </View>

            {/* Access & Privileges Tile */}
            <View style={styles.infoCard}>
              <View style={styles.cardHeaderRow}>
                <Text style={styles.cardHeader}>Access & Privileges</Text>
                <View style={styles.headerPillShield}>
                  <Text style={styles.headerPillShieldText}>
                    {isAdmin ? 'Admin Clearance' : 'Standard Member'}
                  </Text>
                </View>
              </View>
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
                  activeOpacity={0.8}
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
  // Ambient Glowing Orbs
  ambientOrbLeft: {
    position: 'absolute',
    top: 40,
    left: -60,
    width: 320,
    height: 320,
    borderRadius: 160,
    backgroundColor: colors.ambientOrbBlue,
    ...Platform.select({
      web: { filter: 'blur(90px)' } as any,
      default: { opacity: 0.5 },
    }),
  },
  ambientOrbRight: {
    position: 'absolute',
    top: 200,
    right: -80,
    width: 340,
    height: 340,
    borderRadius: 170,
    backgroundColor: colors.ambientOrbViolet,
    ...Platform.select({
      web: { filter: 'blur(100px)' } as any,
      default: { opacity: 0.45 },
    }),
  },
  ambientOrbBottom: {
    position: 'absolute',
    bottom: -60,
    left: '30%',
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: colors.ambientOrbCyan,
    ...Platform.select({
      web: { filter: 'blur(80px)' } as any,
      default: { opacity: 0.4 },
    }),
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
  // Floating Glass Navbar
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.glassSurface,
    borderColor: colors.glassBorder,
    borderWidth: 1,
    borderRadius: borderRadius.xl,
    marginBottom: spacing.xl,
    ...shadows.glass,
    ...Platform.select({
      web: {
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
      } as any,
    }),
  },
  navBrand: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoHalo: {
    padding: 2,
    borderRadius: borderRadius.md,
    backgroundColor: 'rgba(59, 130, 246, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(96, 165, 250, 0.4)',
    marginRight: spacing.sm,
  },
  logoBadge: {
    width: 36,
    height: 36,
    borderRadius: borderRadius.sm,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    color: colors.primaryText,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.bold,
  },
  navTitle: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    letterSpacing: -0.3,
  },
  navSubtitle: {
    color: colors.textMuted,
    fontSize: 10,
    fontWeight: typography.fontWeight.medium,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  navActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  roleBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
    paddingVertical: 5,
    borderRadius: borderRadius.full,
    marginRight: spacing.md,
    borderWidth: 1,
  },
  roleBadgeAdmin: {
    backgroundColor: 'rgba(59, 130, 246, 0.12)',
    borderColor: colors.glassBorderAccent,
  },
  roleBadgeUser: {
    backgroundColor: 'rgba(16, 185, 129, 0.12)',
    borderColor: colors.glassBorderSuccess,
  },
  roleDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  roleDotAdmin: {
    backgroundColor: colors.primaryGlow,
    ...Platform.select({ web: { boxShadow: '0 0 6px #60A5FA' } as any }),
  },
  roleDotUser: {
    backgroundColor: colors.successGlow,
    ...Platform.select({ web: { boxShadow: '0 0 6px #34D399' } as any }),
  },
  roleBadgeText: {
    fontSize: 11,
    fontWeight: typography.fontWeight.bold,
    letterSpacing: 0.8,
  },
  roleBadgeTextAdmin: {
    color: colors.primaryGlow,
  },
  roleBadgeTextUser: {
    color: colors.successGlow,
  },
  signOutButton: {
    backgroundColor: 'rgba(239, 68, 68, 0.12)',
    borderColor: colors.glassBorderDanger,
    borderWidth: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.md,
    minHeight: layout.minTouchTarget,
    justifyContent: 'center',
  },
  signOutText: {
    color: colors.dangerGlow,
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.semibold,
    letterSpacing: 0.3,
  },
  // Hero Glass Card
  heroCard: {
    backgroundColor: colors.glassCard,
    borderColor: colors.glassBorder,
    borderWidth: 1.5,
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    marginBottom: spacing.xl,
    overflow: 'hidden',
    position: 'relative',
    ...shadows.glass,
    ...Platform.select({
      web: {
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        boxShadow: '0 16px 36px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.12)',
      } as any,
    }),
  },
  specularTopLine: {
    position: 'absolute',
    top: 0,
    left: 20,
    right: 20,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.22)',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  avatarGlowContainer: {
    padding: 3,
    borderRadius: borderRadius.full,
    backgroundColor: 'rgba(59, 130, 246, 0.18)',
    borderWidth: 1.5,
    borderColor: 'rgba(96, 165, 250, 0.45)',
    ...shadows.cardGlow,
  },
  profileMeta: {
    marginLeft: spacing.lg,
    flex: 1,
    minWidth: 220,
  },
  welcomeGreeting: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.xs,
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontWeight: typography.fontWeight.medium,
  },
  userName: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.bold,
    marginVertical: spacing.xs,
    letterSpacing: -0.5,
  },
  emailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  userEmail: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.sm,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.successBg,
    borderColor: colors.glassBorderSuccess,
    borderWidth: 1,
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: borderRadius.full,
  },
  verifiedDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: colors.successGlow,
    marginRight: 5,
  },
  verifiedText: {
    color: colors.successGlow,
    fontSize: 11,
    fontWeight: typography.fontWeight.semibold,
  },
  // Bento Grid
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.lg,
  },
  infoCard: {
    flex: 1,
    minWidth: 300,
    backgroundColor: colors.glassCard,
    borderColor: colors.glassBorder,
    borderWidth: 1,
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    ...shadows.glass,
    ...Platform.select({
      web: {
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        boxShadow: '0 12px 30px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
      } as any,
    }),
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardHeader: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    letterSpacing: -0.3,
  },
  headerPill: {
    backgroundColor: 'rgba(16, 185, 129, 0.12)',
    borderColor: colors.glassBorderSuccess,
    borderWidth: 1,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.full,
  },
  headerPillText: {
    color: colors.successGlow,
    fontSize: 10,
    fontWeight: typography.fontWeight.bold,
    textTransform: 'uppercase',
  },
  headerPillShield: {
    backgroundColor: 'rgba(59, 130, 246, 0.12)',
    borderColor: colors.glassBorderAccent,
    borderWidth: 1,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.full,
  },
  headerPillShieldText: {
    color: colors.primaryGlow,
    fontSize: 10,
    fontWeight: typography.fontWeight.bold,
    textTransform: 'uppercase',
  },
  divider: {
    height: 1,
    backgroundColor: colors.glassBorderSubtle,
    marginVertical: spacing.md,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  detailLabel: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.sm,
  },
  domainStatusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    borderColor: colors.glassBorderSuccess,
    borderWidth: 1,
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: borderRadius.sm,
  },
  statusDotActive: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.successGlow,
    marginRight: 6,
  },
  detailSuccess: {
    color: colors.successGlow,
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.semibold,
  },
  uidPill: {
    backgroundColor: colors.glassInput,
    borderColor: colors.glassBorderSubtle,
    borderWidth: 1,
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: borderRadius.sm,
  },
  detailCode: {
    color: colors.textPrimary,
    fontSize: 11,
    fontFamily: 'monospace',
    maxWidth: 160,
  },
  roleValuePill: {
    backgroundColor: 'rgba(59, 130, 246, 0.12)',
    borderColor: colors.glassBorderAccent,
    borderWidth: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: 3,
    borderRadius: borderRadius.sm,
  },
  detailValue: {
    color: colors.primaryGlow,
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.bold,
    letterSpacing: 0.5,
  },
  privilegeDescription: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.sm,
    lineHeight: typography.fontSize.sm * typography.lineHeight.relaxed,
    marginBottom: spacing.xl,
  },
  adminConsoleButton: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    minHeight: layout.minTouchTarget,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    ...shadows.button,
  },
  adminConsoleButtonText: {
    color: colors.primaryText,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.bold,
    letterSpacing: 0.3,
  },
});
