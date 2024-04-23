import { useAuthenticate } from '@hooks/useAuthenticate';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

export const PrivateRoute = ({ children }) => {
  return useAuthenticate() ? children : <Navigate to="/login" />;
};

PrivateRoute.propTypes = {
  children: PropTypes.object,
};
