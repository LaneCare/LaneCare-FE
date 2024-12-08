import axios, { AxiosResponse } from "axios";
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from "@/lib/types/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error("NEXT_PUBLIC_API_URL environment variable is not set.");
}

export class AuthRepository {
  private readonly loginEndpoint = `${API_URL}/login`;
  private readonly registerEndpoint = `${API_URL}/register`;

  private toFormData<T extends Record<string, any>>(data: T): FormData {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      const value = data[key];
      if (value !== undefined && value !== null) {
        formData.append(key, String(value));
      }
    });
    return formData;
  }

  // Login API call
  async login(request: LoginRequest): Promise<LoginResponse> {
    const formData = this.toFormData(request);
    const response: AxiosResponse<LoginResponse> = await axios.post(
      this.loginEndpoint,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response.data;
  }

  // Register API call
  async register(request: RegisterRequest): Promise<RegisterResponse> {
    const formData = this.toFormData(request);
    const response: AxiosResponse<RegisterResponse> = await axios.post(
      this.registerEndpoint,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response.data;
  }
}
