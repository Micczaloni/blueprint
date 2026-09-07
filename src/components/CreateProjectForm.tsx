import { useState, useEffect, type ChangeEvent } from "react";
import type { Project, Status } from "../models/Project";
import Button from "./Button";

type CreateProjectFormProps = {
  onSubmit: (project: Project) => void;
  onClose: () => void;
  project?: Project;
};

function CreateProjectForm({
  onSubmit,
  onClose,
  project,
}: CreateProjectFormProps) {
  const [titleForm, setTitleForm] = useState(project?.title ?? "");
  const [statusForm, setStatusForm] = useState<Status>(
    project?.status ?? "To Do",
  );
  const [descriptionForm, setDescriptionForm] = useState(
    project?.description ?? "",
  );
  const [errors, setErrors] = useState({
    title: "",
  });

  useEffect(() => {
    if (project) {
      setTitleForm(project.title);
      setStatusForm(project.status);
      setDescriptionForm(project.description);
    }
  }, [project]);

  function validateTitle(title: string) {
    if (title.trim() === "") {
      return "Uzupełnij tytuł.";
    }

    if (title.trim().length < 3) {
      return "Tytuł musi mieć co najmniej 3 znaki.";
    }

    return "";
  }

  function handleTitleChange(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setTitleForm(value);

    const titleError = validateTitle(value);

    if (titleError) {
      setErrors((previousErrors) => ({
        ...previousErrors,
        title: titleError,
      }));
      return;
    }

    setErrors((previousErrors) => ({
      ...previousErrors,
      title: "",
    }));
  }

  function handleSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    setStatusForm(event.target.value as Status);
  }

  function handleDescriptionChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setDescriptionForm(event.target.value);
  }

  function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();

    const titleError = validateTitle(titleForm);

    if (titleError) {
      setErrors((previousErrors) => ({
        ...previousErrors,
        title: titleError,
      }));
      return;
    }

    const updatedProject: Project = {
      id: project?.id ?? crypto.randomUUID(),
      title: titleForm.trim(),
      status: statusForm,
      description: descriptionForm.trim(),
      createdAt: project?.createdAt ?? Date.now(),
    };

    onSubmit(updatedProject);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>{project ? "Edytuj projekt" : "Nowy projekt"}</h2>

      <label className="flex flex-col gap-2">
        Tytuł
        <input
          className="w-full border rounded-sm p-2 focus:border-blue-500 focus:outline-none"
          type="text"
          value={titleForm}
          onChange={handleTitleChange}
          placeholder="Tytuł projektu"
        />
      </label>

      {errors.title && <p role="alert">{errors.title}</p>}

      <label className="flex flex-col gap-2">
        Status
        <select
          className="w-full border rounded-sm p-2 focus:border-blue-500 focus:outline-none"
          value={statusForm}
          onChange={handleSelectChange}
        >
          <option>To Do</option>
          <option>In Progress</option>
          <option>Done</option>
        </select>
      </label>

      <label className="flex flex-col gap-2">
        Opis
        <textarea
          maxLength={500}
          className="w-full border rounded-sm p-2 focus:border-blue-500 focus:outline-none min-h-[120px]"
          value={descriptionForm}
          onChange={handleDescriptionChange}
          placeholder="Krótki opis problemu"
        />
      </label>

      <p>{descriptionForm.length} / 500</p>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="secondary" onClick={onClose}>
          Anuluj
        </Button>

        <Button type="submit" variant="primary">
          {project ? "Aktualizuj" : "Dodaj projekt"}
        </Button>
      </div>
    </form>
  );
}

export default CreateProjectForm;
