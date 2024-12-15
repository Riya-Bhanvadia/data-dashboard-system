import React, { useContext, useEffect, useState } from "react";
import { useGetDepartments } from "../../hooks/hooks";
import DashboardContext from "../dashboardContext/dashboardcontext";

const Navbar = () => {
  const { isLoading, data } = useGetDepartments();
  const [btnState, setBtnState] = useState("");
  const { addDepartment, department } = useContext(DashboardContext);
  let date;
  useEffect(() => {
    date = new Date();
  }, []);
  // console.log(data);
  const clickHandler = (i) => {
    // console.log(i._id);
    setBtnState(i.name);
    addDepartment(i._id);
  };
  // console.log(btnState);
  const showAllHandler = () => {
    // setBtnState(true);
    addDepartment("");
  };

  // console.log(department);
  if (isLoading) {
    return <div className="navbar">Loading...</div>;
  }
  return (
    <div className="navbar">
      <div className="nav-left">
        <button
          className={
            department === ""
              ? "btn btn-outline-light m-2 active"
              : "btn btn-outline-light m-2 "
          }
          onClick={() => showAllHandler()}
        >
          All
        </button>
        {data.data.map((i) => {
          return (
            <button
              className={
                btnState === i.name && department !== ""
                  ? "btn btn-outline-light m-2 active"
                  : "btn btn-outline-light m-2"
              }
              key={i._id}
              onClick={() => clickHandler(i)}
            >
              {i.name}
            </button>
          );
        })}
      </div>
      <div className="nav-right">
        <p className="current-date">{date}</p>
      </div>
    </div>
  );
};

export default Navbar;
