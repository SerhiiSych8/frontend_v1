'use client';

import { useState, useEffect } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Icon } from '@iconify/react';
import { toast } from 'react-toastify';
import { userAPI, UpdateProfileRequest, ChangePasswordRequest, KycUploadRequest } from '@/apis/user';
import { useAuth } from '@/contexts/AuthContext';

interface VerificationStatus {
  email: boolean;
  phone: boolean;
  kyc: 'pending' | 'approved' | 'rejected' | 'not_submitted';
}

interface ActiveSession {
  id: string;
  device: string;
  browser: string;
  ip: string;
  location: string;
  lastActive: string;
  isCurrent: boolean;
}

export default function ProfilePage() {
  const { user, refreshUser } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isUploadingKyc, setIsUploadingKyc] = useState(false);
  
  // Form states
  const [profileData, setProfileData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    country: '',
    address: '',
    city: '',
    postal_code: '',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [kycData, setKycData] = useState({
    documentType: 'passport',
    passportFile: null as File | null,
    addressFile: null as File | null,
  });

  const [verificationStatus, setVerificationStatus] = useState<VerificationStatus>({
    email: false,
    phone: false,
    kyc: 'not_submitted',
  });

  const [activeSessions, setActiveSessions] = useState<ActiveSession[]>([
    {
      id: '1',
      device: 'Chrome',
      browser: 'Chrome',
      ip: '93.86.192.47',
      location: 'RS',
      lastActive: '21.08.2025, 15:40',
      isCurrent: true,
    },
    {
      id: '2',
      device: 'iPhone',
      browser: 'Safari',
      ip: '93.86.192.47',
      location: 'RS',
      lastActive: '21.08.2025, 15:40',
      isCurrent: false,
    },
    {
      id: '3',
      device: 'Huawei',
      browser: 'Chrome Mobile',
      ip: '93.86.192.47',
      location: 'RS',
      lastActive: '21.08.2025, 15:40',
      isCurrent: false,
    },
  ]);

  useEffect(() => {
    if (user) {
      setProfileData({
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        email: user.email || '',
        phone: user.phone || '',
        country: user.country || '',
        address: user.address_line1 || '',
        city: user.city || '',
        postal_code: user.postal_code || '',
      });
      
      setVerificationStatus({
        email: user.email_verified || false,
        phone: user.phone_verified || false,
        kyc: user.kyc_verified ? 'approved' : 'not_submitted',
      });
    }
  }, [user]);

  const handleProfileInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  const handleKycFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'passport' | 'address') => {
    const file = e.target.files?.[0];
    if (file) {
      setKycData(prev => ({
        ...prev,
        [type === 'passport' ? 'passportFile' : 'addressFile']: file,
      }));
    }
  };

  const handleSaveProfile = async () => {
    try {
      const updateData: UpdateProfileRequest = {
        first_name: profileData.first_name,
        last_name: profileData.last_name,
        phone: profileData.phone,
        country: profileData.country,
        address: profileData.address,
        city: profileData.city,
        postal_code: profileData.postal_code,
      };
      
      await userAPI.updateProfile(updateData);
      toast.success('Profile updated successfully');
      setIsEditing(false);
      await refreshUser();
    } catch (error) {
      console.error('Profile update error:', error);
      toast.error('Failed to update profile');
    }
  };

  const handleChangePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    try {
      const passwordRequest: ChangePasswordRequest = {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      };
      
      await userAPI.changePassword(passwordRequest);
      toast.success('Password changed successfully');
      setIsChangingPassword(false);
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      console.error('Password change error:', error);
      toast.error('Failed to change password');
    }
  };

  const handleSendVerification = async (type: 'email' | 'phone') => {
    try {
      if (type === 'email') {
        await userAPI.sendEmailVerification();
      } else {
        await userAPI.sendPhoneVerification(profileData.phone);
      }
      toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} verification sent`);
    } catch (error) {
      console.error(`${type} verification error:`, error);
      toast.error(`Failed to send ${type} verification`);
    }
  };

  const handleUploadKyc = async () => {
    if (!kycData.passportFile || !kycData.addressFile) {
      toast.error('Please upload both documents');
      return;
    }

    setIsUploadingKyc(true);
    try {
      const kycRequest: KycUploadRequest = {
        documentType: kycData.documentType as 'passport' | 'id_card',
        passportFile: kycData.passportFile,
        addressFile: kycData.addressFile,
      };
      
      await userAPI.uploadKycDocuments(kycRequest);
      toast.success('KYC documents uploaded successfully');
      setVerificationStatus(prev => ({ ...prev, kyc: 'pending' }));
    } catch (error) {
      console.error('KYC upload error:', error);
      toast.error('Failed to upload KYC documents');
    } finally {
      setIsUploadingKyc(false);
    }
  };

  const handleTerminateSessions = async () => {
    try {
      await userAPI.terminateAllSessions();
      toast.success('All sessions terminated');
      setActiveSessions(prev => prev.filter(session => session.isCurrent));
    } catch (error) {
      console.error('Terminate sessions error:', error);
      toast.error('Failed to terminate sessions');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'text-green-400';
      case 'pending': return 'text-yellow-400';
      case 'rejected': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved': return 'Verified';
      case 'pending': return 'In Progress';
      case 'rejected': return 'Rejected';
      default: return 'Not Submitted';
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-dark-primary rounded-xl">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <div className="lg:w-64 bg-[#182641] rounded-2xl p-6 h-fit">
              {/* User Info */}
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-yellow-primary/50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon icon="mdi:account" className="w-12 h-12" />
                </div>
                <h3 className="text-lg font-bold">{user?.first_name} {user?.last_name}</h3>
                <p className="text-sm text-gray-400">Username567</p>
              </div>

              {/* Navigation */}
              <nav className="space-y-2">
                {[
                  { id: 'profile', label: 'Profile', icon: 'mdi:account' },
                  { id: 'verification', label: 'Verification', icon: 'mdi:shield-check' },
                  { id: 'security', label: 'Security', icon: 'mdi:lock' },
                  { id: 'sessions', label: 'Active Sessions', icon: 'mdi:devices' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === item.id
                        ? 'bg-[#E0FE08] text-black'
                        : 'text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    <Icon icon={item.icon} className="w-5 h-5" />
                    <span>{item.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <div className="bg-[#182641] rounded-2xl p-8">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold text-[#E0FE08]">Profile Information</h2>
                      <button
                        onClick={() => setIsEditing(!isEditing)}
                        className="px-4 py-2 bg-[#E0FE08] text-black rounded-lg hover:bg-[#E0FE08]/90 transition-colors"
                      >
                        {isEditing ? 'Cancel' : 'Edit'}
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">First Name</label>
                        {isEditing ? (
                          <input
                            name="first_name"
                            value={profileData.first_name}
                            onChange={handleProfileInputChange}
                            className="w-full px-4 py-3 bg-[#0C1423] border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#E0FE08]"
                          />
                        ) : (
                          <p className="text-white">{profileData.first_name || 'Not provided'}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Last Name</label>
                        {isEditing ? (
                          <input
                            name="last_name"
                            value={profileData.last_name}
                            onChange={handleProfileInputChange}
                            className="w-full px-4 py-3 bg-[#0C1423] border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#E0FE08]"
                          />
                        ) : (
                          <p className="text-white">{profileData.last_name || 'Not provided'}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                        <div className="flex items-center space-x-2">
                          <p className="text-white flex-1">{profileData.email}</p>
                          {!verificationStatus.email && (
                            <button
                              onClick={() => handleSendVerification('email')}
                              className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                            >
                              Verify
                            </button>
                          )}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
                        <div className="flex items-center space-x-2">
                          <p className="text-white flex-1">{profileData.phone || 'Not provided'}</p>
                          {!verificationStatus.phone && (
                            <button
                              onClick={() => handleSendVerification('phone')}
                              className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                            >
                              Verify
                            </button>
                          )}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Country</label>
                        {isEditing ? (
                          <select
                            name="country"
                            value={profileData.country}
                            onChange={handleProfileInputChange}
                            className="w-full px-4 py-3 bg-[#0C1423] border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#E0FE08]"
                          >
                            <option value="">Select Country</option>
                            <option value="US">United States</option>
                            <option value="UK">United Kingdom</option>
                            <option value="CA">Canada</option>
                            <option value="AU">Australia</option>
                          </select>
                        ) : (
                          <p className="text-white">{profileData.country || 'Not provided'}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">City</label>
                        {isEditing ? (
                          <input
                            name="city"
                            value={profileData.city}
                            onChange={handleProfileInputChange}
                            className="w-full px-4 py-3 bg-[#0C1423] border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#E0FE08]"
                          />
                        ) : (
                          <p className="text-white">{profileData.city || 'Not provided'}</p>
                        )}
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-300 mb-2">Address</label>
                        {isEditing ? (
                          <input
                            name="address"
                            value={profileData.address}
                            onChange={handleProfileInputChange}
                            className="w-full px-4 py-3 bg-[#0C1423] border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#E0FE08]"
                          />
                        ) : (
                          <p className="text-white">{profileData.address || 'Not provided'}</p>
                        )}
                      </div>
                    </div>

                    {isEditing && (
                      <div className="flex space-x-4 mt-6">
                        <button
                          onClick={handleSaveProfile}
                          className="px-6 py-3 bg-[#E0FE08] text-black rounded-lg hover:bg-[#E0FE08]/90 transition-colors"
                        >
                          Save Changes
                        </button>
                        <button
                          onClick={() => setIsEditing(false)}
                          className="px-6 py-3 border border-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Verification Tab */}
              {activeTab === 'verification' && (
                <div className="space-y-6">
                  {/* KYC Verification */}
                  <div className="bg-[#182641] rounded-2xl p-8">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold text-[#E0FE08]">Verification</h2>
                      <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(verificationStatus.kyc)}`}>
                        {getStatusText(verificationStatus.kyc)}
                      </span>
                    </div>
                    <p className="text-gray-300 mb-6">Verify your account to unlock all features</p>

                    <div className="space-y-6">
                      {/* Document Type Selection */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-3">Document Type</label>
                        <div className="flex items-center space-x-4">
                          <label className="flex items-center space-x-2">
                            <input
                              type="radio"
                              name="documentType"
                              value="passport"
                              checked={kycData.documentType === 'passport'}
                              onChange={(e) => setKycData(prev => ({ ...prev, documentType: e.target.value }))}
                              className="text-[#E0FE08]"
                            />
                            <span className="text-white">Passport</span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <input
                              type="radio"
                              name="documentType"
                              value="id_card"
                              checked={kycData.documentType === 'id_card'}
                              onChange={(e) => setKycData(prev => ({ ...prev, documentType: e.target.value }))}
                              className="text-[#E0FE08]"
                            />
                            <span className="text-white">ID Card</span>
                          </label>
                        </div>
                      </div>

                      {/* Passport Upload */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-3">
                          Attach your {kycData.documentType === 'passport' ? 'Passport' : 'ID Card'}
                        </label>
                        <div className="flex items-center space-x-4">
                          <input
                            type="file"
                            accept="image/*,.pdf"
                            onChange={(e) => handleKycFileChange(e, 'passport')}
                            className="hidden"
                            id="passport-upload"
                          />
                          <label
                            htmlFor="passport-upload"
                            className="flex-1 px-4 py-3 bg-[#0C1423] border border-gray-600 rounded-lg text-gray-300 cursor-pointer hover:bg-gray-700"
                          >
                            {kycData.passportFile ? kycData.passportFile.name : 'Choose file...'}
                          </label>
                          <button className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                            Attach
                          </button>
                        </div>
                      </div>

                      {/* Address Proof Upload */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-3">
                          Attach proof of your Address
                        </label>
                        <div className="flex items-center space-x-4">
                          <input
                            type="file"
                            accept="image/*,.pdf"
                            onChange={(e) => handleKycFileChange(e, 'address')}
                            className="hidden"
                            id="address-upload"
                          />
                          <label
                            htmlFor="address-upload"
                            className="flex-1 px-4 py-3 bg-[#0C1423] border border-gray-600 rounded-lg text-gray-300 cursor-pointer hover:bg-gray-700"
                          >
                            {kycData.addressFile ? kycData.addressFile.name : 'Choose file...'}
                          </label>
                          <button className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                            Attach
                          </button>
                        </div>
                      </div>

                      <button
                        onClick={handleUploadKyc}
                        disabled={isUploadingKyc || !kycData.passportFile || !kycData.addressFile}
                        className="w-full px-6 py-3 bg-[#E0FE08] text-black rounded-lg hover:bg-[#E0FE08]/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        {isUploadingKyc ? 'Uploading...' : 'Submit Documents'}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Security Tab */}
              {activeTab === 'security' && (
                <div className="space-y-6">
                  {/* Password Section */}
                  <div className="bg-[#182641] rounded-2xl p-8">
                    <h2 className="text-2xl font-bold text-[#E0FE08] mb-6">Password</h2>
                    <p className="text-gray-300 mb-6">
                      Choose a password with letters and numbers that you'll remember, but others won't guess
                    </p>

                    {!isChangingPassword ? (
                      <div className="flex items-center space-x-4">
                        <div className="flex-1 px-4 py-3 bg-[#0C1423] border border-gray-600 rounded-lg">
                          <span className="text-gray-400">••••••••</span>
                        </div>
                        <button
                          onClick={() => setIsChangingPassword(true)}
                          className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                          Change
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Current Password</label>
                          <input
                            type="password"
                            name="currentPassword"
                            value={passwordData.currentPassword}
                            onChange={handlePasswordInputChange}
                            className="w-full px-4 py-3 bg-[#0C1423] border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#E0FE08]"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">New Password</label>
                          <input
                            type="password"
                            name="newPassword"
                            value={passwordData.newPassword}
                            onChange={handlePasswordInputChange}
                            className="w-full px-4 py-3 bg-[#0C1423] border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#E0FE08]"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Confirm New Password</label>
                          <input
                            type="password"
                            name="confirmPassword"
                            value={passwordData.confirmPassword}
                            onChange={handlePasswordInputChange}
                            className="w-full px-4 py-3 bg-[#0C1423] border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#E0FE08]"
                          />
                        </div>
                        <div className="flex space-x-4">
                          <button
                            onClick={handleChangePassword}
                            className="px-6 py-3 bg-[#E0FE08] text-black rounded-lg hover:bg-[#E0FE08]/90 transition-colors"
                          >
                            Update Password
                          </button>
                          <button
                            onClick={() => setIsChangingPassword(false)}
                            className="px-6 py-3 border border-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Active Sessions Tab */}
              {activeTab === 'sessions' && (
                <div className="space-y-6">
                  <div className="bg-[#182641] rounded-2xl p-8">
                    <h2 className="text-2xl font-bold text-[#E0FE08] mb-6">Active Sessions</h2>
                    <p className="text-gray-300 mb-6">Number of active sessions on devices</p>

                    <div className="space-y-4">
                      {activeSessions.map((session) => (
                        <div key={session.id} className="flex items-center justify-between p-4 bg-[#0C1423] rounded-lg">
                          <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-[#E0FE08] rounded-lg flex items-center justify-center">
                              <Icon 
                                icon={
                                  session.device === 'Chrome' ? 'mdi:google-chrome' :
                                  session.device === 'iPhone' ? 'mdi:apple' :
                                  'mdi:android'
                                } 
                                className="w-6 h-6 text-black" 
                              />
                            </div>
                            <div>
                              <p className="text-white font-medium">
                                {session.lastActive} / {session.browser}
                              </p>
                              <p className="text-gray-400 text-sm">{session.ip} {session.location}</p>
                            </div>
                          </div>
                          {session.isCurrent && (
                            <span className="px-2 py-1 bg-green-600 text-white text-xs rounded">
                              Current
                            </span>
                          )}
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={handleTerminateSessions}
                      className="w-full mt-6 px-6 py-3 border border-red-600 text-red-400 rounded-lg hover:bg-red-600/10 transition-colors"
                    >
                      Terminate all sessions
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}