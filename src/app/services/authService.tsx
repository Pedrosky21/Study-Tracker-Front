import axios from "axios";

export const getProfile = async () => {
  try {
    const res = await axios.get("http://localhost:3001/api/profile", {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
