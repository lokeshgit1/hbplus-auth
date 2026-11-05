import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  getDocs,
  serverTimestamp,
} from 'firebase/firestore';
import { User as FirebaseUser } from 'firebase/auth';
import { db } from './firebase';
import { AppUserProfile, UserRole } from '../types/user.types';
import { INITIAL_ADMIN_EMAIL } from '../constants/config';

const USERS_COLLECTION = 'users';

/**
 * Synchronizes the authenticated Firebase user with their Firestore profile document.
 * Enforces role safety: does NOT allow client to self-elevate on update.
 */
export async function syncUserProfile(firebaseUser: FirebaseUser): Promise<AppUserProfile> {
  const userRef = doc(db, USERS_COLLECTION, firebaseUser.uid);
  const userSnap = await getDoc(userRef);

  const normalizedEmail = (firebaseUser.email || '').toLowerCase().trim();
  const isDefaultAdmin = normalizedEmail === INITIAL_ADMIN_EMAIL;

  if (!userSnap.exists()) {
    // New profile creation
    const initialRole: UserRole = isDefaultAdmin ? 'admin' : 'user';
    const newProfile: Omit<AppUserProfile, 'createdAt' | 'lastLoginAt'> & {
      createdAt: any;
      lastLoginAt: any;
    } = {
      uid: firebaseUser.uid,
      email: normalizedEmail,
      displayName: firebaseUser.displayName || null,
      photoURL: firebaseUser.photoURL || null,
      role: initialRole,
      createdAt: serverTimestamp(),
      lastLoginAt: serverTimestamp(),
    };

    await setDoc(userRef, newProfile);

    return {
      uid: firebaseUser.uid,
      email: normalizedEmail,
      displayName: firebaseUser.displayName || null,
      photoURL: firebaseUser.photoURL || null,
      role: initialRole,
    };
  }

  // Existing profile update: update metadata and lastLogin, keep existing role intact
  const existingData = userSnap.data() as AppUserProfile;
  const currentRole: UserRole = existingData.role || (isDefaultAdmin ? 'admin' : 'user');

  await updateDoc(userRef, {
    displayName: firebaseUser.displayName || existingData.displayName || null,
    photoURL: firebaseUser.photoURL || existingData.photoURL || null,
    lastLoginAt: serverTimestamp(),
  });

  return {
    ...existingData,
    displayName: firebaseUser.displayName || existingData.displayName,
    photoURL: firebaseUser.photoURL || existingData.photoURL,
    role: currentRole,
  };
}

/**
 * Fetches a single user profile from Firestore by UID.
 */
export async function getUserProfile(uid: string): Promise<AppUserProfile | null> {
  const userRef = doc(db, USERS_COLLECTION, uid);
  const snap = await getDoc(userRef);
  if (!snap.exists()) {
    return null;
  }
  return snap.data() as AppUserProfile;
}

/**
 * Lists all registered users (Admin only).
 */
export async function getAllUsers(): Promise<AppUserProfile[]> {
  const usersRef = collection(db, USERS_COLLECTION);
  const snapshot = await getDocs(usersRef);

  const users: AppUserProfile[] = [];
  snapshot.forEach((document) => {
    users.push(document.data() as AppUserProfile);
  });

  return users;
}

/**
 * Updates a user's role (Admin only).
 */
export async function updateUserRole(targetUid: string, newRole: UserRole): Promise<void> {
  const userRef = doc(db, USERS_COLLECTION, targetUid);
  await updateDoc(userRef, {
    role: newRole,
  });
}
