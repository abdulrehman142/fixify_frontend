// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://your-backend-url.onrender.com";

export const API_ENDPOINTS = {
  // Auth
  LOGIN: "/auth/login",
  REGISTER_CUSTOMER: "/auth/register",
  REGISTER_PROVIDER: "/auth/register-provider",

  // Customer
  CUSTOMER_PROFILE: "/customer/profile",
  CUSTOMER_ORDERS: "/customer/orders",
  CREATE_ORDER: "/customer/orders",
  DELETE_ORDER: (orderId: number) => `/customer/orders/${orderId}`,
  RESCHEDULE_ORDER: (orderId: number) => `/customer/orders/${orderId}`,

  // Provider
  PROVIDER_PROFILE: "/provider/profile",
  PROVIDER_APPROVAL_STATUS: "/provider/approval-status",
  PROVIDER_ORDERS: "/provider/orders",
  PROVIDER_STATS: "/provider/stats",
  AVAILABLE_ORDERS: "/provider/orders/available",
  PICKUP_ORDER: (orderId: number) => `/provider/orders/${orderId}/pickup`,
  COMPLETE_ORDER: (orderId: number) => `/provider/orders/${orderId}/complete`,

  // Admin
  ADMIN_PROVIDERS_PENDING: "/admin/providers/pending",
  ADMIN_PROVIDERS: "/admin/providers",
  ADMIN_APPROVE_PROVIDER: (providerId: number) => `/admin/providers/${providerId}/approve`,
  ADMIN_REJECT_PROVIDER: (providerId: number) => `/admin/providers/${providerId}/reject`,
  ADMIN_DELETE_PROVIDER: (providerId: number) => `/admin/providers/${providerId}`,
  ADMIN_PROVIDER_STATS: (providerId: number) => `/admin/providers/${providerId}/stats`,
  ADMIN_CUSTOMERS: "/admin/customers",
  ADMIN_DELETE_CUSTOMER: (customerId: number) => `/admin/customers/${customerId}`,
  ADMIN_CUSTOMER_STATS: (customerId: number) => `/admin/customers/${customerId}/stats`,
  ADMIN_ORDERS: "/admin/orders",
  ADMIN_STATS: "/admin/stats",

  // Orders
  GET_ORDER: (orderId: number) => `/orders/${orderId}`,
  LIST_ORDERS: "/orders",

  // Reviews
  CREATE_REVIEW: "/reviews",
  GET_REVIEWS_BY_PROVIDER: (providerId: number) => `/reviews/provider/${providerId}`,
  GET_REVIEW_BY_ORDER: (orderId: number) => `/reviews/order/${orderId}`,

  // Contact
  SUBMIT_CONTACT: "/contact",

  // Messages
  SEND_MESSAGE: "/messages",
  GET_MESSAGES: (orderId: number) => `/messages/order/${orderId}`,

  // Admin Contacts
  ADMIN_CONTACTS: "/admin/contacts",
};

export default API_BASE_URL;
