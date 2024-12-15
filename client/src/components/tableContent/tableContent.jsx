import React, { useContext, useEffect, useRef, useState } from "react";
import { BsFillPersonFill } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import ModalContext from "../modalContext/modalContext";
import EmpAttendanceChart from "../employeeDashboard/attendance-chart/empAttendanceChart";
import TokenContext from '../tokenContext/tokenContext';

import "./tableContent.css";
import Reactcharts from "../employeeDashboard/recharts/reactcharts";
import { Link, NavLink } from "react-router-dom";


const TableContent = (props) => {
  const { data, department, handleToggle, search, refs } = props;
  const refTaskChartAdmin = useRef();
  const refAttendChart = useRef();

  const [dropdown, setDropdown] = useState(false);
  const [dropId, setDropId] = useState();
  const [id, setId] = useState();
  const { addOpenTaskChart, addOpenAttendChart } = useContext(ModalContext);
  const {setEmpId} = useContext(TokenContext);

  // const id = data[0].empId._id;
  // console.log(id);
  const showDropDown = (i) => {
    setDropId(i._id);
    setDropdown(!dropdown);
    // console.log(i.empId._id);
    setId(i.empId._id);
    setEmpId(i.empId._id);
  };

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (!refs.current.contains(e.target)) {
        setDropdown(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [refs, dropdown]);

  return (
    <>
      <tbody ref={refs}>
        {data
          .filter((it) => {
            return (
              it.empId.empName.includes(search) || it.taskName.includes(search)
            );
          })
          .filter((i) => i.deptId._id.includes(department))
          .map((item) => {
            return (
              <tr className="dashboard-table-data" key={item._id}>
                <td>
                  <BsFillPersonFill />
                  &nbsp;&nbsp;{item.empId.empName}
                </td>
                <td>{item.taskName}</td>
                <td>{item.adminId.adminName}</td>

                <td>{item.deadline}</td>

                <td>
                  <button
                    className="complete-status"
                    style={
                      item.completionStatus === "onTime"
                        ? {
                            backgroundColor: "#FFD89C",
                            color: "#EE9322",
                            border: "#FFCC70 1px solid",
                          }
                        : item.completionStatus === "delayed"
                        ? {
                            backgroundColor: "#ffdad9",
                            color: "#a92424",
                            border: "#ffdad9 1px solid",
                          }
                        : item.completionStatus === "before time"
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
                    {item.completionStatus}
                  </button>
                </td>
                <td>
                  <input
                    type="checkbox"
                    name="toggle"
                    id="toggle"
                    className="dashboard-toggle-button"
                    defaultChecked={item.status}
                    onClick={() => handleToggle(item)}
                    disabled={item.status === true ? true : false}
                  />
                  {dropdown && dropId === item._id ? (
                    <div className="dropdown-content">
                      <p 
                        // to={{ pathname: "/recharts" }}
                        // state={{ id: item.empId }}
                        onClick={() => addOpenTaskChart(true)}
                        style={{ cursor: "pointer", marginTop: "5px" }}
                      >
                        Progress
                      </p>
                      <p>Approved By:{item.approvedBy}</p>
                      <p onClick={() => addOpenAttendChart(true)} style={{cursor:"pointer"}}>
                        Attendance Report
                      </p>
                    </div>
                  ) : (
                    <p style={{ marginBottom: "0.5rem" }}>pending...</p>
                  )}
                </td>
                <td>
                  <div className="dropdown">
                    <GiHamburgerMenu
                      onClick={() => showDropDown(item)}
                      style={{ cursor: "pointer" }}
                    />
                    {dropdown && dropId === item._id ? (
                      <div className="dropdown-content">
                        <NavLink
                          // to={{ pathname: "/recharts" }}
                          // state={{ id: item.empId }}
                          onClick={() => addOpenTaskChart(true)}
                          style={{ cursor: "pointer", marginTop: "5px" }}
                        >
                          Progress
                        </NavLink>
                        <Link>Approved By:{item.approvedBy}</Link>
                        <p onClick={() => addOpenAttendChart(true)}>
                          Attendance Report
                        </p>
                      </div>
                    ) : (
                      <div></div>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
      </tbody>
      {/* {id ? (
        <> */}
      {/* <Reactcharts id={id} refTaskChart={refTaskChartAdmin} /> */}
      <EmpAttendanceChart id={id} refAttendChart={refAttendChart} />
      {/* </>
      ) : (
        <></>
      )} */}
    </>
  );
};

export default TableContent;
