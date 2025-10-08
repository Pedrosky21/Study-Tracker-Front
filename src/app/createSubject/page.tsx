"use client";

import Nav from "../components/nav";
import axios from "axios";
import { useState } from "react";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import SortableTopic from "../components/sortableTopic";

type Topic = {
  id: number;
  name: string;
};

type Unit = {
  id: number;
  name: string;
  topics: Topic[];
};

export default function SubjectForm() {
  const [subjectName, setSubjectName] = useState("");
  const [subjectDesc, setSubjectDesc] = useState("");
  const [units, setUnits] = useState<Unit[]>([
    { id: 0, name: "", topics: [{ id: 0, name: "" }] },
  ]);
  const [unitCounter, setUnitCounter] = useState(1);
  const [topicCounter, setTopicCounter] = useState(1);

  const addUnit = (unitName: string) => {
    setUnits([...units, { id: unitCounter, name: unitName, topics: [] }]);
    setUnitCounter(unitCounter + 1);
  };

  const changeUnitName = (unitIndex: number, value: string) => {
    const newUnits = [...units];
    newUnits[unitIndex].name = value;
    setUnits(newUnits);
  };

  const deleteUnit = (index: number) => {
    const newUnits = [...units];
    newUnits.splice(index, 1);
    setUnits(newUnits);
  };

  const addTopic = (unitIndex: number, topicName: string) => {
    const newUnits = [...units];
    newUnits[unitIndex].topics.push({ id: topicCounter, name: topicName });
    setUnits(newUnits);
    setTopicCounter(topicCounter + 1);
  };

  const changeTopicName = (
    unitIndex: number,
    topicIndex: number,
    value: string
  ) => {
    const newUnits = [...units];
    newUnits[unitIndex].topics[topicIndex].name = value;
    setUnits(newUnits);
  };

  const deleteTopic = (unitIndex: number, topicIndex: number) => {
    const newUnits = [...units];
    newUnits[unitIndex].topics.splice(topicIndex, 1);
    setUnits(newUnits);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3001/subjects/create", {
        subjectName,
        subjectDesc,
      });

      console.log("Materia guardada:", res.data);
      alert("Materia creada correctamente!");
    } catch (error) {
      console.error("Error al guardar materia:", error);
      alert("Hubo un error al guardar la materia");
    }
  };

  return (
    <>
      <Nav></Nav>
      <div className="w-full pt-5">
        <form onSubmit={handleSubmit} className="p-4">
          <label className="block text-dark-green text-xl font-bold">
            Materia
          </label>
          <input
            placeholder="Nombre"
            className="outline-2 outline-gray-400 focus:outline-dark-green rounded-xl p-1.5 w-full"
            type="text"
            onChange={(e) => setSubjectName(e.target.value)}
          />
          <label className="hidden text-dark-green text-xl font-bold">
            Descripcion
          </label>
          <input
            placeholder="Descripcion"
            className="mt-2 outline-2 outline-gray-400 focus:outline-dark-green rounded-xl p-1.5 w-full h-20"
            type="text"
            onChange={(e) => setSubjectDesc(e.target.value)}
          />
          <div className="mt-2">
            <h2 className="text-xl">
              Agregá tus{" "}
              <span className="text-dark-green font-bold">unidades</span>
            </h2>
            {/** Por unidad */}
            {units.map((unit, unitIndex) => (
              <div key={unit.id} className="mb-2 border-t-1 py-2">
                <div className="flex justify-end mb-2">
                  <button type="button" onClick={() => deleteUnit(unitIndex)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-6 text-red-800"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                  </button>
                </div>
                <div className="flex space-x-2">
                  <div className="flex flex-col justify-between py-2">
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
                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                      />
                    </svg>
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
                        d="m4.5 15.75 7.5-7.5 7.5 7.5"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    className="outline-2 outline-gray-400 focus:outline-dark-green rounded-xl p-1.5 w-full h-18"
                    placeholder={`Unidad ${unitIndex + 1}`}
                    onChange={(e) => changeUnitName(unitIndex, e.target.value)}
                  />
                </div>
                {/** Por temas de la unidad */}
                {unit.topics.map((topic, topicIndex) => (
                  <div key={topic.id} className="ml-8 mt-4">
                    <div className="flex space-x-1">
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
                          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                        />
                      </svg>
                      <input
                        type="text"
                        placeholder={`Tema ${topicIndex + 1}`}
                        className="focus:outline-1 focus:outline-dark-green rounded-xl px-2"
                        onChange={(e) =>
                          changeTopicName(unitIndex, topicIndex, e.target.value)
                        }
                      />
                      <button
                        type="button"
                        onClick={(e) => deleteTopic(unitIndex, topicIndex)}
                      >
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
                            d="M6 18 18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={(e) =>
                    addTopic(
                      unitIndex,
                      `Tema ${units[unitIndex].topics.length + 1}`
                    )
                  }
                  className="ms-8 mt-2 rounded-xl outline-1 p-1"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
          <div className="flex justify-end text-white">
            <button
              type="button"
              className="flex space-x-3 items-center text-center bg-dark-green rounded-xl py-2 px-2"
              onClick={() => addUnit(`Unidad ${units.length + 1}`)}
            >
              <p>Agregar Unidad</p>
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
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </button>
          </div>
          <div className="mt-8 flex justify-center w-full">
            <button
              type="submit"
              className="flex justify-center space-x-2 bg-dark-green p-2 rounded-xl text-white w-5/6"
            >
              <p>Guardar Materia</p>
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
                  d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
