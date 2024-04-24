import { Navigate } from 'react-router-dom';

const StatusRoute = ({ children }) => {
  const logStatus = localStorage.getItem('isLogged') === 'true';

  if (!logStatus) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default StatusRoute;