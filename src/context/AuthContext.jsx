import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI, apiUtils } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if user is authenticated on app start
    const checkAuth = async () => {
      if (apiUtils.isAuthenticated()) {
        try {
          const response = await authAPI.getCurrentUser();
          if (response.success) {
            setUser(response.user);
          }
        } catch (error) {
          console.error('Auth check failed:', error);
          apiUtils.clearAuth();
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email, password, userType = 'user') => {
    try {
      setError(null);
      setLoading(true);
      
      const response = await authAPI.login({ email, password });
      
      if (response.success) {
        setUser(response.user);
        return response.user;
      } else {
        throw new Error(response.message || 'Login failed');
      }
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (name, email, password, userType = 'user') => {
    try {
      setError(null);
      setLoading(true);
      
      const response = await authAPI.register({
        name,
        email,
        password,
        role: userType
      });
      
      if (response.success) {
        setUser(response.user);
        return response.user;
      } else {
        throw new Error(response.message || 'Registration failed');
      }
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      apiUtils.clearAuth();
    }
  };

  const resetPassword = async (email) => {
    try {
      setError(null);
      const response = await authAPI.forgotPassword(email);
      return response;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const updateUser = (userData) => {
    setUser(prev => ({ ...prev, ...userData }));
  };

  const value = {
    user,
    login,
    signup,
    logout,
    resetPassword,
    updateUser,
    loading,
    error,
    setError
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};