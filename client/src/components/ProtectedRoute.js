import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({children, ...rest}) => {

  const isAuth = () => {
    const accessToken = localStorage.getItem('accessToken');
    return accessToken ? true : false;
    // make auth stronger? can client manaully add a key
    // 'accessToken' to their localStorage?
  };

  console.log('Authenticated?', isAuth());
  return (
    <Route
      {...rest}
      render={() => {
        isAuth ? children : (
          <Redirect to="/home" />
        )
      }} />
  );
};

export default ProtectedRoute;
