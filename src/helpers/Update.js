import axios from "axios";

const url = "http://localhost:3000/data";


export const UpdateData = async (id,data) =>{
    const response = await axios.patch(`${url}/${id}`, data);
    return response.data;
}