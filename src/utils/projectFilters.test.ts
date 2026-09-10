import { describe, it, expect } from "vitest";
import { isProject } from "./projectValidation";

describe("isProject", () => {
  it("returns true for valid project", () => {
    const project = {
      id: "1",
      title: "Test",
      status: "Done",
      description: "Opis",
      createdAt: 100,
      updatedAt: 200,
      isFavorite: true,
    };

    expect(isProject(project)).toBe(true);
  });

  it("returns false when id is not a string", () => {
    const project = {
      id: 1,
      title: "Test",
      status: "Done",
      description: "Opis",
      createdAt: 100,
      updatedAt: 200,
      isFavorite: true,
    };

    expect(isProject(project)).toBe(false);
  });

  it("returns false when status is invalid", () => {
    const project = {
      id: "1",
      title: "Test",
      status: "Banana",
      description: "Opis",
      createdAt: 100,
      updatedAt: 200,
      isFavorite: true,
    };

    expect(isProject(project)).toBe(false);
  });
});
