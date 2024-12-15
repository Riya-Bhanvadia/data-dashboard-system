import React, { useState } from "react";
import DashboardContext from "./dashboardcontext";

const DashboardState = (props) => {
  const [department, setDepartment] = useState("");
  const [user, setUser] = useState();

  const addDepartment = (data) => {
    setDepartment(data);
  };
  const addUser = (data) => {
    setUser(data);
  };
  return (
    <DashboardContext.Provider
      value={{ department, addDepartment, user, addUser }}
    >
      {props.children}
    </DashboardContext.Provider>
  );
};

export default DashboardState;
