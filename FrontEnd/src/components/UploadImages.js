import axios from "axios";
import { useEffect, useState } from "react";
import { massage } from "../store/index";

import { useDispatch, useSelector } from "react-redux";
import ImageServices from "../services/ImageServices";
import { Link, useNavigate, useParams } from "react-router-dom";
import Flash from "../message/Flash";
import Navbar from "./Navbar";
import Footer from "./Footer";
const UploadImages = (props) => {
  const [imaData, setImgData] = useState({ url: "", filename: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const imageManage = props.imageManage;
  const params = useParams();
  const campgroundId = params.campgroundId;
  // const loading = useSelector((state) => state.massage.loading);
  const [loading, setLoading] = useState(false);

  const [count, setCount] = useState(1);
  var files = [];
  var showUploaddata = [];
  const onCountChange = (e) => {
    setCount(e.target.value);
  };
  const onSubmitHandler = (e) => {
    dispatch(massage.setLoading(true));
    setLoading(true);

    console.log(loading);
    e.preventDefault();
    for (let i = 0; i < document.getElementById("file").files.length; i++) {
      files.push(document.getElementById("file").files[i]);
    }
    console.log(document.getElementById("file").files);
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
          ImageServices.addImage(
            {
              url: res.data.secure_url,
              filename: res.data.public_id,
            },
            campgroundId
          )
            .then((res) => {
              console.log(res);
              dispatch(massage.setMassage("Image saved Successfully"));
              dispatch(massage.setIsSuccses(true));
              dispatch(massage.setIsError(false));
            })
            .catch((err) => {
              console.log(err);
              dispatch(massage.setMassage("Image saving Failed"));
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
  // useEffect(() => {
  //   if (imaData.url) {
  //     ImageServices.addImage(imaData, campgroundId)
  //       .then((res) => {
  //         console.log(res);
  //         dispatch(massage.setMassage("Image saved Successfully"));
  //         dispatch(massage.setIsSuccses(true));
  //         dispatch(massage.setIsError(false));
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         dispatch(massage.setMassage("Image saving Failed"));
  //         dispatch(massage.setIsSuccses(false));
  //         dispatch(massage.setIsError(true));

  //       });
  //   }
  // }, [imaData.url]);

  for (let i = 0; i < count; i++) {
    showUploaddata.push(
      <div className="mb-3" key={i}>
        <div className="d-flex justify-content-center">
          <input
            className="form-control w-50"
            id={"file"}
            type="file"
            name={"image" + i}
            multiple
          />
        </div>
      </div>
    );
  }

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
          {/* <div className="mb-3">
            <label htmlFor="count" className="form-label">
              How many image you want to upload{" "}
            </label>
            <br />
            <input
              type="number"
              id="count"
              value={count}
              onChange={onCountChange}
            />
          </div> */}
          <div className="mb-3">
            <label htmlFor="formFileSm" className="form-label">
              Add Images
            </label>
            <form onSubmit={onSubmitHandler}>
              {/* {showUploaddata.map((data) => {
                return data;
              })} */}
              <div className="d-flex justify-content-center mb-3">
                <input
                  className="form-control w-50"
                  id={"file"}
                  type="file"
                  name={"image"}
                  multiple
                />
              </div>

              <button className="btn btn-primary btn-sm" type="submit">
                upload
              </button>
              <br />
            </form>

            <Link
              to={"/campgrounds/" + campgroundId}
              className="btn btn-primary mt-3 btn-sm"
            >
              Backe
            </Link>
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

export default UploadImages;
