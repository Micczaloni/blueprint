import { useState, useEffect } from "react";
import type { Project } from "../models/Project";
import Button from "./Button";

type ProjectCardProps = {
  project: Project;
  onDelete: (project: Project) => void;
  onProjectEdit: (project: Project) => void;
};

const statusBase = "inline-block px-2 py-1 rounded-full text-sm font-medium";

const statusClasses = {
  "To Do": "bg-gray-200 text-gray-700",
  "In Progress": "bg-yellow-200 text-yellow-800",
  Done: "bg-green-200 text-green-800",
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
    <div className="bg-white border rounded-md p-4">
      <h2 className="text-2xl font-bold mb-1">{project.title}</h2>

      <p className={`${statusBase} ${statusClasses[project.status]}`}>
        {project.status}
      </p>
      <p>
        Ostatnia zmiana: {formatRelativeDate(project.updatedAt, currentTime)}
      </p>
      {project.description && <p className="my-2">{project.description}</p>}

      <div className="flex gap-2">
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
