import Maincontainer from '../pages/Maincontainer';
import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Dashboard from '../components/Dashboard';
import Setting from '../components/Setting';
function Index() {
  return (
      <Routes>
      <Route path='/' element={<Login/>}/>

      <Route path="/dashboard" element={<Maincontainer />}>
        <Route index element={<Dashboard />} />
        <Route path="setting" element={<Setting />} />
      </Route>
      
      </Routes>
  );
}

export default Index;
