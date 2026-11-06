import { FirnaLogo } from "../logos/FirnaLogo";

export interface SiteHeaderProps {
  /** The contact email address. */
  readonly email: string;
  /**
   * The address of the homepage. Set it on every other page: the logo then
   * links to the homepage, and the page names itself in its own `h1`. Leave
   * it out on the homepage: the logo is then the page's `h1`.
   */
  readonly homeHref?: string;
}

/**
 * The page's header: the Firna logo and the email. On the homepage the logo
 * is the page's heading. On every other page it is a link to the homepage.
 */
export function SiteHeader({ email, homeHref }: SiteHeaderProps) {
  return (
    <header className="top wrap">
      {homeHref === undefined ? (
        <h1 className="brand plate">
          <FirnaLogo />
        </h1>
      ) : (
        <a className="brand plate" href={homeHref}>
          <FirnaLogo />
        </a>
      )}
      <a className="mail plate" href={`mailto:${email}`}>
        {email}
      </a>
    </header>
  );
}
