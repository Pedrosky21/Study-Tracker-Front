"use client";

import { useEffect, useState } from "react";
import SubjectForm from "../../components/subjectForm";
import { useParams } from "next/navigation";
import { getSubjectByID } from "@/app/services/subjectService";
import Loading from "@/app/components/loading";

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

export default function EditSubject() {
  const params = useParams<{ id: string }>();
  const subjectID = parseInt(params.id, 10);

  const [subject, setSubject] = useState<Subject | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!subjectID) return;

    const fetchSubject = async () => {
      try {
        const data = await getSubjectByID(subjectID);
        setSubject(data);
      } catch (error) {
        console.error("No se pudo cargar el subject", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubject();
  }, [subjectID]);

  if (loading) return <Loading></Loading>;

  return <SubjectForm subject={subject}></SubjectForm>;
}
