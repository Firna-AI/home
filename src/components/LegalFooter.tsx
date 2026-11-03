import type { Company } from "../company";

export interface LegalFooterProps {
  readonly company: Company;
}

/**
 * The legal disclosure. Each part stays on one line, and the text wraps
 * between the parts. The registered office can wrap after the street.
 */
export function LegalFooter({ company }: LegalFooterProps) {
  const [street, town] = company.registeredOffice;
  return (
    <footer className="legal wrap">
      <p className="plate">
        <span>{company.legalName}</span>
        {" · "}
        <span>{`Registered in ${company.registeredIn}`}</span>
        {" · "}
        <span>{`Company number ${company.companyNumber}`}</span>
        {" · "}
        <span>{`Registered office: ${street},`}</span> <span>{town}</span>
        {" · "}
        <span>{`VAT number ${company.vatNumber}`}</span>
      </p>
    </footer>
  );
}
