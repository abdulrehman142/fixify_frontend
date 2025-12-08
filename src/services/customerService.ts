import api from "./api";
import { API_ENDPOINTS } from "../config/api";

export interface CustomerProfile {
  id: number;
  username: string;
  email: string;
  role: string;
  created_at: string;
}

export interface CustomerProfileUpdate {
  username?: string;
  email?: string;
}

class CustomerService {
  async getProfile(): Promise<CustomerProfile> {
    const response = await api.get<CustomerProfile>(API_ENDPOINTS.CUSTOMER_PROFILE);
    return response.data;
  }

  async updateProfile(data: CustomerProfileUpdate): Promise<CustomerProfile> {
    const response = await api.put<CustomerProfile>(API_ENDPOINTS.CUSTOMER_PROFILE, data);
    return response.data;
  }
}

export default new CustomerService();
