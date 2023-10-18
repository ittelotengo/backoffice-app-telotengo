import { Navigate } from 'react-router-dom';

const AuthGuard = (props) => {
  const { children } = props;

  const token = localStorage.getItem("token");

  return (
    token  ? 
  <div className='w-full h-full'>
  {children}
  </div>: <Navigate to="/auth/login" />);
};


export default AuthGuard;