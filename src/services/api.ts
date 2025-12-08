import axios from "axios";
import type { AxiosInstance, AxiosError } from "axios";
import API_BASE_URL from "../config/api";

// Create axios instance
const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Store the navigation function (will be set by App component)
let navigateFunction: ((path: string) => void) | null = null;

export const setNavigate = (navigate: (path: string) => void) => {
  navigateFunction = navigate;
};

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem("access_token");
      localStorage.removeItem("user");

      // Determine redirect based on the request URL or current path
      const requestUrl = error.config?.url || "";
      let loginPath = "/login";

      // Check if the request was for admin or provider routes
      if (requestUrl.includes("/admin/") || requestUrl.includes("/admin")) {
        loginPath = "/admin/login";
      } else if (requestUrl.includes("/provider/") || requestUrl.includes("/provider")) {
        loginPath = "/provider/login";
      }

      // Use React Router navigation if available, otherwise fallback to window.location
      if (navigateFunction) {
        navigateFunction(loginPath);
      } else {
        // Fallback: only redirect if not already on a login page
        const currentPath = window.location.pathname;
        if (!currentPath.includes("/login")) {
          window.location.href = loginPath;
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;
