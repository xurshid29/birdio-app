export type User = {
  id: number;
  email: string;
};

export type LoginInput = {
  email: string;
  password: string;
};

export type LoginResult = {
  access_token: string;
};

export type Project = {
  id: number;
  name: string;
};

export type Task = {
  id: number;
  name: string;
  description?: string;
  status: string;
  startDate?: string;
  startTime?: string;
  project?: Project;
};

export type ScheduledTasksArgs = {
  startDate: string;
  endDate: string;
  projectId?: Project["id"];
};

export type ScheduledTasksData = { scheduledTasks: Task[] };

export type UpdateTaskInput = {
  name?: string;
  description?: string;
  startDate?: Date;
  startTime?: Date;
  projectId?: number;
};
