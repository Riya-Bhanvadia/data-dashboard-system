import React from "react";
import { BiSolidDashboard } from "react-icons/bi";
import { AiFillSchedule } from "react-icons/ai";
import { AiTwotoneSetting } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { FiLogOut } from "react-icons/fi";
import { BiSolidMessageDots } from "react-icons/bi";
import {  useNavigate } from "react-router-dom";

const EmployeeLeftside = () => {
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem("emptoken")
    localStorage.removeItem("userId")
    localStorage.removeItem("empId")
    navigate("/loginAdmin")
    
  }
  return (
    <div className="emp-leftside">
      <div className="emp-leftside-content">
        <div className="logo">
          {/* <img src="dashboard-logo.png" alt="Dashboard" /> */}
          <BiSolidDashboard className="react-icon" />
        </div>
        <div className="logo">
          <AiFillSchedule className="react-icon" />
        </div>
        <div className="logo">
          <CgProfile className="react-icon" />
        </div>
        <div className="logo">
          <AiTwotoneSetting className="react-icon" />
        </div>
      </div>
      <div className="logo" onClick={()=>handleLogout()}>
        <FiLogOut className="react-icon" />
      </div>
      <div className="logo" >
        <BiSolidMessageDots className="react-icon" />
      </div>
    </div>
  );
};

export default EmployeeLeftside;
