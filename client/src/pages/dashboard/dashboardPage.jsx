import React from "react";
import Leftside from "../../components/left-side/leftside";
import Navbar from "../../components/navbar/navbar";
import Dashboard from "../../components/dashboard/dashboard";

const DashboardPage = () => {
 
  // const token = localStorage.getItem("token")
  // useEffect(() => {
  //   if (!token) {
  //     navigate("/loginAdmin");
  //   }
  // }, []);
  // console.log(token);
  return (
    <div>
      <Navbar />
      <Leftside />
      <Dashboard />
    </div>
  );
};

export default DashboardPage;
