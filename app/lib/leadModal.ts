import { createContext } from "react";

/** Déclenche l'ouverture de la modale de capture de leads depuis n'importe quel CTA de la page. */
export const OpenLeadModalContext = createContext<(source: string) => void>(() => {});
