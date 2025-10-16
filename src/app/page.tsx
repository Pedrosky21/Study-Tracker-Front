"use client";

import { useEffect, useState } from "react";
import Nav from "./components/nav";
import Link from "next/link";
import { getProgress, getSubjects } from "./services/subjectService";
import DoughnutChart from "./components/doughnut";
import { getProfile } from "./services/authService";
import Loading from "./components/loading";
import Image from "next/image";

interface User {
  nickname?: string;
  name?: string;
  email?: string;
}

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

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [subjects, setSubjects] = useState<Subject[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [progresses, setProgresses] = useState<{ [key: number]: number }>({});

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        if (data.loggedIn) {
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error(err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const data = await getSubjects();
        setSubjects(data);
      } catch (error) {
        console.error("No se pudieron cargar las materias", error);
      }
    };

    if (user) {
      fetchSubjects();
    }
  }, [user]);

  useEffect(() => {
    const loadProgresses = async () => {
      if (!subjects) return;
      const newProgresses: { [key: number]: number } = {};
      for (const sub of subjects) {
        const res = await getProgress(sub.id);
        let count = 0;
        for (const unit of sub.units) {
          unit.topics.forEach(() => (count += 1));
        }
        newProgresses[sub.id] = Math.round((res / count) * 100) || 0;
      }
      setProgresses(newProgresses);
    };
    loadProgresses();
  }, [subjects]);

  function capitalizeFirst(str: string | undefined): string {
    if (!str) return ""; // por si la cadena está vacía
    return str[0].toUpperCase() + str.slice(1);
  }

  if (loading)
    return (
      <>
        <Loading></Loading>
      </>
    );

  if (!user) {
    return (
      <>
        <nav>
          <div className="flex space-x-3 justify-end py-3 px-4">
            <button
              className="text-center rounded-xl outline-2 outline-dark-green py-3 w-24"
              onClick={() =>
                (window.location.href =
                  "http://localhost:3001/login?returnTo=http://localhost:3000")
              }
            >
              Login
            </button>
            <a
              href="http://localhost:3001/login?screen_hint=signup"
              className="text-center rounded-xl bg-dark-green text-white py-3 w-24"
            >
              Registrate
            </a>
          </div>
        </nav>
        <div className="flex justify-center">
          <div className="mt-12 px-8 w-72 space-y-6">
            <p className="text-5xl">
              Registrá tu <span className="text-dark-green">estudio</span>
            </p>
            <p className="text-3xl text-gray-700">Organizate, sin tiempos</p>
            <button className="bg-dark-green rounded-2xl text-white text-2xl py-3 px-5 w-50">
              Empezá ya
            </button>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <Nav></Nav>
        <div className="md:flex md:mt-8">
          <div className="flex md:px-3 md:w-4/6">
            <div className="mt-5 px-8 w-72 space-y-6 md:w-full">
              <div className="flex flex-col md:space-y-10">
                <p className="text-5xl">
                  Hola{" "}
                  <span className="text-dark-green">
                    {capitalizeFirst(user.nickname)}
                  </span>
                  !
                </p>
                <div className="hidden md:block">
                  <Image
                    src="/working.svg"
                    alt="working-image"
                    width={500}
                    height={500}
                  />
                </div>
              </div>
              <p className="text-xl text-gray-700 md:hidden">
                Qué estudiaste hoy?
              </p>
            </div>
          </div>
          <div className="relative flex justify-center mt-2 md:px-30 md:w-full md:justify-end md:h-full md:block">
            <p className="hidden text-xl text-gray-700 md:block mt-2">
              Qué estudiaste hoy?
            </p>
            <div className="flex flex-col justify-between bg-gray-300 w-5/6 rounded-xl px-2 py-3 mb-5 h-96 md:h-full md:w-full md:mt-5 md:p-4 overflow-auto">
              <div className="w-full h-full mb-10">
                {subjects && subjects.length > 0 ? (
                  <ul className="md:grid md:grid-cols-2 md:gap-4">
                    {subjects.map((sub, index) => (
                      <li key={index}>
                        <Link
                          href={`/subject/${sub.id}`}
                          className="flex justify-between p-2 bg-white mb-3 rounded-xl md:hover:scale-105 transition-all duration-300 ease-in-out md:py-3 md:mb-0"
                        >
                          <div>
                            <p className="text-xl">{sub.title}</p>
                            <p className="text-gray-700">{`${sub.units.length} unidades`}</p>
                          </div>
                          <div>
                            <DoughnutChart
                              progress={progresses[sub.id] || 0}
                            ></DoughnutChart>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-center py-4">
                    No hay materias registradas.
                  </p>
                )}
              </div>
              <div className="w-full flex justify-center md:justify-end">
                <Link
                  href="/subject/create"
                  className="bg-dark-green flex items-center space-x-2 absolute bottom-8 md:bottom-auto md:top-0 rounded-xl p-2 text-white border-1 border-black hover:scale-110 active:scale-110 transition-all duration-300 ease-in-out"
                >
                  <p className="hidden md:block">Añadir materia</p>
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
                </Link>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
