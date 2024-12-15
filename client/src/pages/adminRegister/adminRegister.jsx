import React, { useState } from "react";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { useAdminRegister, useGetDepartments } from "../../hooks/hooks";
import { useNavigate } from "react-router-dom";

const AdminRegister = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [department, setDepartment] = useState("");
  const [deptId, setDeptId] = useState("");
  // const [] = useState()
  const navigate = useNavigate();
  console.log("-----------");
  const { mutate } = useAdminRegister();
  const { isLoading, data } = useGetDepartments();

  const selectHandler = (e) => {
    setDepartment(e.target.value);
    setDeptId(e.target[e.target.selectedIndex].id);
    // console.log(e.target[e.target.selectedIndex].id);
  };
  // console.log(deptId);
  const clickHandler = () => {
    // console.log(name, email, password);
    if (!email || !name || !password || deptId) {
    }
    const document = "pan";
    const data = {
      name,
      email,
      password,
      deptId,
      document,
    };
    mutate(data);
    navigate("/loginAdmin")
  };
  if (isLoading) {
    return <div className="container">Loading...</div>;
  }
  return (
    <>
      <div className="container">
        <div id="login-box">
          <div className="logo">
            <img
              src="http://placehold.it/100x100?text=DD"
              alt=""
              style={{ marginLeft: "34%", width: "30%", borderRadius: "50%" }}
            />
            <h1 className="logo-caption">
              <span className="tweak">R</span>egister
            </h1>
          </div>
          <div className="controls">
            <input
              type="text"
              name="username"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Username"
              className="form-control"
            />
            <input
              type="text"
              name="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="form-control"
            />
            <input
              type="password"
              name="username"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="form-control"
            />
            <input type="file" className="" id="fileInput" />

            <select
              className="btn-secondary"
              id="dropdownMenuButton"
              onChange={(e) => selectHandler(e)}
              style={{
                background: "grey",
                padding: "4px",
                marginTop: "10px",
                width: "100%",
                borderRadius: "2px",
              }}
              placeholder="select department"
              value={department}
              // defaultValue={'Select Department'}
              required
            >
              <option value="" disabled>
                Select Department
              </option>
              {data.data.map((i) => {
                return (
                  <option value={i.name} key={i._id} id={i._id}>
                    {i.name}
                  </option>
                );
              })}
              {/* <option value="hr">HR</option>
              <option value="development">Development</option>
              <option value="design">Design</option> */}
            </select>
            <button
              type="button"
              className="btn btn-default btn-block btn-custom"
              onClick={() => clickHandler()}
            >
              Login
            </button>
          </div>
        </div>
      </div>
      <div id="particles-js"></div>
    </>
  );
};

export default AdminRegister;
