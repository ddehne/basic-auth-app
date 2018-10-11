import React from 'react';
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = (props, { ...rest }) => (
    <Route
      {...rest}
      render={innerProps =>{
        console.log(props.component);
        const Component = props.component;
        return props.isAuthenticated ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location }
            }}
          />
        )
          }
      }
    />
    );

export default PrivateRoute;