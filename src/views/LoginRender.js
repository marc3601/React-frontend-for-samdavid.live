import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { Route, Redirect } from "react-router-dom";
import Login from "./Login";
const LoginRender = () => {
  const { currentUser } = useAuth();
  return currentUser ? (
    <Redirect to="/admin" />
  ) : (
    <Route path="/login" component={Login} />
  );
};

export default LoginRender;
