export const ALLOWED_DOMAIN =
  process.env.EXPO_PUBLIC_ALLOWED_EMAIL_DOMAIN || 'hbplus.fit';

export const INITIAL_ADMIN_EMAIL =
  (process.env.EXPO_PUBLIC_INITIAL_ADMIN_EMAIL || 'admin@hbplus.fit').toLowerCase().trim();

export const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY || '',
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN || '',
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID || '',
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID || '',
};

export const googleOAuthConfig = {
  webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID || '',
  iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID || '',
  androidClientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID || '',
};

export function validateFirebaseConfig(): { isValid: boolean; missingKeys: string[] } {
  const requiredKeys: (keyof typeof firebaseConfig)[] = [
    'apiKey',
    'authDomain',
    'projectId',
    'appId',
  ];

  const missingKeys = requiredKeys.filter((key) => !firebaseConfig[key]);

  return {
    isValid: missingKeys.length === 0,
    missingKeys,
  };
}
