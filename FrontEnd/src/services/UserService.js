import axios from "axios";
import authHeader from "./authHeader";
const USER_API_BASE_URL = "http://localhost:9090";
class UserServices {
  getUserById(id) {
    return axios.get(USER_API_BASE_URL + "/users/id/" + id, {
      headers: authHeader(),
    });
  }
  changePassword(id, password) {
    return axios.post(USER_API_BASE_URL + "/users/changePass/" + id, password, {
      headers: authHeader(),
    });
  }
  addProfileImage(id, image) {
    return axios.post(USER_API_BASE_URL + "/users/image/" + id, image, {
      headers: authHeader(),
    });
  }
  getByAuthor(username) {
    return axios.get(USER_API_BASE_URL + "/users/viewyourcamps/" + username, {
      headers: authHeader(),
    });
  }
}
export default new UserServices();
