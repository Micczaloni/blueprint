import type { ProjectFilter } from "../models/Project";

type ProjectStatsProps = {
  totalProjects: number;
  todoProjects: number;
  inProgressProjects: number;
  doneProjects: number;
  favoriteProjects: number;
  onSelect: (filtr: ProjectFilter) => void;
  currentFilter: ProjectFilter;
};

const activeFilter = "flex flex-col items-center p-4 border mb-2 bg-green-300";
const otherFilters = "flex flex-col items-center p-4 border mb-2";

const ProjectStats = ({
  totalProjects,
  todoProjects,
  inProgressProjects,
  doneProjects,
  favoriteProjects,
  onSelect,
  currentFilter,
}: ProjectStatsProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        onClick={() => onSelect("All")}
        className={currentFilter === "All" ? activeFilter : otherFilters}
      >
        <p>Projekty</p>
        {totalProjects}
      </button>
      <button
        type="button"
        onClick={() => onSelect("To Do")}
        className={currentFilter === "To Do" ? activeFilter : otherFilters}
      >
        <p>To Do</p>
        {todoProjects}
      </button>
      <button
        type="button"
        onClick={() => onSelect("In Progress")}
        className={
          currentFilter === "In Progress" ? activeFilter : otherFilters
        }
      >
        <p>In Progress</p>
        {inProgressProjects}
      </button>
      <button
        type="button"
        onClick={() => onSelect("Done")}
        className={currentFilter === "Done" ? activeFilter : otherFilters}
      >
        <p>Done</p>
        {doneProjects}
      </button>
      <button
        type="button"
        onClick={() => onSelect("Ulubione")}
        className={currentFilter === "Ulubione" ? activeFilter : otherFilters}
      >
        <p>Ulubione</p>
        {favoriteProjects}
      </button>
    </div>
  );
};

export default ProjectStats;
