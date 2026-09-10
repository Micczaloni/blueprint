import { useEffect, useState, type ChangeEvent } from "react";
import {
  type ProjectFilter,
  type Project,
  type Status,
  type SortOption,
  statuses,
} from "./models/Project";
import { matchesStatusFilter, compareProjects } from "./utils/projectFilters";

import EmptyState from "./components/EmptyState";
import CreateProjectForm from "./components/CreateProjectForm";
import ProjectCard from "./components/ProjectCard";
import Modal from "./components/Modal";
import Button from "./components/Button";
import ConfirmModal from "./components/ConfirmModal";
import ProjectDetailsModal from "./components/ProjectDetailsModal";
import ProjectStats from "./components/ProjectStats";
import Toast from "./components/Toast";
import { updateProject } from "./utils/projectOperations";

function App() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [projects, setProjects] = useState<Project[]>(getInitialProjects);
  const [message, setMessage] = useState<string | null>(null);

  const [currentProjectEdit, setCurrentProjectEdit] = useState<Project | null>(
    null,
  );
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const [statusFilter, setStatusFilter] = useState<ProjectFilter>("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState<SortOption>("recentlyUpdated");

  const totalProjects = projects.length;
  const todoProjects = projects.filter(
    (project) => project.status === "To Do",
  ).length;
  const inProgressProjects = projects.filter(
    (project) => project.status === "In Progress",
  ).length;
  const doneProjects = projects.filter(
    (project) => project.status === "Done",
  ).length;
  const favoriteProjects = projects.filter(
    (project) => project.isFavorite === true,
  ).length;

  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    if (!message) {
      return;
    }

    const timeoutId = setTimeout(() => {
      setMessage(null);
    }, 10000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [message]);

  function getInitialProjects(): Project[] {
    const projectsStorage = localStorage.getItem("projects");

    if (!projectsStorage) {
      return [];
    }
    try {
      return JSON.parse(projectsStorage);
    } catch {
      return [];
    }
  }

  function openPopup() {
    setIsPopupOpen(true);
  }
  function closePopup() {
    setIsPopupOpen(false);
    setCurrentProjectEdit(null);
  }

  function addProject(project: Project) {
    setProjects((previousProjects) => [...previousProjects, project]);
    closePopup();
    setMessage(`Dodano projekt.`);
  }

  function onDeleteCancel() {
    setProjectToDelete(null);
  }

  function onDeleteAccept() {
    if (!projectToDelete) {
      return;
    }

    setProjects((previousProjects) =>
      previousProjects.filter((item) => item.id !== projectToDelete.id),
    );

    setProjectToDelete(null);
    setMessage("Usunięto projekt.");
  }

  function onProjectDelete(project: Project) {
    setProjectToDelete(project);
  }

  function editProject(project: Project) {
    setProjects((previousProjects) =>
      previousProjects.map((item) => (item.id === project.id ? project : item)),
    );
    closePopup();
    setMessage(`Edytowano projekt.`);
  }

  function onProjectChange(project: Project) {
    setCurrentProjectEdit(project);
    setIsPopupOpen(true);
  }

  function onSearchChange(e: ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e.target.value);
  }

  const filteredProjects = projects.filter(
    (project) =>
      matchesStatusFilter(project, statusFilter) &&
      project.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const sortedProjects = [...filteredProjects].sort((a, b) =>
    compareProjects(a, b, sortOption),
  );

  function resetFilters() {
    setSearchTerm("");
    setSortOption("recentlyUpdated");
    setStatusFilter("All");
  }

  const hasActiveFilters = searchTerm.trim() !== "" || statusFilter !== "All";

  function onProjectSelect(project: Project) {
    setSelectedProject(project);
  }

  function toggleFavorite(project: Project) {
    setProjects((previousProjects) =>
      updateProject(previousProjects, project.id, {
        isFavorite: !project.isFavorite,
      }),
    );

    setMessage(
      project.isFavorite ? "Usunięto z ulubionych" : "Dodano do ulubionych",
    );
  }

  function onFilterSelect(filtr: ProjectFilter) {
    setStatusFilter(filtr);
  }

  function onProjectStatusChange(projectId: string, newStatus: Status) {
    setProjects((previousProjects) =>
      updateProject(previousProjects, projectId, {
        status: newStatus,
      }),
    );
    setMessage(`Status zmieniony na ${newStatus}`);
  }

  return (
    <main className="max-w-[80%] m-auto p-4">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Blueprint</h1>
        {!isPopupOpen && (
          <Button type="button" onClick={openPopup} variant="primary">
            Nowy projekt +
          </Button>
        )}
      </header>
      {isPopupOpen && (
        <Modal onClose={closePopup}>
          <CreateProjectForm
            onSubmit={currentProjectEdit ? editProject : addProject}
            onClose={closePopup}
            project={currentProjectEdit ?? undefined}
          />
        </Modal>
      )}
      {projectToDelete && (
        <ConfirmModal
          onConfirm={onDeleteAccept}
          onCancel={onDeleteCancel}
          project={projectToDelete}
        ></ConfirmModal>
      )}
      {selectedProject && (
        <ProjectDetailsModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
      <div>
        <ProjectStats
          totalProjects={totalProjects}
          todoProjects={todoProjects}
          inProgressProjects={inProgressProjects}
          doneProjects={doneProjects}
          favoriteProjects={favoriteProjects}
          onSelect={onFilterSelect}
          currentFilter={statusFilter}
        />
        <div className="flex pb-4 justify-between">
          <input
            placeholder="Wyszukaj"
            className="border"
            type="text"
            value={searchTerm}
            onChange={onSearchChange}
          />
          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value as ProjectFilter)
            }
          >
            <option value="All">Wszystkie</option>
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
            <option value="Ulubione">Ulubione</option>
          </select>
          <select
            value={sortOption}
            onChange={(event) =>
              setSortOption(event.target.value as SortOption)
            }
          >
            <option value="recentlyUpdated">Ostatnio zmienione</option>
            <option value="oldestUpdated">Najdawniej zmienione</option>
            <option value="recentlyCreated">Ostatnio utworzone</option>
            <option value="oldestCreated">Najdawniej utworzone</option>
            <option value="titleAsc">A → Z</option>
            <option value="titleDesc">Z → A</option>
            <option value="favoritesFirst">Ulubione najpierw</option>
          </select>
          <Button type="button" variant="secondary" onClick={resetFilters}>
            Wyczyść filtry
          </Button>
          <p>
            Liczba projektów: {filteredProjects.length} z {projects.length}
          </p>
        </div>
      </div>
      {message && <Toast message={message} />}
      {projects.length === 0 && !isPopupOpen ? (
        <EmptyState onCreateProject={openPopup} />
      ) : (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {filteredProjects.length === 0 && hasActiveFilters ? (
            <p>Brak projektów spełniających kryteria.</p>
          ) : (
            sortedProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onSelect={onProjectSelect}
                onDelete={onProjectDelete}
                onProjectEdit={onProjectChange}
                onToggleFavorite={toggleFavorite}
                onStatusChange={onProjectStatusChange}
              />
            ))
          )}
        </section>
      )}
    </main>
  );
}
export default App;
