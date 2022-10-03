import React, { useMemo } from "react";
import { useDroppable } from "@dnd-kit/core";
import dayjs, { Dayjs } from "dayjs";
import { Task } from "../../../types";
import Card from "./card";

type Props = { day: Dayjs; tasks: Task[] };

const Column: React.FC<Props> = ({ day, tasks }) => {
  const dayStr = day.format("YYYY-MM-DD");

  const { isOver, setNodeRef, over, active } = useDroppable({
    id: day.toISOString(),
    data: day,
  });

  const placeholderVisible = useMemo(() => {
    const task = active?.data.current as Task;
    return (
      over?.id === day.toISOString() &&
      dayjs(task.startDate).format("YYYYMMDD") !== day.format("YYYYMMDD")
    );
  }, [active, over, isOver]);

  return (
    <div
      key={dayStr}
      className="basis-[200px] grow-0 shrink-0 px-4 border-solid border-0 border-r border-blue-300"
    >
      <div
        className={`text-center ${
          dayStr === dayjs().format("YYYY-MM-DD") ? "underline font-bold" : ""
        }`}
      >
        {day.format("DD MMM")}
      </div>

      <div className="mt-10 space-y-4 h-full" ref={setNodeRef}>
        {placeholderVisible && (
          <div className="px-4 py-4 bg-violet-100 rounded-lg border-dotted border-indigo-200 text-center">
            Drop here
          </div>
        )}

        {tasks.map((task) => (
          <Card key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default Column;
