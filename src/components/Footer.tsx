const BRAND_ASSETS_URL =
  "https://drive.google.com/drive/folders/1R6D4WJnCmyHuWpHWNN6SJGmRxIfQpXWZ";

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-border/60 px-6 py-6 sm:px-10">
      <div className="mx-auto flex max-w-5xl items-center justify-center">
        <a
          href={BRAND_ASSETS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="font-sans text-xs uppercase tracking-[0.28em] text-muted-foreground transition-colors duration-300 hover:text-foreground"
        >
          Brand Assets
        </a>
      </div>
    </footer>
  );
}
