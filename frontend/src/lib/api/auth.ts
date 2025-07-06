import { AxiosResponse } from "axios";
import apiClient from "./client";
import {
  LoginRequest,
  RegisterRequest,
  LoginResponse,
  RegisterResponse,
} from "./types";

// Auth API Service
export const authAPI = {
  // Register user
  register: async (data: RegisterRequest): Promise<RegisterResponse> => {
    const response: AxiosResponse<RegisterResponse> = await apiClient.post(
      "/user/register",
      data
    );
    return response.data;
  },

  // Login user
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const response: AxiosResponse<LoginResponse> = await apiClient.post(
      "/user/login",
      data
    );
    return response.data;
  },
};
