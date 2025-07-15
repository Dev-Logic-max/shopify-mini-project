import { auth } from '../config/firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, OAuthProvider, updateProfile } from 'firebase/auth';

// Email/Password Signup
export const signUpWithEmail = async (email: string, password: string, fullName: string) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(userCredential.user, { displayName: fullName });
  return userCredential.user;
};

// Email/Password Login
export const loginWithEmail = async (email: string, password: string) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};

// Google Signup/Login
export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const userCredential = await signInWithPopup(auth, provider);
  return userCredential.user;
};

// Microsoft Signup/Login
export const signInWithMicrosoft = async () => {
  const provider = new OAuthProvider('microsoft.com');
  const userCredential = await signInWithPopup(auth, provider);
  return userCredential.user;
};