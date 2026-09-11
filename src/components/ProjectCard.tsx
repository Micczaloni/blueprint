import { useState, useEffect } from "react";
import { statuses, type Project, type Status } from "../models/Project";
import Button from "./Button";

type ProjectCardProps = {
  project: Project;
  onSelect: (project: Project) => void;
  onDelete: (project: Project) => void;
  onProjectEdit: (project: Project) => void;
  onToggleFavorite: (project: Project) => void;
  onStatusChange: (projectId: string, newStatus: Status) => void;
};

const statusBase = "inline-block px-2 py-1 rounded-full text-sm font-medium";

const statusClasses = {
  "To Do": "bg-gray-200 text-gray-700",
  "In Progress": "bg-yellow-200 text-yellow-800",
  Done: "bg-green-200 text-green-800",
};

const priorityClasses = {
  Low: "bg-green-200 text-gray-700 p-2",
  Medium: "bg-yellow-200 text-black p-2",
  High: "bg-red-200 text-red-700 p-2",
};

const dateFormatter = new Intl.DateTimeFormat("pl-PL", {
  dateStyle: "medium",
  timeStyle: "short",
});

function formatRelativeDate(updatedAt: number, currentTime: number) {
  const difference = currentTime - updatedAt;

  if (difference < 60000) {
    return "Przed chwilą";
  }

  const minutes = Math.floor(difference / 60000);

  if (minutes < 60) {
    return `${minutes} min temu`;
  }

  const hours = Math.floor(difference / 3600000);

  if (hours < 24) {
    return `${hours} godz. temu`;
  }

  const days = Math.floor(difference / 86400000);

  if (days < 7) {
    return `${days} dni temu`;
  }

  return dateFormatter.format(updatedAt);
}

const ProjectCard = ({
  project,
  onDelete,
  onProjectEdit,
  onSelect,
  onToggleFavorite,
  onStatusChange,
}: ProjectCardProps) => {
  const [currentTime, setCurrentTime] = useState(Date.now());
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(Date.now());
    }, 60000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="relative bg-white border rounded-md p-4">
      {project.priority && (
        <p
          className={`absolute right-0 top-0 " + ${priorityClasses[project.priority]}`}
        >
          {project.priority}
        </p>
      )}
      <h2 className="text-2xl font-bold mb-1">{project.title}</h2>
      <div className="flex flex-col md:flex-row gap-2">
        <select
          value={project.status}
          onChange={(e) => onStatusChange(project.id, e.target.value as Status)}
          className={`max-w-[100px] ${statusBase} ${statusClasses[project.status]}`}
        >
          {statuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
        {project.status !== "Done" && (
          <Button
            onClick={() => onStatusChange(project.id, "Done")}
            type="button"
            variant="primary"
          >
            Oznacz jako ukończony
          </Button>
        )}
      </div>
      <p>
        Ostatnia zmiana: {formatRelativeDate(project.updatedAt, currentTime)}
      </p>
      {project.description && <p className="my-2">{project.description}</p>}

      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          variant="secondary"
          onClick={() => onToggleFavorite(project)}
        >
          {project.isFavorite ? "★ Ulubiony" : "☆ Dodaj do ulubionych"}
        </Button>
        <Button
          type="button"
          variant="primary"
          onClick={() => onSelect(project)}
        >
          Szczegóły
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={() => onProjectEdit(project)}
        >
          Edytuj
        </Button>

        <Button
          type="button"
          variant="danger"
          onClick={() => onDelete(project)}
        >
          Usuń
        </Button>
      </div>
    </div>
  );
};

export default ProjectCard;
