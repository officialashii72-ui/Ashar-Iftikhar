// app/src/context/AuthContext.tsx - COMPLETE FIXED VERSION
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { User } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored token and validate
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (token && storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing stored user:', error);
        logout();
      }
    }

    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      console.log('🔐 Attempting login with:', email);

      // Get API URL from environment
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      console.log('📡 Using API URL:', API_URL);

      // Use direct fetch to avoid axios issues
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include'
      });

      if (!response.ok) {
        let errorMessage = `HTTP error! status: ${response.status}`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch (e) {
          // Could not parse error response
        }
        
        if (response.status === 0 || response.type === 'opaque') {
          throw new Error('Cannot reach server. Is the backend running? Make sure npm run dev is started in the server directory.');
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log('Login response:', data);

      const payload = data.data || data; // Handle both wrapped and unwrapped for safety

      if (data.success && payload.token && payload.user) {
        // Store authentication
        localStorage.setItem('token', payload.token);
        localStorage.setItem('user', JSON.stringify(payload.user));
        setUser(payload.user);

        console.log('✅ Login successful for:', payload.user.email);
      } else {
        throw new Error(data.message || 'Invalid response from server');
      }

    } catch (error: any) {
      console.error('⚠️  Login error details:', error);
      
      // Provide helpful error messages
      let userFriendlyMessage = error.message;
      if (error.message.includes('fetch')) {
        userFriendlyMessage = 'Cannot connect to server. Make sure the backend is running: npm run dev in server directory';
      } else if (error.message.includes('Failed to fetch')) {
        userFriendlyMessage = 'Network error. Is the backend server running on port 5000?';
      }

      // Clear any invalid data
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setUser(null);

      throw new Error(userFriendlyMessage);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    console.log('✅ Logged out');
  };

  const updateUser = (updatedUser: User) => {
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}