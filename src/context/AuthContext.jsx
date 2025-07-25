import React, { createContext, useContext, useState, useEffect } from 'react';

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

  useEffect(() => {
    // Check if user is logged in on app start
    const savedUser = localStorage.getItem('homeDecorUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password, userType = 'user') => {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && password) {
          const userData = {
            id: Date.now(),
            name: userType === 'admin' ? 'Admin User' : 'John Doe',
            email: email,
            role: userType,
            avatar: `https://images.pexels.com/photos/${userType === 'admin' ? '1222271' : '697509'}/pexels-photo-${userType === 'admin' ? '1222271' : '697509'}.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop`
          };
          setUser(userData);
          localStorage.setItem('homeDecorUser', JSON.stringify(userData));
          resolve(userData);
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 1000);
    });
  };

  const signup = (name, email, password, userType = 'user') => {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (name && email && password) {
          const userData = {
            id: Date.now(),
            name: name,
            email: email,
            role: userType,
            avatar: `https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop`
          };
          setUser(userData);
          localStorage.setItem('homeDecorUser', JSON.stringify(userData));
          resolve(userData);
        } else {
          reject(new Error('Invalid data'));
        }
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('homeDecorUser');
  };

  const resetPassword = (email) => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ message: 'Password reset email sent successfully' });
      }, 1500);
    });
  };

  const value = {
    user,
    login,
    signup,
    logout,
    resetPassword,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};