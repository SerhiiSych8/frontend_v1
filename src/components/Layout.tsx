'use client';

import { ReactNode, useState, createContext, useContext } from 'react';
import Header from './layout/Header';
import Navbar from './layout/Navbar';
import Footer from './layout/Footer';
import MainContent from './MainContent';
import { useAuth } from '@/contexts/AuthContext';
import SigninModal from './auth/signin';
import SignupModal from './auth/signup';
import MainLoading from './loading/MainLoading';

// Create context for navbar state
interface NavbarContextType {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const NavbarContext = createContext<NavbarContextType | undefined>(undefined);

export const useNavbar = () => {
  const context = useContext(NavbarContext);
  if (!context) {
    throw new Error('useNavbar must be used within a NavbarProvider');
  }
  return context;
};

interface LayoutProps {
  children: ReactNode;
  showHeader?: boolean;
  showNavbar?: boolean;
  showFooter?: boolean;
}

export default function Layout({
  children,
  showHeader = true,
  showNavbar = true,
  showFooter = true
}: LayoutProps) {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [isSigninModalOpen, setIsSigninModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

  const handleLogin = () => {
    setIsSigninModalOpen(true);
  };

  const handleRegister = () => {
    setIsSignupModalOpen(true);
  };

  const handleLogout = async () => {
    try {
      await logout();
      // Optionally redirect to home page
      window.location.href = '/';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleSigninSuccess = () => {
    setIsSigninModalOpen(false);
    // Redirect to dashboard
    window.location.href = '/';
  };

  const handleSignupSuccess = () => {
    setIsSignupModalOpen(false);
    // Set new user flag for welcome message
    localStorage.setItem('isNewUser', 'true');
    // Redirect to dashboard
    window.location.href = '/';
  };

  const handleSwitchToSignup = () => {
    setIsSigninModalOpen(false);
    setIsSignupModalOpen(true);
  };

  const handleSwitchToSignin = () => {
    setIsSignupModalOpen(false);
    setIsSigninModalOpen(true);
  };

  // Convert user data to the format expected by Header component
  const headerUser = user ? {
    first_name: user.first_name,
    last_name: user.last_name,
    balance: user.balance,
    avatar: user.avatar,
  } : undefined;

  if (isLoading)
    return <MainLoading />

  return (
    <NavbarContext.Provider value={{ isOpen: isNavbarOpen, setIsOpen: setIsNavbarOpen }}>
      <div className="gap-8 min-h-screen bg-background">
        {/* Auth Modals */}
        <SigninModal
          isOpen={isSigninModalOpen}
          onClose={() => setIsSigninModalOpen(false)}
          onSuccess={handleSigninSuccess}
          onSwitchToSignup={handleSwitchToSignup}
        />

        <SignupModal
          isOpen={isSignupModalOpen}
          onClose={() => setIsSignupModalOpen(false)}
          onSuccess={handleSignupSuccess}
          onSwitchToSignin={handleSwitchToSignin}
        />

        {showNavbar && (
          <Navbar isAuthenticated={isAuthenticated} />
        )}

        <div className={`transition-all duration-500 ease-out ${isNavbarOpen ? 'md:ml-72 ml-0' : 'md:ml-24 ml-0'}`}>
          <div className="max-w-7xl flex flex-col mx-auto">
            {showHeader && (
              <Header
                user={headerUser}
                onLogin={handleLogin}
                onRegister={handleRegister}
                onLogout={handleLogout}
              />
            )}

            <MainContent>
              {children}
            </MainContent>

            {showFooter && <Footer />}
          </div>
        </div>
      </div>
    </NavbarContext.Provider>
  );
}
