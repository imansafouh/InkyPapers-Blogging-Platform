import { AxiosResponse } from "axios";
import apiClient from "./client";
import { Comment } from "./types";

// Comment API Service
export const commentAPI = {
  // Get all comments for a blog
  getByBlogId: async (blogId: string): Promise<Comment[]> => {
    const response: AxiosResponse<Comment[]> = await apiClient.get("/comment", {
      params: { blogId },
    });
    return response.data;
  },

  // Create new comment
  create: async (
    blogId: string,
    data: { comment: string }
  ): Promise<Comment> => {
    const response: AxiosResponse<Comment> = await apiClient.post(
      `/comment/${blogId}`,
      data
    );
    return response.data;
  },

  // Update comment
  update: async (id: string, data: { comment: string }): Promise<Comment> => {
    const response: AxiosResponse<Comment> = await apiClient.patch(
      `/comment/${id}`,
      data
    );
    return response.data;
  },

  // Delete comment
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/comment/${id}`);
  },
};
