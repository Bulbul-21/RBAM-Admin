import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const authToken = localStorage.getItem("authToken");

  // If no token, redirect to login page
  if (!authToken) {
    return <Navigate to="/login" replace />;
  }

  return children; // Render the component if authenticated
};

export default ProtectedRoute;
