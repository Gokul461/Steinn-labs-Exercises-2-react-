import Table from '../components/Table'
const Dashboard = () => {
    return (
      <div className="grid grid-cols-12 gap-4 h-screen p-4">
{/* sidecontainer */}
        <div className="col-span-12 md:col-span-3 bg-gray-100 p-4 shadow-lg">
          <h2 className="text-xl font-semibold">StudentTrack</h2>
          <ul className="mt-4">
            <li className="p-2 hover:bg-gray-200 cursor-pointer">Dashboard</li>
            <li className="p-2 hover:bg-gray-200 cursor-pointer">Students</li>
            <li className="p-2 hover:bg-gray-200 cursor-pointer">Settings</li>
          </ul>
        </div>
{/* maincontainer */}
        <div className="col-span-12 md:col-span-9 bg-white p-6 shadow-lg">
          <h1 className="text-2xl font-bold">Good Morning</h1>
          <p>Welcome to student dashboard</p>
          <Table/>
        </div>
      </div>
    );
  };
  
  export default Dashboard;
  