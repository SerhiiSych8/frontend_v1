'use client';

import { useState } from 'react';
import { Icon } from '@iconify/react';
import { authAPI } from '@/apis/auth';

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBackToSignin: () => void;
}

export default function ForgotPasswordModal({ isOpen, onClose, onBackToSignin }: ForgotPasswordModalProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    setError('');

    try {
      await authAPI.forgotPassword(email);
      setIsSuccess(true);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to send reset email');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (isSubmitting) return;
    setEmail('');
    setError('');
    setIsSuccess(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div className="relative bg-[#0C1423] rounded-2xl p-8 w-full max-w-md mx-4 animate-bounceIn">
        {/* Close Button */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-4 right-4 text-white hover:text-[#E0FE08] transition-colors"
          disabled={isSubmitting}
        >
          <Icon icon="mdi:close" className="w-6 h-6" />
        </button>

        {!isSuccess ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div className="text-center">
              <h2 className="text-2xl font-bold text-[#E0FE08] mb-2">
                Forgot Password?
              </h2>
              <p className="text-gray-400 text-sm">
                Enter your email address and we'll send you a link to reset your password.
              </p>
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-[#E0FE08] text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-[#182641] border border-[#E0FE08] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E0FE08]"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-500/20 border border-red-500 rounded-lg p-3">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || !email}
              className="w-full bg-[#E0FE08] text-black font-bold py-3 px-6 rounded-lg hover:bg-[#E0FE08]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Sending...' : 'Send Reset Link'}
            </button>

            {/* Back to Sign In */}
            <div className="text-center">
              <button
                type="button"
                onClick={onBackToSignin}
                className="text-[#E0FE08] underline hover:text-[#E0FE08]/80"
              >
                Back to Sign In
              </button>
            </div>
          </form>
        ) : (
          <div className="text-center space-y-6">
            {/* Success Icon */}
            <div className="mx-auto w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
              <Icon icon="mdi:check" className="w-8 h-8 text-green-400" />
            </div>

            {/* Success Message */}
            <div>
              <h2 className="text-2xl font-bold text-[#E0FE08] mb-2">
                Check Your Email
              </h2>
              <p className="text-gray-400">
                We've sent a password reset link to <strong>{email}</strong>
              </p>
            </div>

            {/* Instructions */}
            <div className="bg-[#182641] rounded-lg p-4 text-left">
              <p className="text-sm text-gray-300">
                Please check your email and click the reset link to create a new password.
              </p>
            </div>

            {/* Back to Sign In Button */}
            <button
              type="button"
              onClick={onBackToSignin}
              className="w-full bg-[#E0FE08] text-black font-bold py-3 px-6 rounded-lg hover:bg-[#E0FE08]/90 transition-colors"
            >
              Back to Sign In
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
