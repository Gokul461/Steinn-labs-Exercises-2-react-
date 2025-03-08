import React, { createContext, useState, useEffect, useContext, ReactNode } from "react";
import { onAuthStateChanged, User, signOut } from "firebase/auth";
import { auth } from "../pages/Firebase"; 
import { Spinner } from '@heroui/react';

interface AuthContextType {
  userEmail: string | null;
  logout: () => void;
  user: User | null;
  loading: boolean;
  setUserEmail: (email: string | null) => void;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};


interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setUserEmail(currentUser.email);
        localStorage.setItem("userEmail", currentUser.email!);
      } else {
        setUser(null);
        setUserEmail(null);
        localStorage.removeItem("userEmail");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    await signOut(auth);
    setUser(null);
    setUserEmail(null);
    localStorage.removeItem("userEmail");
  };

  return (
    <AuthContext.Provider value={{ user, userEmail, setUserEmail, setUser, logout, loading }}>
      {!loading ? children : <div className="flex h-screen justify-center items-center"><Spinner/></div>}  {/* Show loading until auth check is done */}
    </AuthContext.Provider>
  );
};
