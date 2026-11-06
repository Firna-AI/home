import type { CSSProperties, ReactNode } from "react";

import type { Project } from "../projects";
import { logoColorProperty } from "./projectListContract";

export interface ProjectCardProps {
  readonly project: Project;
}

/** The card's style: the colour of the logo, for the tint and the outline. */
type CardStyle = CSSProperties & Record<typeof logoColorProperty, string>;

/**
 * One project as a card: its logo, name, kind, one line, and link. The name
 * is the link, and its hit area covers the whole card.
 */
export function ProjectCard({ project }: ProjectCardProps) {
  const Logo = project.logo;
  const style: CardStyle = { [logoColorProperty]: project.color };
  return (
    <li className="card" style={style}>
      <Logo className="mark" />
      <h2 className="name">
        <a href={project.href}>{project.name}</a>
      </h2>
      <p className="kind">{project.kind}</p>
      <p className="line">
        {keepTogether(project.line, project.keepTogether ?? [])}
      </p>
      <p className="url">
        {project.linkLabel}
        <Arrow />
      </p>
    </li>
  );
}

/** Splits the line so that each of the phrases stays on one line. */
function keepTogether(line: string, phrases: readonly string[]): ReactNode[] {
  const parts: ReactNode[] = [];
  let rest = line;
  for (const phrase of phrases) {
    const at = rest.indexOf(phrase);
    if (at < 0) continue;
    parts.push(
      rest.slice(0, at),
      <span key={parts.length} className="keep">
        {phrase}
      </span>,
    );
    rest = rest.slice(at + phrase.length);
  }
  parts.push(rest);
  return parts;
}

/** The small arrow after the link label. */
function Arrow() {
  return (
    <svg viewBox="0 0 10 10" aria-hidden="true">
      <path
        d="M2.5 7.5l5-5M3.5 2.5h4v4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
