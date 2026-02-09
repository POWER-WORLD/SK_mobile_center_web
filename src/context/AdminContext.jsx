import React, { createContext, useState, useEffect, useContext } from 'react';
import { adminAPI } from '@/services/api';

const AdminContext = createContext();

export const useAdmin = () => useContext(AdminContext);

export const AdminProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const token = localStorage.getItem('adminToken');
    const user = localStorage.getItem('adminUser');
    return {
      isLoggedIn: !!token,
      adminName: user ? JSON.parse(user).username : '',
      user: user ? JSON.parse(user) : null,
    };
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (username, password) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await adminAPI.login(username, password);
      
      setAuth({
        isLoggedIn: true,
        adminName: data.user.username,
        user: data.user,
      });
      
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    adminAPI.logout();
    setAuth({
      isLoggedIn: false,
      adminName: '',
      user: null,
    });
  };

  return (
    <AdminContext.Provider value={{ ...auth, login, logout, loading, error }}>
      {children}
    </AdminContext.Provider>
  );
};