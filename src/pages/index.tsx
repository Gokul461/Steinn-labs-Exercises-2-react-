import { Routes, Route, Navigate } from 'react-router-dom';
import Maincontainer from './Maincontainer';
import Login from './Login';
import Dashboard from '../components/Dashboard';
import Setting from '../components/Setting';
import { AuthProvider } from '../services/AuthContext';
import ProtectedRoute from '../services/ProtectedRouting';  

function Index() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Maincontainer />}>
            <Route index element={<Dashboard />} />
            <Route path="setting" element={<Setting />} />
          </Route>
        </Route>

        {/* Redirect unknown paths to Login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </AuthProvider>
  );
}

export default Index;
