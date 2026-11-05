import {
  GoogleAuthProvider,
  signInWithCredential,
  UserCredential,
} from 'firebase/auth';
import { auth } from './firebase';
import { googleOAuthConfig } from '../constants/config';

export async function signInWithGoogleNative(): Promise<UserCredential> {
  try {
    // Dynamically attempt to load @react-native-google-signin/google-signin if available in native build
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { GoogleSignin } = require('@react-native-google-signin/google-signin');

    GoogleSignin.configure({
      webClientId: googleOAuthConfig.webClientId,
      iosClientId: googleOAuthConfig.iosClientId,
      offlineAccess: false,
    });

    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    const response = await GoogleSignin.signIn();
    const idToken = response.data?.idToken || response.idToken;

    if (!idToken) {
      throw new Error('No Google ID token was returned from native Google Sign-In.');
    }

    const credential = GoogleAuthProvider.credential(idToken);
    return await signInWithCredential(auth, credential);
  } catch (error: any) {
    if (error?.code === '12501' || error?.code === 'SIGN_IN_CANCELLED') {
      const cancelError = new Error('Sign-in cancelled by user');
      (cancelError as any).code = 'SIGN_IN_CANCELLED';
      throw cancelError;
    }
    throw error;
  }
}
