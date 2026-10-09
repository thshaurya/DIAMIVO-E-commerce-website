import React, { createContext, useContext, useState, useEffect } from 'react';
import { login as apiLogin, register as apiRegister, getProfile } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem('diamivo-user');
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (e) {
      return null;
    }
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem('diamivo-token') || null;
  });

  const [loading, setLoading] = useState(false);

  // Sync profile if token exists on mount
  useEffect(() => {
    const checkAuth = async () => {
      if (token) {
        try {
          const res = await getProfile();
          if (res.data) {
            setUser(res.data);
            localStorage.setItem('diamivo-user', JSON.stringify(res.data));
          }
        } catch (err) {
          // Token expired or invalid
          if (err.response?.status === 401) {
            logoutUser();
          }
        }
      }
    };
    checkAuth();
  }, [token]);

  // Login handler
  const loginUser = async (email, password) => {
    setLoading(true);
    try {
      const res = await apiLogin({ email, password });
      const authData = res.data;

      setToken(authData.token);
      setUser(authData);

      localStorage.setItem('diamivo-token', authData.token);
      localStorage.setItem('diamivo-user', JSON.stringify(authData));

      window.dispatchEvent(new Event('authUpdated'));
      return { success: true, data: authData };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || 'Login failed. Please check your credentials.'
      };
    } finally {
      setLoading(false);
    }
  };

  // Register handler
  const registerUser = async (userData) => {
    setLoading(true);
    try {
      const res = await apiRegister(userData);
      const authData = res.data;

      setToken(authData.token);
      setUser(authData);

      localStorage.setItem('diamivo-token', authData.token);
      localStorage.setItem('diamivo-user', JSON.stringify(authData));

      window.dispatchEvent(new Event('authUpdated'));
      return { success: true, data: authData };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || 'Registration failed. Please verify your details.'
      };
    } finally {
      setLoading(false);
    }
  };

  // Logout handler
  const logoutUser = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('diamivo-token');
    localStorage.removeItem('diamivo-user');
    window.dispatchEvent(new Event('authUpdated'));
  };

  // Update user state locally
  const updateUser = (newUserData) => {
    setUser((prev) => {
      const merged = { ...prev, ...newUserData };
      localStorage.setItem('diamivo-user', JSON.stringify(merged));
      return merged;
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated: !!token && !!user,
        isAdmin: user?.role === 'admin',
        loginUser,
        registerUser,
        logoutUser,
        updateUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
