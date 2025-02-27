import React, { createContext, useState, useContext, ReactNode } from "react";

// Define types for AuthContext
interface AuthContextType {
  userEmail: string;
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
  const [userEmail, setUserEmail] = useState<string>("");

  return (
    <AuthContext.Provider value={{ userEmail, setUserEmail }}>
      {children}
    </AuthContext.Provider>
  );
};
