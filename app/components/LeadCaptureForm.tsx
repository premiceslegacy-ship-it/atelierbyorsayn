import { useId, useState } from "react";
import { Loader2 } from "lucide-react";
import { BTP_DOULEURS, SITE_METIERS, type LeadFormConfig, type LeadFormVariant } from "../data/leadForms";

export const METALLERIE_METIER_OPTIONS = ["Tôlerie", "Chaudronnerie", "Métallerie sur mesure", "Serrurerie", "Autre"] as const;
export const METAUX_OPTIONS = ["Aluminium", "Cuivre", "Zinc", "Inox", "Acier", "Plusieurs"] as const;

export type LeadFormValues = {
  prenom: string;
  telephone: string;
  metier: string;
  /** Variante métallerie uniquement. */
  metaux: string[];
  /** Variante générale uniquement. */
  douleurs: string[];
};

/** Payload envoyé à /api/lead : les valeurs + la clé de routage et la source de la config. */
export type LeadSubmission = LeadFormValues & { key: string; source: string };

/** Tolère espaces, points, tirets, indicatif +33/0033 : bloque seulement le vide ou trop court, jamais un format FR valide mais inhabituel. */
const PHONE_MIN_DIGITS = 9;

function isPhonePlausible(value: string) {
  return value.replace(/\D/g, "").length >= PHONE_MIN_DIGITS;
}

const metierOptionsFor = (variant: LeadFormVariant): readonly string[] =>
  variant === "metallerie" ? METALLERIE_METIER_OPTIONS : SITE_METIERS;

export function LeadCaptureForm({
  config,
  onSubmit,
  submitting,
  submitLabel = "Recevoir mes infos",
}: {
  config: LeadFormConfig;
  onSubmit: (submission: LeadSubmission) => void;
  submitting: boolean;
  submitLabel?: string;
}) {
  const [values, setValues] = useState<LeadFormValues>({
    prenom: "",
    telephone: "",
    metier: config.defaultMetier ?? "",
    metaux: [],
    douleurs: [],
  });
  const [touched, setTouched] = useState(false);
  const formId = useId();

  const phoneValid = isPhonePlausible(values.telephone);
  const canSubmit = values.prenom.trim().length > 0 && phoneValid;

  const toggleIn = (field: "metaux" | "douleurs", value: string) => {
    setValues((prev) => ({
      ...prev,
      [field]: prev[field].includes(value) ? prev[field].filter((v) => v !== value) : [...prev[field], value],
    }));
  };

  return (
    <form
      className="lead-form"
      onSubmit={(event) => {
        event.preventDefault();
        setTouched(true);
        if (!canSubmit) return;
        onSubmit({ ...values, key: config.key, source: config.source });
      }}
      noValidate
    >
      <div className="lead-form__field">
        <label htmlFor={`${formId}-prenom`}>Prénom</label>
        <input
          id={`${formId}-prenom`}
          type="text"
          autoComplete="given-name"
          value={values.prenom}
          onChange={(event) => setValues((prev) => ({ ...prev, prenom: event.target.value }))}
          placeholder="Votre prénom"
          required
        />
      </div>

      <div className="lead-form__field">
        <label htmlFor={`${formId}-telephone`}>Téléphone</label>
        <input
          id={`${formId}-telephone`}
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          value={values.telephone}
          onChange={(event) => setValues((prev) => ({ ...prev, telephone: event.target.value }))}
          placeholder="06 12 34 56 78"
          required
        />
        {touched && !phoneValid && <small className="lead-form__error">Numéro incomplet.</small>}
      </div>

      <div className="lead-form__field">
        <label htmlFor={`${formId}-metier`}>Métier</label>
        <select
          id={`${formId}-metier`}
          value={values.metier}
          onChange={(event) => setValues((prev) => ({ ...prev, metier: event.target.value }))}
        >
          <option value="">Sélectionner…</option>
          {metierOptionsFor(config.variant).map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>

      {config.variant === "metallerie" && (
        <div className="lead-form__field">
          <span className="lead-form__label">Métaux travaillés</span>
          <div className="lead-form__checks">
            {METAUX_OPTIONS.map((metal) => (
              <label key={metal} className="lead-form__check">
                <input type="checkbox" checked={values.metaux.includes(metal)} onChange={() => toggleIn("metaux", metal)} />
                <span>{metal}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {config.variant === "general" && (
        <div className="lead-form__field">
          <span className="lead-form__label">Ce qui vous pèse le plus (facultatif)</span>
          <div className="lead-form__checks lead-form__checks--stack">
            {BTP_DOULEURS.map((douleur) => (
              <label key={douleur} className="lead-form__check">
                <input type="checkbox" checked={values.douleurs.includes(douleur)} onChange={() => toggleIn("douleurs", douleur)} />
                <span>{douleur}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      <button type="submit" className="button button--primary lead-form__submit" disabled={submitting}>
        {submitting ? <Loader2 className="lead-form__spinner" aria-hidden="true" /> : null}
        {submitting ? "Envoi…" : submitLabel}
      </button>
    </form>
  );
}
