import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux';

  const PrivateRoute = ({component: Component, ...rest}) => {

    const user = useSelector(state => state.user);

    const isLogin = () => {
      if (user.length !== 0) {
        return true
      } else {
        return false
      }
    }

    return (
      <Route {...rest} render={props => (
          isLogin() ?
              <Component {...props} />
          : <Redirect to="/signin" />
      )} />
    );
};

export default PrivateRoute
