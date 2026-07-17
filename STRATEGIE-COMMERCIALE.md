# Stratégie commerciale et pricing — Atelier

> Dernière mise à jour : mai 2026.
> Ce document est la référence pour la tarification, les offres, la logique de gating, et le positionnement commercial d'Atelier.

---

## 1. Le modèle commercial d'Atelier n'est pas du SaaS classique

Atelier est un outil déployé par client — 1 Supabase, 1 Worker Cloudflare, 1 domaine, données isolées. Ce n'est pas une plateforme multi-tenant avec des tiers enforced dans le code.

**Ce que ça implique :**

- Le gating n'est pas dans le code applicatif, mais dans la table `organization_modules` — activable et désactivable depuis le cockpit Orsayn sans toucher au code client
- **Toutes les fonctionnalités IA de l'app sont accessibles à tous les tiers MRR.** Ce qui change entre les tiers, c'est le quota mensuel d'usage, pas l'accès aux fonctionnalités.
- L'agent WhatsApp est l'exception : il est réservé aux tiers Pro et Expert, avec des quotas très différents entre les deux.
- La tarification repose sur deux leviers : le **setup one-shot** (prestation de service) et le **MRR sur les modules IA** (abonnement d'usage)

---

## 2. Ancrage de valeur avant les prix

Ne pas comparer le prix au coût de déploiement. Comparer à ce que le client paierait autrement.

| Alternative | Coût mensuel | Ce qu'elle n'a pas |
|-------------|-------------|-------------------|
| Assistante mi-temps | 700-900€ | Pas de WhatsApp, pas de PDF auto, pas de rentabilité chantier |
| Batigest (ERP BTP) | 150-300€ | Lourd, pas mobile, pas d'IA, pas de WhatsApp |
| Sellsy (généraliste) | 99-199€ | Pas BTP, pas de chantiers, pas de WhatsApp agent |
| Obat (le plus proche) | 59-149€ | Pas de WhatsApp, pas de rentabilité réelle, pas d'agent IA |
| Excel + Word | 0€ | Tout est manuel, aucune relance, aucune visibilité |

Atelier est spécialisé BTP, mobile-first, avec IA intégrée et agent WhatsApp. Il se positionne au-dessus de Sellsy, pas en-dessous d'Obat.

---

## 3. Coûts réels — IA + Twilio + infra

Avant de fixer les quotas, comprendre ce que chaque action coûte réellement — IA, messagerie WhatsApp et infra.

### 3.1 Tarifs modèles IA (OpenRouter, mai 2026)

| Modèle | Coût input /M tokens | Coût output /M tokens |
|--------|---------------------|----------------------|
| Gemini 2.5 Flash Lite | $0,075 | $0,30 |
| Gemini 2.5 Flash | $0,15 | $0,60 |
| Claude Haiku 4.5 | $0,80 | $4,00 |
| Voxtral Mini (audio) | $0,004/min | — |

### 3.2 Tarifs Twilio WhatsApp (mai 2026, HT)

Le numéro WhatsApp Business est mutualisé côté Atelier (Twilio compte Orsayn). Chaque client WA actif paie une quote-part du numéro + ses messages.

| Poste | Tarif Twilio | Note |
|-------|-------------|------|
| Numéro WA Business (Twilio) | ~10$/mois total | Mutualisé sur ~10 clients WA actifs = ~1€/client/mois |
| Message dans session ouverte (client -> bot -> client) | ~0,005-0,006€/message | Session 24h initiée par le client |
| Message outbound hors session (template proactif) | ~0,008-0,012€/message | Fenêtre service 24h fermée — coût plus élevé |
| Note vocale reçue (transcription Voxtral) | ~0,004€/min | En plus du message WA |

**Coût Twilio moyen par message échangé :** ~0,006€ (session) + 0,001€ quote-part numéro = **~0,007€/message total**

**Coût Twilio pour les messages proactifs (Expert) :** ~0,010€/message (template outbound hors session)

### 3.3 Coût unitaire par action IA

| Action | Modèle | Tokens in/out (estimé) | Coût IA unitaire HT |
|--------|--------|----------------------|---------------------|
| Relance email rédigée | Haiku 4.5 | 800 / 400 | ~0,002€ |
| Résumé "Ma semaine" | Gemini Flash Lite | 3 000 / 600 | ~0,0004€ |
| Analyse devis (texte) | Gemini Flash Lite | 2 000 / 1 500 | ~0,0006€ |
| Analyse devis (image/PDF) | Gemini Flash Lite | 4 000 / 1 500 | ~0,0008€ |
| Planning semaine IA | Haiku 4.5 | 2 500 / 800 | ~0,005€ |
| Assistant chantier (1 échange) | Haiku 4.5 | 1 500 / 500 | ~0,003€ |
| Suggestions tâches ou jalons | Gemini Flash Lite | 1 000 / 800 | ~0,0003€ |
| Import document PDF/image | Gemini Flash Lite | 5 000 / 2 000 | ~0,0009€ |
| Saisie catalogue IA | Gemini Flash | 1 500 / 500 | ~0,0005€ |
| Message WA agent (1 tour simple) | Gemini Flash | 3 000 / 800 | ~0,0009€ IA + ~0,007€ Twilio = **~0,008€ total** |
| Message WA agent (3 tours + outils) | Gemini Flash | 8 000 / 2 000 | ~0,003€ IA + ~0,007€ Twilio = **~0,010€ total** |
| Transcription vocale WA (1 min) | Voxtral Mini | 1 min | ~0,004€ IA + ~0,007€ Twilio = **~0,011€ total** |
| Rapport chantier PDF (intro IA) | Haiku 4.5 | 2 000 / 600 | ~0,004€ |
| Estimation main d'oeuvre | Gemini Flash Lite | 1 500 / 800 | ~0,0004€ |
| Résumé chantier (assistant) | Haiku 4.5 | 3 000 / 800 | ~0,005€ |
| Brief matin proactif WA | Gemini Flash Lite | 2 000 / 400 | ~0,0003€ IA + ~0,010€ Twilio = **~0,010€ total** |
| Alerte marge proactive WA | Gemini Flash Lite | 1 000 / 200 | ~0,0001€ IA + ~0,010€ Twilio = **~0,010€ total** |
| Saisie catalogue IA | Gemini Flash | 1 500 / 500 | ~0,0005€ |
| Scan ticket (OCR app) | Gemini Flash | 4 000 / 1 500 | ~0,0008€ |
| Saisie vocale (app) | Voxtral Mini | par minute | ~0,004€/min |

### 3.4 Coût total mensuel par tier (IA + Twilio + infra)

| Poste | Starter | Pro | Expert |
|-------|---------|-----|--------|
| Relances auto (cron) | 15 × 0,002€ = 0,030€ | 30 × 0,002€ = 0,060€ | 50 × 0,002€ = 0,100€ |
| Résumés semaine | 8 × 0,0004€ = 0,003€ | 8 × 0,0004€ = 0,003€ | 8 × 0,0004€ = 0,003€ |
| Analyses devis | 10 × 0,0007€ = 0,007€ | 20 × 0,0007€ = 0,014€ | 40 × 0,0007€ = 0,028€ |
| Planning IA | 4 × 0,005€ = 0,020€ | 8 × 0,005€ = 0,040€ | 8 × 0,005€ = 0,040€ |
| Assistant chantier | 10 × 0,003€ = 0,030€ | 30 × 0,003€ = 0,090€ | 80 × 0,003€ = 0,240€ |
| Suggestions tâches/jalons | 5 × 0,0003€ = 0,002€ | 15 × 0,0003€ = 0,005€ | 20 × 0,0003€ = 0,006€ |
| Import documents | 5 × 0,0009€ = 0,005€ | 10 × 0,0009€ = 0,009€ | 20 × 0,0009€ = 0,018€ |
| Catalogue IA | 10 × 0,0005€ = 0,005€ | 30 × 0,0005€ = 0,015€ | 50 × 0,0005€ = 0,025€ |
| Rapport chantier PDF (intro) | 3 × 0,004€ = 0,012€ | 8 × 0,004€ = 0,032€ | 15 × 0,004€ = 0,060€ |
| Estimation main d'oeuvre | 5 × 0,0004€ = 0,002€ | 10 × 0,0004€ = 0,004€ | 20 × 0,0004€ = 0,008€ |
| Scan ticket OCR (app) | 8 × 0,0008€ = 0,006€ | 20 × 0,0008€ = 0,016€ | 40 × 0,0008€ = 0,032€ |
| Saisie vocale (app) | 20 min × 0,004€ = 0,080€ | 60 min × 0,004€ = 0,240€ | ~120 min × 0,004€ = 0,480€ |
| WA agent msgs (IA + Twilio) | — | 120 × 0,010€ = 1,200€ | 500 × 0,010€ = 5,000€ |
| Vocal WA (IA + Twilio) | — | 10 min × 0,011€ = 0,110€ | 40 min × 0,011€ = 0,440€ |
| Proactif WA (msgs outbound) | — | — | 30 × 0,010€ = 0,300€ |
| Quote-part numéro Twilio | — | 1,000€ | 1,000€ |
| Infra Supabase + CF (free tier) | 0,150€ | 0,150€ | 0,150€ |
| **Coût total mensuel** | **~0,352€** | **~2,988€** | **~7,930€** |

> Cette version intègre l'ensemble des features IA réellement déployées : catalogue, rapport chantier, estimation MO, scan ticket OCR et saisie vocale (app). La saisie vocale (Voxtral Mini, 0,004€/min) est le poste le plus sensible côté app — 20 min/mois en Starter (~0,080€) et 60 min/mois en Pro (~0,240€). Malgré ces ajouts, les marges restent au-dessus de 94% sur tous les tiers. Le planning IA tourne sur Haiku 4.5 (plus fiable que DeepSeek V4 Flash) — coût unitaire légèrement supérieur (~0,005€ vs 0,0004€) mais impact total négligeable.

### 3.5 Plancher de prix à 70% de marge minimum (coûts réels)

| Tier | Coût total réel/mois | Floor 70% marge | Floor 80% marge | Prix retenu |
|------|---------------------|-----------------|-----------------|-------------|
| Starter | ~0,35€ | 1,17€ | 1,75€ | **39€** |
| Pro (avec Twilio 120 msg) | ~3,00€ | 10,00€ | 15,00€ | **69€** |
| Expert (avec Twilio 500 msg + proactif) | ~7,93€ | 26,43€ | 39,65€ | **119€** |
| Expert WA intensif (800 msg) | ~12,50€ | 41,67€ | 62,50€ | Sur-mesure ou 119€ avec cap |
| Worst case (Supabase Pro + WA 800 msg) | ~57,50€ | 192€ | 288€ | Conversation tarifaire |

**Conclusion :** Twilio rend le coût du tier Expert non-négligeable dès 500 msg/mois. À 119€, la marge reste >93% en usage normal et tombe à ~77% en usage intensif 800 msg — acceptable. Le worst case (Supabase Pro payant + WA très intensif) est le seul profil qui nécessite une conversation tarifaire.

---

## 4. Structure tarifaire

### 4.1 Setup one-shot — prestation de déploiement

Le setup livre un ERP BTP complet sur l'infrastructure propre du client : Supabase, Cloudflare Workers, domaine, migrations SQL, Auth + Storage + Resend, profil entreprise + catalogue + mémoire IA initialisée, onboarding owner, tests end-to-end, 30 jours de support démarrage.

| Configuration | Sans MRR | Avec MRR |
|--------------|----------|---------|
| App seule | 3 000€ | 1 500€ |
| App + conformité facturation électronique (PDP partenaire) | à partir de 3 450€ | à partir de 1 950€ |

Le setup est réduit quand le client prend un MRR : engagement long terme qui amortit l'acquisition. Le surcoût facturation électronique dépend du volume d'activité du client (nombre de transactions) — il commence à +450€ et monte selon le profil.

### 4.2 MRR — tiers et quotas

**Principe :** toutes les fonctionnalités IA de l'app sont accessibles à tous les tiers. Ce qui change, c'est le quota mensuel. L'agent WhatsApp est réservé Pro et Expert. Les prix Pro et Expert intègrent le coût Twilio réel (numéro mutualisé + messages).

| Tier | Nom | Prix HT/mois | Quota mensuel |
|------|-----|-------------|---------------|
| 1 | IA Starter | 39€ | 20 relances + 8 résumés semaine + 15 analyses devis + 15 suggestions + 15 imports + 10 plannings IA + 25 échanges assistant chantier + **10 extractions catalogue + 20 min vocal app** + rapports/estimations/scan tickets illimités |
| 2 | IA Pro | 69€ | 40 relances + 8 résumés + 40 analyses + 40 suggestions + 30 imports + plannings illimités + 60 échanges assistant + **30 extractions catalogue + 60 min vocal app** + rapports/estimations/scan tickets illimités + **120 messages WA agent + 10 min vocal WA** |
| 3 | IA Expert | 119€ | Tout illimité (hors WA) + **500 messages WA agent + 40 min vocal WA + proactif WA (30 msgs/mois) + OCR photos WA** |

**Pourquoi Pro à 69€ :** le coût Twilio réel sur 120 messages est ~1,20€/mois — marge >95%. L'objectif est de rendre le passage à Expert évident : +50€/mois pour 4x plus de messages WA + proactif + vocal étendu.

**Pourquoi Expert à 119€ :** 500 messages Twilio = ~3,50€/mois + 40 min vocal = ~0,44€ + proactif 30 msgs = ~0,30€ → coût Twilio total ~4,24€/mois. À 119€, marge >93% en usage normal. L'upgrade Starter → Pro → Expert doit être évident à chaque étape.

### 4.3 Modules activés par tier

| Module | Starter | Pro | Expert | Description |
|--------|---------|-----|--------|-------------|
| `relances_ai` | Oui | Oui | Oui | Relances email auto générées par IA |
| `weekly_summary` | Oui | Oui | Oui | Résumé "Ma semaine" chaque lundi |
| `quote_ai` | Oui | Oui | Oui | Analyse et suggestions sur devis |
| `planning_ai` | Oui | Oui | Oui | Planning semaine généré par IA |
| `chantier_assistant` | Oui | Oui | Oui | Assistant conversationnel chantier |
| `suggest_tasks` | Oui | Oui | Oui | Suggestions jalons et tâches |
| `catalog_ai` | Oui | Oui | Oui | Extraction catalogue (vocal, texte, PDF, presets) |
| `document_import_ai` | Oui | Oui | Oui | Import PDF/image depuis l'interface web |
| `chantier_report_ai` | Oui | Oui | Oui | Intro narrative du rapport PDF chantier |
| `labor_estimate_ai` | Oui | Oui | Oui | Estimation main d'oeuvre |
| `receipt_ocr` | Oui | Oui | Oui | Scan ticket de caisse depuis l'app (dépenses chantier) |
| `voice_input` | Oui | Oui | Oui | Saisie vocale depuis l'app (transcription Voxtral) |
| `whatsapp_agent` | Non | Oui | Oui | Agent conversationnel via WhatsApp |
| `whatsapp_ocr` | Non | Non | Oui | Scan photo facture fournisseur envoyée via WA |
| `whatsapp_proactive` | Non | Non | Oui | Messages proactifs initiés par l'agent |

> **`receipt_ocr` vs `whatsapp_ocr` :** deux modules distincts. `receipt_ocr` = scan photo depuis l'interface app (bouton "Ajouter une dépense" dans un chantier) — Gemini multimodal, accessible à tous les tiers. `whatsapp_ocr` = la même extraction mais déclenchée par une photo envoyée dans la conversation WA — dépend de `whatsapp_agent`, réservé Expert (phase 5 du plan WA).

### 4.4 Marge brute réelle par tier (avec Twilio)

| Tier | Coût IA + vocal app | Coût Twilio | Infra | Total | Prix | Marge |
|------|---------------------|------------|-------|-------|------|-------|
| Starter 39€ | ~0,20€ | 0€ | 0,15€ | ~0,35€ | 39€ | 99,1% |
| Pro 69€ (120 msg WA) | ~0,63€ | ~2,21€ | 0,15€ | ~3,00€ | 69€ | 95,7% |
| Expert 119€ (500 msg WA) | ~1,46€ | ~6,32€ | 0,15€ | ~7,93€ | 119€ | 93,3% |
| Expert WA intensif (800 msg) | ~1,46€ | ~8,88€ | 0,15€ | ~10,49€ | 119€ | 91,2% |
| Expert + B2Brouter M0 | ~7,93€ + 15€ B2B | — | — | — | 119€ MRR + 250€/an | >93% MRR / ~28% B2B |
| Worst case (Supabase Pro + WA 800 msg) | ~1,46€ | ~8,88€ | 45€ | ~55,34€ | 119€ | 53% |

Le worst case (Supabase Pro payant + WA très intensif) est le seul profil sous 70% de marge. Ce profil correspond à un client > 1M€ de CA avec DB > 500MB et 800+ messages WA/mois. Déclencheur cockpit : conversation tarifaire ou passage automatique à un tarif sur-mesure.

### 4.5 Quotas — comportement en cas de dépassement

**Le message au client n'est jamais un mur.** C'est une invitation à passer au niveau supérieur.

**V1 — gestion manuelle via cockpit :**
Le cockpit Orsayn affiche, par client, l'usage mensuel par feature vs son quota. Si un client approche ou dépasse son quota, le cockpit propose d'envoyer un email d'upgrade ou de contacter le client directement.

**V2 — automatique dans `callAI.ts` :**
Avant chaque appel IA, vérification du quota consommé ce mois dans `usage_logs`. Si quota atteint :
- Côté UI : message contextuel "Vous avez atteint votre quota mensuel de [feature]. Passez en [tier supérieur] pour continuer."
- Côté agent WA : message naturel dans la conversation "Tu as épuisé ton quota mensuel de messages pour ce mois. Si tu veux continuer, envoie-moi 'upgrade' et je t'explique."
- Cron mensuel (1er du mois à 0h00) : remise à zéro des compteurs dans `usage_logs`

**Messages WA au-delà du quota Expert (300) :**
Deux options présentées au client : passage automatique à la facturation à l'usage (+0,50€/tranche 50 messages) ou upgrade vers un tarif sur-mesure. Le client choisit dans son espace settings.

### 4.6 B2Brouter — facturation annuelle séparée

B2Brouter n'est **pas intégré dans le MRR mensuel** — il est facturé annuellement en prestation séparée, en fonction du volume réel de transactions du client. C'est un poste de coût fixe côté Orsayn, indépendant du MRR.

**Pourquoi annuel et pas mensuel :** B2Brouter facture sur abonnement annuel payé d'avance. Répercuter ce coût en mensuel crée une friction tarifaire inutile et rend le MRR illisible. Un paiement annuel positionne B2Brouter comme un investissement infrastructure, pas un abonnement logiciel.

#### Tarifs B2Brouter officiels (HT, mai 2026)

Activation one-shot : **150€ HT** la première année, refacturée **200€ HT** au client.

| Tranche | Transactions incluses/mois | Coût Atelier/mois | Coût Atelier/an | Refacturé client/an | Marge |
|---------|---------------------------|-------------------|-----------------|---------------------|-------|
| M0 | 1-50 | 15€ | 180€ | 250€ | 70€ |
| M1 | 51-100 | 29€ | 348€ | 450€ | 102€ |
| M2 | 101-300 | 59€ | 708€ | 900€ | 192€ |
| M3 | 301-600 | 89€ | 1 068€ | 1 350€ | 282€ |
| M4 | 601-1 500 | 169€ | 2 028€ | Sur devis | — |
| M5+ | > 1 500 | 520€+ | 6 240€+ | Sur devis | — |

> Trans. supplémentaires : 0,435€ (M0-M1) / 0,295€ (M2) / 0,222€ (M3) / 0,169€ (M4) — refacturer avec la même marge ~20%.

#### Profil type d'un client Atelier

La majorité des artisans BTP (1-5 personnes) émet 10-40 factures/mois. Le profil type est **M0** (15€/mois Atelier). Très peu de clients Atelier dépasseront M2.

| Profil client | Volume | Tranche | Coût Atelier/an | Facturé client/an |
|---------------|--------|---------|-----------------|-------------------|
| Artisan seul | < 30 tx/mois | M0 | 180€ | 250€ |
| Petite équipe active | 30-80 tx/mois | M0-M1 | 180-348€ | 250-450€ |
| PME BTP | 80-250 tx/mois | M1-M2 | 348-708€ | 450-900€ |

#### Mode export only (défaut, inclus dans tous les setups)

Atelier génère PDF + XML Factur-X sans passer par B2Brouter. Jusqu'à l'obligation d'émission, le client peut continuer son envoi normal PDF/email ; l'app ne marque pas artificiellement une facture comme déposée sur une PA. Coût Orsayn : 0€. Inclus dans tous les setups sans surcoût — argument commercial ("préparé réforme facturation électronique 2026 dès aujourd'hui").

### 4.7 Sans MRR — fonctionnement de l'app

L'app tourne complète. Aucun module IA n'est actif. Ce que le client n'a pas : relances auto IA, résumé semaine, analyse devis IA, assistant chantier, suggestions tâches, agent WhatsApp, import document IA, planning IA.

Ce qu'il garde : PDFs, emails transactionnels, chantiers, catalogue, planning, équipes, rentabilité arithmétique, export comptable, signature électronique, formulaire public.

**Pitch :** "L'app tourne. Vous gérez tout manuellement. L'IA est en veille. Le jour où vous voulez qu'elle travaille pour vous, on l'active en 24h."

---

## 5. Cockpit Orsayn — configuration, suivi et gestion des abonnements

### 5.1 Modèle de données : où est stocké l'abonnement d'un client

L'abonnement d'un client est piloté par deux tables Supabase (dans la DB du **cockpit Orsayn**, pas dans la DB client) :

```
organization_subscriptions          -- 1 ligne par client
─────────────────────────────────
organization_id     uuid            -- identifiant de l'instance client
tier                text            -- 'setup_only' | 'starter' | 'pro' | 'expert'
ai_billing_mode     text            -- 'orsayn_shared' | 'client_owned'
mrr_ht              integer         -- prix HT mensuel en euros (39 / 89 / 149 / 0)
started_at          timestamptz
renews_at           timestamptz     -- date de renouvellement mensuel
trial_ends_at       timestamptz     -- null si pas d'essai
b2brouter_active    boolean         -- facturation électronique activée
overflow_mode       text            -- 'block' | 'charge' | 'upgrade_prompt'
notes               text            -- note libre (ex: "30j essai Expert offert")

organization_quotas                 -- quotas par client (dénormalisé du tier)
─────────────────────────────────
organization_id     uuid
feature             text            -- 'relances_ai' | 'wa_messages' | ...
quota_monthly       integer         -- -1 = illimité
current_month_count integer         -- mis à jour à chaque appel IA
current_month_cost  numeric(10,4)   -- coût estimé cumulé ce mois (IA + Twilio)
reset_at            timestamptz     -- 1er du mois prochain
```

Dans le cockpit actuel, la facturation électronique est pilotée par `einvoicing_config.mode` : `off`, `export_only` ou `b2brouter`. Le booléen historique `b2brouter_active` reste seulement un raccourci d'affichage/compatibilité, pas la source de vérité produit.

Le champ `ai_billing_mode` sépare la marge réelle du signal pricing :
- `orsayn_shared` : Orsayn porte le coût IA ; le coût est soustrait de la marge.
- `client_owned` : le client utilise sa propre clé OpenRouter/Mistral ; le cockpit conserve la conso pour comprendre l'usage, mais ne la compte pas comme coût Orsayn.

Ces deux tables vivent dans le cockpit. Chaque instance cliente a `usage_logs` dans **sa propre DB** — le cockpit agrège via les `OPERATOR_INGEST_URL` de chaque client (le worker Cloudflare de chaque client pousse ses logs vers le cockpit).

### 5.2 Comment configurer un client depuis le cockpit

Quand tu onboardes un nouveau client ou que tu changes son tier, tu as une fiche client dans le cockpit avec ces champs éditables :

```
┌─ Fiche client ──────────────────────────────────────────────┐
│ Nom            : Weber Tôlerie                               │
│ Instance URL   : weber.atelier.app                           │
│ Tier actuel    : IA Pro (89€/mois)          [Changer tier]  │
│ MRR HT         : 89€   Renouvellement : 01/06/2026          │
│ Essai Expert   : non   [Activer essai 30j]                   │
│ Facturation IA : clé Orsayn / clé client                     │
│ Fact. élec.    : export_only   [Configurer]                  │
│ WhatsApp       : Oui — numéro Atelier mutualisé              │
│ Overflow mode  : [block] | charge | upgrade_prompt           │
│ Notes          : client référencé via bouche-à-oreille       │
└──────────────────────────────────────────────────────────────┘
```

**Changer le tier** déclenche :
1. Mise à jour de `organization_subscriptions.tier` dans le cockpit
2. Appel API vers l'instance cliente pour mettre à jour `organization_modules` (activer/désactiver les modules selon la table 4.3)
3. Mise à jour des quotas dans `organization_quotas` (nouveaux plafonds)
4. Pas de redéploiement, pas de touche au code — 100% piloté par données

**Configurer B2Brouter** :
1. Vérifier que `B2BROUTER_API_KEY`, `B2BROUTER_ACCOUNT_ID` et `B2BROUTER_WEBHOOK_SECRET` sont configurés dans le Worker client
2. Passer `einvoicing_config.mode` à `b2brouter` dans le cockpit
3. Renseigner l'environnement, le modèle `edoc_exchange`, l'`account_id` et le statut annuaire
4. Lancer une config-sync vers l'instance cliente

### 5.3 Vue de consommation par client

Pour chaque client actif, le cockpit affiche la consommation mensuelle en temps réel :

```
Client : Weber Tôlerie        Tier : IA Pro (89€/mois)
Mois : mai 2026               Renouvellement : 01/06/2026
Overflow : block (quota atteint = fonc. coupée jusqu'au 1er)
────────────────────────────────────────────────────────────

Usage mensuel vs quota :

Relances IA          [=========-]  22/ 40   55%   ~0,044€
Analyses devis       [======----]  17/ 40   43%   ~0,012€
Assistant chantier   [==========]  61/ 60  102%   ~0,183€  ← DEPASSE
WA agent messages    [======----]  74/120   62%   ~0,740€  (IA + Twilio)
Vocal WA             [====------]   4/ 10   40%   ~0,044€
Import documents     [===-------]   8/ 30   27%   ~0,007€
Plannings IA         [===-------]   3/  ∞    —    ~0,001€

Coût IA OpenRouter ce mois :   ~0,231€
Coût Twilio ce mois :          ~0,530€  (74 msg × 0,007€ + numéro ~0,100€/sem.)
Coût infra Supabase + CF :     ~0,150€
─────────────────────────────────────
Coût total Atelier ce mois :   ~0,911€
MRR encaissé :                  89,00€
Marge brute :                   98,98%

[Proposer upgrade Expert 149€]   [Email client]   [Ajuster quota ponctuellement]
```

### 5.4 Les 3 comportements possibles en cas de dépassement de quota

Tu choisis le comportement par client via le champ `overflow_mode`. Trois options :

#### Mode `block` (défaut recommandé)

Le client atteint son quota : la fonctionnalité est coupée pour le reste du mois.

- Côté app (UI) : message contextuel — "Vous avez atteint votre quota mensuel de [feature]. Votre quota se renouvelle le 1er [mois]. Pour continuer maintenant, passez en [tier supérieur]."
- Côté agent WA : message naturel dans la conversation — "Tu as épuisé ton quota messages ce mois. Tes prochains messages seront traités à partir du 1er. Tu veux que je t'envoie les infos pour passer à l'offre Expert ?"
- Cron 1er du mois 0h00 : remise à zéro de tous les compteurs

**Avantage :** zéro surprise tarifaire pour toi. **Inconvénient :** frustrant pour un client actif en fin de mois.

#### Mode `upgrade_prompt`

Quota atteint : la fonctionnalité continue de fonctionner, mais le client reçoit une proposition d'upgrade (email + notification in-app).

- Pas de coupure immédiate
- Cockpit : badge rouge + notification te signalant l'envoi automatique de la proposition
- Si le client n'upgrade pas dans 48h : bascule automatique en mode `block`

**Usage :** clients à fort potentiel que tu ne veux pas frustrer, ou pendant une période de ramp-up.

#### Mode `charge`

Quota atteint : usage supplémentaire facturé à la consommation.

- WA messages au-delà du quota : +0,50€ HT / tranche de 50 messages supplémentaires
- Autres features : +[montant configurable] / [tranche configurable]
- Le cockpit accumule le surplus mensuel et te génère une ligne de facturation additionnelle en fin de mois

**Usage :** clients à très fort volume que tu ne veux pas perdre, ou Expert qui dépasse 500 messages WA régulièrement (signal pour un devis sur-mesure).

### 5.4b Ce que le cockpit voit réellement

Chaque appel IA dans l'app passe par `callAI.ts` qui :
1. Vérifie si le module est activé (`organization_modules`) — si non, erreur immédiate sans appel IA
2. Vérifie le quota consommé ce mois (`usage_logs`) — si atteint, comportement selon `overflow_mode`
3. Logue le résultat dans `usage_logs` avec feature, modèle, tokens, coût estimé, quota consommé
4. Synchronise l'événement vers le cockpit Orsayn via `OPERATOR_INGEST_URL` (signé)

Ce que ça implique pour toi depuis le cockpit :
- **Jauge par feature et par client** : tu vois en temps réel l'usage mensuel vs le quota (ex : 74/120 messages WA = 62%)
- **Désactivation immédiate** : passer un module à `false` dans `organization_modules` coupe la feature instantanément, sans redéploiement. Le client voit une erreur "module non activé" s'il tente d'utiliser la feature.
- **Changement de tier** : modifier le tier dans le cockpit met à jour les modules actifs ET les quotas en cascade — 100% piloté par données, aucune touche au code client.
- **Overflow mode par client** : tu choisis `block` / `upgrade_prompt` / `charge` indépendamment par client. Un client en `block` est coupé proprement ; un client en `upgrade_prompt` reçoit une proposition avant la coupure.

### 5.5 Alertes cockpit — logique

| Condition | Signal cockpit | Action suggérée |
|-----------|---------------|----------------|
| Feature > 70% quota | Badge jaune sur la fiche client | Surveiller |
| Feature > 90% quota | Badge orange + notification | Contacter le client proactivement |
| Feature > 100% quota | Badge rouge | Comportement selon `overflow_mode` |
| Coût Twilio > 50% du coût total | Alerte marge | Vérifier si le quota WA est bien dimensionné |
| Coût total > 15% du MRR | Alerte marge | Vérifier si l'usage justifie un upgrade |
| Coût total > 30% du MRR | Alerte forte | Conversation tarifaire ou upgrade immédiat |
| WA msgs > 400/mois sur Pro | Alerte | Proposer Expert automatiquement |
| WA msgs > 700/mois sur Expert | Alerte | Proposer tarif sur-mesure |

### 5.6 SQL de pilotage cockpit

Les données viennent de deux sources :
- `organization_subscriptions` et `organization_quotas` : dans la DB cockpit (source de vérité config)
- `usage_logs` : dans chaque DB client, poussé vers le cockpit via le Worker Ingest

```sql
-- Vue cockpit : état de tous les clients actifs ce mois
SELECT
  s.organization_id,
  s.tier,
  s.mrr_ht,
  s.overflow_mode,
  s.renews_at,
  q.feature,
  q.quota_monthly,
  q.current_month_count,
  q.current_month_cost,
  ROUND(q.current_month_count::numeric / NULLIF(q.quota_monthly, -1) * 100, 1) as pct_used
FROM organization_subscriptions s
JOIN organization_quotas q ON q.organization_id = s.organization_id
WHERE s.tier != 'setup_only'
ORDER BY pct_used DESC NULLS LAST;

-- Clients avec au moins une feature en dépassement ce mois
SELECT DISTINCT s.organization_id, s.tier, s.mrr_ht
FROM organization_subscriptions s
JOIN organization_quotas q ON q.organization_id = s.organization_id
WHERE q.quota_monthly != -1
  AND q.current_month_count > q.quota_monthly;

-- Coût total par client ce mois (agrégé depuis les logs poussés)
SELECT
  organization_id,
  SUM(estimated_cost_usd) * 0.92 as total_cost_eur,  -- conversion approximative
  COUNT(*) as total_calls
FROM usage_logs_cockpit  -- table d'ingest centralisée dans la DB cockpit
WHERE created_at >= date_trunc('month', now())
GROUP BY organization_id;
```

### 5.7 Ce que fait chaque bouton d'action

| Bouton | V1 (manuel) | V2 (automatisé) |
|--------|------------|----------------|
| Proposer upgrade | Ouvre brouillon email pré-rédigé avec le lien settings | Email automatique via Resend + lien de changement de tier self-service |
| Email client | Ouvre client email avec contexte pré-rempli | — |
| Ajuster quota | Modifie `organization_quotas.quota_monthly` pour ce client uniquement | Idem |
| Activer essai | Met `trial_ends_at` + passe temporairement le tier à Expert | Cron vérifie chaque nuit et rétrograde si essai expiré |
| Changer tier | Met à jour `organization_subscriptions` + appel API instance pour MAJ `organization_modules` | Idem — déjà automatisable dès V1 |

---

## 6. Matrice de décision pour le client

```
Le client veut juste l'app sans abonnement ?
  -> Setup 2 000€ — pas de MRR
  -> Tous les modules IA à false dans le cockpit

Le client veut l'app + l'IA ?
  -> Setup 800€ + MRR selon usage anticipé
  -> Starter 39€ pour les petits volumes (pas de WA agent)
  -> Pro 69€ dès qu'il veut le WhatsApp agent (120 msg/mois)
  -> Expert 119€ dès qu'il veut le proactif ou > 120 msg WA/mois

Le client veut tester avant de s'engager ?
  -> Setup plein tarif + 30 jours d'essai IA Expert offerts
  -> Si non-conversion : modules désactivés dans le cockpit, app continue

Le client veut la conformité facturation électronique (PDP partenaire) ?
  -> Surcoût setup à partir de +450€ selon volume (3 450€+ sans MRR / 1 950€+ avec MRR)
  -> Puis à partir de 450€ HT/an la 1ère année, à partir de 250€ HT/an dès la 2e année — selon volume d'activité
  -> Export Factur-X inclus par défaut dans tous les setups (0€ supplémentaire)
```

---

## 7. Configuration au déploiement

### Protocole de session — champs liés au pricing

```
Offre souscrite : [setup-seul (3 000€) | setup+mrr-starter (1 500€) | setup+mrr-pro (1 500€) | setup+mrr-expert (1 500€)]
Essai IA offert : oui (30 jours Expert) / non
Facturation électronique : off | export_only (défaut) | b2brouter
Overflow mode : block (défaut) | upgrade_prompt | charge
```

### Modules activés par tier (étape C8 — actions cockpit)

| Offre | Modules activés | Overflow par défaut |
|-------|----------------|---------------------|
| `setup-seul` | Tous à `false` | — |
| `setup+mrr-starter` | Tous sauf `whatsapp_agent`, `whatsapp_proactive`, `document_ocr` | `block` |
| `setup+mrr-pro` | Tous sauf `whatsapp_proactive`, `document_ocr` | `block` |
| `setup+mrr-expert` | Tous | `upgrade_prompt` |

La facturation électronique n'est pas un module IA du tier. Elle est pilotée séparément par `einvoicing_config.mode`. Un client Expert peut rester en `export_only`, et un client sans MRR peut aussi être préparé en `export_only` si le setup vendu l'inclut.

### Quotas initiaux par tier (à initialiser dans `organization_quotas`)

| Feature | Starter | Pro | Expert |
|---------|---------|-----|--------|
| `relances_ai` | 20 | 40 | -1 (illimité) |
| `weekly_summary` | 8 | 8 | -1 |
| `quote_ai` | 15 | 40 | -1 |
| `planning_ai` | 10 | -1 | -1 |
| `chantier_assistant` | 25 | 60 | -1 |
| `suggest_tasks` | 15 | 40 | -1 |
| `catalog_ai` | 10 | 30 | -1 |
| `document_import_ai` | 15 | 30 | -1 |
| `chantier_report_ai` | -1 | -1 | -1 |
| `labor_estimate_ai` | -1 | -1 | -1 |
| `receipt_ocr` | -1 | -1 | -1 |
| `voice_input` (minutes) | 20 | 60 | -1 |
| `wa_messages` | 0 | 120 | 500 |
| `wa_vocal_minutes` | 0 | 10 | 40 |
| `wa_proactive_messages` | 0 | 0 | 30 |
| `whatsapp_ocr` | 0 | 0 | -1 |

---

## 8. Arguments de vente

### Pour le client "setup seul"

"Atelier c'est un outil que je vous déploie une fois. Il est à vous. Pas d'abonnement pour gérer vos devis et vos chantiers — ça n'existe nulle part ailleurs. L'IA, vous l'activez quand vous voulez."

### Pour le client "setup + MRR"

"Pour deux fois moins cher au départ, vous avez l'IA qui travaille pour vous chaque mois. Vos relances partent automatiquement, votre semaine est résumée le lundi matin. C'est 5 à 6 fois moins cher qu'une assistante mi-temps."

### Sur l'écart Pro vs Expert

"En Pro, l'agent répond quand vous lui écrivez. En Expert, il vous écrit en premier — chaque matin votre brief de la journée, une alerte si un chantier décroche en rentabilité, un rappel 48h avant qu'un devis expire. La différence c'est 60€/mois. Un chantier récupéré à temps, c'est 10 fois ça."

### Sur l'objection "c'est cher"

"Sellsy sans chantiers ni WhatsApp : 150€/mois. Batigest sans IA ni mobile : 200€/mois. Atelier pour votre métier exact, depuis votre téléphone, avec un assistant WhatsApp : [prix]. Un seul devis récupéré grâce à une relance automatique rembourse l'abonnement de l'année."

### Sur l'objection "les quotas sont trop bas"

"Les quotas couvrent l'usage d'un artisan actif. Si vous dépassez, c'est que l'IA travaille vraiment pour vous — c'est le bon signal pour passer au tier supérieur. Et le coût supplémentaire, il est couvert dix fois par ce que l'IA vous rapporte."

---

## 9. Récapitulatif — grille tarifaire complète

### Setup

| Configuration | Sans MRR | Avec MRR |
|--------------|----------|---------|
| App seule | 3 000€ | 1 500€ |
| App + conformité facturation électronique | à partir de 3 450€ | à partir de 1 950€ |

### MRR

| Tier | Prix HT/mois | Features clés | Quotas notables |
|------|-------------|--------------|----------------|
| IA Starter | 39€ | Toutes les IA app, sans WA agent | 20 relances / 15 analyses devis / 25 assistant chantier / 10 catalogue / 20 min vocal app — rapports, estimations, scan tickets illimités |
| IA Pro | 69€ | Toutes les IA app + WA agent réactif | 40 relances / 40 analyses / 60 assistant / 30 catalogue / 60 min vocal app + 120 msg WA + 10 min vocal WA |
| IA Expert | 119€ | Tout illimité app + WA proactif + OCR WA | Toutes features app illimitées + 500 msg WA + 40 min vocal WA + 30 msgs proactifs/mois |

### Conformité facturation électronique (PDP partenaire) — facturation annuelle (hors MRR)

La conformité facturation électronique est facturée annuellement en prestation séparée, selon le volume d'activité du client. Les tarifs ci-dessous sont des planchers — ils montent avec le volume de transactions.

| Année | Tarif client HT |
|-------|----------------|
| An 1 | à partir de 450€ (activation + première année) |
| An 2+ | à partir de 250€/an |

Profil type artisan BTP (< 50 tx/mois) : 450€ an 1, 250€/an dès la 2e année. Profil PME plus active : sur devis selon volume.

### Options

| Option | Tarif |
|--------|-------|
| Conformité facturation électronique (PDP partenaire) | à partir de 450€ HT an 1, puis à partir de 250€ HT/an — selon volume |
| Messages WA au-delà quota Expert | +0,50€ / tranche 50 msg |
| Essai IA Expert offert | 0€ — 30 jours |
| Migration depuis ancien logiciel | Sur devis (150€/h) |
| Formation / accompagnement | 150€/h ou forfait 3h = 350€ |
