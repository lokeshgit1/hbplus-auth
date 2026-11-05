import { LinkingOptions } from '@react-navigation/native';

export type RootStackParamList = {
  Login: undefined;
  Dashboard: undefined;
  Admin: undefined;
};

export const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [
    'hbplus://',
    'https://hbplus.fit',
    'http://localhost:8081',
    'http://localhost:19006',
  ],
  config: {
    screens: {
      Login: 'login',
      Dashboard: 'dashboard',
      Admin: 'admin',
    },
  },
};
