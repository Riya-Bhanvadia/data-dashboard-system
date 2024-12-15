import React from "react";

const SearchEmp = (props) => {
  const { search, searchHandler } = props;
  return (
    <div className="dashboard-search">
      <input
        type="text"
        className="dashboard-search-input"
        value={search}
        onChange={(e) => searchHandler(e.target.value)}
        placeholder="Search..."
      />
    </div>
  );
};

export default SearchEmp;
