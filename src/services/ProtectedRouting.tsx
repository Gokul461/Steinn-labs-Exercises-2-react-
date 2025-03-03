import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../services/AuthContext";

const ProtectedRoute = () => {
  const { user } = useAuth(); // Check if the user is logged in

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
