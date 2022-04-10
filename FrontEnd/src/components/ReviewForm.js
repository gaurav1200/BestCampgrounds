import ReviewService from "../services/ReviewService";
import "./ReviewForm.css";
import { massage } from "../store/index";
import { useDispatch } from "react-redux";
import AuthServices from "../services/AuthServices";
import { Form } from "react-bootstrap";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const ReviewForm = (props) => {
  const dispatch = useDispatch();
  const currentUser = AuthServices.getCurrentUser();
  const campgroundId = props.campgroundId;
  const navigate = useNavigate();
  useEffect(() => {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll(".validated-form");

    // Loop over them and prevent submission
    Array.from(forms).forEach(function (form) {
      form.addEventListener(
        "submit",
        function (event) {
          if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
          }

          form.classList.add("was-validated");
        },
        false
      );
    });
  }, []);

  const createReview = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const review = {
      rating: data.get("rating"),
      body: data.get("body"),
      author: currentUser.id,
    };
    console.log(currentUser.id);
    console.log(review);
    ReviewService.createReview(review, campgroundId)
      .then((result) => {
        console.log(result);
        alert("Review Created");
        dispatch(massage.setMassage("Review created Successfully"));
        dispatch(massage.setIsSuccses(true));
        dispatch(massage.setIsError(false));
        navigate("/campgrounds/" + campgroundId);
        window.location.reload(false);
      })
      .catch((err) => {
        console.log(err);
        alert("somthing went wrong!");
        dispatch(massage.setMassage("Rview creation Failed"));
        dispatch(massage.setIsSuccses(false));
        dispatch(massage.setIsError(true));
      });
  };

  return (
    <div>
      <h2>Leave a Review</h2>
      <form
        // action="/campgrounds/<%=campground._id%>/reviews"
        // method="post"
        className="mb-3 validated-form"
        noValidate
        onSubmit={createReview}
      >
        <fieldset className="starability-basic">
          <p>Rating</p>
          <input
            type="radio"
            id="no-rate"
            className="input-no-rate"
            name="rating"
            value="1"
            defaultChecked
            aria-label="No rating."
          />
          <input type="radio" id="first-rate1" name="rating" value="1" />
          <label htmlFor="first-rate1" title="Terrible">
            1 star
          </label>
          <input type="radio" id="first-rate2" name="rating" value="2" />
          <label htmlFor="first-rate2" title="Not good">
            2 stars
          </label>
          <input type="radio" id="first-rate3" name="rating" value="3" />
          <label htmlFor="first-rate3" title="Average">
            3 stars
          </label>
          <input type="radio" id="first-rate4" name="rating" value="4" />
          <label htmlFor="first-rate4" title="Very good">
            4 stars
          </label>
          <input type="radio" id="first-rate5" name="rating" value="5" />
          <label htmlFor="first-rate5" title="Amazing">
            5 stars
          </label>
        </fieldset>

        <div className="mb-3">
          <label className="form-label" htmlFor="body">
            Review
          </label>
          <textarea
            className="form-control"
            name="body"
            id="reviewBody"
            cols="30"
            rows="3"
            required
          ></textarea>
          <div className="valid-feedback">Looks good!</div>
        </div>
        <button className="btn btn-success" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};
export default ReviewForm;
