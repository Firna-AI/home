# Grain field currents

Status: Active. On branch `calummoore/snow-particle-movement-variations`, no pull request yet. The pull request that completes the work deletes this plan, as the `plans` skill says.

The grain field of each page moves only when a visitor moves the pointer, a
finger, or the keyboard focus. The user asked that the grains move on their
own, and asked for variations to compare. This change makes the grains
travel on slow, curling currents across each page. The pointer's wind, the
card outlines, the still field with reduced motion, and the pauses for a
hidden tab and an off-screen field stay. The change does not add the other
variations of the preview, and it does not change the look of a grain.

Two decisions are open: how a visitor stops the motion, and the frame
budget of a moving field. Milestones 1 to 5 wait for them, as each
milestone says.

Contract owners:

- [Homepage protocol](../docs/protocol/homepage.md).
- The [repository README](../README.md).
- The [site source README](../src/README.md).

## Decisions

### 1. How the grains move on their own

Answered on 2026-11-07. The user chose E, Currents, with the answer "E".
The grains travel on slow, curling currents, and they wrap around at the
page edges. The user saw each variation in a live preview before the
choice. The alternatives were:

- A. Flurry: a light snowfall of separate flakes over the still field.
- B. Breeze: slow waves of wind lean each grain, then let it back. This
  was the recommendation.
- C. Shimmer: each grain wanders about 2 px on a slow loop of its own.
- D. Gusts: a fast gust blows a streak of grains across every 9 to 15 s.

The brainstorm left out no change, a wind from scrolling, a settle on load,
a glint of light, a slide when a phone tilts, and eddies. On 2026-11-03 the
user had rejected the "Drift" refinement: a snowfall on load, with drifts
on the card tops.

### 2. Let visitors stop the motion

- **Severity:** Medium. **Effort:** Medium.
- **Source:** Design.
- **Category:** docs or spec.
- **Location:** `docs/protocol/homepage.md`, sections "Page content", "Accessibility", and "Reduced motion".
- **Terms:**
  - **Pause rule:** the WCAG 2.2 level A rule "Pause, Stop, Hide". Motion that starts by itself and lasts more than 5 s needs a way to stop it.
- **Background:** The protocol requires WCAG 2.2 at level AA, and level AA includes the pause rule. W3C says that all content on a page must meet the pause rule, so decorative motion counts too. W3C also counts a start from hovering, focusing, or scrolling as a start by itself. Today the rule does not apply, because the field moves only when a visitor moves it. With currents, the field moves by itself while the page shows. All options keep two rules of the protocol: reduced motion keeps the field still, and the site stores no data on the device.
- **Problem:** With currents, only the reduced-motion setting stops the motion. W3C lists that setting as a technique for a level AAA rule on motion from interactions. It is not a listed technique for the pause rule. The WCAG definition of a "mechanism" allows one that the platform gives, and W3C has not decided whether the setting counts.
- **Impact if no action:** The page can fail an accessibility audit at level A. A visitor who finds the motion distracting cannot stop it without a system setting.
- **Root question:** How do the currents meet the pause rule, so that no visitor is stuck with motion that distracts them?
- **Options:**
  - **A.** Rely on the reduced-motion setting only. The page does not change. The protocol must then record an exception to WCAG 2.2 AA. Effort: Small.
  - **B.** Run the currents once, for the first 5 s after the page opens. Then the field moves only under the pointer, as today. A restart on each pointer move would count as a new start by itself. B rests on the 5 s limit of the rule itself, not on a listed technique. Effort: Small.
  - **C.** Add a small "Pause motion" control, for example in the footer. It stops and restarts the currents. It cannot keep the choice between visits, because the site stores no data on the device. It also changes "Page content", which puts only the legal details in the footer. Effort: Medium.
  - **E.** Rely on the reduced-motion setting, and record it in "Accessibility" as the way to stop this decorative motion. The page does not change. Risk: W3C lists no such technique, two open W3C issues argue both ways, and an auditor can still fail the page. Effort: Small.
- **Left out:**
  - D, a start on the first pointer move, touch, or key press: W3C counts such a start as a start by itself, so D does not meet the rule.
  - A hidden control, such as a click on the background: it has no name, and the keyboard cannot reach it.
  - A remembered choice: the privacy rule forbids site data on the device.
  - A pause only while the pointer or the focus rests on an element: W3C says that it is not a way to pause.
  - Currents in bursts of 5 s with rests between them: W3C chose 5 s so that a visitor can wait out the motion, and bursts defeat that.
- **Wider fix:** C, when its control is one paused state that the frame loop checks before any motion that starts by itself, as it checks reduced motion today. A later motion of that kind then stops with the same control.
- **Previous examples:** None found.
- **Related:** Decision 3: options B and C of this decision shorten the time that the frame loop runs.
- **Recommendation:** C. It is the only option that keeps the currents and meets the rule through techniques that W3C lists.
- **Action:** ask the user, because option C adds a visible control that no requirement covers.

### 3. Set the frame budget of a moving field

- **Severity:** Medium. **Effort:** Medium.
- **Source:** Design.
- **Category:** performance.
- **Location:** `docs/protocol/homepage.md`, section "Grain field". `AGENTS.md`, section "Review focus".
- **Background:** The protocol says that while grains move, the script work of the field stays near 2 ms per frame. The reference is headless Chrome at 1440 × 900 and a pixel ratio of 2, during a pointer sweep. Currents move every grain in view, so the field draws the whole view again on each frame. Headless Chrome on this machine draws only about 23 to 30 frames a second, and a real screen draws 60 or more. All options keep one field that covers the page, one plain script, and the frosted panels, as the protocol says.
- **Problem:** In four runs of the prototype, the field of today took 1.5 to 2.5 ms per frame during a pointer sweep. Currents took 4.2 to 5.4 ms with no input and 5.2 to 7.2 ms during a sweep. The frame loop of currents also never rests while the page shows, so the cost per second grows with the frame rate of the screen.
- **Impact if no action:** Currents cannot ship under the rule in force. Phones and older laptops use more battery while the page is open.
- **Root question:** How much processor time may the field use while it moves on its own, per frame and per second that the page shows?
- **Options:**
  - **A.** Raise the budget of a moving field to near 8 ms per frame in the reference setup. Keep the pauses for a hidden tab and an off-screen field. Cost: more battery use, and the frosted panels blur again on each frame. Effort: Small.
  - **B.** Keep 2 ms. Draw the grains with WebGL, in one call per frame, and keep the 2D canvas as the fallback. WebGL removes only the drawing. The flow update alone took 1.2 to 3.2 ms, so B also needs a cheaper update. Effort: Large.
  - **C.** Keep 2 ms, and choose Flurry in place of currents. This reverses decision 1. Gusts took up to 3.9 ms during a gust, so only Flurry keeps 2 ms. Effort: Small.
  - **D.** Light currents: a third of the grains come loose and travel on a second canvas. The rest of the field stays still, as today. In two runs, this took 1.6 to 1.9 ms per frame with no input and 3.5 to 4.3 ms during a sweep. The budget must still rise, to near 4.5 ms. The outlines gather from fewer grains. Effort: Medium.
  - **E.** Move and redraw the currents 20 times a second, not on each frame. The pointer's wind keeps its 60 Hz steps. Add a budget per second with no input, and raise the cap per frame as in A. In one run, this cut the time per second from 129 to 88 ms at about 23 frames a second. By arithmetic, it cuts about two thirds on a 60 Hz screen. Risk: fast currents can look stepped. Effort: Medium.
  - **F.** Stop the currents after about a minute with no pointer, touch, key, or scroll input. The next input starts them again from where they stopped. A page left open then uses no processor time, as today. F works together with A, D, or E. Effort: Small.
- **Left out:**
  - A cheaper 2D redraw of every grain: without the drawing, the flow update alone took 1.2 to 1.8 ms with no input.
  - A worker thread: it moves the work but does not cut it, and it needs a second script.
  - Layers of grains that CSS slides: they cannot curl, so they lose the currents of decision 1.
  - A lower canvas resolution while the field moves: it changes the look of a grain.
- **Wider fix:** F. The stop after a minute with no input is a rule of the frame loop, so it limits any later motion that starts by itself.
- **Previous examples:** The budget came from the approved prototype on 2026-11-03: a mean of 2.25 ms during a 3 s pointer sweep.
- **Related:** Decision 2: options B and C of that decision shorten the time that the loop runs.
- **Recommendation:** E, together with F. E keeps the currents that the user chose and cuts their time per second, and F stops a forgotten tab. The first recommendation was A. B best protects the budget, at a Large cost.
- **Action:** ask the user, because option E changes the frame budget, which is a requirement in force.

## Design calls

My calls, on 2026-11-07:

- Both pages get the currents, because they share one field.
- A grain in an outline or its moat does not travel. When its card lets it
  go, the grain returns to its home, and the home then travels on.
- The currents come from a stream function: a sum of sine waves whose wave
  numbers repeat across the page. So the flow has no sources or sinks, the
  density stays even, and a grain that leaves one edge enters the same flow
  at the other edge.
- The homes travel. The home bins sort again on each frame. The card under
  each home refreshes twice a second.
- The clock of the currents runs only while the frame loop runs, so a
  hidden tab does not make the field jump ahead.
- The field draws the whole view in one pass on each frame of motion. It
  costs about a quarter less than the redraw by bins.
- The grains far from the view move less often, with a longer time step.
  So a long page costs about as much as a short one, and the density
  stays even where the visitor looks.
- First settings: a drift of 4 px/s to the right and 1.5 px/s down, and
  four waves of 230 to 620 px with speeds of 2.5 to 7 px/s. The review of
  the motion can tune them.
- The Mokly catalogue runs no scripts, so its screens keep the field at
  rest. The currents need no mockup change. Decision 2 can add one.

The prototype of the variations is in `.context/grain-motion/site`. Its
measurements are in `.context/grain-motion/measurements-light.txt` and
`.context/grain-motion/measurements-rate.txt`. The options check of
decisions 2 and 3 is in `.context/grain-field-currents/options-check-1.md`.

## Milestone 1: Mockups

Tags: mockup

Depends on: none

This milestone has work only when decision 2 is C. Otherwise, delete it.

- [ ] Add the pause control to the Homepage and Not-found page screens, at
      desktop and phone sizes. Blocked by decision 2.
- [ ] Run `npm run mockups:check`. Smoke-test the changed screens.
- [ ] Update the design and the TODOs of this plan for each problem that
      the mockups show.

## Milestone 2: Documentation and protocol

Depends on: 1

The protocol states the currents and the answers of decisions 2 and 3.

- [ ] In "Grain field" of `docs/protocol/homepage.md`, replace the rule
      that the field moves only in answer to a visitor. State the
      currents: the grains travel on their own, the density stays even,
      the pointer still blows grains aside, and an outline still gathers.
- [ ] Add decision 1 to the protocol, with its rejected alternatives.
- [ ] State when the frame loop runs and stops, as decision 2 says.
      Blocked by decision 2.
- [ ] State the frame budget of a moving field, as decision 3 says.
      Blocked by decision 3.
- [ ] State how a visitor stops the motion in "Accessibility". If
      decision 2 is C, also add the control to "Page content". Blocked by
      decision 2.
- [ ] Update the rule on the frame loop under "Review focus" in
      `AGENTS.md`. Blocked by decisions 2 and 3.
- [ ] Update the description of the field in `README.md` and the field
      rules in `src/README.md`.

## Milestone 3: Currents in the field

Tags: ui

Depends on: 2

The grains travel on the currents. If decision 3 is D, a third of the
grains travel on a second canvas, and this milestone changes to match.
Blocked by decisions 2 and 3.

- [ ] Add the flow of the currents as a module in `src/field/`, with no
      DOM: the waves for a page size, and the flow at a point.
- [ ] On each frame, move the homes of the free grains, wrap them at the
      page edges, and sort the home bins again.
- [ ] Keep the grains of an outline and its moat still. Refresh the card
      under each home twice a second.
- [ ] Run the frame loop while the currents move, as decision 2 says. Keep
      their clock still while the loop rests.
- [ ] Draw the whole view in one pass on each frame of motion.
- [ ] Move and draw the currents at the rate that decision 3 sets. If
      decision 3 includes F, stop the currents after about a minute with
      no input. Blocked by decision 3.
- [ ] Move the grains far from the view less often, with a longer time
      step.
- [ ] Node tests: the flow repeats across the page, a grain that leaves one
      edge enters the other, and the density stays even over a long run.
- [ ] Browser tests: the field keeps moving with no input. It stops when
      the tab is hidden or the field is off screen. It stays still with
      reduced motion. An outline gathers while the field moves. Change the
      test "The field stops when the grains rest" to match decision 2.
- [ ] Measure the script time per frame in the reference setup. Save the
      output under `.context/grain-field-currents/`.
- [ ] Smoke test: run `npm run dev`, watch the field, hover and focus each
      card, and check a phone size.

## Milestone 4: Pause control

Tags: ui

Depends on: 1, 3

This milestone has work only when decision 2 is C. Otherwise, delete it.

- [ ] Build the pause control from the mockup of Milestone 1. Without
      JavaScript, the page shows no control. Blocked by decision 2.
- [ ] Browser test: the control stops and restarts the currents, and the
      keyboard reaches it.

## Milestone 5: WebGL renderer

Tags: ui

Depends on: 3

This milestone has work only when decision 3 is B. Otherwise, delete it.

- [ ] Draw the grains with WebGL, and keep the 2D canvas as the fallback.
      Blocked by decision 3.
- [ ] Make the flow update cheap enough for 2 ms, for example with a lower
      update rate.
- [ ] Browser test: the field draws with WebGL off.
- [ ] Measure the script time per frame in the reference setup.

## Milestone 6: Verification, commit, review, and pull request

Depends on: every other milestone

- [ ] Run the targeted tests and the complete gate named in `AGENTS.md`.
- [ ] Commit with Conventional Commits and push the branch.
- [ ] Review the complete local diff against `origin/main` with the
      `implementation-review` skill after the push. Report the findings,
      then apply the fix rule: fix the `fix now` findings, record
      follow-up items under `plans/follow-ups/` for the rest, re-review
      once, and report.
- [ ] Delete this plan when the `plans` skill says, under "Deleting the
      plan".
- [ ] Open the pull request. Its description gives the decisions and the
      design calls of this plan with their dates, a permalink to this
      plan, and the follow-up items that the change adds.

## Post-merge follow-up (non-blocking)

- [ ] When the site is live, watch the currents on a real phone and in
      Safari. Check that the motion stays smooth.
