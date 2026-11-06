import type { Project } from "../projects";
import { ProjectCard } from "./ProjectCard";
import { projectListId } from "./projectListContract";

export interface ProjectListProps {
  readonly projects: readonly Project[];
}

/**
 * The projects as a grid of cards. The grain field finds the list and its
 * cards through `projectListContract.ts`.
 */
export function ProjectList({ projects }: ProjectListProps) {
  return (
    <ul className="grid" id={projectListId} aria-label="Projects">
      {projects.map((project) => (
        <ProjectCard key={project.name} project={project} />
      ))}
    </ul>
  );
}
