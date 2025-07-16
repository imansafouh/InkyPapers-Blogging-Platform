# InkyPapers Blogging Platform

> **Status:** 🚧 _This project is under active development._

## Overview

InkyPapers is a modern blogging platform designed for seamless content creation, sharing, and discussion. It features a robust backend API and a beautiful, responsive frontend UI built with the latest web technologies.

---

## Project Structure

```
InkyPapers-Blogging-Platform/
├── backend/    # Node.js, Express, TypeScript, MongoDB API
├── frontend/   # React, Vite, TypeScript, Tailwind CSS, shadcn-ui (Lovable-managed)
├── README.md   # Project documentation (this file)
└── ...
```

---

## Frontend

- **Tech Stack:** React, Vite, TypeScript, Tailwind CSS, shadcn-ui
- **Managed with [Lovable](https://lovable.dev/)** ([project link](https://lovable.dev/projects/33401111-26d0-4325-a970-9fcdb214c729))
- **Features:**
  - User authentication (login/signup)
  - Blog listing, detail, and creation
  - Responsive, modern UI

### Getting Started (Frontend)

See [`frontend/README.md`](./frontend/README.md) for detailed instructions, including how to use Lovable, run locally, or deploy.

Basic local setup:

```sh
cd frontend
npm install
npm run dev
```

---

## Backend

- **Tech Stack:** Node.js, Express, TypeScript, MongoDB (Mongoose)
- **Features:**
  - RESTful API for users, blogs, comments, and topics
  - JWT authentication
  - Modular structure (routes, controllers, services, etc.)

### Getting Started (Backend)

1. Set your environment variables (MongoDB URI, JWT secret, etc.) in a '.env' file
2. Install dependencies:
   ```sh
   cd backend
   npm install
   ```
3. Start the server:
   ```sh
   npm start
   ```
   The backend will run on the port specified in your `.env` (default: 5000).

---

## Development Notes

- **Frontend** is managed via [Lovable](https://lovable.dev/), but you can also develop locally or in Codespaces.
- **Backend** is a standard Node.js/Express/TypeScript project.
- Contributions, issues, and suggestions are welcome!

---

## License

This project is licensed under the ISC License. See [LICENSE](./LICENSE) for details.
