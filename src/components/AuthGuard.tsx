'use client';

import { ReactNode } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Icon } from '@iconify/react';

interface AuthGuardProps {
  children: ReactNode;
  fallback?: ReactNode;
  redirectTo?: string;
}

export default function AuthGuard({ 
  children, 
  fallback,
  redirectTo = '/' 
}: AuthGuardProps) {
  const { isAuthenticated, isLoading } = useAuth();

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-lavendar border-t-primary-yellow rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-foreground">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, show fallback or redirect
  if (!isAuthenticated) {
    if (fallback) {
      return <>{fallback}</>;
    }

    // Default fallback - redirect to login
    if (typeof window !== 'undefined') {
      window.location.href = redirectTo;
    }

    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Icon icon="mdi:lock" className="w-16 h-16 text-primary-lavendar mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-2">Authentication Required</h2>
          <p className="text-foreground/70 mb-6">Please log in to access this page.</p>
          <button 
            onClick={() => window.location.href = '/'}
            className="bg-primary-yellow text-primary-dark hover:bg-primary-yellow/90 font-bold px-6 py-3 rounded-lg transition-colors"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  // If authenticated, render children
  return <>{children}</>;
}
