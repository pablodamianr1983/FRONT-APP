// src/components/PrivateRoute.jsx

import React from 'react';
import { Navigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" />;
  }

  try {
    const decoded = jwt_decode(token);
    const currentTime = Date.now() / 1000;

    if (decoded.exp < currentTime) {
      localStorage.removeItem('token');
      return <Navigate to="/login" />;
    }

    return children;
  } catch (error) {
    console.error('Token inválido', error);
    localStorage.removeItem('token');
    return <Navigate to="/login" />;
  }
};

export default PrivateRoute;
