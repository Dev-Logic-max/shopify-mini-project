"use client";

import React, { useState } from "react";
import Link from 'next/link';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import "../../app/globals.css"
import { signInWithGoogle, signInWithMicrosoft, signUpWithEmail } from "@/firebaseAuthenication/auth";
import { useRouter } from "next/navigation";

const SignUp = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [terms, setTerms] = useState(false);
  const [error, setError] = useState<string | null>(null); // Explicitly type error
  const router = useRouter();

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!terms) {
      setError('Please agree to terms.');
      return;
    }
    try {
      // await signUpWithEmail(email, password, fullName);
      const userCredential = await signUpWithEmail(email, password, fullName);
      // Use userCredential if needed, e.g., log the user
      console.log('User signed up:', userCredential);
      // Call server-side route to create Shopify customer
      const response = await fetch('/api/create-shopify-customer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, fullName }),
      });
      if (!response.ok) throw new Error('Failed to create Shopify customer');
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

  const handleGoogleSignup = async () => {
    try {
      // await signInWithGoogle();
      const userCredential = await signInWithGoogle();
      const { email, displayName } = userCredential;
      const fullName = displayName || 'Unknown User';
      const response = await fetch('/api/create-shopify-customer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, fullName }),
      });
      if (!response.ok) throw new Error('Failed to create Shopify customer');
      router.push('/dashboard');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || 'Google login failed. Please try again.');
      } else {
        setError('An unexpected error occurred.');
      }
    }
  };

  const handleMicrosoftSignup = async () => {
    try {
      // await signInWithMicrosoft();
      const userCredential = await signInWithMicrosoft();
      const { email, displayName } = userCredential;
      const fullName = displayName || 'Unknown User';
      const response = await fetch('/api/create-shopify-customer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, fullName }),
      });
      if (!response.ok) throw new Error('Failed to create Shopify customer');
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
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center">
      {/* Left side - Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-2">
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        {/* For small screens only */}
        <div className="w-full sm:max-w-sm sm:px-12 block md:hidden mb-4">
          {/* Logo and Header */}
          <div className="text-center">
            <img src="/Layer_1.png" alt="Logo" className="mx-auto w-32 sm:w-36 mb-6" />
            <h2 className="text-2xl font-semibold text-[#00144F] mb-2">the Lost Library of Alexandria</h2>
            <p className="text-sm text-gray-800">
              Sign up today to <span className='text-[#00144F] font-bold'>get 10 free downloads</span>
            </p>
          </div>
        </div>
        {/* Social Logins */}
        <div className="flex gap-2 md:hidden border-2 border-white p-1 rounded-lg w-full mb-4">
          <button
            type="button"
            onClick={handleGoogleSignup}
            className="w-full flex justify-between items-center px-2 bg-white text-[#00144F] font-bold py-2 rounded-md text-[10px] hover:bg-gray-100 transition"
          >
            <img src="/google-icon.png" alt="Google" className="h-4 w-4" />
            Signup with Google
          </button>
          <button
            type="button"
            onClick={handleMicrosoftSignup}
            className="w-full flex justify-between items-center px-2 bg-white text-[#00144F] font-bold py-2 rounded-md text-[10px] hover:bg-gray-100 transition"
          >
            <img src="/microsoft-icon.png" alt="Microsoft" className="h-4 w-4" />
            Signup with Microsoft
          </button>
        </div>
        {/* Divider */}
        <div className="flex items-center justify-center gap-2 text-gray-400 text-sm w-1/2 mx-auto md:hidden">
          <div className="h-px flex-1 bg-gray-500"></div>
          <span>OR</span>
          <div className="h-px flex-1 bg-gray-500"></div>
        </div>

        {/* For large and small screens both */}
        <div className="w-full sm:max-w-sm sm:px-12 hidden md:block">
          {/* Logo and Header */}
          <div className="text-center">
            <img src="/Layer_1.png" alt="Logo" className="mx-auto w-32 sm:w-36 mb-6" />
            <h2 className="text-3xl sm:text-4xl font-semibold text-[#00144F] mb-2">Welcome back!</h2>
            <p className="text-sm text-gray-800">
              Join a Global Movement to Rebuild the Greatest Library in Human History
            </p>
          </div>
        </div>
        <div className="w-full max-w-md space-y-6 py-4 sm:p-6">
          {/* Form */}
          <form className="space-y-4 p-4 sm:p-6 rounded-lg border-2 border-white" onSubmit={handleEmailSignup}>
            {/* Full Name */}
            <div className="relative">
              <FaUser className="absolute top-1/2 left-3 transform -translate-y-1/2 text-[#00144F]" />
              <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#EAC87E]"
              />
            </div>

            {/* Email */}
            <div className="relative">
              <FaEnvelope className="absolute top-1/2 left-3 transform -translate-y-1/2 text-[#00144F]" />
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#EAC87E]"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <FaLock className="absolute top-1/2 left-3 transform -translate-y-1/2 text-[#00144F]" />
              <input
                type="password"
                placeholder="Password*"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#EAC87E]"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-[#00144F] text-white py-2 rounded-md font-semibold text-sm transition hover:bg-opacity-90"
              style={{ boxShadow: '0px 4px 14px 0px #00144F66' }}
            >
              Sign up
            </button>

            {/* Terms */}
            <div className="flex items-center justify-center mt-2 space-x-2">
              <input
                type="checkbox"
                id="terms"
                checked={terms}
                onChange={(e) => setTerms(e.target.checked)}
                className="h-4 w-4"
                required
              />
              <label htmlFor="terms" className="text-[10px] sm:text-sm text-gray-400">
                By registering you agree to our <span className="font-semibold underline text-[#00144F]">terms of use.</span>
              </label>
            </div>
          </form>

          {/* Divider */}
          <div className="md:flex items-center justify-center gap-2 text-gray-400 text-sm w-1/2 mx-auto hidden">
            <div className="h-px flex-1 bg-gray-500"></div>
            <span>OR</span>
            <div className="h-px flex-1 bg-gray-500"></div>
          </div>

          {/* Social Logins */}
          <div className="md:flex flex-col sm:flex-row gap-2 hidden">
            <button
              type="button"
              onClick={handleGoogleSignup}
              className="w-full flex items-center justify-center gap-2 bg-white text-[#00144F] font-semibold py-2 rounded-md text-sm hover:bg-gray-100 transition"
            >
              <img src="/google-icon.png" alt="Google" className="h-5 w-5" />
              Signup with Google
            </button>
            <button
              type="button"
              onClick={handleMicrosoftSignup}
              className="w-full flex items-center justify-center gap-2 bg-white text-[#00144F] font-semibold py-2 rounded-md text-sm hover:bg-gray-100 transition"
            >
              <img src="/microsoft-icon.png" alt="Microsoft" className="h-5 w-5" />
              Signup with Microsoft
            </button>
          </div>

          {/* Login link */}
          <p className="text-sm text-center sm:mt-2 text-[#00144F] font-semibold">
            Do you have an account?{' '}
            <Link href="/auth/login" className="underline font-semibold text-[#DBB973]">
              Login
            </Link>
          </p>
        </div>

        {/* Testimonial */}
        <div className="mt-8 text-center text-[#00144F] space-y-4 md:hidden block">
          {/* Profile */}
          <div className="flex flex-col items-center">
            <img
              src="/profile-logo.png"
              alt="Samantha Green"
              className="w-10 h-10 rounded-full object-cover mb-1"
            />
            <h4 className="text-sm font-semibold mb-2">Samantha Green</h4>

            {/* Stars */}
            <div className="flex items-center justify-center space-x-1 text-[#F6B928]">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                  <path d="M10 15l-5.878 3.09 1.122-6.545L.487 6.91l6.572-.955L10 0l2.941 5.955 6.572.955-4.757 4.635 1.122 6.545z" />
                </svg>
              ))}
            </div>
          </div>

          {/* Review */}
          <p className="text-xs sm:text-sm max-w-sm mx-auto leading-relaxed">
            This library truly exceeded my expectations. It began with a free digital copy of <i>The Odyssey</i>, and soon I found myself listening to audiobook after audiobook on my daily runs. It’s inspiring knowing my involvement helps make these books accessible worldwide.
          </p>

          {/* Trustpilot */}
          <div className="flex flex-row justify-center items-center gap-1">
            <img src="/star-logo.png" alt="Trustpilot" className="w-fit" />
            <h2 className="text-2xl font-bold text-[#00144F]">
              Trustpilot
            </h2>
          </div>

          {/* User Avatars */}
          <div className="flex justify-center mt-3 -space-x-2">
            {['user1.png', 'user2.png', 'user3.png', 'user4.png'].map((src, i) => (
              <img
                key={i}
                src={`/${src}`}
                alt={`user-${i}`}
                className="w-8 h-8 rounded-full border-2 border-white object-cover"
              />
            ))}
            <p className="text-xs text-[#00144F]">
              Supporting over <span className="font-semibold">3,000,000</span> users worldwide
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Image */}
      <div className="hidden md:block md:w-1/2 relative">
        <img src="/signup-banner.png" alt="Signup Books" className="object-cover h-screen w-full" />
      </div>
    </div>
  );
}

export default SignUp;

