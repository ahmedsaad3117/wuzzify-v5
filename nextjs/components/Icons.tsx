/**
 * IconSprite — render once at root; reference via <svg><use href="#id" /></svg>.
 * All icons are 1.5px stroke, lucide-style, monochrome (currentColor).
 */
export default function IconSprite() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden>
      <defs>
        {/* Wuzzify W mark */}
        <symbol id="wmark" viewBox="0 0 121 87">
          <rect x="0"  y="0"  width="25" height="64" rx="1.5" fill="currentColor" />
          <rect x="49" y="0"  width="24" height="64" rx="1.5" fill="currentColor" />
          <rect x="98" y="21" width="24" height="43" rx="1.5" fill="currentColor" />
          <polygon points="18,66 48,66 48,87 27,87" fill="currentColor" />
          <polygon points="66,66 97,66 97,87 76,87" fill="currentColor" />
        </symbol>

        <symbol id="i-sales" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square">
          <path d="M3 3v18h18" /><path d="M7 14l4-4 3 3 6-7" /><path d="M15 6h5v5" />
        </symbol>
        <symbol id="i-support" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square">
          <path d="M4 12a8 8 0 0116 0v5a2 2 0 01-2 2h-2v-7h4" />
          <path d="M4 12v5a2 2 0 002 2h2v-7H4" />
        </symbol>
        <symbol id="i-seo" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square">
          <circle cx="11" cy="11" r="7" /><path d="M21 21l-5-5" />
        </symbol>
        <symbol id="i-marketing" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square">
          <path d="M3 11l16-6v14L3 13v-2z" /><path d="M7 13v5l3 1" />
        </symbol>
        <symbol id="i-ocr" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square">
          <rect x="4" y="3" width="14" height="18" rx="1" />
          <path d="M8 8h6M8 12h6M8 16h4" />
        </symbol>
        {/* RTL "next" arrow points left */}
        <symbol id="i-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square">
          <path d="M5 12h14" /><path d="M13 6l-7 6 7 6" />
        </symbol>
        <symbol id="i-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
          <path d="M5 12l5 5 9-11" />
        </symbol>
        <symbol id="i-x" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
          <path d="M6 6l12 12M18 6l-12 12" />
        </symbol>
        <symbol id="i-bolt" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square">
          <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />
        </symbol>
        <symbol id="i-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
          <path d="M6 9l6 6 6-6" />
        </symbol>
      </defs>
    </svg>
  );
}

/** Convenience component: <Icon id="i-check" className="size-4 text-brand-600" /> */
export function Icon({
  id,
  className = "",
  width = 16,
  height = 16,
}: {
  id: string;
  className?: string;
  width?: number;
  height?: number;
}) {
  return (
    <svg width={width} height={height} className={className} aria-hidden>
      <use href={`#${id}`} />
    </svg>
  );
}
