import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../services/useAuth';

const UserRoute = ({ children }) => {
  const isAuthenticated = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default UserRoute;
