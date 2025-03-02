import React, { createContext, useState, useEffect, useContext, ReactNode } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../pages/firebase"; 

// Define types for AuthContext
interface AuthContextType {
  userEmail: string;
  user: User | null;
  setUserEmail: (email: string) => void;
}

// Create Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom Hook to use AuthContext
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// AuthProvider Component
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userEmail, setUserEmail] = useState<string>("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setUserEmail(currentUser?.email || ""); // ✅ Update userEmail on auth change
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, userEmail, setUserEmail }}>
      {children}
    </AuthContext.Provider>
  );
};
