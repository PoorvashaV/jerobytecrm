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

export interface RegisterRequest {
  name: string;
  email: string;
  phone: string;
  address: string;
  password: string;
  confirmPassword: string;
}