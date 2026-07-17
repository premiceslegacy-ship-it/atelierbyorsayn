# Politique éditoriale SEO/GEO

## Frontmatter obligatoire

```yaml
title: ""
slug: ""
description: ""
publishedAt: "YYYY-MM-DD"
updatedAt: "YYYY-MM-DD" # uniquement après modification substantielle
author: "Samuel Mbeboura"
authorUrl: "https://fr.linkedin.com/in/samuel-mbeboura-b28796293"
pillar: ""
searchIntent: ""
primaryQuery: ""
tags: []
heroImage: "/images/blog/fichier.webp"
sources:
  - title: ""
    url: "https://..."
draft: true
```

## Hiérarchie des sources

1. DGFiP, economie.gouv.fr et textes officiels pour fiscalité et facturation électronique.
2. INSEE pour statistiques économiques.
3. CAPEB, FFB et OPPBTP pour données et pratiques BTP.
4. Bpifrance et URSSAF pour gestion et entrepreneuriat.
5. ADEME et Qualibat pour rénovation énergétique et qualifications.
6. Sources produit Atelier pour les fonctions et les limites du produit.

Vérifier la date, la portée et la définition exacte. Lier la page qui soutient directement l'affirmation.

## Principes SEO/GEO retenus

- Appliquer d'abord les fondamentaux Google : contenu utile et original, expertise de première main, accessibilité au crawl, structure sémantique et performance.
- Répondre clairement à l'intention dans les premières lignes.
- Utiliser titres explicites, tableaux seulement lorsqu'ils clarifient une comparaison, listes pour une procédure et FAQ uniquement si elle est visible.
- Ajouter preuves, sources, dates et limites afin de réduire l'ambiguïté et d'améliorer la citabilité.
- Maintenir sitemap et dates réelles ; utiliser IndexNow comme accélérateur de découverte Bing, jamais comme garantie de classement.
- Conserver `llms.txt` comme fichier auxiliaire. Ne pas lui attribuer un bénéfice Google : Google indique l'ignorer.

Ces principes filtrent les idées utiles de `zubair-trabzada/geo-seo-claude`. Ne pas reprendre ses scores propriétaires, pourcentages non sourcés, promesses de classement ou affirmations contraires aux sources officielles.

Sources de référence :

- https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
- https://developers.google.com/search/docs/appearance/structured-data/article
- https://blogs.bing.com/webmaster/February-2026/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview
- https://blogs.bing.com/webmaster/July-2025/Keeping-Content-Discoverable-with-Sitemaps-in-AI-Powered-Search
- https://github.com/zubair-trabzada/geo-seo-claude

## Style Samuel

- Écrire avec des phrases complètes et un rythme parlé, sans fragments publicitaires en série.
- Partir d'une tension concrète vécue par l'artisan.
- Préférer une précision utile à trois superlatifs.
- Éviter « révolutionnaire », « magique », « sans effort », les fausses urgences et les statistiques sans source.
- Ne jamais produire du contenu à l'échelle uniquement pour occuper une requête.
- Ne jamais utiliser de tiret cadratin (—). Préférer les deux-points, la virgule ou une nouvelle phrase.

## Structure visuelle du corps d'article

Le rendu du site stylise le Markdown de façon précise. Écrire le corps en respectant ces conventions :

- **Paragraphe d'ouverture** : il est affiché en grand (accroche). Une ou deux phrases fortes qui donnent la réponse ou la tension, avec la promesse en gras. Jamais de titre avant lui.
- **`##` (H2)** : numérotés automatiquement à l'affichage (01, 02…) et repris dans le sommaire latéral. 4 à 7 sections par article, intitulés courts qui répondent à une question. Ne pas numéroter manuellement.
- **`>` (blockquote)** : rendu comme un encadré premium « à retenir » (carte crème, filet orange). L'utiliser pour la formule, le chiffre clé, la date butoir ou le principe à mémoriser. Une seule idée par encadré, maximum un par section. Utiliser plusieurs lignes `>` consécutives pour un encadré multi-lignes.
- **Listes `-`** : puces stylisées. Chaque item est une phrase complète, avec majuscule et point final. Jamais de point-virgule en fin d'item. 3 à 5 items maximum.
- **Listes numérotées `1.`** : rendues avec des pastilles numérotées. Réserver aux procédures ordonnées.
- **Gras `**`** : réservé aux chiffres, dates et termes décisifs. Deux ou trois par section, pas plus.
- **Tableaux** : stylisés (en-tête contrasté). Uniquement pour comparer, jamais pour mettre en page.
- **Dernier paragraphe** : le CTA WhatsApp en lien Markdown, précédé d'une phrase qui justifie le contact.
