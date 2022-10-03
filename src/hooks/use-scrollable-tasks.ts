import useInfiniteScroll, {
  InfiniteScrollRef,
  ScrollDirection,
} from "react-easy-infinite-scroll-hook";
import { Dayjs } from "dayjs";
import { useState } from "react";
import {
  DAY_COLUMN_WIDTH,
  DEFAULT_DAYS_OFFSET,
  generateMonthDays,
} from "../utils";
import { gql, useQuery } from "@apollo/client";
import { ScheduledTasksArgs, ScheduledTasksData } from "../types";
import { ObservableQuery } from "@apollo/client/core/ObservableQuery";

const ALL_TASK = gql`
  query scheduledTasks(
    $startDate: DateTime!
    $endDate: DateTime!
    $projectId: Int
  ) {
    scheduledTasks(
      startDate: $startDate
      endDate: $endDate
      projectId: $projectId
    ) {
      id
      name
      description
      status
      startTime
      startDate
      project {
        id
        name
      }
    }
  }
`;

const getRange = (days: Dayjs[], direction: ScrollDirection) => {
  const currentFirstDay = days[0];
  const currentLastDay = days[days.length - 1];

  return direction === "right"
    ? generateMonthDays(currentLastDay, 20)
    : generateMonthDays(currentFirstDay, -20).reverse();
};

const useScrollableTasks = (
  defaultDays: Dayjs[],
  projectId?: number,
): {
  scrollRef: InfiniteScrollRef<HTMLDivElement>;
  days: Dayjs[];
  data: ScheduledTasksData | undefined;
  updateQuery: ObservableQuery<
    ScheduledTasksData,
    ScheduledTasksArgs
  >["updateQuery"];
} => {
  const [days, setDays] = useState<Dayjs[]>(defaultDays);
  const { data, fetchMore, updateQuery } = useQuery<
    ScheduledTasksData,
    ScheduledTasksArgs
  >(ALL_TASK, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "network-only",
    variables: {
      startDate: defaultDays[0].format("YYYY-MM-DD 00:00:00"),
      endDate: defaultDays[defaultDays.length - 1].format(
        "YYYY-MM-DD 23:59:59",
      ),
      projectId,
    } as ScheduledTasksArgs,
  });

  const scrollRef = useInfiniteScroll<HTMLDivElement>({
    next: async (direction) => {
      const range = getRange(days, direction);

      setDays((prevDays) =>
        direction === "right" ? prevDays.concat(range) : range.concat(prevDays),
      );

      await fetchMore({
        variables: {
          startDate: range[0].format("YYYY-MM-DD 00:00:00"),
          endDate: range[range.length - 1].format("YYYY-MM-DD 23:59:59"),
          projectId,
        } as ScheduledTasksArgs,
      });
    },
    initialScroll: {
      left: (DEFAULT_DAYS_OFFSET - 4) * DAY_COLUMN_WIDTH,
    },
    columnCount: days.length,
    scrollThreshold: 0,
    hasMore: {
      left: true,
      right: true,
    },
  });

  return {
    scrollRef,
    days,
    data,
    updateQuery,
  };
};

export default useScrollableTasks;
