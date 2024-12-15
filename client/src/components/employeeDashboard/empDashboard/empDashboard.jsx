import React from "react";
import { IoIosNotifications } from "react-icons/io";
import EmpCard from "../empCard/empCard";
import EmpCalender from "../emp-calender/empCalender";


import { useLocation } from "react-router-dom";
import { useGetEmpTask } from "../../../hooks/hooks";
import Chatbox from "../../chat/chat-box/chatbox";

const EmpDashboard = () => {
  const location = useLocation();

  const name = location.state.empName;
  const id = location.state.id;
  const empId = localStorage.getItem("empId")
 

  const { isLoading, data } = useGetEmpTask(empId);

  if (isLoading) {
    return (
      <div
        className="emp-dash-main"
        style={{ color: "white", fontWeight: "bold" }}
      >
        Loading...
      </div>
    );
  }
  return (
    <div className="emp-dash-main">
      <div className="emp-dash-leftcontent">
        <div className="emp-dash-main-container">
          <div className="dashboard-emp-container">
            <div className="emp-header-nav">
              <div className="emp-header">
                <h3>{name}</h3>
              </div>
              {/* <div className="emp-noti-icons">
              <IoIosNotifications style={{ width: "25px", height: "25px" }} />
            </div> */}
            </div>
            <EmpCard data={data.data} />
          </div>
          <div className="emp-body">
            <div className="emp-meeting-schedule">
              <button className="emp-dashboard-add-employee">
                Meeting Details
              </button>
            </div>
            <div>
              <table className="emp-dash">
                <thead>
                  <tr className="emp-table-head">
                    <th>Task</th>
                    <th>Head</th>
                    <th>Department</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {data ? (
                    data.data.result
                      .filter((it) => it.completionStatus === "Assigned")
                      .map((i) => (
                        <tr className="emp-dashboard-table-data" key={i._id}>
                          <td>{i.taskName}</td>
                          <td>{i.deptId.name}</td>
                          <td>{i.adminId.adminName}</td>
                          <td>{i.deadline}</td>
                        </tr>
                      ))
                  ) : (
                    <tr className="emp-dashboard-table-data">
                      No Data Assigned
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            {/* <div className="emp-calender">dfgfgv</div> */}
            <EmpCalender data={data}/>
          </div>
        </div>
      </div>
      <Chatbox />
    </div>
  );
};

export default EmpDashboard;
