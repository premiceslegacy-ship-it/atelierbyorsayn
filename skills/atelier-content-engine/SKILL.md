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

## Recherche avant rédaction

Chaque sujet commence par une recherche datée, jamais par un mot-clé isolé :

1. Interroger Google Search Console pour `sc-domain:atelier-btp.fr` sur les 28 derniers jours et, si le signal est faible, sur les 90 derniers jours. Exécuter les deux vues `query + page` et `query` seule.
2. Relever la requête exacte, la page déjà visible, les impressions, clics, CTR, position moyenne, l'intention et le risque de cannibalisation. Une requête observée indique une demande, pas une capacité produit.
3. Chercher les formulations publiques de la niche dans les SERP, les pages concurrentes visibles et le corpus local `Social Growth/Atelier` et `Social Growth/Concurrents`. Les concurrents servent à comprendre le vocabulaire et les angles, jamais à fabriquer une preuve ou à copier une promesse.
4. Utiliser Google Ads, Analytics ou une source Trends uniquement si l'identité Atelier Marketing possède réellement la connexion autorisée et que la réponse fournit la donnée. Sinon écrire « donnée absente » et ne jamais inventer de volume, tendance, difficulté ou intention.
5. Si le site web Oracle est requis, consulter le skill local `/Users/useersm/Desktop/Business Orsyan/ORSAYN AI/skills/oracle-site-web.md` comme cadre de site contenu et SEO/GEO, puis utiliser ses règles avec la vérité produit Atelier. Ce fichier est un skill externe au dépôt Atelier, pas un skill `orsayn` à charger via le profil. Il ne remplace ni Search Console, ni la vérité produit, ni une source officielle. Si son chemin n'est pas accessible, le noter dans le journal de recherche et continuer sans inventer ce qui y serait publié.
6. Décider entre renforcer une page existante, fusionner, créer une page sœur ou ne rien publier. Chaque article doit avoir un rôle unique dans le cocon, une page parent, des frères utiles, une preuve, une limite et un prochain geste.

Conserver ces éléments dans le rapport de recherche ou le manifeste de lot : propriété, période, sources, état des données, requêtes observées, décision, hypothèses, preuves manquantes et date de révision. Les tendances et les volumes externes non vérifiés restent explicitement hors périmètre.

## Construire le cocon sémantique et le maillage

Avant de rédiger, situer le sujet dans un cocon sémantique précis : une famille de pages organisées autour d'une décision réelle d'artisan, et non une collection de mots-clés. Chaque sujet doit avoir un pilier, une intention unique, une page parent, des contenus frères utiles, une preuve Atelier ou métier disponible et une destination commerciale cohérente.

Pour chaque nouvelle URL, consigner dans `references/content-inventory.json` son pilier, son intention, sa requête principale, ses liens éditoriaux sortants, les articles associés injectés par le gabarit, les pages existantes qui devront créer un lien entrant et la page offre ou produit qu'elle aide à comprendre. Les champs `internalLinks`, `relatedLinks`, `incomingLinks` et `commercialTarget` doivent décrire le rendu attendu. Si une page existante répond déjà à la même intention, l'enrichir, la fusionner ou la rediriger plutôt que créer une page concurrente.

Le maillage suit le parcours du lecteur. Un article renvoie vers son pilier lorsque cela l'oriente, vers des articles frères lorsqu'ils répondent à la question suivante, vers une preuve lorsqu'elle crédibilise la réponse et vers la page commerciale seulement lorsque cette suite est logique. Les ancres décrivent naturellement la destination. Refuser les pages orphelines, les ancres exactes répétées mécaniquement et les liens ajoutés pour atteindre un quota.

## Rédiger

1. Créer le Markdown dans `content/blog/` avec le frontmatter défini dans `references/editorial-policy.md`.
2. Régler `draft: true` par défaut.
3. Générer l'image héro avec `node skills/atelier-content-engine/scripts/generate-hero.mjs <slug> "<hook HTML>"` (template de marque : fond noir, logo Atelier, hook en Geist). Voir « Image héro » dans `references/editorial-policy.md`. Ne jamais utiliser de photo de stock.
4. Écrire en français concret, phrasé, avec une idée par paragraphe et des intertitres qui répondent à une question.
5. Donner la réponse principale tôt, puis détailler limites, méthode, exemples et action suivante.
6. Distinguer clairement fait sourcé, expérience produit et recommandation.
7. Ajouter les liens internes prévus par le cocon seulement lorsqu'ils aident la lecture, puis déclarer dans `content-inventory.json` les liens sortants et les liens entrants à créer depuis l'existant.
8. Ajouter un tableau comparatif uniquement s'il tranche une vraie comparaison (prix, seuils, avant/après), et une FAQ visible seulement à partir de 3 questions concrètes distinctes. Voir « Tableaux comparatifs et données chiffrées » et « FAQ visible » dans `references/editorial-policy.md`.
9. Respecter la hiérarchie des titres : un seul H1 (généré par le gabarit), H2 pour les sections, H3 pour les sous-points et les questions de FAQ.
10. Terminer par un CTA WhatsApp cohérent avec le sujet.

## Vérifier

1. Exécuter `npm run validate:content`.
2. Vérifier chaque claim, chaque date, chaque prix et chaque citation dans sa source.
3. Vérifier l'absence de requête primaire en double et de date future.
4. Vérifier que l'image héro a été générée par `generate-hero.mjs` (pas de photo de stock), fait 1200x750, et que le `.webp` ET le `.avif` existent tous les deux et sont à jour (le gabarit `<picture>` sert l'AVIF en priorité).
5. Construire le site puis exécuter `npm run test:static` pour contrôler les articles pré-rendus, leurs canonical, leur JSON-LD, leur destination commerciale et l'égalité entre les liens article réellement rendus et l'inventaire.
6. Vérifier que le fil d'Ariane visuel (`<nav aria-label="Fil d'Ariane">`) est présent dans le HTML pré-rendu et correspond exactement au `BreadcrumbList` JSON-LD.
7. Si un tableau ou une FAQ ont été ajoutés, relire qu'ils respectent `references/editorial-policy.md` et que tout chiffre cité est sourcé.
8. Vérifier dans le rendu final chaque lien interne sortant, puis confirmer qu'au moins une page pertinente du site pointe vers le nouvel article. Une URL sans lien entrant utile reste un brouillon.
9. Vérifier que l'article ne concurrence pas une autre page Atelier sur la même intention et que son CTA mène à l'étape logique du lecteur.

## Publier

Ne passer `draft` à `false` que si l'utilisateur demande explicitement de publier. Lors de la publication :

1. Définir une date réelle dans `publishedAt`.
2. Ne renseigner `updatedAt` qu'après une modification substantielle.
3. Mettre à jour `references/content-inventory.json`.
4. Relancer validation, build et contrôle statique.
5. Ne jamais automatiser la mise en ligne quotidienne sans autorisation distincte.

Cadence de planification : `2 articles tous les 2 jours` peut servir de cible de préparation lorsque la recherche montre deux intentions distinctes. Cette cadence n'autorise pas la publication autonome. Par défaut, chaque lot crée deux brouillons `draft: true`, met à jour l'inventaire et livre un rapport de décision. Le passage en `draft: false`, le commit, le push, le déploiement et la soumission Search Console nécessitent une autorisation séparée.

## Cadence cron SEO/GEO

Le job récurrent de préparation suit ce protocole : recherche Search Console, contrôle public du site, comparaison avec le corpus niche et les concurrents visibles, choix de deux intentions non concurrentes, rédaction de deux brouillons, génération des deux héros, mise à jour de l'inventaire, build et validation. Il doit produire un résumé avec les requêtes observées, les pages touchées, les sources, les limites, les liens entrants attendus et la décision recommandée.

Le job ne doit pas pousser de commit, publier, modifier une fiche, demander une indexation, contacter un prospect, dépenser un budget ou utiliser une connexion Treg hors périmètre. Il peut écrire dans le dépôt de travail prévu, mais laisse les articles en `draft: true` tant qu'un humain n'a pas validé le lot. Si une recherche ne révèle pas deux opportunités distinctes, le job produit un article et un rapport « second sujet à surveiller » plutôt que de remplir artificiellement le calendrier.

## Indexation après publication

Le push sur `main` déclenche automatiquement le workflow `.github/workflows/indexnow.yml` : il attend que le déploiement Vercel du commit soit `READY`, rebuild pour régénérer `sitemap.xml` avec la nouvelle URL, puis soumet toutes les URLs du sitemap à l'API IndexNow (`scripts/submit-indexnow.ts`), ce qui notifie Bing et les moteurs partenaires du protocole. Aucune action manuelle n'est requise après un `git push` sur `main` : ne pas relancer `npm run submit:indexnow` à la main sauf si le workflow a échoué (voir onglet Actions du repo GitHub).

Ne couvre pas Google (IndexNow n'y est pas adopté) : l'indexation Google reste soumise au crawl normal via le sitemap déclaré dans `robots.txt` et Google Search Console.
