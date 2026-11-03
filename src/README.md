# Site source

`src/` holds the source of the homepage: the data, the shared React
components, the logos, the stylesheets, and the grain field. The
repository [README](../README.md#key-code) lists the entry points.

## Rules

- The components in `components/` take all their data as props. From
  `company.ts` and `projects.ts`, they import only the types.
- The components import no CSS, so that a test can render them in Node.
  Node cannot import CSS.
- The mockup screen and the site render these components with the same
  data and `styles/site.css`. Do not copy a component for one of them.
- The mockup screen imports the components, the data, the stylesheet, and
  the grain layout of the field. So a change in `src/` can change the
  screen. Check the screen in the catalogue after each change.
- The grain field in `field/` imports no React. It also imports
  `components/projectListContract.ts`, so that module imports no React
  either. The field is the only script of the page.
- The field finds the project list, and reads the logo colour of each card,
  only through the names in `components/projectListContract.ts`. Keep that
  contract when you change the list or its cards.
- [logos/README.md](logos/README.md) gives the rules for the logo
  components and the source of each logo.
