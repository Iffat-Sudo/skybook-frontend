import { apiRequest } from "./client";
import type { AuthResponse, LoginRequest, RegisterRequest } from "./types";

export function login(request: LoginRequest) {
  return apiRequest<AuthResponse>("/api/auth/login", { method: "POST", body: request });
}

export function register(request: RegisterRequest) {
  return apiRequest<AuthResponse>("/api/auth/register", { method: "POST", body: request });
}