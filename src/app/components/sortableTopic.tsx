"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface SortableTopicProps {
  id: string;
  name: string;
  onChange: (value: string) => void;
  onDelete: () => void;
}

export default function SortableTopic({
  id,
  name,
  onChange,
  onDelete,
}: SortableTopicProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="flex space-x-2 items-center bg-white p-2 rounded-lg shadow-sm cursor-grab"
    >
      {/* Ícono de arrastre */}
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

      {/* Input editable */}
      <input
        type="text"
        value={name}
        onChange={(e) => onChange(e.target.value)}
        className="border rounded-lg p-1 flex-1 focus:outline-dark-green"
      />

      {/* Botón eliminar */}
      <button type="button" onClick={onDelete}>
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
  );
}
