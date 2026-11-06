# A resting mouse blocks the wind of a finger

- **Severity:** Low. **Likelihood:** Rare. **Effort:** Small. **Confidence:** High. **Harder later:** No.
- **Kind:** Fix after merge.
- **Added:** 2026-11-06, from branch `calummoore/firna-astro-website`, the fix of review findings 1 and 2.
- **Location:** `src/field/motion.ts`, the wind condition of the simulation step, and `src/field/holder.ts`, which sets `windless`.
- **Reason:** Only a device with both a mouse and a touch screen meets it, and the code before the fix had the same limit.

- **Terms:**
  - **Grain field:** the canvas of grey grains behind each page, drawn by the modules in `src/field/`.
  - **Holder:** the card whose outline of grains is gathered. One card at a time holds it.
  - **Wind:** the push that moves the grains near a moving pointer or a finger aside.
- **Background:** The mouse and a finger share one pointer state in the field. `src/field/holder.ts` sets `windless` while the mouse rests on the holder, so that the outline stays calm. The simulation step in `src/field/motion.ts` skips all wind while `windless` is true. That includes the push of a finger. `docs/protocol/homepage.md` requires that the grains part around a finger, and that the pointer causes no wind only while it rests on the holder.
- **Problem:** On a device with a mouse and a touch screen, the mouse can rest on the holder. A finger drag elsewhere then moves no grains. A probe on 2026-11-06 measured 0 changed canvas values, before and after the fix of findings 1 and 2.
- **Impact if no action:** In this rare setup, the grains do not part around the finger, as the protocol doc requires.
- **Root question:** How should a finger move the grains while the mouse rests on the holder?
- **Options:**
  - **A.** Let a finger that is down make wind, whatever the value of `windless` is. Change one condition in the simulation step, and add a browser case that drags a finger above the cards while the mouse rests on a card. Effort: Small.
  - **B.** Give the finger its own pointer state, so that `windless` applies only to the mouse. This changes the simulation step and the touch handlers. Effort: Medium.
- **Left out:**
  - A touch that ends the mouse rest: the mouse still rests on the card, so its outline must stay.
  - Change nothing: the protocol doc requires that the grains part around a finger.
- **Wider fix:** None. One shared state for one input at a time is the design, and only this rare case uses two inputs at once.
- **Previous examples:** None found.
- **Recommendation:** A. One condition restores the finger's wind, and it keeps the no-wind rule for the mouse.
- **Action:** fix after merge, apply A, because the likelihood is Rare and the severity is Low.
