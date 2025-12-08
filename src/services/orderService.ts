import api from "./api";
import { API_ENDPOINTS } from "../config/api";

export interface OrderCreateRequest {
  service_name: string;
  service_date: string;
  service_time: string;
  address: string;
  city?: string;
  postal_code?: string;
  total_amount: number;
  special_instructions?: string;
}

export interface Order {
  id: number;
  order_number: string;
  customer_id: number;
  service_provider_id?: number;
  service_name: string;
  service_category: string;
  service_date: string;
  service_time: string;
  address: string;
  city?: string;
  postal_code?: string;
  total_amount: number;
  special_instructions?: string;
  status: "pending" | "assigned" | "in_progress" | "completed";
  created_at: string;
  updated_at: string;
  customer?: any;
  service_provider?: any;
}

class OrderService {
  async createOrder(data: OrderCreateRequest): Promise<Order> {
    const response = await api.post<Order>(API_ENDPOINTS.CREATE_ORDER, data);
    return response.data;
  }

  async getCustomerOrders(): Promise<Order[]> {
    const response = await api.get<Order[]>(API_ENDPOINTS.CUSTOMER_ORDERS);
    return response.data;
  }

  async getProviderOrders(): Promise<Order[]> {
    const response = await api.get<Order[]>(API_ENDPOINTS.PROVIDER_ORDERS);
    return response.data;
  }

  async getAvailableOrders(): Promise<Order[]> {
    const response = await api.get<Order[]>(API_ENDPOINTS.AVAILABLE_ORDERS);
    return response.data;
  }

  async pickupOrder(orderId: number): Promise<Order> {
    const response = await api.post<Order>(API_ENDPOINTS.PICKUP_ORDER(orderId));
    return response.data;
  }

  async completeOrder(orderId: number): Promise<Order> {
    const response = await api.post<Order>(API_ENDPOINTS.COMPLETE_ORDER(orderId));
    return response.data;
  }

  async getOrder(orderId: number): Promise<Order> {
    const response = await api.get<Order>(API_ENDPOINTS.GET_ORDER(orderId));
    return response.data;
  }

  async getAllOrders(): Promise<Order[]> {
    const response = await api.get<Order[]>(API_ENDPOINTS.ADMIN_ORDERS);
    return response.data;
  }

  async deleteOrder(orderId: number): Promise<void> {
    await api.delete(API_ENDPOINTS.DELETE_ORDER(orderId));
  }

  async rescheduleOrder(
    orderId: number,
    data: {
      service_date?: string;
      service_time?: string;
      address?: string;
      city?: string;
      postal_code?: string;
      special_instructions?: string;
    }
  ): Promise<Order> {
    const response = await api.put<Order>(API_ENDPOINTS.RESCHEDULE_ORDER(orderId), data);
    return response.data;
  }
}

export default new OrderService();
