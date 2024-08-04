import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../services/useAuth';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/home" />;
  }

  return children;
};

export default ProtectedRoute;
