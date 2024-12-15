import React, { useState } from "react";
import ModalContext from "./modalContext";

const ModalState = (props) => {
  const [openTask, setOpenTask] = useState(false);
  const [openEmpTask, setOpenEmpTask] = useState(false);
  const [openTaskAdmin, setOpenTaskAdmin] = useState(false);
  const [openTaskChart, setOpenTaskChart] = useState(false);
  const [openAttendChart, setOpenAttendChart] = useState(false);

  const addOpenTask = (data) => {
    setOpenTask(data);
  };
  const closeTask = () => {
    setOpenTask(false);
  };
  const addOpenTaskAdmin = (data) => {
    setOpenTaskAdmin(data);
  };
  const closeTaskAdmin = () => {
    setOpenTaskAdmin(false);
  };
  const addEmpOpenTask = (data) => {
    setOpenEmpTask(data);
  };
  const closeEmpTask = () => {
    setOpenEmpTask(false);
  };
  const addOpenTaskChart = (data) => {
    setOpenTaskChart(data);
  };
  const closeTaskChart = () => {
    setOpenTaskChart(false);
  };
  const addOpenAttendChart = (data) =>{
    setOpenAttendChart(data)
  }
  const closeAttendChart = () => {
    setOpenAttendChart(false)
  }
  return (
    <ModalContext.Provider
      value={{
        openTask,
        addOpenTask,
        closeTask,
        addOpenTaskAdmin,
        closeTaskAdmin,
        openTaskAdmin,
        addEmpOpenTask,
        openEmpTask,
        closeEmpTask,
        addOpenTaskChart,
        openTaskChart,
        closeTaskChart,
        addOpenAttendChart,
        openAttendChart,
        closeAttendChart
      }}
    >
      {props.children}
    </ModalContext.Provider>
  );
};

export default ModalState;
