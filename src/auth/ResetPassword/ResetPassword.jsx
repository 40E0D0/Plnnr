import React, { useState, useEffect } from 'react';
import { supabase } from '../client';
import { useLocation, Link } from 'react-router-dom';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const accessToken = searchParams.get('access_token');
    const code = searchParams.get('code');
  
    if (accessToken) {
      // Use access_token to set the session
      supabase.auth.setSession(accessToken).then(({ error }) => {
        if (error) {
          console.error('Error setting session with access token:', error.message);
          setMessage('Error setting session. Please try again.');
        } else {
          setMessage('Session established! You can now reset your password.');
        }
      });
    } else if (code) {
      // Use code to exchange for a session
      supabase.auth.exchangeCodeForSession(code).then(({ error }) => {
        if (error) {
          console.error('Error exchanging code for session:', error.message);
          setMessage('Error verifying reset code. Please try again.');
        } else {
          setMessage('Session established! You can now reset your password.');
        }
      });
    } else {
      setMessage('Invalid or missing parameters. Please request a new password reset link.');
    }
  }, [location]);
  

  const handleResetPassword = async () => {
    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Update the user's password
      const { error } = await supabase.auth.updateUser({ password });

      if (error) {
        setMessage('Error: ' + error.message);
      } else {
        setMessage('Your password has been reset successfully! You can now log in.');
      }
    } catch (error) {
      setMessage('Something went wrong: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-400 text-white">
      <div className="flex flex-col w-96 bg-white text-black p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-4">Reset Your Password</h1>
        <label className="mb-2 font-medium">New Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4 p-2 border bg-white border-gray-300 rounded"
        />
        <label className="mb-2 font-medium">Confirm Password</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="mb-4 p-2 border bg-white border-gray-300 rounded"
        />
        <button
          onClick={handleResetPassword}
          disabled={isSubmitting}
          className={`p-2 ${
            isSubmitting ? 'bg-gray-400' : 'bg-blue-700 hover:bg-blue-500'
          } text-white rounded`}
        >
          {isSubmitting ? 'Setting Password...' : 'Set New Password'}
        </button>
        {/* Back to Login Link */}
        <Link to="/" className="text-sm mt-4 text-blue-600 hover:text-blue-700 underline text-center">
                            Back to login
                    </Link>
        {message && <p className="mt-4 text-sm text-center">{message}</p>}
      </div>
    </div>
  );
};

export default ResetPassword;
