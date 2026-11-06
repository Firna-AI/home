// The grain field's entry module: the only client script of each page. It
// starts the field on the page's body. On the homepage, it also finds the
// project list by the id that the list renders, so that each card can gather
// its outline. On a page without the list, the field has no cards. Without
// JavaScript, each page shows its content on white.

import { projectListId } from "../components/projectListContract";
import { startField } from "./start";

startField({
  host: document.body,
  list: document.getElementById(projectListId),
});
