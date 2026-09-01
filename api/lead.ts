export const config = { runtime: "edge" };

const NOTION_VERSION = "2022-06-28";

/**
 * Toute capture écrit dans la base Notion "Website Leads Atelier". "Source" isole
 * le canal (Ads, Organique, Home, Autre) ; "Offre" isole ce qui a motivé le clic
 * (Clé en main, abonnement, page métier, blog, home) — c'est ce qui qualifie la
 * valeur du lead, pas seulement d'où il vient.
 */
const DATA_SOURCE_ID = "2c20f5e8-cb6d-41eb-8931-1ee90dba6aeb";

const SOURCES = ["Ads", "Organique", "Home", "Autre"];
const OFFERS = ["Clé en main (3 000 €)", "Abonnement Pro/Expert", "Page métier", "Blog / contenu", "Home", "Autre"];
const SITE_METIERS = [
  "Électricien", "Plombier / CVC", "Menuisier", "Peintre / Plâtrier", "Tôlier / Métallier",
  "Paysagiste", "Maçon / Rénovation", "Couvreur / Zingueur", "Charpentier bois", "Carreleur / Mosaïste",
  "Tôlerie", "Chaudronnerie", "Métallerie sur mesure", "Serrurerie", "Autre",
];
const METAUX_TRAVAILLES = ["Aluminium", "Cuivre", "Zinc", "Inox", "Acier", "Plusieurs"];
const BTP_DOULEURS = [
  "Mes devis partent trop tard",
  "Je cours après mes impayés",
  "Je ne sais pas si mes chantiers sont rentables",
  "Je passe mes soirées sur l'administratif",
  "Je perds du temps à tout recalculer à la main",
];

type LeadPayload = {
  key?: unknown;
  prenom?: unknown;
  entreprise?: unknown;
  telephone?: unknown;
  source?: unknown;
  offer?: unknown;
  metier?: unknown;
  metaux?: unknown;
  douleurs?: unknown;
};

function sanitizeText(value: unknown, maxLength: number): string {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function sanitizeSelect(value: unknown, options: string[], fallback: string): string {
  const text = sanitizeText(value, 120);
  return options.includes(text) ? text : fallback;
}

function sanitizeMultiSelect(value: unknown, options: string[]): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === "string" && options.includes(item));
}

export default async function handler(request: Request): Promise<Response> {
  if (request.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405 });
  }

  const notionApiKey = process.env.NOTION_API_KEY;
  if (!notionApiKey) {
    return new Response(JSON.stringify({ error: "Server misconfigured" }), { status: 500 });
  }

  let payload: LeadPayload;
  try {
    payload = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), { status: 400 });
  }

  if (sanitizeText(payload.key, 40) !== "general") {
    return new Response(JSON.stringify({ error: "Unknown lead target" }), { status: 400 });
  }

  const prenom = sanitizeText(payload.prenom, 200);
  const telephone = sanitizeText(payload.telephone, 40);

  if (!prenom || telephone.replace(/\D/g, "").length < 9) {
    return new Response(JSON.stringify({ error: "Missing or invalid required fields" }), { status: 400 });
  }

  const entreprise = sanitizeText(payload.entreprise, 200);
  const source = sanitizeSelect(payload.source, SOURCES, "Organique");
  const offer = sanitizeSelect(payload.offer, OFFERS, "Autre");
  const metier = sanitizeText(payload.metier, 60);
  const metaux = sanitizeMultiSelect(payload.metaux, METAUX_TRAVAILLES);
  const douleurs = sanitizeMultiSelect(payload.douleurs, BTP_DOULEURS);

  const properties: Record<string, unknown> = {
    "Prénom": { title: [{ text: { content: prenom } }] },
    "Téléphone": { phone_number: telephone },
    "Source": { select: { name: source } },
    "Offre": { select: { name: offer } },
  };

  if (entreprise) {
    properties["Entreprise"] = { rich_text: [{ text: { content: entreprise } }] };
  }
  if (SITE_METIERS.includes(metier)) {
    properties["Métier"] = { select: { name: metier } };
  }
  if (metaux.length > 0) {
    properties["Métaux travaillés"] = { multi_select: metaux.map((name) => ({ name })) };
  }
  if (douleurs.length > 0) {
    properties["Douleurs"] = { multi_select: douleurs.map((name) => ({ name })) };
  }

  const notionResponse = await fetch("https://api.notion.com/v1/pages", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${notionApiKey}`,
      "Notion-Version": NOTION_VERSION,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      parent: { data_source_id: DATA_SOURCE_ID },
      properties,
    }),
  });

  if (!notionResponse.ok) {
    const errorBody = await notionResponse.text();
    console.error("Notion API error", notionResponse.status, errorBody);
    return new Response(JSON.stringify({ error: "Notion API error" }), { status: 502 });
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
