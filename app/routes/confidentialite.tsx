import type { MetaFunction } from "react-router";
import { SiteShell } from "../components/Shell";
import Confidentialite from "@legacy/pages/Confidentialite";
import { SITE_URL } from "../data/site";

export const meta: MetaFunction = () => [
  { title: "Politique de confidentialité — Atelier" },
  { name: "robots", content: "index, follow" },
  { tagName: "link", rel: "canonical", href: `${SITE_URL}/confidentialite` },
];
export default function Route() { return <SiteShell><main className="legal-shell"><Confidentialite /></main></SiteShell>; }
