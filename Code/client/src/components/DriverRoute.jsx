import { Navigate } from 'react-router-dom';

export default function DriverRoute({ children }) {
  const driver = localStorage.getItem('driver');
  const token = localStorage.getItem('token');
  
  if (!driver || !token) {
    return <Navigate to="/dlogin" />;
  }
  
  return children;
}
