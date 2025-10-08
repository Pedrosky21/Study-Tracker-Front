"use client";

import { useEffect, useState } from "react";
import Nav from "./components/nav";
import Link from "next/link";
import { getSubjects } from "./services/subjectService";

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

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/profile", {
          credentials: "include", // importante para cookies de sesión
        });
        const data = await res.json();
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

    const fetchSubjects = async () => {
      try {
        const data = await getSubjects();
        console.log(data);
        setSubjects(data);
      } catch (error) {
        console.error("No se pudieron cargar las materias", error);
      }
    };

    fetchProfile();
    fetchSubjects();
  }, []);

  function capitalizeFirst(str: string | undefined): string {
    if (!str) return ""; // por si la cadena está vacía
    return str[0].toUpperCase() + str.slice(1);
  }

  if (loading)
    return (
      <>
        <p>Cargando</p>
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
              href="http://localhost:3001/login"
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
        <div className="flex">
          <div className="mt-5 px-8 w-72 space-y-6">
            <p className="text-5xl">
              Hola{" "}
              <span className="text-dark-green">
                {capitalizeFirst(user.nickname)}
              </span>
              !
            </p>
            <p className="text-xl text-gray-700">Qué estudiaste hoy?</p>
          </div>
        </div>
        <div className="flex justify-center mt-2">
          <div className="flex flex-col justify-between bg-gray-300 w-5/6 min-h-96 rounded-xl px-2 py-3 mb-5">
            <div className="w-full">
              {subjects && subjects.length > 0 ? (
                <ul>
                  {subjects.map((sub, index) => (
                    <li key={index} className="p-2 bg-white mb-3 rounded-xl">
                      <p className="text-xl">{sub.title}</p>
                      <p className="text-gray-700">{`${sub.units.length} unidades`}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-center py-4">No hay materias registradas.</p>
              )}
            </div>
            <div className="w-full flex justify-center">
              <Link
                href="/createSubject"
                className="bg-dark-green rounded-xl p-2 text-white"
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
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }
}
