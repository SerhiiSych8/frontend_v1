'use client';

import { ReactNode } from 'react';

interface MainContentProps {
  children: ReactNode;
  className?: string;
}

export default function MainContent({ children, className = '' }: MainContentProps) {
  return (
    <main className={`min-h-screen ${className}`}>
      <div className="w-full py-6">
        {children}
      </div>
    </main>
  );
}
