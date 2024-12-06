import axios from "axios";
import { getOne } from "./get";
const url = "http://localhost:3000/data";

export const deleteData = async (id) => {
  try {
    const { email } = await getOne(id);
    const confirmed = window.confirm(`Are you sure you want to delete donor ${email}?`); // Updated to English
    if (!confirmed) return;

    const response = await axios.delete(`${url}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to delete data: ${error.response?.status || error.message}`); // Log error
    return null;
  }
};
