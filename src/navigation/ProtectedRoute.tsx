import React, { ReactNode } from 'react';
import { useAuth } from '../hooks/useAuth';
import { LoadingIndicator } from '../components/LoadingIndicator';
import { UserRole } from '../types/user.types';

export interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: UserRole;
  fallback?: ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole,
  fallback = null,
}) => {
  const { status, user, isLoading } = useAuth();

  if (isLoading || status === 'initializing' || status === 'authorizing') {
    return <LoadingIndicator fullScreen message="Verifying organizational authorization..." />;
  }

  if (status !== 'authorized' || !user) {
    return <>{fallback}</>;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};
