import React from "react";
import { NavLink } from "react-router-dom";
import "./Home.css";
const LoginButton = () => {
  return (
    <nav className="nav nav-masthead justify-content-center float-md-right">
      <NavLink id="nav-link " className="nav-link" to={"/auth/signin"}>
        Login
      </NavLink>
      <NavLink id="nav-link " className="nav-link" to={"/auth/signup"}>
        Register
      </NavLink>
    </nav>
  );
};
export default LoginButton;
