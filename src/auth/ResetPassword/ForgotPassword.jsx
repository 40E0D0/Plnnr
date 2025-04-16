import React, { useState } from 'react';
import { supabase } from '../client';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleForgotPassword = async () => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: 'http://localhost:5173/forgot-password', // Replace with your production URL
      });

      if (error) {
        setMessage('Error: ' + error.message);
      } else {
        setMessage('If an account with that email exists, you will receive a reset link shortly.');
      }
    } catch (error) {
      setMessage('Something went wrong: ' + error.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen animate-fade-in bg-gray-400 text-white">
      <div className="flex flex-col w-96 bg-white text-black p-6 rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4">Looks like you forgot your password.</h1>
        <label className="mb-2 font-medium">Enter your email address here.</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 p-2 border border-gray-700 rounded bg-white"
        />
        <button
          onClick={handleForgotPassword}
          className="p-2  text-white rounded-md bg-blue-700 hover:bg-blue-500"
        >
          Send Reset Link
        </button>
        {message && <p className="mt-4 text-sm text-center">{message}</p>}
      </div>
    </div>
  );
};

export default ForgotPassword;
