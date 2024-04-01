import React from "react";
import { Link, NavLink } from "react-router-dom";
import Footer from "./Footer";
import "./Home.css";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import AuthServices from "../services/AuthServices";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const currentUser = AuthServices.getCurrentUser();

    return (
      <div id="body" className="d-fles text-center text-white bg-dark">
        <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
          <header className="mb-auto">
            <div>
              <h3 className="float-md-left mb-0">Best Campgrounds</h3>
              <nav className="nav nav-masthead justify-content-center float-md-right">
                <NavLink id="nav-link " className="nav-link active" to={"#"}>
                  Home
                </NavLink>
                <NavLink
                  id="nav-link "
                  className="nav-link"
                  to={"/campgrounds/all"}
                >
                  Campgrounds
                </NavLink>
                {!currentUser ? <LoginButton /> : <LogoutButton />}
              </nav>
            </div>
          </header>
          <main className="px-3">
            <h1>BestCampgrounds</h1>
            <p className="lead">
              Welcome to Best Campgrounds <br />
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempora
              ipsa quibusdam nihil atque architecto ea dolore optio mollitia
              dolor minima sit repellat, sequi eum accusantium ad voluptates
              unde aliquam laboriosam.
            </p>
            <Link
              to="/campgrounds/all"
              className="btn btn-lg btn-secondary font-weight-bold bg-white"
            >
              View Campgrounds
            </Link>
          </main>
          <footer className="mt-auto text-white-50">
            © Sep 2021 IACSD Pune Students, Best Campgrounds CDAC Project, INDIA
          </footer>
        </div>
        <div>{/* <Footer /> */}</div>
      </div>
    );
  }
}
