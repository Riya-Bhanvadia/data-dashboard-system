import React, { useEffect, useState } from "react";
import { useAdminRegister, useGetDepartments } from "../../hooks/hooks";
import { useContext } from "react";
import ModalContext from "../modalContext/modalContext";

const AdminRegisterDash = (props) => {
  const { refs } = props;
  const { openTaskAdmin, closeTaskAdmin } = useContext(ModalContext);
  const [error, setError] = useState();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [department, setDepartment] = useState("");
  const [deptId, setDeptId] = useState("");
  const adminId = localStorage.getItem("adminId")

  const { mutate } = useAdminRegister();
  const { isLoading, data } = useGetDepartments();
  const selectHandler = (e) => {
    setDepartment(e.target.value);
    setDeptId(e.target[e.target.selectedIndex].id);
    // console.log(e.target[e.target.selectedIndex].id);
  };
  useEffect(()=>{
    setName("");
    setEmail("");
    setPassword("");
    setDepartment("");
    setError("")
  },[])

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (!refs.current.contains(e.target)) {
        closeTaskAdmin();
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [openTaskAdmin, refs, closeTaskAdmin]);

  const clickHandler = () => {
    // console.log(name, email, password);
    // if (!email || !name || !password || !deptId) {
    //   setError("Please fill all details first!!");
    // }
    const document = "pan";
    const task = "admin registered"
    const data = {
      name,
      email,
      password,
      deptId,
      document,
      task,
      adminId
    };
    mutate(data, {
      onSuccess: (data) => {
        console.log(data);
        closeTaskAdmin();
        setName("");
        setEmail("");
        setPassword("");
        setDepartment("");
      },
      onError: (err) => {
        if (!err.response) {
          console.log(err);
          setError(err.message);
        } else if (err.response.data.error.message) {
          setError(err.response.data.error.message);
          setName("");
          setEmail("");
          setPassword("");
          setDepartment("");
        }
      },
    });
  };
  if (isLoading) {
    return <div className="container">Loading...</div>;
  }
  return (
    <div
      className="register-modal"
      style={{ display: openTaskAdmin ? "block" : "none" }}
    >
      <div id="login-box" style={{ border: "1.5px solid #B1C900" }} ref={refs}>
        <span
          className="register-close-btn"
          style={{ color: "white" }}
          onClick={() => closeTaskAdmin()}
        >
          &times;
        </span>
        <div className="logo">
          <h1 className="logo-caption">
            <span className="tweak">R</span>egister New Admin
          </h1>
        </div>
        <form className="register-form">
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
            <span style={{ color: "red" }}>{error}</span>
            <button
              type="button"
              className="btn btn-default btn-block btn-custom"
              onClick={() => clickHandler()}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminRegisterDash;
