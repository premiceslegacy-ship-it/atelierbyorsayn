# Vérité produit Atelier

Synchronisé le 10 septembre 2026 depuis `app/data/site.ts` (source de vérité produit/prix du code) et les documents produit et commerciaux Atelier fournis par Orsayn.

## Positionnement

Atelier est une application de gestion pour les artisans du BTP. Elle centralise clients, devis, factures, relances, chantiers, planning, équipe, dépenses et marge.

Sarah est l'assistante IA métier intégrée. Elle utilise le contexte présent dans Atelier pour préparer, résumer, alerter et proposer. Une action sensible reste soumise à validation humaine. Formulation de référence : « Sarah travaille. Vous décidez. »

Ne jamais présenter Sarah comme une salariée, une experte juridique, une comptable ou une décisionnaire autonome.

## Prix publics

- Offre clé en main : 3 000 € HT en une fois ; configuration métier ; reprise du catalogue ; prise en main guidée en direct ; puis 14 jours de support prioritaire ; accès sans abonnement mensuel ensuite. Le logiciel reste la propriété d'Orsayn. Sarah est incluse (texte : devis, relances, alertes marge), mais sans le live IA vocal (conversation en direct), réservé aux abonnements Pro/Expert.
- Application avec abonnement : aucun frais de setup.
- Pro : 69 € HT/mois ; Sarah (texte et voix) ; 120 échanges IA/mois ; 60 analyses de devis (dont pré-métré sur plan)/mois ; 60 minutes de conversation vocale en direct/mois. **C'est Pro, pas Expert, qui est offert 14 jours sans carte bancaire.**
- Expert : 169 € HT/mois ; échanges et analyses de devis illimités ; 300 minutes de conversation vocale en direct/mois ; extraction catalogue et imports illimités. Pas d'essai gratuit automatique : le checkout Stripe est généré après l'onboarding.
- Ne jamais écrire que l'essai gratuit ouvre Expert : c'est Pro qui est offert 14 jours sans carte bancaire (voir `TRIAL_DAYS` et `trial: true` sur le tier Pro dans `app/data/site.ts`).
- Connexion facturation électronique : incluse, sans surcoût, dans le setup et dans Pro/Expert.

Ne jamais inventer une remise, un prix barré, une économie ou un quota.

## Conformité

Atelier génère systématiquement un fichier Factur-X (EN 16931) en plus du PDF, pour tous les clients. Orsayn n'est pas une plateforme agréée (PDP) mais un opérateur de dématérialisation (OD) ; la transmission réglementaire passe par Super PDP, plateforme immatriculée PDP par la DGFiP, dont la connexion est incluse dans toutes les offres. La responsabilité légale de la transmission incombe à Super PDP et au client.

Calendrier réglementaire : pour les artisans, TPE et PME, la réception électronique via une plateforme agréée est obligatoire à partir du 1er septembre 2026 ; l'émission ne le devient qu'au 1er septembre 2027. Entre ces deux dates, le client choisit d'activer l'émission dès maintenant ou d'attendre l'échéance. Ne jamais présenter l'émission comme déjà obligatoire pour un artisan avant septembre 2027. Vérifier le statut et le vocabulaire officiel au moment de toute publication.

## Preuve sociale

Les sept témoignages présents sur le site sont des cas clients réels anonymisés. Conserver les citations et résultats approuvés. Ne pas extrapoler une moyenne ou une garantie de résultat à partir de ces cas.
