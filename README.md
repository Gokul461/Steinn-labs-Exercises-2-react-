# 🚀 Steinn Labs Intern Exercise 2

This project is a web application built with React, TypeScript, and `react-query`. It includes a **Student Dashboard UI** and an **E-commerce UI** with various components and functionalities to display and filter products, as well as manage pagination.

## 📌 Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Libraries Used](#libraries-used)
- [Components](#components)
  - Home
  - ProductList
  - ProductCard
  - ProductFilter
  - CircularSpinner
  - Pagination
  - Dashboard
  - Category
  - Login
  - Navbar
  - ProtectedRoute
- [Authentication](#authentication)
- [API](#api)
- [License](#license)

## 📦 Libraries Used

- **React** - A JavaScript library for building user interfaces.
- **TypeScript** - A strongly typed programming language that builds on JavaScript.
- **React Query** - Data fetching and state management for React applications.
- **HeroUI** - A UI component library for enhanced styling and user experience.
- **Firebase Authentication** - Secure authentication for user login.

## 🔐 Authentication & Protected Routing

This project integrates **Firebase Authentication** for user login and session management. It includes **Protected Routes**, allowing only authenticated users to access specific pages.

### 🔥 Firebase Authentication Setup

1. **User Sign-In & Sign-Out**
   - Users can log in using **email/password** authentication.
   - The session persists using Firebase's built-in authentication system.
   - Users can log out securely, clearing their session.

2. **Protected Routes**
   - Only authenticated users can access certain pages.
   - If a user is not logged in, they are redirected to the login page.

### ✨ Example of Protected Route:

```tsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
```

## 📸 UI Screenshots

![Dashboard UI](https://github.com/user-attachments/assets/11c32927-efe6-4e12-b4a8-2faeb5d091b5)
![Product List](https://github.com/user-attachments/assets/47e30add-8c2e-4b56-9586-b0b9ec6b3a8d)
![Login Page](https://github.com/user-attachments/assets/1f427d12-bde1-4c37-be8a-8621c29c3e2e)
![E-commerce UI](https://github.com/user-attachments/assets/480347d4-167e-4558-9f29-de4cf0e4c12f)

## 📝 License

Licensed under the [MIT license](https://github.com/frontio-ai/vite-template/blob/main/LICENSE).

Happy coding! ❤️

