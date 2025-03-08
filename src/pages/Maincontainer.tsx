import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../services/AuthContext";
import { Button } from "@heroui/react";
import { LayoutDashboard } from "lucide-react";
import { useState } from "react";

const Maincontainer = () => {
  const { userEmail } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [active, setActive] = useState(location.pathname);
  const menuItems = [
    { name: "Dashboard", path: "/dashboard", id: "/dashboard", icon: <LayoutDashboard size={20} /> },
  ];

  return (
    <div className="h-screen flex flex-row overflow-hidden">
        <aside className="w-[300px] bg-white shadow-lg flex flex-col p-4 h-[698px] overflow-hidden">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2 mb-6 mt-3">
            📚 StudentTrack
          </h2>
          <p className="text-gray-500 text-sm font-semibold mb-3 ms-1">Main Menu</p>
          <ul className="flex flex-col gap-1">
            {menuItems.map((item) => (
              <Link to={item.path} key={item.id}>
                <li
                  className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer font-semibold mb-1 text-gray-700 
                  ${active === item.id ? "bg-teal-800 text-white font-semibold" : "hover:bg-gray-400 hover:text-white"}`}
                  onClick={() => setActive(item.id)}
                >
                  {item.icon} {item.name}
                </li>
              </Link>
            ))}
          </ul>
          <div className="mt-auto p-4 border-t border-gray-300">
            {userEmail ? (
              <div className="flex items-center gap-3">
                <img
                  className="w-10 h-10 rounded-full border border-gray-300 shadow-md"
                  src="https://telcomconnect.com/wp-content/uploads/2019/07/profile-user2.png"
                  alt="User Avatar"
                />
                <div className="text-left truncate">
                  <p className="text-sm text-gray-700 font-semibold">
                    {userEmail}
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <p className="text-gray-500 text-sm mb-2">Not Signed In</p>
                <Button
                  className="bg-teal-700 text-white px-4 py-2 rounded-md transition hover:bg-teal-800"
                  onPress={() => navigate("/login")}
                >
                  Sign In
                </Button>
              </div>
            )}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 bg-white shadow-md h-full overflow-hidden">
          <header className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-black">🌅 Good Morning</h1>
              <p className="text-gray-700 mt-1">Welcome to the student dashboard</p>
            </div>
          </header>
          <div className="bg-gray-100 p-5 rounded-lg shadow-md h-[calc(100%-100px)] overflow-auto">
            <Outlet />
          </div>
        </main>
      </div>

  );
};

export default Maincontainer;
