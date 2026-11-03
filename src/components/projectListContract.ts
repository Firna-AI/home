// The names that `ProjectList` and `ProjectCard` render for code outside
// React: the grain field. The components and the field both import them
// from here, so that the field finds the list only through this contract.
// This module imports no React, so that the field's script stays small.

/** The id of the project list. Each child element of the list is one card. */
export const projectListId = "projects";

/**
 * The CSS custom property on each card that holds the colour of its logo,
 * as `#rrggbb`. The stylesheet tints the card with it, and the field draws
 * the card's outline in it.
 */
export const logoColorProperty = "--logo-color";
