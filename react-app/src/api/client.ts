import axios, { AxiosResponse } from "axios";
import { ApiResponse } from "../../../shared/types";

// Create axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("easygifting_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem("easygifting_token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

// Generic API methods
export const apiRequest = {
  get: <T>(url: string): Promise<AxiosResponse<ApiResponse<T>>> => api.get(url),

  post: <T>(url: string, data?: any): Promise<AxiosResponse<ApiResponse<T>>> =>
    api.post(url, data),

  put: <T>(url: string, data?: any): Promise<AxiosResponse<ApiResponse<T>>> =>
    api.put(url, data),

  delete: <T>(url: string): Promise<AxiosResponse<ApiResponse<T>>> =>
    api.delete(url),

  patch: <T>(url: string, data?: any): Promise<AxiosResponse<ApiResponse<T>>> =>
    api.patch(url, data),
};

export default api;
