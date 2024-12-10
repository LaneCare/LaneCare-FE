// Define enum for user roles
export enum UserRole {
  USER = "user",
  ADMIN = "admin",
  SUPER_ADMIN = "super_admin",
}

export interface UserSession {
  email: string;
  role: string;
  name: string;
  id: string;
}

// Update LoginRequest and LoginResponse interfaces
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  status: number;
  message: string;
  data: {
    userid: string;
    email: string;
    role: UserRole;
    name: string;
  } | null;
}

// Update RegisterRequest and RegisterResponse interfaces
export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface RegisterResponse {
  status: number;
  message: string;
  data: null;
}
