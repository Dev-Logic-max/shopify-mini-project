"use client";

import { loginWithEmail, signInWithGoogle, signInWithMicrosoft } from "@/firebaseAuthenication/auth";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [terms, setTerms] = useState(false);
  const [error, setError] = useState<string | null>(null); // Explicitly type error
  const router = useRouter();

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!terms) {
      setError('Please agree to terms.');
      return;
    }
    try {
      await loginWithEmail(email, password);
      router.push('/dashboard');
    } catch (err: unknown) {
      // Narrow the type
      if (err instanceof Error) {
        setError(err.message || 'Login failed. Please try again.');
      } else {
        setError('An unexpected error occurred.');
      }
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      router.push('/dashboard');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || 'Google login failed. Please try again.');
      } else {
        setError('An unexpected error occurred.');
      }
    }
  };

  const handleMicrosoftLogin = async () => {
    try {
      await signInWithMicrosoft();
      router.push('/dashboard');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || 'Microsoft login failed. Please try again.');
      } else {
        setError('An unexpected error occurred.');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#00144F] px-4">
      <div className="max-w-lg w-full py-12">
        {/* Logo + Header */}
        <div className="text-center sm:px-12 mx-auto w-full sm:w-md">
          <img src="/Layer_1.png" alt="Logo" className="mx-auto w-36 sm:w-44 lg:48 mb-6" />
          <h2 className="text-3xl sm:text-4xl font-semibold text-[#EAC87E] mb-3">Welcome back!</h2>
          <p className="text-sm text-white mb-6">
            Join a Global Movement to Rebuild the Greatest Library in Human History
          </p>
        </div>

        <div className="bg-white space-y-6 p-4 sm:p-8 rounded-xl shadow-md">
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          {/* Form */}
          <form className="space-y-4" onSubmit={handleEmailLogin}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#00144F]">
                Email Address<span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
                className="mt-1 w-full px-4 py-2 border border-[#D9D9D9] rounded-md focus:outline-none focus:ring-2 focus:ring-[#EAC87E] text-sm"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#00144F]">
                Password<span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
                className="mt-1 w-full px-4 py-2 border border-[#D9D9D9] rounded-md focus:outline-none focus:ring-2 focus:ring-[#EAC87E] text-sm"
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="terms"
                checked={terms}
                onChange={(e) => setTerms(e.target.checked)}
                className="h-4 w-4"
              />
              <label htmlFor="terms" className="text-sm text-[#00144F]">
                I agree to the <span className="font-semibold underline">terms & policy</span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-[#EAC87E] text-[#00144F] py-2 font-semibold rounded-md hover:bg-[#d4b466] transition"
            >
              Login
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center justify-center gap-2 text-gray-400 text-sm w-1/2 mx-auto">
            <div className="h-px flex-1 bg-gray-500"></div>
            <span>OR</span>
            <div className="h-px flex-1 bg-gray-500"></div>
          </div>

          {/* Social Logins */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-2 border border-[#D9D9D9] py-2 rounded-md hover:bg-gray-100 transition"
            >
              <img src="/google-icon.png" alt="Google" className="h-5 w-5" />
              <span className="text-sm font-medium text-[#00144F]">Sign in with Google</span>
            </button>
            <button
              type="button"
              onClick={handleMicrosoftLogin}
              className="w-full flex items-center justify-center gap-2 border border-[#D9D9D9] py-2 rounded-md hover:bg-gray-100 transition"
            >
              <img src="/microsoft-icon.png" alt="Microsoft" className="h-5 w-5" />
              <span className="text-sm font-medium text-[#00144F]">Sign in with Microsoft</span>
            </button>
          </div>

          {/* Sign Up */}
          <p className="text-sm text-center text-[#00144F]">
            Don’t have an account?{' '}
            <a href="/auth/signup" className="font-semibold underline text-[#00144F]">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
