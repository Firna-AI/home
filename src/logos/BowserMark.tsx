import type { MarkProps } from "./markProps";

/** Bowser's mark. It is decorative, because the project's name is next to it. */
export function BowserMark({ className }: MarkProps) {
  return (
    <svg className={className} viewBox="0 0 32 32" aria-hidden="true">
      <rect width="32" height="32" rx="7" fill="#6a4b7c" />
      <path
        d="M9 10.5l5.5 5.5L9 21.5M17 22h6.5"
        fill="none"
        stroke="#fff"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
