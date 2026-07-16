import { useEffect, useState } from "react";

export function Preloader() {
  const [hidden, setHidden] = useState(false);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setFading(true), 1100);
    const t2 = setTimeout(() => setHidden(true), 1800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (hidden) return null;

  return (
    <div
      aria-hidden
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background transition-opacity duration-700"
      style={{ opacity: fading ? 0 : 1, pointerEvents: fading ? "none" : "auto" }}
    >
      <div className="relative h-16 w-16">
        <svg viewBox="0 0 64 64" className="h-full w-full">
          <circle
            cx="32"
            cy="32"
            r="26"
            fill="none"
            stroke="var(--beige-soft)"
            strokeWidth="1.5"
          />
          <g style={{ transformOrigin: "32px 32px", animation: "orbit-spin 1.4s linear infinite" }}>
            <circle
              cx="32"
              cy="32"
              r="26"
              fill="none"
              stroke="var(--ink)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeDasharray="40 200"
            />
            <circle cx="58" cy="32" r="3" fill="var(--beige)" />
          </g>
          <circle cx="32" cy="32" r="6" fill="none" stroke="var(--ink)" strokeWidth="2" />
        </svg>
      </div>
    </div>
  );
}
