'use client';

import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { useLogin } from '@/hooks/useAuth';
import ForgotPasswordModal from './forgot-password';
import { toast } from 'react-toastify';

interface SigninModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    onSwitchToSignup: () => void;
}

interface SigninData {
    email: string;
    password: string;
    rememberMe: boolean;
}

export default function SigninModal({ isOpen, onClose, onSuccess, onSwitchToSignup }: SigninModalProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);

    const [signinData, setSigninData] = useState<SigninData>({
        email: '',
        password: '',
        rememberMe: false,
    });

    const { login, isLoggingIn, error, clearError } = useLogin();

    // Reset form when modal opens/closes
    useEffect(() => {
        if (isOpen) {
            setSigninData({
                email: '',
                password: '',
                rememberMe: false,
            });
            setErrors({});
            clearError();
        }
    }, [isOpen, clearError]);

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};

        if (!signinData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(signinData.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!signinData.password) {
            newErrors.password = 'Password is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsSubmitting(true);
        try {
            const response = await login({
                email: signinData.email,
                password: signinData.password,
            });
            // Handle remember me functionality
            if (signinData.rememberMe) {
                // Token is already stored in localStorage by the auth context
                // You could add additional logic here if needed
            }
            if (response && response.success) {
                toast.success(response.message);
                onSuccess();
            }
        } catch (err) {
            console.error('Signin error:', err);
            toast.error((err as any)?.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleClose = () => {
        if (isSubmitting) return;
        onClose();
    };

    const handleForgotPassword = () => {
        setIsForgotPasswordOpen(true);
    };

    if (!isOpen) return null;

    return (
        <>
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

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Title */}
                        <div className="text-center">
                            <h2 className="text-2xl font-bold text-[#E0FE08] mb-2">
                                Welcome Back!
                            </h2>
                            <p className="text-gray-400 text-sm">
                                Sign in to your Casinade account
                            </p>
                        </div>

                        {/* Email Field */}
                        <div>
                            <label className="block text-[#E0FE08] text-sm font-medium mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                value={signinData.email}
                                onChange={(e) => setSigninData(prev => ({ ...prev, email: e.target.value }))}
                                className={`w-full px-4 py-3 bg-[#182641] border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E0FE08] ${errors.email ? 'border-red-500' : 'border-[#E0FE08]'
                                    }`}
                                placeholder="Enter your email"
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                            )}
                        </div>

                        {/* Password Field */}
                        <div>
                            <label className="block text-[#E0FE08] text-sm font-medium mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={signinData.password}
                                    onChange={(e) => setSigninData(prev => ({ ...prev, password: e.target.value }))}
                                    className={`w-full px-4 py-3 bg-[#182641] border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E0FE08] pr-12 ${errors.password ? 'border-red-500' : 'border-[#E0FE08]'
                                        }`}
                                    placeholder="Enter your password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#E0FE08]"
                                >
                                    <Icon icon={showPassword ? 'mdi:eye-off' : 'mdi:eye'} className="w-5 h-5" />
                                </button>
                            </div>
                            {errors.password && (
                                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                            )}
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <input
                                    type="checkbox"
                                    id="rememberMe"
                                    checked={signinData.rememberMe}
                                    onChange={(e) => setSigninData(prev => ({ ...prev, rememberMe: e.target.checked }))}
                                    className="w-4 h-4 text-[#E0FE08] bg-[#182641] border-[#E0FE08] rounded focus:ring-[#E0FE08]"
                                />
                                <label htmlFor="rememberMe" className="text-sm text-white">
                                    Remember me
                                </label>
                            </div>
                            <button
                                type="button"
                                onClick={handleForgotPassword}
                                className="text-sm text-[#E0FE08] hover:text-[#E0FE08]/80 underline"
                            >
                                Forgot password?
                            </button>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="bg-red-500/20 border border-red-500 rounded-lg p-3">
                                <p className="text-red-400 text-sm">{error}</p>
                            </div>
                        )}

                        {/* Sign In Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting || isLoggingIn}
                            className="w-full bg-[#E0FE08] text-black font-bold py-3 px-6 rounded-lg hover:bg-[#E0FE08]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting || isLoggingIn ? 'Signing In...' : 'Sign In'}
                        </button>

                        {/* Divider */}
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-600"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-[#0C1423] text-gray-400">or</span>
                            </div>
                        </div>

                        {/* Social Login Buttons */}
                        {/* <div className="space-y-3">
                            <button
                                type="button"
                                className="w-full bg-[#182641] border border-gray-600 text-white font-medium py-3 px-6 rounded-lg hover:bg-[#182641]/80 transition-colors flex items-center justify-center space-x-2"
                            >
                                <Icon icon="mdi:google" className="w-5 h-5" />
                                <span>Continue with Google</span>
                            </button>
                            <button
                                type="button"
                                className="w-full bg-[#182641] border border-gray-600 text-white font-medium py-3 px-6 rounded-lg hover:bg-[#182641]/80 transition-colors flex items-center justify-center space-x-2"
                            >
                                <Icon icon="mdi:facebook" className="w-5 h-5" />
                                <span>Continue with Facebook</span>
                            </button>
                        </div> */}

                        {/* Sign Up Link */}
                        <div className="text-center">
                            <span className="text-white">Don't have an account? </span>
                            <button
                                type="button"
                                onClick={onSwitchToSignup}
                                className="text-[#E0FE08] underline hover:text-[#E0FE08]/80"
                            >
                                Sign up
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Forgot Password Modal */}
            <ForgotPasswordModal
                isOpen={isForgotPasswordOpen}
                onClose={() => setIsForgotPasswordOpen(false)}
                onBackToSignin={() => setIsForgotPasswordOpen(false)}
            />
        </>
    );
}
