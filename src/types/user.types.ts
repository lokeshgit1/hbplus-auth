export type UserRole = 'admin' | 'user';

export interface AppUserProfile {
  uid: string;
  email: string;
  displayName: string | null;
  photoURL: string | null;
  role: UserRole;
  createdAt?: string | number | { seconds: number; nanoseconds: number };
  lastLoginAt?: string | number | { seconds: number; nanoseconds: number };
}
