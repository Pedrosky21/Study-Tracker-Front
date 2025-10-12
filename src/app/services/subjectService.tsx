import axios from "axios";

type Topic = {
  id?: number;
  title: string;
};

type Unit = {
  id?: number;
  title: string;
  topics: Topic[];
};

interface Subject {
  id?: number;
  title: string;
  description?: string;
  units: Unit[];
}

const API_URL = "http://localhost:3001/api/subjects/getAll";

export const createSubject = async (subjectData: Subject) => {
  try {
    const res = await axios.post(
      "http://localhost:3001/api/subjects/create",
      subjectData,
      {
        withCredentials: true, // envía cookies de sesión
      }
    );
  } catch (error) {
    console.error("Error al guardar materia:", error);
  }
};

export const getSubjects = async () => {
  try {
    const response = await axios.get(API_URL, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error("Error al obtener las materias:", error);
    throw error;
  }
};

export const getSubjectByID = async (subjectID: number) => {
  try {
    const response = await axios.get(
      `http://localhost:3001/api/subjects/${subjectID}`,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("Error al obtener las materia:", error);
    throw error;
  }
};

export const getProgress = async (subjectID: number) => {
  try {
    const res = await axios.get(
      `http://localhost:3001/api/subjects/topicsCompleted/${subjectID}`,
      { withCredentials: true }
    );
    return res.data;
  } catch (error) {
    console.error(error);
    return { percentage: 0 };
  }
};

export const updateSubject = async (
  subjectID: number,
  subjectData: Subject
) => {
  try {
    const res = await axios.put(
      `http://localhost:3001/api/subjects/edit/${subjectID}`,
      subjectData,
      { withCredentials: true }
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteSubject = async (subjectID: number) => {
  try {
    await axios.delete(
      `http://localhost:3001/api/subjects/delete/${subjectID}`,
      { withCredentials: true }
    );
  } catch (error) {
    console.error(error);
  }
};
