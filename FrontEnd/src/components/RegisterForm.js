import React, { useEffect } from "react";
import AuthServices from "../services/AuthServices";
import Navbar from "./Navbar";
import { massage } from "../store/index";
import { useDispatch } from "react-redux";
import Flash from "../message/Flash";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "./Footer";

const RegisterForm = () => {
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onNameChange = (e) => setUsername(e.target.value);
  const onEmailChange = (e) => setEmail(e.target.value);
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
  const register = (e) => {
    setLoading(true);
    e.preventDefault();
    const data = new FormData(e.target);
    setUsername(data.get("username"));
    setEmail(data.get("email"));
    setPassword(data.get("password"));
    let registerRequest = {
      username: username,
      email: email,
      password: password,
    };
    AuthServices.registerRequest(registerRequest)
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data);
          alert("Register Successful");
          dispatch(massage.setMassage("Registered Successfully"));
          dispatch(massage.setIsSuccses(true));
          dispatch(massage.setIsError(false));
        }
        const userId = response.data.id;
        setLoading(false);
        navigate("/campgrounds/users/" + { userId } + "/image");
      })
      .catch((err) => {
        console.log(err);
        alert("Register Failed");
        dispatch(massage.setMassage("registration Failed"));
        dispatch(massage.setIsSuccses(false));
        dispatch(massage.setIsError(true));
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
        <div className="cpmtainer d-fles justify-content-center align-items-center my-3">
          <div className="col-md-6 offset-md-3 col-xl-4 offset-xl-4">
            <div className="card shadow">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJyaUnpd6SuhjsYiTnoLbEMwbS2y7_PO-PQw&usqp=CAU"
                alt=""
                className="card-img-top"
              />
              <div className="card-body">
                <h1 className="card-title">Register</h1>
                <form
                  // action="/auth/signup"
                  // method="post"
                  className="validated-form"
                  noValidate
                  onSubmit={register}
                >
                  <label className="form-lable" htmlFor="username">
                    Username
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    id="username"
                    name="username"
                    onChange={onNameChange}
                    autoFocus
                    required
                  />
                  <div className="valid-feedback">Looks good!</div>
                  <br />
                  <label className="form-lable" htmlFor="email">
                    Email
                  </label>
                  <input
                    className="form-control"
                    type="email"
                    id="email"
                    name="email"
                    onChange={onEmailChange}
                    required
                  />
                  <div className="valid-feedback">Looks good!</div>
                  <br />
                  <label className="form-lable" htmlFor="password">
                    Password
                  </label>
                  <input
                    className="form-control"
                    type="password"
                    id="password"
                    name="password"
                    onChange={onPassChange}
                    required
                  />
                  <div className="valid-feedback">Looks good!</div>

                  <div className="d-grid gap-2 mt-4">
                    <button className="btn btn-success" type="submit">
                      Register
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer></Footer>
    </div>
  );
};

export default RegisterForm;
