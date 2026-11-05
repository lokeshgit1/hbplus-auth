export const ALLOWED_DOMAIN =
  process.env.EXPO_PUBLIC_ALLOWED_EMAIL_DOMAIN || 'hbplus.fit';

export const INITIAL_ADMIN_EMAIL =
  (process.env.EXPO_PUBLIC_INITIAL_ADMIN_EMAIL || 'admin@hbplus.fit').toLowerCase().trim();

// Default to project client configuration so Netlify builds succeed even before manual env setup
export const firebaseConfig = {
  apiKey:
    process.env.EXPO_PUBLIC_FIREBASE_API_KEY ||
    'AIzaSyCzWNe1e1nU7YIg9j0ZYOqt09iOoC-Nme0',
  authDomain:
    process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN ||
    'hopeb-c52ff.firebaseapp.com',
  projectId:
    process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID || 'hopeb-c52ff',
  storageBucket:
    process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET ||
    'hopeb-c52ff.firebasestorage.app',
  messagingSenderId:
    process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '436500150629',
  appId:
    process.env.EXPO_PUBLIC_FIREBASE_APP_ID ||
    '1:436500150629:web:5c7220e3a472e637a8c98c',
};

export const googleOAuthConfig = {
  webClientId:
    process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID ||
    '436500150629-6e6oq6b5t8ugir94odbugk9t32iofb77.apps.googleusercontent.com',
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
