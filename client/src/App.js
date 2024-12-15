import "./App.css";
import UserLogin from "./pages/userLogin/userLogin";
import AdminRegister from "./pages/adminRegister/adminRegister";
import DashboardPage from "./pages/dashboard/dashboardPage";
import { Routes, Route, Navigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import TokenContext from "./components/tokenContext/tokenContext";

import EmployeeDashPage from "./pages/employee-dashboard/employeeDashPage";

import Error from "./pages/error/error";
import AdminChatPage from "./pages/admin-chat/adminChatPage";

function App() {
  const token = localStorage.getItem("token");
  const emptoken = localStorage.getItem("emptoken");

  // console.log(JSON.parse(token));
  const { addIsAdmin, isAdmin } = useContext(TokenContext);
  // const {} = useGetAdminDetails()

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    // console.log(cart);
    if (isAdmin) {
      const parsedCart = JSON.parse(isAdmin);
      addIsAdmin(parsedCart);
      localStorage.removeItem("isAdmin");
    }
  });
  useEffect(() => {
    window.addEventListener("beforeunload", () => {
      // console.log(product);
      // mutate({ _id: id, cart: product });
      const string = JSON.stringify(isAdmin);
      localStorage.setItem("isAdmin", string);
    });
    return () => {
      window.removeEventListener("beforeunload", console.log("removed"));
    };
  });

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            token !== null ? <DashboardPage /> : <Navigate to={"/loginAdmin"} />
          }
        />
        <Route
          path="/adminregister"
          element={token ? <DashboardPage /> : <AdminRegister />}
        />
        <Route path="/admin-chat" element={<AdminChatPage />} />
        <Route path="/loginAdmin" element={<UserLogin />} />

        {/* <Route path="/AdminRegisterDash" element={<AdminRegisterDash />} /> */}
        {/* Employee Dashboard Routes */}
        <Route path="/emp-dash" element={<EmployeeDashPage />} />

        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
