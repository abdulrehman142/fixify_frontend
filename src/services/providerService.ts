import api from "./api";
import { API_ENDPOINTS } from "../config/api";

export interface ProviderProfile {
  id: number;
  user_id: number;
  service_category: string;
  approval_status: "pending" | "approved" | "rejected";
  first_name: string;
  last_name: string;
  phone: string;
  business_name?: string;
  experience_years?: number;
  hourly_rate?: number;
  bio?: string;
  city: string;
  address?: string;
  created_at: string;
  user?: any;
}

export interface ApprovalStatus {
  is_approved: boolean;
  status: string;
}

export interface ProviderStats {
  total_orders: number;
  completed_orders: number;
  pending_orders: number;
  assigned_orders: number;
  in_progress_orders: number;
  total_earnings: number;
  unique_customers: number;
  average_order_value: number;
  monthly_stats: Array<{
    month: string;
    month_key: string;
    earnings: number;
    orders: number;
  }>;
}

class ProviderService {
  async getProfile(): Promise<ProviderProfile> {
    const response = await api.get<ProviderProfile>(API_ENDPOINTS.PROVIDER_PROFILE);
    return response.data;
  }

  async getApprovalStatus(): Promise<ApprovalStatus> {
    const response = await api.get<ApprovalStatus>(API_ENDPOINTS.PROVIDER_APPROVAL_STATUS);
    return response.data;
  }

  async updateProfile(data: Partial<ProviderProfile>): Promise<ProviderProfile> {
    const response = await api.put<ProviderProfile>(API_ENDPOINTS.PROVIDER_PROFILE, data);
    return response.data;
  }

  async getStats(): Promise<ProviderStats> {
    const response = await api.get<ProviderStats>(API_ENDPOINTS.PROVIDER_STATS);
    return response.data;
  }
}

export default new ProviderService();
