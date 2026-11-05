import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../hooks/useAuth';
import { LoginScreen } from '../screens/LoginScreen';
import { DashboardScreen } from '../screens/DashboardScreen';
import { AdminDashboardScreen } from '../screens/AdminDashboardScreen';
import { LoadingIndicator } from '../components/LoadingIndicator';
import { linking, RootStackParamList } from './linking';
import { colors } from '../styles/theme';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => {
  const { status, user, isAdmin } = useAuth();

  if (status === 'initializing' || status === 'authorizing') {
    return <LoadingIndicator fullScreen message="Loading session..." />;
  }

  const isAuthorized = status === 'authorized' && user !== null;

  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
          animation: 'fade',
        }}
      >
        {isAuthorized ? (
          // Authorized user routes
          <>
            <Stack.Screen name="Dashboard" component={DashboardScreen} />
            {isAdmin ? (
              <Stack.Screen name="Admin" component={AdminDashboardScreen} />
            ) : null}
          </>
        ) : (
          // Public / Unauthenticated routes
          <Stack.Screen name="Login" component={LoginScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
