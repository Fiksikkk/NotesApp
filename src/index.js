import { listener } from './js/actions.js';
import { renderCountingNotes, renderNotes } from './js/rendering.js';

document.body.onload = renderNotes('actionItems');
document.body.onload = renderNotes('archiveItems');
document.body.onload = renderNotes('archiveItems');
document.body.onload = renderCountingNotes();

document.addEventListener("click", (event) => listener(event));


