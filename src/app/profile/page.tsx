'use client';

import { useState, useEffect } from 'react';
import { useAuth, useUser } from '@/hooks/useAuth';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Icon } from '@iconify/react';

export default function ProfilePage() {
  const { user, refreshUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      });
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    // Here you would call the update profile API
    console.log('Saving profile:', formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    if (user) {
      setFormData({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      });
    }
    setIsEditing(false);
  };

  return (
    <ProtectedRoute>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-2">My Profile</h1>
          <p className="text-foreground/70">Manage your account settings and preferences</p>
        </div>

        {/* Profile Card */}
        <div className="bg-primary-dark/50 rounded-2xl p-8 border border-primary-lavendar/20">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8">
            {/* Avatar */}
            <div className="flex-shrink-0">
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={`${user.firstName} ${user.lastName}`}
                  className="w-24 h-24 rounded-full object-cover"
                />
              ) : (
                <div className="w-24 h-24 bg-primary-lavendar rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary-dark">
                    {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                  </span>
                </div>
              )}
            </div>

            {/* Profile Info */}
            <div className="flex-1 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-foreground">
                  {user?.firstName} {user?.lastName}
                </h2>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="flex items-center space-x-2 px-4 py-2 bg-primary-lavendar/10 hover:bg-primary-lavendar/20 text-primary-lavendar rounded-lg transition-colors"
                >
                  <Icon icon="mdi:pencil" className="w-4 h-4" />
                  <span>{isEditing ? 'Cancel' : 'Edit'}</span>
                </button>
              </div>

              {/* Profile Form */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground/70 mb-2">
                    First Name
                  </label>
                  {isEditing ? (
                    <input
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-primary-lavendar/20 rounded-lg bg-primary-dark/50 text-foreground focus:outline-none focus:ring-2 focus:ring-primary-yellow focus:border-transparent"
                    />
                  ) : (
                    <p className="text-foreground">{user?.firstName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground/70 mb-2">
                    Last Name
                  </label>
                  {isEditing ? (
                    <input
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-primary-lavendar/20 rounded-lg bg-primary-dark/50 text-foreground focus:outline-none focus:ring-2 focus:ring-primary-yellow focus:border-transparent"
                    />
                  ) : (
                    <p className="text-foreground">{user?.lastName}</p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-foreground/70 mb-2">
                    Email
                  </label>
                  {isEditing ? (
                    <input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-primary-lavendar/20 rounded-lg bg-primary-dark/50 text-foreground focus:outline-none focus:ring-2 focus:ring-primary-yellow focus:border-transparent"
                    />
                  ) : (
                    <p className="text-foreground">{user?.email}</p>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              {isEditing && (
                <div className="flex space-x-4 pt-4">
                  <button
                    onClick={handleSave}
                    className="px-6 py-2 bg-primary-yellow text-primary-dark hover:bg-primary-yellow/90 font-medium rounded-lg transition-colors"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={handleCancel}
                    className="px-6 py-2 border border-primary-lavendar/20 text-foreground hover:bg-primary-lavendar/10 font-medium rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Account Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-primary-dark/50 rounded-xl p-6 border border-primary-lavendar/20">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-primary-yellow/10 rounded-lg flex items-center justify-center">
                <Icon icon="mdi:wallet" className="w-6 h-6 text-primary-yellow" />
              </div>
              <div>
                <p className="text-sm text-foreground/70">Account Balance</p>
                <p className="text-2xl font-bold text-foreground">
                  ${user?.balance?.toFixed(2) || '0.00'}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-primary-dark/50 rounded-xl p-6 border border-primary-lavendar/20">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-primary-lavendar/10 rounded-lg flex items-center justify-center">
                <Icon icon="mdi:calendar" className="w-6 h-6 text-primary-lavendar" />
              </div>
              <div>
                <p className="text-sm text-foreground/70">Member Since</p>
                <p className="text-lg font-semibold text-foreground">
                  {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-primary-dark/50 rounded-xl p-6 border border-primary-lavendar/20">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                <Icon icon="mdi:shield-check" className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <p className="text-sm text-foreground/70">Verification</p>
                <p className="text-lg font-semibold text-foreground">
                  {user?.isVerified ? 'Verified' : 'Pending'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-primary-dark/50 rounded-2xl p-8 border border-primary-lavendar/20">
          <h3 className="text-xl font-bold text-foreground mb-6">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button className="flex items-center space-x-3 p-4 bg-primary-lavendar/10 hover:bg-primary-lavendar/20 rounded-lg transition-colors">
              <Icon icon="mdi:wallet" className="w-5 h-5 text-primary-lavendar" />
              <span className="text-foreground">Deposit</span>
            </button>
            <button className="flex items-center space-x-3 p-4 bg-primary-lavendar/10 hover:bg-primary-lavendar/20 rounded-lg transition-colors">
              <Icon icon="mdi:download" className="w-5 h-5 text-primary-lavendar" />
              <span className="text-foreground">Withdraw</span>
            </button>
            <button className="flex items-center space-x-3 p-4 bg-primary-lavendar/10 hover:bg-primary-lavendar/20 rounded-lg transition-colors">
              <Icon icon="mdi:history" className="w-5 h-5 text-primary-lavendar" />
              <span className="text-foreground">History</span>
            </button>
            <button className="flex items-center space-x-3 p-4 bg-primary-lavendar/10 hover:bg-primary-lavendar/20 rounded-lg transition-colors">
              <Icon icon="mdi:cog" className="w-5 h-5 text-primary-lavendar" />
              <span className="text-foreground">Settings</span>
            </button>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
