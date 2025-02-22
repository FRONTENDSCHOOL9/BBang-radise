import { useAuthorize } from '@hooks/useAuth';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

export const PrivateRoute = ({ children, requiredRole }) => {
  const isAuthorized = useAuthorize(requiredRole);

  return isAuthorized ? children : <Navigate to="/login" />;
};

PrivateRoute.propTypes = {
  children: PropTypes.object,
  requiredRole: PropTypes.string,
};
