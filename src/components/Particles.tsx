import { useMemo } from "react";

export function Particles({ count = 18 }: { count?: number }) {
  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const size = 2 + Math.random() * 4;
        return {
          id: i,
          left: Math.random() * 100,
          top: 60 + Math.random() * 40,
          size,
          delay: Math.random() * 12,
          duration: 14 + Math.random() * 14,
          px: (Math.random() - 0.5) * 120,
          py: -(120 + Math.random() * 240),
          opacity: 0.25 + Math.random() * 0.35,
        };
      }),
    [count],
  );

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            background: "var(--beige)",
            opacity: p.opacity,
            filter: "blur(0.5px)",
            animation: `particle-drift ${p.duration}s linear ${p.delay}s infinite`,
            ["--px" as string]: `${p.px}px`,
            ["--py" as string]: `${p.py}px`,
          }}
        />
      ))}
    </div>
  );
}
