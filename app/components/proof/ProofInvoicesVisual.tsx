import { useEffect, useState } from "react";
import { Bell, Check, RotateCcw } from "lucide-react";

/** Données fictives : l'entreprise démo Weber Tôlerie et ses clients, comme dans l'app Atelier. */
const invoices = [
  { number: "FAC-2026-031", client: "SNCM Logistique", amount: 4820, due: "Échue le 8 sept.", paid: "Payée le 11 sept." },
  { number: "FAC-2026-028", client: "Promoteur Rhône Habitat", amount: 5280, due: "Échue le 12 sept.", paid: "Payée le 15 sept." },
  { number: "FAC-2026-024", client: "Atelier Bonnefoy Métaux", amount: 2400, due: "Échue le 15 sept.", paid: "Payée le 18 sept." },
];

const euros = (value: number) => `${value.toLocaleString("fr-FR")} €`;

/** Liste « Factures » d'Atelier : les relances automatiques font passer les factures échues en « Payée », et chaque ligne se bascule au clic. */
export function ProofInvoicesVisual({ active }: { active: boolean }) {
  const [paid, setPaid] = useState<boolean[]>(() => invoices.map(() => false));
  const [touched, setTouched] = useState(false);
  const [run, setRun] = useState(0);

  useEffect(() => {
    if (!active || touched) return;
    const timers = invoices.map((_, index) => window.setTimeout(() => setPaid((current) => current.map((value, i) => (i === index ? true : value))), 800 + index * 450));
    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [active, touched, run]);

  const toggle = (index: number) => {
    setTouched(true);
    setPaid((current) => current.map((value, i) => (i === index ? !value : value)));
  };
  const replay = () => {
    setTouched(false);
    setPaid(invoices.map(() => false));
    setRun((value) => value + 1);
  };
  const remaining = invoices.reduce((sum, invoice, index) => (paid[index] ? sum : sum + invoice.amount), 0);

  return (
    <div className="pf-app pf-invoices" role="group" aria-label="Aperçu interactif de la liste des factures">
      <div className="pf-app__head">
        <strong>Factures</strong>
        <span className="pf-app__head-right">
          <span className={`pf-invoices__pill ${remaining === 0 ? "is-ok" : ""}`} aria-live="polite">
            {remaining === 0 ? <><Check />Tout est encaissé</> : <>À recouvrer {euros(remaining)}</>}
          </span>
          <button type="button" className="pf-replay" onClick={replay} aria-label="Rejouer l'animation"><RotateCcw /></button>
        </span>
      </div>
      <ul className="pf-invoices__list">
        {invoices.map((invoice, index) => {
          const isPaid = paid[index];
          return (
            <li key={invoice.number}>
              <button
                type="button"
                className={`pf-invoices__row ${isPaid ? "is-paid" : ""}`}
                aria-pressed={isPaid}
                aria-label={`${invoice.number}, ${invoice.client}, ${euros(invoice.amount)}, ${isPaid ? "payée" : "envoyée, échue"}. ${isPaid ? "Repasser en impayée" : "Marquer comme payée"}`}
                onClick={() => toggle(index)}
              >
                <span className="pf-invoices__main">
                  <code>{invoice.number}</code>
                  <span>{invoice.client}</span>
                  <small className="pf-invoices__due">
                    <em className="pf-invoices__late">{invoice.due}</em>
                    <em className="pf-invoices__ok">{invoice.paid}</em>
                  </small>
                </span>
                <span className="pf-invoices__side">
                  <b>{euros(invoice.amount)}</b>
                  <span className="pf-badge-stack">
                    <span className="pf-badge pf-badge--sent">Envoyée</span>
                    <span className="pf-badge pf-badge--paid"><Check />Payée</span>
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
      <div className="pf-reminder">
        <span className="pf-reminder__icon"><Bell /></span>
        <span className="pf-reminder__text"><b>Relance facture n°2</b><small>Envoyée automatiquement · Il y a 2 j</small></span>
        <span className="pf-chips"><i>J+3</i><i>J+7</i></span>
      </div>
    </div>
  );
}
