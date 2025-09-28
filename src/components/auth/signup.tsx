'use client';

import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { useRegister } from '@/hooks/useAuth';
import { authAPI } from '@/apis/auth';
import { toast } from 'react-toastify';

interface SignupModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    onSwitchToSignin: () => void;
}

interface InitialSignupData {
    email: string;
    password: string;
    confirmPassword: string;
    currency: string;
    promoCode: string;
    acceptTerms: boolean;
    acceptMarketing: boolean;
}

interface DetailedSignupData {
    firstName: string;
    lastName: string;
    username: string;
    birthday: string;
    city: string;
    phone: string;
    address1: string;
    address2: string;
    country: string;
    postalCode: string;
}

const CURRENCIES = [
    { value: 'EUR', label: 'Euro' },
    { value: 'USD', label: 'US Dollar' },
    { value: 'GBP', label: 'British Pound' },
    { value: 'CAD', label: 'Canadian Dollar' },
];

const COUNTRIES = [
    { value: 'US', label: 'United States' },
    { value: 'CA', label: 'Canada' },
    { value: 'GB', label: 'United Kingdom' },
    { value: 'DE', label: 'Germany' },
    { value: 'FR', label: 'France' },
    { value: 'ES', label: 'Spain' },
    { value: 'IT', label: 'Italy' },
    { value: 'AU', label: 'Australia' },
];

export default function SignupModal({ isOpen, onClose, onSuccess, onSwitchToSignin }: SignupModalProps) {
    const [step, setStep] = useState<'initial' | 'detailed' | 'verification'>("initial");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [verificationCode, setVerificationCode] = useState<string[]>(['', '', '', '', '', '']);
    const [isVerifying, setIsVerifying] = useState(false);

    const [initialData, setInitialData] = useState<InitialSignupData>({
        email: '',
        password: '',
        confirmPassword: '',
        currency: 'EUR',
        promoCode: '',
        acceptTerms: false,
        acceptMarketing: false,
    });

    const [detailedData, setDetailedData] = useState<DetailedSignupData>({
        firstName: '',
        lastName: '',
        username: '',
        birthday: '',
        city: '',
        phone: '',
        address1: '',
        address2: '',
        country: 'US',
        postalCode: '',
    });

    const { register, isRegistering, error, clearError } = useRegister();

    // Reset form when modal opens/closes
    // useEffect(() => {
    //     if (isOpen) {
    //         setStep('initial');
    //         setInitialData({
    //             email: '',
    //             password: '',
    //             confirmPassword: '',
    //             currency: 'EUR',
    //             promoCode: '',
    //             acceptTerms: false,
    //             acceptMarketing: false,
    //         });
    //         setDetailedData({
    //             firstName: '',
    //             lastName: '',
    //             username: '',
    //             birthday: '',
    //             city: '',
    //             phone: '',
    //             address1: '',
    //             address2: '',
    //             country: 'US',
    //             postalCode: '',
    //         });
    //         setErrors({});
    //         clearError();
    //     }
    // }, [isOpen, clearError]);

    const validateInitialStep = (): boolean => {
        const newErrors: Record<string, string> = {};

        if (!initialData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(initialData.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!initialData.password) {
            newErrors.password = 'Password is required';
        } else if (initialData.password.length < 8) {
            newErrors.password = 'Must be at least 8 characters long';
        }

        if (!initialData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
        } else if (initialData.password !== initialData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords don\'t match';
        }

        if (!initialData.acceptTerms) {
            newErrors.acceptTerms = 'You must accept the terms and conditions';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateDetailedStep = (): boolean => {
        const newErrors: Record<string, string> = {};

        if (!detailedData.firstName.trim()) {
            newErrors.firstName = 'First name is required';
        }

        if (!detailedData.lastName.trim()) {
            newErrors.lastName = 'Last name is required';
        }

        if (!detailedData.username.trim()) {
            newErrors.username = 'Username is required';
        } else if (detailedData.username.length < 3) {
            newErrors.username = 'Username must be at least 3 characters';
        }

        if (!detailedData.birthday) {
            newErrors.birthday = 'Date of birth is required';
        } else {
            const today = new Date();
            const birthDate = new Date(detailedData.birthday);
            let age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();

            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }

            if (age < 18) {
                newErrors.birthday = 'You must be at least 18 years old to register';
            }
        }

        if (!detailedData.city.trim()) {
            newErrors.city = 'City is required';
        }

        if (!detailedData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        }

        if (!detailedData.address1.trim()) {
            newErrors.address1 = 'Address is required';
        }

        if (!detailedData.country) {
            newErrors.country = 'Country is required';
        }

        if (!detailedData.postalCode.trim()) {
            newErrors.postalCode = 'Postal code is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInitialSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateInitialStep()) return;

        setIsSubmitting(true);
        try {
            // Send initial registration data to backend
            const initialUserData = {
                email: initialData.email,
                password: initialData.password,
                currency: initialData.currency,
                promo_code: initialData.promoCode,
                // acceptMarketing: initialData.acceptMarketing,
            };

            const response = await register(initialUserData as any);

            // Check if registration was successful
            if (response && response.success) {
                toast.success(response?.message || 'Registration successful');
                setStep('verification');
            } else {
                // Handle registration failure
                console.error('Registration failed:', response?.message);
                toast.error(response?.message || 'Registration failed');
            }
        } catch (err) {
            console.error('Initial signup error:', err);
            toast.error((err as any)?.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDetailedSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateDetailedStep()) return;

        setIsSubmitting(true);
        try {
            // Complete registration with detailed information
            const fullUserData = {
                email: initialData.email,
                first_name: detailedData.firstName,
                last_name: detailedData.lastName,
                username: detailedData.username,
                birthday: detailedData.birthday,
                city: detailedData.city,
                phone: detailedData.phone,
                address_line: detailedData.address1,
                address_line2: detailedData.address2,
                country: detailedData.country,
                postal_code: detailedData.postalCode,
            };

            // Use the complete registration API for the detailed step
            const response = await authAPI.completeRegistration(fullUserData as any);
            console.log("Complete registration response:", response);

            // Check if completion was successful
            if (response.success) {
                toast.success(response?.message || 'Registration successful');
                onSuccess();
            } else {
                console.error('Registration completion failed:', response.message);
                toast.error(response.message || 'Registration completion failed');
            }
        } catch (err) {
            console.error('Registration error:', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleVerificationCodeChange = (index: number, value: string) => {
        if (value.length > 1) return; // Only allow single digit
        
        const newCode = [...verificationCode];
        newCode[index] = value;
        setVerificationCode(newCode);
        
        // Auto-focus next input
        if (value && index < 5) {
            const nextInput = document.getElementById(`verification-${index + 1}`);
            nextInput?.focus();
        }
    };

    const handleVerificationKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
            const prevInput = document.getElementById(`verification-${index - 1}`);
            prevInput?.focus();
        }
    };

    const handleVerificationSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const code = verificationCode.join('');
        
        if (code.length !== 6) {
            setErrors({ verification: 'Please enter all 6 digits' });
            return;
        }

        setIsVerifying(true);
        try {
            const response = await authAPI.verifyEmail(code, initialData.email);
            console.log("Verification response:", response);
            if (response.success) {
                toast.success('Email verified successfully!');
                setStep('detailed');
            } else {
                setErrors({ verification: response.message || 'Invalid verification code' });
            }
        } catch (err) {
            console.error('Verification error:', err);
            setErrors({ verification: 'Verification failed. Please try again.' });
        } finally {
            setIsVerifying(false);
        }
    };

    const handleResendCode = async () => {
        try {
            await authAPI.sendVerificationEmail(initialData.email);
            toast.success('Verification code sent to your email');
            setVerificationCode(['', '', '', '', '', '']);
            setErrors({});
        } catch (err) {
            console.error('Failed to resend verification code:', err);
            toast.error('Failed to resend verification code');
        }
    };

    const handleClose = () => {
        if (isSubmitting || isVerifying) return;
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
                {step === 'initial' && (
                    <form onSubmit={handleInitialSubmit} className="space-y-2 md:space-y-4">
                        {/* Title */}
                        <div className="text-center">
                            <h2 className="text-2xl font-bold text-[#E0FE08] mb-2">
                                Join Casinade and start your winning journey today!
                            </h2>
                        </div>

                        {/* Email Field */}
                        <div>
                            <label className="hidden md:block text-[#E0FE08] text-sm font-medium mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                value={initialData.email}
                                onChange={(e) => setInitialData(prev => ({ ...prev, email: e.target.value }))}
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
                            <label className="hidden md:block text-[#E0FE08] text-sm font-medium mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={initialData.password}
                                    onChange={(e) => setInitialData(prev => ({ ...prev, password: e.target.value }))}
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

                        {/* Confirm Password Field */}
                        <div>
                            <label className="hidden md:block text-[#E0FE08] text-sm font-medium mb-2">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    value={initialData.confirmPassword}
                                    onChange={(e) => setInitialData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                                    className={`w-full px-4 py-3 bg-[#182641] border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E0FE08] pr-12 ${errors.confirmPassword ? 'border-red-500' : 'border-[#E0FE08]'
                                        }`}
                                    placeholder="Confirm your password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#E0FE08]"
                                >
                                    <Icon icon={showConfirmPassword ? 'mdi:eye-off' : 'mdi:eye'} className="w-5 h-5" />
                                </button>
                            </div>
                            {errors.confirmPassword && (
                                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                            )}
                        </div>

                        {/* Currency Selection */}
                        <div>
                            <label className="hidden md:block text-[#E0FE08] text-sm font-medium mb-2">
                                Currency
                            </label>
                            <select
                                value={initialData.currency}
                                onChange={(e) => setInitialData(prev => ({ ...prev, currency: e.target.value }))}
                                className="w-full px-4 py-3 bg-[#182641] border border-[#E0FE08] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#E0FE08]"
                            >
                                {CURRENCIES.map((currency) => (
                                    <option key={currency.value} value={currency.value}>
                                        {currency.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Promo Code Field */}
                        <div>
                            <input
                                type="text"
                                value={initialData.promoCode}
                                onChange={(e) => setInitialData(prev => ({ ...prev, promoCode: e.target.value }))}
                                className="w-full px-4 py-3 bg-[#182641] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E0FE08]"
                                placeholder="Enter the promo code (optional)"
                            />
                        </div>

                        {/* Terms and Conditions */}
                        <div className="flex items-start space-x-3">
                            <input
                                type="checkbox"
                                id="acceptTerms"
                                checked={initialData.acceptTerms}
                                onChange={(e) => setInitialData(prev => ({ ...prev, acceptTerms: e.target.checked }))}
                                className="mt-1 w-4 h-4 text-[#E0FE08] bg-[#182641] border-[#E0FE08] rounded focus:ring-[#E0FE08]"
                            />
                            <label htmlFor="acceptTerms" className="text-sm text-white">
                                I am over 18 years old and I accept the agreement with{' '}
                                <span className="text-[#E0FE08] underline cursor-pointer">Terms and conditions</span>
                            </label>
                        </div>
                        {errors.acceptTerms && (
                            <p className="text-red-500 text-sm">{errors.acceptTerms}</p>
                        )}

                        {/* Marketing Messages */}
                        <div className="flex items-start space-x-3">
                            <input
                                type="checkbox"
                                id="acceptMarketing"
                                checked={initialData.acceptMarketing}
                                onChange={(e) => setInitialData(prev => ({ ...prev, acceptMarketing: e.target.checked }))}
                                className="mt-1 w-4 h-4 text-[#E0FE08] bg-[#182641] border-gray-600 rounded focus:ring-[#E0FE08]"
                            />
                            <label htmlFor="acceptMarketing" className="text-sm text-white">
                                I agree to receive marketing messages and promotional offers via email
                            </label>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="bg-red-500/20 border border-red-500 rounded-lg p-3">
                                <p className="text-red-400 text-sm">{error}</p>
                            </div>
                        )}

                        {/* Sign Up Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-[#E0FE08] text-black font-bold py-3 px-6 rounded-lg hover:bg-[#E0FE08]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? 'Creating Account...' : 'Sign Up'}
                        </button>

                        {/* Login Link */}
                        <div className="text-center">
                            <span className="text-white">Have an account? </span>
                            <button
                                type="button"
                                onClick={onSwitchToSignin}
                                className="text-[#E0FE08] underline hover:text-[#E0FE08]/80"
                            >
                                Log in
                            </button>
                        </div>
                    </form>
                )}

                {step === 'detailed' && (
                    <form onSubmit={handleDetailedSubmit} className="space-y-4">
                        {/* Title */}
                        <div className="text-center">
                            <h2 className="text-2xl font-bold text-[#E0FE08] mb-2">
                                Complete Your Profile
                            </h2>
                        </div>

                        {/* First Name and Last Name */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-[#E0FE08] text-sm font-medium mb-2">
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    value={detailedData.firstName}
                                    onChange={(e) => setDetailedData(prev => ({ ...prev, firstName: e.target.value }))}
                                    className={`w-full px-4 py-3 bg-[#182641] border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E0FE08] ${errors.firstName ? 'border-red-500' : 'border-[#E0FE08]'
                                        }`}
                                    placeholder="First name"
                                />
                                {errors.firstName && (
                                    <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-[#E0FE08] text-sm font-medium mb-2">
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    value={detailedData.lastName}
                                    onChange={(e) => setDetailedData(prev => ({ ...prev, lastName: e.target.value }))}
                                    className={`w-full px-4 py-3 bg-[#182641] border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E0FE08] ${errors.lastName ? 'border-red-500' : 'border-[#E0FE08]'
                                        }`}
                                    placeholder="Last name"
                                />
                                {errors.lastName && (
                                    <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                                )}
                            </div>
                        </div>

                        {/* Username */}
                        <div>
                            <label className="block text-[#E0FE08] text-sm font-medium mb-2">
                                Username
                            </label>
                            <input
                                type="text"
                                value={detailedData.username}
                                onChange={(e) => setDetailedData(prev => ({ ...prev, username: e.target.value }))}
                                className={`w-full px-4 py-3 bg-[#182641] border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E0FE08] ${errors.username ? 'border-red-500' : 'border-[#E0FE08]'
                                    }`}
                                placeholder="Choose a username"
                            />
                            {errors.username && (
                                <p className="text-red-500 text-sm mt-1">{errors.username}</p>
                            )}
                        </div>

                        {/* Birthday */}
                        <div>
                            <label className="block text-[#E0FE08] text-sm font-medium mb-2">
                                Date of Birth
                            </label>
                            <input
                                type="date"
                                value={detailedData.birthday}
                                onChange={(e) => setDetailedData(prev => ({ ...prev, birthday: e.target.value }))}
                                className={`w-full px-4 py-3 bg-[#182641] border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#E0FE08] ${errors.birthday ? 'border-red-500' : 'border-[#E0FE08]'
                                    }`}
                                max={new Date().toISOString().split('T')[0]}
                            />
                            {errors.birthday && (
                                <p className="text-red-500 text-sm mt-1">{errors.birthday}</p>
                            )}
                        </div>

                        {/* City and Phone */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-[#E0FE08] text-sm font-medium mb-2">
                                    City
                                </label>
                                <input
                                    type="text"
                                    value={detailedData.city}
                                    onChange={(e) => setDetailedData(prev => ({ ...prev, city: e.target.value }))}
                                    className={`w-full px-4 py-3 bg-[#182641] border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E0FE08] ${errors.city ? 'border-red-500' : 'border-[#E0FE08]'
                                        }`}
                                    placeholder="City"
                                />
                                {errors.city && (
                                    <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-[#E0FE08] text-sm font-medium mb-2">
                                    Phone
                                </label>
                                <input
                                    type="tel"
                                    value={detailedData.phone}
                                    onChange={(e) => setDetailedData(prev => ({ ...prev, phone: e.target.value }))}
                                    className={`w-full px-4 py-3 bg-[#182641] border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E0FE08] ${errors.phone ? 'border-red-500' : 'border-[#E0FE08]'
                                        }`}
                                    placeholder="Phone number"
                                />
                                {errors.phone && (
                                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                                )}
                            </div>
                        </div>

                        {/* Address 1 */}
                        <div>
                            <label className="block text-[#E0FE08] text-sm font-medium mb-2">
                                Address Line 1
                            </label>
                            <input
                                type="text"
                                value={detailedData.address1}
                                onChange={(e) => setDetailedData(prev => ({ ...prev, address1: e.target.value }))}
                                className={`w-full px-4 py-3 bg-[#182641] border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E0FE08] ${errors.address1 ? 'border-red-500' : 'border-[#E0FE08]'
                                    }`}
                                placeholder="Street address"
                            />
                            {errors.address1 && (
                                <p className="text-red-500 text-sm mt-1">{errors.address1}</p>
                            )}
                        </div>

                        {/* Address 2 */}
                        <div>
                            <label className="block text-[#E0FE08] text-sm font-medium mb-2">
                                Address Line 2 (Optional)
                            </label>
                            <input
                                type="text"
                                value={detailedData.address2}
                                onChange={(e) => setDetailedData(prev => ({ ...prev, address2: e.target.value }))}
                                className="w-full px-4 py-3 bg-[#182641] border border-[#E0FE08] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E0FE08]"
                                placeholder="Apartment, suite, etc."
                            />
                        </div>

                        {/* Country and Postal Code */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-[#E0FE08] text-sm font-medium mb-2">
                                    Country
                                </label>
                                <select
                                    value={detailedData.country}
                                    onChange={(e) => setDetailedData(prev => ({ ...prev, country: e.target.value }))}
                                    className={`w-full px-4 py-3 bg-[#182641] border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#E0FE08] ${errors.country ? 'border-red-500' : 'border-[#E0FE08]'
                                        }`}
                                >
                                    {COUNTRIES.map((country) => (
                                        <option key={country.value} value={country.value}>
                                            {country.label}
                                        </option>
                                    ))}
                                </select>
                                {errors.country && (
                                    <p className="text-red-500 text-sm mt-1">{errors.country}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-[#E0FE08] text-sm font-medium mb-2">
                                    Postal Code
                                </label>
                                <input
                                    type="text"
                                    value={detailedData.postalCode}
                                    onChange={(e) => setDetailedData(prev => ({ ...prev, postalCode: e.target.value }))}
                                    className={`w-full px-4 py-3 bg-[#182641] border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E0FE08] ${errors.postalCode ? 'border-red-500' : 'border-[#E0FE08]'
                                        }`}
                                    placeholder="Postal code"
                                />
                                {errors.postalCode && (
                                    <p className="text-red-500 text-sm mt-1">{errors.postalCode}</p>
                                )}
                            </div>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="bg-red-500/20 border border-red-500 rounded-lg p-3">
                                <p className="text-red-400 text-sm">{error}</p>
                            </div>
                        )}

                        {/* Buttons */}
                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={() => setStep('initial')}
                                disabled={isSubmitting}
                                className="w-full flex justify-center bg-gray-600 text-yellow-primary/50 font-bold py-3 px-6 rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-nowrap text-center"
                            >
                                Back
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full flex justify-center bg-[#E0FE08] text-black font-bold py-3 px-6 rounded-lg hover:bg-[#E0FE08]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-nowrap text-center"
                            >
                                {isSubmitting ? 'Completing Account...' : 'Complete Registration'}
                            </button>
                        </div>
                    </form>
                )}

                {step === 'verification' && (
                    <form onSubmit={handleVerificationSubmit} className="space-y-6">
                        {/* Title */}
                        <div className="text-center">
                            <h2 className="text-2xl font-bold text-[#E0FE08] mb-2">
                                Verify Your Email
                            </h2>
                            <p className="text-gray-400 text-sm">
                                Enter the 6-digit code sent to <strong>{initialData.email}</strong>
                            </p>
                        </div>

                        {/* Verification Code Input */}
                        <div className="space-y-4">
                            <div className="flex justify-center space-x-3">
                                {verificationCode.map((digit, index) => (
                                    <input
                                        key={index}
                                        id={`verification-${index}`}
                                        type="text"
                                        inputMode="numeric"
                                        pattern="[0-9]"
                                        maxLength={1}
                                        value={digit}
                                        onChange={(e) => handleVerificationCodeChange(index, e.target.value)}
                                        onKeyDown={(e) => handleVerificationKeyDown(index, e)}
                                        className={`w-12 h-12 text-center text-xl font-bold bg-[#182641] border-2 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#E0FE08] ${
                                            errors.verification ? 'border-red-500' : 'border-[#E0FE08]'
                                        }`}
                                        autoComplete="off"
                                    />
                                ))}
                            </div>
                            
                            {errors.verification && (
                                <p className="text-red-500 text-sm text-center">{errors.verification}</p>
                            )}
                        </div>

                        {/* Instructions */}
                        <div className="bg-[#182641] rounded-lg p-4 text-center">
                            <p className="text-sm text-gray-300">
                                Check your email for the verification code. It may take a few minutes to arrive.
                            </p>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isVerifying || verificationCode.some(digit => !digit)}
                            className="w-full bg-[#E0FE08] text-black font-bold py-3 px-6 rounded-lg hover:bg-[#E0FE08]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isVerifying ? 'Verifying...' : 'Verify Email'}
                        </button>

                        {/* Resend Code */}
                        <div className="text-center">
                            <p className="text-gray-400 text-sm mb-2">Didn't receive the code?</p>
                            <button
                                type="button"
                                onClick={handleResendCode}
                                disabled={isVerifying}
                                className="text-[#E0FE08] underline hover:text-[#E0FE08]/80 disabled:opacity-50"
                            >
                                Resend Code
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}
