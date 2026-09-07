export interface Project {
  id: string;
  title: string;
  status: Status;
  description: string;
  createdAt: number;
}

export type Status = "To Do" | "In Progress" | "Done";
