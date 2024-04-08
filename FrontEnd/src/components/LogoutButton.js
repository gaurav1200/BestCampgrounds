import React from "react";
import "./Home.css";
import AuthServices from "../services/AuthServices";
import { Link } from "react-router-dom";

const LogoutButton = () => {
  const logout = () => {
    AuthServices.logoutRequest();
  };
  return (
    <Link
      id="nav-link "
      className="nav-link"
      to="/auth/signin"
      onClick={logout}
    >
      Logout
    </Link>
  );
};
export default LogoutButton;
