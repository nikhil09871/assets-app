import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    // Redirect to login if the user is not authenticated
    return <Navigate to="/login" />;
  }

  return children; // Allow access to the route if authenticated
};

export default PrivateRoute;
