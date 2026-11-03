import type { MarkProps } from "./markProps";

/** Redloop's mark. It is decorative, because the project's name is next to it. */
export function RedloopMark({ className }: MarkProps) {
  return (
    <svg className={className} viewBox="0 0 32 32" aria-hidden="true">
      <rect width="32" height="32" rx="7" fill="#b0473a" />
      <path
        d="M22.76 14.19A7 7 0 1 1 16.24 9"
        fill="none"
        stroke="#fff"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M17.15 5.27L21.61 9.92L15.83 12.76Z"
        fill="#fff"
        stroke="#fff"
        strokeWidth=".8"
        strokeLinejoin="round"
      />
      <circle cx="16" cy="16" r="2.6" fill="#fff" />
    </svg>
  );
}
