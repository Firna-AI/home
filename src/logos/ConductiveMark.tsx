import type { MarkProps } from "./markProps";

/** Conductive's mark. It is decorative, because the project's name is next to it. */
export function ConductiveMark({ className }: MarkProps) {
  return (
    <svg className={className} viewBox="0 0 32 32" aria-hidden="true">
      <defs>
        <linearGradient
          id="conductive-tile"
          x1="0"
          y1="0"
          x2="0"
          y2="32"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#2c2f35" />
          <stop offset="1" stopColor="#0f1114" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="7" fill="url(#conductive-tile)" />
      <rect x="12" y="4" width="12" height="2" rx="1" fill="#eef0f3" />
      <rect x="8" y="8" width="14" height="2" rx="1" fill="#eef0f3" />
      <rect x="6" y="12" width="6" height="2" rx="1" fill="#eef0f3" />
      <rect x="6" y="16" width="8" height="2" rx="1" fill="#eef0f3" />
      <rect x="8" y="20" width="12" height="2" rx="1" fill="#eef0f3" />
      <rect x="12" y="24" width="12" height="2" rx="1" fill="#eef0f3" />
    </svg>
  );
}
