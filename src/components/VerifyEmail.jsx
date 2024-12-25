import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { sendEmailVerification } from 'firebase/auth';
import AuthLayout from './AuthLayout';

export default function VerifyEmail() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (user.emailVerified) {
      navigate('/home');
    }

    const interval = setInterval(() => {
      user.reload().then(() => {
        if (user.emailVerified) {
          navigate('/home');
        }
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [user, navigate]);

  useEffect(() => {
    if (!canResend) {
      const interval = setInterval(() => {
        setTimer((currentTimer) => {
          if (currentTimer <= 1) {
            setCanResend(true);
            return 0;
          }
          return currentTimer - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [canResend]);

  const handleResendVerification = async () => {
    try {
      await sendEmailVerification(user);
      setCanResend(false);
      setTimer(60);
    } catch (error) {
      console.error('Error sending verification email:', error);
    }
  };

  return (
    <AuthLayout>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="text-center">
            <h2 className="text-2xl font-medium text-gray-900 mb-4">Verify your email</h2>
            <p className="text-sm text-gray-600 mb-4">
              We've sent a verification email to <strong>{user?.email}</strong>
            </p>
            <p className="text-sm text-gray-600 mb-8">
              Please check your email and click the verification link.
            </p>
            
            {!canResend ? (
              <p className="text-sm text-gray-500">
                Resend verification in {timer} seconds
              </p>
            ) : (
              <button
                onClick={handleResendVerification}
                className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                Resend verification email
              </button>
            )}
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}