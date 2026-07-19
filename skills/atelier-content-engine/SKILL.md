---
name: atelier-content-engine
description: Produire, vérifier et publier les articles du journal Atelier pour les artisans du BTP. Utiliser ce skill pour planifier un sujet SEO/GEO Atelier, rédiger ou mettre à jour un article Markdown, vérifier les sources et les claims produit, gérer le frontmatter, les liens internes, la cadence éditoriale ou passer explicitement un brouillon en publication.
---

# Atelier Content Engine

## Charger le contexte

1. Lire `references/product-truth.md` avant toute affirmation sur Atelier, Sarah, les prix ou la conformité.
2. Lire `references/editorial-policy.md` avant toute recherche ou rédaction.
3. Consulter `references/content-inventory.json` avant de choisir une requête, une intention ou un pilier.
4. Consulter `content/blog/` pour détecter les recouvrements et les opportunités de liens internes.

## Préparer un sujet

1. Formuler une question réelle d'artisan et une intention unique.
2. Refuser un sujet déjà couvert sans angle substantiellement nouveau.
3. Privilégier une source primaire récente : DGFiP, economie.gouv.fr, INSEE, CAPEB, FFB, OPPBTP, Bpifrance ou source produit Atelier.
4. Vérifier toute information instable sur le web le jour de la rédaction.
5. Ne citer une personnalité que depuis une publication vérifiable. Ne jamais suggérer un partenariat ou une approbation inexistante.

## Rédiger

1. Créer le Markdown dans `content/blog/` avec le frontmatter défini dans `references/editorial-policy.md`.
2. Régler `draft: true` par défaut.
3. Générer l'image héro avec `node skills/atelier-content-engine/scripts/generate-hero.mjs <slug> "<hook HTML>"` (template de marque : fond noir, logo Atelier, hook en Geist). Voir « Image héro » dans `references/editorial-policy.md`. Ne jamais utiliser de photo de stock.
4. Écrire en français concret, phrasé, avec une idée par paragraphe et des intertitres qui répondent à une question.
5. Donner la réponse principale tôt, puis détailler limites, méthode, exemples et action suivante.
6. Distinguer clairement fait sourcé, expérience produit et recommandation.
7. Ajouter des liens internes seulement lorsqu'ils aident la lecture, et les déclarer dans `content-inventory.json`.
8. Ajouter un tableau comparatif uniquement s'il tranche une vraie comparaison (prix, seuils, avant/après), et une FAQ visible seulement à partir de 3 questions concrètes distinctes. Voir « Tableaux comparatifs et données chiffrées » et « FAQ visible » dans `references/editorial-policy.md`.
9. Respecter la hiérarchie des titres : un seul H1 (généré par le gabarit), H2 pour les sections, H3 pour les sous-points et les questions de FAQ.
10. Terminer par un CTA WhatsApp cohérent avec le sujet.

## Vérifier

1. Exécuter `npm run validate:content`.
2. Vérifier chaque claim, chaque date, chaque prix et chaque citation dans sa source.
3. Vérifier l'absence de requête primaire en double et de date future.
4. Vérifier que l'image héro a été générée par `generate-hero.mjs` (pas de photo de stock), fait 1200x750, et que le `.webp` ET le `.avif` existent tous les deux et sont à jour (le gabarit `<picture>` sert l'AVIF en priorité).
5. Construire le site et contrôler l'article pré-rendu, son canonical et son JSON-LD.
6. Vérifier que le fil d'Ariane visuel (`<nav aria-label="Fil d'Ariane">`) est présent dans le HTML pré-rendu et correspond exactement au `BreadcrumbList` JSON-LD.
7. Si un tableau ou une FAQ ont été ajoutés, relire qu'ils respectent `references/editorial-policy.md` et que tout chiffre cité est sourcé.

## Publier

Ne passer `draft` à `false` que si l'utilisateur demande explicitement de publier. Lors de la publication :

1. Définir une date réelle dans `publishedAt`.
2. Ne renseigner `updatedAt` qu'après une modification substantielle.
3. Mettre à jour `references/content-inventory.json`.
4. Relancer validation, build et contrôle statique.
5. Ne jamais automatiser la mise en ligne quotidienne sans autorisation distincte.

Cadence initiale : `1 article/jour`. La cadence est une limite de planification, pas une autorisation de publication autonome.

## Indexation après publication

Le push sur `main` déclenche automatiquement le workflow `.github/workflows/indexnow.yml` : il attend que le déploiement Vercel du commit soit `READY`, rebuild pour régénérer `sitemap.xml` avec la nouvelle URL, puis soumet toutes les URLs du sitemap à l'API IndexNow (`scripts/submit-indexnow.ts`), ce qui notifie Bing et les moteurs partenaires du protocole. Aucune action manuelle n'est requise après un `git push` sur `main` — ne pas relancer `npm run submit:indexnow` à la main sauf si le workflow a échoué (voir onglet Actions du repo GitHub).

Ne couvre pas Google (IndexNow n'y est pas adopté) : l'indexation Google reste soumise au crawl normal via le sitemap déclaré dans `robots.txt` et Google Search Console.
