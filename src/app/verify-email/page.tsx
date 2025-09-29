'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Icon } from '@iconify/react';

export default function VerifyEmailPage() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const token = searchParams.get('token');
        if (!token) {
          setStatus('error');
          setMessage('No verification token provided');
          return;
        }

        setStatus('success');
        setMessage('Email verified successfully! Redirecting to dashboard...');
        
        // Redirect to dashboard after 3 seconds
        setTimeout(() => {
          router.push('/dashboard');
        }, 3000);
      } catch (error: any) {
        setStatus('error');
        setMessage(error.response?.data?.message || 'Email verification failed');
      }
    };

    verifyEmail();
  }, [searchParams, router]);

  return (
    <div className="min-h-screen bg-[#0C1423] flex items-center justify-center p-4">
      <div className="bg-[#182641] rounded-2xl p-8 w-full max-w-md text-center">
        {status === 'loading' && (
          <div className="space-y-4">
            <div className="mx-auto w-16 h-16 border-4 border-[#E0FE08] border-t-transparent rounded-full animate-spin"></div>
            <h2 className="text-2xl font-bold text-[#E0FE08]">Verifying Email...</h2>
            <p className="text-gray-400">Please wait while we verify your email address.</p>
          </div>
        )}

        {status === 'success' && (
          <div className="space-y-4">
            <div className="mx-auto w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
              <Icon icon="mdi:check" className="w-8 h-8 text-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-[#E0FE08]">Email Verified!</h2>
            <p className="text-gray-400">{message}</p>
            <button
              onClick={() => router.push('/dashboard')}
              className="w-full bg-[#E0FE08] text-black font-bold py-3 px-6 rounded-lg hover:bg-[#E0FE08]/90 transition-colors"
            >
              Go to Dashboard
            </button>
          </div>
        )}

        {status === 'error' && (
          <div className="space-y-4">
            <div className="mx-auto w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center">
              <Icon icon="mdi:close" className="w-8 h-8 text-red-400" />
            </div>
            <h2 className="text-2xl font-bold text-red-400">Verification Failed</h2>
            <p className="text-gray-400">{message}</p>
            <div className="space-y-2">
              <button
                onClick={() => window.location.reload()}
                className="w-full bg-[#E0FE08] text-black font-bold py-3 px-6 rounded-lg hover:bg-[#E0FE08]/90 transition-colors"
              >
                Try Again
              </button>
              <button
                onClick={() => router.push('/')}
                className="w-full bg-gray-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Go Home
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
