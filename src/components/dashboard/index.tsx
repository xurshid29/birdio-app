import React from "react";
import { defaultDayRange } from "../../utils";
import Board from "./board";
import useScrollableTasks from "../../hooks/use-scrollable-tasks";

const Dashboard: React.FC = () => {
  const { scrollRef, data, days, updateQuery } =
    useScrollableTasks(defaultDayRange);
  return (
    <Board
      scrollRef={scrollRef}
      days={days}
      tasks={data?.scheduledTasks || []}
      updateQuery={updateQuery}
    />
  );
};

export default Dashboard;
