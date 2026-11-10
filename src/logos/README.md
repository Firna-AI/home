# Logos

One React component per logo. Each component holds the SVG markup of its
logo as JSX, so that the page draws the logo inline and loads no image
file.

| Component        | What it is                                                                                                                     |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `FirnaLogo`      | The Firna logo: the Close-off mark and the name "Firna" in Lora at weight 500, drawn as paths. Its accessible name is "Firna". |
| `MoklyMark`      | Mokly's real mark, from https://mokly.ai/favicon.svg, with fixed colours.                                                      |
| `ConductiveMark` | Conductive's real mark, from https://conductive.build/favicon.svg.                                                             |
| `FirnaUiMark`    | Firna UI: a white switch on blue.                                                                                              |
| `RedloopMark`    | Redloop: a loop around a job, on brick red.                                                                                    |
| `BowserMark`     | Bowser: a command prompt, on plum.                                                                                             |

The project marks are decorative, because each card shows the project's
name next to its mark. They take `MarkProps` from `markProps.ts`.

To add a project, add its mark here as one component, and name the
component in the project's entry in `src/projects.ts`.
