import React from 'react';

import { useSelector } from '../../services/store';

import { isAuthCheckedSelector, getUser } from '../../services/slices/users';
import { Preloader } from '@ui';
import { Navigate, useLocation } from 'react-router-dom';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  onlyUnAuth = false,
  children
}: ProtectedRouteProps) => {
  const isAuthChecked = useSelector(isAuthCheckedSelector);
  // const user = useSelector(getUser);
  const location = useLocation();

  /* if (!isAuthChecked) {
    console.log('WAIT CHECKOUT');
    return <Preloader />;
  } */

  if (!onlyUnAuth && !isAuthChecked) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (onlyUnAuth && isAuthChecked) {
    const from = location.state?.from || { pathname: '/' };

    return <Navigate replace to={from} />;
  }
  return children;
};
