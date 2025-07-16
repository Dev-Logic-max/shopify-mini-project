import { auth } from '../config/firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, OAuthProvider, updateProfile } from 'firebase/auth';
import axios from 'axios';

// Email/Password Signup
export const signUpWithEmail = async (email: string, password: string, fullName: string) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(userCredential.user, { displayName: fullName });
  await createShopifyCustomer(email, fullName);
  return userCredential.user;
};

// Google Signup/Login
export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const userCredential = await signInWithPopup(auth, provider);
  const { email, displayName } = userCredential.user;
  const fullName = displayName || 'Unknown User';
  await createShopifyCustomer(email as string, fullName);
  return userCredential.user;
};

// Microsoft Signup/Login
export const signInWithMicrosoft = async () => {
  const provider = new OAuthProvider('microsoft.com');
  const userCredential = await signInWithPopup(auth, provider);
  const { email, displayName } = userCredential.user;
  const fullName = displayName || 'Unknown User';
  await createShopifyCustomer(email as string, fullName);
  return userCredential.user;
};

// Email/Password Login
export const loginWithEmail = async (email: string, password: string) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};

// Create Shopify customer via server-side API
const createShopifyCustomer = async (email: string, fullName: string) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/create-shopify-customer`,
      { email, fullName },
      { headers: { 'Content-Type': 'application/json' } }
    );
    return response.data.customer;
  } catch (error: unknown) {
    if (error instanceof axios.AxiosError) {
      console.error('Shopify customer creation failed:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
    } else if (error instanceof Error) {
      console.error('Shopify customer creation failed:', { message: error.message });
    } else {
      console.error('Shopify customer creation failed:', { message: 'Unknown error' });
    }
    throw error;
  }
};