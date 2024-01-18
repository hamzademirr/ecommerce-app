import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRouter({ element }) {
  const { loggedIn } = useAuth();
  return loggedIn ? <Outlet /> : <Navigate to='/' />
}

export default ProtectedRouter