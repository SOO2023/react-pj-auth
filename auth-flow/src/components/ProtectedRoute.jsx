import React from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import Unauthorized from "./Unauthorized";
import useAuthCxt from "../hooks/useAuthCxt";

const ProtectedRoute = ({ allowedRole }) => {
  const { auth } = useAuthCxt();
  const authLength = Object.entries(auth).length;
  const location = useLocation();
  return authLength === 0 ? (
    <Navigate to="/sign-in" state={{ from: location }} />
  ) : auth?.user?.role === allowedRole ? (
    <Outlet />
  ) : (
    <Unauthorized />
  );
};

export default ProtectedRoute;
