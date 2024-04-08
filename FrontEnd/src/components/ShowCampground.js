import CampgroundSevices from "../services/CampgroundSevices";
import UserService from "../services/UserService";
import { useState, useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import AuthServices from "../services/AuthServices";
import { useSelector, useDispatch } from "react-redux";
import { camp, massage, user } from "../store/index";
import ReviewForm from "./ReviewForm";
import EditDeleteButton from "./EditDeleteButton";
import ShowReviews from "./ShowReviews";
import Navbar from "./Navbar";
import Carousel from "react-bootstrap/Carousel";
import {
  Row,
  Col,
  Container,
  Card,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import Flash from "../message/Flash";
import Footer from "./Footer";
import ShowMap from "./ShowMap";

const ShowCampground = (props) => {
  const campground = useSelector((state) => state.camp.campground);
  const userAuthor = useSelector((state) => state.user.user);
  console.log(campground);
  const params = useParams();
  const [show, setShow] = useState(false);
  const campgroundId = params.campgroundId;
  console.log(campgroundId);
  const dispatch = useDispatch();
  const currentUser = AuthServices.getCurrentUser();
  console.log(currentUser);
  useEffect(() => {
    CampgroundSevices.getById(campgroundId)
      .then((result) => {
        dispatch(camp.setLoading(true));
        console.log(result);
        dispatch(camp.setCamp(result.data));
        dispatch(camp.setAuthor(result.data.author));

        dispatch(camp.setLoading(false));
      })

      .catch((error) => {
        console.log(error);
        if (!AuthServices.getCurrentUser) {
          dispatch(massage.setMassage("You have to Login Firts"));
          dispatch(massage.setIsError(true));
          dispatch(massage.setIsSuccses(false));
          <Navigate to="/auth/signin" />;
        }
      });
  }, []);
  useEffect(() => {
    if (campground.author !== undefined) {
      UserService.getUserById(campground.author)
        .then((result) => {
          dispatch(user.setUser(result.data));
          console.log(result.data);
        })
        .catch((error) => console.log(error));
    }
  }, [campground.author]);

  return (
    <div>
      <Navbar />
      <Flash />
      <Container>
        <Row>
          <Col>
            <Carousel>
              {campground.images === undefined ||
                (campground.images.length == 0 && (
                  <Carousel.Item>
                    <img
                      className="d-block w-100 img-fluid"
                      src="https://res.cloudinary.com/firstmachine/image/upload/v1642241421/YelpCamp/fmhrca8n70wtj4ewo8by.png"
                      alt="First slide"
                      height="50%"
                    />
                  </Carousel.Item>
                ))}
              {campground.images &&
                campground.images.map((img, i) => (
                  <Carousel.Item key={i}>
                    <div style={{ height: "400px" }}>
                      <img
                        className="d-block w-100 img-fluid"
                        src={img.url}
                        alt="First slide"
                        height="50%"
                      />
                    </div>
                  </Carousel.Item>
                ))}
            </Carousel>

            <Card className="mb-3">
              <Card.Body>
                <Card.Title>{campground.title} </Card.Title>
                <Card.Text> {campground.description} </Card.Text>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroupItem className="text-muted">
                  {campground.city}, {campground.state}, {campground.country}
                </ListGroupItem>
                <ListGroupItem>
                  Submitted by {userAuthor.username}
                </ListGroupItem>
                {/* <ListGroupItem>
                  cost ${campground.price} per night
                </ListGroupItem> */}
              </ListGroup>

              {currentUser &&
              (userAuthor.id === currentUser.id ||
                currentUser.roles[0] === "ROLE_ADMIN") ? (
                <Card.Body>
                  <EditDeleteButton campgroundId={campgroundId} />

                  <Link
                    className="btn btn-primary mt-3"
                    to={"/campgrounds/" + campgroundId + "/images/manage"}
                  >
                    Manage Image
                  </Link>
                </Card.Body>
              ) : (
                ""
              )}

              <Card.Footer className="text-muted">2 days ago</Card.Footer>
            </Card>
          </Col>

          <Col>
            {show && (
              // <div id="map">
              //   <iframe
              //     width="500"
              //     height="350"
              //     allowfullsreen
              //     referrerpolicy="no-referrer-when-downgrade"
              //     src={
              //       "https://www.google.com/maps/embed/v1/place?key=AIzaSyCI5t91a_b1NOPpsdEV-DZOfw9I2tZM6lk&q=" +
              //       campground.city +
              //       "," +
              //       campground.state +
              //       "," +
              //       campground.country
              //     }
              //   ></iframe>
              // </div>
              <div id="map">
                <ShowMap campgrounds={[campground]} />
              </div>
            )}
            {!show && (
              <div className="btn btn-primary" onClick={() => setShow(!show)}>
                Show Map
              </div>
            )}
            {show && (
              <div
                className="btn btn-primary my-3"
                onClick={() => setShow(!show)}
              >
                Hide Map
              </div>
            )}
            {currentUser && <ReviewForm campgroundId={campgroundId} />}

            {campground.reviews && campground.reviews.length > 0
              ? campground.reviews.map((review, i) => (
                  <ShowReviews
                    review={review}
                    key={i}
                    campgroundId={campgroundId}
                  />
                ))
              : ""}
          </Col>
        </Row>
      </Container>
      <Footer></Footer>
    </div>
  );
};
export default ShowCampground;
