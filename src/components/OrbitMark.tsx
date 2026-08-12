import { useEffect, useRef } from "react";

/**
 * Animated recreation of The Orbit Community mark:
 * - Outer thin orbit ring (rotates)
 * - Beige planet dot on the ring (rides rotation)
 * - Inner O (center circle, gently floats)
 * - Whole mark subtly floats and tilts on cursor
 */
export function OrbitMark({ className = "" }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrapRef.current;
    const tilt = tiltRef.current;
    if (!el || !tilt) return;

    let raf = 0;
    let tx = 0;
    let ty = 0;

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = (e.clientX - cx) / window.innerWidth;
      const dy = (e.clientY - cy) / window.innerHeight;
      tx = dx * 10; // deg
      ty = -dy * 10;
      if (!raf) {
        raf = requestAnimationFrame(() => {
          tilt.style.transform = `perspective(900px) rotateY(${tx}deg) rotateX(${ty}deg)`;
          raf = 0;
        });
      }
    };

    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className={`relative ${className}`}
      style={{ animation: "orbit-float 7s ease-in-out infinite" }}
    >
      {/* Bloom */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{ background: "var(--gradient-bloom)", filter: "blur(20px)" }}
      />
      <div
        ref={tiltRef}
        className="relative h-full w-full will-change-transform"
        style={{ transformStyle: "preserve-3d", transition: "transform 400ms ease-out" }}
      >
        <svg
          viewBox="0 0 400 400"
          className="h-full w-full"
          style={{
            filter: "drop-shadow(0 24px 40px rgba(17,17,17,0.10))",
          }}
        >
          <defs>
            <radialGradient id="dotGrad" cx="50%" cy="45%" r="55%">
              <stop offset="0%" stopColor="#D6C6B4" />
              <stop offset="100%" stopColor="#B29E88" />
            </radialGradient>
          </defs>

          {/* Rotating outer orbit + planet */}
          <g
            style={{
              transformOrigin: "200px 200px",
              animation: "orbit-spin 22s linear infinite",
            }}
          >
            <circle
              cx="200"
              cy="200"
              r="150"
              fill="none"
              stroke="var(--foreground)"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeDasharray="880 60"
            />
            {/* planet dot on ring at top-right */}
            <circle cx={200 + 200 * Math.cos(-Math.PI / 4)} cy={200 + 45 * Math.sin(-Math.PI / 4)} r="14" fill="url(#dotGrad)" />
          </g>

          {/* Center O (gentle float) */}
          <g
            style={{
              transformOrigin: "200px 200px",
              animation: "core-float 5s ease-in-out infinite",
            }}
          >
            <circle
              cx="200"
              cy="200"
              r="62"
              fill="none"
              stroke="var(--foreground)"
              strokeWidth="10"
            />
          </g>
        </svg>
      </div>
    </div>
  );
}
