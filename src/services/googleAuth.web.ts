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

  // Set UX hints to steer the Google account chooser towards the organization domain
  provider.setCustomParameters({
    hd: ALLOWED_DOMAIN,
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
