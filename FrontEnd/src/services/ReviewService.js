import axios from "axios";
import authHeader from "./authHeader";
const USER_API_BASE_URL = "http://localhost:9090/campgrounds/id/";
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
