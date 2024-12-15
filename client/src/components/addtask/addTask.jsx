import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useGetDepartments,
  useGetEmployee,
  useSetTask,
} from "../../hooks/hooks";
import "../userRegister/userRegister.css";

const AddTask = (props) => {
  const { openTask, closeTask, refs } = props;
  const adminId = localStorage.getItem("adminId");
  const [task, setTask] = useState("");
  const [date, setDate] = useState("");
  // const [employeeName, setEmployeeName] = useState("");
  const [empNameId, setEmpNameId] = useState("");
  const [department, setDepartment] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [empData, setEmpData] = useState([]);
  const navigate = useNavigate();
  const { isLoading, data } = useGetDepartments();
  const { mutate: getEmp } = useGetEmployee();
  const { mutate: setEmpTask } = useSetTask();
  // console.log("taskName, empId, adminId, deptId, deadline");

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (!refs.current.contains(e.target)) {
        closeTask();
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [openTask, refs, closeTask]);

  const departmentHandler = async (e) => {
    setDepartment(e.target.value.split(",")[0]);
    setDepartmentId(e.target.value.split(",")[1]);

    getEmp(
      { deptId: e.target.value.split(",")[1] },
      {
        onSuccess: (data) => {
          // console.log(data);
          setEmpData(data.data);
        },
      }
    );
    // console.log(department);
  };
  const empHandler = (e) => {
    // console.log(e.target.value.split(",")[1]);
    // setEmployeeName(e.target.value.split(",")[0]);
    setEmpNameId(e.target.value.split(",")[1]);
  };

  const handleSubmit = (e) => {
    const today = new Date(date);
    const date1 = today.toLocaleString().split(",")[0];

    e.preventDefault();
    const taskData = {
      task,
      empNameId,
      adminId,
      departmentId,
      date1,
    };
    setEmpTask(taskData);

    closeTask();
  };

  if (isLoading) {
    return <div className="register-modal">Loading...</div>;
  }
  return (
    <div
      className="register-modal"
      style={{ display: openTask ? "block" : "none" }}
    >
      <div className="register-content" ref={refs}>
        <span className="register-close-btn" onClick={() => closeTask()}>
          &times;
        </span>
        <h2>Add Task</h2>
        <form className="register-form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="register-input"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Project Name"
            required
          />

          <div>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="register-input"
              style={{ width: "60%", float: "left" }}
              required
            />
            <label
              htmlFor="fileInput"
              className=""
              style={{ marginTop: "18px", float: "left" }}
            >
              Set Deadline
            </label>
          </div>

          <select
            className="btn-secondary"
            id="dropdownMenuButton"
            onChange={(e) => departmentHandler(e)}
            placeholder="select department"
            // value={department}
            defaultValue={department}
            style={{
              padding: "10px",
              margin: "10px 0",
              width: "100%",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
            required
          >
            <option value="" disabled>
              Select Department
            </option>
            {data.data.map((it) => {
              return (
                <option value={[it.name, it._id]} key={it._id}>
                  {it.name}
                </option>
              );
            })}
          </select>

          <select
            className="btn-secondary"
            id="dropdownMenuButton"
            onChange={(e) => empHandler(e)}
            placeholder="select department"
            // value={empData}
            defaultValue=""
            style={{
              padding: "10px",
              margin: "10px 0",
              width: "100%",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
            // required
            disabled={empData.length !== 0 ? false : true}
          >
            <option value="" disabled>
              Select Department
            </option>
            {empData.map((i) => {
              return (
                <option value={[i.empName, i._id]} key={i._id}>
                  {i.empName}
                </option>
              );
            })}
          </select>
          <button type="submit" className="register-btn">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTask;
