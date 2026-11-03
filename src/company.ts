/**
 * Firna Ltd's details on the page: the contact email, and the legal
 * disclosure that UK law requires on a company's website.
 */
export interface Company {
  /** The address of the contact email link. */
  readonly email: string;
  /** The company's registered name. */
  readonly legalName: string;
  /** Where the company is registered. */
  readonly registeredIn: string;
  readonly companyNumber: string;
  /** The registered office: the street, then the town and the postcode. */
  readonly registeredOffice: readonly [street: string, town: string];
  readonly vatNumber: string;
}

export const company: Company = {
  email: "hello@firna.ai",
  legalName: "Firna Ltd",
  registeredIn: "England and Wales",
  companyNumber: "09018453",
  registeredOffice: ["26 John Hogan V C Road", "Manchester, M40 7QU"],
  vatNumber: "GB191373695",
};
