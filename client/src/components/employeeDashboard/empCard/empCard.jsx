import React, { useContext, useRef, useState } from "react";
import { FaTasks } from "react-icons/fa";
import { BsGraphUpArrow } from "react-icons/bs";
import { BiTask } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import EmpTask from "../emp-taskcard/empTask";
import ModalContext from "../../modalContext/modalContext";

import EmpAttendanceChart from "../attendance-chart/empAttendanceChart";
import Reactcharts from "../recharts/reactcharts";

const EmpCard = (props) => {
  const refTask = useRef();
  const refTaskChart = useRef();
  const refAttendChart = useRef();
  const { data } = props;
  const { addEmpOpenTask, addOpenTaskChart, addOpenAttendChart } =
    useContext(ModalContext);
  let id;
  data.result.length !== 0 ? (id = data.result[0].empId._id) : (id = 0);
  // const progressHandler = () => {
  //   navigate("/recharts", {state : { id: data[0].empId._id }});
  // };
  return (
    <div className="emp-dashboard-container">
      <div className="emp-dashboard-subcontainer">
        <div
          className="emp-dashboard-card card1"
          onClick={() => addEmpOpenTask(true)}
        >
          <h2>Task Data</h2>
          <FaTasks className="react-icon" />
          <p>task name</p>
        </div>

        <div
          className="emp-dashboard-card card2"
          onClick={() => {
            id !== 0 ? addOpenAttendChart(true) : alert("no data");
          }}
        >
          <h4>Attendance Report</h4>
          <BsGraphUpArrow className="react-icon" />
          <p>This is the content of Card 2.</p>
        </div>

        <div
          className="emp-dashboard-card card3"
          onClick={() => {
            id !== 0 ? addOpenTaskChart(true) : alert("nodata");
          }}
        >
          <h4>Task Progress</h4>
          <BiTask className="react-icon" />
          <p>This is the content of Card 3.</p>
        </div>

        <div className="emp-dashboard-card card4">
          <h2>Card 4</h2>
          <p>View salary updates</p>
        </div>
      </div>
      {id !== 0 ? (
        <Reactcharts id={id} refTaskChart={refTaskChart} taskData={data} />
      ) : (
        <></>
      )}
      {id !== 0 ? (
        <EmpAttendanceChart refAttendChart={refAttendChart} id={id} />
      ) : (
        <></>
      )}

      <EmpTask refTask={refTask} data={data} />
    </div>
  );
};

export default EmpCard;
