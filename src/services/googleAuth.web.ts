import {
  GoogleAuthProvider,
  signInWithPopup,
  UserCredential,
} from 'firebase/auth';
import { auth } from './firebase';

export async function signInWithGoogleWeb(): Promise<UserCredential> {
  const provider = new GoogleAuthProvider();

  // Force Google to show the account chooser so the user can select their account
  provider.setCustomParameters({
    prompt: 'select_account',
  });

  // Note: Modern browsers (Chrome, Safari) block signInWithRedirect due to third-party
  // storage partitioning (CHIPS). signInWithPopup is the official recommended flow.
  return await signInWithPopup(auth, provider);
}
