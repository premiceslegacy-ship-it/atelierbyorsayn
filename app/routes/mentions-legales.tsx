import type { MetaFunction } from "react-router";
import { SiteShell } from "../components/Shell";
import MentionsLegales from "@legacy/pages/MentionsLegales";
import { SITE_URL } from "../data/site";

export const meta: MetaFunction = () => [
  { title: "Mentions légales — Atelier" },
  { name: "robots", content: "index, follow" },
  { tagName: "link", rel: "canonical", href: `${SITE_URL}/mentions-legales` },
];
export default function Route() { return <SiteShell><main className="legal-shell"><MentionsLegales /></main></SiteShell>; }
