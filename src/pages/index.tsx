import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Maincontainer from "./Maincontainer";
import Login from "./Login";
import Dashboard from "../components/Dashboard";
import Category from "./Category";
import { AuthProvider } from "../services/AuthContext";
import ProtectedRoute from "../services/ProtectedRouting";
import Home from "../pages/Home";
import Navbar from "../components/Navbar";
import ProductList from "../components/ProductList";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]); 

  return null;
}

function Index() {
  return (
    <AuthProvider>
      <Navbar />
      <ScrollToTop />
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/category" element={<Category />} />
          <Route path="/category/products/:category" element={<ProductList />} />
          <Route path="/dashboard" element={<Maincontainer />}>
            <Route index element={<Dashboard />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </AuthProvider>
  );
}

export default Index;
