import { describe, it, expect } from "vitest";
import { migrateProject } from "./projectValidation";

describe("migrateProject", () => {
  it("adds Low priority to old project", () => {
    const oldProject = {
      id: "1",
      title: "Test",
      status: "Done",
      description: "Opis",
      createdAt: 100,
      updatedAt: 200,
      isFavorite: true,
    };

    const migratedProject = migrateProject(oldProject);

    expect(migratedProject).toEqual({
      ...oldProject,
      priority: "Low",
    });
  });
});

it("keeps existing priority", () => {
  const project = {
    id: "1",
    title: "Test",
    status: "Done",
    description: "Opis",
    createdAt: 100,
    updatedAt: 200,
    isFavorite: true,
    priority: "High",
  };

  const migratedProject = migrateProject(project);

  expect(migratedProject).toEqual(project);
});
