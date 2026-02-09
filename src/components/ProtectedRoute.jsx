import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAdmin } from '@/context/AdminContext';

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAdmin();

  if (!isLoggedIn) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default ProtectedRoute;