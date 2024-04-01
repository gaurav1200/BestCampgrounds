import axios from "axios";
import authHeader from "./authHeader";
const USER_SERVER_BASE_URL = process.env.REACT_APP_SERVER_URL;
const USER_API_BASE_URL = `${USER_SERVER_BASE_URL}/campgrounds/id/`;
class ImageServices {
  addImage(image, campgroundId) {
    return axios.post(USER_API_BASE_URL + campgroundId + "/images", image, {
      headers: authHeader(),
    });
  }
  deleteImage(filename, campgroundId) {
    return axios.delete(
      USER_API_BASE_URL + campgroundId + "/images/" + filename,
      {
        headers: authHeader(),
      }
    );
  }
}
export default new ImageServices();
