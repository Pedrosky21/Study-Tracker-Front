"use client"

import { useState } from "react";
import ConfirmModal from "../components/confirmModal";

export default function Test() {
  const [modalOpen, setModalOpen] = useState(false);

  const [selectedMateria, setSelectedMateria] = useState<number | null>(null);

  const handleDeleteClick = (id: number) => {
    setSelectedMateria(id);
    setModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedMateria !== null) {
      // Aquí llamas a tu API para eliminar la materia
      console.log("Eliminando materia con id:", selectedMateria);
    }
    setModalOpen(false);
    setSelectedMateria(null);
  };

  return (
    <>
        <button onClick={() => setModalOpen(true)}>Hola</button>
        <ConfirmModal title="¿Desea eliminar la materia?" isOpen={modalOpen} message="Esta acción no se podrá revertir" onConfirm={handleConfirmDelete} onCancel={() => setModalOpen(false)}></ConfirmModal>
    </>
  );
}
