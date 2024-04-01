import axios from "axios";
import authHeader from "./authHeader";
const USER_SERVER_BASE_URL = process.env.REACT_APP_SERVER_URL;
const USER_API_BASE_URL = `${USER_SERVER_BASE_URL}/campgrounds/`;
class CampgroundServices {
  getCampgrounds() {
    return axios.get(USER_API_BASE_URL + "all", {
      headers: authHeader(),
    });
  }
  createCampground(campground) {
    return axios.post(USER_API_BASE_URL + "create", campground, {
      headers: authHeader(),
    });
  }
  updateCampground(id, campground) {
    return axios.put(USER_API_BASE_URL + id, campground, {
      headers: authHeader(),
    });
  }

  deleteCampground(id) {
    return axios.delete(USER_API_BASE_URL + id, {
      headers: authHeader(),
    });
  }

  getById(id) {
    return axios.get(USER_API_BASE_URL + "id/" + id, {
      headers: authHeader(),
    });
  }
  getByCity(city) {
    return axios.get(USER_API_BASE_URL + "city/" + city, {
      headers: authHeader(),
    });
  }
  getByState(state) {
    return axios.get(USER_API_BASE_URL + "state/" + state, {
      headers: authHeader(),
    });
  }
  getByCountry(country) {
    return axios.get(USER_API_BASE_URL + "country/" + country, {
      headers: authHeader(),
    });
  }
}
export default new CampgroundServices();
