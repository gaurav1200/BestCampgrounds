import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { allCampgrounds, massage } from "../store";
import Flash from "../message/Flash";
import AuthServices from "../services/AuthServices";
import Navbar from "./Navbar";
import UserService from "../services/UserService";
import { Link, useParams } from "react-router-dom";
import Footer from "./Footer";

const Profile = () => {
  const currentUser = AuthServices.getCurrentUser();
  console.log(currentUser.id);
  const params = useParams();
  const userId = params.userId;
  console.log(userId);
  const campgrounds = useSelector((state) => state.campgrounds.campgrounds);
  const { email, username } = currentUser;
  //change password
  const [changePassword, setChangePassword] = React.useState({
    password: "",
    password_confirmation: "",
  });
  const dispatch = useDispatch();
  const [show, setShow] = React.useState(false);
  const [see, setsee] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const onChangePassword = (e) => {
    setChangePassword({
      ...changePassword,
      [e.target.name]: e.target.value,
    });
  };
  function searchByAuthorHandler(event) {
    event.preventDefault();
    dispatch(allCampgrounds.setLoading(true));
    setsee(true);
    UserService.getByAuthor(currentUser.username)
      .then((result) => {
        dispatch(allCampgrounds.addAllCampground(result.data));
        console.log(campgrounds);
      })
      .catch((error) => {
        dispatch(allCampgrounds.addAllCampground({}));
        console.log(error);
      });

    dispatch(allCampgrounds.setLoading(false));
  }
  const onSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const password = data.get("password");
    const password_confirmation = data.get("password_confirmation");
    if (password !== password_confirmation) {
      alert("Password and Confirm Password must be same");
    } else {
      const passData = { uId: userId, newPass: password };
      setLoading(true);
      console.log(passData);
      UserService.changePassword(userId, { newPass: password })
        .then((response) => {
          console.log(response);
          alert("Password Changed Successfully");
          dispatch(massage.setMassage("Password Changed Successfully"));
          dispatch(massage.setIsSuccses(true));
          dispatch(massage.setIsError(false));
          setLoading(false);
          window.location.reload(false);
        })
        .catch((error) => {
          console.log(error);
          dispatch(massage.setMassage("Password Change Failed"));
          dispatch(massage.setIsSuccses(false));
          dispatch(massage.setIsError(true));
          setLoading(false);
        });
    }
  };

  return (
    <div className=" mb-3 mt-2">
      <Navbar />
      <Flash />
      <div className="container">
        <div className="card my-3">
          <div className="card-body">
            <div className="row">
              <div className="col-md-4">
                {!currentUser.image && (
                  <img
                    src="https://res.cloudinary.com/firstmachine/image/upload/v1648829280/x2jzfsroau8ndyvnmxc3.png"
                    alt="avatar"
                    className="img-fluid rounded-circle"
                  />
                )}
                {currentUser.image && (
                  <img
                    src={currentUser.image.url}
                    alt="avatar"
                    className="img-fluid rounded-circle"
                  />
                )}
              </div>

              <div className="col-md-8">
                <h3>Username: {username}</h3>
                <h3>Email: {email}</h3>
                <br />
                <br />
                <Link
                  to={`/campgrounds/users/${userId}/image`}
                  className="btn my-3 btn-sm btn-primary"
                >
                  Edit Image
                </Link>
                &nbsp;&nbsp;&nbsp;
                {!show && (
                  <button
                    className="btn my-3 btn-sm btn-primary"
                    onClick={() => setShow(!show)}
                    type="button"
                  >
                    Change Password
                  </button>
                )}
                {show && (
                  <div className="card my-3">
                    <div className="card-body">
                      <form onSubmit={onSubmit}>
                        <div className="form-group">
                          <label htmlFor="password">New Password</label>
                          <input
                            type="password"
                            className="form-control"
                            name="password"
                            value={changePassword.password}
                            onChange={onChangePassword}
                            placeholder="New Password"
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="password_confirmation">
                            Confirm Password
                          </label>
                          <input
                            type="password"
                            className="form-control"
                            name="password_confirmation"
                            value={changePassword.password_confirmation}
                            onChange={onChangePassword}
                            placeholder="Confirm Password"
                            required
                          />
                        </div>
                        <button className="btn btn-primary mt-3" type="submit">
                          Change Password
                        </button>
                      </form>
                    </div>
                  </div>
                )}
                &nbsp;&nbsp;&nbsp;&nbsp;
                {!see && (
                  <button
                    className="btn btn-primary "
                    onClick={searchByAuthorHandler}
                  >
                    View your campgrounds
                  </button>
                )}
                {see && (
                  <div>
                    <button
                      className="btn my-3 btn-sm btn-primary"
                      onClick={() => setsee(!see)}
                      type="button"
                    >
                      hide
                    </button>

                    <div>
                      {!campgrounds.length && "No campgrounds found"}
                      {campgrounds.length &&
                        campgrounds.map((camp, i) => (
                          <Link to={"/campgrounds/" + camp.id} key={i}>
                            {camp.title}
                            <br />
                          </Link>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Profile;
