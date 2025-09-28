import { apiClient } from './config';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  username?: string;
  city?: string;
  phone?: string;
  address1?: string;
  address2?: string;
  country?: string;
  postalCode?: string;
  currency?: string;
  promoCode?: string;
  acceptMarketing?: boolean;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    username?: string;
    profile_complete?: boolean;
    created_at?: string;
    updated_at?: string;
  };
  session?: any;
  token?: string;
}

export const authAPI = {
  // Login user
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    const response = await apiClient.post('/auth/login', credentials);
    return response.data;
  },

  // Register user
  register: async (userData: RegisterRequest): Promise<AuthResponse> => {
    const response = await apiClient.post('/auth/register-init', userData);
    return response.data;
  },

  // Logout user
  logout: async (): Promise<void> => {
    await apiClient.post('/auth/logout');
    if (typeof window !== 'undefined') {
      localStorage.removeItem('authToken');
    }
  },

  // Get current user profile
  getProfile: async () => {
    const response = await apiClient.get('/auth/profile');
    return response.data;
  },

  // Refresh token
  refreshToken: async (): Promise<{ token: string }> => {
    const response = await apiClient.post('/auth/refresh');
    return response.data;
  },

  // Send verification email
  sendVerificationEmail: async (email: string): Promise<AuthResponse> => {
    const response = await apiClient.post('/auth/send-verification', { email });
    return response.data;
  },

  // Verify email
  verifyEmail: async (token: string, email: string): Promise<AuthResponse> => {
    const response = await apiClient.post('/auth/verify-email', { token, email });
    return response.data;
  },

  // Complete registration (after email verification)
  completeRegistration: async (userData: RegisterRequest): Promise<AuthResponse> => {
    const response = await apiClient.post('/auth/register-complete', userData);
    return response.data;
  },

  // Forgot password
  forgotPassword: async (email: string): Promise<void> => {
    const response = await apiClient.post('/auth/forgot-password', { email });
    return response.data;
  },

  // Reset password
  resetPassword: async (token: string, newPassword: string): Promise<AuthResponse> => {
    const response = await apiClient.post('/auth/reset-password', { token, newPassword });
    return response.data;
  },
};
