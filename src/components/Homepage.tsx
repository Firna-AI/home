import type { Company } from "../company";
import type { Project } from "../projects";
import { LegalFooter } from "./LegalFooter";
import { ProjectList } from "./ProjectList";
import { SiteHeader } from "./SiteHeader";

export interface HomepageProps {
  readonly company: Company;
  readonly projects: readonly Project[];
}

/**
 * The homepage: the header, the projects, and the legal footer. It renders
 * the content of the page's body. The page layout `src/layouts/Page.astro`
 * owns the body, the stylesheet, and the grain field's script.
 */
export function Homepage({ company, projects }: HomepageProps) {
  return (
    <>
      <SiteHeader email={company.email} />
      <main className="wrap">
        <ProjectList projects={projects} />
      </main>
      <LegalFooter company={company} />
    </>
  );
}
