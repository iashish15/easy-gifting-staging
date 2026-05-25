import api from "./client";
import type { ProductPayload } from "../types";

export const getProducts = (params?: Record<string, string | number>) =>
  api.get("/products", { params });

export const getProductById = (id: string) => api.get(`/products/${id}`);

export const getAllProductsAdmin = () => api.get("/products/admin/all");

export const createProduct = (payload: ProductPayload) =>
  api.post("/products", payload);

export const updateProduct = (id: string, payload: Partial<ProductPayload>) =>
  api.put(`/products/${id}`, payload);

export const deleteProduct = (id: string) => api.delete(`/products/${id}`);

export const getCategories = () => api.get("/categories");
export const getBrands = () => api.get("/brands");

export const createCategory = (name: string, description?: string) =>
  api.post("/categories", { name, description });

export const createBrand = (name: string, description?: string) =>
  api.post("/brands", { name, description });

export const deleteCategory = (id: string) => api.delete(`/categories/${id}`);

export const deleteBrand = (id: string) => api.delete(`/brands/${id}`);
