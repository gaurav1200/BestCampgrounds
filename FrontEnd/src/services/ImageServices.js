import axios from "axios";
import authHeader from "./authHeader";
const USER_API_BASE_URL = "http://localhost:9090/campgrounds/id/";
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
