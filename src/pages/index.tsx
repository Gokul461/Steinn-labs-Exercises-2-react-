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
        {/* Redirect "/" instantly to "/login" */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        {/* Public Route */}
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Maincontainer />}>
            <Route index element={<Dashboard />} />
            <Route path="setting" element={<Setting />} />
          </Route>
        </Route>

  
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </AuthProvider>
  );
}

export default Index;
