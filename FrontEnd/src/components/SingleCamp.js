import React from "react";
import { Link } from "react-router-dom";
import AuthServices from "../services/AuthServices";
import CampgroundSevices from "../services/CampgroundSevices";
import ShowImg from "./ShowImg";
import { useDispatch, useSelector } from "react-redux";
import { camp, campgroundId } from "../store/index";

const SingleCamp = (props) => {
  const dispatch = useDispatch();
  const campground = props.campground;
  // dispatch(camp.setCamp(campground));
  const loading = useSelector((state) => state.loading);
  const showCamp = () => {
    // CampgroundSevices.getById()
    //   .then((result) => {
    //     dispatch(camp.setLoading(true));
    //     console.log(result);
    //     dispatch(camp.setCamp(result.data));
    //     console.log(camp.camp.campground);
    //     dispatch(camp.setLoading(false));
    //   })
    //   .catch((error) => console.log(error));
  };
  let Img = (
    <img
      className="img-fluid"
      alt=""
      src="https://res.cloudinary.com/firstmachine/image/upload/v1642241421/YelpCamp/fmhrca8n70wtj4ewo8by.png"
    />
  );
  if (campground.images.length) {
    Img = <ShowImg campground={campground} />;
  }
  return (
    <div className="card mb-3">
      {/* {console.log(campground)} */}
      <div className="row">
        <div className="col-md-4">{Img}</div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{campground.title}</h5>

            <p className="card-text"> {campground.description}</p>
            <p className="card-text">
              <small className="text-muted">
                {campground.city}, {campground.state} ,{campground.country}
              </small>
            </p>
            <Link
              className="btn btn-primary"
              to={"/campgrounds/" + campground.id}
              onClick={showCamp}
            >
              View {campground.title}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SingleCamp;
