/**
 * Illustrations maison, style feutre : un seul trait encre (--ink), coins arrondis,
 * un unique accent orange par icône. Pas de fond, pas de forme pleine, pas de halo —
 * le dessin seul, comme un croquis technique.
 */

const STROKE = "#161613";
const ACCENT = "#ff9f1c";

export function IconDevis({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path d="M13 5 h16 l7 7 v29 a2 2 0 0 1 -2 2 h-21 a2 2 0 0 1 -2 -2 v-34 a2 2 0 0 1 2 -2 Z" stroke={STROKE} strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M29 5 v7 h7" stroke={STROKE} strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M15 24 h18" stroke={STROKE} strokeWidth="1.4" strokeLinecap="round" />
      <path d="M15 30 h18" stroke={STROKE} strokeWidth="1.4" strokeLinecap="round" />
      <path d="M15 36 h11" stroke={STROKE} strokeWidth="1.4" strokeLinecap="round" />
      <path d="M16 15.5 L19.5 19 L26 12" stroke={ACCENT} strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconRelance({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path d="M24 8c-6.6 0-11 4.9-11 11v8.5l-3.4 5.3c-.5.8.1 1.7 1 1.7h26.8c.9 0 1.5-.9 1-1.7L35 27.5V19c0-6.1-4.4-11-11-11Z" stroke={STROKE} strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M20 36.5a4 4 0 0 0 8 0" stroke={STROKE} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M35.5 8.5 c2.2 1.6 3.4 3.6 3.6 6.3" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" />
      <circle cx="36" cy="10" r="2" fill={ACCENT} />
    </svg>
  );
}

export function IconPointage({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <circle cx="24" cy="26" r="15.5" stroke={STROKE} strokeWidth="1.6" />
      <path d="M24 17.5 v9 l6.5 4" stroke={STROKE} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M19 6.5 h10" stroke={STROKE} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M39 12 l2.4 -2.4" stroke={STROKE} strokeWidth="1.4" strokeLinecap="round" />
      <path d="M24 10.5 v2.2" stroke={ACCENT} strokeWidth="2.1" strokeLinecap="round" />
    </svg>
  );
}

export function IconMarge({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path d="M6 40 h36" stroke={STROKE} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M12 40 v-11" stroke={STROKE} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M22 40 v-18" stroke={STROKE} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M32 40 v-25" stroke={STROKE} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M8 27 L18 18 L24 22.5 L37 9" stroke={ACCENT} strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M30 9 h7 v7" stroke={ACCENT} strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconCalendrier({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <rect x="7" y="10" width="34" height="30" rx="4" stroke={STROKE} strokeWidth="1.6" />
      <path d="M7 18 h34" stroke={STROKE} strokeWidth="1.6" />
      <path d="M15 6.5 v7" stroke={STROKE} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M33 6.5 v7" stroke={STROKE} strokeWidth="1.6" strokeLinecap="round" />
      <rect x="14" y="24" width="6" height="6" rx="1.4" stroke={ACCENT} strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M27 27 h9" stroke={STROKE} strokeWidth="1.4" strokeLinecap="round" />
      <path d="M27 33 h6" stroke={STROKE} strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export function IconConformite({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path d="M24 6.5 L38 12v11c0 10-6 15.8-14 18.5C16 39.3 10 33.5 10 23V12Z" stroke={STROKE} strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M17.5 23.5 L22 28 L31 17.5" stroke={ACCENT} strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconChantier({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path d="M8 34 L18 13 L25 27 L30 17 L40 34" stroke={STROKE} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 34 h36" stroke={STROKE} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M18 13 l2.6 4.6" stroke={ACCENT} strokeWidth="2.1" strokeLinecap="round" />
    </svg>
  );
}

export function IconTresorerie({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <rect x="6" y="14" width="36" height="22" rx="4" stroke={STROKE} strokeWidth="1.6" />
      <path d="M6 20 h36" stroke={STROKE} strokeWidth="1.6" />
      <circle cx="24" cy="27.5" r="4.6" stroke={ACCENT} strokeWidth="1.9" />
      <path d="M12 30 h3" stroke={STROKE} strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export function IconVoix({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <rect x="18" y="6" width="12" height="22" rx="6" stroke={STROKE} strokeWidth="1.6" />
      <path d="M12 22c0 7 5.4 12.5 12 12.5S36 29 36 22" stroke={STROKE} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M24 34.5 v7" stroke={STROKE} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M17 41.5 h14" stroke={STROKE} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M23 11 v10" stroke={ACCENT} strokeWidth="2.1" strokeLinecap="round" />
    </svg>
  );
}

export function IconPropose({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path d="M24 6 v6" stroke={STROKE} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M24 30 v9" stroke={STROKE} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M17.5 42 h13" stroke={STROKE} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M14.5 24 c0 -5.2 4.2 -9.5 9.5 -9.5 s9.5 4.3 9.5 9.5 c0 4 -2.4 6 -3.8 8.2 -1 1.6 -1.4 2.7 -1.4 4.2 h-8.6 c0 -1.5 -.4 -2.6 -1.4 -4.2 -1.4 -2.2 -3.8 -4.2 -3.8 -8.2Z" stroke={STROKE} strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M9 18 l4.4 2.4" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" />
      <path d="M39 18 l-4.4 2.4" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function IconApprend({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path d="M9 24a15 15 0 0 1 25.6 -10.6" stroke={STROKE} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M39 24a15 15 0 0 1 -25.6 10.6" stroke={STROKE} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M34.6 7.5 v6.4 h-6.4" stroke={ACCENT} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13.4 40.5 v-6.4 h6.4" stroke={STROKE} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Horloge : l'aiguille balaie la moitié du cadran pour illustrer les heures rendues. */
export function ProofClock({ className, active }: { className?: string; active?: boolean }) {
  return (
    <svg className={`${className ?? ""} proof-illu ${active ? "is-active" : ""}`} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <circle cx="32" cy="34" r="21" stroke={STROKE} strokeWidth="1.7" />
      <path d="M32 34 V17.5" className="proof-illu__hand-hour" stroke={ACCENT} strokeWidth="2.6" strokeLinecap="round" />
      <path d="M32 34 L44 34" className="proof-illu__hand-min" stroke={STROKE} strokeWidth="2" strokeLinecap="round" />
      <circle cx="32" cy="34" r="2.2" fill={STROKE} />
      <path d="M25 8.5 h14" stroke={STROKE} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M50.5 15.5 l2.8 -2.8" stroke={STROKE} strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

/** Facture qui passe du rouge (impayée) au vert (encaissée) une fois la carte visible. */
export function ProofInvoice({ className, active }: { className?: string; active?: boolean }) {
  return (
    <svg className={`${className ?? ""} proof-illu ${active ? "is-active" : ""}`} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <path d="M18 8 h20 l8 8 v36 a2 2 0 0 1 -2 2 h-26 a2 2 0 0 1 -2 -2 v-42 a2 2 0 0 1 2 -2 Z" stroke={STROKE} strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M38 8 v8 h8" stroke={STROKE} strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M23 30 h18" stroke={STROKE} strokeWidth="1.3" strokeLinecap="round" />
      <path d="M23 36 h18" stroke={STROKE} strokeWidth="1.3" strokeLinecap="round" />
      <circle className="proof-illu__badge" cx="46" cy="44" r="11" fill="#ffd9d9" />
      <path className="proof-illu__cross" d="M42 40 L50 48 M50 40 L42 48" stroke="#a01212" strokeWidth="2.3" strokeLinecap="round" />
      <path className="proof-illu__check" d="M41.5 44.3 L44.8 47.6 L51 41" stroke="#2f6b12" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Case du calendrier qui se coche, pour appuyer le raccourcissement du délai de paiement. */
export function ProofCalendarCheck({ className, active }: { className?: string; active?: boolean }) {
  return (
    <svg className={`${className ?? ""} proof-illu ${active ? "is-active" : ""}`} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <rect x="10" y="14" width="44" height="38" rx="5" stroke={STROKE} strokeWidth="1.6" />
      <path d="M10 24 h44" stroke={STROKE} strokeWidth="1.6" />
      <path d="M20 9 v9" stroke={STROKE} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M44 9 v9" stroke={STROKE} strokeWidth="1.6" strokeLinecap="round" />
      <rect x="17" y="30" width="9" height="9" rx="2" stroke="#c9c2b3" strokeWidth="1.4" />
      <rect className="proof-illu__cell" x="30" y="30" width="9" height="9" rx="2" fill={ACCENT} />
      <path className="proof-illu__cell-check" d="M32 34.5 L34 36.5 L37.5 32.5" stroke="#161613" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="17" y="41" width="9" height="9" rx="2" stroke="#c9c2b3" strokeWidth="1.4" />
    </svg>
  );
}

/** Devis façon Telegram : un avion en papier glisse hors du badge puis cède la place à une coche d'envoi confirmé. */
export function ProofSent({ className, active }: { className?: string; active?: boolean }) {
  return (
    <svg className={`${className ?? ""} proof-illu ${active ? "is-active" : ""}`} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <path d="M10 10 h16 l6 6 v30 a2 2 0 0 1 -2 2 h-20 a2 2 0 0 1 -2 -2 v-34 a2 2 0 0 1 2 -2 Z" stroke={STROKE} strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M26 10 v6 h6" stroke={STROKE} strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M15 28 h13" stroke={STROKE} strokeWidth="1.3" strokeLinecap="round" />
      <path d="M15 34 h13" stroke={STROKE} strokeWidth="1.3" strokeLinecap="round" />
      <circle className="proof-illu__send-badge" cx="46" cy="44" r="11" fill={ACCENT} />
      <path className="proof-illu__plane" d="M39.5 44.5 L53 38.5 L45.7 52 L44.3 46.2 Z" fill="#161613" />
      <path className="proof-illu__plane" d="M44.3 46.2 L53 38.5 L42.5 46.5 Z" fill="#161613" fillOpacity=".55" />
      <path className="proof-illu__send-check" d="M41.5 44.3 L44.8 47.6 L51 41" stroke="#161613" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconEquipe({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <circle cx="17.5" cy="18" r="6" stroke={STROKE} strokeWidth="1.6" />
      <path d="M7 37c1-7 5-10.5 10.5-10.5S27 30 28 37" stroke={STROKE} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="32" cy="20.5" r="4.8" stroke={STROKE} strokeWidth="1.5" />
      <path d="M25.5 37c.8-5.6 4-8.6 8-8.6 3.7 0 6.8 2.6 7.9 7.3" stroke={ACCENT} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
