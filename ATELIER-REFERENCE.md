# Atelier — Document de référence produit

> Dernière mise à jour : mai 2026 (v2.1).
> Ce document est la source de vérité pour comprendre ce qu'est Atelier, à qui il s'adresse, ce qu'il fait, ce qu'il ne fait pas encore, et à quel prix. Il sert de base pour élaborer les stratégies commerciales, les contenus réseaux, les ads et l'outreach.

---

## 1. Ce qu'est Atelier en une phrase

Atelier est le premier outil de gestion pensé pour l'artisan BTP qui pilote son activité depuis son téléphone — devis, chantiers, équipe, rentabilité, et un agent WhatsApp qui travaille à sa place.

---

## 2. ICP — Le client idéal

### Profil primaire

**L'artisan-patron BTP 2nd oeuvre, 2 à 8 personnes, 200k à 800k€ de CA.**

Il dirige sa boîte depuis le terrain. Il gère les devis le soir sur la table de la cuisine, répond à ses clients sur WhatsApp personnel, oublie de relancer, ne sait jamais si un chantier est vraiment rentable avant d'avoir tout payé. Il déteste l'administratif mais il sait que c'est là qu'il perd de l'argent.

| Critère | Détail |
|---------|--------|
| Corps de métier cibles | Électricité, plomberie/CVC, menuiserie, tôlerie, peinture, plâtrerie/isolation, paysagisme |
| Taille | Patron + 1 à 7 personnes (ouvriers, sous-traitants, intérimaires) |
| CA | 200k à 800k€/an |
| Rapport au digital | Smartphone oui, ERP jamais. Il utilise Word, Excel, ou un logiciel vieillissant (EBP, Batappli, Sage) |
| Douleur n°1 | Les devis prennent trop de temps et les relances sont oubliées |
| Douleur n°2 | Il ne sait pas si ses chantiers sont rentables avant de les avoir terminés |
| Douleur n°3 | La gestion de l'équipe (heures, planning, communication) est un chaos de messages WhatsApp |
| Douleur n°4 | Il a peur de la facturation électronique obligatoire en 2026 et ne sait pas comment s'y préparer |

### Profil secondaire

**L'artisan avec équipe structurée, 8 à 15 personnes, 800k à 2M€ de CA.**

Il a déjà un comptable, peut-être une secrétaire. Il cherche à professionnaliser sa gestion de chantier et à avoir une visibilité en temps réel sur la rentabilité. Le module WhatsApp agent a une valeur quotidienne concrète pour lui — ses chefs d'équipe pointent leurs heures sans avoir à revenir au bureau.

### Métiers et niveau de fit

| Métier | Fit actuel | Raison principale |
|--------|-----------|-------------------|
| Tôlerie / métallerie | Excellent | Catalogue dimensionnel (ml, m²) natif, devis complexes multi-lignes |
| Menuiserie / agencement | Excellent | Tarification au m², variantes matière, chantiers avec jalons |
| Électricité / plomberie / CVC | Très bon | Devis rapides, acomptes, chantiers récurrents, catalogue par profil |
| Peinture / plâtrerie | Très bon | Tarification m², formulaire public devis, relances auto |
| Plaquiste / isolation | Très bon | Pose + fourniture, devis dimensionnel, acomptes |
| Charpente / couverture | Bon | Rien de bloquant, catalogue à enrichir côté matériaux |
| Maçonnerie / gros oeuvre | Bon | Chantiers longs, équipes, rentabilité — manque : situations de travaux / avancement % |
| Paysagisme | Bon | Factures récurrentes entretien, catalogue saisonnier |
| Nettoyage professionnel | Moyen | Factures récurrentes OK — manque planning tournées multi-sites et contrats de prestation |

**Règle de ciblage commercial :** se concentrer sur les métiers "Excellent" et "Très bon". Ne pas vendre aux métiers "Moyen" sans les modules adaptés — risque de clients insatisfaits.

---

## 3. Fonctionnalités complètes de l'app

### 3.1 Facturation et commercial

| Fonctionnalité | Détail |
|----------------|--------|
| Devis numérotés | Format DEV-XXXX-001, éditeur lignes, sous-total, TVA configurable |
| Tarification dimensionnelle | Prix au m², ml, m³ — calcul automatique selon dimensions saisies |
| Variantes tarifaires | Plusieurs grilles de prix selon le profil métier (BTP, Paysage, Nettoyage, Industrie) |
| Acomptes | Création en montant fixe ou % du devis, numérotation séparée |
| Aide/subvention déductible | MaPrimeRénov, CEE — affiché sur le PDF avec le reste à charge client |
| Signature électronique | Signature client sur le devis depuis un lien email |
| Factures numérotées | Format FAC-XXXX-001, conversion directe depuis devis accepté |
| Factures d'acompte | Avec balance_due_date (échéance du solde restant) |
| Factures récurrentes | Génération automatique + auto-envoi configurable (délai en jours après création) |
| Relances automatiques | Cron quotidien 8h Paris — relance devis et factures en retard, email rédigé par IA |
| Import document PDF/image | Extraction automatique des lignes depuis un bon de commande ou un document fournisseur |
| Formulaire public devis | Page `/demande/<slug>` — le client remplit sa demande, l'artisan reçoit une notification |
| CGV sur PDF | Texte CGV configurable dans Settings, affiché en pied de page des documents |
| Signature email | Bloc signature personnalisé ajouté à tous les emails sortants |
| Durée de validité | Configurable par organisation (défaut 30 jours) |
| Export comptable | FEC officiel (DGFiP-compatible) + CSV comptable + ZIP de réversibilité complet — filtrage par période et exercice fiscal, prévisualisation avant export (owner uniquement) |
| Contrats | Création, édition, PDF, rattachement client et chantier, signature client en ligne, templates par type, sections personnalisées, pièces jointes, cycle de vie draft → envoyé → signé → archivé |
| Situations de travaux | Facturation à l'avancement (% cumulé), calcul automatique du net à facturer, retenue de garantie configurable, décompte général définitif |
| Factures reçues | Suivi trésorerie des factures fournisseurs (reçue / à payer / payée), lien chantier optionnel |
| Factures récurrentes — contrôle | Pause / reprise, skip (reporter la prochaine génération), copie depuis une facture existante, sélection automatique de l'unité selon le mode dimensionnel (usage, possession, journalier) |
| Objectifs annuels | CA cible, encaissé cible, marge cible — suivi progression en temps réel sur le dashboard |

### 3.2 Clients et catalogue

| Fonctionnalité | Détail |
|----------------|--------|
| Fiche client | Historique CA, factures, devis, contact référent, locale |
| Catalogue articles/services | CRUD complet, tarification dimensionnelle, sections, compositions |
| Prestations types | Templates de devis réutilisables avec lignes pré-remplies |
| Fournisseurs | Table fournisseurs avec lien vers les matériaux du catalogue |
| Saisie IA catalogue | Description texte, voix (transcription STT), import PDF ou photo — extraction multimodale des articles, tarifs, prestations types et fournisseurs en une passe |
| Estimation main d'oeuvre IA | Depuis l'éditeur de devis : l'IA propose des lignes de MO selon le titre et le contexte du chantier, avec taux horaire et quantité — insertion en un clic |
| Activité métier | Profil BTP/Paysage/Nettoyage/Industrie — filtre le catalogue et les suggestions IA |
| Import clients | Chargement en masse depuis CSV |

### 3.3 Chantiers

| Fonctionnalité | Détail |
|----------------|--------|
| Fiche chantier | Titre, ville, client, budget HT, dates, statut, contact référent, marge cible (%) |
| Tâches | Drag & drop, assignation membre, statut, ordre |
| Jalons | Livrables avec date planifiée, statut, tâches associées, progression % — rapport de complétion requis à la clôture — vue timeline |
| Jalon → facture | Génération directe d'une facture depuis un jalon terminé |
| Suggestions IA tâches et jalons | L'IA propose une liste de tâches et jalons selon le type de chantier |
| Planning calendrier | Vue semaine/mois par chantier, par équipe, par membre individuel + export iCal |
| Tournées | Organisation des journées multi-chantiers — optimisation de l'ordre par proximité, calcul des temps de trajet entre sites, génération d'une feuille de route PDF, duplication de tournée |
| Planification IA tournée | L'IA crée et optimise l'ordre des slots selon la localisation des chantiers |
| Pointages heures | Saisie par chantier, par tâche, par membre — vue globale inter-chantiers avec filtrage par période (semaine / mois / plage libre), édition inline |
| Équipes | Création d'équipes, assignation à un chantier, taux horaire individuel par membre |
| Membres individuels | Sans équipe parente, sans compte auth — accès via magic link `/mon-espace`, objectifs de contribution configurables |
| Espace membre | Le membre voit ses créneaux, pointe ses heures, peut demander son rapport |
| Rapport mensuel heures | Email PDF envoyé automatiquement au membre (1er du mois, si activé) |
| Notes de chantier | Journal horodaté, visible par toute l'équipe |
| Photos chantier | Upload, titre, flag "inclure dans rapport", partage client horodaté |
| Rapport chantier PDF | Généré avec sélection de photos + intro rédigée par IA |
| Rentabilité | CA chantier vs coûts réels : MO (taux horaire org/membre) + dépenses catégorisées |
| Dépenses chantier | Matériel, sous-traitance, location (durée × tarif journalier par équipement), transport carburant (km × conso × prix/L), lien catalogue, justificatif photo attachable |
| Marge cible | Alerte visuelle si les coûts dépassent le budget cible défini au lancement |
| Lien facture → chantier | Rattachement explicite d'une facture à un chantier (utilisé dans la rentabilité) |
| Assistant IA chantier | Chat contextuel sur le chantier — résume, suggère, répond |
| Scan ticket de caisse | OCR depuis photo → dépense catégorisée automatiquement |

### 3.4 Dashboard et pilotage

| Fonctionnalité | Détail |
|----------------|--------|
| Résumé "Ma semaine" | Synthèse IA de l'activité : devis en attente, factures à relancer, chantiers en retard |
| Planification semaine IA | L'IA propose un plan de la semaine selon les chantiers et la charge |
| Tâches urgentes | Widget dashboard — tâches en retard ou à faire aujourd'hui |
| Chantiers à risque | Vue des chantiers dont la marge cible est en danger |
| KPIs financiers | CA mensuel, encaissé, devis en attente, chantiers actifs — avec delta mois précédent |
| Navigation historique | Comparaison mois par mois possible depuis le dashboard |
| Objectifs annuels | Barre de progression CA / encaissé / marge vs objectif défini dans les Settings |

### 3.4 bis Rapports

| Fonctionnalité | Détail |
|----------------|--------|
| Rapport mensuel | CA HT/TTC, encaissé, TVA collectée, bénéfice estimé (CA - MO - dépenses), chantiers actifs/terminés, heures travaillées, comparaison mois précédent |
| Rapport annuel | Cumul 12 mois avec courbes CA / encaissé / TVA, comparaison année N-1 |
| Heures par intervenant | Répartition des heures pointées par personne sur la période, avec barre de progression relative |
| Alerte intervenants sans taux | Signal si un membre a des heures mais pas de taux horaire défini (bénéfice sous-estimé) |
| Top clients | Top 10 par CA HT sur la période, avec marge et nombre de chantiers |
| Top chantiers | Top 10 par marge encaissée, avec CA facturé, encaissé, marge € et % |
| Objectifs annuels | CA cible, marge €/%, chantiers terminés, nouveaux clients, heures totales, objectifs personnalisés libres — suivi de progression en temps réel |
| Export rapport PDF | PDF du rapport mensuel ou annuel avec KPIs, objectifs, heures et classements |
| Export ZIP mensuel | PDF de synthèse + PDF de toutes les factures du mois dans une archive |
| Export FEC | Fichier d'Écritures Comptables conforme DGFiP, filtrage par période et exercice fiscal, prévisualisation avant téléchargement (owner uniquement) |
| Export CSV comptable | Colonnes normalisées pour tableur ou import logiciel comptable |

### 3.5 Demandes clients (leads)

| Fonctionnalité | Détail |
|----------------|--------|
| Formulaire public | URL `/demande/<slug>` partageable — le client décrit son besoin, dimensions, joint des fichiers |
| Inbox demandes | Vue liste avec statut (nouveau, en cours, archivé), matching client, extraction catalogue |
| Notifications | L'artisan est alerté à chaque nouvelle demande |

### 3.6 Settings et conformité

| Fonctionnalité | Détail |
|----------------|--------|
| Profil entreprise | Logo, adresse, SIRET, téléphone, email |
| Assurance décennale | Champs structurés (assureur, numéro police, dates, zone) |
| IBAN / RIB | Affiché sur les PDFs factures |
| TVA | Configurable par taux, par organisation — option TVA sur débits |
| Rôles et permissions | Owner, Admin, Manager, Collaborateur — permissions granulaires sur chantiers, pointages, finances |
| Modules IA | Activation par module (quote_ai, planning_ai, whatsapp_agent…) depuis le cockpit |
| Mémoire entreprise | Contexte métier injecté dans tous les prompts IA (tarifs, process, clients types) |
| Templates email | Personnalisation des emails sortants (relances, devis, factures) |
| Code d'invitation | Code unique pour rejoindre une organisation sans lien direct |
| Données et confidentialité | Export complet + workflow de suppression organisation |
| Facturation électronique | PDF/A-3 + Factur-X embarqué natif, IBAN/SIREN, prêt pour B2Brouter (sept. 2026) |
| Changement de mot de passe | Modification depuis les settings avec validation et confirmation |

### 3.7 WhatsApp agent

Voir section 4 pour le détail complet.

---

## 4. Agent WhatsApp — détail complet

### Ce que c'est

Un agent conversationnel qui tourne 24h/24 sur le numéro bot Atelier (mode mutualisé) ou sur le numéro Meta propre du client (mode WABA). Il comprend le langage naturel, accède à toutes les données de l'organisation en temps réel, et peut lire comme écrire. Il connaît le contexte de l'entreprise via la mémoire RAG injectée à chaque conversation.

### Les 17 outils disponibles

**Lecture / contexte**

| Outil | Ce qu'il fait concrètement |
|-------|---------------------------|
| `get_resume` | Situation globale instantanée : chantiers en cours, factures impayées, devis en attente, acomptes |
| `get_chantiers` | Liste des chantiers actifs avec statut, ville, progression tâches, contact référent |
| `get_planning_day` | Planning d'une journée : chantiers actifs, tâches échéantes, heures déjà pointées |
| `get_factures_impayees` | Factures en retard avec montant, client, nombre de jours de retard |
| `get_acomptes` | Acomptes en attente ou partiellement encaissés |
| `get_prestation_types` | Catalogue complet avec tarifs et variantes — appelé avant création de devis |
| `get_chantier_profitability` | Rentabilité d'un chantier : CA vs coûts réels (MO + dépenses) |
| `get_chantiers_at_risk` | Chantiers dont la marge cible est dépassée ou en danger |

**Écriture — chantiers**

| Outil | Ce qu'il fait concrètement |
|-------|---------------------------|
| `add_pointage` | Saisit des heures sur un chantier (recherche par mots-clés, date libre, description) |
| `add_note_chantier` | Ajoute une note horodatée au journal de chantier |
| `update_chantier_status` | Change le statut : planifié / en cours / suspendu / terminé / annulé |
| `update_chantier_planning` | Déplace ou reprogramme un chantier dans le calendrier (date début + fin) |
| `add_chantier_expense` | Enregistre une dépense catégorisée (matériel, sous-traitance, transport…) avec FK fournisseur optionnel |

**Écriture — commercial**

| Outil | Ce qu'il fait concrètement |
|-------|---------------------------|
| `create_quote` | Crée un devis brouillon avec lignes catalogue, variantes tarifaires, notes d'introduction |
| `send_quote` | Envoie un devis par email avec PDF joint |
| `create_invoice_from_quote` | Convertit un devis accepté en facture |
| `send_invoice` | Envoie une facture par email avec PDF joint |
| `create_acompte` | Crée un acompte sur devis en montant fixe ou pourcentage du total |

### Exemple de conversation réelle

> "Ça s'est bien passé ce matin chez Martin, j'ai posé 4h. Envoie-moi la facture du devis qu'on avait fait."
>
> L'agent pointe 4h sur le chantier Martin, cherche le devis correspondant, crée la facture et l'envoie par email au client. Il répond : "C'est fait — FAC-2026-012 envoyée à martin@gmail.com."

### Limites actuelles de l'agent (en cours de levée — voir scope-agent-whatsapp-evolution.md)

| Limitation | Impact | Priorité |
|-----------|--------|----------|
| Amnésie conversationnelle — chaque message repart de zéro | Références anaphoriques impossibles ("et la facture pour lui") | Haute — Phase 1 |
| Ne connaît pas les membres assignés à un chantier | "Qui travaille sur Martin cette semaine ?" sans réponse | Haute — Phase 2 |
| `add_pointage` pointe toujours sur l'owner | Un chef d'équipe pointe au nom du patron | Haute — Phase 2 |
| Pas de gestion des tâches chantier | Impossible d'ajouter ou compléter une tâche depuis WhatsApp | Moyenne — Phase 3 |
| Pas d'envoi de rapport chantier en PDF via WA | L'artisan doit passer par l'app web | Moyenne — Phase 4 |
| Pas d'OCR documents reçus | Tickets de caisse et factures fournisseurs resaisis manuellement | Moyenne — Phase 5 |
| Pas de création de chantier/client | Impossible depuis le terrain | Basse — Phase 6 |
| Mode passif uniquement | L'agent ne prévient jamais, il attend | Basse — Phase 7 |

---

## 5. Psychologie et profil mental de l'ICP

> Cette section nourrit le copywriting, les ads et le contenu. Elle ne se résume pas à une liste de douleurs — elle décrit comment l'artisan-patron pense, ressent et décide.

### 5.1 Qui il est vraiment

L'artisan-patron n'est pas un chef d'entreprise qui fait de l'artisanat. C'est un homme de métier qui, par défaut ou par ambition, s'est retrouvé à devoir gérer une boîte. Il n'a pas été formé à la gestion. Il a appris son métier avec ses mains, sur le terrain, auprès de quelqu'un qui le lui a montré.

Il est fier de ce qu'il construit. Cette fierté est identitaire, pas professionnelle. Ce n'est pas "je suis chef d'entreprise" — c'est "je suis électricien", "je suis menuisier". Le travail bien fait est une valeur morale, pas un différenciateur commercial.

Il travaille 50 à 60h par semaine. Le week-end, il pense aux devis qu'il n'a pas encore envoyés. Le soir, il répond à ses clients sur WhatsApp depuis le canapé. Il n'a pas de séparation franche entre vie pro et vie perso — la boîte, c'est lui.

Son rapport à l'argent est complexe : il fait souvent du bon travail sans être bien payé. Pas parce qu'il est mauvais en gestion — parce qu'il n'a pas les outils pour voir où l'argent va. Il "perd" de l'argent en oubliant des heures, en sous-estimant les matières, en ne relançant pas.

### 5.2 Son niveau d'awareness (échelle de Schwartz)

**Segment majoritaire : Level 3 — Problem Aware.**
Il sait qu'il a un problème. Il perd du temps sur les devis. Il oublie de relancer. Il ne sait pas si ses chantiers sont rentables. Mais il ne sait pas encore qu'Atelier existe, ni qu'une solution aussi adaptée à son profil peut exister.

**Segment minoritaire : Level 4 — Solution Aware.**
Il a déjà cherché un logiciel. Il a testé Batappli ou Obat. Il a trouvé ça trop compliqué ou trop généraliste. Il est revenu à Excel. Il sait qu'une solution doit exister mais il est sceptique — "tous ces outils c'est pas fait pour nous".

**Angle direct :** ne pas pitcher le produit d'emblée. Nommer d'abord la douleur précise. Le faire se reconnaître. Ensuite, montrer la solution.

### 5.3 Ses peurs profondes (non dites)

Ces peurs ne s'expriment pas directement dans une conversation — elles se lisent entre les lignes. Le copywriting qui les touche déclenche une réponse viscérale.

**Peur 1 — Perdre le contrôle sans s'en apercevoir.**
Il ne sait pas précisément si sa boîte gagne de l'argent en ce moment. Il pense que oui. Mais il n'en est pas sûr. L'idée qu'un chantier qu'il a fait avec les mains soit finalement un chantier où il a travaillé pour rien — c'est une peur réelle, sourde, jamais exprimée.

*Angle copy :* "Tu as travaillé 3 semaines sur ce chantier. Est-ce que tu sais vraiment ce qu'il t'a rapporté ?"

**Peur 2 — Passer pour un amateur aux yeux de ses clients.**
Il sait faire son métier. Mais quand il envoie un devis Word avec une mise en page approximative, quand il oublie de relancer pendant 3 semaines, il sent que ça le fait passer pour quelqu'un de peu professionnel. Ce n'est pas une peur de l'échec — c'est une peur du regard des autres.

*Angle copy :* "Tes devis sortent en 5 minutes, avec ton logo, ta signature. Comme si tu avais une assistante."

**Peur 3 — L'administratif va le rattraper.**
La TVA, la facturation électronique, les relances impayées, les pénalités. Il repousse. Il sait que ça va arriver, il ne sait pas quand. C'est une épée de Damoclès permanente.

*Angle copy :* "La facturation électronique devient obligatoire. Atelier est déjà prêt. Toi aussi, en 10 minutes."

**Peur 4 — Être dépendant d'un outil qu'il ne maîtrisera jamais.**
Il a essayé des logiciels. Il s'est perdu. Il a abandonné. L'idée d'investir du temps dans un nouvel outil pour que ça ne fonctionne pas — encore — est un frein majeur à l'adoption.

*Angle copy :* "Si tu sais envoyer un message WhatsApp, tu sais utiliser Atelier."

**Peur 5 — Perdre ses bons clients à cause d'un oubli.**
Un devis pas relancé, une facture jamais envoyée, un suivi qui tombe à l'eau. Il n'a pas peur de perdre des clients à cause de son travail — il a peur de les perdre à cause de son administration.

*Angle copy :* "Tes relances partent automatiquement. Tu ne rates plus jamais un paiement."

### 5.4 Ses désirs profonds (le rêve qu'il ne dit pas)

**Le désir n°1 : être reconnu comme un vrai professionnel.**
Pas juste un bon artisan. Un chef d'entreprise qui gère bien sa boîte. Quand il envoie un PDF propre avec son logo, quand ses clients le paient vite parce qu'ils ont reçu une relance automatique — il se sent professionnel. C'est une satisfaction identitaire forte.

**Le désir n°2 : travailler moins pour gagner autant (ou plus).**
Il ne veut pas travailler plus. Il veut arrêter de perdre du temps et de l'argent là où ce n'est pas nécessaire. Gagner 10% de rentabilité de plus sans un chantier de plus — c'est le rêve.

**Le désir n°3 : rentrer chez lui la tête libre.**
Savoir que les relances sont parties, que les heures sont pointées, que les factures sont envoyées. Ne plus avoir cette liste mentale qui ne s'éteint jamais. La paix.

**Le désir n°4 : que son équipe soit autonome.**
Ne plus être le point de passage obligatoire pour tout. Que ses gars pointent leurs heures tout seuls. Qu'il n'ait plus à courir après eux pour récupérer les informations du terrain.

### 5.5 Son système de décision

**Système 1 (instinctif, émotionnel) :** il achète si ça lui parle immédiatement. Une phrase qui nomme exactement sa douleur. Un visuel qui ressemble à sa réalité. Une démo qui montre WhatsApp — qu'il utilise déjà — faire quelque chose d'intelligent. Le "ah ouais, c'est ça" est le signal d'achat.

**Système 2 (rationnel, analytique) :** il valide si le prix est justifié, si c'est simple à utiliser, si d'autres artisans l'utilisent (preuve sociale), si les documents sont professionnels. Il calcule rapidement : si ça me fait gagner 2h/semaine, c'est déjà rentable.

**Biais cognitifs à activer :**
- Aversion à la perte : "Tu perds en moyenne X€/mois en relances oubliées."
- Social proof : montrer des artisans du même métier, de la même région.
- Effet de dotation : essai gratuit ou démo sans engagement — une fois qu'il a son logo sur un devis Atelier, il ne veut plus revenir en arrière.
- Ancrage : comparer à ce qu'il dépense en temps perdu, pas à ce que coûtent les concurrents.
- FOMO (peur de rater) : la facturation électronique, le client qui paye plus vite grâce aux relances auto.

### 5.6 Son rapport à la technologie

Il n'est pas tech. Il n'aime pas apprendre des nouveaux outils. Mais il utilise WhatsApp toute la journée sans se poser de questions. Il filme ses chantiers avec son téléphone. Il envoie des messages vocaux plutôt qu'écrits. La friction qu'il accepte est celle du smartphone — pas celle du logiciel de bureau.

**Règle d'or UX :** si une action demande plus de 3 secondes de réflexion sur le téléphone, il abandonne.

---

## 6. Positionnement et angles marketing

### 6.1 Le territoire d'Atelier

**Entre Obat (trop simple) et Batigest (trop lourd).**

Obat résout le devis. Batigest résout tout mais en ERP lourd que personne ne maîtrise. Atelier est le seul outil qui combine la simplicité mobile avec la puissance d'un agent IA qui travaille à la place de l'artisan.

**Le différenciateur incopiable à court terme : l'agent WhatsApp.**

Personne d'autre sur ce marché ne propose un agent conversationnel natif, intégré à toutes les données de l'organisation, opérationnel depuis WhatsApp. Ce n'est pas une fonctionnalité — c'est un changement de paradigme. L'artisan n'ouvre plus une app. Il parle à son assistant.

### 6.2 Angles uniques vs concurrence

**Angle 1 — "WhatsApp devient intelligent."**
L'artisan vit sur WhatsApp. Atelier ne lui demande pas de changer ses habitudes — il rend ses habitudes plus puissantes. Les concurrents ont des apps. Atelier a l'app ET l'agent dans WhatsApp. C'est deux catégories différentes.

*Pas de concurrent direct sur cet angle.*

**Angle 2 — "Tu vois si ton chantier est rentable avant qu'il soit terminé."**
Obat et Batappli donnent des chiffres de facturation. Aucun ne fait le lien entre les heures réelles passées, les matières achetées, les dépenses terrain et la marge finale. Atelier le fait en temps réel.

*Angle copy :* "3 semaines de chantier. 12 800€ facturé. 4 200€ de matières + 680h de main d'oeuvre. Marge réelle : 22%. Tu le savais ?"

**Angle 3 — "L'artisan professionnel sans la paperasse."**
Devis professionnel avec logo, relances automatiques, signature électronique, facturation électronique prête. Tout ce qui rend une boîte sérieuse aux yeux du client — sans avoir une assistante.

*Pas de logiciel concurrent qui combine tout ça dans une expérience mobile aussi fluide.*

**Angle 4 — "Ton équipe sans les appels inutiles."**
L'ouvrier reçoit un lien magic link. Il voit ses chantiers. Il pointe ses heures. Le patron voit tout en temps réel sans passer 30 minutes le soir à consolider des SMS.

*Angle copy :* "Tes gars pointent leurs heures sans télécharger une app. Tu vois tout, en direct."

**Angle 5 — "Fait pour ton métier, pas pour tous les métiers."**
Sellsy et Axonaut sont des outils généralistes. Atelier est construit pour le BTP 2nd oeuvre. Le catalogue dimensionnel (m², ml), les taux de pose, les profils métier (tôlerie, menuiserie, peinture) — tout est pré-pensé pour lui. Il n'a pas à configurer ce que "ml" veut dire.

### 6.3 Carte des bénéfices — Système 1 vs Système 2

#### Bénéfices Système 1 (émotionnels, instinctifs)

Ces bénéfices déclenchent une réaction immédiate. Ils doivent être en headline, dans les 3 premières secondes d'une pub, dans l'accroche d'un post.

| Bénéfice | Formulation qui touche |
|----------|----------------------|
| Sentiment de contrôle | "Tu sais enfin où tu en es." |
| Fierté professionnelle | "Tes documents font la différence. Sans effort." |
| Soulagement | "Tes relances partent sans que tu y penses." |
| Autonomie | "Depuis le chantier, par WhatsApp. C'est fait." |
| Paix | "Tu rentres chez toi, la tête libre." |
| Reconnaissance | "Tes clients voient un professionnel." |
| Puissance | "Un assistant qui travaille 24h/24 pour ta boîte." |

#### Bénéfices Système 2 (rationnels, calculables)

Ces bénéfices rassurent, justifient le prix, clôturent la vente.

| Bénéfice | Formulation qui convainc |
|----------|------------------------|
| Gain de temps | "Un devis en 5 min, pas 2h." |
| Récupération d'argent | "Zéro relance oubliée = des paiements qui rentrent." |
| Visibilité rentabilité | "Marge réelle = CA - MO - matières - dépenses. En direct." |
| Conformité | "Factur-X prêt pour sept. 2026, sans intervention." |
| Économie de ressource | "Pas besoin d'assistante pour envoyer des devis pros." |
| Scalabilité | "De 2 à 15 membres sans changer d'outil." |
| ROI rapide | "59€/mois. Un paiement récupéré grâce aux relances = 6 mois payés." |

---

## 7. Stratégie de contenu et créatives

### 7.1 Principes de la synnergie visuel / texte

**Règle fondamentale :** le visuel déclenche l'émotion (système 1), le texte la confirme et la dirige. Une créative qui marche ne doit pas répéter l'image avec des mots — elle doit ajouter une couche de sens que l'image seule ne donne pas.

**Mauvais :** image d'artisan sur un chantier + "Gérez vos chantiers facilement". (doublon plat)

**Bon :** image d'artisan qui fixe son téléphone le soir, fatigué + "Les devis d'hier soir ne se sont pas envoyés tout seuls. Les tiens, si." (l'image crée l'identification, le texte retourne la situation)

### 7.2 Formats créatives prioritaires

#### Format 1 — "Avant / Après" situationnel

Le plus puissant pour système 1. Montrer le contraste sans le nommer explicitement.

**Visuel :** split screen. Gauche : artisan stressé le soir, table de cuisine, papiers, Word ouvert. Droite : même artisan détendu, téléphone posé, notification "Devis envoyé" visible.
**Texte :** "T'as pas demandé à devenir chef d'entreprise. Mais maintenant que t'y es, autant que ça marche."
**CTA :** "Voir comment Atelier fonctionne"

#### Format 2 — "La vraie conversation WhatsApp"

Le plus différenciateur. Capture d'écran (UGC style) d'une vraie conversation avec l'agent.

**Visuel :** conversation WhatsApp : "Pointe 4h chez Durand et envoie la facture" → réponse de l'agent : "Fait. FAC-2026-031 envoyée à durand@gmail.com. Bonne continuation."
**Texte headline :** "Tu gères déjà tout depuis WhatsApp. Autant que ce soit intelligent."
**Texte corps :** "L'agent Atelier comprend ce que tu lui dis et le fait dans la foulée. Heures pointées, facture envoyée, client notifié."

#### Format 3 — "Le chiffre qui fait mal"

Pour système 2. Ancrage sur une perte concrète.

**Visuel :** fond sombre, chiffre grand et blanc au centre : "3 semaines de chantier. Tu as gagné combien ?"
**Texte dessous :** "Beaucoup d'artisans ne le savent pas vraiment. Atelier calcule votre marge en temps réel — heures, matières, dépenses terrain."
**CTA :** "Voir la fonctionnalité rentabilité"

#### Format 4 — "Le témoignage réaliste"

Preuve sociale. Pas le témoignage marketing lisse — le témoignage brut, authentique.

**Format recommandé :** vidéo verticale 30-45s. L'artisan dans sa camionnette ou sur le chantier. Il parle comme il parle. Pas de script parfait. Il dit juste : "Avant je perdais 2 heures par semaine sur des trucs administratifs. Maintenant c'est l'agent WhatsApp qui s'en charge. Je teste pas encore tout mais les relances automatiques — ça m'a récupéré deux paiements que j'avais quasiment oubliés."

#### Format 5 — "La fonctionnalité en 15 secondes"

Pour la middle of funnel. Montrer une fonctionnalité précise, sans fioriture.

**Exemple :** screen recording de l'éditeur de devis. Voix off : "Je sélectionne mes prestations, je tape les dimensions, le devis se calcule tout seul. Je l'envoie depuis l'app. Le client signe depuis son téléphone." Durée : 15 secondes.

### 7.3 Angles de contenu organique (réseaux)

**Pour les reels / vidéos courtes :**
- "Ce que j'aurais voulu savoir avant de prendre mon premier apprenti" (storytelling, ancré terrain, valeur + placement naturel de l'outil)
- "3 erreurs que font la plupart des artisans sur leurs devis" (éducatif, système 2)
- "Ma journée de chantier, du matin au soir" (daily vlog artisan — humanise, montre le problème)
- "Comment je gère mon équipe de 5 depuis mon téléphone" (démo implicite)
- "Facturation électronique 2026 : ce que tu dois savoir maintenant" (urgence, conformité)

**Pour les posts / carrousels :**
- "5 phrases que tu ne devrais plus jamais écrire à la main sur un devis"
- "Combien de temps tu perds par semaine en admin ? (calcul honnête)"
- "Avant / Après : ce que voient tes clients quand tu envoies un devis Word vs un PDF Atelier"
- "Ton ouvrier peut pointer ses heures sans télécharger quoi que ce soit. Voici comment."
- "MaPrimeRénov sur tes devis : comment ça marche concrètement"

**Pour les stories / formats courts :**
- Sondages : "Tu envoies tes devis par WhatsApp ou par email ?" / "Tu sais combien tu as facturé ce mois-ci ?"
- Démonstrations rapides de l'agent WhatsApp (screenshot + caption)
- Questions / réponses sur l'administratif BTP

### 7.4 Hooks d'accroche (à tester en rotation)

**Hooks émotionnels (système 1) :**
- "T'es sur le chantier à 18h et t'as encore 3 devis à faire."
- "Tu t'es couché en pensant aux factures que t'as pas relancées."
- "Ton client t'a demandé un devis il y a 10 jours. T'as oublié de l'envoyer."
- "Tu travailles 55h par semaine. Ta boîte, elle, tourne vraiment ?"
- "Le meilleur chantier du mois — t'as perdu de l'argent dessus. Sans t'en rendre compte."

**Hooks rationnels (système 2) :**
- "Un devis en 2h ou en 5 minutes. Les deux produisent le même PDF."
- "La facturation électronique devient obligatoire en septembre 2026."
- "Combien coûte un paiement impayé oublié pendant 3 mois ?"
- "59€/mois. Une heure de ta main d'oeuvre. Calcule."

**Hooks curiosité :**
- "On a donné à un artisan électricien un accès à Atelier pendant 30 jours. Voilà ce qui a changé."
- "Cet artisan menuisier gère 6 chantiers depuis WhatsApp. Comment ?"
- "L'app que les artisans BTP gardent pour eux."

---

## 8. Bénéfices client — par douleur

| Douleur | Ce que l'app résout | Bénéfice mesurable |
|---------|--------------------|--------------------|
| Devis lents | Catalogue + tarification dimensionnelle + IA analyse → devis en 5 min | -70% de temps devis |
| Relances oubliées | Cron quotidien automatique, email rédigé par IA | 0 relance oubliée |
| Rentabilité inconnue | Suivi coûts réel vs budget + marge cible + alerte | Visibilité en temps réel |
| Planning chaotique | Vue calendrier + planning IA semaine + WhatsApp agent | 1 seul endroit pour tout |
| Heures perdues | Pointage WhatsApp depuis le terrain sans ouvrir l'app | -30 min/jour d'admin |
| Équipe à gérer | Espace membre magic link, rapport mensuel auto, planning individuel | Zéro friction pour l'ouvrier |
| Peur 2026 | Structure Factur-X prête, B2Brouter intégrable, IBAN/SIREN dans les docs | Conformité sans stress |
| Leads mal traités | Formulaire public partageable, inbox demandes, extraction catalogue | Aucune demande perdue |
| Dépenses terrain | Scan ticket de caisse → dépense catégorisée automatiquement | Comptabilité chantier en temps réel |

---

## 9. Angles morts et limites actuelles

### Fonctionnels

| Manque | Impact métier | Statut |
|--------|--------------|--------|
| PV de réception / DOE | Bloquant pour promotion immobilière | Manquant — effort moyen |
| Multi-organisations (holding) | Rare mais bloquant pour gros clients | Manquant — effort moyen |
| Application mobile native | L'app est PWA — fonctionne mais pas dans l'App Store | Manquant — effort gros |
| Intégration comptable directe (Pennylane, Indy) | Import automatique vs export manuel | Manquant — effort moyen |
| Période d'essai automatisée | Onboarding sans intervention manuelle | Manquant — effort petit |

### Agent WhatsApp

Voir section 4 — limites détaillées.

### Positionnement

- Pas de période d'essai automatisée (onboarding manuel pour l'instant)
- Pas de marketplace / annuaire pour générer des leads organiques
- Pas d'intégration comptable directe (Pennylane, Indy, Axonaut)

---

## 10. Modèles IA utilisés et logique de coût

| Fonctionnalité | Modèle | Pourquoi ce choix |
|----------------|--------|-------------------|
| Relances auto (cron) | Claude Haiku 4.5 | Qualité rédactionnelle nécessaire pour un email client |
| Brouillon relance (modal) | Claude Haiku 4.5 | Idem |
| Intro email rapport chantier | Claude Haiku 4.5 | Ton professionnel requis |
| Résumé "Ma semaine" | Gemini 2.5 Flash Lite | Volume élevé, contexte long, coût prioritaire |
| Planification semaine IA | DeepSeek V4 Flash | Raisonnement planning, très bon rapport qualité/coût |
| Analyse devis (texte/image) | Gemini 2.5 Flash Lite | Vision + vitesse + coût |
| Estimation main d'oeuvre | Gemini 2.5 Flash Lite | Calcul structuré, coût minimal |
| Suggestions tâches et jalons | Gemini 2.5 Flash Lite | Génération de listes, coût minimal |
| Assistant chantier | Claude Haiku 4.5 | Conversation contextuelle, ton adapté |
| Import document PDF/image | Gemini 2.5 Flash Lite + fallback Sonnet 4.6 | Vision économique avec filet de sécurité |
| Transcription vocale (app + WA) | Voxtral Mini (Mistral direct) | Spécialisé STT, français natif |
| WhatsApp agent | Gemini 2.5 Flash | Raisonnement + outils + vitesse de réponse |
| Saisie catalogue IA | Gemini 2.5 Flash | Extraction structurée, vision si photo |
| Embeddings mémoire | Qwen3-Embedding-8B 4096 dims | Meilleure qualité sémantique en français |

---

## 11. Coûts réels par client / mois

### Infrastructure

| Service | Coût | Seuil |
|---------|------|-------|
| Supabase | 0€ | Jusqu'à 500MB DB, 50k MAU |
| Supabase Pro | ~23€ | Au-delà |
| Cloudflare Workers | 0€ | Jusqu'à ~400 clients actifs (100k req/jour partagées) |
| Cloudflare Workers Paid | ~5€ | Au-delà |
| Resend | 0€ | Jusqu'à 3k emails/mois |
| Resend payant | ~18€ | Au-delà |
| Domaine | ~0,85€ | Fixe |

### IA — coût mensuel par profil

| Profil | Hypothèses | Coût IA/mois |
|--------|-----------|-------------|
| Essentiel (sans WhatsApp) | 5 devis, 8 relances, 4 résumés semaine | ~0,05€ |
| Pro (sans WhatsApp) | 15 devis, 20 relances, 8 résumés, plannings IA | ~0,12€ |
| Expert (WhatsApp modéré) | +50 messages WA, 5 min vocal | ~0,30€ |
| Expert (WhatsApp intensif) | +150 messages WA, 20 min vocal | ~0,65€ |

### Coût total réel par client (phase early, free tier)

| Situation | Coût total/mois |
|-----------|----------------|
| Sans WhatsApp, free tier | 0,05 à 0,15€ |
| Avec WhatsApp modéré, free tier | ~0,30€ |
| Avec WhatsApp intensif, free tier | ~0,70€ |
| Worst case (Supabase Pro + Resend payant + WA intensif) | ~45€ |

---

## 12. Pricing — modèle commercial

> Le détail complet (calcul token, quotas, marge, matrice de décision, arguments de vente, cockpit usage) est dans [STRATEGIE-COMMERCIALE.md](STRATEGIE-COMMERCIALE.md).

### Principe fondamental

Atelier n'est pas du SaaS classique. L'app est déployée par client (1 Supabase, 1 Worker). Le modèle tarifaire repose sur deux leviers distincts :

1. **Le setup one-shot** — prestation de service qui livre l'ERP BTP complet sur l'infrastructure propre du client. L'app est livrée entière, toutes fonctionnalités accessibles.
2. **Le MRR sur les modules IA** — abonnement d'usage. Toutes les fonctionnalités IA sont accessibles à tous les tiers. Ce qui change, c'est le quota mensuel. Le MRR n'est pas obligatoire.

Pas de gating fonctionnel dans le code. Le seul gating est sur les modules IA via `organization_modules`, cockpit Orsayn, sans redéploiement.

### Ancrage de valeur

Ne pas comparer au coût de déploiement. Comparer à ce que le client paierait autrement : Batigest (150-300€/mois, lourd, sans IA), Sellsy (99-199€/mois, généraliste), assistante mi-temps (700-900€/mois). Atelier se positionne au-dessus de Sellsy.

### Setup one-shot

| Configuration | Sans MRR | Avec MRR |
|--------------|----------|---------|
| App seule | 1 500€ | 800€ |
| App + WhatsApp agent | 2 200€ | 1 200€ |
| App + B2Brouter | 1 900€ | 1 000€ |
| App + WhatsApp + B2Brouter | 2 800€ | 1 500€ |

### MRR — modules IA (avec quotas)

Toutes les fonctionnalités IA sont accessibles à tous les tiers. L'agent WhatsApp est réservé Pro et Expert.

| Tier | Prix HT/mois | Agent WA | Quota mensuel clé |
|------|-------------|----------|-------------------|
| IA Starter | 39€ | Non | 20 relances + 10 analyses devis + 20 échanges assistant |
| IA Pro | 69€ | Oui (limité) | 40 relances + 30 analyses + 50 échanges + 80 msg WA + 8 min vocal |
| IA Expert | 99€ | Oui (proactif inclus) | Tout illimité + 300 msg WA + 25 min vocal |
| IA Expert + B2Brouter | 179€ | Oui (proactif inclus) | Tout Expert + B2Brouter |

### B2Brouter — facturation annuelle séparée

B2Brouter n'est pas dans le MRR mensuel : il est facturé annuellement selon le profil d'usage du client (volume de factures émises et reçues). Le coût Orsayn côté B2Brouter est ~40€ HT/mois par client actif.

| Mode | Description | Facturation |
|------|-------------|------------|
| Export only (défaut) | PDF + XML Factur-X, dépôt manuel | 0€ |
| B2Brouter activé | Transmission automatique, statuts intégrés | Facturé annuellement selon profil |

### Upgrades et options

| Option | Tarif |
|--------|-------|
| B2Brouter activé (sur MRR existant) | Devis annuel selon volume |
| Messages WA au-delà quota Expert | +0,50€ / tranche 50 msg |
| Essai IA Expert offert | 0€ — 30 jours |
| Migration depuis ancien logiciel | Sur devis (150€/h) |
| Formation / accompagnement | 150€/h ou forfait 3h = 350€ |

### Logique tarifaire

- Le coût IA réel est infime (0,08€ à 0,79€/mois selon le tier) — la marge est >99% sur tous les tiers hors infra worst case.
- Les quotas servent à segmenter la valeur, pas à protéger la marge. Un client qui dépasse son quota est un signal d'upgrade, pas un problème de coût.
- Le cockpit Orsayn affiche, par client, l'usage vs quota en temps réel, la marge réelle, et propose l'upgrade en un clic.

---

## 13. Concurrents et positionnement

| Concurrent | Prix | Ce qu'ils font | Ce qu'Atelier fait de plus |
|-----------|------|---------------|--------------------------|
| Batappli | 79-199€/mois | Devis, factures, chantiers basiques | WhatsApp agent, rentabilité granulaire, IA intégrée |
| Obat | 59-149€/mois | Devis, factures, planning simple | Idem + mémoire entreprise, formulaire public |
| Sellsy | 99-199€/mois | CRM + facturation généraliste | Spécialisé BTP, modules chantier, agent WA |
| Batigest | 150-300€/mois | ERP BTP complet, lourd | Légèreté, mobile-first, prix, IA |
| Excel/Word | 0€ | Rien d'automatique | Tout |

**Territoire : entre Obat (trop simple) et Batigest (trop lourd).** Atelier est le seul outil mobile-first avec un agent WhatsApp qui travaille à la place de l'artisan.

### Grille de différenciation détaillée

| Critère | Atelier | Obat | Batappli | Batigest |
|---------|---------|------|----------|----------|
| Mobile-first | Oui | Partiel | Non | Non |
| Agent WhatsApp | Oui | Non | Non | Non |
| Rentabilité chantier en temps réel | Oui | Non | Partiel | Oui |
| IA intégrée (devis, tâches, planning) | Oui | Non | Non | Non |
| Tarification dimensionnelle | Oui | Non | Oui | Oui |
| Formulaire public devis | Oui | Non | Non | Non |
| Mémoire entreprise (RAG) | Oui | Non | Non | Non |
| Pointage membre sans app | Oui (magic link) | Non | Non | Non |
| Facturation électronique | Prêt (sept. 2026) | En cours | Partiel | Oui |
| Prix d'entrée | 59€ | 59€ | 79€ | 150€ |

---

## 14. Arguments commerciaux clés

**Pour l'outreach et les ads — par angle d'attaque**

### Angle temps
> "Tes devis te prennent 2h. Avec Atelier, 10 minutes."
> "Tes relances partent toutes seules. Tu ne rates plus un paiement."

### Angle argent
> "Tu sais enfin si tes chantiers sont rentables — avant d'avoir tout payé."
> "Un client qui te paye en retard coûte cher. Atelier relance à ta place."

### Angle WhatsApp
> "Tu gères déjà tout depuis WhatsApp. Autant que ça soit intelligent."
> "Depuis le chantier : 'pointe 4h sur Martin et envoie la facture'. C'est fait."

### Angle conformité 2026
> "La facturation électronique devient obligatoire en septembre 2026. Atelier est déjà prêt."

### Angle équipe
> "Ton ouvrier pointe ses heures depuis WhatsApp. Tu vois tout en temps réel."

### Angle identité professionnelle
> "Tes clients reçoivent un PDF avec ton logo, ta signature, tes CGV. Comme si tu avais une assistante."
> "Tu fais du bon travail. Tes documents devraient le montrer."

### Angle peur de rater
> "Septembre 2026, facturation électronique obligatoire. Ceux qui ne sont pas prêts vont galérer."
> "Ce chantier t'a rapporté quoi, exactement ? Tu le sais ?"

---

## 15. Ce qui vient ensuite (roadmap connue)

### Agent WhatsApp — prochaines fonctions prioritaires (voir scope-agent-whatsapp-evolution.md)

L'agent s'appelle **Mathieu**. C'est l'assistant de chantier de l'artisan — proactif, terrain, disponible 24h/24 sur WhatsApp. Les phases suivantes sont en cours de spécification :

- **Phase 1** — Mémoire conversationnelle (session par numéro, 5 derniers tours)
- **Phase 2** — Membres d'équipe et pointage par procuration (`get_team_members`, `add_pointage_for_member`)
- **Phase 3** — Tâches chantier (lecture, création, changement de statut)
- **Phase 4** — Rapport chantier envoyé en PDF sur WhatsApp directement au client
- **Phase 5** — OCR documents reçus (factures fournisseurs, tickets — Gemini multimodal)
- **Phase 6** — Création chantier et client en conversation guidée
- **Phase 7** — Agent proactif (brief matin, alerte marge, devis expirants, récap hebdo)
- **Phase 8** — Situations de travaux depuis WhatsApp

### App
- PV de réception / DOE (promotion immobilière)
- Multi-organisations (holding, groupement d'artisans)
- Intégration comptable directe (Pennylane, Indy)
- Période d'essai automatisée (onboarding sans intervention manuelle)
- Application mobile native (App Store / Google Play)
