import { useEffect, useState } from "react";
import { CheckCircle2, X } from "lucide-react";
import { LeadCaptureForm, type LeadFormValues } from "./LeadCaptureForm";
import { trackConversion } from "./ConversionLink";

type LeadCaptureModalProps = {
  open: boolean;
  onClose: () => void;
  whatsappUrl: string;
  source: string;
};

async function submitLead(values: LeadFormValues, source: string) {
  const response = await fetch("/api/lead", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...values, source }),
  });
  if (!response.ok) throw new Error(`Lead API responded with ${response.status}`);
}

export function LeadCaptureModal({ open, onClose, whatsappUrl, source }: LeadCaptureModalProps) {
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

  const proceedToWhatsApp = () => {
    // skipPixel: on envoie 'Lead' ci-dessous, pas 'Contact' — éviter de compter le même lead deux fois côté Meta.
    trackConversion({ source, page: window.location.pathname, tier: "none" }, { skipPixel: true });
    if (typeof window.fbq === "function") window.fbq("track", "Lead");
    window.open(whatsappUrl, "_blank", "noreferrer");
  };

  const handleSubmit = async (values: LeadFormValues) => {
    setSubmitting(true);
    try {
      await submitLead(values, source);
      setStatus("success");
    } catch {
      // On ne bloque jamais le contact WhatsApp pour un souci de capture côté Notion.
      setStatus("error");
    } finally {
      setSubmitting(false);
      proceedToWhatsApp();
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
            <LeadCaptureForm onSubmit={handleSubmit} submitting={submitting} submitLabel="Continuer sur WhatsApp" />
          </>
        )}
      </div>
    </div>
  );
}
