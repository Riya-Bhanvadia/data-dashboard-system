import React, { useContext, useEffect, useState } from "react";
import { useGetAttendance } from "../../../hooks/hooks";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import ModalContext from "../../modalContext/modalContext";
import TokenContext from '../../tokenContext/tokenContext';

const EmpAttendanceChart = (props) => {
  const { id, refAttendChart } = props;

  const { closeAttendChart, openAttendChart } = useContext(ModalContext);
  const { isLoading, data, isError, error } = useGetAttendance(id);
  const [arrData, setArrData] = useState([]);
  const [attendStatus , setAttendStatus] = useState(false)

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (!refAttendChart.current.contains(e.target)) {
        closeAttendChart();
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [openAttendChart, refAttendChart, closeAttendChart]);

  // useEffect(() => {

  //   if (!isLoading) {
  //     let a = [];
  //     console.log(data);
  //     data.data.result.attend.map((i) => {
  //       const monthData = i[0].split("/");
  //       // console.log(month[1]);
  //       const month = getMonth(monthData[1]);
  //       a.push({ month: month, attendance: i.length });
  //       setArrData(a);
  //       setAttendStatus(data.data.isAttend)
  //     });
  //   }
  // }, [isLoading, data]);

  const getMonth = (month) => {
    if (month === "01") {
      return "Jan";
    } else if (month === "02") {
      return "Feb";
    } else if (month === "03") {
      return "Mar";
    } else if (month === "04") {
      return "Apr";
    } else if (month === "05") {
      return "May";
    } else if (month === "06") {
      return "Jun";
    } else if (month === "07") {
      return "Jul";
    } else if (month === "08") {
      return "Aug";
    } else if (month === "09") {
      return "Sep";
    } else if (month === "10") {
      return "Oct";
    } else if (month === "11") {
      return "Nov";
    } else {
      return "Dec";
    }
  };

  // let a = [];
  // const func = () => {
  //   data.data.attend.map((i) => {
  //     const monthData = i[0].split("/");
  //     // console.log(month[1]);
  //     const month = getMonth(monthData[1]);
  //     a.push({ month: month, attendance: i.length });
  //   });
  // };
  // if (!isLoading) {
  //   func();
  // }
  // console.log(a);

  if (isLoading && openAttendChart) {
    return <div className="register-modal">Loading...</div>;
  }
  return (
    <div
      className="register-modal"
      style={{ display: openAttendChart ? "block" : "none" }}
    >
      <div
        className="register-content"
        style={{ background: "white", marginTop: "50px", height: "auto" }}
        ref={refAttendChart}
      >
        <span
          className="register-close-btn"
          style={{ color: "black" }}
          onClick={() => {
            closeAttendChart();
          }}
        >
          &times;
        </span>
        <div className="chart-container">
          <div className="div-barchart">
            <h1 style={{ textAlign: "center" }}>Attendance Chart</h1>
            <hr></hr>
            {attendStatus ?
            <LineChart
              width={630}
              height={250}
              data={arrData}
              margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="attendance" stroke="#8884d8" />
            </LineChart>: <div>no data</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmpAttendanceChart;
