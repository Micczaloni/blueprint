import { Project } from "../models/Project";

export function updateProject(
  projects: Project[],
  projectId: string,
  updates: Partial<Project>,
): Project[] {
  return projects.map((project) =>
    project.id === projectId
      ? {
          ...project,
          ...updates,
          updatedAt: Date.now(),
        }
      : project,
  );
}
