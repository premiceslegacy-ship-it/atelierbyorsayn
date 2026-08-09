import { useEffect, useState } from "react";
import { CheckCircle2, X } from "lucide-react";
import { LeadCaptureForm, type LeadSubmission } from "./LeadCaptureForm";
import { trackConversion } from "./ConversionLink";
import { trackMetaEvent } from "../lib/metaPixel";
import type { LeadFormConfig } from "../data/leadForms";

type LeadCaptureModalProps = {
  open: boolean;
  onClose: () => void;
  whatsappUrl: string;
  /** Config de capture (base Notion, variante de champs, source Notion). */
  config: LeadFormConfig;
  /** Origine du clic pour le tracking interne (ex: "metier-hero-tolier", "navbar"). */
  trackingSource: string;
};

async function submitLead(submission: LeadSubmission) {
  const response = await fetch("/api/lead", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(submission),
  });
  if (!response.ok) throw new Error(`Lead API responded with ${response.status}`);
}

export function LeadCaptureModal({ open, onClose, whatsappUrl, config, trackingSource }: LeadCaptureModalProps) {
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  useEffect(() => {
    if (!open) {
      setSubmitting(false);
      setStatus("idle");
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const proceedToWhatsApp = (whatsappWindow: Window | null) => {
    // skipPixel: on envoie 'Lead' ci-dessous, pas 'Contact' — éviter de compter le même lead deux fois côté Meta.
    trackConversion({ source: trackingSource, page: window.location.pathname, tier: "none" }, { skipPixel: true });
    trackMetaEvent("Lead");
    if (whatsappWindow) {
      whatsappWindow.location.replace(whatsappUrl);
      return;
    }
    // Si le navigateur refuse la nouvelle fenêtre, le contact reste garanti dans l'onglet courant.
    window.location.assign(whatsappUrl);
  };

  const handleSubmit = async (submission: LeadSubmission) => {
    // L'ouverture doit avoir lieu pendant le geste utilisateur. Après le `await`, Safari et
    // certains bloqueurs considèrent window.open comme une popup non sollicitée.
    const whatsappWindow = window.open("about:blank", "_blank");
    if (whatsappWindow) whatsappWindow.opener = null;
    setSubmitting(true);
    try {
      await submitLead(submission);
      setStatus("success");
    } catch {
      // On ne bloque jamais le contact WhatsApp pour un souci de capture côté Notion.
      setStatus("error");
    } finally {
      setSubmitting(false);
      proceedToWhatsApp(whatsappWindow);
    }
  };

  return (
    <div className="lead-modal-overlay" role="presentation" onClick={onClose}>
      <div
        className="lead-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="lead-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button type="button" className="lead-modal__close" onClick={onClose} aria-label="Fermer">
          <X aria-hidden="true" />
        </button>

        {status === "success" || status === "error" ? (
          <div className="lead-modal__done">
            <CheckCircle2 aria-hidden="true" />
            <p>{status === "success" ? "Merci, c'est enregistré !" : "C'est noté, on continue sur WhatsApp."}</p>
            <small>Ouverture de WhatsApp…</small>
          </div>
        ) : (
          <>
            <p className="eyebrow">Avant de continuer</p>
            <h3 id="lead-modal-title">Quelques infos, et on vous répond directement.</h3>
            <LeadCaptureForm config={config} onSubmit={handleSubmit} submitting={submitting} submitLabel="Continuer sur WhatsApp" />
          </>
        )}
      </div>
    </div>
  );
}
