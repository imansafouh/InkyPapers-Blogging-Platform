// Types based on Postman collection
export interface User {
  _id: string;
  name: string;
  email: string;
  password?: string;
  isDeleted?: boolean;
  isSuspended?: boolean;
  avatar: string;
  followers: string[];
  following: string[];
  createdAt: string;
  __v?: number;
}

export interface Blog {
  _id: string;
  userId: string;
  title: string;
  body: string;
  topic: string[];
  likes: string[];
  createdAt: string;
  __v?: number;
  comments?: Comment[];
}

export interface Comment {
  _id: string;
  userId: {
    _id: string;
    name: string;
    avatar: string;
  };
  blogId: string;
  comment: string;
  isDeleted: boolean;
  createdAt: string;
  __v?: number;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}

export interface RegisterResponse {
  user: User;
  token: string;
}

export interface ApiResponse<T> {
  data?: T;
  status: string;
  message?: string;
  details?: Record<string, unknown>;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface Topic {
  _id: string;
  name: string;
  createdAt: string;
  __v?: number;
}
