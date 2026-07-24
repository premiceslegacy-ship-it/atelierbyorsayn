import { useId, useState } from "react";
import { Loader2 } from "lucide-react";

export const METIER_OPTIONS = ["Tôlerie", "Chaudronnerie", "Métallerie sur mesure", "Serrurerie", "Autre"] as const;
export const METAUX_OPTIONS = ["Aluminium", "Cuivre", "Zinc", "Inox", "Acier", "Plusieurs"] as const;

export type LeadFormValues = {
  prenom: string;
  telephone: string;
  metier: (typeof METIER_OPTIONS)[number] | "";
  metaux: string[];
};

const EMPTY_VALUES: LeadFormValues = { prenom: "", telephone: "", metier: "", metaux: [] };

/** Tolère espaces, points, tirets, indicatif +33/0033 : bloque seulement le vide ou trop court, jamais un format FR valide mais inhabituel. */
const PHONE_MIN_DIGITS = 9;

function isPhonePlausible(value: string) {
  const digits = value.replace(/\D/g, "");
  return digits.length >= PHONE_MIN_DIGITS;
}

export function LeadCaptureForm({
  onSubmit,
  submitting,
  submitLabel = "Recevoir mes infos",
}: {
  onSubmit: (values: LeadFormValues) => void;
  submitting: boolean;
  submitLabel?: string;
}) {
  const [values, setValues] = useState<LeadFormValues>(EMPTY_VALUES);
  const [touched, setTouched] = useState(false);
  const formId = useId();

  const phoneValid = isPhonePlausible(values.telephone);
  const canSubmit = values.prenom.trim().length > 0 && phoneValid;

  const toggleMetal = (metal: string) => {
    setValues((prev) => ({
      ...prev,
      metaux: prev.metaux.includes(metal) ? prev.metaux.filter((m) => m !== metal) : [...prev.metaux, metal],
    }));
  };

  return (
    <form
      className="lead-form"
      onSubmit={(event) => {
        event.preventDefault();
        setTouched(true);
        if (!canSubmit) return;
        onSubmit(values);
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
          onChange={(event) => setValues((prev) => ({ ...prev, metier: event.target.value as LeadFormValues["metier"] }))}
        >
          <option value="">Sélectionner…</option>
          {METIER_OPTIONS.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>

      <div className="lead-form__field">
        <span className="lead-form__label">Métaux travaillés</span>
        <div className="lead-form__checks">
          {METAUX_OPTIONS.map((metal) => (
            <label key={metal} className="lead-form__check">
              <input type="checkbox" checked={values.metaux.includes(metal)} onChange={() => toggleMetal(metal)} />
              <span>{metal}</span>
            </label>
          ))}
        </div>
      </div>

      <button type="submit" className="button button--primary lead-form__submit" disabled={submitting}>
        {submitting ? <Loader2 className="lead-form__spinner" aria-hidden="true" /> : null}
        {submitting ? "Envoi…" : submitLabel}
      </button>
    </form>
  );
}
