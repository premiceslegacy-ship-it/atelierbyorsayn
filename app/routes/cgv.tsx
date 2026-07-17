import type { MetaFunction } from "react-router";
import { SiteShell } from "../components/Shell";
import CGV from "@legacy/pages/CGV";
import { SITE_URL } from "../data/site";

export const meta: MetaFunction = () => [
  { title: "Conditions générales de vente · Atelier" },
  { name: "robots", content: "index, follow" },
  { tagName: "link", rel: "canonical", href: `${SITE_URL}/cgv` },
];
export default function Route() { return <SiteShell><main className="legal-shell"><CGV /></main></SiteShell>; }
