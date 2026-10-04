import { useEffect, useState } from "react";
import { CheckCheck, CircleCheck, RotateCcw, Send } from "lucide-react";

const lines = [
  { label: "Bardage acier galvanisé", qty: "200", unit: "m²", pu: "65,00 €", total: "13 000,00 €" },
  { label: "Pose et fixations", qty: "200", unit: "m²", pu: "38,00 €", total: "7 600,00 €" },
  { label: "Échafaudage et accessoires", qty: "1", unit: "forfait", pu: "1 800,00 €", total: "1 800,00 €" },
];

type Stage = "draft" | "sent" | "signed";

/** Page A4 fidèle au PDF de devis Atelier + email client. Le visiteur envoie le devis, puis le signe comme le ferait le client. */
export function ProofQuoteVisual({ active }: { active: boolean }) {
  const [stage, setStage] = useState<Stage>("draft");
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (!active || touched) return;
    const timer = window.setTimeout(() => setStage("sent"), 900);
    return () => window.clearTimeout(timer);
  }, [active, touched]);

  const go = (next: Stage) => { setTouched(true); setStage(next); };

  return (
    <div className="pf-quote" data-stage={stage} role="group" aria-label="Aperçu interactif d'un devis à envoyer puis à signer">
      <button type="button" className="pf-replay pf-quote__replay" onClick={() => go("draft")} aria-label="Rejouer l'animation"><RotateCcw /></button>
      <div className="pf-paper-frame">
        <div className="pf-paper">
          <div className="pf-paper__head">
            <img className="pf-paper__logo" src="/logo-atelier-noir.svg" alt="" width="706" height="80" />
            <span className="pf-paper__company"><b>WEBER TÔLERIE</b>12 rue de l'Industrie · 69007 Lyon<br />SIRET : 123 456 789 00012</span>
          </div>
          <h4>DEVIS N° DEV-2026-006</h4>
          <p className="pf-paper__dates">Date : 04/09/2026<span>Valable jusqu'au : 04/10/2026</span></p>
          <i className="pf-paper__accent" />
          <div className="pf-paper__parties">
            <span><small>ÉMETTEUR</small><b>Weber Tôlerie</b></span>
            <span><small>CLIENT</small><b>Atelier Bonnefoy Métaux</b></span>
          </div>
          <table>
            <thead><tr><th>DÉSIGNATION</th><th>QTÉ</th><th>UNITÉ</th><th>PU HT</th><th>TOTAL HT</th></tr></thead>
            <tbody>
              <tr className="is-lot"><td colSpan={5}>EXTENSION BARDAGE, ATELIER C NORD</td></tr>
              {lines.map((line) => (
                <tr key={line.label}><td>{line.label}</td><td>{line.qty}</td><td>{line.unit}</td><td>{line.pu}</td><td>{line.total}</td></tr>
              ))}
            </tbody>
          </table>
          <div className="pf-paper__totals">
            <span>Total HT<b>22 400,00 €</b></span>
            <span>TVA 20 %<b>4 480,00 €</b></span>
            <span className="is-ttc">TOTAL TTC<b>26 880,00 €</b></span>
          </div>
          {stage === "signed" ? (
            <div className="pf-paper__sign is-signed">
              <b>BON POUR ACCORD</b>
              Nom : Pierre Bonnefoy<br />Qualité : Gérant · Date : 07/09/2026
              <svg viewBox="0 0 80 22" aria-hidden="true"><path pathLength="1" d="M2 15 C9 1 13 21 21 9 S33 3 37 13 46 19 54 7 66 11 78 5" /></svg>
            </div>
          ) : (
            <div className="pf-paper__sign">Bon pour accord, date et signature</div>
          )}
          {stage !== "draft" && <span key={stage} className={`pf-stamp pf-stamp--${stage}`}>{stage === "sent" ? "Envoyé" : "Accepté"}</span>}
        </div>
      </div>

      {stage === "draft" && (
        <div className="pf-mail pf-mail--draft" key="draft">
          <p className="pf-mail__kicker">Devis prêt à partir</p>
          <p className="pf-mail__subject">DEV-2026-006 · Atelier Bonnefoy Métaux</p>
          <p className="pf-mail__amount"><small>Montant TTC</small><b>26 880,00 €</b></p>
          <button type="button" className="pf-mail__cta" onClick={() => go("sent")}><Send />Envoyer</button>
          <p className="pf-mail__status is-muted">Le client reçoit le PDF et un lien pour signer en ligne.</p>
        </div>
      )}
      {stage === "sent" && (
        <div className="pf-mail" key="sent">
          <div className="pf-mail__head">
            <img className="pf-mail__logo" src="/icon_meta-48.png" alt="" width="26" height="26" />
            <span><b>Weber Tôlerie</b><small>à Atelier Bonnefoy Métaux</small></span>
            <time>18:42</time>
          </div>
          <p className="pf-mail__subject">Votre devis N° DEV-2026-006 de Weber Tôlerie</p>
          <p className="pf-mail__amount"><small>Montant TTC</small><b>26 880,00 €</b></p>
          <button type="button" className="pf-mail__cta" onClick={() => go("signed")}>Consulter &amp; signer le devis →</button>
          <p className="pf-mail__status"><CheckCheck />Envoyé depuis le chantier</p>
        </div>
      )}
      {stage === "signed" && (
        <div className="pf-mail pf-mail--signed" key="signed">
          <p className="pf-mail__done"><CircleCheck />Devis accepté !</p>
          <p className="pf-mail__amount"><small>Montant TTC accepté</small><b>26 880,00 €</b></p>
          <p className="pf-mail__status"><CheckCheck />Signé par Pierre Bonnefoy · à l'instant</p>
          <p className="pf-mail__status is-muted">Weber Tôlerie est prévenu par email.</p>
        </div>
      )}
    </div>
  );
}
