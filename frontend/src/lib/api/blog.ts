import { AxiosResponse } from "axios";
import apiClient from "./client";
import { Blog, PaginatedResponse } from "./types";

// Blog API Service
export const blogAPI = {
  // Create blog
  create: async (data: { title: string; body: string }): Promise<Blog> => {
    const response: AxiosResponse<Blog> = await apiClient.post("/blog", data);
    return response.data;
  },

  // Get all blogs with optional filters
  getAll: async (params?: {
    limit?: number;
    page?: number;
    title?: string;
    body?: string;
  }): Promise<PaginatedResponse<Blog>> => {
    const response: AxiosResponse<PaginatedResponse<Blog>> =
      await apiClient.get("/blog", { params });
    return response.data;
  },

  // Get blog by ID
  getById: async (id: string): Promise<Blog> => {
    const response: AxiosResponse<Blog> = await apiClient.get(`/blog/${id}`);
    return response.data;
  },

  // Update blog
  update: async (
    id: string,
    data: Partial<{ title: string; body: string }>
  ): Promise<Blog> => {
    const response: AxiosResponse<Blog> = await apiClient.patch(
      `/blog/${id}`,
      data
    );
    return response.data;
  },

  // Delete blog
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/blog/${id}`);
  },
};
