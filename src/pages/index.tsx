import Maincontainer from '../pages/Maincontainer';
import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Dashboard from '../components/Dashboard';
import Setting from '../components/Setting';
import { AuthProvider }from '../services/AuthContext';
function Index() {
  return (
    <AuthProvider>
      <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path="/dashboard" element={<Maincontainer />}>
        <Route index element={<Dashboard />} />
        <Route path="setting" element={<Setting />} />
      </Route>

      </Routes>
      </AuthProvider>
  );
}

export default Index;
