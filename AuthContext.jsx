import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../api/axios'; // Make sure to adjust path to your existing axios instance

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        try {
          const response = await api.get('/api/auth/me');
          setUser(response.data.data);
        } catch (error) {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
        }
      }
      setLoading(false);
    };
    loadUser();
  }, []);

  const login = async (email, password) => {
    const response = await api.post('/api/auth/login', { email, password });
    const { accessToken, refreshToken, user } = response.data.data;
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    setUser(user);
    return user;
  };

  const register = async (data) => {
    await api.post('/api/auth/register', data);
  };

  const updateProfile = async (data) => {
    const response = await api.put('/api/auth/me', data);
    setUser(response.data.data);
    return response.data.data;
  };

  const logout = async () => {
    try {
      await api.post('/api/auth/logout');
    } catch (e) {} // Proceed with cleanup even if API fails
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setUser(null);
  };

  const isAuthenticated = () => !!user;

  return (
    <AuthContext.Provider value={{ user, loading, login, register, updateProfile, logout, isAuthenticated }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);