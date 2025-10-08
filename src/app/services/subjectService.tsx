import axios from "axios";

const API_URL = "http://localhost:3001/api/subjects/getAll";

export const getSubjects = async () => {
  try {
    const response = await axios.get(API_URL, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error("Error al obtener las materias:", error);
    throw error;
  }
};
