import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../services/AuthContext";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className=" w-full h-16 flex items-center justify-between px-8 shadow-lg backdrop-blur-md bg-gray-900 border-b border-gray-300">
      <div className="flex items-center">
        <h1 className="text-2xl font-extrabold text-white tracking-wide">
          <Link to="/login/home" className="hover:text-gray-200 transition">
            React<span className="text-teal-400">Exercise</span>
          </Link>
        </h1>
      </div>

      <ul className="flex gap-6">
        <li>
          <Link
            to="/dashboard"
            className="text-gray-200 hover:text-teal-400 transition duration-300"
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            to="/category"
            className="text-gray-200 hover:text-teal-400 transition duration-300"
          >
            Ecommerce
          </Link>
        </li>
      </ul>
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 px-5 py-2 bg-red-500 text-white font-semibold rounded-full shadow-md transition duration-300 hover:bg-red-600 hover:scale-105"
      >
        <LogOut size={20} /> Logout
      </button>
    </nav>
  );
};

export default Navbar;
