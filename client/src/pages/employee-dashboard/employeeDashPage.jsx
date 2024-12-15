import React, { useEffect } from "react";
import EmployeeLeftside from "../../components/employeeDashboard/employeeLeftside";
import EmpDashboard from "../../components/employeeDashboard/empDashboard/empDashboard";
import { useNavigate } from "react-router-dom";

const EmployeeDashPage = () => {
  const navigate = useNavigate()
  const token = localStorage.getItem("emptoken")
  useEffect(()=>{
    if(!token){
      navigate("/loginAdmin")
    }
  })
  return (
    <div className="emp-dashboard-top">
      <div className="emp-dashboard-body">
        <EmployeeLeftside />
        <EmpDashboard />
      </div>
    </div>
  );
};

export default EmployeeDashPage;
