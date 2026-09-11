import { statuses, priorities } from "../models/Project";
import type { Project, Status, Priority } from "../models/Project";

export function isProject(value: unknown): value is Project {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  if (!("id" in value) || typeof value.id !== "string") {
    return false;
  }

  if (!("title" in value) || typeof value.title !== "string") {
    return false;
  }

  if (!("description" in value) || typeof value.description !== "string") {
    return false;
  }

  if (
    !("status" in value) ||
    typeof value.status !== "string" ||
    !statuses.includes(value.status as Status)
  ) {
    return false;
  }

  if (!("createdAt" in value) || typeof value.createdAt !== "number") {
    return false;
  }

  if (!("updatedAt" in value) || typeof value.updatedAt !== "number") {
    return false;
  }

  if (!("isFavorite" in value) || typeof value.isFavorite !== "boolean") {
    return false;
  }

  if (
    !("priority" in value) ||
    typeof value.priority !== "string" ||
    !priorities.includes(value.priority as Priority)
  ) {
    return false;
  }

  return true;
}

export function migrateProject(value: unknown): unknown {
  if (typeof value !== "object" || value === null) {
    return value;
  }

  if (!("priority" in value)) {
    return {
      ...value,
      priority: "Low",
    };
  }

  return value;
}
