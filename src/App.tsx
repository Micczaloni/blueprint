import { ChangeEvent, useState } from "react";
import type { Project, Status } from "./models/Project";

import EmptyState from "./components/EmptyState";
import CreateProjectForm from "./components/CreateProjectForm";
import ProjectCard from "./components/ProjectCard";
import Modal from "./components/Modal";
import Button from "./components/Button";

type SortOption = "newest" | "oldest" | "titleAsc" | "titleDesc";

function App() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentProjectEdit, setCurrentProjectEdit] = useState<Project | null>(
    null,
  );
  const [statusFilter, setStatusFilter] = useState<"All" | Status>("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState<SortOption>("newest");

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
  }

  function deleteProject(project: Project) {
    setProjects((previousProjects) =>
      previousProjects.filter((item) => item.id !== project.id),
    );
  }

  function editProject(project: Project) {
    setProjects((previousProjects) =>
      previousProjects.map((item) => (item.id === project.id ? project : item)),
    );
    closePopup();
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
      (statusFilter === "All" || project.status === statusFilter) &&
      matchesSearch(project, searchTerm),
  );

  function matchesSearch(project: Project, searchTerm: string) {
    return project.title.toLowerCase().includes(searchTerm.toLowerCase());
  }

  function compareProjects(a: Project, b: Project) {
    switch (sortOption) {
      case "newest":
        return b.createdAt - a.createdAt;
      case "oldest":
        return a.createdAt - b.createdAt;
      case "titleAsc":
        return a.title.localeCompare(b.title);
      case "titleDesc":
        return b.title.localeCompare(a.title);
      default:
        return 0;
    }
  }

  const sortedProjects = [...filteredProjects].sort(compareProjects);

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
      {projects.length === 0 && !isPopupOpen ? (
        <EmptyState onCreateProject={openPopup} />
      ) : (
        <div>
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
                setStatusFilter(event.target.value as "All" | Status)
              }
            >
              <option value="All">Wszystkie</option>
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
            <select
              value={sortOption}
              onChange={(event) =>
                setSortOption(event.target.value as SortOption)
              }
            >
              <option value="newest">Najnowsze</option>
              <option value="oldest">Najstarsze</option>
              <option value="titleAsc">A → Z</option>
              <option value="titleDesc">Z → A</option>
            </select>
            <p>
              Liczba projektów: {filteredProjects.length} z {projects.length}
            </p>
          </div>
          <section className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {filteredProjects.length === 0 ? (
              <p>Brak projektów w tym statusie</p>
            ) : (
              sortedProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onDelete={deleteProject}
                  onProjectEdit={onProjectChange}
                />
              ))
            )}
          </section>
        </div>
      )}
    </main>
  );
}
export default App;
