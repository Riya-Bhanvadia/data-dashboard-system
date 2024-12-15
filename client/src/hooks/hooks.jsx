import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";

const adminRegister = (data) => {
  return axios.post("http://localhost:5050/createAdmin", data);
};

export const useAdminRegister = () => {
  return useMutation(adminRegister);
};

const empRegister = (data) => {
  return axios.post("http://localhost:5050/createEmployee", data);
};
export const useEmpRegister = () => {
  return useMutation(empRegister);
};

const getDepartments = () => {
  return axios.get("http://localhost:5050/findDepartment");
};
export const useGetDepartments = () => {
  return useQuery("department", getDepartments);
};

const getAllAdmin = () => {
  return axios.get("http://localhost:5050/getAllAdmin");
};
export const useGetAllAdmin = () => {
  return useQuery("admin", getAllAdmin);
};

const getEmployee = (data) => {
  return axios.post("http://localhost:5050/findEmpForTask", data);
};

export const useGetEmployee = () => {
  return useMutation(getEmployee);
};

// const getEmpById = (data) =>{
//   return axios.post("http://localhost:5050/findEmpById",data)
// }

// export const useGetEmpById = (data) =>{
//   console.log(data);
//   return useMutation(getEmpById)
// }

const getEmpId = (data) => {
  return axios.get(`http://localhost:5050/findEmpById/${data}`);
};
export const useGetEmpId = (data) => {
  return useQuery(["Employee", data], () => getEmpId(data));
};

const setTask = (data) => {
  return axios.post("http://localhost:5050/createTask", data);
};

export const useSetTask = () => {
  const queryClient = useQueryClient();
  return useMutation(setTask, {
    onSuccess: () => {
      queryClient.invalidateQueries("tasks");
    },
  });
};

const getTasks = () => {
  return axios.get("http://localhost:5050/findTask");
};

export const useGetTasks = () => {
  return useQuery("tasks", getTasks);
};

const updateTaskDate = (data) => {
  return axios.post("http://localhost:5050/updateTask", data);
};
export const useUpdateTaskDate = () => {
  return useMutation(updateTaskDate);
};

const loginAdminData = (data) => {
  return axios.post("http://localhost:5050/loginAdmin", data);
};

export const useLoginAdminData = () => {
  return useMutation(loginAdminData);
};

const getAdminDetails = (data) => {
  return axios.get(`http://localhost:5050/getAdminData/${data}`);
};
export const useGetAdminDetails = (data) => {
  return useQuery("admin", () => getAdminDetails(data));
};

const getEmpTask = (data) => {
  return axios.get(`http://localhost:5050/findTaskForEmp/${data}`);
};

export const useGetEmpTask = (data) => {
  return useQuery("task", () => getEmpTask(data));
};

const getAttendance = (data) => {
  return axios.get(`http://localhost:5050/getAttendance/${data}`);
};

export const useGetAttendance = (data) => {
  return useQuery(["attendance", data], () => getAttendance(data));
};
