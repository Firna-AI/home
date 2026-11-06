import type { Company } from "../company";
import { LegalFooter } from "./LegalFooter";
import { SiteHeader } from "./SiteHeader";

export interface NotFoundPageProps {
  readonly company: Company;
  /** The address of the homepage. The logo and the page's link go to it. */
  readonly homeHref: string;
}

/**
 * The page for an address that has no page: the header, a short message with
 * a link to the homepage, and the legal footer. Like `Homepage`, it renders
 * the content of the page's body. The page owns the body, the stylesheet, and
 * the grain field's script.
 */
export function NotFoundPage({ company, homeHref }: NotFoundPageProps) {
  return (
    <>
      <SiteHeader email={company.email} homeHref={homeHref} />
      <main className="wrap">
        <div className="notice plate">
          <h1>Page not found</h1>
          <p>Firna's projects are on the homepage.</p>
          <p>
            <a className="home" href={homeHref}>
              Go to the homepage
            </a>
          </p>
        </div>
      </main>
      <LegalFooter company={company} />
    </>
  );
}
