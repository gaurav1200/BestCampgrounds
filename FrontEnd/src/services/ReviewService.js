import axios from "axios";
import authHeader from "./authHeader";
const USER_SERVER_BASE_URL = process.env.REACT_APP_SERVER_URL;
const USER_API_BASE_URL = `${USER_SERVER_BASE_URL}/campgrounds/id/`;
class ReviewService {
  createReview(review, campgroundId) {
    return axios.post(USER_API_BASE_URL + campgroundId + "/reviews", review, {
      headers: authHeader(),
    });
  }
  deleteReview(campId, id) {
    return axios.delete(USER_API_BASE_URL + campId + "/reviews/" + id, {
      headers: authHeader(),
    });
  }
}
export default new ReviewService();
