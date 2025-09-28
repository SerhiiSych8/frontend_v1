'use client';

import { ReactNode } from 'react';
import AuthGuard from './AuthGuard';

interface ProtectedRouteProps {
  children: ReactNode;
  fallback?: ReactNode;
  redirectTo?: string;
}

export default function ProtectedRoute({ 
  children, 
  fallback,
  redirectTo = '/' 
}: ProtectedRouteProps) {
  return (
    <AuthGuard fallback={fallback} redirectTo={redirectTo}>
      {children}
    </AuthGuard>
  );
}
