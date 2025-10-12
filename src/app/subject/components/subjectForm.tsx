"use client";

import { createSubject, updateSubject } from "@/app/services/subjectService";
import Nav from "../../components/nav";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

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

interface SubjectFormProps {
  subject?: Subject | null;
}

export default function SubjectForm({ subject }: SubjectFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState(subject?.title || "");
  const [description, setDescription] = useState(subject?.description || "");
  const [units, setUnits] = useState<Unit[]>([
    { id: 1, title: "", topics: [{ id: 1, title: "" }] },
  ]);
  const [unitCounter, setUnitCounter] = useState(2);
  const [topicCounter, setTopicCounter] = useState(2);
  const [sendingForm, setSendingForm] = useState(false);

  useEffect(() => {
    if (subject?.units) {
      setUnits(subject.units);
    }
  }, [subject]);

  const addUnit = (unitName: string) => {
    setUnits([...units, { id: unitCounter, title: unitName, topics: [] }]);
    setUnitCounter(unitCounter + 1);
  };

  const changeUnitName = (unitIndex: number, value: string) => {
    const newUnits = [...units];
    newUnits[unitIndex].title = value;
    setUnits(newUnits);
  };

  const deleteUnit = (index: number) => {
    const newUnits = [...units];
    newUnits.splice(index, 1);
    setUnits(newUnits);
  };

  const addTopic = (unitIndex: number, topicName: string) => {
    const newUnits = [...units];
    newUnits[unitIndex].topics.push({ id: topicCounter, title: topicName });
    setUnits(newUnits);
    setTopicCounter(topicCounter + 1);
  };

  const changeTopicName = (
    unitIndex: number,
    topicIndex: number,
    value: string
  ) => {
    const newUnits = [...units];
    newUnits[unitIndex].topics[topicIndex].title = value;
    setUnits(newUnits);
  };

  const deleteTopic = (unitIndex: number, topicIndex: number) => {
    const newUnits = [...units];
    newUnits[unitIndex].topics.splice(topicIndex, 1);
    setUnits(newUnits);
  };

  const isFormValid = (): boolean => {
    if (!title.trim()) return false;
    if (units.length === 0) return false;

    for (const unit of units) {
      if (!unit.title.trim()) return false;
      if (unit.topics.length > 0) {
        for (const topic of unit.topics) {
          if (!topic.title.trim()) return false;
        }
      }
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const subjectData = {
      title: title,
      description: description,
      units: units.map((unit, unitIndex) => {
        return {
          id: unit.id,
          title: unit.title,
          order: unitIndex,
          topics: unit.topics.map((topic, topicIndex) => {
            return {
              id: topic.id,
              title: topic.title,
              order: topicIndex,
            };
          }),
        };
      }),
    };

    try {
      setSendingForm(true);
      if (subject?.id) {
        await updateSubject(subject?.id, subjectData);
        toast.success("Materia editada!");
        setTimeout(() => {
          router.push("/");
        }, 2000);
      } else {
        await createSubject(subjectData);
        toast.success("Materia creada!");
        setTimeout(() => {
          router.push("/");
        }, 2000);
      }
    } catch (error) {
      setSendingForm(false);
      console.error("Error al guardar el Subject", error);
      toast.error("No pudo guardarse la materia");
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
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <label className="hidden text-dark-green text-xl font-bold">
            Descripcion
          </label>
          <input
            placeholder="Descripcion"
            className="mt-2 outline-2 outline-gray-400 focus:outline-dark-green rounded-xl p-1.5 w-full h-20"
            type="text"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
          <div className="mt-2">
            <h2 className="text-xl">
              Agregá tus{" "}
              <span className="text-dark-green font-bold">unidades</span>
            </h2>
            {/** Por unidad */}
            {units.map((unit, unitIndex) => (
              <div key={unitIndex} className="mb-2 border-t-1 py-2">
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
                    value={unit.title}
                  />
                </div>
                {/** Por temas de la unidad */}
                {unit.topics.map((topic, topicIndex) => (
                  <div key={topicIndex} className="ml-8 mt-4">
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
                        value={topic.title}
                      />
                      <button
                        type="button"
                        onClick={() => deleteTopic(unitIndex, topicIndex)}
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
                  onClick={() =>
                    addTopic(unitIndex, `Tema ${unit.topics.length + 1}`)
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
            {!sendingForm ? (
              <button
                type="submit"
                className={`flex justify-center space-x-2 p-2 rounded-xl text-white w-5/6 ${
                  isFormValid()
                    ? "bg-dark-green hover:bg-dark-green"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
                disabled={!isFormValid()}
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
            ) : (
              <button
                type="submit"
                className="flex justify-center space-x-2 p-2 rounded-xl text-white w-5/6 bg-gray-400 cursor-not-allowed"
                disabled={true}
              >
                <p>Guardando materia ...</p>
              </button>
            )}
          </div>
        </form>
      </div>
      <Toaster position="bottom-right"></Toaster>
    </>
  );
}
