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
- https://developers.google.com/search/docs/appearance/structured-data/breadcrumb
- https://developers.google.com/search/docs/appearance/structured-data/faqpage
- https://blogs.bing.com/webmaster/February-2026/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview
- https://blogs.bing.com/webmaster/July-2025/Keeping-Content-Discoverable-with-Sitemaps-in-AI-Powered-Search
- https://github.com/zubair-trabzada/geo-seo-claude

## Image héro

Toute image héro d'article suit le même gabarit de marque, généré (pas une photo de stock) : fond `#080807` uni, wordmark Atelier blanc en haut à gauche, un hook en bas à gauche en Geist (blanc, un ou deux mots clés en orange `#ff9f1c` via `<em>`), format 1200×750.

- Générer avec `node skills/atelier-content-engine/scripts/generate-hero.mjs <slug> "<hook HTML>"`. Le script s'appuie sur `assets/hero-template.html`, capture avec Playwright et exporte directement en `.webp` dans `public/images/blog/<slug>.webp`.
- Le hook est une phrase courte (2-3 lignes max à l'écran), jamais le titre complet de l'article ni le nom d'un métier ciblé : il doit parler au lecteur avant de le renseigner. S'appuyer sur la tension ou la promesse centrale de l'article, dans le ton de `product-truth.md` et sans superlatif interdit par la politique de style.
- Rester sobre : pas de dégradé, pas de cartes, pas de chiffres empilés, pas de visuel décoratif. Le contraste texte blanc/orange sur fond noir porte tout le message.
- Utiliser `'` (apostrophe droite) dans le hook, comme dans le corps de l'article, jamais `'` typographique.
- Toujours passer par le script, jamais de capture manuelle ou de retouche à la main : la cohérence visuelle entre articles vient de la répétition exacte du même gabarit.

## Fil d'Ariane

- Chaque page article et page métier doit exposer **deux formes** du fil d'Ariane : un `<nav aria-label="Fil d'Ariane">` visible dans le HTML rendu (`Accueil > Le journal > Titre`) et le JSON-LD `BreadcrumbList` correspondant. Les deux doivent lister exactement les mêmes étapes, dans le même ordre. Un `BreadcrumbList` sans nav visible est incomplet : Google Search Console peut le signaler.
- Ne jamais inclure la page courante comme lien actif dans le fil visuel (dernier élément en `<span aria-current="page">`, pas de `<a>`).
- Vérifier après tout ajout de route qu'un fil d'Ariane a été implémenté des deux côtés, pas seulement dans les données structurées.

## Tableaux comparatifs et données chiffrées

- Ajouter un tableau Markdown dès qu'il existe une vraie comparaison à trancher : formules de prix, seuils réglementaires par taille d'entreprise, avant/après une réforme, options avec compromis différents. Un tableau qui ne fait que reformuler une liste n'apporte rien : le supprimer.
- Chaque tableau garde une colonne de référence claire (ex. seuil, date, montant) et cite sa source dans le paragraphe qui précède ou suit, jamais dans une cellule.
- Toute donnée chiffrée (prix, pourcentage, délai, seuil) suit la hiérarchie des sources ci-dessus. Un chiffre produit Atelier (temps gagné, taux de conversion, résultat client) doit provenir de `product-truth.md` ou d'un cas client déjà approuvé, jamais d'une estimation inventée pour l'article.
- Dater explicitement tout chiffre sensible à évoluer (barème, seuil, taux) dans la phrase même, pour que l'article reste vérifiable après une mise à jour réglementaire.
- Un chiffre produit sans source vérifiable ne s'affiche pas en gras ni en encadré `>` : le retirer ou le reformuler en ordre de grandeur qualitatif.

## FAQ visible

- Ajouter une section FAQ en fin d'article seulement quand au moins 3 questions concrètes et distinctes se dégagent du sujet (pas de questions fabriquées pour occuper une requête).
- La FAQ doit être visible dans le corps rendu (titres `###` en question, réponse en paragraphe juste en dessous), pas seulement injectée en JSON-LD `FAQPage`. Si un balisage `FAQPage` est ajouté, il doit refléter exactement le texte visible, question par question.
- Une réponse de FAQ reste courte (2 à 4 phrases), répond directement, puis renvoie si utile vers la section de l'article qui détaille.

## Hiérarchie des titres (Hn)

- Un seul `H1` par page, déjà généré par le gabarit à partir de `title` : ne jamais écrire de `#` dans le corps Markdown.
- Les `##` (H2) structurent les sections principales et alimentent le sommaire ; ne pas sauter de niveau (pas de `####` sans `###` parent).
- Utiliser `###` (H3) pour des sous-points à l'intérieur d'une section H2 (dont les questions de FAQ), jamais pour créer une section de niveau supérieur.
- Chaque titre reformule une question ou une action, jamais un simple mot-clé isolé.

## Maillage interne et liens externes

- Chaque article ajoute au moins un lien interne pertinent (article du journal ou page métier concernée) et le déclare dans `internalLinks` de `content-inventory.json`.
- Un lien externe ne pointe que vers une source de la hiérarchie ci-dessus ou une page produit Atelier ; jamais vers un concurrent commercial ni un site sans rapport avec l'affirmation citée.
- Ne jamais solliciter, acheter ou fabriquer un backlink entrant. La seule stratégie de liens entrants légitime est un contenu assez utile et précis pour être cité spontanément ; ne pas concevoir d'article dans le seul but de générer des backlinks.

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
