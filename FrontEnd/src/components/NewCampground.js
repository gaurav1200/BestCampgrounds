import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import CampgroundSevices from "../services/CampgroundSevices";
import { campgroundId } from "../store";
import Navbar from "./Navbar";
import UploadImages from "./UploadImages";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { massage, camp } from "../store/index";
import Flash from "../message/Flash";
import Footer from "./Footer";

const NewCampground = () => {
  // const [campground, setCampground] = useState({});
  const campground = useSelector((state) => state.camp.campground);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    {
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
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    console.log(data);
    console.log(data.get("description"));
    dispatch(
      camp.setCamp({
        title: data.get("title"),
        city: data.get("city"),
        state: data.get("state"),
        country: data.get("country"),
        price: data.get("price"),
        description: data.get("description"),
      })
    );
    CampgroundSevices.createCampground({
      title: data.get("title"),
      city: data.get("city"),
      state: data.get("state"),
      country: data.get("country"),
      price: data.get("price"),
      description: data.get("description"),
    })
      .then((result) => {
        console.log(result.data);
        alert("Campground Created");
        dispatch(massage.setMassage("Campground created Successfully"));
        dispatch(massage.setIsSuccses(true));
        dispatch(massage.setIsError(false));
        navigate("/campgrounds/" + result.data.id + "/images");
      })
      .catch((err) => {
        console.log(err);
        alert("somthing went wrong!");
        dispatch(massage.setMassage("Campground creation Failed"));
        dispatch(massage.setIsSuccses(false));
        dispatch(massage.setIsError(true));
      });
  };

  return (
    <div>
      <Navbar />
      <Flash />
      <div className="row">
        <h1 className="text-center">New Campground</h1>
        <div className="col-md-6 offset-md-3">
          <form
            // action="/campgrounds"
            // method="POST"
            noValidate
            className="validated-form"
            encType="multipart/form-data"
            onSubmit={handleSubmit}
          >
            <div className="mb-3">
              <label className="form-lable" htmlFor="title">
                Title
              </label>
              <input
                className="form-control"
                type="text"
                id="title"
                name="title"
                required
              />
              <div className="valid-feedback">Looks good!</div>
            </div>
            <div className="mb-3">
              <label className="form-lable" htmlFor="city">
                City
              </label>
              <input
                className="form-control"
                type="text"
                id="city"
                name="city"
                required
              />

              <div className="valid-feedback">Looks good!</div>
            </div>
            <div className="mb-3">
              <label className="form-lable" htmlFor="state">
                State
              </label>

              <input
                className="form-control"
                type="text"
                id="state"
                name="state"
                required
              />

              <div className="valid-feedback">Looks good!</div>
            </div>
            <div className="mb-3">
              <label className="form-lable" htmlFor="country">
                Country
              </label>
              <input
                className="form-control"
                type="text"
                id="country"
                name="country"
                required
              />

              <div className="valid-feedback">Looks good!</div>
            </div>

            <div className="mb-3">
              <label className="form-lable" htmlFor="price">
                Campground Price
              </label>
              <div className="input-group">
                <span className="input-group-text" id="price-lable">
                  $
                </span>
                <input
                  type="text"
                  className="form-control"
                  id="price"
                  placeholder="0"
                  aria-label="price"
                  aria-describedby="price-lable"
                  name="price"
                  required
                />
                <div className="valid-feedback">Looks good!</div>
              </div>
            </div>

            <div className="mb-3">
              <label className="form-lable" htmlFor="description">
                Description
              </label>
              <textarea
                className="form-control"
                type="text"
                id="description"
                name="description"
                required
              ></textarea>
              <div className="valid-feedback">Looks good!</div>
            </div>
            {/* <UploadImages uploadImg={uploaImagesHandler} /> */}
            {/* <Link
              className="btn btn-primary"
              to={"/campgrounds/" + campgroundId + "/images"}
            >
              Upload Image
            </Link> */}
            <div className="mb-3 ">
              <button className="btn btn-success" type="submit">
                Add Campground
              </button>
              <br />
            </div>
          </form>
          {/* <Link to="/campgrounds/all">All Campgrounds</Link> */}
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};
export default NewCampground;
