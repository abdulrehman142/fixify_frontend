import api from "./api";
import { API_ENDPOINTS } from "../config/api";

export type ReviewCreateRequest = {
  order_id: number;
  rating: number; // 1-5
  comment?: string;
};

export type Review = {
  id: number;
  order_id: number;
  customer_id: number;
  service_provider_id: number;
  rating: number;
  comment?: string;
  created_at: string;
  customer?: any;
};

class ReviewService {
  async createReview(data: ReviewCreateRequest): Promise<Review> {
    const response = await api.post<Review>(API_ENDPOINTS.CREATE_REVIEW, data);
    return response.data;
  }

  async getReviewByOrder(orderId: number): Promise<Review> {
    const response = await api.get<Review>(API_ENDPOINTS.GET_REVIEW_BY_ORDER(orderId));
    return response.data;
  }

  async getReviewsByProvider(providerId: number): Promise<Review[]> {
    const response = await api.get<Review[]>(API_ENDPOINTS.GET_REVIEWS_BY_PROVIDER(providerId));
    return response.data;
  }
}

export default new ReviewService();
