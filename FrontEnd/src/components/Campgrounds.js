import React from "react";

import { allCampgrounds } from "../store/index";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./Navbar";
import SearchBoxes from "./SearchBoxes";
import SingleCamp from "./SingleCamp";
import CampgroundSevices from "../services/CampgroundSevices";
import Flash from "../message/Flash";
import Footer from "./Footer";
import ClusterMap from "./ClusterMap";
import Pages from "./Pages";

const Campgrounds = () => {
  const dispatch = useDispatch();
  // const [campgrounds, setCampgrounds] = React.useState([]);
  const campgrounds = useSelector((state) => state.campgrounds.campgrounds);
  console.log(campgrounds);
  const loading = useSelector((state) => state.campgrounds.loading);
  // const [loading, setLoading] = React.useState(false);
  const pageLimit = Math.ceil(campgrounds.length / 5);
  React.useEffect(() => {
    console.log("useEffect");
    if (campgrounds.length === 0) {
      dispatch(allCampgrounds.setLoading(true));
    }
    if (loading !== true && campgrounds.length === 0) {
      CampgroundSevices.getCampgrounds()
        .then((response) => {
          if (response.status == 200) return response.data;
          throw new Error("something went wrong while requesting ");
          // dispatch(allCampgrounds.addAllCampground(result.data));
          // console.log(campgrounds);
          // dispatch(allCampgrounds.setLoading(false));
          // console.log(campgrounds);
        })
        .then((data) => {
          console.log(data);
          dispatch(allCampgrounds.addAllCampground(data));
          dispatch(allCampgrounds.setLoading(false));
        })
        .catch((error) => {
          console.log(error);
          dispatch(allCampgrounds.setLoading(false));
        });
    }
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <Flash />
      {campgrounds?.length > 0 && (
        <div className="ml-10 d-none d-sm-block">
          <ClusterMap campgrounds={campgrounds} />
        </div>
      )}
      <SearchBoxes />
      <h1>All Campgrounds</h1>
      {!loading && campgrounds.length === 0 && <h2>No Campgrounds Found</h2>}

      {loading ? (
        <div className="d-flex justify-content-center gap-4">
          <div className="d-block">
            Please Wait loading campgrounds <br />
          </div>

          <div
            className="spinner-border d-flex justify-content-center"
            role="status"
          >
            <span className="sr-only"></span>
          </div>
        </div>
      ) : (
        campgrounds.map((campground) => (
          <SingleCamp key={campground.id} campground={campground} />
        ))
        // <Pages
        //   RenderComponent={SingleCamp}
        //   pageLimit={pageLimit}
        //   dataLimit={5}
        // />
        // <CampgroundAll campgrounds={campgrounds} />
      )}
      <Footer></Footer>
    </div>
  );
};
export default Campgrounds;
