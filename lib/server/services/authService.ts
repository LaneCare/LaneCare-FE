import { AuthRepository } from "@/lib/server/repositories/authRepository";
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from "@/lib/types/auth";

export class AuthService {
  private authRepository: AuthRepository;

  constructor() {
    this.authRepository = new AuthRepository();
  }

  // Login Service
  async login(request: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await this.authRepository.login(request);
      return response;
    } catch (error) {
      console.error("Login failed:", error);
      throw new Error("Unable to log in. Please check your credentials.");
    }
  }

  // Register Service
  async register(request: RegisterRequest): Promise<RegisterResponse> {
    try {
      const response = await this.authRepository.register(request);

      if (response.status !== 200) {
        throw new Error("Registration failed. Please try again.");
      }

      return response;
    } catch (error) {
      console.error("Registration failed:", error);
      throw new Error("Unable to register. Please try again.");
    }
  }
}
