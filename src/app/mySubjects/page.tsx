"use client";

import { useEffect, useState } from "react";
import Nav from "../components/nav";
import { getSubjects } from "../services/subjectService";

interface Topic {
  id: number;
  title: string;
}

interface Unit {
  id: number;
  name: string;
  topics: Topic[];
}

interface Subject {
  id: number;
  title: string;
  description?: string;
  units: Unit[];
}

export default function MySubjects() {
  const [subjects, setSubjects] = useState<Subject[]>([]);

  const subjects2 = [
    {
      name: "Unidad 1",
      topics: [
        { title: "Introducción" },
        { title: "Conceptos básicos" },
        { title: "Ejercicios prácticos" },
      ],
    },
    {
      name: "Unidad 2",
      topics: [{ title: "Tema avanzado" }, { title: "Proyecto final" }],
    },
  ];

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const data = await getSubjects();
        console.log(data);
        setSubjects(data);
      } catch (error) {
        console.error("No se pudieron cargar las materias", error);
      }
    }

    fetchSubjects();
  }, []);

  return (
    <>
      <Nav></Nav>
      <div className="p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-dark-green text-2xl font-bold">Nombre Materia</h1>
          <button className="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-7 text-dark-green"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
              />
            </svg>
          </button>
        </div>

        <div className="">
          {subjects && subjects.map((unit, unitIndex) => (
            <div key={unitIndex} className="rounded-xl mt-5 outline-2 outline-dark-green p-2">
              <button className="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>
                <h2 className="text-xl">{`U${unitIndex + 1} - `}Unidad 1</h2>
              </button>
              <div className="flex space-x-2">
                <div className="ms-3 border-l-1"></div>
                <div>
                  {unit.topics.map((topic, topicIndex) => (
                    <div key={topicIndex} className="flex justify-between mt-3">
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          className="w-5 h-5 accent-indigo-600 border-gray-300 rounded-md transition duration-150 hover:scale-110"
                        />
                        <span className="text-gray-800 font-medium select-none">
                          {topic.title}
                        </span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
