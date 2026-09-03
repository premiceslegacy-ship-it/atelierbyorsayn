import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { SETUP_PRICE, PRICING_TIERS } from "../data/site";

type AiCostSimulatorProps = {
  onOpenLeadModal: (source: string) => void;
  source: string;
};

type UsageItem = {
  id: string;
  label: string;
  unit: string;
  defaultQuantity: number;
  step: number;
  maxQuantity: number;
  costPerUnit: number;
  minutesSavedPerUnit: number;
};

/**
 * Coûts par appel en euros, dérivés du coût réel OpenRouter (provider_cost, usage_logs) mesuré
 * sur les modèles en production pour chaque fonctionnalité. Temps gagné par usage : cohérent
 * avec les témoignages clients affichés ailleurs (chiffrage sous 3 min, 10h/mois via relances).
 */
const USAGE_ITEMS: UsageItem[] = [
  { id: "quote_analysis", label: "Devis chiffrés ou analysés par les assistants d'Atelier", unit: "devis / mois", defaultQuantity: 30, step: 5, maxQuantity: 500, costPerUnit: 0.0065, minutesSavedPerUnit: 15 },
  { id: "sarah_assistant", label: "Échanges avec Sarah, l'assistante d'Atelier", unit: "échanges / mois", defaultQuantity: 80, step: 10, maxQuantity: 2000, costPerUnit: 0.042, minutesSavedPerUnit: 3 },
  { id: "email_draft", label: "Relances clients rédigées par les assistants d'Atelier", unit: "relances / mois", defaultQuantity: 15, step: 5, maxQuantity: 500, costPerUnit: 0.0001, minutesSavedPerUnit: 5 },
  { id: "weekly_summary", label: "Comptes rendus de chantier générés", unit: "résumés / mois", defaultQuantity: 4, step: 1, maxQuantity: 100, costPerUnit: 0.00013, minutesSavedPerUnit: 10 },
  { id: "task_suggestion", label: "Suggestions de tâches des assistants d'Atelier", unit: "suggestions / mois", defaultQuantity: 20, step: 5, maxQuantity: 500, costPerUnit: 0.0002, minutesSavedPerUnit: 2 },
  { id: "catalog_extract", label: "Imports de catalogue par les assistants d'Atelier", unit: "imports / mois", defaultQuantity: 1, step: 1, maxQuantity: 50, costPerUnit: 0.0037, minutesSavedPerUnit: 20 },
];

const EUR_FORMAT = new Intl.NumberFormat("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const MONTHLY_REFERENCE = PRICING_TIERS[1].price;
const YEAR_OPTIONS = [2, 3, 5] as const;

type MaterialId = "fuel" | "drill" | "generator" | "saw" | "scaffold" | "tiles" | "compressor" | "trailer" | "excavator" | "van";

/** Repères prix matériel/outillage BTP, ordre décroissant, pour situer un montant perdu sans jargon financier. */
const MATERIAL_EQUIVALENTS: { id: MaterialId; price: number; label: string }[] = [
  { id: "van", price: 15000, label: "un utilitaire d'occasion" },
  { id: "excavator", price: 9000, label: "un mini-pelle de location à l'année" },
  { id: "trailer", price: 6000, label: "une remorque de chantier équipée" },
  { id: "compressor", price: 4000, label: "un compresseur d'atelier" },
  { id: "tiles", price: 2500, label: "une palette de carrelage haut de gamme" },
  { id: "scaffold", price: 1500, label: "un échafaudage roulant" },
  { id: "saw", price: 900, label: "une découpeuse-tronçonneuse thermique" },
  { id: "generator", price: 600, label: "un groupe électrogène de chantier" },
  { id: "drill", price: 300, label: "une perceuse-visseuse pro" },
  { id: "fuel", price: 150, label: "un plein d'essieu pour l'utilitaire" },
];

/** Sélection gloutonne : les postes les plus gros d'abord, jusqu'à 3 repères, pour rester lisible. */
function getMaterialEquivalents(amount: number): { id: MaterialId; label: string }[] {
  if (amount <= 0) return [];
  const picks: { id: MaterialId; label: string }[] = [];
  let remaining = amount;
  for (const entry of MATERIAL_EQUIVALENTS) {
    if (picks.length >= 3) break;
    if (entry.price <= remaining) {
      picks.push(entry);
      remaining -= entry.price;
    }
  }
  if (picks.length === 0) picks.push(MATERIAL_EQUIVALENTS[MATERIAL_EQUIVALENTS.length - 1]);
  return picks;
}

function useCountUp(target: number, active: boolean, duration = 700) {
  const [value, setValue] = useState(0);
  const frame = useRef<number | null>(null);

  useEffect(() => {
    if (!active) {
      setValue(0);
      return;
    }
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(target * eased);
      if (progress < 1) frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);
    return () => {
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [target, active, duration]);

  return value;
}

export function AiCostSimulator({ onOpenLeadModal, source }: AiCostSimulatorProps) {
  const [quantities, setQuantities] = useState<Record<string, number>>(() =>
    Object.fromEntries(USAGE_ITEMS.map((item) => [item.id, item.defaultQuantity]))
  );
  const [years, setYears] = useState<(typeof YEAR_OPTIONS)[number]>(2);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const adjustQuantity = (id: string, direction: 1 | -1) => {
    setQuantities((prev) => {
      const item = USAGE_ITEMS.find((entry) => entry.id === id)!;
      const next = Math.max(0, Math.min(item.maxQuantity, prev[id] + direction * item.step));
      return { ...prev, [id]: next };
    });
  };

  const setQuantity = (id: string, rawValue: string) => {
    const item = USAGE_ITEMS.find((entry) => entry.id === id)!;
    const parsed = Math.max(0, Math.min(item.maxQuantity, Math.round(Number(rawValue.replace(/[^0-9]/g, "")) || 0)));
    setQuantities((prev) => ({ ...prev, [id]: parsed }));
  };

  const { monthlyCost, minutesPerMonth } = useMemo(() => {
    return USAGE_ITEMS.reduce(
      (acc, item) => {
        const quantity = quantities[item.id] ?? 0;
        return {
          monthlyCost: acc.monthlyCost + quantity * item.costPerUnit,
          minutesPerMonth: acc.minutesPerMonth + quantity * item.minutesSavedPerUnit,
        };
      },
      { monthlyCost: 0, minutesPerMonth: 0 }
    );
  }, [quantities]);

  const hoursPerWeek = minutesPerMonth / 60 / 4.33;
  const hoursPerMonth = minutesPerMonth / 60;
  const hoursPerYear = hoursPerMonth * 12;

  const months = years * 12;
  const subscriptionCost = MONTHLY_REFERENCE * months;
  const ownCost = SETUP_PRICE + monthlyCost * months;
  const savings = Math.max(0, subscriptionCost - ownCost);

  const animatedCost = useCountUp(monthlyCost, mounted);
  const animatedWeek = useCountUp(hoursPerWeek, mounted, 800);
  const animatedMonth = useCountUp(hoursPerMonth, mounted, 900);
  const animatedYear = useCountUp(hoursPerYear, mounted, 1000);
  const animatedSavings = useCountUp(savings, mounted, 1100);
  const materialEquivalents = useMemo(() => getMaterialEquivalents(savings), [savings]);

  return (
    <div id="simulateur-ia" className="ai-simulator" role="region" aria-label="Simulateur d'économies">
      <p className="ai-simulator__eyebrow">Vos économies, en détail</p>
      <h3>Vos propres accès IA. Vous payez le fournisseur, à la source.</h3>
      <p className="ai-simulator__lead">
        Réglez votre volume pour voir ce que ça coûte vraiment, et le temps que ça vous rend.
      </p>

      <ul className="ai-simulator__usage">
        {USAGE_ITEMS.map((item) => (
          <li key={item.id} className="ai-simulator__usage-row">
            <span className="ai-simulator__usage-label">{item.label}</span>
            <div className="ai-simulator__stepper">
              <button type="button" aria-label={`Diminuer ${item.label}`} onClick={() => adjustQuantity(item.id, -1)}>–</button>
              <input
                type="text"
                inputMode="numeric"
                className="ai-simulator__stepper-value"
                aria-label={item.label}
                value={quantities[item.id]}
                onChange={(event) => setQuantity(item.id, event.target.value)}
              />
              <button type="button" aria-label={`Augmenter ${item.label}`} onClick={() => adjustQuantity(item.id, 1)}>+</button>
            </div>
            <span className="ai-simulator__usage-unit">{item.unit}</span>
          </li>
        ))}
      </ul>

      <div className="ai-simulator__cost">
        <span className="ai-simulator__cost-label">Vous payez seulement</span>
        <strong className="ai-simulator__cost-value">{EUR_FORMAT.format(animatedCost)} €<span> / mois</span></strong>
      </div>

      <div className="ai-simulator__time">
        <span className="ai-simulator__figure-label">Temps rendu, à ce volume</span>
        <div className="ai-simulator__time-grid">
          <div className="ai-simulator__time-cell">
            <div className="ai-simulator__clock" aria-hidden="true"><ClockIcon mounted={mounted} /></div>
            <strong>{animatedWeek.toLocaleString("fr-FR", { maximumFractionDigits: 1 })} h</strong>
            <span>par semaine</span>
          </div>
          <div className="ai-simulator__time-cell">
            <div className="ai-simulator__clock" aria-hidden="true"><ClockIcon mounted={mounted} /></div>
            <strong>{Math.round(animatedMonth)} h</strong>
            <span>par mois</span>
          </div>
          <div className="ai-simulator__time-cell">
            <div className="ai-simulator__clock" aria-hidden="true"><ClockIcon mounted={mounted} /></div>
            <strong>{Math.round(animatedYear)} h</strong>
            <span>par an</span>
          </div>
        </div>
      </div>

      <div className="ai-simulator__savings">
        <div className="ai-simulator__toggle ai-simulator__toggle--savings" role="group" aria-label="Durée de comparaison">
          {YEAR_OPTIONS.map((option) => (
            <button
              key={option}
              type="button"
              className={years === option ? "is-active" : ""}
              onClick={() => setYears(option)}
            >
              {option} ans
            </button>
          ))}
        </div>
        <div className="ai-simulator__savings-grid">
          <div className="ai-simulator__savings-col">
            <span className="ai-simulator__figure-label">Voici mes économies</span>
            <strong className="ai-simulator__savings-value">{Math.round(animatedSavings).toLocaleString("fr-FR")} €</strong>
            <span className="ai-simulator__figure-note">sur {years} ans, une fois le setup de {SETUP_PRICE.toLocaleString("fr-FR")} € payé</span>
          </div>
          <div className="ai-simulator__savings-col">
            <span className="ai-simulator__figure-label">Ce que j'aurais perdu</span>
            <strong className="ai-simulator__savings-value ai-simulator__savings-value--loss">{Math.round(animatedSavings).toLocaleString("fr-FR")} €</strong>
            <span className="ai-simulator__figure-note">en restant sur un abonnement, sur {years} ans</span>
            <ul className="ai-simulator__equivalents">
              {materialEquivalents.map((entry) => (
                <li key={entry.id}>
                  <span className="ai-simulator__equivalent-icon" aria-hidden="true"><MaterialIcon id={entry.id} /></span>
                  {entry.label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <button type="button" className="button button--primary ai-simulator__cta" onClick={() => onOpenLeadModal(source)}>
        Parler de mon volume avec Samuel <ArrowRight />
      </button>
    </div>
  );
}

/** Icônes tracées au trait, dans l'esprit croquis des chiffres d'étape maison — pas de remplissage, pas de badge. */
const MATERIAL_ICON_PATHS: Record<MaterialId, string> = {
  fuel: "M9 29 V13 C9 10.5 11 9 13.5 9 H18.5 C21 9 23 10.5 23 13 V29 M9 29 H23 M9 19 H23 M22 12 L26 15 V24 C26 25.1 25.1 26 24 26 C22.9 26 22 25.1 22 24 V19",
  drill: "M6 12 H20 V19 H6 Z M20 13 L26 13 L26 18 L20 18 M26 14.5 H29 M11 19 L8 27 M6 12 L6 8",
  generator: "M6 14 H24 V25 H6 Z M6 19 H24 M10 14 V10 H20 V14 M14 22 H16 M22 17 L26 17 M22 21 L25 21",
  saw: "M4 24 L21 7 L25 11 L8 28 Z M17 11 L21 15 M8 21 L8 25 L12 25 M4 24 L6 22 M6 22 L9 25",
  scaffold: "M8 6 V28 M24 6 V28 M8 12 H24 M8 20 H24 M8 6 H24 M8 28 H24 M12 6 L12 28 M20 6 L20 28",
  tiles: "M6 12 L16 6 L26 12 L16 18 Z M6 12 V22 L16 28 V18 M26 12 V22 L16 28 M6 12 L16 18 L26 12",
  compressor: "M7 22 C7 15 11 11 16 11 C21 11 25 15 25 22 Z M9 22 H23 M13 11 V7 M19 11 V7 M12 22 V26 M20 22 V26",
  trailer: "M4 24 H8 M4 24 V16 H14 V24 M14 24 H28 V17 H14 M8 27 A3 3 0 1 0 8 26.99 M23 27 A3 3 0 1 0 23 26.99",
  excavator: "M4 27 H24 M6 27 V22 H12 V27 M12 22 L12 14 L19 8 L27 14 L20 18 M17 12 L21 15",
  van: "M4 25 V14 H16 V19 L22 19 L26 22 V25 H4 M17 13 V17 H23 M9 28 A3 3 0 1 0 9 27.99 M23 28 A3 3 0 1 0 23 27.99 M9 25 H23",
};

function MaterialIcon({ id }: { id: MaterialId }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d={MATERIAL_ICON_PATHS[id]} stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ClockIcon({ mounted }: { mounted: boolean }) {
  return (
    <svg viewBox="0 0 44 44" fill="none">
      <circle cx="22" cy="22" r="19" stroke="currentColor" strokeOpacity=".18" strokeWidth="2.5" />
      <circle
        cx="22" cy="22" r="19"
        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
        strokeDasharray={2 * Math.PI * 19}
        strokeDashoffset={mounted ? 0 : 2 * Math.PI * 19}
        style={{ transition: "stroke-dashoffset 1.1s cubic-bezier(.2,.8,.2,1)", transformOrigin: "22px 22px", transform: "rotate(-90deg)" }}
      />
      <line x1="22" y1="22" x2="22" y2="11" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" className="ai-simulator__clock-hand" />
      <line x1="22" y1="22" x2="29" y2="24" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" className="ai-simulator__clock-hand ai-simulator__clock-hand--min" />
    </svg>
  );
}
