import type { Project } from "../models/Project";
import Button from "./Button";
import Modal from "./Modal";

type ProjectDetailsModalProps = {
  project: Project;
  onClose: () => void;
};

const dateFormatter = new Intl.DateTimeFormat("pl-PL", {
  dateStyle: "medium",
  timeStyle: "short",
});

function ProjectDetailsModal({ project, onClose }: ProjectDetailsModalProps) {
  return (
    <Modal onClose={onClose}>
      <div className="flex flex-col gap-4">
        <div>
          <h2 className="text-2xl font-bold">{project.title}</h2>
          <p>Status: {project.status}</p>
        </div>

        {project.description && (
          <div>
            <h3 className="font-semibold">Opis</h3>
            <p>{project.description}</p>
          </div>
        )}

        <div>
          <p>Utworzono: {dateFormatter.format(project.createdAt)}</p>
          <p>Ostatnia zmiana: {dateFormatter.format(project.updatedAt)}</p>
        </div>

        <div className="flex justify-end">
          <Button type="button" variant="secondary" onClick={onClose}>
            Zamknij
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default ProjectDetailsModal;
