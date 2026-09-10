import type { Project, ProjectFilter, SortOption } from "../models/Project";

export function matchesStatusFilter(
  project: Project,
  statusFilter: ProjectFilter,
) {
  if (statusFilter === "All") {
    return true;
  }

  if (statusFilter === "Ulubione") {
    return project.isFavorite;
  }

  return project.status === statusFilter;
}

export function compareProjects(
  a: Project,
  b: Project,
  sortOption: SortOption,
) {
  switch (sortOption) {
    case "recentlyUpdated":
      return b.updatedAt - a.updatedAt;
    case "oldestUpdated":
      return a.updatedAt - b.updatedAt;
    case "recentlyCreated":
      return b.createdAt - a.createdAt;
    case "oldestCreated":
      return a.createdAt - b.createdAt;
    case "titleAsc":
      return a.title.localeCompare(b.title);
    case "titleDesc":
      return b.title.localeCompare(a.title);
    case "favoritesFirst":
      return Number(b.isFavorite) - Number(a.isFavorite);
    default:
      return 0;
  }
}
