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
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View
          style={[
            styles.container,
            isDesktop ? styles.containerDesktop : styles.containerMobile,
          ]}
        >
          {/* Header */}
          <View style={styles.header}>
            <View>
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.navigate('Dashboard')}
                accessibilityRole="button"
                accessibilityLabel="Back to Dashboard"
              >
                <Text style={styles.backButtonText}>← Back to Dashboard</Text>
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
              accessibilityRole="button"
              accessibilityLabel="Refresh user list"
            >
              <Text style={styles.refreshButtonText}>Refresh</Text>
            </TouchableOpacity>
          </View>

          {/* Metric Summary Cards */}
          <View style={styles.metricsRow}>
            <View style={styles.metricCard}>
              <Text style={styles.metricNumber}>{users.length}</Text>
              <Text style={styles.metricLabel}>Total Members</Text>
            </View>
            <View style={styles.metricCard}>
              <Text style={[styles.metricNumber, { color: colors.primary }]}>
                {adminCount}
              </Text>
              <Text style={styles.metricLabel}>Administrators</Text>
            </View>
            <View style={styles.metricCard}>
              <Text style={[styles.metricNumber, { color: colors.success }]}>
                {standardCount}
              </Text>
              <Text style={styles.metricLabel}>Standard Members</Text>
            </View>
          </View>

          {error ? (
            <ErrorMessage message={error} onDismiss={() => setError(null)} />
          ) : null}

          {/* User List Table */}
          <View style={styles.tableCard}>
            <Text style={styles.tableTitle}>Authorized Users (@hbplus.fit)</Text>
            <View style={styles.divider} />

            {isLoading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={colors.primary} />
                <Text style={styles.loadingText}>Fetching member directory...</Text>
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
                      <UserAvatar
                        photoURL={item.photoURL}
                        name={item.displayName}
                        size={44}
                      />
                      <View style={styles.userInfo}>
                        <View style={styles.userNameRow}>
                          <Text style={styles.userName}>
                            {item.displayName || 'Organizational Member'}
                          </Text>
                          {isSelf ? (
                            <View style={styles.selfBadge}>
                              <Text style={styles.selfBadgeText}>You</Text>
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
                          accessibilityRole="button"
                          accessibilityLabel={`Change role for ${item.email}`}
                        >
                          {isActionInProgress ? (
                            <ActivityIndicator size="small" color="#FFFFFF" />
                          ) : (
                            <Text style={styles.toggleRoleButtonText}>
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
    marginBottom: spacing.lg,
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  backButton: {
    marginBottom: spacing.xs,
  },
  backButtonText: {
    color: colors.primary,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
  },
  title: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.bold,
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.sm,
    marginTop: spacing.xs,
  },
  refreshButton: {
    backgroundColor: colors.surfaceElevated,
    borderColor: colors.borderLight,
    borderWidth: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
    minHeight: layout.minTouchTarget,
    justifyContent: 'center',
  },
  refreshButtonText: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
  },
  metricsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  metricCard: {
    flex: 1,
    minWidth: 160,
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    alignItems: 'center',
    ...shadows.card,
  },
  metricNumber: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.display,
    fontWeight: typography.fontWeight.bold,
  },
  metricLabel: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.xs,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginTop: spacing.xs,
  },
  tableCard: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    ...shadows.card,
  },
  tableTitle: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.md,
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
    borderBottomColor: colors.border,
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  userMain: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    minWidth: 240,
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
    backgroundColor: colors.surfaceElevated,
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
    borderRadius: borderRadius.xs,
  },
  selfBadgeText: {
    color: colors.primary,
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.bold,
  },
  userEmail: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.sm,
  },
  userActionArea: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  rolePill: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
    borderWidth: 1,
  },
  rolePillAdmin: {
    backgroundColor: 'rgba(59, 130, 246, 0.15)',
    borderColor: colors.primary,
  },
  rolePillUser: {
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    borderColor: colors.success,
  },
  rolePillText: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.bold,
  },
  rolePillTextAdmin: {
    color: colors.primary,
  },
  rolePillTextUser: {
    color: colors.success,
  },
  toggleRoleButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
    minHeight: layout.minTouchTarget,
    justifyContent: 'center',
  },
  toggleRoleDemote: {
    backgroundColor: colors.surfaceElevated,
    borderWidth: 1,
    borderColor: colors.dangerBorder,
  },
  toggleRolePromote: {
    backgroundColor: colors.primary,
  },
  toggleRoleButtonText: {
    color: colors.primaryText,
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.semibold,
  },
});
