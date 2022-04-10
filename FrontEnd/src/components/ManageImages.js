import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Flash from "../message/Flash";
import CampgroundSevices from "../services/CampgroundSevices";
import ImageServices from "../services/ImageServices";
import Navbar from "./Navbar";
import UploadImages from "./UploadImages";
import { massage } from "../store";
import { useDispatch } from "react-redux";
import Footer from "./Footer";

const ManageImages = (props) => {
  const params = useParams();
  const campgroundId = params.campgroundId;
  const dispatch = useDispatch();

  const [camp, setCamp] = useState({});
  useEffect(() => {
    CampgroundSevices.getById(campgroundId)
      .then((result) => {
        console.log(result);
        setCamp(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [campgroundId]);
  const onsubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const file = data.get("image");
    console.log(file);
    ImageServices.deleteImage(file, campgroundId)
      .then((result) => {
        console.log(result);
        dispatch(massage.setMassage("Image Deleted Successfully"));
        dispatch(massage.setIsSuccses(true));
        dispatch(massage.setIsError(false));
        window.location.reload(false);
      })
      .catch((error) => {
        console.log(error);
        dispatch(massage.setMassage("Image Deletion Failed"));
        dispatch(massage.setIsError(true));
        dispatch(massage.setIsSuccses(false));
      });
  };

  return (
    <div className="mb-3">
      <Navbar />
      <Flash />
      {camp.images && camp.images.length > 0 ? (
        camp.images.map((img, i) => (
          <div style={{ display: "inline" }} key={i}>
            <form onSubmit={onsubmit} style={{ display: "inline" }}>
              <img src={img.url} className="img-thumbnail" alt="" />
              &nbsp;&nbsp;&nbsp;
              <input
                type="checkbox"
                id={"image-" + i}
                name="image"
                value={img.filename}
              />
              &nbsp;&nbsp;&nbsp;
              {/* <label htmlFor={"image-" + i}>Delete?</label> */}
              <button className="btn btn-sm btn-danger" type="submit">
                Delete
              </button>
              &nbsp;&nbsp;&nbsp;
            </form>
          </div>
        ))
      ) : (
        <div>No Images</div>
      )}
      <UploadImages imageManage={true} />
      <Footer></Footer>
    </div>
  );
};
export default ManageImages;
