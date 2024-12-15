import React, { useContext } from "react";
import { LuLayoutDashboard } from "react-icons/lu";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { RiAdminFill } from "react-icons/ri";
import { IoSettings } from "react-icons/io5";
import { BiSolidMessageDots } from "react-icons/bi";
import TokenContext from "../tokenContext/tokenContext";
import { useNavigate } from "react-router-dom";
import ModalContext from "../modalContext/modalContext";

const Leftside = () => {

  const navigate = useNavigate();
  // const [openTask, setOpenTask] = useState(false);
  // const [openTaskForAdmin, setOpenTaskForAdmin] = useState(false);
  const { addToken } = useContext(TokenContext);
  const adminName = localStorage.getItem("adminName");
  const deptName = localStorage.getItem("adminDept");
  const { addOpenTask, addOpenTaskAdmin } = useContext(ModalContext);
  // console.log(deptName);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("adminName");
    localStorage.removeItem("adminId");
    localStorage.removeItem("adminDept");
    addToken("");
    navigate("/loginAdmin");
  };

  // const closeTask = () => {
  //   setOpenTask(false);
  // };
  // const closeTaskForAdmin = () => {
  //   setOpenTaskForAdmin(false);
  // };
  const openTaskHandler = () => {
    // setOpenTask(true);
    addOpenTask(true);
  };
  const openTaskHandlerForAdmin = () => {
    // setOpenTaskForAdmin(true);
    addOpenTaskAdmin(true);
  };
  const messageHandler = () => {
    navigate("/admin-chat")
  }

  return (
    <div className="sidebar">
      <div className="admin-extend">
        <div>
          <h2>Company's Name</h2>
          <ul>
            <li>
              <button className="btn text-white btn-outline-warning active">
                &nbsp;
                <LuLayoutDashboard /> Dashboard
              </button>
            </li>
            <li>
              <button className="btn text-white btn-outline-warning" onClick={messageHandler}>
                &nbsp;
                <BiSolidMessageDots /> Messages
              </button>
            </li>
            <li>
              <button
                className="btn text-white btn-outline-warning"
                onClick={openTaskHandler}
              >
                &nbsp;
                <BsFillPersonPlusFill /> Add new Employee
              </button>
            </li>
            <li>
              <button
                className="btn text-white btn-outline-warning"
                onClick={openTaskHandlerForAdmin}
              >
                &nbsp;
                <RiAdminFill /> Add new Admin
              </button>
            </li>
            
            <li>
              <button className="btn text-white btn-outline-warning">
                &nbsp;
                <IoSettings /> Settings
              </button>
            </li>
          </ul>
          <button className="logout-btn" onClick={handleLogout}>
            {/* <img src="/vector3670-s034.svg" alt="" /> */}
            &nbsp; Logout
          </button>
        </div>
        <div>
          <div className="sidebar-profile">
            <img />
            <h2>{adminName}</h2>
            <p>{deptName}</p>
          </div>
        </div>
      </div>
      {/* <UserRegister openTask={openTask} closeTask={closeTask} refs={refs} /> */}
      {/* <AdminRegisterDash openTask={openTaskForAdmin}  closeTask={closeTaskForAdmin}/> */}
    </div>
  );
};

export default Leftside;
