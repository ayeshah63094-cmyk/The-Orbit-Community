import { createFileRoute } from "@tanstack/react-router";
import { Footer } from "@/components/Footer";
import { OrbitMark } from "@/components/OrbitMark";
import { Particles } from "@/components/Particles";
import { Preloader } from "@/components/Preloader";
import { ThemeToggle } from "@/components/ThemeToggle";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <Preloader />

      {/* Ambient light layers */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "var(--ambient-gradient)" }}
      />
      <Particles />

      {/* Top bar */}
      <header className="relative z-10 flex items-center justify-between px-6 py-6 sm:px-10">
        <div className="font-display text-sm tracking-[0.3em] text-foreground/70">
          <a href="/">
            <img
              src="/Logo_Inverted.png"
              alt="Orbit Logo"
              className="h-8 w-8 dark:hidden"
            />
            <img src="/Logo.png" alt="Orbit Logo" className="hidden h-8 w-8 dark:block" />
          </a>
        </div>
        <div className="flex items-center gap-3 sm:gap-4">
          <ThemeToggle />
          <div className="hidden font-sans text-xs uppercase tracking-[0.28em] text-muted-foreground sm:block">
            Community · Est. 2026
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative z-10 mx-auto flex min-h-[calc(100vh-88px)] max-w-5xl flex-col items-center justify-center px-6 pb-20 text-center">
        <div
          className="mb-10 h-64 w-64 sm:h-80 sm:w-80 md:h-96 md:w-96"
          style={{ animation: "fade-up 900ms ease-out both" }}
        >
          <OrbitMark className="h-full w-full" />
        </div>

        <h1
          className="font-display text-4xl font-extralight tracking-tight text-foreground sm:text-6xl md:text-7xl"
          style={{ animation: "fade-up 900ms ease-out 150ms both" }}
        >
          The Orbit Community
        </h1>

        <div
          className="mt-4 flex items-center gap-3"
          style={{ animation: "fade-up 900ms ease-out 250ms both" }}
        >
          <span className="h-px w-8 bg-accent" />
          <p className="font-sans text-xs uppercase tracking-[0.35em] text-muted-foreground">
            Connecting People with Opportunities
          </p>
          <span className="h-px w-8 bg-accent" />
        </div>

        <p
          className="mt-8 max-w-3xl text-balance font-sans text-base leading-relaxed text-muted-foreground sm:text-lg"
          style={{ animation: "fade-up 900ms ease-out 350ms both" }}
        >
          Discover carefully curated hackathons, tech events,
          AI workshops, internships, jobs, and networking opportunities
          from leading developer communities and organizations.
        </p>

        <div
          className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:gap-4"
          style={{ animation: "fade-up 900ms ease-out 450ms both" }}
        >
          <a
            href="https://chat.whatsapp.com/Lvcr6SKDKYNEOwl9hBqsXo" target="_blank"
            className="group inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3.5 font-sans text-sm font-medium text-background shadow-[var(--shadow-glow)] transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-[0_18px_50px_-12px_rgba(17,17,17,0.35)] "
          >
            Join on WhatsApp
          </a>
          <a
            href="https://www.linkedin.com/company/theorbitcommunity/" target="_blank"
            className="group inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-7 py-3.5 font-sans text-sm font-medium text-foreground backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:border-accent hover:bg-secondary"
          >
            Follow on LinkedIn
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
