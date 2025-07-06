# API Module Structure

This directory contains the modular API services for the InkyPapers application. The API is organized into separate files for better maintainability and separation of concerns.

## File Structure

```
src/lib/api/
├── index.ts          # Main export file
├── types.ts          # TypeScript interfaces and types
├── client.ts         # Axios configuration and interceptors
├── auth.ts           # Authentication API services
├── blog.ts           # Blog API services
├── comment.ts        # Comment API services
├── auth-helpers.ts   # Authentication utility functions
└── README.md         # This file
```

## Usage

### Importing API Services

You can import API services in two ways:

#### 1. Import from the main index file (Recommended)

```typescript
import { authAPI, blogAPI, commentAPI, setAuthToken, getUser } from "@/lib/api";
```

#### 2. Import specific services directly

```typescript
import { authAPI } from "@/lib/api/auth";
import { blogAPI } from "@/lib/api/blog";
import { commentAPI } from "@/lib/api/comment";
import { setAuthToken, getUser } from "@/lib/api/auth-helpers";
```

### Authentication

```typescript
import { authAPI, setAuthToken, setUser } from "@/lib/api";

// Login
const handleLogin = async (email: string, password: string) => {
  try {
    const response = await authAPI.login({ email, password });
    setAuthToken(response.token);
    setUser(response.user);
    // Redirect to dashboard
  } catch (error) {
    // Handle error
  }
};

// Register
const handleRegister = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const response = await authAPI.register({ name, email, password });
    setAuthToken(response.token);
    setUser(response.user);
    // Redirect to dashboard
  } catch (error) {
    // Handle error
  }
};
```

### Blog Operations

```typescript
import { blogAPI } from "@/lib/api";

// Create a new blog
const createBlog = async (title: string, body: string) => {
  try {
    const blog = await blogAPI.create({ title, body });
    console.log("Blog created:", blog);
  } catch (error) {
    console.error("Failed to create blog:", error);
  }
};

// Get all blogs with pagination
const getBlogs = async (page: number = 1, limit: number = 10) => {
  try {
    const response = await blogAPI.getAll({ page, limit });
    console.log("Blogs:", response.data);
    console.log("Total pages:", response.totalPages);
  } catch (error) {
    console.error("Failed to fetch blogs:", error);
  }
};

// Get a specific blog
const getBlog = async (blogId: string) => {
  try {
    const blog = await blogAPI.getById(blogId);
    console.log("Blog:", blog);
  } catch (error) {
    console.error("Failed to fetch blog:", error);
  }
};

// Update a blog
const updateBlog = async (
  blogId: string,
  updates: { title?: string; body?: string }
) => {
  try {
    const updatedBlog = await blogAPI.update(blogId, updates);
    console.log("Blog updated:", updatedBlog);
  } catch (error) {
    console.error("Failed to update blog:", error);
  }
};

// Delete a blog
const deleteBlog = async (blogId: string) => {
  try {
    await blogAPI.delete(blogId);
    console.log("Blog deleted successfully");
  } catch (error) {
    console.error("Failed to delete blog:", error);
  }
};
```

### Comment Operations

```typescript
import { commentAPI } from "@/lib/api";

// Get comments for a blog
const getComments = async (blogId: string) => {
  try {
    const comments = await commentAPI.getByBlogId(blogId);
    console.log("Comments:", comments);
  } catch (error) {
    console.error("Failed to fetch comments:", error);
  }
};

// Add a comment
const addComment = async (blogId: string, comment: string) => {
  try {
    const newComment = await commentAPI.create(blogId, { comment });
    console.log("Comment added:", newComment);
  } catch (error) {
    console.error("Failed to add comment:", error);
  }
};

// Update a comment
const updateComment = async (commentId: string, comment: string) => {
  try {
    const updatedComment = await commentAPI.update(commentId, { comment });
    console.log("Comment updated:", updatedComment);
  } catch (error) {
    console.error("Failed to update comment:", error);
  }
};

// Delete a comment
const deleteComment = async (commentId: string) => {
  try {
    await commentAPI.delete(commentId);
    console.log("Comment deleted successfully");
  } catch (error) {
    console.error("Failed to delete comment:", error);
  }
};
```

### Authentication Helpers

```typescript
import {
  getAuthToken,
  setAuthToken,
  removeAuthToken,
  getUser,
  setUser,
  removeUser,
  isAuthenticated,
  logout,
} from "@/lib/api";

// Check if user is authenticated
if (isAuthenticated()) {
  console.log("User is logged in");
}

// Get current user
const user = getUser();
if (user) {
  console.log("Current user:", user.name);
}

// Get auth token
const token = getAuthToken();
if (token) {
  console.log("Auth token exists");
}

// Logout user
const handleLogout = () => {
  logout();
  // Redirect to login page
};
```

## Configuration

The API client is configured with:

- **Base URL**: `http://localhost:8000/api`
- **Default Headers**: `Content-Type: application/json`
- **Authentication**: Automatic JWT token inclusion
- **Error Handling**: Automatic 401 handling with logout

### Environment Variables

You can customize the API URL by setting the environment variable:

```env
VITE_API_URL=http://localhost:8000/api
```

## Error Handling

All API services use axios interceptors for centralized error handling:

- **401 Unauthorized**: Automatically logs out user and redirects to login
- **Network Errors**: Properly handled with user-friendly messages
- **Validation Errors**: Server error messages are preserved

## Type Safety

All API responses are fully typed with TypeScript interfaces:

- `User` - User object structure
- `Blog` - Blog object structure
- `Comment` - Comment object structure
- `LoginRequest` / `LoginResponse` - Authentication types
- `PaginatedResponse<T>` - Pagination wrapper type

## Adding New API Services

To add a new API service:

1. Create a new file in the `api` directory (e.g., `user.ts`)
2. Define the service functions using the `apiClient`
3. Export the service from the file
4. Add the export to `index.ts`

Example:

```typescript
// user.ts
import { AxiosResponse } from "axios";
import apiClient from "./client";
import { User } from "./types";

export const userAPI = {
  getProfile: async (): Promise<User> => {
    const response: AxiosResponse<User> = await apiClient.get("/user/profile");
    return response.data;
  },

  updateProfile: async (data: Partial<User>): Promise<User> => {
    const response: AxiosResponse<User> = await apiClient.patch(
      "/user/profile",
      data
    );
    return response.data;
  },
};
```

Then add to `index.ts`:

```typescript
export * from "./user";
```
