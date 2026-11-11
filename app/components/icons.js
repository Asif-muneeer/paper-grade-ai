// Professional inline SVG icons for PaperGradeAI.
// Hand-written stroke icons, no emoji, no external icon library.
// Palette: indigo #4F46E5, violet #7C3AED, amber #F59E0B, navy #0F172A.

function Svg({ size = 24, className, children }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {children}
    </svg>
  );
}

export function LogoIcon({ size = 24, className }) {
  return (
    <Svg size={size} className={className}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
      <path d="M9 15l2 2 4-4" />
    </Svg>
  );
}

export function DocIcon({ size = 24, className }) {
  return (
    <Svg size={size} className={className}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
      <path d="M9 13h6" />
      <path d="M9 17h6" />
    </Svg>
  );
}

export function PencilIcon({ size = 24, className }) {
  return (
    <Svg size={size} className={className}>
      <path d="M17 3a2.8 2.8 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5z" />
    </Svg>
  );
}

export function PenIcon({ size = 24, className }) {
  return (
    <Svg size={size} className={className}>
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" />
    </Svg>
  );
}

export function RubricIcon({ size = 24, className }) {
  return (
    <Svg size={size} className={className}>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M8 9h2" />
      <path d="M8 13h2" />
      <path d="M8 17h2" />
      <path d="M14 9h4" />
      <path d="M14 13h4" />
      <path d="M14 17h4" />
    </Svg>
  );
}

export function ChatIcon({ size = 24, className }) {
  return (
    <Svg size={size} className={className}>
      <path d="M21 11.5a8.4 8.4 0 0 1-8.5 8.4 8.6 8.6 0 0 1-3.8-.9L3 21l2-5.7a8.4 8.4 0 1 1 16-3.8z" />
    </Svg>
  );
}

export function ChartIcon({ size = 24, className }) {
  return (
    <Svg size={size} className={className}>
      <path d="M3 3v18h18" />
      <path d="M8 17v-6" />
      <path d="M13 17V7" />
      <path d="M18 17v-3" />
    </Svg>
  );
}

export function TrendIcon({ size = 24, className }) {
  return (
    <Svg size={size} className={className}>
      <path d="M3 17l6-6 4 4 8-8" />
      <path d="M15 7h6v6" />
    </Svg>
  );
}

export function LayersIcon({ size = 24, className }) {
  return (
    <Svg size={size} className={className}>
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </Svg>
  );
}

export function ScanIcon({ size = 24, className }) {
  return (
    <Svg size={size} className={className}>
      <path d="M3 7V5a2 2 0 0 1 2-2h2" />
      <path d="M17 3h2a2 2 0 0 1 2 2v2" />
      <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
      <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
      <path d="M3 12h18" />
    </Svg>
  );
}

export function UploadIcon({ size = 24, className }) {
  return (
    <Svg size={size} className={className}>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <path d="M17 8l-5-5-5 5" />
      <path d="M12 3v12" />
    </Svg>
  );
}

export function FlagIcon({ size = 24, className }) {
  return (
    <Svg size={size} className={className}>
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
      <path d="M4 22v-7" />
    </Svg>
  );
}

export function TargetIcon({ size = 24, className }) {
  return (
    <Svg size={size} className={className}>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </Svg>
  );
}

export function CalculatorIcon({ size = 24, className }) {
  return (
    <Svg size={size} className={className}>
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <path d="M8 6h8" />
      <path d="M8 11h.01" />
      <path d="M12 11h.01" />
      <path d="M16 11h.01" />
      <path d="M8 15h.01" />
      <path d="M12 15h.01" />
      <path d="M16 15h.01" />
      <path d="M8 19h.01" />
      <path d="M12 19h.01" />
      <path d="M16 19h.01" />
    </Svg>
  );
}

export function GradCapIcon({ size = 24, className }) {
  return (
    <Svg size={size} className={className}>
      <path d="M22 9L12 4 2 9l10 5 10-5z" />
      <path d="M6 11v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5" />
      <path d="M22 9v5" />
    </Svg>
  );
}

export function QuestionIcon({ size = 24, className }) {
  return (
    <Svg size={size} className={className}>
      <circle cx="12" cy="12" r="10" />
      <path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3" />
      <path d="M12 17h.01" />
    </Svg>
  );
}

export function LockIcon({ size = 24, className }) {
  return (
    <Svg size={size} className={className}>
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </Svg>
  );
}

export function NoShareIcon({ size = 24, className }) {
  return (
    <Svg size={size} className={className}>
      <path d="M17.9 17.9A10.4 10.4 0 0 1 12 20c-7 0-11-8-11-8a20.3 20.3 0 0 1 5.1-6.1" />
      <path d="M9.9 4.2A9.5 9.5 0 0 1 12 4c7 0 11 8 11 8a20.3 20.3 0 0 1-2.2 3.1" />
      <path d="M14.1 14.1a3 3 0 1 1-4.2-4.2" />
      <path d="M1 1l22 22" />
    </Svg>
  );
}

export function CheckCircleIcon({ size = 24, className }) {
  return (
    <Svg size={size} className={className}>
      <circle cx="12" cy="12" r="10" />
      <path d="M9 12l2 2 4-4" />
    </Svg>
  );
}

export function CheckIcon({ size = 24, className }) {
  return (
    <Svg size={size} className={className}>
      <path d="M20 6L9 17l-5-5" />
    </Svg>
  );
}

export function TrashIcon({ size = 24, className }) {
  return (
    <Svg size={size} className={className}>
      <path d="M3 6h18" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
      <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
    </Svg>
  );
}

export function WarningIcon({ size = 24, className }) {
  return (
    <Svg size={size} className={className}>
      <path d="M10.3 3.9L1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </Svg>
  );
}

export function BookIcon({ size = 24, className }) {
  return (
    <Svg size={size} className={className}>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </Svg>
  );
}

export function SparkleIcon({ size = 24, className }) {
  return (
    <Svg size={size} className={className}>
      <path d="M12 3v18" />
      <path d="M3 12h18" />
      <path d="M5.6 5.6l12.8 12.8" />
      <path d="M18.4 5.6L5.6 18.4" />
    </Svg>
  );
}

export function SunIcon({ size = 24, className }) {
  return (
    <Svg size={size} className={className}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="M4.9 4.9l1.4 1.4" />
      <path d="M17.7 17.7l1.4 1.4" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="M4.9 19.1l1.4-1.4" />
      <path d="M17.7 6.3l1.4-1.4" />
    </Svg>
  );
}
