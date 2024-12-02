// ProtectedRoute.tsx
import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

interface ProtectedRouteProps {
  element: React.ReactNode;
  path: string;
}

const ProtectedRoute = ({ element, path }: ProtectedRouteProps) => {
  const auth = useAuth();
  return auth?.isLoggedIn && auth.user ? (
    <Route path={path} element={element} />
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoute;
