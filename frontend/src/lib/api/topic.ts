import { AxiosResponse } from "axios";
import apiClient from "./client";
import { Topic, PaginatedResponse } from "./types";

// Topic API Service
export const topicApi = {
  // Create topic
  create: async (data: { title: string; body: string }): Promise<Topic> => {
    const response: AxiosResponse<Topic> = await apiClient.post("/topic", data);
    return response.data;
  },

  getAll: async (params?: {
    limit?: number;
    page?: number;
    title?: string;
    body?: string;
  }): Promise<PaginatedResponse<Topic>> => {
    const response: AxiosResponse<PaginatedResponse<Topic>> =
      await apiClient.get("/topic", { params });
    return response.data;
  },

  // Get Topic by ID
  getById: async (id: string): Promise<Topic> => {
    const response: AxiosResponse<Topic> = await apiClient.get(`/topic/${id}`);
    return response.data;
  },

  // Update Topic
  update: async (
    id: string,
    data: Partial<{ title: string; body: string }>
  ): Promise<Topic> => {
    const response: AxiosResponse<Topic> = await apiClient.patch(
      `/topic/${id}`,
      data
    );
    return response.data;
  },

  // Delete Topic
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/topic/${id}`);
  },
};
