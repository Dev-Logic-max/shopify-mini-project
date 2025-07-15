import { auth } from '../config/firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, OAuthProvider, updateProfile } from 'firebase/auth';
import axios, { AxiosError } from 'axios';

// Shopify API config
const shopifyBaseUrl = `https://${process.env.SHOPIFY_STORE_DOMAIN}/admin/api/2023-07`;
const shopifyHeaders = {
  'Content-Type': 'application/json',
  'X-Shopify-Access-Token': process.env.SHOPIFY_ACCESS_TOKEN || '',
};

// Create Shopify customer
const createShopifyCustomer = async (email: string, fullName: string) => {
  try {
    const response = await axios.post(
      `${shopifyBaseUrl}/customers.json`,
      {
        customer: {
          email,
          first_name: fullName.split(' ')[0] || '',
          last_name: fullName.split(' ')[1] || '',
          tags: 'new_customer',
          verified_email: true,
        },
      },
      { headers: shopifyHeaders }
    );
    return response.data.customer;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.error('Shopify customer creation failed:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
    } else if (error instanceof Error) {
      console.error('Shopify customer creation failed:', {
        message: error.message,
      });
    } else {
      console.error('Shopify customer creation failed:', { message: 'Unknown error' });
    }
    throw error;
  }
};

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