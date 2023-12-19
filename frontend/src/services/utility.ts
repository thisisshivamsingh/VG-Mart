import { vegetables } from "@/types/typeGroup";
import axios from "axios";
axios.defaults.baseURL = `${process.env.NEXT_PUBLIC_SERVICE_PATH}`;

const headerAxios = {
  headers: {
    user: "admin",
  },
};
export const getItems = async (url: string) => {
  try {
    const response = await axios.get(url, headerAxios);
    return response.data;
  } catch (error) {
    console.error("Error fetching items:", error);
  }
};

export const addItem = async (data: vegetables) => {
  const item = {
    ...data,
  };
  try {
    const response = await axios.post("/vegetables", item, headerAxios);
    return response.data;
  } catch (error) {
    console.error("Error fetching items:", error);
  }
};

export const getItemById = async (url: string) => {
  try {
    const response = await axios.get(url, headerAxios);
    return response.data;
  } catch (error) {
    console.error("Error fetching items:", error);
  }
};

export const DeleteItemById = async (url: string) => {
  try {
    const response = await axios.delete(url, headerAxios);
    return response.data;
  } catch (error) {
    console.error("Error fetching items:", error);
  }
};

export const EditItemById = async (url: string, data: vegetables) => {
  try {
    const response = await axios.patch(url, data, headerAxios);
    return response.data;
  } catch (error) {
    console.error("Error fetching items:", error);
  }
};
