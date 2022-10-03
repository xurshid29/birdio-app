import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { Task } from "../../../types";

type CardProps = { task: Task };

const TaskCard: React.FC<CardProps> = ({ task }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
    data: task,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      className="px-4 py-4 bg-sky-200 rounded-lg"
      style={style}
      {...listeners}
      {...attributes}
    >
      {task.name}
    </div>
  );
};

export default TaskCard;
