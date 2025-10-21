import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../AuthContext/auth.context";

export default function RoleBasedRoute({ element, allowedRoles, userRole1 }) {
  // const { userRole } = useContext(AuthContext); // use live state
  const userRole = sessionStorage.getItem("role");
  if (userRole === null) {
    return <Navigate to="/" replace />; // treat null as logged out
  }
  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" replace />;
  }
  return element;
}
