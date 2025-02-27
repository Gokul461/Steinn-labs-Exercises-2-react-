import { Link, Outlet } from 'react-router-dom';
import { useAuth } from "../services/AuthContext";
import { useNavigate } from 'react-router-dom';
import {Button} from '@heroui/button'
const Maincontainer = () => {
  const { userEmail } = useAuth(); // Extracted userEmail from the AuthContext
  const Navigate = useNavigate();
  return (
    <div className="grid grid-cols-12 h-screen bg-[#0d0d0d] p-4 shadow-lg">
      {/* Sidebar */}
      <div className="col-span-12 md:col-span-3 bg-[#1a1a1a] text-white p-6 rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold text-gray-300">📚 StudentTrack</h2>
        <ul className="mt-6 space-y-3">
          <Link to="/dashboard">
            <li className="p-3 mb-1 rounded-lg bg-[#262626] hover:bg-[#333] transition duration-300 cursor-pointer shadow-md">
              🏠 Dashboard
            </li>
          </Link>
          <Link to="/dashboard/setting">
            <li className="p-3 rounded-lg bg-[#262626] hover:bg-[#333] transition duration-300 cursor-pointer shadow-md">
              ⚙️ Settings
            </li>
          </Link>
        </ul>
        <div className="mt-[420px] p-4 relative text-gray-400 text-sm bg-[#262626] rounded-lg shadow-md">
          {userEmail ? (
            <>
              <p className='mb-1'>Signed in as:</p>
              <h4 className="text-gray-300 font-semibold">{userEmail}</h4>
            </>
          ) : (
            <div>
            <p>Not Signed In</p>
            <Button color="secondary" className="mt-2" onClick={()=> Navigate('/')}>Sign In</Button>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="col-span-12 md:col-span-9 bg-[#121212] text-gray-300 p-8 rounded-lg shadow-xl">
        <h1 className="text-3xl font-extrabold text-gray-200">🌅 Good Morning</h1>
        <p className="text-gray-400 mb-6 mt-1 ms-1">Welcome to the student dashboard </p>
        <div className="bg-[#1f1f1f] p-6 rounded-lg shadow-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Maincontainer;
