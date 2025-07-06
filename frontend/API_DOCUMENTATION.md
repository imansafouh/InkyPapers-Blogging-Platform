# InkyPapers API Documentation

This document provides comprehensive information about the InkyPapers API endpoints, request/response formats, and usage examples.

## Base URL

```
http://localhost:3000
```

## Authentication

Most endpoints require authentication using JWT Bearer tokens. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## API Endpoints

### Authentication

#### 1. Register User

- **URL**: `POST /user/register`
- **Description**: Register a new user account
- **Authentication**: Not required
- **Request Body**:

```json
{
  "email": "user@example.com",
  "password": "Password@1234",
  "name": "User Name"
}
```

- **Response** (201 Created):

```json
{
  "user": {
    "_id": "68684a3c41e2420d063fdc87",
    "name": "User Name",
    "email": "user@example.com",
    "password": "$2b$10$...",
    "isDeleted": false,
    "isSuspended": false,
    "avatar": "",
    "followers": [],
    "following": [],
    "createdAt": "2025-07-04T21:40:12.464Z",
    "__v": 0
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

- **Error Response** (400 Bad Request):

```json
{
  "status": "error",
  "message": "Email already in use"
}
```

#### 2. Login User

- **URL**: `POST /user/login`
- **Description**: Authenticate user and get access token
- **Authentication**: Not required
- **Request Body**:

```json
{
  "email": "user@example.com",
  "password": "Password@1234"
}
```

- **Response** (200 OK):

```json
{
  "user": {
    "_id": "6865b5e7c4e30e85f3dd024e",
    "name": "User Name",
    "email": "user@example.com",
    "password": "$2b$10$...",
    "isDeleted": false,
    "isSuspended": false,
    "avatar": "",
    "followers": [],
    "following": [],
    "createdAt": "2025-07-02T22:42:47.661Z",
    "__v": 0
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

- **Error Response** (400 Bad Request):

```json
{
  "status": "error",
  "message": "Invalid credentials"
}
```

### Blogs

#### 1. Create Blog

- **URL**: `POST /blog`
- **Description**: Create a new blog post
- **Authentication**: Required
- **Request Body**:

```json
{
  "title": "Blog Title",
  "body": "Blog content here"
}
```

- **Response** (201 Created):

```json
{
  "userId": "6865b5e7c4e30e85f3dd024e",
  "title": "Blog Title",
  "body": "Blog content here",
  "topic": [],
  "likes": [],
  "_id": "68684aaa2379ce6b32b8095f",
  "createdAt": "2025-07-04T21:42:02.876Z",
  "__v": 0
}
```

- **Error Response** (400 Bad Request):

```json
{
  "status": "fail",
  "message": "Duplicate key error",
  "details": {
    "title": "Blog Title"
  }
}
```

#### 2. Get All Blogs

- **URL**: `GET /blog`
- **Description**: Retrieve all blogs with optional filtering and pagination
- **Authentication**: Not required
- **Query Parameters**:
  - `limit` (optional): Number of blogs per page (default: 10)
  - `page` (optional): Page number (default: 1)
  - `title` (optional): Filter by title
  - `body` (optional): Filter by body content
- **Response** (200 OK):

```json
{
  "data": [
    {
      "_id": "68666cc55578b644fe771a26",
      "userId": "68666cc55578b644fe771a25",
      "title": "First blog",
      "body": "Blog content",
      "topic": [],
      "likes": [],
      "createdAt": "2025-07-03T11:43:01.940Z",
      "__v": 0
    }
  ],
  "total": 7,
  "page": 1,
  "limit": 10,
  "totalPages": 1
}
```

#### 3. Get Blog by ID

- **URL**: `GET /blog/:id`
- **Description**: Retrieve a specific blog by its ID
- **Authentication**: Not required
- **Response** (200 OK):

```json
{
  "_id": "68681adac873e9e024a9e505",
  "userId": "68681adac873e9e024a9e504",
  "title": "Blog Title",
  "body": "Blog content",
  "topic": [],
  "likes": [],
  "createdAt": "2025-07-04T18:18:02.534Z",
  "__v": 0,
  "comments": [
    {
      "_id": "68683db81aa77fc2a8489ebe",
      "userId": {
        "_id": "6865b5e7c4e30e85f3dd024e",
        "name": "User Name",
        "avatar": ""
      },
      "blogId": "68681adac873e9e024a9e505",
      "comment": "Great blog post!",
      "isDeleted": false,
      "createdAt": "2025-07-04T20:46:48.351Z",
      "__v": 0
    }
  ]
}
```

#### 4. Update Blog

- **URL**: `PATCH /blog/:id`
- **Description**: Update an existing blog post
- **Authentication**: Required (only blog owner)
- **Request Body**:

```json
{
  "title": "Updated Title"
}
```

- **Response** (200 OK): Updated blog object

#### 5. Delete Blog

- **URL**: `DELETE /blog/:id`
- **Description**: Delete a blog post
- **Authentication**: Required (only blog owner)
- **Response** (204 No Content)

### Comments

#### 1. Get Comments by Blog ID

- **URL**: `GET /comment?blogId=:blogId`
- **Description**: Retrieve all comments for a specific blog
- **Authentication**: Not required
- **Response** (200 OK):

```json
[
  {
    "_id": "68683db81aa77fc2a8489ebe",
    "userId": {
      "_id": "6865b5e7c4e30e85f3dd024e",
      "name": "User Name",
      "avatar": ""
    },
    "blogId": "68681adac873e9e024a9e505",
    "comment": "Great blog post!",
    "isDeleted": false,
    "createdAt": "2025-07-04T20:46:48.351Z",
    "__v": 0
  }
]
```

#### 2. Create Comment

- **URL**: `POST /comment/:blogId`
- **Description**: Add a new comment to a blog post
- **Authentication**: Required
- **Request Body**:

```json
{
  "comment": "This is a great blog post!"
}
```

- **Response** (201 Created): New comment object

#### 3. Update Comment

- **URL**: `PATCH /comment/:id`
- **Description**: Update an existing comment
- **Authentication**: Required (only comment owner)
- **Request Body**:

```json
{
  "comment": "Updated comment text"
}
```

- **Response** (200 OK): Updated comment object

#### 4. Delete Comment

- **URL**: `DELETE /comment/:id`
- **Description**: Delete a comment
- **Authentication**: Required (only comment owner)
- **Response** (204 No Content)

## Error Handling

All API endpoints follow a consistent error response format:

```json
{
  "status": "error",
  "message": "Error description"
}
```

Common HTTP status codes:

- `200` - Success
- `201` - Created
- `204` - No Content
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

## Frontend Integration

The frontend uses axios for API calls with the following structure:

```typescript
// API configuration
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// Axios instance with interceptors
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
```

## Usage Examples

### Login Flow

```typescript
import { authAPI, setAuthToken, setUser } from "@/lib/api";

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
```

### Create Blog

```typescript
import { blogAPI } from "@/lib/api";

const createBlog = async (title: string, body: string) => {
  try {
    const blog = await blogAPI.create({ title, body });
    // Handle success
  } catch (error) {
    // Handle error
  }
};
```

### Get Blogs with Pagination

```typescript
import { blogAPI } from "@/lib/api";

const getBlogs = async (page: number = 1, limit: number = 10) => {
  try {
    const response = await blogAPI.getAll({ page, limit });
    // Handle paginated response
  } catch (error) {
    // Handle error
  }
};
```

## Environment Variables

Set the following environment variables in your `.env` file:

```env
VITE_API_URL=http://localhost:3000
```

## Notes

- All timestamps are in ISO 8601 format
- User passwords are hashed using bcrypt
- JWT tokens have a long expiration time (7 days)
- Comments are soft-deleted (isDeleted flag)
- Blog titles must be unique per user
