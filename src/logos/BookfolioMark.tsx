import type { MarkProps } from "./markProps";

/** Bookfolio's mark. It is decorative, because the project's name is next to it. */
export function BookfolioMark({ className }: MarkProps) {
  return (
    <svg className={className} viewBox="0 0 64 64" aria-hidden="true">
      <rect width="64" height="64" rx="14" fill="#4f7864" />
      <path
        fill="#ffffff"
        d="M45.96 38.76Q45.96 43.06 42.74 45.4Q39.52 47.75 33.8 47.75H18.04V16.25H32.46Q38.23 16.25 41.19 18.25Q44.15 20.25 44.15 24.16Q44.15 26.85 42.66 28.69Q41.18 30.54 38.14 31.18Q41.96 31.63 43.96 33.59Q45.96 35.54 45.96 38.76ZM37.51 25.06Q37.51 22.93 36.16 22.04Q34.81 21.15 32.15 21.15H24.63V28.95H32.19Q34.98 28.95 36.25 27.98Q37.51 27 37.51 25.06ZM39.34 38.25Q39.34 33.82 32.99 33.82H24.63V42.85H33.24Q36.42 42.85 37.88 41.7Q39.34 40.55 39.34 38.25Z"
      />
    </svg>
  );
}
