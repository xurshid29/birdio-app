import dayjs, { Dayjs } from "dayjs";

export const DAY_COLUMN_WIDTH = 200;
export const DEFAULT_DAYS_OFFSET = 10;

export const generateMonthDays = (
  startDay: Dayjs,
  addOrSubtractCount: number,
) => {
  if (addOrSubtractCount < 0) {
    return Array.from({ length: Math.abs(addOrSubtractCount) }, (v, i) =>
      startDay.subtract(i + 1, "day"),
    );
  }

  return Array.from({ length: addOrSubtractCount }, (v, i) =>
    startDay.add(i + 1, "day"),
  );
};

export const defaultDayRange = generateMonthDays(
  dayjs().subtract(DEFAULT_DAYS_OFFSET, "days"),
  20,
);
