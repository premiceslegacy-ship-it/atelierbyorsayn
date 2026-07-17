# Atelier — Architecture Facturation Électronique (Double Vitesse)

> **Doc de référence** pour l'implémentation B2Brouter dans Atelier. À tenir à jour à chaque évolution de l'archi ou de l'API B2Brouter.

---

## 1. Contexte réglementaire

La réforme française de facturation électronique impose deux obligations :
- **Réception** : à partir du **1er septembre 2026**, toutes les entreprises doivent pouvoir recevoir des factures électroniques via une plateforme agréée (PA), dès lors qu'un fournisseur soumis à l'obligation émet vers elles.
- **Émission** : obligatoire au **1er septembre 2026** pour les grandes entreprises et ETI ; obligatoire au **1er septembre 2027** pour les PME, TPE, artisans et micro-entreprises.

Atelier distingue donc deux sujets :
- **Être prêt à recevoir** : l'entreprise doit avoir une PA opérationnelle dès 2026. Si Atelier pilote B2Brouter, la réception passe par B2Brouter ; sinon elle reste dans la PA choisie par le client.
- **Émettre depuis Atelier** : tant que le client n'est pas obligé d'émettre électroniquement, Atelier peut continuer à envoyer le PDF classique. Dès que l'émission électronique devient obligatoire ou souhaitée, la facture doit être déposée/transmise via une PA.

Atelier génère toujours un PDF + un fichier XML conforme. La différence entre les modes porte sur l'orchestration après génération : préparation/téléchargement sans transmission dans `export_only`, ou transmission automatique via B2Brouter.

---

## 2. Stack de déploiement

- **1 repo GitHub** pour tous les clients
- **1 Cloudflare Worker** par client (Next.js via OpenNext + Wrangler)
- Le mode facturation est piloté par une **configuration synchronisée depuis le cockpit** — zéro redéploiement pour activer ou changer de mode
- Les clés B2Brouter (propres à chaque client) sont stockées dans les **variables d'env Cloudflare** du Worker client

---

## 3. Pilotage du mode facturation

Le mode n'est pas un simple module IA. Il fait partie de la configuration opérateur synchronisée depuis le cockpit vers l'instance client.

```typescript
type EinvoicingMode = 'off' | 'export_only' | 'b2brouter'

type EinvoicingConfig = {
  mode: EinvoicingMode
  provider: 'b2brouter' | 'external_pa' | null
  environment: 'sandbox' | 'production'
  onboarding_model: 'edoc_exchange' | 'edoc_sync' | null
  account_id?: string | null
  annuaire_status?: 'not_started' | 'pending' | 'active' | 'error'
}
```

Modes retenus :

| Mode | Sens produit | Usage |
|---|---|---|
| `off` | Aucune assistance e-facturation dans Atelier | Client pas encore préparé ou hors périmètre MVP |
| `export_only` | Atelier prépare le PDF/Factur-X, mais l'envoi reste normal jusqu'à l'obligation 2027 et Atelier ne transmet pas à une PA | Préparation conformité, tests, fallback, ou client ayant une autre PA |
| `b2brouter` | Atelier transmet et suit les statuts via B2Brouter | Client géré par Orsayn/B2Brouter |

Pour activer B2Brouter chez un client en **eDocExchange** :
1. B2Brouter staging/prod → créer/configurer le compte entreprise via l'UI B2Brouter.
2. B2Brouter → Developers → récupérer ou vérifier `ACCOUNT_ID`.
3. Cockpit Orsayn → passer `einvoicing_config.mode = 'b2brouter'`, `provider = 'b2brouter'`, `onboarding_model = 'edoc_exchange'`, `environment = 'sandbox' | 'production'`, et renseigner `account_id`.
4. Ajouter `B2BROUTER_API_KEY`, `B2BROUTER_ACCOUNT_ID`, `B2BROUTER_WEBHOOK_SECRET` dans Cloudflare Workers → Settings → Secrets.
5. Lancer les tests sandbox depuis Atelier : contact test, facture JSON simple, suivi tax report.

Pour un client qui choisit une autre PA :
1. Cockpit Orsayn → `mode = 'export_only'`, `provider = 'external_pa'`.
2. Atelier affiche le téléchargement Factur-X et les validations de conformité.
3. Aucun webhook, aucun polling, aucune facture reçue dans Atelier.

> **Note :** les clés B2Brouter restent dans les variables d'env Cloudflare (pas en DB) car ce sont des secrets d'API, pas des données applicatives.

---

## 4. Lecture du mode dans le code

```typescript
const config = await getEinvoicingConfig(orgId)
const isExportOnly = config.mode === 'export_only'
const isB2Brouter = config.mode === 'b2brouter'
const isSandbox = config.environment === 'sandbox'

// Variables d'env (injectées dans Cloudflare Workers → Settings → Secrets)
const B2BROUTER_ENV            = process.env.B2BROUTER_ENV ?? 'sandbox'
const B2BROUTER_API_KEY        = process.env.B2BROUTER_API_KEY
const B2BROUTER_ACCOUNT_ID     = process.env.B2BROUTER_ACCOUNT_ID
const B2BROUTER_WEBHOOK_SECRET = process.env.B2BROUTER_WEBHOOK_SECRET
```

---

## 5. Générateur XML — Commun aux deux modes

Toutes les instances Atelier génèrent systématiquement deux fichiers à chaque facture émise :
- Un **PDF** lisible par l'humain (inchangé)
- Un **fichier XML structuré** conforme à la norme EN 16931

État actuel : Atelier sait déjà produire un Factur-X **profil EN 16931 / Comfort**. Le chantier V1 ne repart donc pas de zéro sur le générateur ; il porte surtout sur la validation des prérequis, l'exposition UI, la configuration cockpit et l'intégration B2Brouter.

**Pourquoi XML et pas juste PDF ?**
Le PDF est lisible par un humain, pas par une machine. Le XML balise chaque champ (montant HT, TVA, SIRET, IBAN, échéance...). Il peut être ingéré automatiquement par une PA, un logiciel comptable, ou transmis sur le réseau Peppol/PPF.

**Profils selon l'usage :**
- **EN 16931 (COMFORT)** → PDF téléchargeable par le client, conforme légalement, importable dans toute PA. C'est ce qu'Atelier génère aujourd'hui, validé Factur-X.
- **France CIUS UBL** (`xml.ubl.invoice.frcius.v1`) → format recommandé par B2Brouter pour les contacts français Peppol-Annuaire (Flux 1 DGFiP).
- **France CIUS CII** (`xml.cii.cross_industry_invoice.frcius.v1`) → variante CII, compatible Factur-X.
- **Factur-X PDF/A-3** (`pdf.a.invoice.with.xml.cii.cross_industry_invoice.facturx.fr.all_profiles.v1`) → PDF/A-3 avec XML CII embarqué.

**Interopérabilité :** un client en mode `export_only` récupère un Factur-X standard, exploitable par des outils ou plateformes compatibles. Atelier ne présume pas du workflow réel de la PA tierce tant qu'il n'a pas été validé en conditions terrain.

**Ce que le dev fait :**
- Durcir le générateur Factur-X existant sur les cas réels Atelier
- Validation des champs obligatoires selon EN 16931 avant génération/téléchargement
- Le fichier généré est disponible en interne pour `export_only` et comme base de contrôle pour `b2brouter`

---

## 6. Mode 1 — `export_only` (`einvoicing_config.mode = 'export_only'`)

**Profil** : artisan qui ne veut pas que Atelier pilote sa PA.

`export_only` signifie : Atelier produit un fichier exploitable par une PA, mais **la responsabilité du dépôt/transmission reste hors Atelier**.

Ce mode couvre trois cas :
- **Avant le 1er septembre 2027** pour les TPE/PME : l'émission électronique n'est pas encore obligatoire, mais Atelier peut déjà préparer des Factur-X propres pour tester.
- **Après le 1er septembre 2027** : le client a choisi une PA autre que B2Brouter. Atelier fournit le Factur-X, mais ne confirme pas le workflow d'entrée de la PA tierce ni que la facture a été transmise.
- **Fallback opérationnel** : B2Brouter indisponible ou onboarding incomplet ; l'artisan peut récupérer le fichier et traiter manuellement.

Ce mode ne couvre pas la réception 2026. Pour recevoir, le client doit consulter sa PA. Si Orsayn/B2Brouter pilote la réception, il faut passer en mode `b2brouter`.

En 2026, la section "Factures reçues" dans Atelier n'est donc affichée que pour les clients en mode `b2brouter`.

**Comportement attendu :**
- Atelier génère la facture en PDF + XML (Factur-X)
- Avant le 1er septembre 2027 pour TPE/PME/artisans : l'envoi PDF/mail reste le comportement normal
- Bouton "Télécharger Factur-X" visible sur chaque facture éligible
- Statut affiché : "Factur-X généré" / "Factur-X à corriger" selon les validations
- Aucune action "marquer comme déposé" en V1 : ce statut serait trompeur tant que les PA tierces et leurs workflows ne sont pas validés
- **Pas de section "Factures reçues"** dans ce mode — réévalué après retours terrain

**Ce que le dev fait :**
- Bouton téléchargement Factur-X dans l'UI facture
- Validations lisibles avant génération/téléchargement : SIRET/SIREN, TVA, IBAN/BIC, échéance, mentions paiement
- Badge "Factur-X prêt" ou "Données à compléter"

---

## 7. Mode 2 — `b2brouter` (`einvoicing_config.mode = 'b2brouter'`)

**Profil** : client qui veut que Orsayn/Atelier orchestre la PA B2Brouter : émission, réception, statuts, audit trail.

Pour le compte Orsayn actuel, l'intégration est en **eDocExchange** :
- les comptes entreprise sont créés/configurés dans l'UI B2Brouter ;
- Atelier ne fait pas de `POST /accounts` ;
- Atelier utilise l'API pour les opérations quotidiennes : contacts, factures, statuts, tax reports, webhooks/polling.

### 7.1. Pré-requis API

| Élément | Valeur |
|---|---|
| App staging | `https://app-staging.b2brouter.net` |
| App production | `https://app.b2brouter.net` |
| Base URL prod | `https://api.b2brouter.net` |
| Base URL sandbox | `https://api-staging.b2brouter.net` |
| Header auth | `X-B2B-API-Key: {YOUR_API_KEY}` |
| Header version | `X-B2B-API-Version: 2026-03-02` (minimum pour DGFiP) |
| Headers communs | `accept: application/json`, `content-type: application/json` |
| Rate limit prod | 1 000 req/min |
| Rate limit sandbox | 600 req/min |
| Tracing | `X-B2B-API-Request-Id` (optionnel, recommandé pour debug) |

**Migration sandbox → prod** : changer la base URL, la clé API, et potentiellement les `account_id` (différents entre les deux environnements).

### 7.1.b. Points confirmés par le mail sandbox B2Brouter

Les environnements de test et de production sont strictement séparés :
- URL applicative différente
- Base URL API différente
- Clé API différente
- Identifiants de compte (`ACCOUNT_ID`) différents

Ne jamais réutiliser un `ACCOUNT_ID` sandbox en production.

**Type d'intégration :**

| Mode B2Brouter | Conséquence Atelier |
|---|---|
| `eDocExchange` | **Mode Orsayn actuel.** Les comptes entreprise sont créés depuis l'application B2Brouter, puis liés manuellement dans "Développeurs". Ne pas utiliser `POST /accounts`. |
| `eDocSync` | Mode futur éditeur/white-label. Les comptes peuvent être créés via API avec `POST /accounts`. Hors scope tant que Orsayn reste en eDocExchange. |

**Transports à activer explicitement en sandbox :**
B2Brouter recommande d'activer au minimum `b2brouter`, `mail` et `peppol`. Ne pas supposer que l'activation fiscale crée toujours tous les transports nécessaires.

Le script d'onboarding doit donc prévoir une étape dédiée :
```
POST /accounts/{ACCOUNT_ID}/transports
```
avec les transports requis par le cas d'usage.

**Tax report : point à confirmer pour la France**
Le mail sandbox mentionne le rapport fiscal comme obligatoire pour les cas ES/IT. La stratégie DGFiP/France décrite ci-dessous reste à valider en sandbox B2Brouter avant implémentation finale : endpoint exact, prérequis, effets sur l'annuaire et flux générés.

**Flux MVP recommandé par B2Brouter :**
1. Lister ou créer le compte sandbox
2. Activer les transports (`b2brouter`, `mail`, `peppol`)
3. Lister/créer les contacts
4. Optionnel : rechercher le destinataire dans le répertoire
5. Créer/envoyer une facture simple en JSON
6. Tester ensuite l'import Factur-X/XML

### 7.2. Onboarding B2Brouter eDocExchange

En eDocExchange, l'onboarding est semi-manuel : le cockpit orchestre et trace les étapes, mais ne crée pas le compte B2Brouter.

**Étape 1 — Création ou récupération du compte**

Créer le compte dans l'application B2Brouter puis récupérer `ACCOUNT_ID` via :
```
GET /accounts
```

Le cockpit stocke l'état d'onboarding et l'`account_id`, mais pas la clé API.

**Hors scope eDocExchange — création API eDocSync**
```
POST /accounts
{
  "account": {
    "country": "fr",
    "cin_scheme": "0002",            // 0002 = SIREN, 0009 = SIRET
    "cin_value": "{SIREN}",
    "tin_value": "FR{kk}{SIREN}",    // omettable, dérivé auto à l'étape 2
    "name": "{raison sociale}",
    "address": { ... },
    "email": "{contact}"
  }
}
```
→ À garder documenté pour une future bascule eDocSync, mais ne pas utiliser dans l'intégration actuelle.

**Étape 2 — Activation des transports**
```
POST /accounts/{ACCOUNT_ID}/transports
```
Transports minimum recommandés en sandbox :
- `b2brouter`
- `mail`
- `peppol`

> L'endpoint exact et le payload doivent être confirmés avec `get-transport-types` dans la sandbox avant codage définitif.

**Étape 3 — Activation Tax Report DGFiP (à confirmer France)**
```
POST /accounts/{ACCOUNT_ID}/tax_report_settings
{
  "tax_report_setting": {
    "code": "dgfip",
    "start_date": "2026-09-01",
    "type_operation": "services",       // services | goods | mixed
    "naf_code": "43",                   // 2 premiers chiffres NAF/APE
    "enterprise_size": "micro",         // micro | pme | eti | ge
    "email": "{contact}",
    "reason_vat_exempt": "VATEX-FR-FRANCHISE"  // optionnel, défaut OK
  }
}
```
**Effets automatiques :**
- Publication SIREN/SIRET dans l'Annuaire PPF
- Création du transport Peppol 0225 (FRCTC Electronic Address) pour la réception
- ⚠️ **24h de propagation Annuaire** avant qu'Atelier puisse émettre vers ce client

> À valider en sandbox : le mail B2Brouter indique explicitement cette étape pour ES/IT. Pour la France/DGFiP, vérifier si l'activation est encore requise, optionnelle, ou remplacée par une configuration de transport/programme.

**Étape 4 — Configuration des contacts**
Pour chaque client B2B français :
```
POST /accounts/{ACCOUNT_ID}/contacts
{
  "contact": {
    "name": "...",
    "country": "fr",
    "currency": "EUR",
    "cin_scheme": "0009",                                // SIRET
    "cin_value": "{14 chiffres}",
    "tin_scheme": "9957",                                // ISO 6523 fiscal FR
    "tin_value": "FR{kk}{SIREN}",
    "transport_type_code": "peppol",
    "document_type_code": "xml.ubl.invoice.frcius.v1"
  }
}
```
→ B2Brouter vérifie automatiquement la présence dans l'Annuaire DGFiP (`in_dgfip_annuaire`: true/false/nil).

**Comportement selon `in_dgfip_annuaire`** :
- `true` ou `nil` (pas encore vérifié) : la facture génère un Flux 1 tax report. B2Brouter est permissif quand la vérification est en cours.
- `false` : la facture est créée mais **ne génère pas de Flux 1**. Le PPF ne peut pas router vers ce destinataire. Pas d'erreur retournée — surveiller ce champ sur le contact pour informer l'artisan.

**Vérification Annuaire avant envoi** (optionnel, recommandé pour l'UI) :
```
GET /directory/fr/{scheme}/{identifiant}
// ex : GET /directory/fr/0009/98765432100011
```
Permet de confirmer qu'un client est joignable électroniquement avant de créer la facture. Utile pour afficher un badge "Peppol" dans l'UI Atelier sur la fiche client.

**Étape 5 — Création des webhooks**
```
POST /web_hooks
{
  "web_hook": {
    "url": "https://{client-domain}/api/webhooks/b2brouter",
    "events": [
      "issued_invoice.state_change",
      "tax_report.state_change",
      "ledger.state_change"
    ],
    "enabled": true,
    "description": "Atelier - {client_name}"
  }
}
```
→ **CRITIQUE** : récupérer `signing_secret` immédiatement (renvoyé une seule fois à la création), le stocker en env var `B2BROUTER_WEBHOOK_SECRET`.

### 7.3. Émission d'une facture

**Champs obligatoires DGFiP (B2B France)** — sinon HTTP 422 :
- `remittance_information` (PMD) — référence + mentions légales (RCS, capital)
- `payment_method_text` (PMT) — moyen + IBAN/BIC
- `payment_terms` (AAB) — échéance + pénalités de retard

**Format Factur-X importé** : ces champs peuvent être passés via tags `extra_info` :
```
#PMD# FA-2026-0048 — Atelier SAS, RCS Paris 123 456 789
#PMT# Credit Transfer, IBAN FR00 0000 0000 0000 0000 0000 000
#AAB# Net 30 jours. Pénalité de retard : 12% annuel.
```

**TVA en franchise (auto-entrepreneur)** : ligne avec `category: "E"` + `comment: "VATEX-FR-FRANCHISE"` obligatoire — sinon facture créée mais bloquée à la transmission. B2Brouter transcode automatiquement la catégorie en `Z` (zero-rate) dans le XML généré, conformément à la règle DGFiP BR-FR-MAP-06 (la franchise est techniquement un taux zéro, pas une exemption — la distinction est gérée côté B2Brouter, pas dans l'API Atelier).

**Endpoint** : `POST /accounts/{ACCOUNT_ID}/invoices` avec `send_after_import: true` pour générer + transmettre en un appel.

**Choix MVP sandbox** : commencer par la facture JSON simple recommandée par B2Brouter. L'import Factur-X/XML est conservé comme optimisation/interop ensuite, après validation du flux JSON bout en bout.

**Import Factur-X ou UBL XML existant** : si Atelier génère déjà un PDF/A-3 (Factur-X) ou un XML UBL/CII, utiliser l'endpoint dédié :
```
POST /accounts/{ACCOUNT_ID}/invoices/import
Content-Type: application/pdf   # pour Factur-X
Content-Type: application/xml   # pour UBL 2.1 ou CII XML
```
B2Brouter parse le document, crée la facture et la soumet au pipeline DGFiP (Flux 1/10, CDAR). Les PDF simples (sans XML embarqué) ne sont **pas** supportés par cet endpoint — passer par le JSON REST dans ce cas.

**Contrainte numéro de facture** : maximum **20 caractères**, caractères autorisés `alphanumeric -+_/`, pas d'espaces en début/fin ni d'espaces consécutifs.

**Champ `payment_method`** : entier requis. Valeurs courantes pour la France : `4` = Virement bancaire, `58` = Virement SEPA, `2` = Prélèvement, `59` = Prélèvement SEPA, `19` = Carte bancaire, `11` = Chèque, `13` = Autre.

**Récupération du XML transmis** : champ `download_legal_url` dans la réponse, après passage en état `sent`.

**Vérification des erreurs sur HTTP 200** : une facture avec une ligne `category: "E"` sans `comment` est **créée (HTTP 200) mais jamais transmise au PPF**. Le champ `errors` dans la réponse est non vide. Le code Atelier doit toujours inspecter `response.invoice.errors` même sur les réponses 200 — pas uniquement sur les erreurs HTTP.

### 7.4. Réception de factures (Flux 6)

**Méthode retenue : POLLING**

Aucun event webhook documenté pour les factures reçues. Les 3 events disponibles (`issued_invoice.state_change`, `tax_report.state_change`, `ledger.state_change`) ne couvrent que ce que le client émet.

**Implémentation** :
- Cron Cloudflare Worker toutes les **15 minutes** par org en mode `b2brouter`
- `GET /accounts/{ACCOUNT_ID}/invoices?type=ReceivedInvoice&state=new` (paginé, 25/page)
- Pour optimiser les appels suivants, utiliser `&state_updated_at_from={iso_timestamp}` pour ne récupérer que les factures modifiées depuis le dernier polling — évite de reparcourir toutes les factures à chaque cycle.
- Pour chaque nouvelle facture : insertion dans `received_invoices` + récupération du XML via `GET /invoices/{id}/as/original`
- Idempotence sur `pa_message_id` (clé unique)

**Note Flux 10 sur les factures reçues** : une `ReceivedInvoice` génère un tax report Flux 10 uniquement si `contact_id` est renseigné **et** que le contact est non-FR. Les factures de fournisseurs français passent par Flux 1/6 côté émetteur — aucune déclaration e-Reporting requise côté acheteur.

**Pourquoi pas de polling plus rapide** : factures fournisseurs = pas de besoin temps-réel. 15 min couvre largement les usages métier.

**Migration future** : si B2Brouter expose un event `received_invoice.*`, basculer sans toucher au modèle de données.

### 7.5. Gestion des statuts CDAR (réception)

Quand une facture reçue change d'état côté Atelier, propager au PPF via :
```
POST /invoices/{INVOICE_ID}/mark_as
{
  "state": "accepted" | "refused" | "paid" | "annotated",
  "reason": "...",                       // optionnel
  "commit": "with_mail"                  // requis si origine email
}
```

| État Atelier | État B2Brouter | Code CDAR |
|---|---|---|
| Reçue | `new` / `received` | 200 / 202 |
| À payer (validée) | `accepted` | 205 |
| Refusée | `refused` | 210 |
| Payée | `allegedly_paid` | 212 *(non disponible via API à date)* |
| Rejetée par PPF | `rejected` | 213 |

> Le marquage "payée" via API n'est pas encore exposé par B2Brouter — fonctionnalité annoncée mais non livrée. À surveiller dans les changelogs.

### 7.6. Webhooks entrants

Endpoint : `POST /api/webhooks/b2brouter` (Next.js Route Handler avec `runtime = 'edge'`).

**Vérification de signature HMAC-SHA256 obligatoire** :
- Header reçu : `X-B2Brouter-Signature: t={unix_ts},s={hash_hex}`
- Calcul attendu : `HMAC-SHA256(secret, "{t}.{raw_body}")`
- ⚠️ Utiliser le **raw body** (jamais le JSON re-sérialisé) → lire via `await request.text()` puis `JSON.parse` après vérification.
- Comparaison en `timingSafeEqual` pour éviter les attaques timing.

**Anti-replay** : rejeter les requêtes dont `t` est plus vieux que 5 minutes.

**Idempotence** : `data.event_id` est unique par event B2Brouter — table `b2brouter_webhook_events(event_id PRIMARY KEY)` pour dédupliquer les retries.

**Réponse attendue** : HTTP 200 sec. Sinon B2Brouter considère l'URL comme injoignable (HTTP 404 dans leurs logs).

#### Payloads par event

**`issued_invoice.state_change`** — payload minimaliste, re-fetch nécessaire :
```json
{
  "code": "issued_invoice.state_change",
  "triggered_at": 1732530071,
  "data": {
    "invoice_id": 85373,
    "event_id": 381690,
    "state": "registered",
    "notes": null
  }
}
```
→ Action : `GET /invoices/{invoice_id}` pour récupérer le détail, puis update de la facture Atelier correspondante.

**`tax_report.state_change`** — payload complet, pas de re-fetch :
```json
{
  "id": 173,
  "code": "tax_report.state_change",
  "triggered_at": 1732530071,
  "data": {
    "tax_report_id": 6560,
    "event_id": 385720,
    "state": "registered",
    "notes": null,
    "object": {
      "id": 242964726,
      "invoice_id": 85373,
      "state": "registered",
      "label": "Flux 1",
      "has_errors": false,
      "has_warnings": false,
      "document_type_code": "xml.tax_report.dgfip.flux1",
      "transport_type_code": "fr.dgfip",
      "invoice_date": "2026-09-15",
      "invoice_number": "FA-2026-0048",
      "customer_party_name": "...",
      "customer_party_tax_id": "...",
      "tax_breakdowns": [ ... ]
    }
  }
}
```
→ Action : insertion directe dans `pa_status_events` (audit trail légal immuable).

**`ledger.state_change`** — agrégats Flux 10 quotidiens (B2C / cross-border).
→ Action : tracking de conformité, pas d'impact UI direct sur les artisans purs B2B FR.

#### Source de vérité par usage

| Usage | Event source de vérité |
|---|---|
| UI artisan (état facture émise) | `issued_invoice.state_change` |
| Audit trail légal `pa_status_events` | `tax_report.state_change` |
| Conformité Flux 10 | `ledger.state_change` |

### 7.7. Mapping des états

**États B2Brouter facture émise → UI Atelier**

| État B2Brouter | UI Atelier | Sens |
|---|---|---|
| `sending` | Envoi en cours | File d'attente PPF |
| `sent` | Envoyée | Déposée au PPF, Flux 1 confirmé |
| `registered` | Enregistrée DGFiP | CDV positif (condition 300) |
| `accepted` | Acceptée par client | Validation acheteur |
| `refused` | Refusée par client | Rejet acheteur |
| `allegedly_paid` | Déclarée payée | CDAR 212 |
| `error` | Erreur | Voir champ `errors` |

**États tax_report (Flux 1) → `pa_status_events.new_status`**
`new` → `sent` → `acknowledged` (CDV 500) → `registered` (CDV 300) | `refused` (CDV 301) | `error` | `annulled`

**États facture reçue → UI Atelier**

| État B2Brouter | UI Atelier | CDAR |
|---|---|---|
| `new` / `received` | Reçue | 200 / 202 |
| `accepted` | À payer (validée) | 205 |
| `refused` | Refusée | 210 |
| `allegedly_paid` | Payée | 212 |
| `rejected` | Rejetée par PPF | 213 |

> **Positionnement produit** : Atelier n'est pas un logiciel comptable. Pour les factures reçues l'UI expose seulement `Reçue → À payer → Payée`. Le lien vers un projet/chantier est **optionnel** (une facture Leroy Merlin n'a pas forcément d'imputation chantier). Pas de saisie comptable, pas de plan de comptes — un export CSV/PDF pour l'expert-comptable suffit.

---

## 8. Modèle de données

### 8.1. Tables existantes (migration `005_advanced_tables.sql`)

**`received_invoices`** — factures fournisseurs reçues via B2Brouter
- `pa_message_id TEXT UNIQUE` — identifiant unique côté B2Brouter (idempotence polling)
- `pa_received_at TIMESTAMPTZ` — horodatage réception PPF
- Champs structurés : `supplier_siren`, `supplier_siret`, `supplier_name`, `supplier_vat`, `invoice_number`, `invoice_date`, `due_date`, `total_ht`, `total_tva`, `total_ttc`
- `status` : `received | verified | accounted | rejected` *(à aligner UI : `received | to_pay | paid | rejected`)*
- `facturx_url`, `raw_xml JSONB`

**`pa_status_events`** — audit trail légal immuable
- Référence `invoice_id` ou `received_invoice_id`
- `event_type` : `submitted | delivered | accepted | rejected | cancelled`
- `previous_status`, `new_status`, `pa_timestamp`
- Pas d'UPDATE possible (table append-only par RLS)

### 8.2. Tables à ajouter

**`organization_einvoicing_config`** — configuration locale synchronisée par le cockpit
```sql
CREATE TABLE public.organization_einvoicing_config (
  organization_id     UUID        PRIMARY KEY REFERENCES public.organizations(id) ON DELETE CASCADE,
  mode                TEXT        NOT NULL DEFAULT 'export_only',
  provider            TEXT,
  environment         TEXT        NOT NULL DEFAULT 'sandbox',
  onboarding_model    TEXT,
  b2brouter_account_id BIGINT,
  annuaire_status     TEXT        NOT NULL DEFAULT 'not_started',
  last_directory_check_at TIMESTAMPTZ,
  last_error           TEXT,
  updated_at           TIMESTAMPTZ DEFAULT now(),
  CHECK (mode IN ('off', 'export_only', 'b2brouter')),
  CHECK (provider IS NULL OR provider IN ('b2brouter', 'external_pa')),
  CHECK (environment IN ('sandbox', 'production')),
  CHECK (onboarding_model IS NULL OR onboarding_model IN ('edoc_exchange', 'edoc_sync')),
  CHECK (annuaire_status IN ('not_started', 'pending', 'active', 'error'))
);
```
Cette table ne contient aucun secret. Elle dit seulement à l'instance comment se comporter.

**`b2brouter_webhook_events`** — déduplication des retries webhook
```sql
CREATE TABLE public.b2brouter_webhook_events (
  event_id          BIGINT       PRIMARY KEY,        -- data.event_id de B2Brouter
  organization_id   UUID         NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  event_code        TEXT         NOT NULL,           -- 'issued_invoice.state_change' | ...
  triggered_at      TIMESTAMPTZ  NOT NULL,
  payload           JSONB        NOT NULL,
  processed_at      TIMESTAMPTZ  DEFAULT now()
);
```

**`b2brouter_accounts`** — mapping org Atelier ↔ compte B2Brouter (alternative aux env vars si on veut tout en DB)
```sql
CREATE TABLE public.b2brouter_accounts (
  organization_id   UUID         PRIMARY KEY REFERENCES public.organizations(id) ON DELETE CASCADE,
  account_id        BIGINT       NOT NULL,           -- B2Brouter account.id
  tax_report_id     BIGINT,                          -- DGFiP tax report setting id
  webhook_id        BIGINT,                          -- B2Brouter web_hook.id
  annuaire_active   BOOLEAN      DEFAULT false,      -- true après les 24h de propagation
  activated_at      TIMESTAMPTZ,
  created_at        TIMESTAMPTZ  DEFAULT now()
);
```
> Choix V1 : on garde **`B2BROUTER_API_KEY` et `B2BROUTER_WEBHOOK_SECRET` en env Cloudflare** (secrets), et on autorise `account_id` en DB car ce n'est pas un secret. L'env `B2BROUTER_ACCOUNT_ID` reste accepté comme fallback de sécurité.

### 8.3. Ajustement `received_invoices`

Pour aligner avec le positionnement produit (suivi trésorerie, pas compta) :
- Renommer logiquement les statuts : `received` → `received`, `verified` → `to_pay`, `accounted` → `paid`, `rejected` → `rejected`
- Garder les colonnes `accounted_at / accounted_by` en DB (pas de breaking change), simplement ne pas les exposer dans l'UI
- Lien chantier optionnel : ajouter `project_id UUID NULL REFERENCES public.projects(id)`
- `raw_xml JSONB` reste en DB pour debug, mais le **XML faisant foi est archivé 10 ans côté B2Brouter** — on n'est pas le gardien légal.

---

## 9. Architecture code

```
src/
├── app/api/
│   ├── webhooks/b2brouter/route.ts      # POST entrant (signature HMAC + dispatch event)
│   └── cron/b2brouter-poll/route.ts     # Cron 15min (polling factures reçues)
├── lib/b2brouter/
│   ├── client.ts                        # Wrapper API (auth, rate limit, retry)
│   ├── types.ts                         # Types TS des payloads B2Brouter
│   ├── signature.ts                     # Vérification HMAC-SHA256
│   ├── events/
│   │   ├── issued-invoice.ts           # Handler issued_invoice.state_change
│   │   ├── tax-report.ts               # Handler tax_report.state_change
│   │   └── ledger.ts                   # Handler ledger.state_change
│   ├── poll-received.ts                # Logique polling factures reçues
│   ├── onboarding.ts                   # Script 4 étapes onboarding client
│   └── mappers/
│       ├── invoice-json.ts             # Facture Atelier → JSON B2Brouter
│       ├── invoice-state.ts            # B2Brouter state → Atelier UI state
│       └── cdar-codes.ts               # Codes CDAR ↔ états received_invoices
├── lib/einvoicing/
│   ├── config.ts                       # Lecture config cockpit locale
│   ├── eligibility.ts                  # Client pro FR / particulier / étranger
│   └── export-only.ts                  # Validation/téléchargement Factur-X
└── lib/pdf/
    └── facturx-xml.ts                  # Générateur XML existant
```

### 9.1. Edge runtime obligatoire

Le webhook entrant doit être en `runtime = 'edge'` :
- Latence faible (B2Brouter timeout après quelques secondes)
- Accès direct au raw body via `await request.text()`
- Pas de body parser middleware Next.js qui casserait la signature

### 9.2. Cron polling

Configuration Cloudflare Worker `wrangler.toml` :
```toml
[triggers]
crons = ["*/15 * * * *"]
```
Le handler interroge la liste des orgs en mode `b2brouter`, puis pour chacune appelle `pollReceivedInvoices(orgId)`.

---

## 10. Sécurité

| Vecteur | Mitigation |
|---|---|
| Webhook spoofing | Vérif HMAC-SHA256 obligatoire avant toute action |
| Replay attack | Rejet si `t` > 5 min de skew |
| Retry duplicates | Table `b2brouter_webhook_events` (PK sur `event_id`) |
| Insertion `received_invoices` | RLS : INSERT uniquement via `service_role` (webhook/cron) |
| Lecture `received_invoices` | RLS : permission `received_invoices.view` |
| Modification statut | RLS : permission `received_invoices.process` |
| Fuite clé API | Stockage Cloudflare Secrets uniquement, jamais en DB ni dans le repo |
| Fuite signing_secret | Idem ; rotation via création d'un nouveau webhook côté B2Brouter |

---

## 11. Règles d'affichage UI selon le mode

| Élément UI | `off` | `export_only` | `b2brouter` |
|---|---|---|---|
| Bouton "Télécharger XML / Factur-X" | Masqué | Visible | Option debug/admin |
| Statut facture émise | PDF classique | "Factur-X prêt" / "Données à compléter" | Temps réel (envoyée / enregistrée DGFiP / acceptée) |
| Bouton "Envoyer électroniquement" | Masqué | Masqué | Visible (auto sur création si `send_after_import: true`) |
| Section "Factures reçues" | Absente | Absente | Visible |
| Badge config | "Non configuré" | "PA externe / export Factur-X" | "Connecté B2Brouter" |
| Audit trail PA | Absent | Manuel minimal | Visible (depuis `pa_status_events`) |

### 11.1. Lecture selon calendrier

| Date / obligation | Mode recommandé | Pourquoi |
|---|---|---|
| Avant le 01/09/2026 | `off` ou `export_only` | Préparation et tests sans contrainte légale de réception dans Atelier |
| Du 01/09/2026 au 31/08/2027 pour TPE/PME | `b2brouter` si Orsayn pilote la réception, sinon `export_only` | Réception obligatoire via une PA ; émission encore non obligatoire pour TPE/PME |
| À partir du 01/09/2027 pour TPE/PME | `b2brouter` ou `export_only` avec PA externe | Émission obligatoire via une PA |

---

## 12. Plan de développement

### Phase 1 — Fondations (indépendant de B2Brouter)
1. **Générateur Factur-X** (EN 16931 + France CIUS) — couvre les deux modes
2. **UI export_only** — bouton téléchargement + validations + badge "Factur-X prêt"
3. **Config cockpit → client** — `einvoicing_config.mode`, `provider`, `environment`, `onboarding_model`, `account_id`

### Phase 2 — Sandbox B2Brouter eDocExchange
4. **Wrapper API** `lib/b2brouter/client.ts` (auth, rate limit, retry)
5. **Check compte eDocExchange** — `GET /accounts`, vérification `ACCOUNT_ID`, environnement, tax report setting
6. **Mapper JSON facture Atelier → B2Brouter** — facture simple sandbox en `send_after_import: true`
7. **Persistance IDs** — `b2brouter_invoice_id`, `tax_report_ids`, `download_legal_url`, erreurs

### Phase 3 — Intégration B2Brouter émission
8. **Webhook entrant** `/api/webhooks/b2brouter` (signature + dispatch)
9. **Handler `issued_invoice.state_change`** — update facture Atelier
10. **Handler `tax_report.state_change`** — insertion `pa_status_events`
11. **UI** : statut transmission temps réel sur chaque facture émise

### Phase 4 — Réception factures
12. **Cron polling 15 min** `/api/cron/b2brouter-poll`
13. **Insertion `received_invoices`** + récupération XML
14. **UI section "Factures reçues"** : liste + statut paiement + lien chantier optionnel
15. **Action `mark_as`** : propagation CDAR vers PPF (`accepted` / `refused`)

### Phase 5 — Conformité avancée
16. **Handler `ledger.state_change`** — Flux 10 (si clients B2C ou cross-border)
17. **Export CSV factures reçues** pour expert-comptable
18. **Notification artisan** sur nouvelle facture reçue (in-app + email)

---

## 13. Hors scope MVP

- **Multi-PA** : B2Brouter uniquement pour le mode intégré
- **Chorus Pro B2G** : pas de clients secteur public à date — flux DGFiP/Peppol couvre 100% de l'usage artisan
- **Rapprochement automatique** facture reçue ↔ commande
- **Signature électronique avancée** (eIDAS qualifié)
- **Section Factures reçues en mode `export_only`** : réévalué après retours terrain
- **Saisie comptable** : Atelier reste un outil de gestion de chantier, pas un logiciel comptable
- **Avoirs (notes de crédit)** : B2Brouter supporte les avoirs via `is_amend: true` + `amended_number` + `amended_date` (génère un UBL CreditNote type 381). À implémenter en Phase 2 si les artisans en ont le besoin — les champs API sont documentés et stables.

---

## 14. Références

- **Doc B2Brouter** : https://developer.b2brouter.net/
- **DGFiP officiel** : https://www.impots.gouv.fr/facturation-electronique-702
- **Peppol BIS 3.0** : https://docs.peppol.eu/poacc/billing/3.0/
- **France CIUS (FR-B2B)** : https://www.fnfe-mpe.org/
- **CGI Article 261** (exemptions TVA) : https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006069577/LEGISCTA000006162554/
- **Norme EN 16931** (Core)
- **Format UBL 2.1 / CII D16B**

---

## 15. À éclaircir

- [ ] Confirmer en sandbox qu'il n'existe pas d'event webhook pour les factures reçues (sinon basculer du polling vers push)
- [ ] Récupérer le payload exact de `ledger.state_change` (non documenté à date)
- [ ] Tester la disponibilité réelle de `mark_as` avec `state: "paid"` (annoncé non disponible mais à revérifier)
- [ ] Stratégie de rotation du `signing_secret` webhook (pas documenté côté B2Brouter)
- [ ] Politique de retry exacte de B2Brouter en cas d'échec webhook (timeouts, nombre de tentatives)
