import React, { useContext, useEffect, useState } from "react";

// import "./userRegister.css";
import { useEmpRegister, useGetDepartments } from "../../hooks/hooks";
import ModalContext from "../modalContext/modalContext";

const UserRegister = (props) => {
  const { refs } = props;
  const { openTask, closeTask } = useContext(ModalContext);
  const [deptId, setDeptId] = useState("");
  const [files, setFiles] = useState();
  const [error, setError] = useState();
  const [details, setDetails] = useState({
    uname: "",
    email: "",
    password: "",
  });
  const [department, setDepartment] = useState("");
  const { isLoading, data } = useGetDepartments();
  const { mutate: mutateRegister } = useEmpRegister();

  // const upload = () => {
  //   const formData = new FormData();
  //   formData.append("file", files);
  //   axios.post("", formData);
  // };

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (!refs.current.contains(e.target)) {
        closeTask();
        setDetails({
          uname: "",
          email: "",
          password: "",
        });
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [openTask, refs, closeTask]);
  const task = "employee added";
  const adminId = localStorage.getItem("adminId");
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(details);
    const formData = new FormData();
    formData.append("file", files);
    formData.append("detailsUname", details.uname);
    formData.append("detailsEmail", details.email);
    formData.append("detailsPwd", details.password);
    formData.append("deptId", deptId);
    formData.append("task", task);
    formData.append("adminId", adminId);

    const doc = files.name;
    formData.append("doc", doc);
    // console.log(formData);
    // console.log(files);
    // const data = { details, deptId, doc, formData };
    mutateRegister(formData, {
      onSuccess: (data) => {
        console.log(data);
        closeTask();
      },
      onError: (err) => {
        if (!err.response) {
          console.log(err);
          setError(err.message);
        } else if (err.response.data.error.message) {
          setError(err.response.data.error.message);
        }
      },
    });
  };

  const handleDetails = (e) => {
    const { name, value } = e.target;
    setDetails({ ...details, [name]: value });
  };
  // console.log(details);

  const selectHandler = (e) => {
    setDepartment(e.target.value);
    setDeptId(e.target[e.target.selectedIndex].id);
    // console.log(e.target[e.target.selectedIndex].id);
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
        <span
          className="register-close-btn"
          style={{ color: "black" }}
          onClick={() => closeTask()}
        >
          &times;
        </span>

        <h2 style={{ color: "black" }}>User Register</h2>
        <form
          className="register-form"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <input
            type="text"
            className="register-input"
            name="uname"
            value={details.uname}
            onChange={(e) => handleDetails(e)}
            placeholder="Name"
            required
          />
          <input
            type="email"
            value={details.email}
            name="email"
            onChange={(e) => handleDetails(e)}
            className="register-input"
            placeholder="Email"
            required
          />
          <input
            type="password"
            value={details.password}
            onChange={(e) => handleDetails(e)}
            name="password"
            className="register-input"
            placeholder="Password"
            required
          />
          <input
            type="file"
            className=""
            id=""
            name="file"
            onChange={(e) => setFiles(e.target.files[0])}
          />
          {/* <button onClick={upload}>Upload</button> */}

          <select
            className="btn-secondary"
            id="dropdownMenuButton"
            onChange={(e) => selectHandler(e)}
            style={{
              padding: "9px",
              marginTop: "10px",
              width: "100%",
              borderRadius: "6px",
              border: "1px solid #c2c5c7",
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
            type="submit"
            className="register-btn"
            style={{ color: "black" }}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserRegister;
