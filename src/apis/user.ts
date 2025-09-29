import { AuthResponse } from './auth';
import { apiClient } from './config';

export interface UserProfile {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  country: string;
  address_line1: string;
  address_line2: string;
  postal_code: string;
  city: string;
  email_verified: boolean;
  kyc_verified: boolean;
  phone_verified: boolean;
  avatar?: string;
  balance: number;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateProfileRequest {
  first_name?: string;
  last_name?: string;
  avatar?: string;
  phone?: string;
  country?: string;
  address?: string;
  city?: string;
  postal_code?: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface KycUploadRequest {
  documentType: 'passport' | 'id_card';
  passportFile: File;
  addressFile: File;
}

export interface VerificationResponse {
  success: boolean;
  message: string;
}

export const userAPI = {
  // Get User Session
  getSession: async (): Promise<AuthResponse> => {
    try {
      const response = await apiClient.post('/auth/session');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  // Get user profile
  getProfile: async (): Promise<UserProfile> => {
    const response = await apiClient.get('/user/profile');
    return response.data;
  },

  // Update user profile
  updateProfile: async (data: UpdateProfileRequest): Promise<UserProfile> => {
    const response = await apiClient.put('/user/profile', data);
    return response.data;
  },

  // Change password
  changePassword: async (data: ChangePasswordRequest): Promise<VerificationResponse> => {
    const response = await apiClient.put('/user/password', data);
    return response.data;
  },

  // Upload avatar
  uploadAvatar: async (file: File): Promise<{ avatarUrl: string }> => {
    const formData = new FormData();
    formData.append('avatar', file);
    
    const response = await apiClient.post('/user/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Get user balance
  getBalance: async (): Promise<{ balance: number }> => {
    const response = await apiClient.get('/user/balance');
    return response.data;
  },

  // Send email verification
  sendEmailVerification: async (): Promise<VerificationResponse> => {
    const response = await apiClient.post('/user/verify-email');
    return response.data;
  },

  // Send phone verification
  sendPhoneVerification: async (phone: string): Promise<VerificationResponse> => {
    const response = await apiClient.post('/user/verify-phone', { phone });
    return response.data;
  },

  // Upload KYC documents
  uploadKycDocuments: async (data: KycUploadRequest): Promise<VerificationResponse> => {
    const formData = new FormData();
    formData.append('documentType', data.documentType);
    formData.append('passportFile', data.passportFile);
    formData.append('addressFile', data.addressFile);
    
    const response = await apiClient.post('/user/kyc-upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Get active sessions
  getActiveSessions: async (): Promise<{ sessions: any[] }> => {
    const response = await apiClient.get('/user/sessions');
    return response.data;
  },

  // Terminate all sessions
  terminateAllSessions: async (): Promise<VerificationResponse> => {
    const response = await apiClient.post('/user/terminate-sessions');
    return response.data;
  },
};
