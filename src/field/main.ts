// The grain field's entry module: the page's only client script. It finds
// the project list by the id that the list renders, and starts the field on
// the page's body. Without JavaScript, the page shows the cards on white.

import { projectListId } from "../components/projectListContract";
import { startField } from "./start";

const list = document.getElementById(projectListId);
if (list) startField({ host: document.body, list });
