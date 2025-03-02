import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../services/AuthContext";
import { Button } from "@heroui/react";
import { useState, useEffect } from "react";
import { Home, LayoutDashboard, LogOut, Settings } from "lucide-react";

const Maincontainer = () => {
  const { userEmail} = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [active, setActive] = useState(location.pathname);

  useEffect(() => {
    setActive(location.pathname);
  }, [location.pathname]);

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", id: "/dashboard", icon: <LayoutDashboard size={20} /> },
    { name: "Settings", path: "/dashboard/setting", id: "/dashboard/setting", icon: <Settings size={20} /> },
    { name: "Logout", path: "/", id: "/dashboard/logout", icon: <LogOut size={20} /> },
  ];

  return (
    <div className="flex h-screen bg-gray-400">
      <aside className="w-[300px] bg-gray-200 text-white flex flex-col justify-between shadow-lg">
        <div className="p-4">
          <h2 className="text-2xl font-bold tracking-wide mb-6 text-black flex items-center gap-2">
            📚 StudentTrack
          </h2>
          <p className="text-gray-400 text-sm font-semibold ms-1 mt-10 mb-4">Main Menu</p>
          <ul>
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
        </div>

        <div className="mt-auto border-t border-gray-500"></div>

        <div className="pb-4 px-4 pt-2 text-black flex flex-col items-center">
          {userEmail ? (
            <div className="flex items-center gap-3 w-full text-center">
              <img
                className="w-9 h-9 rounded-full border border-gray-300 shadow-md"
                src="https://telcomconnect.com/wp-content/uploads/2019/07/profile-user2.png"
                alt="User Avatar"
              />
              <div className="flex flex-col text-left truncate">
                <p className="text-sm text-gray-600 truncate w-[200px]">
                  {userEmail}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-row mt-2 items-center text-center gap-5">
              <p className="text-gray-400 ms-5">Not Signed In</p>
              <Button
                className="bg-teal-800 text-white px-6 py-1 ms-3 rounded-md transition hover:bg-teal-800"
                onPress={() => navigate("/")}
              >
                Sign In
              </Button>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-white shadow-md overflow-hidden">
        <header className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-black">🌅 Good Morning</h1>
            <p className="text-gray-700 ms-1 mt-1">Welcome to the student dashboard</p>
          </div>
        </header>

        <div className="bg-gray-100 p-5 rounded-lg shadow-md">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Maincontainer;
