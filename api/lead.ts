export const config = { runtime: "edge" };

const NOTION_VERSION = "2022-06-28";

/**
 * Registre serveur des bases de capture. Le client envoie une `key` ; le serveur
 * seul décide de la data source Notion et des propriétés autorisées. Ainsi le
 * client ne peut jamais écrire dans une base arbitraire ni injecter des champs.
 *
 * Ajouter une campagne Ads = ajouter une entrée ici pointant vers sa base dédiée.
 */
type FieldSpec = {
  /** Type de propriété Notion attendu pour ce champ. */
  type: "select" | "multi_select";
  /** Valeurs autorisées ; toute valeur hors liste est ignorée. */
  options: Set<string>;
};

type LeadTarget = {
  dataSourceId: string;
  /** Valeurs de "Source" acceptées ; la première est le défaut si le client n'en envoie pas de valide. */
  sources: string[];
  /** Champs optionnels acceptés pour cette base, en plus de Prénom/Téléphone/Source. */
  fields: {
    metier?: FieldSpec;
    metaux?: FieldSpec;
    douleurs?: FieldSpec;
  };
};

const METALLERIE_METIERS = ["Tôlerie", "Chaudronnerie", "Métallerie sur mesure", "Serrurerie", "Autre"];
const METALLERIE_METAUX = ["Aluminium", "Cuivre", "Zinc", "Inox", "Acier", "Plusieurs"];
const SITE_METIERS = [
  "Électricien", "Plombier / CVC", "Menuisier", "Peintre / Plâtrier", "Tôlier / Métallier",
  "Paysagiste", "Maçon / Rénovation", "Couvreur / Zingueur", "Charpentier bois", "Carreleur / Mosaïste", "Autre",
];
const BTP_DOULEURS = [
  "Mes devis partent trop tard",
  "Je cours après mes impayés",
  "Je ne sais pas si mes chantiers sont rentables",
  "Je passe mes soirées sur l'administratif",
  "Je perds du temps à tout recalculer à la main",
];

const LEAD_TARGETS: Record<string, LeadTarget> = {
  "tolier-ads": {
    dataSourceId: "9cc571ad-dc6c-4820-9c05-f19cf3429c97",
    sources: ["Ads Métallerie - prix matière", "Organique", "Autre"],
    fields: {
      metier: { type: "select", options: new Set(METALLERIE_METIERS) },
      metaux: { type: "multi_select", options: new Set(METALLERIE_METAUX) },
    },
  },
  general: {
    dataSourceId: "2c20f5e8-cb6d-41eb-8931-1ee90dba6aeb",
    sources: ["Organique", "Home", "Clé en main", "Autre"],
    fields: {
      metier: { type: "select", options: new Set(SITE_METIERS) },
      douleurs: { type: "multi_select", options: new Set(BTP_DOULEURS) },
    },
  },
};

type LeadPayload = {
  key?: unknown;
  prenom?: unknown;
  entreprise?: unknown;
  telephone?: unknown;
  source?: unknown;
  metier?: unknown;
  metaux?: unknown;
  douleurs?: unknown;
};

function sanitizeText(value: unknown, maxLength: number): string {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function sanitizeMultiSelect(value: unknown, options: Set<string>): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === "string" && options.has(item));
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

  const target = LEAD_TARGETS[sanitizeText(payload.key, 40)];
  if (!target) {
    return new Response(JSON.stringify({ error: "Unknown lead target" }), { status: 400 });
  }

  const prenom = sanitizeText(payload.prenom, 200);
  const telephone = sanitizeText(payload.telephone, 40);
  const requestedSource = sanitizeText(payload.source, 120);
  const source = target.sources.includes(requestedSource) ? requestedSource : target.sources[0];

  if (!prenom || telephone.replace(/\D/g, "").length < 9) {
    return new Response(JSON.stringify({ error: "Missing or invalid required fields" }), { status: 400 });
  }

  const entreprise = sanitizeText(payload.entreprise, 200);

  const properties: Record<string, unknown> = {
    "Prénom": { title: [{ text: { content: prenom } }] },
    "Téléphone": { phone_number: telephone },
    "Source": { select: { name: source } },
  };

  if (entreprise) {
    properties["Entreprise"] = { rich_text: [{ text: { content: entreprise } }] };
  }

  if (target.fields.metier) {
    const metier = sanitizeText(payload.metier, 60);
    if (target.fields.metier.options.has(metier)) {
      properties["Métier"] = { select: { name: metier } };
    }
  }
  if (target.fields.metaux) {
    const metaux = sanitizeMultiSelect(payload.metaux, target.fields.metaux.options);
    if (metaux.length > 0) {
      properties["Métaux travaillés"] = { multi_select: metaux.map((name) => ({ name })) };
    }
  }
  if (target.fields.douleurs) {
    const douleurs = sanitizeMultiSelect(payload.douleurs, target.fields.douleurs.options);
    if (douleurs.length > 0) {
      properties["Douleurs"] = { multi_select: douleurs.map((name) => ({ name })) };
    }
  }

  const notionResponse = await fetch("https://api.notion.com/v1/pages", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${notionApiKey}`,
      "Notion-Version": NOTION_VERSION,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      parent: { data_source_id: target.dataSourceId },
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
