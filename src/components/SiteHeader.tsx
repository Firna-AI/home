import { FirnaLogo } from "../logos/FirnaLogo";

export interface SiteHeaderProps {
  /** The contact email address. */
  readonly email: string;
}

/** The page's header: the Firna logo as the page's heading, and the email. */
export function SiteHeader({ email }: SiteHeaderProps) {
  return (
    <header className="top wrap">
      <h1 className="brand plate">
        <FirnaLogo />
      </h1>
      <a className="mail plate" href={`mailto:${email}`}>
        {email}
      </a>
    </header>
  );
}
