"use client"; // Necesario en Next.js si usas hooks y DnD

import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { ReactNode, CSSProperties } from "react";

interface DraggableProps {
  id: number; // Identificador único
  children: ReactNode; // Contenido dentro del botón
  style?: CSSProperties; // Estilos opcionales
}

export function Draggable({ id, children, style }: DraggableProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

  const draggableStyle: CSSProperties = {
    transform: CSS.Translate.toString(transform),
    ...style,
  };

  return (
    <div
      ref={setNodeRef}
      style={draggableStyle}
      {...listeners}
      {...attributes}
    >
      {children}
    </div>
  );
}
