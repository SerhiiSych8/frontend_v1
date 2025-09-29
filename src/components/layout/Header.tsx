'use client';

import { Icon } from '@iconify/react';
import Link from 'next/link';
import { useState } from 'react';

interface HeaderProps {
  user?: {
    first_name: string;
    last_name: string;
    balance: number;
    avatar?: string;
  };
  onLogin?: () => void;
  onRegister?: () => void;
  onLogout?: () => void;
}

export default function Header({ user, onLogin, onRegister, onLogout }: HeaderProps) {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  return (
    <header className="bg-[#0C1423] border-b border-[#E0FE08]/20 sticky top-0 z-10 rounded-xl">
      <div className="w-full px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex items-center space-x-3">
            {/* Hamburger Menu */}
            {/* <button className="md:hidden p-2 rounded-lg hover:bg-opacity-20 hover:bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#E0FE08]" aria-label="Toggle sidebar">
              <Icon icon="material-symbols:menu-rounded" className='w-8 h-8 text-yellow-primary/50 transition-colors duration-200 hover:text-yellow-primary' />
            </button> */}

            {/* Logo Icon */}
            <div className="w-10 h-10 bg-yellow-primary rounded-lg flex items-center justify-center">
              <div className="w-6 h-6 bg-[#0C1423] rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-yellow-primary rounded-full"></div>
              </div>
            </div>
            {/* Logo Text with Gradient */}
            <span className="text-2xl font-bold bg-gradient-to-r from-yellow-primary to-[#4ade80] bg-clip-text text-transparent hidden md:block">
              Casinade
            </span>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                {/* Balance Display */}
                <div className="h-10 hidden md:flex items-center space-x-2 bg-yellow-primary/10 px-3 py-2 rounded-lg">
                  <Icon icon="mdi:wallet" className="w-6 h-6 text-yellow-primary" />
                  <span className="text-sm font-medium text-white">
                    $0
                  </span>
                </div>

                {/* User Menu */}
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-2 bg-yellow-primary/10 hover:bg-yellow-primary/20 px-3 py-2 rounded-lg transition-colors"
                  >
                    <div className="w-6 h-6 bg-yellow-primary/50 rounded-full text-center flex items-center justify-center">
                      <Icon icon="mdi:account" className="w-4 h-4" />
                    </div>
                    <span className="hidden md:block text-sm font-medium text-white">
                      {user.first_name || "serhii"}
                    </span>
                    <Icon
                      icon="mdi:chevron-down"
                      className={`w-4 h-4 text-white transition-transform ${isUserMenuOpen ? 'rotate-180' : ''
                        }`}
                    />
                  </button>

                  {/* Dropdown Menu */}
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-[#0C1423] border border-yellow-primary/20 rounded-lg shadow-lg z-50">
                      <div className="py-1">
                        <Link href='/profile' className="flex items-center w-full px-4 py-2 text-sm text-white hover:bg-yellow-primary/10 transition-colors">
                          <Icon icon="mdi:account" className="w-4 h-4 mr-3" />
                          Profile
                        </Link>
                        <button className="flex items-center w-full px-4 py-2 text-sm text-white hover:bg-yellow-primary/10 transition-colors">
                          <Icon icon="mdi:cog" className="w-4 h-4 mr-3" />
                          Settings
                        </button>
                        <button className="flex items-center w-full px-4 py-2 text-sm text-white hover:bg-yellow-primary/10 transition-colors">
                          <Icon icon="mdi:wallet" className="w-4 h-4 mr-3" />
                          Wallet
                        </button>
                        <hr className="my-1 border-yellow-primary/20" />
                        <button
                          onClick={onLogout}
                          className="flex items-center w-full px-4 py-2 text-sm text-red-400 hover:bg-red-400/10 transition-colors"
                        >
                          <Icon icon="mdi:logout" className="w-4 h-4 mr-3" />
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                {/* Search Icon */}
                <button className="text-yellow-primary hover:text-yellow-primary/80 transition-colors p-2 hidden md:block">
                  <Icon icon="mdi:magnify" className="w-6 h-6" />
                </button>

                {/* Login Button */}
                <button
                  onClick={onLogin}
                  className="bg-[#0C1423] border border-yellow-primary text-yellow-primary hover:bg-yellow-primary/10 font-medium px-4 py-2 rounded-lg transition-colors"
                >
                  Login
                </button>

                {/* Sign up Button */}
                <button
                  onClick={onRegister}
                  className="bg-yellow-primary text-[#0C1423] hover:bg-yellow-primary/90 font-medium px-4 py-2 rounded-lg transition-colors"
                >
                  Sign up
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
