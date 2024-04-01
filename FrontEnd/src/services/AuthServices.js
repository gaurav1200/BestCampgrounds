//import httpClient from "../http-common";
import axios from "axios";

const USER_API_BASE_URL = process.env.REACT_APP_SERVER_URL;

class AuthServices {
  fetchUserByLoginrequest(loginRequest) {
    return axios
      .post(USER_API_BASE_URL + "/auth/signin", loginRequest)
      .then((response) => {
        if (response.data.jwtToken) {
          // localStorage.setItem("user", JSON.stringify(response.data));
          window.sessionStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      });
  }
  logoutRequest() {
    window.sessionStorage.clear();
    localStorage.removeItem("user");
  }

  registerRequest(registerRequest) {
    return axios.post(USER_API_BASE_URL + "/auth/signup", registerRequest);
  }
  getCurrentUser() {
    return JSON.parse(sessionStorage.getItem("user"));
  }
}
export default new AuthServices();
