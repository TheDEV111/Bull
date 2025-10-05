import axios, { AxiosInstance } from 'axios';

// Export TypeScript interfaces
export interface User {
  id: string;
  username: string;
  email: string;
  status?: number;
  tfa_status?: number;
  kyc_status?: number;
  favourites?: string[];
  liked?: string[];
}

export interface LoginResponse {
  success: boolean;
  token?: string;
  user?: User;
  requiresTFA?: boolean;
  tempToken?: string;
  message?: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  refer?: string;
  walletAddress?: string;
  walletType?: string;
}

// Configure axios defaults
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:13578';
console.log('🔧 AuthService loaded - API_BASE_URL:', API_BASE_URL);

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Token management
const TOKEN_KEY = 'bullana_auth_token';
const USER_KEY = 'bullana_user_data';

class AuthService {
  constructor() {
    // Add token to requests if available
    this.setupInterceptors();
  }

  setupInterceptors() {
    // Add token to all requests
    apiClient.interceptors.request.use(
      (config) => {
        const token = this.getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Handle token expiration
    apiClient.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          this.logout();
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  // Token management methods
  setToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  removeToken() {
    localStorage.removeItem(TOKEN_KEY);
  }

  // User data management
  setUser(user: any) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  getUser() {
    const userData = localStorage.getItem(USER_KEY);
    return userData ? JSON.parse(userData) : null;
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;

    try {
      // Decode JWT payload (basic check)
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Date.now() / 1000;
      return payload.exp > currentTime;
    } catch {
      return false;
    }
  }

  // Login with email and password
  async login(email: string, password: string): Promise<LoginResponse> {
    try {
      const response = await apiClient.post('/basic/auth/login', {
        email,
        password,
      });

      const { success, token, user, requiresTFA } = response.data;

      if (success && !requiresTFA) {
        this.setToken(token);
        this.setUser(user);
      }

      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  }

  // Verify 2FA code
  async verify2FA(tempToken: string, tfaCode: string) {
    try {
      const response = await apiClient.post('/basic/auth/verify-2fa', {
        tempToken,
        tfaCode,
      });

      const { success, token, user } = response.data;

      if (success) {
        this.setToken(token);
        this.setUser(user);
      }

      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || '2FA verification failed');
    }
  }

  // Get current user profile
  async getCurrentUser() {
    try {
      const response = await apiClient.get('/basic/auth/profile');
      const { user } = response.data;
      
      if (user) {
        this.setUser(user);
      }
      
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to get user profile');
    }
  }

  // Logout user
  async logout() {
    try {
      // Call backend logout endpoint
      await apiClient.post('/basic/auth/logout');
    } catch (error) {
      // Even if backend call fails, we still want to clear local data
      console.warn('Logout API call failed:', error);
    } finally {
      // Clear all authentication data
      this.clearAllData();
    }
  }

  // Clear all stored authentication data
  clearAllData() {
    this.removeToken();
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem('wallet_data'); // Clear wallet data if any
    console.log('🧹 All authentication data cleared');
  }

  // Check if token is valid
  async validateToken() {
    try {
      const response = await apiClient.get('/basic/auth/validate');
      return response.data.valid;
    } catch (error) {
      return false;
    }
  }

  // Register new user (v3 - enhanced debugging)
  async register(userData: RegisterData): Promise<any> {
    try {
      console.log('🚀 Registration request started:', userData);
      console.log('🌐 API Base URL:', apiClient.defaults.baseURL);
      console.log('🔗 Request URL:', `${apiClient.defaults.baseURL}/basic/signup`);
      
      const response = await apiClient.post('/basic/signup', userData);
      
      console.log('📡 Raw response status:', response.status);
      console.log('📡 Raw response headers:', response.headers);
      console.log('📦 Response data:', response.data);
      
      // Handle both success formats (0/1 and true/false)
      const isSuccess = response.data.success === 1 || response.data.success === true;
      const message = response.data.msg || response.data.message;
      
      if (isSuccess) {
        console.log('✅ Registration successful:', message);
        return {
          success: true,
          data: response.data,
          message: message
        };
      } else {
        console.log('❌ Registration failed:', message);
        // Throw error instead of returning failure object
        throw new Error(message || 'Registration failed');
      }
    } catch (error: any) {
      console.error('💥 Registration network error:', error);
      console.error('💥 Error response:', error.response?.data);
      console.error('💥 Error status:', error.response?.status);
      console.error('💥 Error config:', error.config);
      
      // More detailed error handling
      if (error.response?.data?.msg) {
        throw new Error(error.response.data.msg);
      } else if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      } else if (error.response?.data) {
        throw new Error(JSON.stringify(error.response.data));
      } else {
        throw new Error(error.message || 'Registration failed - Network or server error');
      }
    }
  }

  // Check if user already exists
  async checkUserExists(email: string, username: string): Promise<any> {
    try {
      const response = await apiClient.post('/basic/check-user-exists', {
        email,
        username
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to check user existence');
    }
  }

  // Verify registration email
  async verifyRegistration(email: string, verificationCode: string): Promise<any> {
    try {
      const response = await apiClient.post('/basic/verify-registration', {
        email,
        verificationCode
      });
      
      const { success, token, user } = response.data;

      if (success && token && user) {
        this.setToken(token);
        this.setUser(user);
      }

      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Email verification failed');
    }
  }

  // Resend verification code  
  async resendVerificationCode(email: string): Promise<any> {
    try {
      const response = await apiClient.post('/basic/resend-verification', {
        email
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to resend verification code');
    }
  }

  // Forgot password
  async forgotPassword(email: string) {
    try {
      const response = await apiClient.post('/basic/forgotPassword', {
        resetemail: email,
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Password reset failed');
    }
  }

  // Reset password
  async resetPassword(token: string, newPassword: string) {
    try {
      const response = await apiClient.post('/basic/resetPassword', {
        token,
        newPassword,
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Password reset failed');
    }
  }

  // Update user profile
  async updateProfile(profileData: any) {
    try {
      const response = await apiClient.put('/basic/auth/profile', profileData);
      
      if (response.data.success && response.data.user) {
        this.setUser(response.data.user);
      }
      
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Profile update failed');
    }
  }

  // Change password
  async changePassword(currentPassword: string, newPassword: string) {
    try {
      const response = await apiClient.post('/basic/auth/change-password', {
        currentPassword,
        newPassword,
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Password change failed');
    }
  }

  // Enable/Disable 2FA
  async setup2FA() {
    try {
      const response = await apiClient.post('/basic/auth/setup-2fa');
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || '2FA setup failed');
    }
  }

  async verify2FASetup(tfaCode: string) {
    try {
      const response = await apiClient.post('/basic/auth/verify-2fa-setup', {
        tfaCode,
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || '2FA verification failed');
    }
  }

  async disable2FA(tfaCode: string) {
    try {
      const response = await apiClient.post('/basic/auth/disable-2fa', {
        tfaCode,
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || '2FA disable failed');
    }
  }

  // Refresh user data
  async refreshUser() {
    try {
      const response = await this.getCurrentUser();
      return response.user;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to refresh user data');
    }
  }
}

// Create and export singleton instance
const authService = new AuthService();
export default authService;
