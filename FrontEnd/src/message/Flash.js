import { massage } from "../store/index";
import { useDispatch, useSelector } from "react-redux";

const Flash = () => {
  const dispatch = useDispatch();
  const printmassage = useSelector((state) => state.massage.massage);
  const isError = useSelector((state) => state.massage.isError);
  const isSuccses = useSelector((state) => state.massage.isSuccses);
  console.log(printmassage);
  const handleClose = () => {
    dispatch(massage.setMassage(""));
    dispatch(massage.setIsError(false));
    dispatch(massage.setIsSuccses(false));
  };

  return (
    <div>
      {isSuccses && (
        <div
          className="alert alert-success alert-dismissible text-center fade show"
          role="alert"
        >
          {printmassage}
          <button
            type="button"
            className="btn-close h-auto"
            data-bs-dismiss="alert"
            aria-label="Close"
            onClick={handleClose}
          ></button>
        </div>
      )}
      {isError && (
        <div
          className="alert alert-danger alert-dismissible text-center fade show"
          role="alert"
        >
          {printmassage}
          <button
            type="button"
            className="btn-close h-auto"
            data-bs-dismiss="alert"
            aria-label="Close"
            onClick={handleClose}
          ></button>
        </div>
      )}
    </div>
  );
};
export default Flash;
