import React, { useContext, useEffect, useState } from "react";
import { useGetEmpTask } from "../../../hooks/hooks";
import { useLocation } from "react-router-dom";
import ModalContext from "../../modalContext/modalContext";

const EmpTask = (props) => {
  const { refTask, data } = props;
  const { openEmpTask, closeEmpTask } = useContext(ModalContext);

  const location = useLocation();
  const id = location.state.id;
  // const { isLoading, data } = useGetEmpTask(id);

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (!refTask.current.contains(e.target)) {
        closeEmpTask();
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [openEmpTask, refTask, closeEmpTask]);

  return (
    <div
      className="register-modal"
      style={{ display: openEmpTask ? "block" : "none" }}
    >
      <div
        className="register-content"
        style={{ background: "white", marginTop: "50px" }}
        ref={refTask}
      >
        <span
          className="register-close-btn"
          style={{ color: "black" }}
          onClick={() => closeEmpTask()}
        >
          &times;
        </span>

        <h2 style={{ color: "black" }}>All Task</h2>
        <div style={{ overflowY: "auto", maxHeight: "calc(100vh - 150px)" }}>
          <table
            className="emp-dash"
            style={{ width: "100%", marginLeft: "0px" }}
          >
            <thead>
              <tr className="emp-table-head">
                <th>Task</th>
                <th>Department</th>
                <th>Head</th>
                <th>Date</th>
                <th>Status</th>
                <th>Completion Date</th>
              </tr>
            </thead>
            <tbody className="modal-body" style={{ overflowY: "auto" }}>
              {data.result.map((i) => (
                
                <tr key={i._id} className="emp-dashboard-table-data">
                  <td>{i.taskName}</td>
                  <td>{i.deptId.name}</td>
                  <td>{i.adminId.adminName}</td>
                  <td>{i.deadline}</td>
                  <td>
                    <button
                      className="complete-status"
                      style={
                        i.completionStatus === "onTime"
                          ? {
                              backgroundColor: "#FFD89C",
                              color: "#EE9322",
                              border: "#FFCC70 1px solid",
                            }
                          : i.completionStatus === "delayed"
                          ? {
                              backgroundColor: "#ffdad9",
                              color: "#a92424",
                              border: "#ffdad9 1px solid",
                            }
                          : i.completionStatus === "before time"
                          ? {
                              backgroundColor: "#effed9",
                              color: "#6ea924",
                              border: "#effed9 1px solid",
                            }
                          : {
                              backgroundColor: "#c1e1ec",
                              color: "#191970",
                              border: "#c1e1ec 1px solid",
                            }
                      }
                    >
                      {i.completionStatus}
                    </button>
                  </td>
                  <td>{i.completedDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmpTask;
