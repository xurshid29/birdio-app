import React from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import dayjs, { Dayjs } from "dayjs";
import { InfiniteScrollRef } from "react-easy-infinite-scroll-hook";
import { Task } from "../../../types";
import styled from "styled-components";
import Column from "./column";

const ScrollWrapper = styled.div`
  height: 85vh;
  width: 100%;
  overflow-x: auto;
  display: flex;
  flex-direction: row;
  flex-flow: row;
`;

type ListProps = {
  scrollRef: InfiniteScrollRef<HTMLDivElement>;
  days: Dayjs[];
  tasks: Task[];
};

const Board: React.FC<ListProps> = ({ scrollRef, days, tasks }) => {
  const handleDragEnd = (event: DragEndEvent) => {
    console.log(event);
  };

  return (
    <ScrollWrapper ref={scrollRef}>
      <DndContext onDragEnd={handleDragEnd}>
        {days.map((day) => (
          <Column
            key={day.format("YYYY-MM-DD")}
            day={day}
            tasks={tasks.filter(
              (task) =>
                dayjs(task.startDate).format("YYYY-MM-DD") ===
                day.format("YYYY-MM-DD"),
            )}
          />
        ))}
      </DndContext>
    </ScrollWrapper>
  );
};

export default Board;
