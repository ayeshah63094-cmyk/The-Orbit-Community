import { useEffect, useRef } from "react";

export default function MouseFollower() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const pos = useRef({ x: 0, y: 0 });
  const mouse = useRef({ x: 0, y: 0 });
  const disabled = useRef(false);
  const loaded = useRef(false);
  const visible = useRef(false);

  useEffect(() => {
    // detect coarse pointer or small screens (hide on mobile/tablet)
    const media = window.matchMedia("(pointer: coarse)");
    const updateDisabled = () => {
      disabled.current = media.matches || window.innerWidth <= 1024;
      if (dotRef.current) dotRef.current.style.display = disabled.current ? "none" : "block";
    };
    updateDisabled();
    media.addEventListener("change", updateDisabled);
    window.addEventListener("resize", updateDisabled);

    // mark loaded when page fully loads (or immediately if already loaded)
    const onLoad = () => {
      loaded.current = true;
    };
    if (document.readyState === "complete") onLoad();
    else window.addEventListener("load", onLoad, { once: true });

    // initialize to center to avoid jumps on first render
    pos.current.x = window.innerWidth / 2;
    pos.current.y = window.innerHeight / 2;
    mouse.current.x = pos.current.x;
    mouse.current.y = pos.current.y;

    const MAGNET_SELECTORS = "button, [role=\"button\"], #logo, .logo, img[alt*=logo]";
    const MAGNET_RADIUS = 96; // px
    const HIDE_DISTANCE = 28; // px - when very close, hide over element

    let magnetTarget: { x: number; y: number; el: Element } | null = null;
    const overInteractive = { current: false } as { current: boolean };

    const setVisible = (v: boolean) => {
      visible.current = v;
      if (!dotRef.current) return;
      dotRef.current.style.opacity = v ? "1" : "0";
      dotRef.current.style.pointerEvents = v ? "none" : "none";
      dotRef.current.style.transition = "transform 120ms ease, opacity 160ms ease";
    };

    // show when pointer enters the window (first move after load)
    const handlePointerMove = (e: PointerEvent) => {
      if (disabled.current) return;
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      // only show after page load and on first interaction
      if (loaded.current && !visible.current) {
        setVisible(true);
      }

      // find nearest magnet element
      const nodes = Array.from(document.querySelectorAll(MAGNET_SELECTORS));
      let nearest: { x: number; y: number; el: Element } | null = null;
      let nearestDist = Infinity;
      for (const el of nodes) {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = mouse.current.x - cx;
        const dy = mouse.current.y - cy;
        const d = Math.hypot(dx, dy);
        if (d < nearestDist) {
          nearestDist = d;
          nearest = { x: cx, y: cy, el };
        }
      }

      if (nearest && nearestDist < MAGNET_RADIUS) {
        magnetTarget = nearest;
      } else {
        magnetTarget = null;
      }
      // immediately hide when pointer is directly over an interactive element
      const elAtPoint = document.elementFromPoint(mouse.current.x, mouse.current.y);
      overInteractive.current = !!elAtPoint && !!elAtPoint.closest && !!elAtPoint.closest(MAGNET_SELECTORS);
      if (overInteractive.current) {
        setVisible(false);
      }
    };

    // hide when pointer leaves the window
    const handlePointerOut = (e: PointerEvent) => {
      // when relatedTarget is null, pointer left the document
      // @ts-ignore
      if ((e as any).relatedTarget === null) {
        setVisible(false);
      }
    };

    // also hide on window blur (user switches app)
    const handleWindowBlur = () => setVisible(false);

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("mouseout", handlePointerOut);
    window.addEventListener("blur", handleWindowBlur);

    let rafId = 0;
    const lerp = (a: number, b: number, n: number) => (1 - n) * a + n * b;
    const render = () => {
      const targetX = magnetTarget ? magnetTarget.x : mouse.current.x;
      const targetY = magnetTarget ? magnetTarget.y : mouse.current.y;

      pos.current.x = lerp(pos.current.x, targetX, magnetTarget ? 0.18 : 0.15);
      pos.current.y = lerp(pos.current.y, targetY, magnetTarget ? 0.18 : 0.15);

      if (dotRef.current) {
        const dx = mouse.current.x - pos.current.x;
        const dy = mouse.current.y - pos.current.y;
        const distToCursor = Math.hypot(dx, dy);

        const isHiddenOverElement = (magnetTarget && distToCursor < HIDE_DISTANCE) || overInteractive.current;

        dotRef.current.style.transform = `translate3d(${pos.current.x - 10}px, ${pos.current.y - 10}px, 0) scale(${isHiddenOverElement ? 0.6 : 1})`;
        dotRef.current.style.opacity = visible.current && !isHiddenOverElement ? "1" : "0";
      }
      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("mouseout", handlePointerOut);
      window.removeEventListener("blur", handleWindowBlur);
      media.removeEventListener("change", updateDisabled);
      window.removeEventListener("resize", updateDisabled);
      window.removeEventListener("load", onLoad);
    };
  }, []);

  return (
    <div
      ref={dotRef}
      aria-hidden
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: 18,
        height: 18,
        borderRadius: "50%",
        background: "black",
        boxShadow: "0 6px 18px rgba(0,0,0,0.18)",
        pointerEvents: "none",
        transform: "translate3d(-50%,-50%,0)",
        zIndex: 9999,
        transition: "transform 120ms ease, opacity 160ms ease, background 120ms ease",
        mixBlendMode: "normal",
        opacity: 0,
        display: "block",
      }}
    />
  );
}
