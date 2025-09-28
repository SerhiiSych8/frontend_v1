'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { authAPI, LoginRequest, RegisterRequest, AuthResponse } from '@/apis/auth';
import { userAPI, UserProfile } from '@/apis/user';

interface AuthContextType {
  // State
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Actions
  login: (credentials: LoginRequest) => Promise<AuthResponse>;
  register: (userData: RegisterRequest) => Promise<AuthResponse>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  clearError: () => void;

  // Status
  isLoggingIn: boolean;
  isRegistering: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isAuthenticated = !!user;

  // Clear error function
  const clearError = () => setError(null);

  // Login function
  const login = async (credentials: LoginRequest): Promise<AuthResponse> => {
    try {
      setIsLoggingIn(true);
      setError(null);

      const response: AuthResponse = await authAPI.login(credentials);

      // Store token in localStorage if available
      if (response.token && typeof window !== 'undefined') {
        localStorage.setItem('authToken', response.token);
      }

      // Set user data if available
      if (response.user) {
        setUser({
          id: response.user.id,
          email: response.user.email,
          first_name: response.user.first_name || '',
          last_name: response.user.last_name || '',
          balance: 0, // Will be fetched separately
          isVerified: response.user.profile_complete || false,
          createdAt: response.user.created_at || new Date().toISOString(),
          updatedAt: response.user.updated_at || new Date().toISOString(),
        });
      }

      // Fetch full user profile
      return response;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Login failed. Please try again.';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Register function
  const register = async (userData: RegisterRequest): Promise<AuthResponse> => {
    try {
      setIsRegistering(true);
      setError(null);

      const response: AuthResponse = await authAPI.register(userData);

      // Check if registration was successful
      if (response.success) {
        // Store token if available
        if (response.token && typeof window !== 'undefined') {
          localStorage.setItem('authToken', response.token);
        }

        // Set user data if available
        if (response.user) {
          setUser({
            id: response.user.id,
            email: response.user.email,
            first_name: response.user.first_name || '',
            last_name: response.user.last_name || '',
            balance: 0, // Will be fetched separately
            isVerified: response.user.profile_complete || false,
            createdAt: response.user.created_at || new Date().toISOString(),
            updatedAt: response.user.updated_at || new Date().toISOString(),
          });
        }
      } else {
        throw new Error(response.message || 'Registration failed');
      }

      return response;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Registration failed. Please try again.';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsRegistering(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await authAPI.logout();
    } catch (err) {
      // Even if logout API fails, we should clear local state
      console.error('Logout API failed:', err);
    } finally {
      // Clear local state
      if (typeof window !== 'undefined') {
        localStorage.removeItem('authToken');
      }
      setUser(null);
      setError(null);
    }
  };

  // Refresh user profile
  const refreshUser = async () => {
    try {
      setIsLoading(true);
      const response = await userAPI.getSession();
      if(response && response.success) {
        setUser(response.user as UserProfile);
      }
    } catch (err) {
      console.error('Failed to refresh user profile:', err);
      // If profile fetch fails, user might not be authenticated
      if (typeof window !== 'undefined') {
        localStorage.removeItem('authToken');
      }
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Check user session
  useEffect(() => {
    if (typeof window !== undefined) {
      const authToken = localStorage?.getItem("authToken");
      if (authToken)
        refreshUser();
    }
  }, []);

  // Check authentication on mount
  // useEffect(() => {
  //   const checkAuth = async () => {
  //     try {
  //       const token = localStorage.getItem('authToken');
  //       if (token) {
  //         // Verify token by fetching user profile
  //         await refreshUser();
  //       }
  //     } catch (err) {
  //       // Token is invalid, clear it
  //       localStorage.removeItem('authToken');
  //       setUser(null);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   checkAuth();
  // }, []);

  const value: AuthContextType = {
    // State
    user,
    isAuthenticated,
    isLoading,
    error,

    // Actions
    login,
    register,
    logout,
    refreshUser,
    clearError,

    // Status
    isLoggingIn,
    isRegistering,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
