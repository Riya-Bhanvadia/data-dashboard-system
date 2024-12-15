import React, { useContext, useEffect } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  LabelList,
  Legend,
  Tooltip,
} from "recharts";
import { useGetEmpId } from "../../../hooks/hooks";
import ModalContext from "../../modalContext/modalContext";
import "./recharts.css";

const Reactcharts = (props) => {
  const { id, refTaskChart, taskData } = props;
  // const location = useLocation();
  // const id = location.state.id;
  const { isLoading, data } = useGetEmpId(id);
  const { openTaskChart, closeTaskChart } = useContext(ModalContext);
  console.log(data);
  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (!refTaskChart.current.contains(e.target)) {
        closeTaskChart();
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [openTaskChart, refTaskChart, closeTaskChart]);

  // if(data.data[0].completionStatus === "")
  if (isLoading) {
    return <div>Loading...</div>;
  }
  const total = data.data.tasks.reduce((a, b) => a + b.statusRate, 0);

  return (
    <div
      className="register-modal"
      style={{ display: openTaskChart ? "block" : "none" }}
    >
      <div
        className="register-content"
        style={{ background: "white", marginTop: "50px", height: "auto" }}
        ref={refTaskChart}
      >
        <span
          className="register-close-btn"
          style={{ color: "black" }}
          onClick={() => closeTaskChart()}
        >
          &times;
        </span>
        <div className="chart-container">
          <div className="div-barchart">
            <h1 style={{ textAlign: "center" }}>Progress Report</h1>
            <hr></hr>
            {taskData.l.length !== 0 ? (
              <>
                <ResponsiveContainer
                  width="100%"
                  aspect={2.0}
                  style={{ alignItems: "center" }}
                >
                  {/* <CartesianGrid/> */}
                  <BarChart
                    data={data.data.tasks}
                    // width={100}
                    // height={75}
                    margin={{
                      top: 5,
                      right: 80,
                      left: 80,
                      bottom: 5,
                    }}
                  >
                    <XAxis dataKey="taskName" />
                    <LabelList content="taskName" position="center" />
                    <Legend verticalAlign="bottom" />
                    <YAxis />
                    <Tooltip cursor={{ fill: "transparent" }} />
                    <Bar
                      dataKey="statusRate"
                      fill="#8884d8"
                      name="statusRate"
                      barSize={35}
                      // barCategoryGap="30%"
                    />
                  </BarChart>
                </ResponsiveContainer>
                <h5 style={{ textAlign: "end", margin: "10px" }}>
                  Total Points: {total}
                </h5>
              </>
            ) : (
              <div>task pending...</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reactcharts;
