import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";

const Admin = () => {
  const { currentUser, logout } = useAuth();
  const history = useHistory();
  const handleLogout = async () => {
    try {
      await logout();
      history.push("/login");
    } catch (e) {
      console.log(e);
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Admin;
