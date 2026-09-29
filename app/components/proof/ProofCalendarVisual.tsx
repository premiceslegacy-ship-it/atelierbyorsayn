import { useEffect, useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight, X } from "lucide-react";

const weekdays = ["lun.", "mar.", "mer.", "jeu.", "ven.", "sam.", "dim."];

/** Septembre 2026 en vue mois, semaine commençant le lundi (31 août → 4 octobre). */
const cells = Array.from({ length: 35 }, (_, i) => {
  const offset = i - 1;
  if (offset < 0) return { day: 31, muted: true, key: "aug-31" };
  if (offset < 30) return { day: offset + 1, muted: false, key: `sep-${offset + 1}` };
  return { day: offset - 29, muted: true, key: `oct-${offset - 29}` };
});

const SENT_DAY = 4;
const PAID_DAY = 16;

type Tone = "sent" | "reminder" | "paid";
const events: Record<number, { label: string; tone: Tone; title: string; when: string; detail: string }> = {
  4: { label: "Envoyée", tone: "sent", title: "Facture FAC-2026-034 envoyée", when: "Vendredi 4 septembre", detail: "Dupont Industrie · 3 680 € TTC · échéance à 30 jours." },
  7: { label: "J+3", tone: "reminder", title: "Relance automatique n°1", when: "Lundi 7 septembre · J+3", detail: "Email cordial envoyé à Dupont Industrie, sans que vous ayez à y penser." },
  11: { label: "J+7", tone: "reminder", title: "Relance automatique n°2", when: "Vendredi 11 septembre · J+7", detail: "Ton un peu plus ferme, avec le rappel du délai de paiement légal." },
  16: { label: "Payée", tone: "paid", title: "Facture FAC-2026-034 payée", when: "Mercredi 16 septembre · J+12", detail: "3 680 € encaissés, contre 45 jours en moyenne avant Atelier." },
};

/** Calendrier au style Google Agenda : la facture est payée à J+12 au lieu de J+45. Événements cliquables, scénarios activables. */
export function ProofCalendarVisual({ active }: { active: boolean }) {
  const [selected, setSelected] = useState<number | null>(null);
  const [showAfter, setShowAfter] = useState(true);
  const [showBefore, setShowBefore] = useState(true);
  const [ready, setReady] = useState(false);

  /** Les barres et pastilles se déploient une fois la card visible. */
  useEffect(() => {
    if (!active) return;
    setReady(true);
  }, [active]);

  useEffect(() => {
    if (selected === null) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") setSelected(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected]);

  const selectedEvent = selected !== null ? events[selected] : undefined;

  return (
    <div
      className={`pf-app pf-cal ${ready ? "is-active" : ""} ${showAfter ? "" : "hide-after"} ${showBefore ? "" : "hide-before"}`}
      role="group"
      aria-label="Aperçu interactif du calendrier de paiement"
      onClick={(event) => { if (!(event.target as HTMLElement).closest(".pf-cal__pop, .pf-cal__chip")) setSelected(null); }}
    >
      <div className="pf-cal__bar">
        <span className="pf-cal__today">Aujourd'hui</span>
        <span className="pf-cal__nav"><ChevronLeft /><ChevronRight /></span>
        <strong>Septembre 2026</strong>
        <span className="pf-cal__view">Mois <ChevronDown /></span>
      </div>
      <div className="pf-cal__grid">
        {weekdays.map((weekday) => <span className="pf-cal__weekday" key={weekday}>{weekday}</span>)}
        {cells.map((cell, index) => {
          const isSep = !cell.muted;
          const event = isSep ? events[cell.day] : undefined;
          const afterSent = (isSep && cell.day >= SENT_DAY) || (cell.muted && index > 20);
          const withAtelier = isSep && cell.day >= SENT_DAY && cell.day <= PAID_DAY;
          const column = index % 7;
          const row = Math.floor(index / 7);
          const hidden = event && event.tone !== "sent" && !showAfter;
          return (
            <div className={`pf-cal__cell ${cell.muted ? "is-muted" : ""}`} key={cell.key} style={{ "--d": cell.day } as React.CSSProperties}>
              <span className={`pf-cal__num ${cell.day === PAID_DAY && isSep ? "is-today" : ""}`}>{cell.day}</span>
              {event && (
                <button
                  type="button"
                  className={`pf-cal__chip pf-cal__chip--${event.tone} ${hidden ? "is-hidden" : ""} ${selected === cell.day ? "is-selected" : ""}`}
                  style={{ "--e": cell.day } as React.CSSProperties}
                  aria-label={`${event.title}, ${event.when}`}
                  aria-expanded={selected === cell.day}
                  tabIndex={hidden ? -1 : 0}
                  onClick={() => setSelected(selected === cell.day ? null : cell.day)}
                >
                  {event.label}
                </button>
              )}
              {withAtelier && <i className="pf-cal__bar-after" />}
              {afterSent && <i className="pf-cal__bar-before" />}
              {selectedEvent && isSep && selected === cell.day && (
                <div className={`pf-cal__pop pf-cal__pop--${column <= 1 ? "l" : column >= 5 ? "r" : "c"} ${row >= 2 ? "is-up" : ""}`} role="dialog" aria-label={selectedEvent.title}>
                  <button type="button" className="pf-cal__pop-close" aria-label="Fermer" onClick={() => setSelected(null)}><X /></button>
                  <b><i className={`sq sq--${selectedEvent.tone}`} />{selectedEvent.title}</b>
                  <small>{selectedEvent.when}</small>
                  <p>{selectedEvent.detail}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="pf-cal__legend">
        <button type="button" className={`pf-cal__toggle ${showAfter ? "is-on" : ""}`} aria-pressed={showAfter} onClick={() => setShowAfter((value) => !value)}>
          <i className="dot dot--after" />Avec Atelier : payée en <b>12 jours</b>
        </button>
        <button type="button" className={`pf-cal__toggle ${showBefore ? "is-on" : ""}`} aria-pressed={showBefore} onClick={() => setShowBefore((value) => !value)}>
          <i className="dot dot--before" />Avant : payée en <b>45 jours</b>
        </button>
      </div>
    </div>
  );
}
