import { useState } from "react";
import { Bell, ChevronDown, MailQuestion, Receipt, Send } from "lucide-react";
import { ProofClock } from "../AtelierIcons";

/** Durées indicatives : préparation à la main (relire l'historique, rédiger, envoyer) contre validation dans Atelier. */
const tasks = [
  { icon: Send, label: "Devis DEV-2026-006 envoyé", when: "Il y a 2 h", saved: "-25 min", by: "25 min", withAtelier: "1 min", ratio: 4 },
  { icon: Bell, label: "Relance facture n°2", when: "Il y a 2 j", saved: "-10 min", by: "10 min", withAtelier: "30 s", ratio: 5 },
  { icon: Receipt, label: "Acompte 30 % généré", when: "Il y a 3 j", saved: "-15 min", by: "15 min", withAtelier: "1 min", ratio: 7 },
  { icon: MailQuestion, label: "Relance devis sans réponse", when: "Il y a 5 j", saved: "-10 min", by: "10 min", withAtelier: "30 s", ratio: 5 },
];

/** Bloc « Envoyé automatiquement » du tableau de bord Atelier, avec l'horloge des heures rendues. Chaque tâche se déplie pour comparer. */
export function ProofTimeVisual({ active }: { active: boolean }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className={`pf-app pf-time ${active ? "is-active" : ""}`} role="group" aria-label="Aperçu interactif des tâches automatisées">
      <div className="pf-time__top">
        <ProofClock className="pf-time__clock" active={active} />
        <span><small>Temps rendu ce mois-ci</small><b>10 h</b></span>
      </div>
      <p className="pf-time__title">Envoyé automatiquement · 7 derniers jours</p>
      <ul className="pf-time__list">
        {tasks.map(({ icon: Icon, label, when, saved, by, withAtelier, ratio }, index) => {
          const isOpen = open === index;
          return (
            <li key={label} className={isOpen ? "is-open" : ""} style={{ "--i": index } as React.CSSProperties}>
              <button type="button" className="pf-time__row" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : index)}>
                <span className="pf-time__icon"><Icon /></span>
                <span className="pf-time__label"><b>{label}</b><small>{when}</small></span>
                <em>{saved}</em>
                <ChevronDown className="pf-time__chevron" />
              </button>
              <div className="pf-time__detail" aria-hidden={!isOpen}>
                <div>
                  <p className="pf-time__cmp"><span>À la main</span><i className="track"><i style={{ width: "100%" }} /></i><b>{by}</b></p>
                  <p className="pf-time__cmp is-after"><span>Avec Atelier</span><i className="track"><i style={{ width: `${Math.max(100 / ratio, 6)}%` }} /></i><b>{withAtelier}</b></p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
