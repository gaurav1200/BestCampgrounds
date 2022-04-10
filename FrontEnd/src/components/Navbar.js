import React from "react";
import { Link } from "react-router-dom";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import AuthServices from "../services/AuthServices";
export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const currentUser = AuthServices.getCurrentUser();

    return (
      <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="#">
            BestCampgrounds
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <Link className="nav-link" to="/">
                Home
              </Link>
              <Link className="nav-link" to="/campgrounds/all">
                Campgrounds
              </Link>
              {currentUser && (
                <Link className="nav-link" to="/campgrounds/new">
                  New Campground
                </Link>
              )}
            </div>
            <div className="navbar-nav ms-auto">
              {currentUser && (
                <Link
                  className="nav-link"
                  to={"/campgrounds/users/" + currentUser.id}
                >
                  Profile
                </Link>
              )}
              {!currentUser ? <LoginButton /> : <LogoutButton />}
            </div>
          </div>
        </div>
      </nav>
    );
  }
}
