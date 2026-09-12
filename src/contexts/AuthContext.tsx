import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { api } from '../infrastructure/api';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  accountType: 'individual' | 'business';
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing token
    const token = localStorage.getItem('auth_token');
    if (token) {
      api.setToken(token);
      // Mock user data - in real app, fetch from API
      setUser({
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        accountType: 'individual',
      });
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // Mock login - replace with actual API call
      const mockToken = 'mock_token_' + Date.now();
      localStorage.setItem('auth_token', mockToken);
      api.setToken(mockToken);
      
      setUser({
        id: '1',
        name: 'John Doe',
        email: email,
        accountType: 'individual',
      });
    } catch (error) {
      throw error;
    }
  };

  const register = async (data: any) => {
    try {
      // Mock register - replace with actual API call
      const mockToken = 'mock_token_' + Date.now();
      localStorage.setItem('auth_token', mockToken);
      api.setToken(mockToken);
      
      setUser({
        id: '1',
        name: data.name,
        email: data.email,
        accountType: data.accountType || 'individual',
      });
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    api.clearToken();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
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
