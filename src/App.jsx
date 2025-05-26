import { useContext } from 'react';
import AdminDashboard from './components/AdminDashboard';
import Login from './components/Login';
import LoginContext from './context/LoginContext';

export default function App() {
  const { logger } = useContext(LoginContext);
  return logger ? <AdminDashboard /> : <Login />;
}
