// Literal requirements from the homepage protocol, independent of product data.
export const expectedProjects = [
  { name: "Mokly", href: "https://mokly.ai" },
  { name: "Bookfolio", href: "https://bookfolio.net" },
  { name: "Firna UI", href: "https://github.com/futex-ai/ui" },
  { name: "Redloop", href: "https://github.com/futex-ai/redloop" },
  { name: "Bowser", href: "https://github.com/futex-ai/bowser" },
];

export const expectedLegalDetails = [
  "Firna Ltd",
  "Registered in England and Wales",
  "Company number 09018453",
  "Registered office: 26 John Hogan V C Road, Manchester, M40 7QU",
  "VAT number GB191373695",
];

// Use the same nested missing address for the page body and metadata checks.
export const unknownAddress = "/no-such-page/at/any/depth";
