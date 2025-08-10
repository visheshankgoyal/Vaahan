import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

// Function to decode JWT token
const decodeToken = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();
  const token = localStorage.getItem("jwtToken");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Decode token to get user information
  const decodedToken = decodeToken(token);
  
  if (!decodedToken) {
    // Invalid token, clear storage and redirect to login
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("user");
    return <Navigate to="/login" replace />;
  }

  // Check if token is expired
  const currentTime = Date.now() / 1000;
  if (decodedToken.exp < currentTime) {
    // Token expired, clear storage and redirect to login
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("user");
    return <Navigate to="/login" replace />;
  }

  // Extract role from authorities in token
  let userRole = "USER"; // Default role
  if (decodedToken.authorities && decodedToken.authorities.length > 0) {
    const roleAuthority = decodedToken.authorities.find(auth => 
      auth.authority && auth.authority.startsWith('ROLE_')
    );
    if (roleAuthority) {
      userRole = roleAuthority.authority.replace('ROLE_', '');
    }
  }

  // Check if user has required role
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
