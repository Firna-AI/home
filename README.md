# Firna homepage

This repository holds the homepage of Firna Ltd: one static page at
`https://firna.dev`. The page shows the Firna logo, the contact email, the
list of Firna's projects, and the legal details of the company. A field of
fine grey grains covers the white page, like firn, which is old, granular
snow. The pointer pushes the grains aside like wind. A card under the
pointer or the keyboard focus gathers an outline of grains in the colour of
its logo.

[docs/protocol/homepage.md](docs/protocol/homepage.md) holds the
requirements and the decisions in force.

The site is not live yet. A push deploys nothing until someone connects
this repository to Cloudflare Pages.

## Get started

1. Use the Node version that `.nvmrc` names.
2. Run `npm ci` to install the dependencies. npm can warn that it did not
   run the install script of `esbuild`. The commands work without it.
3. Run `npm run mockups`, and open the address that it prints. There,
   Mokly serves the mockup catalogue: the screens of the product as static
   pages. It shows the Homepage screen at desktop and phone sizes.

The catalogue runs no scripts. So the screen draws the grain field once,
at rest.

## Commands

- `npm run mockups` serves the mockup catalogue. It shows each change to a
  screen while it runs.
- `npm run mockups:check` builds the catalogue into `mokly-static/`. It
  fails on any warning.
- `npm run typecheck` checks the types of `src/` and `docs/mockups/` in
  strict mode. It writes no files.

## Add a project

1. Add the logo of the project as one component in `src/logos/`. Add a row
   for it, with the source of the logo, to the table in
   [src/logos/README.md](src/logos/README.md).
2. Add one entry for the project to the list in `src/projects.ts`, at its
   place in the order. The comments on the `Project` type say what each
   field holds.
3. Take the kind and the one line from the project's own site or README.
4. Add the project to the list in
   [docs/protocol/homepage.md](docs/protocol/homepage.md#projects). That
   list of the projects and their order is a requirement, so it changes
   with the page.
5. Run `npm run mockups`, and check the Homepage screen at both sizes.
6. Run `npm run typecheck` and `npm run mockups:check`.

## Deploy

Cloudflare Pages hosts the site. Its Git connection builds each push to
`main` and deploys it to `https://firna.dev`. The build runs all the checks
of the repository first. So a failed check stops the deploy, and the live
site stays as it was. Cloudflare also builds a preview of each other branch
at a `pages.dev` address.

The repository is not connected to Cloudflare yet. The
[deploy section](docs/protocol/homepage.md#deploy) of the protocol doc
gives the rules and the decisions.

## Key code

- `src/projects.ts`: the projects, in the order that the page shows them,
  and the `Project` type.
- `src/company.ts`: the contact email and the legal details of Firna Ltd.
- `src/components/Homepage.tsx`: the content of the page: the header, the
  project list, and the footer. It takes the company and the projects as
  props.
- `src/components/projectListContract.ts`: the id of the project list and
  the name of the colour property of a card. The grain field finds the
  cards through them.
- `src/field/main.ts`: the entry module of the grain field, the only script
  of the page.
- `src/styles/site.css`: the shared stylesheet. It imports the fonts and
  `src/styles/cards.css`, the styles of the project list.
- `src/logos/`: one component for each logo.
- `docs/mockups/homepage.mockup.tsx`: the Homepage screen of the
  catalogue. `docs/mockups/StillField.tsx` draws its grain field at rest.

## Related docs

- [docs/protocol/homepage.md](docs/protocol/homepage.md): the requirements
  and the decisions in force.
- [src/README.md](src/README.md): the rules for work on the code.
- [src/logos/README.md](src/logos/README.md): the source of each logo.
- [AGENTS.md](AGENTS.md): the rules for agents in this repository.
