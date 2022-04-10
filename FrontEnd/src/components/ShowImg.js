const ShowImg = (props) => {
  return (
    <img className="img-fluid" alt="" src={props.campground.images[0].url} />
  );
};
export default ShowImg;
