import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import {
  getAuth,
  initializeAuth,
  Auth,
  browserLocalPersistence,
} from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { firebaseConfig, validateFirebaseConfig } from '../constants/config';

let app: FirebaseApp;
let auth: Auth;
let db: Firestore;

const configCheck = validateFirebaseConfig();
if (!configCheck.isValid && typeof __DEV__ !== 'undefined' && __DEV__) {
  console.warn(
    `[Firebase] Missing configuration keys in .env: ${configCheck.missingKeys.join(', ')}. ` +
      'Authentication operations will fail until valid configuration is provided.'
  );
}

// Fallback placeholder config if env vars are empty, so initializeApp does not crash the entire JS bundle on startup
const safeConfig = {
  apiKey: firebaseConfig.apiKey || 'placeholder-api-key',
  authDomain: firebaseConfig.authDomain || 'placeholder-domain.firebaseapp.com',
  projectId: firebaseConfig.projectId || 'placeholder-project',
  storageBucket: firebaseConfig.storageBucket || 'placeholder.appspot.com',
  messagingSenderId: firebaseConfig.messagingSenderId || '1234567890',
  appId: firebaseConfig.appId || '1:1234567890:web:abcdef',
};

if (!getApps().length) {
  app = initializeApp(safeConfig);
} else {
  app = getApp();
}

if (Platform.OS === 'web') {
  auth = getAuth(app);
} else {
  try {
    // For native platforms, use AsyncStorage persistence
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { getReactNativePersistence } = require('firebase/auth');
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage),
    });
  } catch (e) {
    // If auth was already initialized
    auth = getAuth(app);
  }
}

db = getFirestore(app);

export { app, auth, db };
