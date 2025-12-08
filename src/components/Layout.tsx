import React, { type ReactNode, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Footer from "../components/Footer";
import Navbar from "./Navbar";

interface LayoutProps {
  children: ReactNode;
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  showNavbar?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, darkMode, setDarkMode, showNavbar = true }) => {
  const location = useLocation();
  const { user, isAuthenticated } = useAuth();

  // Hide navbar and footer on dashboard pages (but show navbar on customer orders page)
  const isDashboardPage = useMemo(
    () => location.pathname.includes("/dashboard"),
    [location.pathname]
  );

  const shouldShowNavbar = useMemo(
    () => showNavbar && !isDashboardPage,
    [showNavbar, isDashboardPage]
  );

  // Create a key that changes when auth state changes to force re-render
  const navbarKey = useMemo(
    () => `navbar-${location.pathname}-${isAuthenticated ? user?.id || "auth" : "unauth"}`,
    [location.pathname, isAuthenticated, user?.id]
  );

  return (
    <div className="flex flex-col min-h-screen">
      {shouldShowNavbar && <Navbar key={navbarKey} darkMode={darkMode} setDarkMode={setDarkMode} />}
      <main className="flex-1">{children}</main>
      {!isDashboardPage && <Footer darkMode={darkMode} setDarkMode={setDarkMode} />}
    </div>
  );
};

export default Layout;
