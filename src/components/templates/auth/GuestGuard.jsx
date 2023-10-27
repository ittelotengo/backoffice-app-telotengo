import { Navigate, Outlet } from 'react-router-dom';

const GuestGuard = ({ children }) => {
  
  const token = localStorage.getItem("token")

  return (
    token  ? <Navigate to="/dashboard" /> : <Outlet />);
};


export default GuestGuard;