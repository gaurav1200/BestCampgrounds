import React from "react";
import "./Home.css";
import AuthServices from "../services/AuthServices";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { rootReducerAction } from "../store/index";
const LogoutButton = () => {
  const dispatch = useDispatch();

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
