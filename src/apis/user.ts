import { AuthResponse } from './auth';
import { apiClient } from './config';

export interface UserProfile {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
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
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
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
  changePassword: async (data: ChangePasswordRequest): Promise<void> => {
    await apiClient.put('/user/password', data);
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
};
