# Cursor (M)

> These notes come from the review workspace "Firna Homepage Design". The
> screenshots and the check scripts `check.mjs` and `contrast.mjs` stayed
> there. This folder holds the page, these notes, and the logos.

## The idea

A field of fine grains covers the white page in very light grey, like firn,
the old granular snow on a glacier. The pointer moves through the field like
wind: it pushes the grains aside, and they drift back. When the pointer rests
on a project, the nearest grains line up as a dotted outline around its card,
in the colour of its logo, and the card lifts.

The projects sit on the field as a clean grid of cards: logo, name, kind, one
line, and link. The effect is the delight, and the cards are the content.

## Round 5: the serif name and frosted panels

The user's words: "I think it would look better if Firna name mark is in a
modern serif font and instead of the text having a hard white background it
should use opacity or blur background".

- **The Firna name.** The page shows the shared `firna-logo.svg`, now the word
  "Firna" in Instrument Serif. It is 34 px high on desktop and 29 px on the
  phone, so that the serif reads well. It is still the shared `img`.
- **Frosted panels.** The cards and the plates behind the Firna name, the
  email, and the footer are no longer solid white. They are white at 55 %
  over a 2 px backdrop blur. The grains run on under the text at the normal
  density, softened into a fine mottle.
- **`?bg=opacity`.** The same panels as plain white at 74 %, with no blur, so
  that the user can compare. Under it, the grains show as faint, sharp dots.
  It also works with `?many`, as `?many&bg=opacity`.
- **Fallbacks.** With `prefers-reduced-transparency: reduce`, and in a
  browser without `backdrop-filter`, the panels are white at 94 % with no
  blur.
- **Grains under the text.** The field no longer thins out near the text, and
  the wind also moves the grains under the cards. They move softly behind
  the frosted panels.
- **Muted text.** The muted grey is now `#5f646b`, a little darker than
  before, so that it keeps AA over the grains in the opacity mode. It is
  6.0:1 on plain white.
- **The reduced-motion highlight.** A hovered or focused card gets a flat 5 %
  tint of its logo colour over the panel, and a stronger border.

## Contrast

`contrast.mjs` hides the text, takes a full screenshot at 2×, finds the
darkest pixel under every line of text, and gives the contrast ratio of the
text colour against it. It runs at rest and right after a pointer sweep, or
a finger drag on the phone, that pushes grains under the cards and the
plates. The muted grey is the lowest in every case:

| Panels | At rest | After a sweep | Darkest backdrop under text |
| --- | --- | --- | --- |
| Frosted, default | 5.77:1 | 5.75:1 | `rgb(250 251 251)` |
| `?bg=opacity` | 5.09:1 | 4.95:1 | `rgb(232 234 237)` |

The worst case by calculation is a pile of three overlapping grains, one of
each tone, under the opacity panel. It gives 4.79:1 for the muted grey, and
8.28:1 for the body text. Measured, the body text is at least 9.96:1
frosted and 8.80:1 in the opacity mode. The names and the email are at least
15.34:1. Under the reduced-transparency panel, the same pile gives 5.62:1 for
the muted grey.

## The interaction

- **Pointer (mouse or pen).** The grains within 64 px of a moving pointer move
  aside, and a little along its path, also under the cards. A faster pointer
  pushes harder. The grains drift home in about 2 s. A still pointer does
  nothing.
- **Hover.** After 60 ms on a card, its nearest grains line up as an even
  dotted line 8 px outside its edge, about 5.5 px apart, with a slight
  jitter. Other grains near the card clear out to 15 px. The line fades from
  grey to the logo colour. The card lifts 3 px with a soft shadow, its border
  takes a tint of the logo colour, the link text turns ink, and its arrow
  moves. When the pointer leaves, the line loosens, turns grey, and drifts
  home. While the pointer is on a card, it causes no wind.
- **Keyboard.** Focus on a card gives the same outline and lift, and a 2 px ink
  focus ring on the card's own edge. The email link has a ring around its
  panel.
- **Touch.** While a finger is down, the grains part around it and follow its
  drag. When it lifts, they drift home. Nothing moves on its own. A tap opens
  the project. Scrolling is not blocked.
- **Reduced motion.** The field is drawn once and stays still. A hovered or
  focused card gets the flat tint and a stronger border, with no lift.
- **No JavaScript.** There is no canvas. The translucent panels sit on plain
  white, so the page shows the plain grid of cards.

## Type and colours

- Instrument Sans 400, 500, and 600 for the names and text. Geist Mono 400 for
  the link labels. Both come from Google Fonts. The Firna name is the shared
  serif file.
- Name 19 px semibold. Kind 13.5 px, muted. One line 15 px. Link 12.5 px mono,
  with a small arrow.
- Ink `#15171a`, body `#3c4147`, muted `#5f646b`, hairline border `#e3e5e8`,
  and a 14 px radius.
- The grains are a cool grey (`rgb(134 145 158)`) at 30, 45, or 62 % opacity,
  1.3 to 2.2 px wide. A slow wave shifts their tones a little, like wind
  ripples on snow.
- Colour comes only from the logos. Each card carries its logo colour as `--c`.
  The outline and the hover tint use it.

## Layout

- At 1440 × 900, one row of five equal cards sits between the header and the
  footer. All five are visible.
- The grid is `repeat(auto-fill, minmax(212px, 1fr))` in a 1340 px column. With
  12 projects (`?many`), it grows to rows of 5, 5, and 2.
- At 390 px, the cards stack. Each card puts the logo beside the name and kind,
  then the one line and the link. The footer wraps between its parts.

## How a new project is added

1. Copy one `<li class="card">` in `index.html`. Set `--c` to the main colour
   of the logo. Change the logo file, the name, the kind, the one line, and
   the link.
2. Add the logo file to `assets/logos/`.

The script reads the cards from the page, so it needs no change. In the Astro
site, the `<li>` becomes one entry in a data list.

## Performance

- One canvas behind the page, the size of the document, at up to 2× pixel
  density. One `requestAnimationFrame` loop with a fixed 60 Hz step.
- The loop reads no layout. It runs only while grains move, and it stops when
  they rest, when the tab is hidden, and when the field is off screen. The
  checks found 0 frames in each of these cases, in both panel modes.
- Each frame repaints only the 48 px bins that changed, with one path and one
  fill per tone.
- The blur runs in the browser's compositor, not in the script. A
  `backdrop-filter` blurs again in each frame in which grains move under a
  panel.

Measured in headless Chrome at 1440 × 900 and 2×, in a 3 s pointer sweep. Each
row is the median of three runs:

| Panels | Script, mean | Script, p95 | Frame interval, mean | Frame interval, p95 | Frames over 20 ms |
| --- | --- | --- | --- | --- | --- |
| Frosted, with blur | 2.25 ms | 5.9 ms | 36.5 ms | 83.4 ms | 47 % |
| `?bg=opacity`, no blur | 1.53 ms | 3.2 ms | 21.3 ms | 50.0 ms | 17 % |
| Opaque white, as in round 3 | 2.19 ms | 4.9 ms | 30.3 ms | 66.7 ms | 35 % |

- The script time is about the same in all three modes.
- This Chrome has no GPU. It composites the canvas and the blur in software,
  so all frame intervals here are slow and vary a lot between runs. The blur
  was the slowest mode in every run. It added about 6 to 15 ms per frame.
- A laptop browser composites on the GPU, where these costs are small. This
  sandbox cannot measure that. See open question 1.

## Screenshots and checks

- `shots/`: the screenshots of `tools/shoot.mjs`. `shots/many/` holds the
  `?many` shots, and `shots/opacity/` the `?bg=opacity` shots.
- `shots/motion/`: the hover, trail, focus, touch, reduced-motion,
  reduced-transparency, and `?many&bg=opacity` shots of `check.mjs`, at 2×.
  `shots/motion/1x/` holds the hover and trail shots at 1×.
- `shots/motion/strip.png`: six frames side by side. The field at rest, the
  pointer moving, the trail filling in, the outline gathering, the outline,
  and a finger on the phone.
- Chrome drops the backdrop blur of a card that a screenshot clip cuts
  through. So `check.mjs` takes full screenshots and crops them afterwards,
  and the crops show the page as a visitor sees it.

## Files

- `index.html`: the page, with `?many` and `?bg=opacity`.
- `logos/`: the logo files that the page loads.
- `notes.md`: these notes.
- In the review workspace only: `check.mjs`, the Playwright checks of
  motion, hover, focus, touch, reduced motion and transparency, the pauses,
  and the frame costs; `contrast.mjs`, the contrast measurement over the
  grains; and `shots/`.

## Open questions

1. **Smoothness on a real laptop.** The frosted panels cost the most frame
   time in this software-composited sandbox. Check the page on a MacBook in
   Safari and Chrome. If the frosted page stutters there, use the opacity
   mode as the default.
2. **Frosted or plain translucent.** The default is frosted. `?bg=opacity`
   shows the other choice. Which one does the user prefer?
3. **Outline colour.** The outline uses the logo colour. Ink or the field grey
   would be calmer, but would lose the link to each logo.
4. **Touch.** On a phone, the cards cover most of the field, so the touch
   effect shows mostly in the margins and gaps, and softly under the cards.
   Is that enough?
5. **Fonts.** The page loads Instrument Sans and Geist Mono from Google Fonts.
   The Astro site should host them itself.
