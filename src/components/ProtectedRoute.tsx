import { Navigate, useLocation } from "react-router-dom";
import type { ReactNode } from "react";
import authService from "../services/authService";
import { getUserRoleFromToken, isTokenExpired } from "../utils/jwt";

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: "admin" | "service_provider" | "customer";
  redirectTo?: string;
}

/**
 * ProtectedRoute component that checks authentication and role
 * Redirects to appropriate login page if not authenticated or wrong role
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole, redirectTo }) => {
  const location = useLocation();
  const token = authService.getToken();

  // Check if token exists and is not expired
  if (!token || isTokenExpired(token)) {
    // Determine redirect based on current path
    const loginPath = location.pathname.startsWith("/admin")
      ? "/admin/login"
      : location.pathname.startsWith("/provider")
        ? "/provider/login"
        : "/login";

    return <Navigate to={loginPath} state={{ from: location }} replace />;
  }

  // Check role if required
  if (requiredRole) {
    const userRole = getUserRoleFromToken(token);

    if (!userRole || userRole !== requiredRole) {
      // Redirect based on user's actual role
      const roleBasedRedirect =
        userRole === "admin"
          ? "/admin/dashboard"
          : userRole === "service_provider"
            ? "/provider/dashboard"
            : "/";

      return <Navigate to={roleBasedRedirect} replace />;
    }
  }

  // If redirectTo is specified and user doesn't have required role, redirect
  if (redirectTo && requiredRole) {
    const userRole = getUserRoleFromToken(token);
    if (userRole !== requiredRole) {
      return <Navigate to={redirectTo} replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;
