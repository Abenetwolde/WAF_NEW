import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
// hooks
import useAuth from '../hooks/useAuth';
// routes
import { PATH_DASHBOARD } from '../routes/paths';
import { useSelector } from 'react-redux';

// ----------------------------------------------------------------------

GuestGuard.propTypes = {
  children: PropTypes.node
};

export default function GuestGuard({ children }) {
  // const { isAuthenticated } = useAuth();
  const isAuthenticated = useSelector((state) => state?.auth.user);
  console.log("isAuthenticated.................",isAuthenticated.token)

  if (isAuthenticated.token!==null) {
    return <Navigate to={PATH_DASHBOARD.root} />;
  }

  return <>{children}</>;
}
