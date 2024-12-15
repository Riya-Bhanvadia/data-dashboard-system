import React, { useState } from "react";
import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";
import "./empCalender.css";
import { useGetEmpTask } from "../../../hooks/hooks";

const EmpCalender = (props) => {
  const { data } = props;
  // const { isLoading, data } = useGetEmpTask();
  const [dateState, setDateState] = useState(new Date());

  let markedDate = data.data.result.map((i) => {
    if (i.completionStatus === "Assigned") {
      return i.deadline;
    }
  });

  const changeDate = (e) => {
    setDateState(e);
  };
  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }
  return (
    <>
      <div
        className="emp-calender react-calender"
        style={{ display: "grid", placeItems: "center" }}
      >
        {/* <div>
          <h4
            onClick={() => setDateState(new Date())}
            style={{ cursor: "pointer", color: "red" }}
          >
            Today
          </h4>
        </div> */}
        <Calendar
          value={dateState}
          onChange={changeDate}
          tileClassName={({ date }) => {
            // console.log(date);
            let day = date.getDate();
            let month = date.getMonth() + 1;
            if (date.getMonth < 10) {
              month = "0" + month;
            }
            if (date.getDate < 10) {
              day = "0" + day;
            }
            const realDate = month + "/" + day + "/" + date.getFullYear();
            if (markedDate.find((val) => val === realDate)) {
              return "highlight";
            }
          }}
        />
      </div>
    </>
  );
};

export default EmpCalender;
