import { useDroppable } from "@dnd-kit/core";
import { ReactNode } from "react";

interface DroppableProps {
  id: number;
  children: ReactNode; // Esto indica que puede recibir cualquier JSX
}

export default function Droppable({ id, children }:DroppableProps) {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div ref={setNodeRef}>
      {children}
    </div>
  );
}