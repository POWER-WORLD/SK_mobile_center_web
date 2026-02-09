import React, { createContext, useState, useEffect, useContext } from 'react';

const AdminContext = createContext();

export const useAdmin = () => useContext(AdminContext);

export const AdminProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const stored = localStorage.getItem('adminAuth');
    return stored ? JSON.parse(stored) : { isLoggedIn: false, adminName: '', adminPassword: '' };
  });

  const login = (username, password) => {
    // Default credentials
    if (username === 'admin' && password === 'admin123') {
      const authData = { isLoggedIn: true, adminName: 'Admin User', adminPassword: password };
      setAuth(authData);
      localStorage.setItem('adminAuth', JSON.stringify(authData));
      return true;
    }
    return false;
  };

  const logout = () => {
    setAuth({ isLoggedIn: false, adminName: '', adminPassword: '' });
    localStorage.removeItem('adminAuth');
  };

  return (
    <AdminContext.Provider value={{ ...auth, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
};