import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";

const getChats = (data) => {
  return axios.get(`http://localhost:5050/getChats/${data}`);
};
export const useGetChats = (data) => {
  return useQuery("chats", () => getChats(data));
};

const getAdminName = (data) => {
  console.log(data);
  return axios.post("http://localhost:5050/getAdminNames", data);
};
export const useGetAdminName = () => {
  return useMutation(getAdminName);
};

const createChat = (data) => {
  return axios.post("http://localhost:5050/createChat", data);
};
export const useCreateChat = () => {
  return useMutation(createChat);
};

const createOrGetMessage = (data) => {
  return axios.get(`http://localhost:5050/createOrGetMessage/${data} `);
};

export const useCreateOrGetMessage = (data) => {
  return useQuery(["message", data], () => createOrGetMessage(data));
};

const updateMessage = (data) => {
  return axios.post("http://localhost:5050/updateMessage", data);
};

export const useUpdateMessage = () => {
  const queryClient = useQueryClient();
  return useMutation(
    updateMessage
    //    {
    //   onSuccess: (data) => {
    //     console.log(data);
    //     queryClient.invalidateQueries("message");
    //   },
    // }
  );
};

const getAllEmployee = () => {
  return axios.get("http://localhost:5050/getEmployee");
};

export const useGetAllEmployee = () => {
  return useQuery("employee", getAllEmployee);
};
