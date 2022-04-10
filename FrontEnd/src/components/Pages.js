import { useEffect, useState } from "react";
import Pagination from "react-bootstrap/Pagination";
import { useSelector } from "react-redux";
function Pages(props) {
  const { RenderComponent, pageLimit, dataLimit } = props;
  const data = useSelector((state) => state.campgrounds.campgrounds);
  const loading = useSelector((state) => state.loading);
  const pages = Math.ceil(data.length / dataLimit);
  console.log(pages);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    setCurrentPage(1);
  }, [data]);
  function goToNextPage() {
    setCurrentPage((page) => page + 1);
  }
  function goToPreviousPage() {
    setCurrentPage((page) => (0 > page ? page : page - 1));
  }

  function changePage(event) {
    const pageNumber = parseInt(event.target.textContent, 10);
    setCurrentPage(pageNumber);
  }

  const getPaginatedData = () => {
    var startIndex = currentPage * dataLimit - dataLimit;
    if (startIndex < 0) startIndex = 0;
    console.log(startIndex);
    const endIndex = startIndex + dataLimit;
    return data.slice(startIndex, endIndex);
  };
  const getPaginationGroup = () => {
    let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
    if (start < 0) start = 0;
    return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
  };

  return (
    <div>
      <Pagination size="lg">
        {/* previous button */}
        <Pagination.Prev
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
        ></Pagination.Prev>
        {/* show page numbers */}
        {getPaginationGroup().map(
          (item, index) => (
            console.log(item),
            (
              <Pagination.Item
                key={index}
                onClick={changePage}
                active={currentPage === item}
              >
                {item}
              </Pagination.Item>
            )
          )
        )}
        {/* next button */}
        <Pagination.Next
          onClick={goToNextPage}
          disabled={currentPage === pages}
        ></Pagination.Next>
      </Pagination>

      {/* show the posts, 10 posts at a time */}
      <div>
        {getPaginatedData().map((d, idx) => (
          <RenderComponent key={idx} campground={d} />
        ))}
      </div>

      <Pagination size="lg">
        {/* previous button */}
        <Pagination.Prev onClick={goToPreviousPage}></Pagination.Prev>
        {/* show page numbers */}
        {getPaginationGroup().map(
          (item, index) => (
            console.log(item),
            (
              <Pagination.Item
                key={index}
                onClick={changePage}
                active={currentPage === item}
              >
                {item}
              </Pagination.Item>
            )
          )
        )}
        {/* next button */}
        <Pagination.Next
          onClick={goToNextPage}
          disabled={currentPage === pages}
        ></Pagination.Next>
      </Pagination>
    </div>
  );
}
export default Pages;
