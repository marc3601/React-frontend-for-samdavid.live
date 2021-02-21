import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const PrivateRoute = ({rdr, component: Component, ...rest }) => {
  const { currentUser } = useAuth();
  
  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser ? <Component {...props} /> : <Redirect to={rdr} />;
      }}
    ></Route>
  );
};

export default PrivateRoute;
