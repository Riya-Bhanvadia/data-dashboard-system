import React from "react";

const Pagination = (props) => {
  const { dataPerPage, totalPosts, paginate, currentPage, nextPage, prevPage } =
    props;
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / dataPerPage); i++) {
    pageNumbers.push(i);
  }
  console.log(pageNumbers);
  return (
    <nav
      className="Page navigation example mt-3 "
      style={{ marginRight: "45px" }}
    >
      <ul className="pagination justify-content-end">
        <li className="page-item">
          <a
            className="page-link"
            href="#"
            onClick={() => prevPage()}
            style={{ position: "static" }}
          >
            prev
          </a>
        </li>
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <a
              onClick={() => paginate(number)}
              href="#"
              className={
                number === currentPage ? "page-link active" : "page-link"
              }
              style={{ position: "static" }}
            >
              {number}
            </a>
          </li>
        ))}
        <li className="page-item">
          <a
            className="page-link"
            href="#"
            onClick={() => nextPage()}
            style={{ position: "static" }}
          >
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
