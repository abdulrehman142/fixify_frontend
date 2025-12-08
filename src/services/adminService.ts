import api from "./api";
import { API_ENDPOINTS } from "../config/api";

export interface ProviderListItem {
  id: number;
  user_id: number;
  name: string;
  email: string;
  phone: string;
  service_category: string;
  business_name?: string;
  experience_years?: number;
  city: string;
  approval_status: string;
  applied_date: string;
}

export interface OrderListItem {
  id: number;
  order_number: string;
  customer_name: string;
  service_name: string;
  service_date: string;
  service_category: string;
  total_amount: number;
  status: string;
  provider_name?: string;
}

export interface Stats {
  total_providers: number;
  approved_providers: number;
  pending_providers: number;
  rejected_providers: number;
  total_orders: number;
  pending_orders: number;
  assigned_orders: number;
  completed_orders: number;
  total_customers: number;
  total_earnings: number;
  average_order_value: number;
  in_progress_orders: number;
}

export interface CustomerListItem {
  id: number;
  username: string;
  email: string;
  created_at: string;
  total_orders: number;
  total_spent: number;
}

export interface ProviderStatsDetail {
  total_orders: number;
  completed_orders: number;
  pending_orders: number;
  assigned_orders: number;
  in_progress_orders: number;
  total_earnings: number;
  unique_customers: number;
  average_order_value: number;
}

export interface CustomerStatsDetail {
  total_orders: number;
  completed_orders: number;
  pending_orders: number;
  assigned_orders: number;
  in_progress_orders: number;
  total_spent: number;
  average_order_value: number;
}

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

class AdminService {
  async getPendingProviders(): Promise<ProviderListItem[]> {
    const response = await api.get<ProviderListItem[]>(API_ENDPOINTS.ADMIN_PROVIDERS_PENDING);
    return response.data;
  }

  async getAllProviders(): Promise<ProviderListItem[]> {
    const response = await api.get<ProviderListItem[]>(API_ENDPOINTS.ADMIN_PROVIDERS);
    return response.data;
  }

  async approveProvider(providerId: number): Promise<any> {
    const response = await api.post(API_ENDPOINTS.ADMIN_APPROVE_PROVIDER(providerId));
    return response.data;
  }

  async rejectProvider(providerId: number, reason?: string): Promise<any> {
    const response = await api.post(API_ENDPOINTS.ADMIN_REJECT_PROVIDER(providerId), {
      approval_status: "rejected",
      rejection_reason: reason,
    });
    return response.data;
  }

  async getAllOrders(): Promise<OrderListItem[]> {
    const response = await api.get<OrderListItem[]>(API_ENDPOINTS.ADMIN_ORDERS);
    return response.data;
  }

  async getStats(): Promise<Stats> {
    const response = await api.get<Stats>(API_ENDPOINTS.ADMIN_STATS);
    return response.data;
  }

  async getAllCustomers(): Promise<CustomerListItem[]> {
    const response = await api.get<CustomerListItem[]>(API_ENDPOINTS.ADMIN_CUSTOMERS);
    return response.data;
  }

  async getProviderStats(providerId: number): Promise<ProviderStatsDetail> {
    const response = await api.get<ProviderStatsDetail>(
      API_ENDPOINTS.ADMIN_PROVIDER_STATS(providerId)
    );
    return response.data;
  }

  async getCustomerStats(customerId: number): Promise<CustomerStatsDetail> {
    const response = await api.get<CustomerStatsDetail>(
      API_ENDPOINTS.ADMIN_CUSTOMER_STATS(customerId)
    );
    return response.data;
  }

  async deleteProvider(providerId: number): Promise<void> {
    await api.delete(API_ENDPOINTS.ADMIN_DELETE_PROVIDER(providerId));
  }

  async deleteCustomer(customerId: number): Promise<void> {
    await api.delete(API_ENDPOINTS.ADMIN_DELETE_CUSTOMER(customerId));
  }

  async getAllContacts(): Promise<ContactMessage[]> {
    const response = await api.get<ContactMessage[]>(API_ENDPOINTS.ADMIN_CONTACTS);
    return response.data;
  }
}

export default new AdminService();
