import api from "./api";
import { API_ENDPOINTS } from "../config/api";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterCustomerRequest {
  name: string;
  email: string;
  password: string;
  phone: string;
}

export interface RegisterProviderRequest {
  username: string;
  email: string;
  password: string;
  service_category: string;
  first_name: string;
  last_name: string;
  phone: string;
  business_name?: string;
  experience_years?: number;
  hourly_rate?: number;
  bio?: string;
  city: string;
  address?: string;
}

export interface TokenResponse {
  access_token: string;
  token_type: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  role: "admin" | "service_provider" | "customer";
}

class AuthService {
  async login(credentials: LoginRequest): Promise<TokenResponse> {
    const response = await api.post<TokenResponse>(API_ENDPOINTS.LOGIN, credentials);
    if (response.data.access_token) {
      localStorage.setItem("access_token", response.data.access_token);
    }
    return response.data;
  }

  async registerCustomer(data: RegisterCustomerRequest): Promise<any> {
    const response = await api.post(API_ENDPOINTS.REGISTER_CUSTOMER, data);
    return response.data;
  }

  async registerProvider(data: RegisterProviderRequest): Promise<any> {
    const response = await api.post(API_ENDPOINTS.REGISTER_PROVIDER, data);
    return response.data;
  }

  logout(): void {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
  }

  getToken(): string | null {
    return localStorage.getItem("access_token");
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  setUser(user: User): void {
    localStorage.setItem("user", JSON.stringify(user));
  }

  getUser(): User | null {
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  }
}

export default new AuthService();
