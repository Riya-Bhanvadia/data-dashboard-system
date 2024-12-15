import React, { useContext, useRef, useState } from "react";
import { MdOutlineAddCircle } from "react-icons/md";
import { useGetTasks, useUpdateTaskDate } from "../../hooks/hooks";
import AddTask from "../addtask/addTask";
import DashboardContext from "../dashboardContext/dashboardcontext";
import { useQueryClient } from "react-query";
import SearchEmp from "../searchEmp/searchEmp";
import TableContent from "../tableContent/tableContent";
// import Pagination from "../pagination/pagination";
import UserRegister from "../userRegister/userregister";
import AdminRegisterDash from "../adminRegister-dashboard/adminRegisterDash";
import Loading from "../Loading/loading";

const Dashboard = () => {
  const refs = useRef();

  const userRefs = useRef();
  const adminRefs = useRef();
  const tableRefs = useRef();
  const [openTask, setOpenTask] = useState(false);
  const [search, setSearch] = useState("");

  const deptName = localStorage.getItem("deptName");
  const adminName = localStorage.getItem("adminName");

  const { isLoading, data } = useGetTasks();
  const { mutate } = useUpdateTaskDate();
  const { department } = useContext(DashboardContext);

  const closeTask = () => {
    setOpenTask(false);
  };
  const queryClient = useQueryClient();
  const handleToggle = (item) => {
    mutate(
      {
        id: item._id,
        approvedBy: adminName,
        empId: item.empId._id,
        taskName: item.taskName,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries("tasks");
        },
      }
    );
  };

  if (isLoading) {
    return <div className="dashboard-container">isLoading...</div>;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-size" ref={refs}>
        <div className="dashboard-header">
          <SearchEmp search={search} searchHandler={setSearch} />

          <button
            className="dashboard-add-employee"
            onClick={() => setOpenTask(true)}
          >
            <MdOutlineAddCircle />
            &nbsp; Add New Task
          </button>
        </div>
        <table className="dashboard-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Task</th>
              <th>Head</th>
              <th>Date</th>
              <th>Status</th>
              <th>Completion Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <TableContent
            refs={tableRefs}
            data={data.data}
            department={department}
            handleToggle={handleToggle}
            search={search}
          />
        </table>
      </div>

      <AddTask
        openTask={openTask}
        closeTask={closeTask}
        deptName={deptName}
        refs={refs}
      />
      <UserRegister refs={userRefs} />
      <AdminRegisterDash refs={adminRefs} />
    </div>
  );
};

export default Dashboard;
