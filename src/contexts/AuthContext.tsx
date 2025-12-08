import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import authService from "../services/authService";
import type { User } from "../services/authService";
import { decodeJWT, isTokenExpired } from "../utils/jwt";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const token = authService.getToken();
    if (token && !isTokenExpired(token)) {
      const payload = decodeJWT(token);
      if (payload) {
        const userData: User = {
          id: payload.id,
          username: payload.username,
          email: payload.email,
          role: payload.role,
        };
        authService.setUser(userData);
        setUser(userData);
      }
    } else if (token && isTokenExpired(token)) {
      // Token expired, clear it
      authService.logout();
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const response = await authService.login({ email, password });
    const token = response.access_token;
    if (token) {
      // Decode JWT to get user info
      const payload = decodeJWT(token);
      if (payload) {
        const userData: User = {
          id: payload.id,
          username: payload.username,
          email: payload.email,
          role: payload.role,
        };
        authService.setUser(userData);
        setUser(userData);
      } else {
        // Fallback if decoding fails
        const userData: User = {
          id: 0,
          username: email.split("@")[0],
          email: email,
          role: "customer", // Default fallback
        };
        authService.setUser(userData);
        setUser(userData);
      }
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
