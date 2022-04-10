import { Link, useNavigate } from "react-router-dom";
import AuthServices from "../services/AuthServices";
import "./ReviewForm.css";
import { massage } from "../store";
import { useDispatch } from "react-redux";
import ReviewService from "../services/ReviewService";

const ShowReviews = (props) => {
  const review = props.review;
  const currentUser = AuthServices.getCurrentUser();
  const campgroundId = props.campgroundId;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onDelete = (e) => {
    e.preventDefault();
    ReviewService.deleteReview(campgroundId, review.id)
      .then(() => {
        alert("Review Deleted");
        dispatch(massage.setMassage("Review Deleted Successfully"));
        dispatch(massage.setIsSuccses(true));
        dispatch(massage.setIsError(false));
        window.location.reload(false);
      })
      .catch((error) => {
        console.log(error);
        dispatch(massage.setMassage("Review Deletion Failed"));
        dispatch(massage.setIsError(true));
        dispatch(massage.setIsSuccses(false));
        // window.location.reload(false);
      });
  };

  return (
    <div className="card mb-3" key={props.i}>
      <div className="card-body">
        <h5 className="card-title">{review.author.username}</h5>
        <p className="starability-result" data-rating={review.rating}>
          Rated:{review.rating}
        </p>
        <p className="card-text">Review: {review.body}</p>

        {currentUser &&
        (review.author.id === currentUser.id ||
          currentUser.roles[0] == "ROLE_ADMIN") ? (
          <div>
            {/* <Link
              className="btn btn-sm btn-warning"
              to={
                "/campgrounds/" + campgroundId + "/reviews/" + review.author.id
              }
            >
              Edit
            </Link> */}
            &nbsp;&nbsp;&nbsp;
            <button className="btn btn-sm btn-danger" onClick={onDelete}>
              Delete
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default ShowReviews;
