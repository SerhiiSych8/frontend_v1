'use client';

import { ReactNode, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Icon } from '@iconify/react';

interface GuestGuardProps {
  children: ReactNode;
  redirectTo?: string;
}

export default function GuestGuard({ 
  children, 
  redirectTo = '/' 
}: GuestGuardProps) {
  const { isAuthenticated, isLoading } = useAuth();

  // Redirect if already authenticated
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      window.location.href = redirectTo;
    }
  }, [isAuthenticated, isLoading, redirectTo]);

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

  // If authenticated, show redirect message
  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Icon icon="mdi:check-circle" className="w-16 h-16 text-primary-yellow mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-2">Already Logged In</h2>
          <p className="text-foreground/70 mb-6">You are already authenticated. Redirecting...</p>
          <div className="w-8 h-8 border-4 border-primary-lavendar border-t-primary-yellow rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    );
  }

  // If not authenticated, render children (login/register forms)
  return <>{children}</>;
}
