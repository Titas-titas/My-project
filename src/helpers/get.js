import axios from "axios";
const url = "http://localhost:3000/data";

export const getAllData = async () => {
  const response = await axios.get(url);
  return response.data;
};

export const getOne = async (id) => {
  const response = await axios.get(`${url}/${id}`);
  return response.data;
};

