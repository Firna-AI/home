import type { ComponentType } from "react";

import { BookfolioMark } from "./logos/BookfolioMark";
import { BowserMark } from "./logos/BowserMark";
import { FirnaUiMark } from "./logos/FirnaUiMark";
import type { MarkProps } from "./logos/markProps";
import { MoklyMark } from "./logos/MoklyMark";
import { RedloopMark } from "./logos/RedloopMark";

/** One project on the homepage. */
export interface Project {
  /** The project's name. It is the card's link. */
  readonly name: string;
  /** What the project is, such as "Design tool". */
  readonly kind: string;
  /** One line about the project, from its own site or README. */
  readonly line: string;
  /** Phrases of the line that do not break across lines, in their order. */
  readonly keepTogether?: readonly string[];
  /** The address that the card links to. */
  readonly href: string;
  /** The short form of the address that the card shows. */
  readonly linkLabel: string;
  /** The main colour of the logo, as `#rrggbb`. The hover outline uses it. */
  readonly color: `#${string}`;
  /** The project's logo mark, from `src/logos/`. */
  readonly logo: ComponentType<MarkProps>;
}

/**
 * The projects, in the order that the page shows them. A new project is one
 * entry here and one logo in `src/logos/`.
 */
export const projects: readonly Project[] = [
  {
    name: "Mokly",
    kind: "Design tool",
    line: "Mock up your whole app, so that AI agents build what you designed.",
    href: "https://mokly.ai",
    linkLabel: "mokly.ai",
    color: "#2f5945",
    logo: MoklyMark,
  },
  {
    name: "Bookfolio",
    kind: "Accounting software",
    line: "UK accounting made simple: books, VAT, payroll, and tax returns, with accountants on hand.",
    href: "https://bookfolio.net",
    linkLabel: "bookfolio.net",
    color: "#4f7864",
    logo: BookfolioMark,
  },
  {
    name: "Firna UI",
    kind: "Component library",
    line: "React and React Native components, from buttons to charts, data grids, and a rich-text editor.",
    keepTogether: ["rich-text"],
    href: "https://github.com/futex-ai/ui",
    linkLabel: "GitHub",
    color: "#3f6290",
    logo: FirnaUiMark,
  },
  {
    name: "Redloop",
    kind: "Rust library",
    line: "A Redis-backed job queue for Rust: run jobs now or on a schedule, with retries and leases.",
    href: "https://github.com/futex-ai/redloop",
    linkLabel: "GitHub",
    color: "#b0473a",
    logo: RedloopMark,
  },
  {
    name: "Bowser",
    kind: "Command-line tool",
    line: "Drive Chrome from the command line, and read any page as compact YAML.",
    href: "https://github.com/futex-ai/bowser",
    linkLabel: "GitHub",
    color: "#6a4b7c",
    logo: BowserMark,
  },
];
