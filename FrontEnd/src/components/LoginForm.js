import React, { useEffect } from "react";
import { Form } from "react-bootstrap";
import AuthServices from "../services/AuthServices";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

import { massage } from "../store/index";
import { useDispatch } from "react-redux";
import Flash from "../message/Flash";
import Footer from "./Footer";

const LoginForm = (props) => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onNameChange = (e) => setUsername(e.target.value);
  const onPassChange = (e) => setPassword(e.target.value);
  useEffect(() => {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll(".validated-form");

    // Loop over them and prevent submission
    Array.from(forms).forEach(function (form) {
      form.addEventListener(
        "submit",
        function (event) {
          if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
          }

          form.classList.add("was-validated");
        },
        false
      );
    });
  }, []);
  const login = (e) => {
    setLoading(true);

    e.preventDefault();

    const data = new FormData(e.target);
    setUsername(data.get("username"));
    setPassword(data.get("password"));
    let loginRequest = {
      username: username,
      password: password,
    };

    AuthServices.fetchUserByLoginrequest(loginRequest)
      .then((result) => {
        if (result) {
          console.log(result);

          dispatch(massage.setMassage("Login Successfully"));
          dispatch(massage.setIsSuccses(true));
          dispatch(massage.setIsError(false));
          alert("Login Successful");
          setLoading(false);
          navigate("/campgrounds/all");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Login Failed");
        dispatch(massage.setMassage("Login Failed"));
        dispatch(massage.setIsError(true));
        dispatch(massage.setIsSuccses(false));
        setLoading(false);
      });
  };

  return (
    <div>
      <Navbar />
      <Flash />
      {loading && (
        <div className="d-flex justify-content-center">
          <div
            className="spinner-border d-flex justify-content-center"
            role="status"
          >
            <span className="sr-only"></span>
          </div>
        </div>
      )}
      {!loading && (
        <div>
          <div className="cpmtainer d-fles justify-content-center align-items-center my-3">
            <div className="col-md-6 offset-md-3 col-xl-4 offset-xl-4">
              <div className="card shadow">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJyaUnpd6SuhjsYiTnoLbEMwbS2y7_PO-PQw&usqp=CAU"
                  alt=""
                  className="card-img-top"
                />
                <div className="card-body">
                  <h1 className="card-title">Login</h1>
                  <Form
                    // action="/auth/signin"
                    // method="post"
                    className="validated-form"
                    noValidate
                    onSubmit={login}
                  >
                    <Form.Label htmlFor="username">Username</Form.Label>
                    <Form.Control
                      type="text"
                      id="username"
                      name="username"
                      onChange={onNameChange}
                      autoFocus
                      required
                    />

                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    <br />
                    <Form.Label htmlFor="password">Password</Form.Label>
                    <Form.Control
                      type="password"
                      id="password"
                      name="password"
                      onChange={onPassChange}
                      required
                    />

                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    <div className="d-grid gap-2 mt-4">
                      <button
                        type="submit"
                        className="btn btn-success btn-block"
                        // onClick={this.login}
                      >
                        Login
                      </button>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer></Footer>
    </div>
  );
};
export default LoginForm;
