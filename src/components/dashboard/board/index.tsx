import React, { useCallback } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import dayjs, { Dayjs } from "dayjs";
import { InfiniteScrollRef } from "react-easy-infinite-scroll-hook";
import {
  ScheduledTasksArgs,
  ScheduledTasksData,
  Task,
  UpdateTaskInput,
} from "../../../types";
import styled from "styled-components";
import Column from "./column";
import { ObservableQuery } from "@apollo/client/core/ObservableQuery";
import { gql, useMutation } from "@apollo/client";

const ScrollWrapper = styled.div`
  height: 85vh;
  width: 100%;
  overflow-x: auto;
  display: flex;
  flex-direction: row;
  flex-flow: row;
`;

const UPDATE_TASK = gql`
  mutation updateTask($id: Int!, $input: UpdateTaskInput!) {
    updateTask(id: $id, input: $input) {
      id
      name
    }
  }
`;

type ListProps = {
  scrollRef: InfiniteScrollRef<HTMLDivElement>;
  days: Dayjs[];
  tasks: Task[];
  updateQuery: ObservableQuery<
    ScheduledTasksData,
    ScheduledTasksArgs
  >["updateQuery"];
};

const Board: React.FC<ListProps> = ({
  scrollRef,
  days,
  tasks,
  updateQuery,
}) => {
  const [changeStartDate] = useMutation<
    { updateTask: Task },
    { id: number; input: UpdateTaskInput }
  >(UPDATE_TASK);

  const handleDragEnd = useCallback(
    async (event: DragEndEvent) => {
      try {
        const date = event.over?.data.current as unknown as Date;
        const task = event.active.data.current as Task;

        updateQuery((previousQueryResult) => {
          return {
            scheduledTasks: previousQueryResult.scheduledTasks.map((t) =>
              t.id === task.id
                ? { ...t, startDate: dayjs(date).toISOString() }
                : t,
            ),
          } as ScheduledTasksData;
        });

        await changeStartDate({
          variables: {
            id: task.id,
            input: {
              startDate: date,
            },
          },
        });
      } catch (e) {
        alert("Something went wrong");
      }
    },
    [updateQuery],
  );

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
