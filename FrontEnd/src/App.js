import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Campgrounds from "./components/Campgrounds";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";

import AboutUs from "./other/AboutUs";
import ContactUs from "./other/ContactUs";
import TermAndConditions from "./other/TermAndCondition";
import FAQS from "./other/FAQS";
import PrivacyPolicy from "./other/PrivacyPolicy";
import NewCampground from "./components/NewCampground";
import ShowCampground from "./components/ShowCampground";
import history from "./history";
import EditCampground from "./components/EditCampground";
import UploadImages from "./components/UploadImages";
import Profile from "./components/Profile";
import ManageImages from "./components/ManageImages";
import UploadProfileImage from "./components/UploadProfileImage";

function App() {
  return (
    <div>
      <Router history={history}>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/campgrounds/all" element={<Campgrounds />} />
            <Route
              path="/campgrounds/:campgroundId"
              element={<ShowCampground />}
            />
            <Route path="/campgrounds/users/:userId" element={<Profile />} />
            <Route
              path="/campgrounds/users/:userId/image"
              element={<UploadProfileImage />}
            />
            <Route
              path="/campgrounds/:campgroundId/edit"
              element={<EditCampground />}
            />
            <Route
              path="/campgrounds/:campgroundId/images"
              element={<UploadImages imageManage={false} />}
            />

            <Route
              path="/campgrounds/:campgroundId/images/manage"
              element={<ManageImages />}
            />
            <Route path="/campgrounds/new" element={<NewCampground />} />
            <Route path="/auth/signin" element={<LoginForm />} />
            <Route path="/auth/signup" element={<RegisterForm />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/contactus" element={<ContactUs />} />
            <Route path="/termsnconditions" element={<TermAndConditions />} />
            <Route path="/faqs" element={<FAQS />} />
            <Route path="/privacypolicy" element={<PrivacyPolicy />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
