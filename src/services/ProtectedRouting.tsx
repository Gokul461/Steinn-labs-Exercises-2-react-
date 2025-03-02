import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../services/AuthContext";

const ProtectedRoute = () => {
  const { userEmail } = useAuth(); // Check if the user is logged in

  return userEmail ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
