export interface Brand {
  _id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface Product {
  _id: string;
  slug: string;
  name: string;
  description: string;
  brand: Brand | string;
  category: Category | string;
  price: number;
  discountPrice?: number;
  images: string[];
  stock: number;
  rating: number;
  reviewsCount: number;
  tags: string[];
  sizes: string[];
  featured: boolean;
  status: "active" | "draft";
  createdAt: string;
  updatedAt: string;
}

export interface AdminCredentials {
  email: string;
  password: string;
}

export interface ProductPayload {
  name: string;
  description: string;
  brand: string;
  category: string;
  price: number;
  discountPrice?: number;
  images: string[];
  stock: number;
  tags: string[];
  sizes: string[];
  featured: boolean;
  status: "active" | "draft";
}

export interface Banner {
  _id: string;
  title?: string;
  subtitle?: string;
  description?: string;
  callToActionText?: string;
  callToActionLink?: string;
  image?: string;
}

export interface HomepageSection {
  _id: string;
  type: string;
  title?: string;
  subtitle?: string;
  description?: string;
  content?: any;
  images?: string[];
  settings?: Record<string, any>;
}
