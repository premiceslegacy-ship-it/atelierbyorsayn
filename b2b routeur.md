\# France DGFiP e-Invoicing & e-Reporting API Guide

From September 2026, all French companies must route their invoices and VAT data through a certified platform. B2Brouter simplifies this: you send your invoice data via a REST API call, and B2Brouter handles PPF registration, document generation (UBL/CII/Factur-X), routing to your clients, and tax reporting to the DGFiP — all through a single integration.

B2Brouter is a certified \*\*Plateforme Agréée (PA)\*\* for the French DGFiP e-invoicing reform. Connect via REST API and B2Brouter handles the entire compliance stack on your behalf:

| What B2Brouter does for you    | Details                                                                                                                                                                                       |  
| \------------------------------ | \--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |  
| \*\*PPF registration\*\*           | Publishes your SIREN/SIRET to the Annuaire automatically on activation                                                                                                                        |  
| \*\*Flux 1 — B2B e-invoicing\*\*   | Generates UBL/CII/Factur-X, transmits to PPF, routes to buyer's platform                                                                                                                      |  
| \*\*Flux 6 — Invoice lifecycle\*\* | Manages CDAR status messages (Déposée, Reçue, Approuvée, Refusée, Encaissée)                                                                                                                  |  
| \*\*Flux 10 — e-Reporting\*\*      | Aggregates B2C and cross-border B2B transactions (intra-EU and extra-EU) into daily Ledgers sent to PPF                                                                                       |  
| \*\*Peppol 0225 reception\*\*      | Receives invoices from any French or Peppol-connected platform                                                                                                                                |  
| \*\*Document generation\*\*        | You send invoice data as JSON — B2Brouter generates the compliant UBL/CII/Factur-X document and transmits it to the PPF. No XML generation required on your side                              |  
| \*\*Input formats\*\*              | JSON REST API, Factur-X PDF/A-3 (with embedded CII XML), UBL 2.1 XML, CII XML                                                                                                                 |  
| \*\*Legal archiving\*\*            | All transmitted documents (invoices, tax reports, CDAR messages) are stored by B2Brouter for the legally required 10-year retention period. No additional storage setup required on your side |

\*\*To integrate, you need 4 steps\*\*: \[create your account\](\#step-1-retrieve-or-create-your-company-account) → \[activate DGFiP\](\#step-2-enable-tax-report-settings-for-dgfip) → \[create a contact\](\#step-3-create-a-contact) → \[send your first invoice\](\#issuing-invoices).

\*\*\*

\> \*\*Regulatory context\*\*: The \[French e-invoicing reform\](https://www.impots.gouv.fr/facturation-electronique-702) mandates that all French companies use a certified \*\*Plateforme Agréée (PA)\*\* or the government's \*\*PPF\*\* (Portail Public de Facturation) to transmit invoices and report VAT data to the DGFiP, starting September 2026\. As a certified PA, B2Brouter handles the PPF connection entirely on your behalf — no SFTP, no electronic certificates, no direct PPF integration required.

\#\# Who is this guide for?

There are two main use cases for integrating with B2Brouter for France e-invoicing:

\*\*eDocExchange\*\* — For companies or groups of companies that integrate their management software (ERP, accounting platform) directly with B2Brouter. The onboarding process (account creation, Tax Report Settings configuration) is typically performed once per company through the \*\*web UI\*\*. Day-to-day operations (issuing invoices, tracking their lifecycle) happen through the \*\*API\*\*. To add further company accounts to your integration group, follow the same onboarding wizard from the same B2Brouter user account — no separate API call required.

\*\*eDocSync\*\* — For software vendors and ERP providers who want to offer DGFiP compliance to their own customers from within their product. This is B2Brouter's \*\*white-label / embedded / marque blanche\*\* model: B2Brouter operates entirely in the background, end customers interact exclusively with the vendor's interface and are unaware of B2Brouter. The software vendor is responsible for account provisioning, invoice submission, and lifecycle tracking via the B2Brouter API. End customers do not need a B2Brouter login or subscription.

For eDocSync, account provisioning volume determines the right plan:

\* \*\*Few companies (reseller model)\*\*: Add each client company as an account in your B2Brouter integration group via the web UI, following the standard onboarding wizard. This works well for tens of companies and shares a single API key.  
\* \*\*100+ companies\*\*: Contact our \[Sales team\](https://www.b2brouter.net/global/contact/) or open a Support Ticket to discuss a dedicated eDocSync plan with bulk provisioning (volume-based pricing for editors).

In both cases, all France-specific compliance features (Annuaire registration, Flux 1/6/10 transmission, CDAR lifecycle) work identically.

\> \*\*B2Brouter is itself a Plateforme Agréée\*\*: you integrate \*\*with\*\* B2Brouter — it is not a relay or connector to another PA. If your SIREN/SIRET is currently registered with a different PA, activating B2Brouter (Step 2\) transfers the Annuaire entry automatically. You cannot use B2Brouter as a pass-through to submit invoices under a different PA's certification.

\> \*\*Routing to recipients on other PAs\*\*: When your buyer is registered with a different PA, B2Brouter routes the invoice via the standard \*\*Peppol four-corner model\*\* (C2 → C3): B2Brouter's Peppol access point (C2) looks up the recipient's Peppol address in the Annuaire and delivers the document to the buyer's access point (C3) — regardless of which PA they use. No additional configuration is required on your side.

\*\*\*

\#\# Before you start: choose your environment

| Environment        | B2Brouter app                                                           | B2Brouter API                       | Chorus Pro portal                                              |  
| \------------------ | \----------------------------------------------------------------------- | \----------------------------------- | \-------------------------------------------------------------- |  
| \*\*Production\*\*     | \[app.b2brouter.net\](https://app.b2brouter.net/register)                 | \`https://api.b2brouter.net\`         | \[chorus-pro.gouv.fr\](https://chorus-pro.gouv.fr)               |  
| \*\*Staging (test)\*\* | \[app-staging.b2brouter.net\](https://app-staging.b2brouter.net/register) | \`https://api-staging.b2brouter.net\` | \[qualif.chorus-pro.gouv.fr\](https://qualif.chorus-pro.gouv.fr) |

\> Do not mix environments. Production uses real SIREN/SIRET numbers and connects to the DGFiP production Annuaire. Staging uses fictitious test identifiers and connects to the DGFiP QAS (qualification) environment. API keys, accounts, and contacts are not shared between environments.

\#\#\# Option A — Production pilot

Register at \[app.b2brouter.net\](https://app.b2brouter.net/register) to start a production integration. When you activate the DGFiP Tax Report Setting, your company's SIREN/SIRET is published to the real PPF Annuaire, making it discoverable by any platform in the French e-invoicing ecosystem.

This option is designed for real B2B invoices starting September 2026\. In the meantime, the DGFiP will clear QAS-period records before the reform goes live — so any invoices you send during your pilot will not create compliance obligations. This is the right starting point if you have already chosen B2Brouter and want to test the full integration with your actual company data.

\#\#\# Option B — Staging (recommended for evaluation)

Register at \[app-staging.b2brouter.net\](https://app-staging.b2brouter.net/register) to use B2Brouter's test environment, which is connected to the DGFiP's QAS (qualification) environment.

This is the best option if:

\* You are evaluating multiple platforms before committing  
\* Your SIREN/SIRET is already published in the Annuaire with another PA (activating B2Brouter in production would transfer the entry)  
\* You prefer not to associate your company identifier with test activity

The staging environment is self-provisioned: once you have test identifiers (see below), you can start end-to-end testing in under 24 hours.

\> \*\*Staging SIRET validation\*\*: In the staging environment, any valid 14-digit number is accepted as a SIRET without checksum validation. The fictitious identifiers from the Chorus Pro QAS CSV are pre-registered in the DGFiP QAS annuaire and work end-to-end. In production, SIRET format and checksum are validated.

\> \*\*Important\*\*: The DGFiP does not allow real SIREN or SIRET numbers in their QAS environment. You must use fictitious test identifiers. You can obtain these yourself via the Chorus Pro QAS portal (free, 5-minute process) or request a pre-assigned set by opening a Support Ticket in the staging app.

\> \*\*One account per SIREN\*\*: B2Brouter creates one account per SIREN (the VAT number key is derived from the SIREN). If you provide a SIRET, the SIREN is extracted from it. Two different SIRETs from the same company (same SIREN) will resolve to the same account. If your company operates from multiple establishments (different SIRETs), these are modelled as \*\*organisational units\*\* within the same B2Brouter account — not as separate accounts. Contact \[Support\](https://www.b2brouter.net/docs/\#/en/support/open-incident-report) if you need to configure multi-establishment invoicing. Keep this in mind when selecting rows from the CSV: pick SIRETs with distinct SIRENs (first 9 digits) for each independent company you need to test.

\#\#\#\# Getting test identifiers via Chorus Pro QAS

The \[Chorus Pro QAS portal\](https://qualif.chorus-pro.gouv.fr) lets you generate a "Matelas de données" (data set) — a CSV file containing fictitious SIREN/SIRET identifiers pre-registered in the DGFiP test environment. Follow these steps:

1\. Go to \[qualif.chorus-pro.gouv.fr\](https://qualif.chorus-pro.gouv.fr) → \*\*Entreprise\*\* tab → \*\*Créer mon compte\*\*.  
   \* You can use a temporary email address (e.g. \[temp-mail.io\](https://temp-mail.io)).  
   \* Use any name; this account is purely for obtaining test identifiers.  
2\. Check your inbox for the \*\*"Initialisation de mot de passe Chorus Pro"\*\* email and set your password (link valid 60 minutes).  
3\. Log in → go to \*\*Domaines\*\* → \*\*Matelas de données\*\* → click \*\*Générer un matelas de données\*\* and confirm.  
4\. Go to \*\*Consultation du matelas de données\*\*. Wait until both statuses show \*\*"Disponible"\*\*:  
   \* \*Statut pour Chorus Pro\*: Disponible  
   \* \*Statut pour l'annuaire de facturation PPF\*: Disponible  
   \* Generation typically takes a few minutes. Refresh the page to check.  
5\. Click \*\*"Générer et télécharger le fichier CSV du matelas structures et utilisateurs"\*\* to download your test identifiers.

The CSV contains multiple fictitious SIREN/SIRET numbers in rows labelled \*\*"Privé"\*\* and \*\*"Public"\*\*. Use only rows from the \*\*"Privé"\*\* (private sector) section for your test accounts. Public sector entities (\`SIREN 'Public'\`) are rejected by the DGFiP QAS annuaire — attempting to activate e-Reporting on a public-sector account returns HTTP 422 ("La création d'une ligne annuaire n'est pas possible pour une entité associée à un SIREN 'Public'"). This is correct behaviour: public entities use Chorus Pro directly, not a PA.

Use one private-sector SIREN for your emitter account and another for your test contact.

\*\*Once you have your test identifiers:\*\*

1\. Register at \[app-staging.b2brouter.net\](https://app-staging.b2brouter.net/register) and activate your account.  
2\. Create your company account using a SIREN from the CSV (see \[Step 1\](\#step-1-retrieve-or-create-your-company-account)).  
3\. Subscribe to an eDocExchange plan (staging subscriptions are simulated — no charge).  
4\. Enable DGFiP Tax Report Settings (see \[Step 2\](\#step-2-enable-tax-report-settings-for-dgfip)).  
   \* ⚠️ After activating the DGFiP Tax Report Setting, your company's Annuaire registration takes up to \*\*24 hours\*\* to propagate — both in staging and in production. This is a DGFiP infrastructure constraint, not a B2Brouter delay. You will not be able to send invoices until the following day.  
5\. The following day: create a test contact using a second SIREN from the CSV (see \[Step 3\](\#step-3-create-a-contact)).  
6\. Send your first invoice (see \[Issuing Invoices\](\#issuing-invoices)).

\#\#\# API credentials

Authentication uses a static \*\*API key\*\* passed in the \`X-B2B-API-Key\` HTTP header. There is no OAuth2 flow — generate your API key in the B2Brouter UI under Settings → API Keys. Keep it confidential and never include it in client-side code. Also set \`X-B2B-API-Version\` in every request.

\> \*\*Minimum API version\*\*: The DGFiP Tax Report Settings endpoint and all DGFiP-specific fields require \*\*\`X-B2B-API-Version: 2026-03-02\`\*\* or later. Earlier versions will not expose these endpoints. The invoice and account endpoints work from \`2025-01-01\` onwards.

\> \*\*Base URL\*\*: All examples below use \`https://api-staging.b2brouter.net\`. For production, replace with \`https://api.b2brouter.net\`.

\*\*\*

\#\#\# Step 1: Retrieve or Create your Company Account

If you \*\*already have\*\* a B2Brouter account for your company, retrieve its \`id\` with the \*\*List Accounts\*\* endpoint and skip the creation step.

If you \*\*haven't yet\*\* created one, use the \*\*Create Account\*\* endpoint (eDocSync/API path) or the web UI onboarding wizard (eDocExchange path). Both produce the same result.

When creating a French company account:

\* \`cin\_scheme\`: \`"0002"\` for SIREN (9 digits) or \`"0009"\` for SIRET (14 digits). Use SIRET when available — it identifies a specific establishment and is preferred by the PPF.  
\* \`cin\_value\`: The SIREN or SIRET of your company.  
\* \`tin\_value\`: French VAT number in the format \`FR{kk}{siren}\`, where \`kk\` is the two-digit checksum (e.g. \`FR32123456789\`). \*\*This field is optional at account creation\*\*: if omitted, B2Brouter automatically derives and sets it from the SIREN when you activate the DGFiP Tax Report Setting. It is mandatory for DGFiP invoicing but you do not need to calculate it yourself.  
\* \`country\`: \`"fr"\`.

\*\*Example request:\*\*

\`\`\`shell  
curl \--request POST \\  
     \--url https://api-staging.b2brouter.net/accounts \\  
     \--header 'X-B2B-API-Key: {YOUR\_API\_KEY}' \\  
     \--header 'X-B2B-API-Version: {YOUR\_API\_VERSION}' \\  
     \--header 'Content-Type: application/json' \\  
     \--data '{  
       "account": {  
         "country": "fr",  
         "name": "Exemplar SAS",  
         "address": "10 Rue Imaginaire",  
         "city": "Paris",  
         "postalcode": "75001",  
         "province": "Île-de-France",  
         "email": "john.doe@example.com",  
         "tin\_value": "FR32123456789",  
         "tin\_scheme": 9957,  
         "cin\_scheme": "0009",  
         "cin\_value": "12345678900012",  
         "rounding\_method": "half\_up"  
       }  
     }'  
\`\`\`

\*\*Sample response:\*\*

\`\`\`json  
{  
  "account": {  
    "id": 83428,  
    "name": "Exemplar SAS",  
    "tin\_value": "FR32123456789",  
    "tin\_scheme": 9957,  
    "cin\_scheme": "0009",  
    "cin\_value": "12345678900012",  
    "address": "10 Rue Imaginaire",  
    "city": "Paris",  
    "postalcode": "75001",  
    "province": "Île-de-France",  
    "country": "fr",  
    "currency": "EUR",  
    "email": "john.doe@example.com",  
    "rounding\_method": "half\_up",  
    "archived": false,  
    "created\_at": "2026-06-10T09:54:38.000Z",  
    "updated\_at": "2026-06-10T09:54:38.000Z"  
  }  
}  
\`\`\`

\[POST Account \- API Reference\](https://developer.b2brouter.net/reference/create-account)

\*\*\*

\#\#\# Step 2: Enable Tax Report Settings for DGFiP

\> \*\*Available from API version 2026-03-02\*\*

This is the key onboarding step. When you create a Tax Report Setting with \`code: "dgfip"\`, B2Brouter automatically:

1\. \*\*Registers your company in the PPF's Annuaire\*\* — your SIREN/SIRET becomes discoverable by any platform in the French e-invoicing ecosystem.  
2\. \*\*Creates a Peppol 0225 transport\*\* — enabling your company to receive electronic invoices from any Peppol-connected platform in France.

\> ⚠️ \*\*Transport replacement\*\*:  
\> If your account already has a Peppol transport, it will be \*\*replaced\*\* by the new 0225 (FRCTC Electronic Address) transport during activation. If your SIREN/SIRET was previously registered with another PA, B2Brouter will close the existing Annuaire entry and open a new one. Update any existing integration that references the old transport identifier.

The \`start\_date\` determines when tax reporting begins. From that date, invoices you issue will generate tax reports and be transmitted to the PPF.

\*\*Example request:\*\*

\`\`\`shell  
curl \--request POST \\  
     \--url https://api-staging.b2brouter.net/accounts/{ACCOUNT\_ID}/tax\_report\_settings \\  
     \--header 'X-B2B-API-Key: {YOUR\_API\_KEY}' \\  
     \--header 'X-B2B-API-Version: {YOUR\_API\_VERSION}' \\  
     \--header 'Content-Type: application/json' \\  
     \--data '{  
       "tax\_report\_setting": {  
         "code": "dgfip",  
         "start\_date": "2026-09-01",  
         "type\_operation": "services",  
         "naf\_code": "62",  
         "enterprise\_size": "eti",  
         "email": "jane.doe@example.com"  
       }  
     }'  
\`\`\`

\*\*Sample response:\*\*

\`\`\`json  
{  
  "tax\_report\_setting": {  
    "code": "dgfip",  
    "start\_date": "2026-09-01",  
    "auto\_generate": true,  
    "auto\_send": true,  
    "enabled": true,  
    "type\_operation": "services",  
    "naf\_code": "62",  
    "enterprise\_size": "eti",  
    "email": "jane.doe@example.com",  
    "locked": false,  
    "created\_at": "2026-06-10T10:15:22.000Z",  
    "updated\_at": "2026-06-10T10:15:22.000Z"  
  }  
}  
\`\`\`

\#\#\#\# DGFiP Tax Report Settings fields

| Field               | Type    | Required | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                               |  
| \------------------- | \------- | \-------- | \------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |  
| code                | string  | Yes      | Must be \`"dgfip"\`.                                                                                                                                                                                                                                                                                                                                                                                                                                                        |  
| start\\\_date         | date    | Yes      | When tax reporting begins. Must be today or a future date. Defaults to \*\*tomorrow\*\* if omitted.                                                                                                                                                                                                                                                                                                                                                                           |  
| type\\\_operation     | string  | Yes      | Default operation type for this company: \`"services"\`, \`"goods"\`, or \`"mixed"\`. Determines the DGFiP process code (S1/B1/M1 etc.) used in tax reports. Choose \`"mixed"\` if your company sells both goods and services. This setting can be updated after activation.                                                                                                                                                                                                      |  
| naf\\\_code           | string  | Yes      | The company's \[NAF/APE code\](https://www.insee.fr/fr/information/2120875) (Nomenclature d'Activités Française). This is the 2-digit section code assigned by INSEE that identifies the company's main economic activity (e.g. \`"62"\` for IT and software services, \`"47"\` for retail, \`"86"\` for health). The DGFiP uses this code for tax reporting classification. You can find your NAF code on your company's Kbis extract or on \[sirene.fr\](https://www.sirene.fr/). |  
| enterprise\\\_size    | string  | Yes      | The company's size category as defined by \[INSEE\](https://www.insee.fr/fr/metadonnees/definition/c1057). Allowed values: \`"micro"\` (Microentreprise — \\\< 10 employees, CA ≤ 2 M€), \`"pme"\` (PME — 10 to 249 employees, CA ≤ 50 M€), \`"eti"\` (ETI — 250 to 4 999 employees, CA ≤ 1.5 Md€), or \`"ge"\` (Grande Entreprise — 5 000+ employees or CA \> 1.5 Md€).                                                                                                               |  
| reason\\\_vat\\\_exempt | string  | No       | Default VAT exemption reason code for this company. Defaults to \`"VATEX-FR-FRANCHISE"\` (franchise en base de TVA). Set this if your company operates under a specific VAT exemption regime. See \[VAT-exempt lines\](\#vat-exempt-lines-category-e) and \[Franchise en base de TVA\](\#franchise-en-base-de-tva-vatex-fr-franchise) for the full list of accepted codes.                                                                                                        |  
| email               | string  | No       | Contact email for tax-related notifications.                                                                                                                                                                                                                                                                                                                                                                                                                              |  
| auto\\\_generate      | boolean | No       | Always \`true\` for DGFiP (legal obligation). Cannot be changed.                                                                                                                                                                                                                                                                                                                                                                                                            |  
| auto\\\_send          | boolean | No       | Automatically transmit tax reports to the PPF. Defaults to \`true\`.                                                                                                                                                                                                                                                                                                                                                                                                        |  
| enabled             | boolean | No       | Whether the setting is active. Defaults to \`true\`. Annuaire registration only occurs when \`true\`.                                                                                                                                                                                                                                                                                                                                                                         |

\> If the Annuaire registration fails (invalid SIREN/SIRET, or a temporary DGFiP service outage), the Tax Report Setting creation is rolled back and an error is returned. Correct the issue and retry.

\[Tax Report Settings \- API Reference\](https://developer.b2brouter.net/reference/create-tax-report-setting)

\*\*\*

\#\#\# Step 3: Create a Contact

A French B2B contact needs \*\*routing identifiers\*\* (how the invoice reaches the recipient) and \*\*tax identification\*\* (how the recipient appears in the UBL XML).

| Field                 | Value                                    | Purpose                                                         |  
| \--------------------- | \---------------------------------------- | \--------------------------------------------------------------- |  
| \`cin\_scheme\`          | \`"0009"\` (SIRET) or \`"0002"\` (SIREN)     | Organisation ID — used to look up the recipient in the Annuaire |  
| \`cin\_value\`           | SIRET or SIREN                           | Organisation ID — the identifier registered in the Annuaire     |  
| \`tin\_scheme\`          | \`9957\`                                   | Tax ID — ISO 6523 code for French fiscal identifier             |  
| \`tin\_value\`           | \`FR{kk}{siren}\` (e.g. \`"FR78225214234"\`) | Tax ID — French VAT number in the UBL XML                       |  
| \`country\`             | \`"fr"\`                                   | Required for DGFiP routing logic                                |  
| \`currency\`            | \`"EUR"\`                                  | Default currency for this contact's invoices                    |  
| \`transport\_type\_code\` | \`"peppol"\`                               | \*\*Recommended\*\* — ensures delivery via the Peppol network       |  
| \`document\_type\_code\`  | \`"xml.ubl.invoice.frcius.v1"\`            | \*\*Recommended\*\* — France CIUS UBL invoice format                |

\> \*\*Transport and document type\*\*: For French contacts registered in the Annuaire, we recommend explicitly setting \`transport\_type\_code: "peppol"\` and \`document\_type\_code: "xml.ubl.invoice.frcius.v1"\`. The \*\*PIN scheme\*\* (Peppol participant identifier) for registered French companies is \`0225\` (FRCTC Electronic Address). You can verify that a contact is registered in the Annuaire before creating it by using the \[Directory lookup\](\#optional-verify-recipient-routing-directory-lookup) or the \[official Peppol Directory\](https://directory.peppol.eu/). B2Brouter handles the correct structuring for both domestic and international contacts, but explicitly defining the transport ensures consistent delivery routing.

\> \*\*Contacts in Belgium, Germany, and other EU countries\*\*: For B2B invoices to non-French companies, use their national identifier scheme (e.g. \`"0208"\` for Belgian KBO/BCE, \`"0190"\` for German Leitweg-ID, \`"0184"\` for Dutch KVK) and the appropriate \`country\` code. If the recipient has an active Peppol access point, B2Brouter routes the invoice via standard Peppol BIS 3.0 — no configuration needed. For transactions with any non-\`"fr"\` contact, Flux 10 cross-border e-Reporting is generated automatically.

\*\*Example request:\*\*

\`\`\`shell  
curl \--request POST \\  
     \--url https://api-staging.b2brouter.net/accounts/{ACCOUNT\_ID}/contacts \\  
     \--header 'X-B2B-API-Key: {YOUR\_API\_KEY}' \\  
     \--header 'X-B2B-API-Version: {YOUR\_API\_VERSION}' \\  
     \--header 'Content-Type: application/json' \\  
     \--data '{  
       "contact": {  
         "name": "Client Exemple SARL",  
         "address": "25 Avenue de la République",  
         "city": "Lyon",  
         "postalcode": "69001",  
         "country": "fr",  
         "currency": "EUR",  
         "language": "fr",  
         "is\_client": true,  
         "cin\_scheme": "0009",  
         "cin\_value": "98765432100011",  
         "tin\_scheme": 9957,  
         "tin\_value": "FR05987654321",  
         "transport\_type\_code": "peppol",  
         "document\_type\_code": "xml.ubl.invoice.frcius.v1"  
       }  
     }'  
\`\`\`

\*\*Sample response:\*\*

\`\`\`json  
{  
  "contact": {  
    "id": 1313228381,  
    "name": "Client Exemple SARL",  
    "address": "25 Avenue de la République",  
    "city": "Lyon",  
    "postalcode": "69001",  
    "country": "fr",  
    "currency": "EUR",  
    "language": "fr",  
    "is\_client": true,  
    "cin\_scheme": "0009",  
    "cin\_value": "98765432100011",  
    "tin\_scheme": 9957,  
    "tin\_value": "FR05987654321",  
    "created\_at": "2026-06-18T07:19:32Z",  
    "updated\_at": "2026-06-18T07:19:32Z"  
  }  
}  
\`\`\`

\[POST Contact \- API Reference\](https://developer.b2brouter.net/reference/create-contact)

\#\#\#\# Optional: Verify recipient routing (Directory lookup)

B2Brouter routes invoices automatically. To inspect how a recipient will be routed before sending — for example to confirm they are registered in the Annuaire — use the Directory lookup:

\`\`\`shell  
curl \--request GET \\  
     \--url 'https://api-staging.b2brouter.net/directory/fr/0009/98765432100011' \\  
     \--header 'X-B2B-API-Key: {YOUR\_API\_KEY}' \\  
     \--header 'X-B2B-API-Version: {YOUR\_API\_VERSION}'  
\`\`\`

\[GET Lookup Directory \- API Reference\](https://developer.b2brouter.net/reference/lookup-directory-by-country-and-scheme)

\#\#\#\# Annuaire verification and tax report generation

B2Brouter automatically verifies whether French contacts (\`country: "fr"\`) are registered in the DGFiP Annuaire. This verification determines the tax reporting flow:

\* \*\*Contact registered in Annuaire\*\* (\`in\_dgfip\_annuaire: true\` or not yet verified): the invoice generates a \*\*Flux 1\*\* tax report (domestic B2B e-invoicing).  
\* \*\*Contact NOT registered in Annuaire\*\* (\`in\_dgfip\_annuaire: false\`): the invoice \*\*does not generate a tax report\*\*. This prevents invalid Flux 1 submissions for recipients that the PPF cannot route to.  
\* \*\*Contact not yet verified\*\* (\`in\_dgfip\_annuaire: nil\`): B2Brouter is permissive — the invoice proceeds and generates a tax report. Verification happens asynchronously in the background.

\> If you create a French contact and immediately send an invoice, the Annuaire verification may not have completed yet. This is by design — B2Brouter does not block invoice creation while verification is pending. If the contact turns out to be unregistered, future invoices to that contact will not generate Flux 1 tax reports until the contact registers with a PA.

\> The Annuaire check only applies to \*\*French domestic contacts\*\* (\`country: "fr"\`). Non-French contacts always follow the Flux 10 e-Reporting path regardless of Annuaire status.

\*\*\*

\#\# Issuing Invoices

Once your company is onboarded and the DGFiP Tax Report Setting is enabled, creating invoices works through the standard Invoice API. B2Brouter handles all France-specific requirements automatically: tax report generation, UBL/CII/Factur-X formatting, and PPF transmission via Flux 1\.

Use \`send\_after\_import: true\` to create and transmit in one step. Set it to \`false\` if you want to create the invoice first and review it before sending — in that case, the invoice stays in \`new\` state until you trigger transmission via a separate call or through the B2Brouter UI.

\> \*\*Sequential invoicing\*\*: The API processes one invoice per request. For bulk or batch scenarios, iterate through your invoice list and call the endpoint for each document. The API supports concurrent requests — you can parallelise multiple POSTs without waiting for each response before starting the next.

\#\#\# Standard B2B invoice

The most common case: a domestic French B2B invoice with standard TVA (20%).

\`\`\`shell  
curl \--request POST \\  
     \--url https://api-staging.b2brouter.net/accounts/{ACCOUNT\_ID}/invoices \\  
     \--header 'X-B2B-API-Key: {YOUR\_API\_KEY}' \\  
     \--header 'X-B2B-API-Version: {YOUR\_API\_VERSION}' \\  
     \--header 'Content-Type: application/json' \\  
     \--data '{  
       "send\_after\_import": true,  
       "invoice": {  
         "type": "IssuedInvoice",  
         "contact\_id": 1313228381,  
         "number": "FA-2026-0048",  
         "date": "2026-09-15",  
         "due\_date": "2026-10-15",  
         "currency": "EUR",  
         "payment\_method": 4,  
         "remittance\_information": "FA-2026-0048 — Exemplar SAS, SAS au capital de 50 000 EUR, RCS Paris 123 456 789",  
         "payment\_method\_text": "Virement bancaire, IBAN FR00 0000 0000 0000 0000 0000 000, BIC XXXXFRPP",  
         "payment\_terms": "Net 30 jours à compter de la date de facture. Pénalité de retard : 12% annuel.",  
         "invoice\_lines\_attributes": \[  
           {  
             "quantity": 10.0,  
             "description": "Consulting services — architecture review",  
             "price": 150.0,  
             "unit": 9,  
             "taxes\_attributes": \[  
               { "name": "TVA", "percent": 20.0, "category": "S" }  
             \]  
           },  
           {  
             "quantity": 5.0,  
             "description": "Training sessions — API integration",  
             "price": 200.0,  
             "unit": 9,  
             "taxes\_attributes": \[  
               { "name": "TVA", "percent": 20.0, "category": "S" }  
             \]  
           }  
         \]  
       }  
     }'  
\`\`\`

\*\*Sample response:\*\*

\`\`\`json  
{  
  "invoice": {  
    "id": 4919734,  
    "type": "IssuedInvoice",  
    "number": "FA-2026-0048",  
    "state": "sending",  
    "date": "2026-09-15",  
    "due\_date": "2026-10-15",  
    "subtotal": 2500.0,  
    "taxes": \[  
      { "name": "TVA 20,00%", "percent": 20.0, "base": 2500.0, "amount": 500.0 }  
    \],  
    "total": 3000.0,  
    "currency": "EUR",  
    "remittance\_information": "FA-2026-0048 — Exemplar SAS, SAS au capital de 50 000 EUR, RCS Paris 123 456 789",  
    "payment\_method\_text": "Virement bancaire, IBAN FR00 0000 0000 0000 0000 0000 000, BIC XXXXFRPP",  
    "payment\_terms": "Net 30 jours à compter de la date de facture. Pénalité de retard : 12% annuel.",  
    "extra\_info": null,  
    "tax\_report\_ids": \[42\],  
    "errors": \[\],  
    "created\_at": "2026-09-15T09:54:42Z",  
    "updated\_at": "2026-09-15T09:54:45Z"  
  }  
}  
\`\`\`

The \`tax\_report\_ids\` array contains the ID of the generated tax report. Use it to track the submission lifecycle (see \[Check the state of a Tax Report\](\#check-the-state-of-a-tax-report)).

\[POST Invoice \- API Reference\](https://developer.b2brouter.net/reference/create-invoice)

\#\#\# France-specific invoice fields

\#\#\#\# Payment information (required native fields)

Three payment fields are mandatory for French B2B e-invoices (\`IssuedInvoice\`). Provide them as direct API fields:

| Field                    | DGFiP field | Description                                                                     | Required                                |  
| \------------------------ | \----------- | \------------------------------------------------------------------------------- | \--------------------------------------- |  
| \`remittance\_information\` | PMD         | Payment reference and legal mentions (company registration, share capital, RCS) | \*\*Yes — B2B domestic and cross-border\*\* |  
| \`payment\_method\_text\`    | PMT         | Payment method code \+ IBAN/BIC details                                          | \*\*Yes — B2B domestic and cross-border\*\* |  
| \`payment\_terms\`          | AAB         | Due date, late payment penalties, discount conditions                           | \*\*Yes — B2B domestic and cross-border\*\* |

\> If any of the three fields is missing, the request returns \*\*HTTP 422\*\* with explicit error messages for each absent field (e.g. \`"Remittance information is required for DGFiP reporting"\`). These are not silent — the invoice is never created. Correct the missing fields and resubmit.

\> \*\*B2C invoices\*\* (\`IssuedSimplifiedInvoice\`) do not require these fields.

\> \*\*Importing from other formats (UBL, CII, Factur-X)\*\*: Not all invoicing formats carry dedicated fields for \`remittance\_information\`, \`payment\_method\_text\`, and \`payment\_terms\`. For these integrations, use the \`extra\_info\` field with structured tags:  
\>  
\> \`\`\`  
\> \#PMD\# FA-2026-0048 — Exemplar SAS, RCS Paris 123 456 789  
\> \#PMT\# Credit Transfer, IBAN FR00 0000 0000 0000 0000 0000 000, BIC XXXXFRPP  
\> \#AAB\# Net 30 jours. Pénalité de retard : 12% annuel.  
\> \`\`\`  
\>  
\> B2Brouter extracts these tags and maps them to the corresponding native fields automatically. This is the expected format for XML and Factur-X imports — it ensures DGFiP payment data is correctly populated regardless of the source document structure. When native UBL payment fields are also present in the imported document, they take priority over the \`extra\_info\` tags.  
\>  
\> If you manage invoices across multiple companies with different ERP systems and document formats, the JSON API gives you the most control and consistency — all fields are explicit and structured. For XML-based integrations, test your import flow end-to-end in staging to confirm all DGFiP-required fields are correctly mapped before going live.

\#\#\#\# Other required fields

\* \*\*\`payment\_method\`\*\*: An integer representing the payment method. Common values for France: \`4\` \= Credit Transfer, \`58\` \= SEPA Credit Transfer, \`2\` \= Direct Debit, \`59\` \= SEPA Direct Debit, \`19\` \= Bank Card, \`11\` \= Cheque, \`13\` \= Other (use \`payment\_method\_text\` for custom descriptions). See the \[Payment Method Guide\](https://developer.b2brouter.net/docs/payment\_method\_guide) for the full list with UBL and Facturae equivalents.  
\* \*\*\`due\_date\`\*\*: Required for French B2B invoices.  
\* \*\*\`currency\`\*\*: Must be \`"EUR"\` for domestic French invoices. For invoices in a foreign currency, include \`"exchange\_rate"\` with the EUR conversion rate at the invoice date (e.g. \`"exchange\_rate": 1.08\` for a USD invoice). If omitted for a non-EUR invoice, B2Brouter reports amounts in the original currency — the DGFiP may accept the report but the declared amounts will be incorrect.  
\* \*\*\`taxes\_attributes\[\].name\`\*\*: Required for each tax line (e.g. \`"TVA"\`). Tax lines without a name are silently discarded.  
\* \*\*Invoice number\*\*: Maximum 20 characters. Allowed characters: alphanumeric, spaces, and \`-+\_/\`. No leading, trailing, or consecutive spaces.

\#\#\#\# VAT-exempt lines (category E)

When a line has \`category: "E"\` (VAT-exempt), you must also provide a \`comment\` with the applicable \`VATEX-FR-CGI261-\*\` exemption code (DGFiP BT-121):

\> ⚠️ \*\*Silent blocking\*\*: If \`comment\` is omitted on a category E line, the invoice is \*\*created\*\* (HTTP 200\) but \*\*never transmitted to the PPF\*\*. The response will contain a non-empty \`errors\` array — check it even on successful responses. The invoice exists in B2Brouter but is permanently blocked until corrected. Delete it and resubmit with the \`comment\` field populated.

\> \*\*Coming soon\*\*: B2Brouter will add structured validation and XML mapping of \`VATEX-FR-CGI261-\*\` codes in a future release. Use the code string directly now (e.g. \`"VATEX-FR-CGI261-1"\`) so your integration is forward-compatible once validation is activated.

\*\*DGFiP VAT exemption codes (BT-121)\*\*

| Code                     | Legal reference          | Tax category  | Description                                                                                            |  
| \------------------------ | \------------------------ | \------------- | \------------------------------------------------------------------------------------------------------ |  
| \`VATEX-FR-FRANCHISE\`     | Art. 293 B CGI           | Z (zero-rate) | Franchise en base de TVA — see \[dedicated section\](\#franchise-en-base-de-tva-vatex-fr-franchise) below |  
| \`VATEX-FR-CNWVAT\`        | —                        | E (exempt)    | Non-established in France (non-assujetti établi hors de France)                                        |  
| \`VATEX-FR-AE\`            | —                        | E (exempt)    | Autoliquidation (reverse charge)                                                                       |  
| \`VATEX-FR-CGI261-1\`      | Art. 261-1° CGI          | E (exempt)    | Soins et services médicaux (médecins, chirurgiens, sages-femmes)                                       |  
| \`VATEX-FR-CGI261-2\`      | Art. 261-2° CGI          | E (exempt)    | Services paramédicaux (infirmiers, kinésithérapeutes, etc.)                                            |  
| \`VATEX-FR-CGI261-3\`      | Art. 261-3° CGI          | E (exempt)    | Enseignement scolaire, universitaire et formation professionnelle                                      |  
| \`VATEX-FR-CGI261-4\`      | Art. 261-4° CGI          | E (exempt)    | Services à caractère sportif et éducatif                                                               |  
| \`VATEX-FR-CGI261-5\`      | Art. 261-5° CGI          | E (exempt)    | Organismes sans but lucratif                                                                           |  
| \`VATEX-FR-CGI261-7\`      | Art. 261-7° CGI          | E (exempt)    | Services rendus à leurs membres par certains groupements                                               |  
| \`VATEX-FR-CGI261-8\`      | Art. 261-8° CGI          | E (exempt)    | Opérations immobilières exonérées                                                                      |  
| \`VATEX-FR-CGI261A\`       | Art. 261 A CGI           | E (exempt)    | Activités des établissements financiers et d'assurance                                                 |  
| \`VATEX-FR-CGI261B\`       | Art. 261 B CGI           | E (exempt)    | Services rendus entre membres d'un groupement (GIE)                                                    |  
| \`VATEX-FR-CGI261C-1\`     | Art. 261 C-1° CGI        | E (exempt)    | Opérations bancaires et financières                                                                    |  
| \`VATEX-FR-CGI261C-2\`     | Art. 261 C-2° CGI        | E (exempt)    | Opérations d'assurance et de réassurance                                                               |  
| \`VATEX-FR-CGI261C-3\`     | Art. 261 C-3° CGI        | E (exempt)    | Opérations sur valeurs mobilières                                                                      |  
| \`VATEX-FR-CGI261D-1\`     | Art. 261 D-1° CGI        | E (exempt)    | Locations de terrains non aménagés et de locaux nus à usage non professionnel                          |  
| \`VATEX-FR-CGI261D-1BIS\`  | Art. 261 D-1° bis CGI    | E (exempt)    | Locations de logements meublés à titre de résidence principale                                         |  
| \`VATEX-FR-CGI261D-2\`     | Art. 261 D-2° CGI        | E (exempt)    | Locations d'immeubles à usage d'habitation                                                             |  
| \`VATEX-FR-CGI261D-3\`     | Art. 261 D-3° CGI        | E (exempt)    | Locations de terres et bâtiments à usage agricole                                                      |  
| \`VATEX-FR-CGI261D-4\`     | Art. 261 D-4° CGI        | E (exempt)    | Locations de locaux nus à usage professionnel (sans option TVA)                                        |  
| \`VATEX-FR-CGI261E-1\`     | Art. 261 E-1° CGI        | E (exempt)    | Opérations portant sur l'or d'investissement                                                           |  
| \`VATEX-FR-CGI261E-2\`     | Art. 261 E-2° CGI        | E (exempt)    | Négociation sur l'or d'investissement                                                                  |  
| \`VATEX-FR-CGI277A\`       | Art. 277 A CGI           | E (exempt)    | Régime suspensif de TVA (entrepôts fiscaux)                                                            |  
| \`VATEX-FR-CGI275\`        | Art. 275 CGI             | E (exempt)    | Achats en franchise de TVA (exportateurs)                                                              |  
| \`VATEX-FR-298SEXDECIESA\` | Art. 298 sexdecies A CGI | E (exempt)    | Régime particulier des agences de voyages                                                              |  
| \`VATEX-FR-CGI295\`        | Art. 295 CGI             | E (exempt)    | Exonérations dans les DOM (départements d'outre-mer)                                                   |

\> \*\*Note\*\*: Article 261-6° du CGI does not appear in the DGFiP code list and has no \`VATEX\` code. If you are unsure which code applies, consult your tax advisor or refer to \[Article 261 du CGI\](https://www.legifrance.gouv.fr/codes/section\_lc/LEGITEXT000006069577/LEGISCTA000006162554/).

\#\#\#\# Franchise en base de TVA (VATEX-FR-FRANCHISE)

Companies operating under the \*\*franchise en base de TVA\*\* regime (Art. 293 B du CGI — typically micro-enterprises below the VAT threshold) are not VAT-exempt in the strict sense: they operate at \*\*zero-rate\*\* (tax category \`Z\`), not exempt (category \`E\`). This distinction matters because the DGFiP treats them differently in the UBL XML (rule BR-FR-MAP-06).

B2Brouter handles this automatically:

\* When a tax line has \`comment: "VATEX-FR-FRANCHISE"\`, the tax category is mapped to \`Z\` (zero-rate) instead of \`E\` (exempt) in the generated XML.  
\* The \`reason\_vat\_exempt\` field in the Tax Report Setting defaults to \`"VATEX-FR-FRANCHISE"\`. If your company is not under franchise, update this field to the appropriate \`VATEX-FR-\*\` code or leave it empty.

For franchise invoices, set \`percent: 0.0\` and \`category: "E"\` with \`comment: "VATEX-FR-FRANCHISE"\` on each tax line — B2Brouter transcodes the category to \`Z\` automatically:

\`\`\`json  
{  
  "taxes\_attributes": \[  
    {  
      "name": "TVA",  
      "percent": 0.0,  
      "category": "E",  
      "comment": "VATEX-FR-FRANCHISE"  
    }  
  \]  
}  
\`\`\`

\#\#\# Mixed VAT rates

Invoices can include lines at different TVA rates. B2Brouter aggregates them into separate \`TaxSubtotal\` elements in the UBL XML automatically.

\`\`\`shell  
curl \--request POST \\  
     \--url https://api-staging.b2brouter.net/accounts/{ACCOUNT\_ID}/invoices \\  
     \--header 'X-B2B-API-Key: {YOUR\_API\_KEY}' \\  
     \--header 'X-B2B-API-Version: {YOUR\_API\_VERSION}' \\  
     \--header 'Content-Type: application/json' \\  
     \--data '{  
       "send\_after\_import": true,  
       "invoice": {  
         "type": "IssuedInvoice",  
         "contact\_id": 1313228381,  
         "number": "FA-2026-0050",  
         "date": "2026-09-20",  
         "due\_date": "2026-10-20",  
         "currency": "EUR",  
         "payment\_method": 4,  
         "remittance\_information": "FA-2026-0050 — Exemplar SAS, SAS au capital de 50 000 EUR",  
         "payment\_method\_text": "Virement bancaire, IBAN FR00 0000 0000 0000 0000 0000 000, BIC XXXXFRPP",  
         "payment\_terms": "Net 30 jours.",  
         "invoice\_lines\_attributes": \[  
           {  
             "quantity": 2.0,  
             "description": "Équipement informatique",  
             "price": 500.0,  
             "unit": 9,  
             "taxes\_attributes": \[  
               { "name": "TVA", "percent": 20.0, "category": "S" }  
             \]  
           },  
           {  
             "quantity": 10.0,  
             "description": "Restauration d'entreprise",  
             "price": 30.0,  
             "unit": 9,  
             "taxes\_attributes": \[  
               { "name": "TVA", "percent": 10.0, "category": "S" }  
             \]  
           }  
         \]  
       }  
     }'  
\`\`\`

\#\#\# VAT-exempt invoice (category E)

\`\`\`shell  
curl \--request POST \\  
     \--url https://api-staging.b2brouter.net/accounts/{ACCOUNT\_ID}/invoices \\  
     \--header 'X-B2B-API-Key: {YOUR\_API\_KEY}' \\  
     \--header 'X-B2B-API-Version: {YOUR\_API\_VERSION}' \\  
     \--header 'Content-Type: application/json' \\  
     \--data '{  
       "send\_after\_import": true,  
       "invoice": {  
         "type": "IssuedInvoice",  
         "contact\_id": 1313228381,  
         "number": "FA-2026-0051",  
         "date": "2026-09-20",  
         "due\_date": "2026-10-20",  
         "currency": "EUR",  
         "payment\_method": 4,  
         "remittance\_information": "FA-2026-0051 — Exemplar SAS, SAS au capital de 50 000 EUR",  
         "payment\_method\_text": "Virement bancaire, IBAN FR00 0000 0000 0000 0000 0000 000, BIC XXXXFRPP",  
         "payment\_terms": "Net 30 jours.",  
         "invoice\_lines\_attributes": \[  
           {  
             "quantity": 1.0,  
             "description": "Formation professionnelle — développement logiciel",  
             "price": 1200.0,  
             "unit": 9,  
             "taxes\_attributes": \[  
               {  
                 "name": "TVA",  
                 "percent": 0.0,  
                 "category": "E",  
                 "comment": "VATEX-FR-CGI261-3"  
               }  
             \]  
           }  
         \]  
       }  
     }'  
\`\`\`

\#\#\# Credit note

To issue a credit note, set \`is\_amend: true\` and reference the original invoice using \`amended\_number\` and \`amended\_date\`. B2Brouter generates a UBL CreditNote with type code \`381\` and includes the billing reference.

\> Use \`amended\_number\` (the number printed on the original invoice) and \`amended\_date\` (the date of the original invoice). The \`amend\_of\_id\` field is not used for DGFiP credit notes.

\`\`\`shell  
curl \--request POST \\  
     \--url https://api-staging.b2brouter.net/accounts/{ACCOUNT\_ID}/invoices \\  
     \--header 'X-B2B-API-Key: {YOUR\_API\_KEY}' \\  
     \--header 'X-B2B-API-Version: {YOUR\_API\_VERSION}' \\  
     \--header 'Content-Type: application/json' \\  
     \--data '{  
       "send\_after\_import": true,  
       "invoice": {  
         "type": "IssuedInvoice",  
         "contact\_id": 1313228381,  
         "number": "NC-2026-001",  
         "date": "2026-09-25",  
         "due\_date": "2026-10-25",  
         "is\_credit\_note": true,  
         "is\_amend": true,  
         "amended\_number": "FA-2026-0048",  
         "amended\_date": "2026-09-15",  
         "currency": "EUR",  
         "payment\_method": 4,  
         "remittance\_information": "NC-2026-001 — annule et remplace FA-2026-0048. Exemplar SAS, SAS au capital de 50 000 EUR",  
         "payment\_method\_text": "Virement bancaire, IBAN FR00 0000 0000 0000 0000 0000 000, BIC XXXXFRPP",  
         "payment\_terms": "Remboursement sous 30 jours.",  
         "invoice\_lines\_attributes": \[  
           {  
             "quantity": \-1.0,  
             "description": "Annulation partielle — Consulting services",  
             "price": 500.0,  
             "unit": 9,  
             "taxes\_attributes": \[  
               { "name": "TVA", "percent": 20.0, "category": "S" }  
             \]  
           }  
         \]  
       }  
     }'  
\`\`\`

\*\*\*

\#\#\# Process codes

The process code determines the PPF flux cadre. B2Brouter assigns it automatically based on \`type\_operation\` in the Tax Report Setting and the invoice characteristics.

| Process Code | Type of Operation | Description                                   |  
| \------------ | \----------------- | \--------------------------------------------- |  
| S1           | Services          | Standard invoice for services                 |  
| B1           | Goods             | Standard invoice for goods                    |  
| M1           | Mixed             | Standard invoice for mixed operations         |  
| S2           | Services          | Paid invoice for services                     |  
| B2           | Goods             | Paid invoice for goods                        |  
| M2           | Mixed             | Paid invoice for mixed operations             |  
| S4           | Services          | Invoice with payments on account (services)   |  
| B4           | Goods             | Invoice with payments on account (goods)      |  
| M4           | Mixed             | Invoice with payments on account (mixed)      |  
| S7           | Services          | Correction of a registered invoice (services) |  
| B7           | Goods             | Correction of a registered invoice (goods)    |

\> There is no M7 process code (correction of a registered mixed invoice). This is a known gap in the DGFiP specification (XP Z12-012).

\#\#\# Document formats

B2Brouter selects the document format automatically based on the contact's \`document\_type\_code\`. When you follow the recommended contact configuration (see \[Step 3\](\#step-3-create-a-contact)), the format is determined for you — you do not need to specify it per invoice.

| Document Type Code                                                             | Format   | Description                                                                         |  
| \------------------------------------------------------------------------------ | \-------- | \----------------------------------------------------------------------------------- |  
| \`xml.ubl.invoice.frcius.v1\`                                                    | UBL XML  | France CIUS Peppol invoice (Flux 1 / Annuaire)                                      |  
| \`xml.cii.cross\_industry\_invoice.frcius.v1\`                                     | CII XML  | France CIUS CII invoice                                                             |  
| \`pdf.a.invoice.with.xml.cii.cross\_industry\_invoice.facturx.fr.all\_profiles.v1\` | Factur-X | PDF/A with embedded CII XML                                                         |  
| \`xml.tax\_report.dgfip.flux1.base.invoice\`                                      | XML      | DGFiP Flux 1 tax report — invoice (submitted to PPF)                                |  
| \`xml.tax\_report.dgfip.flux1.base.credit\_note\`                                  | XML      | DGFiP Flux 1 tax report — credit note (submitted to PPF)                            |  
| \`xml.ledger.dgfip.transactions\`                                                | XML      | DGFiP Flux 10 Ledger — transactions e-Reporting (sub-flows 10.1 B2Bi \+ 10.3 B2C)    |  
| \`xml.ledger.dgfip.payments\`                                                    | XML      | DGFiP Flux 10 Ledger — payments e-Reporting (sub-flows 10.2/10.4 for paid invoices) |

Download the transmitted invoice document using the \`download\_legal\_url\` field in the invoice response — see \[Download the original Invoice document\](\#download-the-original-invoice-document) for details. The \`document\_type\_code\` field indicates the format used for the specific contact.

\#\#\# Importing Factur-X and UBL XML

If your system already generates Factur-X or UBL XML invoices, submit them directly using the document import endpoint:

\`\`\`  
POST /accounts/{id}/invoices/import  
\`\`\`

Set \`Content-Type\` to:

\* \`application/pdf\` — for Factur-X (PDF/A-3 with embedded CII XML)  
\* \`application/xml\` — for standalone UBL 2.1 or CII XML

B2Brouter parses the embedded data, creates the invoice record, and processes it through the standard DGFiP compliance pipeline (Flux 1/10, CDAR lifecycle).

\> \*\*Plain PDFs are not supported\*\* by this endpoint. A Factur-X file is a PDF/A-3 with a structured CII XML attached inside — not a standard scanned or printed PDF. If you only have a regular PDF without embedded XML, use the JSON API instead and enter the invoice data manually or programmatically.

\*\*\*

\#\# Invoice Lifecycle

\#\#\# Invoice states

| State           | Description                                                                                                                                                                                                                                                                   |  
| \--------------- | \----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |  
| sending         | The invoice has been created and is queued for PPF transmission.                                                                                                                                                                                                              |  
| sent            | The invoice XML has been successfully uploaded to the PPF (Flux 1 deposit confirmed).                                                                                                                                                                                         |  
| registered      | The PPF has validated and accepted the invoice (CDV Flux 1 positive).                                                                                                                                                                                                         |  
| accepted        | The buyer has approved the invoice.                                                                                                                                                                                                                                           |  
| refused         | The buyer has rejected the invoice.                                                                                                                                                                                                                                           |  
| allegedly\\\_paid | The buyer has reported the invoice as paid (corresponds to CDAR 212 — Encaissée). The term "allegedly" reflects that payment has been declared by the buyer but not independently verified.                                                                                   |  
| error           | An error occurred during transmission or PPF validation (CDV Flux 1 negative). The \`errors\` field in the invoice response contains the PPF rejection reason. Delete the invoice, correct the issue, and submit a new one — errored invoices cannot be retransmitted directly. |

\#\#\# Tracking invoice states

\#\#\#\# Webhooks (recommended)

Configure webhook endpoints in the B2Brouter UI under \*\*Settings → Webhooks\*\*. Once configured, B2Brouter sends an HTTP POST to your endpoint each time the invoice reaches a new state.

\[Invoice Status WebHooks \- API Reference\](https://developer.b2brouter.net/reference/getnewinvoicestatechange)

\#\#\#\# Polling

Query the status of an invoice using its ID, or list all invoices filtered by \`state\_updated\_at\_from\` to retrieve only invoices that have changed since your last check.

\> \*\*Expected timing (Flux 1)\*\*: Tax reports are queued for PPF transmission after invoice creation. In production, transmission is near-immediate; in staging, a batch job runs periodically (expect up to a few hours). CDV state transitions (\`acknowledged\` → \`registered\`) are webhook-driven — the DGFiP processes deposited documents and responds with a CDV for each. For Flux 10 (e-Reporting), tax reports wait until the daily ledger submission (02:00 AM server time), then follow the same CDV progression. If you use webhooks, you will be notified as soon as each transition occurs without polling.

\`\`\`shell  
curl \--request GET \\  
     \--url 'https://api-staging.b2brouter.net/invoices/{INVOICE\_ID}' \\  
     \--header 'X-B2B-API-Key: {YOUR\_API\_KEY}' \\  
     \--header 'X-B2B-API-Version: {YOUR\_API\_VERSION}' \\  
     \--header 'Accept: application/json'  
\`\`\`

\[GET Invoice \- API Reference\](https://developer.b2brouter.net/reference/get-invoice)

\#\#\# Download the original Invoice document

After an invoice reaches \`sent\` state, the \`GET /invoices/{id}\` response includes a \`download\_legal\_url\` field. Use it to download the invoice document that was transmitted:

\`\`\`shell  
curl \--request GET \\  
     \--url 'https://api-staging.b2brouter.net{download\_legal\_url}' \\  
     \--header 'X-B2B-API-Key: {YOUR\_API\_KEY}' \\  
     \--header 'X-B2B-API-Version: {YOUR\_API\_VERSION}'  
\`\`\`

The \`document\_type\_code\` field in the invoice response indicates the format used (e.g. \`xml.ubl.invoice.frcius.v1\` for UBL, or \`pdf.a.invoice.with.xml.cii.cross\_industry\_invoice.facturx.fr.all\_profiles.v1\` for Factur-X). Check the \`Content-Type\` response header when downloading to handle the format correctly.

\*\*\*

\#\# Check the state of a Tax Report

The tax report tracks the technical lifecycle of the submission to the PPF. Both XML generation and PPF transmission are asynchronous — the tax report transitions through states as the PPF processes it.

The state progression differs between Flux 1 (domestic B2B) and Flux 10 (cross-border B2B and B2C):

\*\*Flux 1 — Domestic B2B invoices:\*\*

| State          | Description                                                                       |  
| \-------------- | \--------------------------------------------------------------------------------- |  
| \`new\`          | Tax report created, queued for transmission                                       |  
| \`sent\`         | Document deposited to PPF via SFTP (C2 confirmation received)                     |  
| \`acknowledged\` | PPF has received and validated the file (CDV condition 500 — Reçue)               |  
| \`registered\`   | ✅ \*\*Terminal\*\* — Invoice accepted and registered by the DGFiP (CDV condition 300\) |  
| \`refused\`      | ❌ \*\*Terminal\*\* — Rejected by the DGFiP (CDV condition 301\)                        |  
| \`error\`        | ❌ \*\*Terminal\*\* — Transmission or PPF processing error (CDV condition 301/501)     |  
| \`annulled\`     | Invoice has been annulled after registration                                      |

Flux 1 tax reports are \*\*not batched\*\* — they are transmitted immediately when the invoice is created. After the tax report reaches \`registered\`, the \*\*invoice\*\* continues its own lifecycle (\`accepted\` / \`refused\` by the buyer).

\*\*Flux 10 — Cross-border B2B and B2C invoices (e-Reporting):\*\*

| State          | Description                                                                      |  
| \-------------- | \-------------------------------------------------------------------------------- |  
| \`new\`          | Tax report created, accumulated for the daily ledger batch                       |  
| \`sent\`         | Ledger deposited to PPF via SFTP (C2 confirmation received)                      |  
| \`acknowledged\` | PPF has received the ledger (CDV condition 500 — Reçue)                          |  
| \`registered\`   | ✅ \*\*Terminal\*\* — Ledger accepted and registered by the DGFiP (CDV condition 300\) |  
| \`refused\`      | ❌ \*\*Terminal\*\* — Rejected by the DGFiP (CDV condition 301\)                       |  
| \`error\`        | ❌ \*\*Terminal\*\* — Transmission or PPF processing error (CDV condition 301/501)    |

Flux 10 tax reports are grouped into a daily \*\*Ledger\*\* — they are not transmitted individually (see \[Flux 10 Ledgers\](\#flux-10-ledgers)).

\*\*Summary — state progression by flux:\*\*

| Step | Flux 1 (B2B domestic) | Flux 10 (cross-border / B2C) |  
| \---- | \--------------------- | \---------------------------- |  
| 1    | \`new\`                 | \`new\`                        |  
| 2    | \`sent\`                | \`sent\`                       |  
| 3    | \`acknowledged\`        | \`acknowledged\`               |  
| 4    | \`registered\` ✅        | \`registered\` ✅               |

\> \*\*What is a CDV?\*\* After B2Brouter deposits a document to the PPF, the PPF does not respond synchronously. Instead, it sends back an asynchronous notification called a \*\*CDV (Compte-Rendu de Validation)\*\* — a receipt containing a condition code that indicates the outcome of each processing step. B2Brouter receives these CDV notifications as webhooks from the PPF and translates them into the tax report state transitions shown above. This is why state progression is asynchronous: each state change depends on a CDV notification from the PPF, not on a timer or scheduled job.

\#\#\#\# Webhooks (recommended)

Configure in the B2Brouter UI under \*\*Settings → Webhooks\*\*. B2Brouter sends a POST to your endpoint each time the tax report reaches a terminal state. See \[Tax Report WebHooks \- API Reference\](https://developer.b2brouter.net/reference/getnewtaxreportstatechange).

\#\#\#\# Polling

Query the state using the tax report ID from \`tax\_report\_ids\` in the invoice response:

\`\`\`shell  
curl \--request GET \\  
     \--url 'https://api-staging.b2brouter.net/tax\_reports/{TAX\_REPORT\_ID}' \\  
     \--header 'X-B2B-API-Key: {YOUR\_API\_KEY}' \\  
     \--header 'X-B2B-API-Version: {YOUR\_API\_VERSION}'  
\`\`\`

\[GET Tax Report \- API Reference\](https://developer.b2brouter.net/reference/get-tax-report)

\#\#\# Listing tax reports for VAT reconciliation

To compare B2Brouter's reported data against your own VAT records, retrieve the list of tax reports generated for an account. Each tax report record includes the associated invoice ID, amounts, submission state, and PPF acknowledgement.

\`\`\`shell  
curl \--request GET \\  
     \--url 'https://api-staging.b2brouter.net/accounts/{ACCOUNT\_ID}/tax\_reports?offset=0\&limit=25' \\  
     \--header 'X-B2B-API-Key: {YOUR\_API\_KEY}' \\  
     \--header 'X-B2B-API-Version: {YOUR\_API\_VERSION}'  
\`\`\`

\[GET Tax Reports \- API Reference\](https://developer.b2brouter.net/reference/get-tax-reports)

\*\*\*

\#\# Tax Report API

\> ⚠️ \*\*Read-only.\*\* DGFiP tax reports cannot be created directly through the Tax Report API — they are generated automatically from invoices when a DGFiP Tax Report Setting is active. Use the Invoice API to create invoices; B2Brouter handles tax report generation, XML formatting, and PPF transmission on your behalf. The \`GET /tax\_reports/{id}\` and \`GET /accounts/{id}/tax\_reports\` endpoints are available for querying tax report state and amounts.

\*\*\*

\#\# e-Reporting (Flux 10\)

Flux 10 covers transactions outside the scope of the domestic B2B e-invoicing obligation that must still be reported to the DGFiP. B2Brouter handles Flux 10 automatically — tax reports are generated from invoices and aggregated into daily \*\*Ledgers\*\* sent to the PPF.

\#\#\# B2C transactions

Sales to non-VAT-registered individuals in France. Use \`"type": "IssuedSimplifiedInvoice"\`. The \`contact\_id\` and payment fields (\`remittance\_information\`, \`payment\_method\_text\`, \`payment\_terms\`) are \*\*not required\*\* for B2C invoices.

\`\`\`shell  
curl \--request POST \\  
     \--url 'https://api-staging.b2brouter.net/accounts/{ACCOUNT\_ID}/invoices' \\  
     \--header 'X-B2B-API-Key: {YOUR\_API\_KEY}' \\  
     \--header 'X-B2B-API-Version: {YOUR\_API\_VERSION}' \\  
     \--header 'Content-Type: application/json' \\  
     \--data '{  
       "send\_after\_import": true,  
       "invoice": {  
         "type": "IssuedSimplifiedInvoice",  
         "number": "TKT-2026-001",  
         "date": "2026-09-15",  
         "currency": "EUR",  
         "invoice\_lines\_attributes": \[  
           {  
             "description": "Vente au comptoir",  
             "quantity": 1,  
             "price": 50.0,  
             "taxes\_attributes": \[  
               { "name": "TVA", "percent": 20.0, "category": "S" }  
             \]  
           }  
         \]  
       }  
     }'  
\`\`\`

The response includes \`tax\_report\_ids\`. The resulting tax report will have a \`ledger\_id\` indicating it is part of the daily Flux 10 batch.

\#\#\# Cross-border transactions (B2B intra-EU and extra-EU)

Sales to or purchases from companies established outside France — whether in the EU (Germany, Spain, Belgium…) or outside (UK, Switzerland, US…) — must be reported to the DGFiP via Flux 10 e-Reporting. This applies to \*\*B2B transactions with non-FR counterparties\*\*, not only B2C.

Use the standard \`IssuedInvoice\` or \`ReceivedInvoice\` type and set the counterparty's \`country\` to the relevant non-\`"fr"\` value. B2Brouter detects the cross-border nature automatically and generates the Flux 10 tax report. No additional fields or invoice type changes are required.

\> \*\*ReceivedInvoice conditions\*\*: A \`ReceivedInvoice\` generates a Flux 10 tax report only when \*\*both\*\* conditions are met: the invoice has a contact (\`contact\_id\` is set) \*\*and\*\* the contact's country is not \`"fr"\`. Received invoices from French suppliers are handled through Flux 1/6 (the supplier's PA reports to the PPF), so no e-Reporting is required on the buyer's side. Received invoices without a contact do not generate any tax report.

\#\#\# Flux 10 Ledgers

B2Brouter groups all Flux 10 tax reports from a calendar day into \*\*Ledgers\*\* sent to the PPF once per day (scheduled cron at 02:00 AM server time). You can identify Flux 10 tax reports by a non-null \`ledger\_id\` in the tax report response.

Tax reports are grouped into separate Ledgers by \*\*role\*\* and \*\*type\*\*:

| Ledger document type            | Role           | Content                                                             |  
| \------------------------------- | \-------------- | \------------------------------------------------------------------- |  
| \`xml.ledger.dgfip.transactions\` | SE (sales)     | Issued invoices — sub-flows 10.1 (B2Bi cross-border) and 10.3 (B2C) |  
| \`xml.ledger.dgfip.transactions\` | BY (purchases) | Received invoices from foreign suppliers — sub-flow 10.1 (B2Bi)     |  
| \`xml.ledger.dgfip.payments\`     | SE (sales)     | Paid issued invoices — sub-flows 10.2/10.4                          |

This means a single day may produce multiple Ledgers (e.g. one for sales transactions, one for purchase transactions, one for payments). Each Ledger is submitted independently and follows its own CDV state progression. Tax reports within the same Ledger share the same \`ledger\_id\`.

The tax report state progression for Flux 10 is: \`new\` → \`sent\` → \`acknowledged\` → \`registered\`. See the \[full state table\](\#check-the-state-of-a-tax-report) for details.

\> Flux 10 tax report XML is not directly downloadable via the API. The XML is submitted as part of the ledger. Attempting to download it returns a \`422\` response containing the associated \`ledger\_id\`.

\*\*\*

\#\# Receiving Invoices

As a French company registered in the Annuaire with a Peppol 0225 transport, you automatically receive electronic invoices from other French and Peppol-connected platforms. Incoming invoices are processed by B2Brouter and made available through the API.

\#\#\# Invoice lifecycle for received invoices

When you receive an invoice, you must communicate its status back to the PPF and sender. B2Brouter handles this automatically through CDAR messages when you update the invoice state.

| Invoice Action | CDAR Status Code | Description                                  |  
| \-------------- | \---------------- | \-------------------------------------------- |  
| Deposited      | 200 (Déposée)    | Invoice deposited and registered in the PPF. |  
| Received       | 202 (Reçue)      | Invoice received by the buyer.               |  
| Approved       | 205 (Approuvée)  | Buyer has approved the invoice for payment.  |  
| Refused        | 210 (Refusée)    | Buyer has rejected the invoice.              |  
| Paid           | 212 (Encaissée)  | Buyer has reported the invoice as paid.      |  
| Rejected       | 213 (Rejetée)    | PPF has rejected the invoice at reception.   |

\> \*\*Marking invoices as paid (212 Encaissée)\*\*: This status update is not yet available — neither via the API nor the web interface. Support for reporting payment acknowledgement (CDAR 212\) is planned for a future release.

\#\#\# Updating received invoice state

When you receive an invoice, report its status to the PPF by updating the invoice state via the API. B2Brouter translates the state change into the corresponding CDAR message automatically.

\`\`\`shell  
curl \--request POST \\  
     \--url https://api-staging.b2brouter.net/invoices/{INVOICE\_ID}/mark\_as \\  
     \--header 'X-B2B-API-Key: {YOUR\_API\_KEY}' \\  
     \--header 'X-B2B-API-Version: {YOUR\_API\_VERSION}' \\  
     \--header 'accept: application/json' \\  
     \--header 'content-type: application/json' \\  
     \--data '{"state":"accepted"}'  
\`\`\`

Valid target states for received invoices: \`accepted\` (205 Approuvée), \`refused\` (210 Refusée). Reporting payment (212 Encaissée) is not yet available — support is planned for a future release.

\[Switch invoice state \- API Reference\](https://developer.b2brouter.net/reference/mark-as-invoice)

\#\#\# Listing received invoices

\`\`\`shell  
curl \--request GET \\  
     \--url 'https://api-staging.b2brouter.net/accounts/{ACCOUNT\_ID}/invoices?type=ReceivedInvoice\&offset=0\&limit=25' \\  
     \--header 'X-B2B-API-Key: {YOUR\_API\_KEY}' \\  
     \--header 'X-B2B-API-Version: {YOUR\_API\_VERSION}' \\  
     \--header 'Accept: application/json'  
\`\`\`

\[GET Invoices \- API Reference\](https://developer.b2brouter.net/reference/get-invoices)

\*\*\*

\#\# Further resources

\#\#\# B2Brouter documentation

\* \[API Reference\](https://developer.b2brouter.net/reference)  
\* \[Tax Report Settings Guide\](https://developer.b2brouter.net/docs/tax\_report\_settings\_guide)  
\* \[Chorus Pro Guide (B2G)\](https://developer.b2brouter.net/docs/send\_an\_invoice\_through\_chorus\_pro) — for invoicing French public-sector entities  
\* \[Support\](https://www.b2brouter.net/docs/\#/en/support/open-incident-report)  
\* \[Contact us / Pricing\](https://www.b2brouter.net/global/contact/) — for pricing (per-invoice, volume, and eDocSync/embedded plans), contact our Sales team

\#\#\# Official specifications & validation artefacts

\* \[DGFiP — French e-invoicing reform\](https://www.impots.gouv.fr/facturation-electronique-702) — official regulation page, mandatory timelines, PA/PPF roles  
\* \[Peppol BIS Billing 3.0\](https://docs.peppol.eu/poacc/billing/3.0/) — the base UBL invoice specification used by B2Brouter for Flux 1\. France extends this with national rules (FR-B2B CIUS)  
\* \[Peppol validation artefacts (Schematron/XSD)\](https://github.com/OpenPEPPOL/peppol-bis-invoice-3) — source Schematron rules and XSD schemas for BIS 3.0, including national extensions. Use these to pre-validate your UBL invoices before submission  
\* \[FNFE-MPE — France e-invoicing working group\](https://www.fnfe-mpe.org/) — publishes the French CIUS (FR-B2B) extension rules on top of Peppol BIS 3.0, including France-specific Schematron constraints for DGFiP  
\* \*\*XP Z12-012\*\* (AFNOR) — the French national standard defining the DGFiP invoice data model, process codes (S1/B1/M1…), and Flux 1/6/10 requirements. Available through the \[AFNOR catalogue\](https://www.boutique.afnor.org/)  
\* \*\*EN 16931\*\* (CEN TC 434\) — European e-invoicing semantic data model. Defines the \`VATEX\` tax exemption code vocabulary (BT-121) used throughout this guide  
\* \[Article 261 du CGI — Legifrance\](https://www.legifrance.gouv.fr/codes/section\_lc/LEGITEXT000006069577/LEGISCTA000006162554/) — authoritative source for VAT exemption categories (\`VATEX-FR-CGI261-\*\`)  
