# Site source

`src/` holds the source of the site: the pages and their layout, the data,
the shared React components, the logos, the stylesheets, and the grain
field. The site has two pages: the homepage and the not-found page. The
repository [README](../README.md#key-code) lists the entry points.

## Rules

- The components in `components/` take all their data as props. From
  `company.ts` and `projects.ts`, they import only the types.
- The components import no CSS, so that a test can render them in Node.
  Node cannot import CSS.
- The mockup screens and the site render these components with the same
  data and `styles/site.css`. Do not copy a component for one of them.
- Each mockup screen imports the components, the data, the stylesheet,
  and the grain layout of the field. So a change in `src/` can change
  each screen. Check each screen in the catalogue after each change.
- `Homepage` and `NotFoundPage` each render the content of one page. Both
  use `SiteHeader` and `LegalFooter`, so the pages share the header and
  the footer. Build a new page from them. Do not copy them.
- On the homepage, `SiteHeader` gets no `homeHref`, so the logo is the
  page's `h1`. On every other page, pass `homeHref`. The logo then links
  to the homepage, and the page renders its own `h1`.
- `styles/site.css` is the one stylesheet of each page and each screen.
  Put the styles of one page in a file of their own. Import that file in
  `site.css`, as `cards.css` and `not-found.css` are. Each page loads
  every rule. So give the classes of one page names that no other page
  uses.
- The grain field in `field/` imports no React. It also imports
  `components/projectListContract.ts`, so that module imports no React
  either. The field is the only script of each page.
- `layouts/Page.astro` holds the document of each page: the head, the
  stylesheet, the body, and one `<script>` that loads `field/main.ts`.
  Each page in `pages/` renders its content in that layout. The page gives
  its own title. A page with an address of its own also gives its
  description and its canonical address. Give the layout a prop for each
  new difference between the pages.
- Each page renders the components with no `client:*` directive, so that
  the page ships no React runtime.
- Astro builds `pages/404.astro` as `404.html`. The host serves that file
  at every address with no page or file, at any depth, such as `/a/b/c/`.
  So the not-found page uses no relative address. Each of its links and
  resources starts with `/` or is a full address.
- The field finds the project list, and reads the logo colour of each card,
  only through the names in `components/projectListContract.ts`. Keep that
  contract when you change the list or its cards. On a page without the
  list, the field runs with no cards.
- [logos/README.md](logos/README.md) gives the rules for the logo
  components and the source of each logo.
