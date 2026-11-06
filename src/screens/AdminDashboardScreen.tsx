import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  useWindowDimensions,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { useAuth } from '../hooks/useAuth';
import * as userService from '../services/userService';
import { AppUserProfile, UserRole } from '../types/user.types';
import { UserAvatar } from '../components/UserAvatar';
import { ErrorMessage } from '../components/ErrorMessage';
import {
  colors,
  spacing,
  borderRadius,
  typography,
  layout,
  shadows,
} from '../styles/theme';

export interface AdminDashboardScreenProps {
  navigation: any;
}

export const AdminDashboardScreen: React.FC<AdminDashboardScreenProps> = ({ navigation }) => {
  const { width } = useWindowDimensions();
  const { user: currentAdminUser } = useAuth();

  const [users, setUsers] = useState<AppUserProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [actionLoadingUid, setActionLoadingUid] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const isDesktop = width >= layout.breakpoints.tablet;

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const userList = await userService.getAllUsers();
      // If empty (e.g. offline/mock environment), include current admin user so list is never broken
      if (userList.length === 0 && currentAdminUser) {
        setUsers([
          {
            uid: currentAdminUser.uid,
            email: currentAdminUser.email || 'admin@hbplus.fit',
            displayName: currentAdminUser.displayName,
            photoURL: currentAdminUser.photoURL,
            role: 'admin',
          },
        ]);
      } else {
        setUsers(userList);
      }
    } catch (e: any) {
      setError('Could not load user list from Firestore. Please verify security rules and connectivity.');
    } finally {
      setIsLoading(false);
    }
  }, [currentAdminUser]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleToggleRole = async (targetUser: AppUserProfile) => {
    const newRole: UserRole = targetUser.role === 'admin' ? 'user' : 'admin';
    setActionLoadingUid(targetUser.uid);
    setError(null);

    try {
      await userService.updateUserRole(targetUser.uid, newRole);
      setUsers((prev) =>
        prev.map((u) => (u.uid === targetUser.uid ? { ...u, role: newRole } : u))
      );
    } catch (e: any) {
      setError(`Failed to update role for ${targetUser.email}. Action denied.`);
    } finally {
      setActionLoadingUid(null);
    }
  };

  const adminCount = users.filter((u) => u.role === 'admin').length;
  const standardCount = users.filter((u) => u.role !== 'admin').length;

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Ambient Atmospheric Luminous Orbs */}
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        <View style={styles.ambientOrbTop} />
        <View style={styles.ambientOrbLeft} />
        <View style={styles.ambientOrbBottom} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View
          style={[
            styles.container,
            isDesktop ? styles.containerDesktop : styles.containerMobile,
          ]}
        >
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerContent}>
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.navigate('Dashboard')}
                activeOpacity={0.7}
                accessibilityRole="button"
                accessibilityLabel="Back to Dashboard"
              >
                <Text style={styles.backButtonIcon}>←</Text>
                <Text style={styles.backButtonText}>Back to Dashboard</Text>
              </TouchableOpacity>
              <Text style={styles.title}>Admin User Management</Text>
              <Text style={styles.subtitle}>
                Oversee authorized organizational members and assign application privileges.
              </Text>
            </View>

            <TouchableOpacity
              style={styles.refreshButton}
              onPress={fetchUsers}
              disabled={isLoading}
              activeOpacity={0.75}
              accessibilityRole="button"
              accessibilityLabel="Refresh user list"
            >
              {isLoading ? (
                <ActivityIndicator size="small" color={colors.primaryGlow} style={styles.refreshSpinner} />
              ) : null}
              <Text style={styles.refreshButtonText}>
                {isLoading ? 'Refreshing...' : 'Refresh Directory'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Metric Summary Cards (Glass Stat Trio) */}
          <View style={styles.metricsRow}>
            {/* Total Members */}
            <View style={styles.metricCard}>
              <View style={styles.metricCardGlowLine} />
              <View style={styles.metricHeaderRow}>
                <Text style={styles.metricLabel}>Total Members</Text>
                <View style={[styles.metricDot, { backgroundColor: colors.textPrimary }]} />
              </View>
              <Text style={styles.metricNumber}>{users.length}</Text>
            </View>

            {/* Administrators */}
            <View style={styles.metricCard}>
              <View style={[styles.metricCardGlowLine, { backgroundColor: colors.primaryGlow }]} />
              <View style={styles.metricHeaderRow}>
                <Text style={styles.metricLabel}>Administrators</Text>
                <View style={[styles.metricDot, { backgroundColor: colors.primaryGlow }]} />
              </View>
              <Text style={[styles.metricNumber, { color: colors.primaryGlow }]}>
                {adminCount}
              </Text>
            </View>

            {/* Standard Members */}
            <View style={styles.metricCard}>
              <View style={[styles.metricCardGlowLine, { backgroundColor: colors.successGlow }]} />
              <View style={styles.metricHeaderRow}>
                <Text style={styles.metricLabel}>Standard Members</Text>
                <View style={[styles.metricDot, { backgroundColor: colors.successGlow }]} />
              </View>
              <Text style={[styles.metricNumber, { color: colors.successGlow }]}>
                {standardCount}
              </Text>
            </View>
          </View>

          {error ? (
            <ErrorMessage message={error} onDismiss={() => setError(null)} />
          ) : null}

          {/* User List Glass Table */}
          <View style={styles.tableCard}>
            <View style={styles.specularTopLine} />
            <View style={styles.tableHeaderRow}>
              <View>
                <Text style={styles.tableTitle}>Authorized Users</Text>
                <Text style={styles.tableSubtitle}>Restricted to verified @hbplus.fit domain</Text>
              </View>
              <View style={styles.countBadge}>
                <Text style={styles.countBadgeText}>{users.length} Active</Text>
              </View>
            </View>
            <View style={styles.divider} />

            {isLoading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={colors.primaryGlow} />
                <Text style={styles.loadingText}>Fetching member directory from Firestore...</Text>
              </View>
            ) : users.length === 0 ? (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No registered members found.</Text>
              </View>
            ) : (
              users.map((item) => {
                const isTargetAdmin = item.role === 'admin';
                const isSelf = item.uid === currentAdminUser?.uid;
                const isActionInProgress = actionLoadingUid === item.uid;

                return (
                  <View key={item.uid} style={styles.userRow}>
                    <View style={styles.userMain}>
                      <View style={styles.avatarWrapper}>
                        <UserAvatar
                          photoURL={item.photoURL}
                          name={item.displayName}
                          size={46}
                        />
                      </View>
                      <View style={styles.userInfo}>
                        <View style={styles.userNameRow}>
                          <Text style={styles.userName}>
                            {item.displayName || 'Organizational Member'}
                          </Text>
                          {isSelf ? (
                            <View style={styles.selfBadge}>
                              <Text style={styles.selfBadgeText}>YOU</Text>
                            </View>
                          ) : null}
                        </View>
                        <Text style={styles.userEmail}>{item.email}</Text>
                      </View>
                    </View>

                    <View style={styles.userActionArea}>
                      <View
                        style={[
                          styles.rolePill,
                          isTargetAdmin ? styles.rolePillAdmin : styles.rolePillUser,
                        ]}
                      >
                        <View
                          style={[
                            styles.roleDot,
                            isTargetAdmin ? styles.roleDotAdmin : styles.roleDotUser,
                          ]}
                        />
                        <Text
                          style={[
                            styles.rolePillText,
                            isTargetAdmin
                              ? styles.rolePillTextAdmin
                              : styles.rolePillTextUser,
                          ]}
                        >
                          {isTargetAdmin ? 'ADMIN' : 'USER'}
                        </Text>
                      </View>

                      {!isSelf ? (
                        <TouchableOpacity
                          style={[
                            styles.toggleRoleButton,
                            isTargetAdmin
                              ? styles.toggleRoleDemote
                              : styles.toggleRolePromote,
                          ]}
                          onPress={() => handleToggleRole(item)}
                          disabled={isActionInProgress}
                          activeOpacity={0.8}
                          accessibilityRole="button"
                          accessibilityLabel={`Change role for ${item.email}`}
                        >
                          {isActionInProgress ? (
                            <ActivityIndicator
                              size="small"
                              color={isTargetAdmin ? colors.dangerGlow : '#FFFFFF'}
                            />
                          ) : (
                            <Text
                              style={[
                                styles.toggleRoleButtonText,
                                isTargetAdmin && styles.toggleRoleDemoteText,
                              ]}
                            >
                              {isTargetAdmin ? 'Demote to User' : 'Promote to Admin'}
                            </Text>
                          )}
                        </TouchableOpacity>
                      ) : null}
                    </View>
                  </View>
                );
              })
            )}
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
  ambientOrbTop: {
    position: 'absolute',
    top: -50,
    right: '10%',
    width: 320,
    height: 320,
    borderRadius: 160,
    backgroundColor: colors.ambientOrbBlue,
    ...Platform.select({
      web: { filter: 'blur(95px)' } as any,
      default: { opacity: 0.5 },
    }),
  },
  ambientOrbLeft: {
    position: 'absolute',
    top: 300,
    left: -70,
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
    right: '25%',
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: colors.ambientOrbCyan,
    ...Platform.select({
      web: { filter: 'blur(85px)' } as any,
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.xl,
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  headerContent: {
    flex: 1,
    minWidth: 260,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderColor: colors.glassBorder,
    borderWidth: 1,
    borderRadius: borderRadius.full,
    alignSelf: 'flex-start',
  },
  backButtonIcon: {
    color: colors.primaryGlow,
    fontSize: typography.fontSize.sm,
    marginRight: 4,
  },
  backButtonText: {
    color: colors.primaryGlow,
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.semibold,
  },
  title: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.bold,
    letterSpacing: -0.5,
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.sm,
    marginTop: spacing.xs,
    lineHeight: typography.fontSize.sm * typography.lineHeight.normal,
  },
  refreshButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.glassSurface,
    borderColor: colors.glassBorderLight,
    borderWidth: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
    minHeight: layout.minTouchTarget,
    justifyContent: 'center',
    ...shadows.button,
  },
  refreshSpinner: {
    marginRight: spacing.xs,
  },
  refreshButtonText: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.semibold,
    letterSpacing: 0.3,
  },
  metricsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  metricCard: {
    flex: 1,
    minWidth: 160,
    backgroundColor: colors.glassCard,
    borderColor: colors.glassBorder,
    borderWidth: 1,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    overflow: 'hidden',
    position: 'relative',
    ...shadows.glass,
    ...Platform.select({
      web: {
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
      } as any,
    }),
  },
  metricCardGlowLine: {
    position: 'absolute',
    top: 0,
    left: 15,
    right: 15,
    height: 2,
    backgroundColor: colors.textPrimary,
    opacity: 0.7,
  },
  metricHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  metricLabel: {
    color: colors.textSecondary,
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    fontWeight: typography.fontWeight.semibold,
  },
  metricDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  metricNumber: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.display,
    fontWeight: typography.fontWeight.bold,
    letterSpacing: -1,
  },
  tableCard: {
    backgroundColor: colors.glassCard,
    borderColor: colors.glassBorder,
    borderWidth: 1.5,
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
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
  tableHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  tableTitle: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    letterSpacing: -0.3,
  },
  tableSubtitle: {
    color: colors.textMuted,
    fontSize: typography.fontSize.xs,
    marginTop: 2,
  },
  countBadge: {
    backgroundColor: 'rgba(59, 130, 246, 0.12)',
    borderColor: colors.glassBorderAccent,
    borderWidth: 1,
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: borderRadius.full,
  },
  countBadgeText: {
    color: colors.primaryGlow,
    fontSize: 11,
    fontWeight: typography.fontWeight.bold,
  },
  divider: {
    height: 1,
    backgroundColor: colors.glassBorderSubtle,
    marginVertical: spacing.lg,
  },
  loadingContainer: {
    padding: spacing.xxl,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: spacing.md,
    color: colors.textSecondary,
    fontSize: typography.fontSize.sm,
  },
  emptyContainer: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  emptyText: {
    color: colors.textMuted,
    fontSize: typography.fontSize.sm,
  },
  userRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.glassBorderSubtle,
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  userMain: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    minWidth: 240,
  },
  avatarWrapper: {
    padding: 2,
    borderRadius: borderRadius.full,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
  },
  userInfo: {
    marginLeft: spacing.md,
  },
  userNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userName: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semibold,
  },
  selfBadge: {
    marginLeft: spacing.sm,
    backgroundColor: 'rgba(59, 130, 246, 0.2)',
    borderColor: colors.glassBorderAccent,
    borderWidth: 1,
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: borderRadius.xs,
  },
  selfBadgeText: {
    color: colors.primaryGlow,
    fontSize: 10,
    fontWeight: typography.fontWeight.bold,
    letterSpacing: 0.5,
  },
  userEmail: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.xs,
    marginTop: 2,
  },
  userActionArea: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  rolePill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.full,
    borderWidth: 1,
  },
  rolePillAdmin: {
    backgroundColor: 'rgba(59, 130, 246, 0.12)',
    borderColor: colors.glassBorderAccent,
  },
  rolePillUser: {
    backgroundColor: 'rgba(16, 185, 129, 0.12)',
    borderColor: colors.glassBorderSuccess,
  },
  roleDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    marginRight: 5,
  },
  roleDotAdmin: {
    backgroundColor: colors.primaryGlow,
  },
  roleDotUser: {
    backgroundColor: colors.successGlow,
  },
  rolePillText: {
    fontSize: 11,
    fontWeight: typography.fontWeight.bold,
    letterSpacing: 0.5,
  },
  rolePillTextAdmin: {
    color: colors.primaryGlow,
  },
  rolePillTextUser: {
    color: colors.successGlow,
  },
  toggleRoleButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: borderRadius.md,
    minHeight: layout.minTouchTarget,
    justifyContent: 'center',
    borderWidth: 1,
  },
  toggleRoleDemote: {
    backgroundColor: 'rgba(239, 68, 68, 0.12)',
    borderColor: colors.glassBorderDanger,
  },
  toggleRoleDemoteText: {
    color: colors.dangerGlow,
  },
  toggleRolePromote: {
    backgroundColor: colors.primary,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    ...shadows.button,
  },
  toggleRoleButtonText: {
    color: colors.primaryText,
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.semibold,
    letterSpacing: 0.3,
  },
});
