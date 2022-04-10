import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CampgroundSevices from "../services/CampgroundSevices";
import { massage } from "../store";

const EditDeleteButton = (props) => {
  const campgroundId = props.campgroundId;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onDelete = (e) => {
    e.preventDefault();

    CampgroundSevices.deleteCampground(campgroundId)
      .then(() => {
        alert("Campground Deleted");
        dispatch(massage.setMassage("Campground Deleted Successfully"));
        dispatch(massage.setIsSuccses(true));
        dispatch(massage.setIsError(false));

        navigate("/campgrounds/all");
      })
      .catch((error) => {
        console.log(error);
        dispatch(massage.setMassage("Campground Deletion Failed"));
        dispatch(massage.setIsError(true));
        dispatch(massage.setIsSuccses(false));
      });
  };

  return (
    <div>
      <Link
        className="card-link btn btn-warning"
        to={"/campgrounds/" + campgroundId + "/edit"}
      >
        Edit
      </Link>
      &nbsp;&nbsp;&nbsp;
      <form
        className="d-inline"
        // action={"/campgrounds/" + campground._id + "?_method=DELETE"}
        // method="POST"
      >
        <button className="btn btn-danger" onClick={onDelete}>
          DELETE
        </button>
      </form>
    </div>
  );
};
export default EditDeleteButton;
