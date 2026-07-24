export const config = { runtime: "edge" };

const NOTION_DATA_SOURCE_ID = "9cc571ad-dc6c-4820-9c05-f19cf3429c97";
const NOTION_VERSION = "2022-06-28";

const METIER_OPTIONS = new Set(["Tôlerie", "Chaudronnerie", "Métallerie sur mesure", "Serrurerie", "Autre"]);
const METAUX_OPTIONS = new Set(["Aluminium", "Cuivre", "Zinc", "Inox", "Acier", "Plusieurs"]);

type LeadPayload = {
  prenom?: unknown;
  telephone?: unknown;
  metier?: unknown;
  metaux?: unknown;
  source?: unknown;
};

function sanitizeText(value: unknown, maxLength: number): string {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
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

  const prenom = sanitizeText(payload.prenom, 200);
  const telephone = sanitizeText(payload.telephone, 40);
  const metier = sanitizeText(payload.metier, 60);
  const source = sanitizeText(payload.source, 120) || "Ads Métallerie - prix matière";
  const metaux = Array.isArray(payload.metaux)
    ? payload.metaux.filter((item): item is string => typeof item === "string" && METAUX_OPTIONS.has(item))
    : [];

  if (!prenom || telephone.replace(/\D/g, "").length < 9) {
    return new Response(JSON.stringify({ error: "Missing or invalid required fields" }), { status: 400 });
  }

  const properties: Record<string, unknown> = {
    "Prénom": { title: [{ text: { content: prenom } }] },
    "Téléphone": { phone_number: telephone },
    "Source": { select: { name: source } },
  };

  if (METIER_OPTIONS.has(metier)) {
    properties["Métier"] = { select: { name: metier } };
  }
  if (metaux.length > 0) {
    properties["Métaux travaillés"] = { multi_select: metaux.map((name) => ({ name })) };
  }

  const notionResponse = await fetch("https://api.notion.com/v1/pages", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${notionApiKey}`,
      "Notion-Version": NOTION_VERSION,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      parent: { data_source_id: NOTION_DATA_SOURCE_ID },
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
