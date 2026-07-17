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
3. Écrire en français concret, phrasé, avec une idée par paragraphe et des intertitres qui répondent à une question.
4. Donner la réponse principale tôt, puis détailler limites, méthode, exemples et action suivante.
5. Distinguer clairement fait sourcé, expérience produit et recommandation.
6. Ajouter des liens internes seulement lorsqu'ils aident la lecture.
7. Terminer par un CTA WhatsApp cohérent avec le sujet.

## Vérifier

1. Exécuter `npm run validate:content`.
2. Vérifier chaque claim, chaque date, chaque prix et chaque citation dans sa source.
3. Vérifier l'absence de requête primaire en double et de date future.
4. Vérifier que l'image ne contient ni texte, ni logo, ni filigrane et possède des dimensions déclarées dans l'interface.
5. Construire le site et contrôler l'article pré-rendu, son canonical et son JSON-LD.

## Publier

Ne passer `draft` à `false` que si l'utilisateur demande explicitement de publier. Lors de la publication :

1. Définir une date réelle dans `publishedAt`.
2. Ne renseigner `updatedAt` qu'après une modification substantielle.
3. Mettre à jour `references/content-inventory.json`.
4. Relancer validation, build et contrôle statique.
5. Ne jamais automatiser la mise en ligne quotidienne sans autorisation distincte.

Cadence initiale : `1 article/jour`. La cadence est une limite de planification, pas une autorisation de publication autonome.
