import React, { useContext, useEffect, useState } from "react";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { useLoginAdminData } from "../../hooks/hooks";
import { useNavigate } from "react-router-dom";

import "./userLogin.css";
import TokenContext from "../../components/tokenContext/tokenContext";
import Loading from "../../components/Loading/loading";
import DashboardContext from "../../components/dashboardContext/dashboardcontext";

const UserLogin = () => {
  const token = localStorage.getItem("token");
  const { addToken, addIsAdmin } = useContext(TokenContext);
  const { addUser } = useContext(DashboardContext);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("")
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [navigate, token]);

  const { mutate: loginMutate } = useLoginAdminData();

  const handleClick = () => {
    setLoading(true);
    setDone(true);
    const obj = { email, password };
    // console.log(obj);
    loginMutate(obj, {
      onError: (error) => {
        if(error.response){
          setDone(false)
          console.log(error.response.data.error.message);
          setError(error.response.data.error.message)
        } else if (!error.response){
          setDone(false)
          console.log(error);
        }
        console.log(error);
        navigate("/loginAdmin");
      },
      onSuccess: (data) => {
        if (data.data.isAdmin === false) {
          localStorage.setItem("emptoken", data.data.result.token);
          // addUser(data.data.result.result._id)
          localStorage.setItem("empId", data.data.result.result._id);
          console.log(data.data.result);
          addIsAdmin(false);
          setTimeout(() => {
            setLoading(false);
            setTimeout(() => {
              setDone(false);
              navigate("/emp-dash", {
                state: {
                  empName: data.data.result.result.empName,
                  id: data.data.result.result._id,
                },
              });
            }, 2400);
          }, 1000);
        } else if (data.data.isAdmin) {
          localStorage.setItem("token", data.data.result.token);
          addIsAdmin(true);
          addToken(data.data.token);
          localStorage.setItem("adminName", data.data.result.result.adminName);
          const id = localStorage.setItem(
            "adminId",
            data.data.result.result._id
          );
          // console.log(id);
          localStorage.setItem(
            "adminDept",
            data.data.result.result.department.name
          );
          setTimeout(() => {
            setLoading(false);
            setTimeout(() => {
              setDone(false);
              navigate("/");
            }, 2400);
          }, 1000);
        }
      },
    });
  };
  if (done) {
    return <Loading loading={loading} />;
  }
  return (
    <div className="user-login">
      <div className="login-container">
        <div id="login-box">
          <div className="log-profile">
            <img
              src="http://placehold.it/100x100?text=DD"
              style={{ marginLeft: "27%", width: "50%", borderRadius: "50%" }}
            />
            <h1 className="logo-caption">
              <span className="tweak">L</span>ogin
            </h1>
          </div>
          <div className="controls">
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              placeholder="email"
              className="form-control"
            />
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              placeholder="Password"
              className="form-control"
            />
            <button
              type="button"
              className="btn btn-default btn-block btn-custom"
              onClick={handleClick}
            >
              Login
            </button>
            <div><span style={{color:"red"}}>{error}</span></div>
          </div>
        </div>
      </div>
      <div id="particles-js"></div>
    </div>
  );
};

export default UserLogin;
