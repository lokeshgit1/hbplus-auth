import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  UserCredential,
} from 'firebase/auth';
import { auth } from './firebase';
import { ALLOWED_DOMAIN } from '../constants/config';

export async function signInWithGoogleWeb(): Promise<UserCredential> {
  const provider = new GoogleAuthProvider();

  // Force Google to show the account chooser so the user can select their account
  provider.setCustomParameters({
    prompt: 'select_account',
  });

  try {
    const credential = await signInWithPopup(auth, provider);
    return credential;
  } catch (error: any) {
    // If popup was blocked by browser policy, fallback to redirect flow
    if (error?.code === 'auth/popup-blocked') {
      await signInWithRedirect(auth, provider);
      throw error;
    }
    throw error;
  }
}
