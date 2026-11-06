import type { MarkProps } from "./markProps";

/** Firna UI's mark. It is decorative, because the project's name is next to it. */
export function FirnaUiMark({ className }: MarkProps) {
  return (
    <svg className={className} viewBox="0 0 32 32" aria-hidden="true">
      <rect width="32" height="32" rx="7" fill="#3f6290" />
      <rect x="6" y="10" width="20" height="12" rx="6" fill="#fff" />
      <circle cx="20" cy="16" r="4" fill="#3f6290" />
    </svg>
  );
}
