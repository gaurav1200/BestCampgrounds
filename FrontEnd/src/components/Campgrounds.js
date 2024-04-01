import React from "react";

import Pages from "../components/Pages";
import { allCampgrounds } from "../store/index";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./Navbar";
import SearchBoxes from "./SearchBoxes";
import SingleCamp from "./SingleCamp";
import CampgroundSevices from "../services/CampgroundSevices";
import Flash from "../message/Flash";
import Footer from "./Footer";

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
    dispatch(allCampgrounds.setLoading(true));
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
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <Flash />
      <SearchBoxes />
      <h1>All Campgrounds</h1>
      {!loading && campgrounds.length === 0 && <h2>No Campgrounds Found</h2>}

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
