import { useDispatch, useSelector } from "react-redux";
import { search, allCampgrounds } from "../store/index";
import CampgroundSevices from "../services/CampgroundSevices";
const SearchBoxes = () => {
  const dispatch = useDispatch();
  const campgrounds = useSelector((state) => state.campgrounds.campgrounds);
  const loading = useSelector((state) => state.campgrounds.loading);
  const city = useSelector((state) => state.search.city);
  const state = useSelector((state) => state.search.state);
  const country = useSelector((state) => state.search.country);
  const cityInputHandler = (e) => {
    dispatch(search.setCity(e.target.value));
  };
  const stateInputHandler = (e) => {
    dispatch(search.setState(e.target.value));
  };
  const countryInputHandler = (e) => {
    dispatch(search.setCountry(e.target.value));
  };
  function searchByCityHandler(event) {
    event.preventDefault();
    dispatch(allCampgrounds.setLoading(true));
    CampgroundSevices.getByCity(city)
      .then((result) => {
        dispatch(allCampgrounds.addAllCampground(result.data));
        console.log(campgrounds);
      })
      .catch((error) => console.log(error));

    dispatch(allCampgrounds.setLoading(false));
  }
  function searchByStateHandler(event) {
    event.preventDefault();
    dispatch(allCampgrounds.setLoading(true));
    CampgroundSevices.getByState(state)
      .then((result) => {
        dispatch(allCampgrounds.addAllCampground(result.data));
        console.log(campgrounds);
      })
      .catch((error) => console.log(error));
    dispatch(allCampgrounds.setLoading(false));
  }
  function searchByCountryHandler(event) {
    event.preventDefault();
    dispatch(allCampgrounds.setLoading(true));
    CampgroundSevices.getByCountry(country)
      .then((result) => {
        dispatch(allCampgrounds.addAllCampground(result.data));
        console.log(campgrounds);
      })
      .catch((error) => console.log(error));
    dispatch(allCampgrounds.setLoading(false));
  }

  return (
    <div id="srh" className="row justify-content-center my-3 mx-2">
      <div className="col">
        <form action="/campgrounds" method="get" onSubmit={searchByCityHandler}>
          <div className="input-group mb-3">
            <input
              type="search"
              id="srch"
              name="city"
              onChange={cityInputHandler}
              placeholder="search by city"
              className="form-control"
            />
            <button className="btn btn-success" type="submit">
              search
            </button>
          </div>
        </form>
      </div>
      <div className="col">
        <form action="/campgrounds" method="get">
          <div className="input-group mb-3">
            <input
              type="search"
              id="srch"
              name="state"
              onChange={stateInputHandler}
              placeholder="search by state"
              className="form-control"
            />
            <button className="btn btn-success" onClick={searchByStateHandler}>
              search
            </button>
          </div>
        </form>
      </div>
      <div className="col">
        <form action="/campgrounds" method="get">
          <div className="input-group mb-3">
            <input
              type="search"
              id="srch"
              name="country"
              onChange={countryInputHandler}
              placeholder="search by country"
              className="form-control"
            />
            <button
              className="btn btn-success"
              onClick={searchByCountryHandler}
            >
              search
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default SearchBoxes;
