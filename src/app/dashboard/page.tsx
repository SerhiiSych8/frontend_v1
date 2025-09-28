'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/hooks/useAuth';
import { Icon } from '@iconify/react';

export default function DashboardPage() {
  const { user, isAuthenticated, isLoading } = useUser();
  const router = useRouter();
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, isLoading, router]);

  useEffect(() => {
    // Show welcome message for new users
    const isNewUser = localStorage.getItem('isNewUser');
    if (isNewUser === 'true') {
      setShowWelcome(true);
      localStorage.removeItem('isNewUser');
    }
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0C1423] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#E0FE08] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#0C1423] p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#E0FE08]">Welcome to Casinade!</h1>
            <p className="text-gray-400">Hello, {user?.firstName || 'Player'}!</p>
          </div>
          <button
            onClick={() => {
              localStorage.removeItem('authToken');
              window.location.href = '/';
            }}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </div>

        {/* Welcome Message */}
        {showWelcome && (
          <div className="bg-green-500/20 border border-green-500 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-3">
              <Icon icon="mdi:check-circle" className="w-6 h-6 text-green-400" />
              <div>
                <h3 className="text-green-400 font-bold">Registration Complete!</h3>
                <p className="text-gray-300 text-sm">
                  Your account has been successfully created. Welcome to Casinade!
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Dashboard Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Balance Card */}
          <div className="bg-[#182641] rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Balance</h3>
              <Icon icon="mdi:wallet" className="w-6 h-6 text-[#E0FE08]" />
            </div>
            <p className="text-2xl font-bold text-[#E0FE08]">${user?.balance || 0}</p>
            <p className="text-gray-400 text-sm">Available funds</p>
          </div>

          {/* Profile Card */}
          <div className="bg-[#182641] rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Profile</h3>
              <Icon icon="mdi:account" className="w-6 h-6 text-[#E0FE08]" />
            </div>
            <div className="space-y-2">
              <p className="text-white">
                <span className="text-gray-400">Name:</span> {user?.firstName} {user?.lastName}
              </p>
              <p className="text-white">
                <span className="text-gray-400">Email:</span> {user?.email}
              </p>
              <p className="text-white">
                <span className="text-gray-400">Status:</span> 
                <span className={`ml-2 ${user?.isVerified ? 'text-green-400' : 'text-yellow-400'}`}>
                  {user?.isVerified ? 'Verified' : 'Pending Verification'}
                </span>
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-[#182641] rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Quick Actions</h3>
              <Icon icon="mdi:lightning-bolt" className="w-6 h-6 text-[#E0FE08]" />
            </div>
            <div className="space-y-3">
              <button className="w-full bg-[#E0FE08] text-black font-bold py-2 px-4 rounded-lg hover:bg-[#E0FE08]/90 transition-colors">
                Deposit Funds
              </button>
              <button className="w-full bg-[#97B9FF] text-[#0C1423] font-bold py-2 px-4 rounded-lg hover:bg-[#97B9FF]/90 transition-colors">
                Play Games
              </button>
              <button className="w-full bg-gray-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors">
                View Profile
              </button>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8 bg-[#182641] rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
          <div className="text-center py-8">
            <Icon icon="mdi:history" className="w-12 h-12 text-gray-500 mx-auto mb-4" />
            <p className="text-gray-400">No recent activity</p>
            <p className="text-gray-500 text-sm">Start playing to see your activity here</p>
          </div>
        </div>
      </div>
    </div>
  );
}
