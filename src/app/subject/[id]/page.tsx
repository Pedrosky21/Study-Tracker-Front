"use client";

import { useEffect, useState } from "react";
import Nav from "../../components/nav";
import { deleteSubject, getSubjectByID } from "../../services/subjectService";
import { useRouter, useParams } from "next/navigation";
import { updateTopicProgress } from "@/app/services/topicService";
import Link from "next/link";
import ConfirmModal from "@/app/components/confirmModal";

interface TopicProgress {
  id: number;
  completed_date: Date | null;
  topicID: number;
  userID: number;
}

interface Topic {
  id: number;
  title: string;
  topicProgress: TopicProgress;
}

interface Unit {
  id: number;
  title: string;
  name: string;
  topics: Topic[];
}

interface Subject {
  id: number;
  title: string;
  description?: string;
  units: Unit[];
}

export default function SubjectPage() {
  const router = useRouter();
  // materia
  const [subject, setSubject] = useState<Subject | null>(null);

  // para la ruta (id)
  const params = useParams<{ id: string }>(); // Desenvuelve la promesa
  const subjectID = parseInt(params.id, 10);

  // para manejar estado abierto/cerrado de las unidades
  const [openUnits, setOpenUnits] = useState<number[]>([]);

  // para ver si los temas estan marcados
  const [checkedTopics, setCheckedTopics] = useState<{
    [key: number]: boolean;
  }>({});

  // para modal de confirmacion | eliminacion de materia
  const [modalOpen, setModalOpen] = useState(false);
  const handleConfirmDelete = () => {
    if (subjectID !== null) {
      deleteSubject(subjectID);
      router.push("/")
    }
    setModalOpen(false);
  };

  // carga de subject
  useEffect(() => {
    const fetchSubjects = async () => {
      if (!subjectID) return;
      try {
        const data = await getSubjectByID(subjectID);
        setSubject(data);
      } catch (error) {
        console.error("No se pudieron cargar las materias", error);
      }
    };

    fetchSubjects();
  }, [subjectID]);

  // checkboxes cuando subject se cargue
  useEffect(() => {
    if (!subject) return;

    const initialChecked: { [key: number]: boolean } = {};
    subject.units.forEach((unit) => {
      unit.topics.forEach((topic) => {
        initialChecked[topic.id] = !!topic.topicProgress?.completed_date; // true si tiene progress
      });
    });

    setCheckedTopics(initialChecked);
  }, [subject]);

  const toggleUnit = (unitId: number) => {
    setOpenUnits(
      (prev) =>
        prev.includes(unitId)
          ? prev.filter((id) => id !== unitId) // cerrar
          : [...prev, unitId] // abrir
    );
  };

  const handleCheckboxChange = async (topicId: number) => {
    setCheckedTopics((prev) => {
      const newValue = !prev[topicId];
      updateTopicProgress(topicId, newValue ? new Date() : null).catch(
        (error) => {
          console.error("Error al actualizar progreso:", error);
          // revertir el cambio si falla
          setCheckedTopics((p) => ({ ...p, [topicId]: prev[topicId] }));
        }
      );
      return { ...prev, [topicId]: newValue };
    });
  };

  return (
    <>
      <Nav></Nav>
      <div className="p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-dark-green text-2xl font-bold">
            {subject?.title}
          </h1>
          <div className="flex items-center space-x-5">
            <Link className="" href={`/subject/edit/${subjectID}`}>
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
            </Link>
            <button onClick={() => setModalOpen(true)}>
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
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="">
          {subject &&
            subject.units?.map((unit, unitIndex) => {
              const allTopicsChecked = unit.topics.every(
                (topic) => checkedTopics[topic.id]
              );
              return (
                <div
                  key={unitIndex}
                  className={`rounded-xl mt-5 p-2 ${
                    allTopicsChecked
                      ? unit.topics.length > 0
                        ? "bg-dark-green text-white"
                        : "bg-gray-300"
                      : "outline-2 outline-dark-green"
                  }`}
                >
                  <button
                    className="flex items-center space-x-2 w-full"
                    onClick={() => toggleUnit(unit.id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className={`size-6 transition-transform ${
                        openUnits.includes(unit.id) ? "rotate-180" : ""
                      }`}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m19.5 8.25-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                    <h2 className="text-xl">{`U${unitIndex + 1} - ${
                      unit.title
                    }`}</h2>
                  </button>
                  {openUnits.includes(unit.id) && (
                    <div className="flex space-x-2">
                      <div className="ms-3 border-l-1"></div>
                      <div>
                        {unit.topics.length > 0 ? (
                          unit.topics.map((topic, topicIndex) => (
                            <div
                              key={topicIndex}
                              className="flex justify-between mt-3"
                            >
                              <label className="flex items-center space-x-2 cursor-pointer">
                                <input
                                  type="checkbox"
                                  className="w-5 h-5 accent-indigo-600 border-gray-300 rounded-md"
                                  checked={!!checkedTopics[topic.id]}
                                  onChange={() =>
                                    handleCheckboxChange(topic.id)
                                  }
                                />
                                <span className="font-medium select-none">
                                  {topic.title}
                                </span>
                              </label>
                            </div>
                          ))
                        ) : (
                          <p className="italic">No hay temas disponibles</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      </div>

      {/* Modal */}
      <ConfirmModal
        title="¿Desea eliminar la materia?"
        isOpen={modalOpen}
        message="Esta acción no se podrá revertir"
        onConfirm={handleConfirmDelete}
        onCancel={() => setModalOpen(false)}
      ></ConfirmModal>
    </>
  );
}
