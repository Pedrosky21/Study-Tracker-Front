import axios from "axios";

export const updateTopicProgress = async (
  topicID: number,
  completed_date: Date | null
) => {
  try {
    const response = await axios.put(
      `http://localhost:3001/api/topics/edit/${topicID}`,
      { completed_date },
      { withCredentials: true }
    );

    return response.data;
  } catch (error) {
    console.error("Error al actualizar el tema:", error);
    throw error;
  }
};
