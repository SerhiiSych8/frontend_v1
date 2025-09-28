'use client';

import { useAuth as useAuthContext } from '@/contexts/AuthContext';

// Additional auth-related hooks
export function useLogin() {
  const { login, isLoggingIn, error, clearError } = useAuthContext();
  
  return {
    login,
    isLoggingIn,
    error,
    clearError,
  };
}

export function useRegister() {
  const { register, isRegistering, error, clearError } = useAuthContext();
  
  return {
    register,
    isRegistering,
    error,
    clearError,
  };
}

export function useLogout() {
  const { logout } = useAuthContext();
  
  return {
    logout,
  };
}

export function useUser() {
  const { user, isAuthenticated, isLoading } = useAuthContext();
  
  return {
    user,
    isAuthenticated,
    isLoading,
  };
}
