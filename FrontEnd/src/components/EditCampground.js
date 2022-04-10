import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import { massage, campground } from "../store";
import CampgroundSevices from "../services/CampgroundSevices";
import Flash from "../message/Flash";
import Footer from "./Footer";

const EditCampground = () => {
  const camp = useSelector((state) => state.camp.campground);
  const title = useSelector((state) => state.campground.title);
  const city = useSelector((state) => state.campground.city);
  const state = useSelector((state) => state.campground.state);
  const country = useSelector((state) => state.campground.country);
  const price = useSelector((state) => state.campground.price);
  const description = useSelector((state) => state.campground.description);

  const params = useParams();
  const campgroundId = params.campgroundId;

  const navigate = useNavigate();
  console.log(campgroundId);
  console.log(camp);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    console.log(data);
    console.log(data.get("description"));
    dispatch(campground.setTitle(data.get("title")));
    dispatch(campground.setCity(data.get("city")));
    dispatch(campground.setState(data.get("state")));
    dispatch(campground.setCountry(data.get("country")));
    dispatch(campground.setPrice(data.get("price")));
    dispatch(campground.setDescription(data.get("description")));

    CampgroundSevices.updateCampground(campgroundId, {
      title: data.get("title"),
      city: data.get("city"),
      state: data.get("state"),
      country: data.get("country"),
      price: data.get("price"),
      description: data.get("description"),
    })
      .then((result) => {
        console.log(result);
        dispatch(massage.setMassage("Campground Updated Successfully"));
        dispatch(massage.setIsError(false));
        dispatch(massage.setIsSuccses(true));
        navigate("/campgrounds/" + campgroundId);
      })
      .catch((error) => {
        console.log(error);
        dispatch(massage.setMassage("Campground Updation Failed"));
        dispatch(massage.setIsError(true));
        dispatch(massage.setIsSuccses(false));
      });
  };

  return (
    <div>
      <Navbar />
      <Flash />
      <div className="row">
        <h1 className="text-center">Edit Campground</h1>
        <div className="col-md-6 offset-md-3">
          <form
            // action="/campgrounds/<%= campground._id %>?_method=put"
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
                defaultValue={camp.title}
                onChange={(e) => dispatch(campground.setTitle(e.target.value))}
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
                defaultValue={camp.city}
                onChange={(e) => dispatch(campground.setCity(e.target.value))}
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
                defaultValue={camp.state}
                onChange={(e) => dispatch(campground.setState(e.target.value))}
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
                defaultValue={camp.country}
                onChange={(e) =>
                  dispatch(campground.setCountry(e.target.value))
                }
                required
              />

              <div className="valid-feedback">Looks good!</div>
            </div>

            <div className="mb-3">
              <label className="form-lable" htmlFor="image">
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
                  defaultValue={camp.price}
                  onChange={(e) =>
                    dispatch(campground.setPrice(e.target.value))
                  }
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
                defaultValue={camp.description}
                onChange={(e) => console.log(e.target.value)}
                required
              ></textarea>
              <div className="valid-feedback">Looks good!</div>
            </div>

            <div className="mb-3">
              <button className="btn btn-info" type="submit">
                Update Campground
              </button>
              <br />
            </div>
          </form>

          <Link to={"/campgrounds/" + campgroundId}>Backe To Campground</Link>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};
export default EditCampground;
