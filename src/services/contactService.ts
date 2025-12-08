import api from "./api";
import { API_ENDPOINTS } from "../config/api";

export interface ContactRequest {
  name: string;
  email: string;
  message: string;
}

class ContactService {
  async submitContact(data: ContactRequest): Promise<any> {
    const response = await api.post(API_ENDPOINTS.SUBMIT_CONTACT, data);
    return response.data;
  }
}

export default new ContactService();
