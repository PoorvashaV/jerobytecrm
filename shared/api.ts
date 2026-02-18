/**
 * Shared code between client and server
 * Useful to share types between client and server
 */

export interface DemoResponse {
  message: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  address?: string;
  customer_type: "product" | "service" | "both";
  created_at: Date;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: User;
}

export interface LoginRequest {
  email: string;
  password: string;
}

// ✅ FIX: Use snake_case for customer_type to match backend
export interface RegisterRequest {
  name: string;
  email: string;
  phone: string;
  address?: string;
  password: string;
  customer_type: "product" | "service" | "both"; // snake_case
}

export interface Product {
  product_id: number;
  name: string;
  description: string;
  price: number;
  original_price?: number;
  category: string;
  rating: number;
  reviews: number;
  image_url: string;
  in_stock: boolean;
  created_at?: Date;
}

export interface Notification {
  id: number;
  title: string;
  message: string;
  type?: string;
  read: boolean;
  created_at: string;
  user_id?: number;
}
