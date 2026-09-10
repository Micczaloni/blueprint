export interface Project {
  id: string;
  title: string;
  status: Status;
  description: string;
  createdAt: number;
  updatedAt: number;
  isFavorite: boolean;
}

export type SortOption =
  | "recentlyUpdated"
  | "oldestUpdated"
  | "recentlyCreated"
  | "oldestCreated"
  | "titleAsc"
  | "titleDesc"
  | "favoritesFirst";

export type Status = "To Do" | "In Progress" | "Done";
export type ProjectFilter = "All" | Status | "Ulubione";

export const statuses: Status[] = ["To Do", "In Progress", "Done"];
