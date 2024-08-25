import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

const ProtectedRoute = (): React.JSX.Element => {
  const { signed, signOut } = useContext(AuthContext);

  if (!signed) {
    signOut();
    return <Navigate to={'/'} replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
