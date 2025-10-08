"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type Topic = {
  id: number;
  name: string;
};

type SortableTopicProps = {
  topic: Topic;
  unitIndex: number;
  topicIndex: number;
  changeTopicName: (unitIndex: number, topicIndex: number, value: string) => void;
  deleteTopic: (unitIndex: number, topicIndex: number) => void;
};

export default function SortableTopic({
  topic,
  unitIndex,
  topicIndex,
  changeTopicName,
  deleteTopic,
}: SortableTopicProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: topic.id.toString(),
  });

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
      className="ml-8 mt-4"
    >
      <div className="flex space-x-1 items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6 cursor-move"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
        <input
          type="text"
          value={topic.name}
          placeholder={`Tema ${topicIndex + 1}`}
          onChange={(e) => changeTopicName(unitIndex, topicIndex, e.target.value)}
          className="focus:outline-1 focus:outline-dark-green rounded-xl px-2 flex-1"
        />
        <button type="button" onClick={() => deleteTopic(unitIndex, topicIndex)}>
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
  );
}
