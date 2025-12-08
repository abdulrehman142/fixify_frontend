import api from "./api";
import { API_ENDPOINTS } from "../config/api";

export type MessageCreateRequest = {
  order_id: number;
  message_text: string;
};

export type Message = {
  id: number;
  order_id: number;
  sender_id: number;
  sender_type: "customer" | "service_provider";
  message_text: string;
  created_at: string;
  sender_username?: string;
};

class MessageService {
  async sendMessage(data: MessageCreateRequest): Promise<Message> {
    const response = await api.post<Message>(API_ENDPOINTS.SEND_MESSAGE, data);
    return response.data;
  }

  async getMessagesForOrder(orderId: number): Promise<Message[]> {
    const response = await api.get<Message[]>(API_ENDPOINTS.GET_MESSAGES(orderId));
    return response.data;
  }
}

export default new MessageService();
