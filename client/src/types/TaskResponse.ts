type TaskUrlResponse = {
  id: number | null;
  url: string;
};

type TaskResponse = {
  id: number;
  description: string;
  done: boolean;
  highPriority: boolean;
  dueDate: string;
  lastUpdate: string;
  urls: TaskUrlResponse[];
};

export type { TaskUrlResponse, TaskResponse };
