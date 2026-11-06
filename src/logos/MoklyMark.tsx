import type { MarkProps } from "./markProps";

/** Mokly's mark. It is decorative, because the project's name is next to it. */
export function MoklyMark({ className }: MarkProps) {
  return (
    <svg className={className} viewBox="0 0 32 32" aria-hidden="true">
      <rect
        x="3"
        y="3"
        width="20"
        height="21"
        rx="4"
        fill="#2f5945"
        opacity=".3"
      />
      <rect x="9" y="8" width="20" height="21" rx="4" fill="#2f5945" />
      <path
        d="M14 15h10M14 20h7"
        fill="none"
        stroke="#ffffff"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
