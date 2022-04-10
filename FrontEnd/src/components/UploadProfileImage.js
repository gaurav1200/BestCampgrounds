import axios from "axios";
import { useState } from "react";
import { massage } from "../store/index";

import { useDispatch } from "react-redux";
import userServices from "../services/UserService";
import { useNavigate, useParams } from "react-router-dom";
import Flash from "../message/Flash";
import Navbar from "./Navbar";
import Footer from "./Footer";
const UploadProfileImage = (props) => {
  const [imaData, setImgData] = useState({ url: "", filename: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const imageManage = props.imageManage;
  const params = useParams();
  const uId = params.userId;
  // const loading = useSelector((state) => state.massage.loading);
  const [loading, setLoading] = useState(false);

  var files = [];

  const onSubmitHandler = (e) => {
    dispatch(massage.setLoading(true));
    setLoading(true);

    console.log(loading);
    e.preventDefault();

    files.push(document.getElementById("file").files[0]);

    console.log(document.getElementById("file").files[0]);
    console.log(files);
    files.map((file) => {
      const data = new FormData();
      data.append("file", file);

      data.append("upload_preset", "bestcampground");
      data.append("cloud_name", "firstmachine");

      axios
        .post("https://api.cloudinary.com/v1_1/firstmachine/image/upload", data)
        .then((res) => {
          console.log(res);
          setImgData({
            url: res.data.secure_url,
            filename: res.data.public_id,
          });
          userServices
            .addProfileImage(uId, {
              url: res.data.secure_url,
              filename: res.data.public_id,
            })
            .then((res) => {
              console.log(res);
              dispatch(massage.setMassage("Profile Image saved Successfully"));
              dispatch(massage.setIsSuccses(true));
              dispatch(massage.setIsError(false));
              console.log(res.data);
              sessionStorage.setItem("user", JSON.stringify(res.data));
              navigate("/campgrounds/users/" + uId);
            })
            .catch((err) => {
              console.log(err);
              dispatch(massage.setMassage("Profile Image saving Failed"));
              dispatch(massage.setIsSuccses(false));
              dispatch(massage.setIsError(true));
            });
          console.log(loading);
          setImgData({
            url: res.data.secure_url,
            filename: res.data.public_id,
          });
        })
        .catch((err) => {
          console.log(err);
          setImgData({});
        });
    });
    // navigate("/campgrounds/" + campgroundId);
    dispatch(massage.setLoading(false));
    setLoading(false);
  };

  return (
    <div>
      {!imageManage && (
        <div>
          <Navbar /> <Flash />
        </div>
      )}

      {loading ? (
        <div className="d-flex justify-content-center">
          <div
            className="spinner-border d-flex justify-content-center"
            role="status"
          >
            <span className="sr-only"></span>
          </div>
        </div>
      ) : (
        <div className="container">
          <div className="mb-3">
            <label htmlFor="formFileSm" className="form-label">
              Upload profile Image
            </label>
            <form onSubmit={onSubmitHandler}>
              <div className="d-flex justify-content-center mb-3">
                <input
                  className="form-control w-50"
                  id={"file"}
                  type="file"
                  name={"image"}
                />
              </div>

              <button className="btn btn-primary btn-sm" type="submit">
                upload
              </button>
              <br />
            </form>
          </div>
        </div>
      )}
      {!imageManage && (
        <div>
          <Footer />
        </div>
      )}
    </div>
  );
};

export default UploadProfileImage;
