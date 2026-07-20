export interface MetierData {
  slug: string;
  metier: string;
  /** Libellé métier en français naturel, utilisé dans le message WhatsApp ("je suis …"). */
  whatsapp: string;
  hero: {
    headline: string;
    subheadline: string;
  };
  heroMockup: {
    primaryMetric: {
      label: string;
      status: string;
      value: string;
      target: string;
      progress: string;
      detail: string;
    };
    highlight: {
      badge: string;
      label: string;
      reference: string;
      detail: string;
    };
    latest: {
      label: string;
      time: string;
      reference: string;
      detail: string;
      amount: string;
    };
  };
  problems: {
    title: string;
    items: string[];
  };
  features: {
    title: string;
    items: {
      titre: string;
      description: string;
    }[];
  };
  faq: {
    question: string;
    answer: string;
  }[];
  cta: {
    headline: string;
    subline: string;
  };
  seo: {
    title: string;
    description: string;
  };
  /** Précision affichée sous les formules d'abonnement, propre à certains métiers (ex: module prix matières métal). Absent = rien d'affiché. */
  pricingNote?: string;
}

export const metiers: MetierData[] = [
  {
    slug: "electricien",
    metier: "Électricien",
    whatsapp: "électricien",
    hero: {
      headline: "Devis envoyé avant de quitter le client.",
      subheadline:
        "TVA rénovation automatique, marge chantier en temps réel. Depuis votre téléphone, sans formation.",
    },
    heroMockup: {
      primaryMetric: {
        label: "Marge chantier élec",
        status: "En cours",
        value: "31%",
        target: "Budget cible : 27%",
        progress: "31%",
        detail: "Tableau + prises : CA facturé vs heures et matériel",
      },
      highlight: {
        badge: "Ce matin",
        label: "Relance automatique",
        reference: "FAC-2026-041 · Mme Bernard",
        detail: "1 940€ encaissés sur rénovation électrique",
      },
      latest: {
        label: "Dernier devis",
        time: "Il y a 5 min",
        reference: "DEV-2026-112",
        detail: "Tableau + 12 prises envoyé depuis le chantier",
        amount: "3 780€",
      },
    },
    problems: {
      title: "Ce que vous vivez chaque semaine",
      items: [
        "Votre devis part 48h après la visite. Le client a déjà signé ailleurs.",
        "Vous avez des factures en retard que vous n'avez pas relancées depuis des semaines.",
        "Vous recalculez vos tarifs à la main à chaque fois que vos prix catalogue changent.",
        "Vous terminez un chantier sans savoir exactement ce qu'il vous a rapporté, heures et matériel déduits.",
      ],
    },
    features: {
      title: "Ce qu'Atelier change pour vous",
      items: [
        {
          titre: "Devis électricité en 5 minutes depuis le terrain",
          description:
            "Votre catalogue est configuré avec vos tarifs et la TVA correcte (10% rénovation, 20% neuf). Vous sélectionnez vos prestations, ajustez les quantités, envoyez. Avant de quitter le client.",
        },
        {
          titre: "Relances automatiques sur vos impayés",
          description:
            "Chaque matin, Atelier identifie vos devis sans réponse et vos factures en retard. Les relances partent par email. Vous encaissez sans jamais passer un appel gênant.",
        },
        {
          titre: "Marge chantier visible pendant les travaux",
          description:
            "Heures pointées, matériel acheté, déplacements : Atelier calcule votre marge réelle sur chaque chantier. Vous savez si vous gagnez de l'argent avant la facture de solde.",
        },
      ],
    },
    faq: [
      {
        question: "Atelier gère les taux de TVA en électricité (10% rénovation, 20% neuf) ?",
        answer:
          "Oui. Vous configurez le taux par prestation dans votre catalogue : 10% pour les travaux de rénovation, 5,5% pour les travaux d'amélioration énergétique, 20% pour le neuf. Le devis applique automatiquement le bon taux sans que vous ayez à y penser.",
      },
      {
        question: "Mes ouvriers peuvent pointer leurs heures depuis le chantier ?",
        answer:
          "Oui. Chaque membre de votre équipe reçoit un lien personnel. Il clique, il voit ses chantiers du jour, il pointe ses heures. Sans télécharger d'application, sans compte à créer.",
      },
      {
        question: "Comment fonctionne le formulaire public de demande de devis ?",
        answer:
          "Vous obtenez une page partageable : sur vos réseaux, votre carte de visite, votre site. Le client décrit son besoin d'installation ou de rénovation électrique, vous recevez une notification. Zéro appel manqué.",
      },
      {
        question: "Je peux voir ma rentabilité chantier avant la fin du chantier ?",
        answer:
          "Oui. C'est la fonctionnalité que Tolteck et Obat n'ont pas. Atelier croise vos heures réelles, le coût des matériaux et vos dépenses terrain pour vous donner votre marge en temps réel. Pendant le chantier, pas à la fin.",
      },
      {
        question: "La facturation électronique Factur-X 2026 est gérée ?",
        answer:
          "Oui. Atelier génère nativement vos factures au format Factur-X requis par la réforme obligatoire de septembre 2026. Vous êtes en conformité aujourd'hui sans rien changer à votre façon de travailler.",
      },
      {
        question: "Quel est le délai pour être opérationnel ?",
        answer:
          "48 heures en moyenne. Un appel de démarrage avec Samuel, votre environnement est installé avec votre catalogue électricité et vos tarifs. Vous prenez la main le lendemain.",
      },
    ],
    cta: {
      headline: "Opérationnel en 48h. Sans formation.",
      subline: "Un appel de démarrage, on configure votre instance. Vous prenez la main.",
    },
    seo: {
      title: "Logiciel devis électricien | Gestion chantier et rentabilité - Atelier",
      description:
        "Créez vos devis d'électricité depuis le terrain en 5 minutes, TVA rénovation automatique, relances impayés et marge chantier en temps réel. Opérationnel en 48h.",
    },
  },
  {
    slug: "plombier",
    metier: "Plombier / CVC",
    whatsapp: "plombier-chauffagiste",
    hero: {
      headline: "Devis PAC depuis le camion. Contrats facturés seuls.",
      subheadline:
        "Devis dépannage en 2 minutes, maintenances PAC facturées automatiquement, marge chantier CVC visible en temps réel.",
    },
    heroMockup: {
      primaryMetric: {
        label: "Marge chantier CVC",
        status: "Pose PAC",
        value: "26%",
        target: "Budget cible : 24%",
        progress: "26%",
        detail: "PAC air/eau : heures techniciens + fourniture + déplacement",
      },
      highlight: {
        badge: "Aujourd'hui",
        label: "Facture maintenance",
        reference: "CTR-PAC-018 · Copropriété Valmont",
        detail: "840€ facturés automatiquement sur contrat annuel",
      },
      latest: {
        label: "Devis dépannage",
        time: "Il y a 7 min",
        reference: "DEV-2026-074",
        detail: "Remplacement ballon envoyé depuis le camion",
        amount: "1 280€",
      },
    },
    problems: {
      title: "Ce que vous vivez chaque semaine",
      items: [
        "Vous finissez une intervention et le devis PAC part le lendemain : le client a déjà demandé un autre devis.",
        "Vous avez oublié de facturer un contrat de maintenance chaudière ce mois-ci.",
        "Vous ne savez jamais exactement ce qu'un chantier CVC vous a rapporté une fois le matériel déduit.",
        "Vos techniciens vous envoient leurs heures par SMS : vous consolidez ça le soir.",
      ],
    },
    features: {
      title: "Ce qu'Atelier change pour vous",
      items: [
        {
          titre: "Devis dépannage et installation sur place",
          description:
            "Votre catalogue plomberie et CVC est configuré avec vos forfaits de déplacement, vos tarifs PAC et vos prestations types. Vous créez et envoyez depuis votre téléphone, dans le camion. Le client reçoit un PDF professionnel en quelques minutes.",
        },
        {
          titre: "Contrats d'entretien facturés automatiquement",
          description:
            "Vos contrats de maintenance PAC, chaudière, climatisation sont configurés une fois. Les factures récurrentes partent automatiquement à vos clients à la date définie. Vous n'y pensez plus.",
        },
        {
          titre: "Marge chantier CVC visible pendant les travaux",
          description:
            "Vos techniciens pointent leurs heures via un simple lien. Atelier croise les heures réelles, le coût des matériaux et vos dépenses terrain : vous voyez votre marge en direct. Pas à la fin.",
        },
      ],
    },
    faq: [
      {
        question: "Atelier gère les devis de dépannage rapide en moins de 2 minutes ?",
        answer:
          "Oui. Votre catalogue contient vos forfaits de déplacement, vos tarifs horaires et vos prestations types dépannage. Vous créez un devis en moins de 2 minutes, vous l'envoyez par email depuis votre téléphone.",
      },
      {
        question: "Je peux suivre mes contrats de maintenance PAC et climatisation ?",
        answer:
          "Oui. Atelier génère automatiquement les factures récurrentes pour vos contrats d'entretien PAC, chaudière, climatisation. Elles partent à la date que vous avez définie, sans aucune intervention de votre part. Le décret 2020-912 impose un entretien annuel : ne ratez plus une échéance.",
      },
      {
        question: "La facturation électronique Factur-X 2026 est gérée ?",
        answer:
          "Oui. Atelier génère nativement vos factures au format Factur-X requis par la réforme obligatoire de septembre 2026. Particulièrement utile si vous travaillez avec des bailleurs sociaux ou des gestionnaires de copropriété.",
      },
      {
        question: "Je peux voir ma marge sur un chantier CVC avant qu'il soit terminé ?",
        answer:
          "Oui. C'est la différence principale avec Obat ou Batappli. Atelier croise vos heures réelles, le coût des matériaux et vos dépenses terrain pour vous donner votre marge pendant le chantier. Pas à la fin.",
      },
      {
        question: "Mes techniciens peuvent pointer leurs heures sur plusieurs interventions dans la journée ?",
        answer:
          "Oui. Depuis leur lien personnel, ils sélectionnent le chantier, ils pointent leurs heures d'arrivée et de départ. Vous voyez tout en temps réel depuis votre tableau de bord sans passer d'appel.",
      },
      {
        question: "Quel est le délai pour être opérationnel ?",
        answer:
          "48 heures en moyenne. Un appel de démarrage avec Samuel, votre environnement est installé avec votre catalogue plomberie/CVC et vos tarifs. Vous prenez la main le lendemain.",
      },
    ],
    cta: {
      headline: "Opérationnel en 48h. Sans formation.",
      subline: "Un appel de démarrage, on configure votre instance. Vous prenez la main.",
    },
    seo: {
      title: "Logiciel devis plombier chauffagiste | Gestion chantier CVC - Atelier",
      description:
        "Devis dépannage en 2 minutes, contrats de maintenance PAC automatiques, marge chantier en temps réel. Conçu pour les plombiers et chauffagistes. Opérationnel en 48h.",
    },
  },
  {
    slug: "menuisier",
    metier: "Menuisier",
    whatsapp: "menuisier",
    hero: {
      headline: "Fenêtres, portes, escaliers chiffrés en 2 minutes.",
      subheadline:
        "Catalogue au m² avec variantes matière, MaPrimeRénov automatique, marge réelle par ouvrage.",
    },
    heroMockup: {
      primaryMetric: {
        label: "Marge ouvrage",
        status: "Pose en cours",
        value: "34%",
        target: "Budget cible : 30%",
        progress: "34%",
        detail: "Fenêtres PVC : pose + quincaillerie + finitions",
      },
      highlight: {
        badge: "Validé",
        label: "Aide affichée",
        reference: "MaPrimeRénov · Dossier MARTIN",
        detail: "1 200€ déduits du reste à charge client",
      },
      latest: {
        label: "Dernier devis",
        time: "Il y a 3 min",
        reference: "DEV-2026-098",
        detail: "Variante chêne / MDF laqué prête à signer",
        amount: "6 740€",
      },
    },
    problems: {
      title: "Ce que vous vivez chaque semaine",
      items: [
        "Un devis avec variantes chêne / MDF laqué vous prend 2h : vous le refaites souvent de zéro.",
        "Vous perdez des chantiers parce que votre devis pose de fenêtres PVC part 3 jours après la visite.",
        "Vous ne savez plus où en sont vos compagnons sur les différents chantiers de pose.",
        "Vous ne savez pas si un ouvrage sur-mesure est rentable avant d'avoir tout payé.",
      ],
    },
    features: {
      title: "Ce qu'Atelier change pour vous",
      items: [
        {
          titre: "Devis au m² avec variantes matière en 2 minutes",
          description:
            "Votre catalogue intègre vos essences de bois, vos finitions et vos quincailleries. Une ligne dans le devis, plusieurs options matière : le client choisit, le prix se met à jour. TVA 10% pose rénovation appliquée automatiquement.",
        },
        {
          titre: "Jalons de pose avec planning équipe",
          description:
            "Atelier suggère les jalons selon le type de chantier : dépose, saignées, pose, finitions, livraison. Vous les assignez à vos compagnons et suivez l'avancement en temps réel depuis votre téléphone.",
        },
        {
          titre: "Rapport chantier PDF avec photos à la livraison",
          description:
            "Atelier compile vos photos de chantier dans un rapport PDF professionnel. Vous l'envoyez au client en un clic à la livraison. Un document propre qui reflète la qualité de votre travail.",
        },
      ],
    },
    faq: [
      {
        question: "Le catalogue gère la tarification au m², au ml et à la pièce ?",
        answer:
          "Oui. Atelier intègre nativement la tarification dimensionnelle : m², ml, m³, à la pièce. Vous entrez les dimensions dans le devis, le calcul se fait automatiquement selon vos tarifs catalogue. Plus de calculette.",
      },
      {
        question: "MaPrimeRénov s'affiche sur mes devis de pose de fenêtres ?",
        answer:
          "Oui. Pour les chantiers éligibles aux aides à la rénovation, Atelier affiche automatiquement le montant de l'aide MaPrimeRénov et le reste à charge client sur le PDF du devis. Ça lève les objections prix.",
      },
      {
        question: "Je peux gérer plusieurs chantiers de pose en même temps ?",
        answer:
          "Oui. Chaque chantier a sa propre vue avec ses tâches, ses jalons et son équipe assignée. Vous voyez l'avancement de chaque chantier depuis votre tableau de bord.",
      },
      {
        question: "Je peux voir la marge réelle d'un chantier menuiserie avant qu'il soit livré ?",
        answer:
          "Oui. C'est la fonctionnalité que Boby et Obat n'ont pas. Atelier croise vos heures pointées, vos achats de matériaux et vos dépenses terrain pour vous donner votre marge réelle pendant le chantier.",
      },
      {
        question: "La facturation électronique Factur-X 2026 est gérée ?",
        answer:
          "Oui. Vos factures sont générées nativement au format Factur-X requis par la réforme obligatoire de septembre 2026. Vous êtes en conformité sans rien changer.",
      },
      {
        question: "Quel est le délai pour être opérationnel ?",
        answer:
          "48 heures en moyenne. Un appel de démarrage avec Samuel, votre environnement est installé avec votre catalogue menuiserie et vos tarifs. Vous prenez la main le lendemain.",
      },
    ],
    cta: {
      headline: "Opérationnel en 48h. Sans formation.",
      subline: "Un appel de démarrage, on configure votre instance. Vous prenez la main.",
    },
    seo: {
      title: "Logiciel devis menuisier | Devis m², pose et gestion chantier - Atelier",
      description:
        "Devis menuiserie avec variantes matière en 2 minutes, MaPrimeRénov automatique, suivi de pose et marge chantier en temps réel. Conçu pour les menuisiers. Opérationnel en 48h.",
    },
  },
  {
    slug: "peintre",
    metier: "Peintre / Plâtrier",
    whatsapp: "peintre en bâtiment",
    hero: {
      headline: "Devis m² envoyé le soir de la visite.",
      subheadline:
        "Surfaces calculées sur place, MaPrimeRénov affiché, relances impayées automatiques. Avant que le concurrent envoie le sien.",
    },
    heroMockup: {
      primaryMetric: {
        label: "Marge surfaces",
        status: "Appartement T3",
        value: "29%",
        target: "Budget cible : 26%",
        progress: "29%",
        detail: "Peinture murs/plafonds : m² calculés + matières",
      },
      highlight: {
        badge: "Ce matin",
        label: "Relance automatique",
        reference: "FAC-2026-027 · M. Lefèvre",
        detail: "1 680€ encaissés sur solde de chantier",
      },
      latest: {
        label: "Devis au m²",
        time: "Il y a 6 min",
        reference: "DEV-2026-121",
        detail: "72 m² murs + plafonds, TVA rénovation appliquée",
        amount: "2 960€",
      },
    },
    problems: {
      title: "Ce que vous vivez chaque semaine",
      items: [
        "Vous faites la visite, vous calculez les surfaces chez vous le soir : le devis part le lendemain, parfois plus tard.",
        "Vous avez perdu des chantiers parce qu'un concurrent a envoyé son devis avant vous.",
        "La TVA 10% rénovation, vous l'appliquez à l'œil. Et vous n'êtes pas toujours sûr d'avoir le bon taux.",
        "Vous avez des factures en retard que vous n'avez pas relancées depuis des semaines.",
      ],
    },
    features: {
      title: "Ce qu'Atelier change pour vous",
      items: [
        {
          titre: "Devis au m² depuis votre téléphone",
          description:
            "Votre catalogue peinture et plâtrerie est configuré avec vos tarifs au m². Vous entrez les surfaces sur place, le devis se calcule automatiquement. TVA 10% rénovation ou 5,5% pour les travaux éligibles, appliquée sans y penser.",
        },
        {
          titre: "MaPrimeRénov et CEE sur vos devis",
          description:
            "Pour les chantiers ITE ou isolation éligibles, Atelier affiche automatiquement le montant de l'aide et le reste à charge client sur le PDF. Vos clients voient ce qu'ils paient vraiment. Ça lève les objections prix.",
        },
        {
          titre: "Relances automatiques chaque matin",
          description:
            "Atelier identifie vos devis sans réponse et vos factures en retard. Les relances partent automatiquement par email. Vous récupérez des paiements sans passer un seul appel.",
        },
      ],
    },
    faq: [
      {
        question: "Atelier applique automatiquement la TVA 10% pour les travaux de peinture en rénovation ?",
        answer:
          "Oui. Vous configurez le taux par prestation dans votre catalogue : 10% pour les travaux de rénovation, 5,5% pour les travaux d'amélioration énergétique (isolation), 20% pour le neuf. Le devis applique le bon taux sans que vous ayez à vérifier.",
      },
      {
        question: "Je peux créer des modèles de devis réutilisables pour la peinture et la plâtrerie ?",
        answer:
          "Oui. Vous créez des prestations types : réfection peinture appartement, enduit plâtre murs, isolation ITE. Avec vos lignes pré-remplies. Vous dupliquez et ajustez pour chaque client. Plus besoin de repartir de zéro.",
      },
      {
        question: "Atelier calcule automatiquement les surfaces ?",
        answer:
          "Vous entrez les dimensions : longueur, largeur, hauteur si besoin. Atelier calcule le m² de peinture ou d'enduit selon la prestation. Plus de calculette, plus d'erreurs de calcul.",
      },
      {
        question: "Je vois ma marge réelle sur chaque chantier ?",
        answer:
          "Oui. Atelier croise vos heures pointées et vos dépenses matières pour vous donner votre marge pendant le chantier. Si vous dépassez votre budget cible, vous êtes alerté immédiatement.",
      },
      {
        question: "La facturation électronique Factur-X 2026 est gérée ?",
        answer:
          "Oui. Atelier génère nativement vos factures au format Factur-X requis par la réforme obligatoire de septembre 2026. Vous êtes en conformité aujourd'hui sans rien changer.",
      },
      {
        question: "Mes clients peuvent signer le devis en ligne ?",
        answer:
          "Oui. Chaque devis contient un lien de signature électronique. Votre client reçoit le PDF par email, il signe depuis son téléphone. Vous êtes notifié en temps réel.",
      },
    ],
    cta: {
      headline: "Opérationnel en 48h. Sans formation.",
      subline: "Un appel de démarrage, on configure votre instance. Vous prenez la main.",
    },
    seo: {
      title: "Logiciel devis peintre bâtiment | Devis m², TVA auto et relances - Atelier",
      description:
        "Créez vos devis peinture au m² depuis le terrain, TVA 10% rénovation automatique, MaPrimeRénov et relances impayés. Conçu pour les peintres et plâtriers. Opérationnel en 48h.",
    },
  },
  {
    slug: "tolier",
    metier: "Tôlier / Métallier",
    whatsapp: "métallier",
    hero: {
      headline: "Le cours de l'aluminium a bougé. Votre devis, aussi ?",
      subheadline:
        "Alu, cuivre, inox : le prix bouge entre le devis et la commande, et c'est votre marge qui trinque.\nAtelier recalcule vos lignes matière avec votre coefficient fournisseur, la marge affichée reste juste avant l'envoi.",
    },
    heroMockup: {
      primaryMetric: {
        label: "Marge garde-corps",
        status: "Atelier",
        value: "23%",
        target: "Budget cible : 22%",
        progress: "23%",
        detail: "Acier + thermolaquage + heures atelier et pose",
      },
      highlight: {
        badge: "Alu +4,2%",
        label: "Prix matière suivi",
        reference: "Aluminium · cours du jour",
        detail: "Catalogue au ml recalculé avant l'envoi du devis",
      },
      latest: {
        label: "Devis B2B",
        time: "Il y a 9 min",
        reference: "DEV-2026-056",
        detail: "Garde-corps 18 ml avec option inox brossé",
        amount: "8 920€",
      },
    },
    problems: {
      title: "Ce que vous vivez chaque semaine",
      items: [
        "Un devis garde-corps avec variantes de finition vous prend 2h, parfois plus.",
        "Le prix de l'alu, du cuivre, du zinc ou de l'inox bouge et vous recalculez tout à la main à chaque devis.",
        "Vous ne savez pas toujours si un ouvrage sur-mesure est rentable avant d'avoir tout payé.",
        "Vos clients B2B vous demandent des devis précis rapidement : vous n'avez pas toujours le temps.",
      ],
    },
    features: {
      title: "Ce qu'Atelier change pour vous",
      items: [
        {
          titre: "Catalogue dimensionnel au ml et au m²",
          description:
            "Votre catalogue intègre vos tarifs au mètre linéaire et au mètre carré. Vous entrez les dimensions dans le devis, le calcul se fait seul. Vous changez le prix matière une fois dans le catalogue : tous vos devis suivent.",
        },
        {
          titre: "Devis multi-lignes avec variantes de finition",
          description:
            "Garde-corps, portails, pergolas : vous créez des devis complexes avec plusieurs options de finition, de matière et de dimensions. Le client choisit, le prix s'ajuste automatiquement.",
        },
        {
          titre: "Marge réelle par ouvrage",
          description:
            "Atelier calcule votre marge sur chaque chantier : matières, heures passées en atelier et sur site, sous-traitance. Vous savez ce qu'un garde-corps sur-mesure vous rapporte vraiment.",
        },
        {
          titre: "Cours LME aluminium, cuivre et zinc dans vos devis",
          description:
            "Vous avez perdu une marge sur le dernier chantier parce que le cuivre avait pris 6% entre le devis et la commande. Atelier calcule automatiquement le prix de vos lignes matière avec les cours du jour, mis à jour toutes les 10 min, en appliquant votre coefficient fournisseur configuré une fois en paramètres. À la validation, le cours est figé sur le devis : traçabilité complète si un client conteste.",
        },
      ],
    },
    faq: [
      {
        question: "Le catalogue gère les prix à la tonne, au kg, au ml et au m² ?",
        answer:
          "Vous configurez vos unités librement : au kg, à la tonne, au ml, au m² ou à la pièce. Atelier s'adapte à votre façon de chiffrer, pas l'inverse.",
      },
      {
        question: "Je peux gérer des clients B2B avec des conditions tarifaires spécifiques ?",
        answer:
          "Oui. Vous créez des profils clients avec leurs conditions tarifaires. Quand vous créez un devis pour ce client, Atelier applique automatiquement ses tarifs spécifiques.",
      },
      {
        question: "Les situations de travaux sur chantiers longs sont gérées ?",
        answer:
          "Oui. Pour les chantiers longs, Atelier gère la facturation à l'avancement : vous entrez le pourcentage réalisé, le net à facturer se calcule automatiquement en déduisant les acomptes déjà encaissés.",
      },
      {
        question: "Je vois ma marge réelle avant que le chantier soit terminé ?",
        answer:
          "Oui. C'est la fonctionnalité qui distingue Atelier d'un simple logiciel de devis. Heures pointées en atelier et sur site, matières achetées, sous-traitance : tout est croisé pour vous donner votre marge pendant le chantier.",
      },
      {
        question: "La facturation électronique Factur-X 2026 est gérée ?",
        answer:
          "Oui. Particulièrement utile si vous travaillez avec des industriels ou des marchés publics. Atelier génère nativement le format Factur-X requis. Vous êtes en conformité sans rien changer.",
      },
      {
        question: "Quel est le délai pour être opérationnel ?",
        answer:
          "48 heures en moyenne. Un appel de démarrage avec Samuel, votre environnement est installé avec votre catalogue dimensionnel et vos conditions tarifaires. Vous prenez la main le lendemain.",
      },
    ],
    cta: {
      headline: "Opérationnel en 48h. Sans formation.",
      subline: "Un appel de démarrage, on configure votre instance. Vous prenez la main.",
    },
    seo: {
      title: "Logiciel devis métallier serrurier | Catalogue au ml/m² et rentabilité - Atelier",
      description:
        "Devis métallerie au ml et au m² calculés automatiquement, mise à jour prix acier en un clic, marge réelle par ouvrage. Conçu pour les tôliers et serruriers-métalliers. Opérationnel en 48h.",
    },
    pricingNote: "Suivi des prix matière (alu, cuivre, zinc) inclus à partir de la formule Pro.",
  },
  {
    slug: "paysagiste",
    metier: "Paysagiste",
    whatsapp: "paysagiste",
    hero: {
      headline: "Vos clients d'entretien facturés. Même quand vous êtes sur le terrain.",
      subheadline:
        "Factures récurrentes automatiques, devis de création au m² depuis le terrain, planning équipe multi-sites.",
    },
    heroMockup: {
      primaryMetric: {
        label: "Marge création",
        status: "Jardin privé",
        value: "32%",
        target: "Budget cible : 28%",
        progress: "32%",
        detail: "Gazon + clôture : végétaux, matériaux et main d'oeuvre",
      },
      highlight: {
        badge: "Mensuel",
        label: "Contrat facturé",
        reference: "ENT-2026-014 · Résidence Érables",
        detail: "1 150€ envoyés automatiquement pour l'entretien",
      },
      latest: {
        label: "Devis création",
        time: "Il y a 8 min",
        reference: "DEV-2026-083",
        detail: "48 m² gazon + 22 ml clôture depuis le terrain",
        amount: "5 430€",
      },
    },
    problems: {
      title: "Ce que vous vivez chaque semaine",
      items: [
        "Le lundi matin, organiser les équipes sur 4 ou 5 adresses c'est le chaos : WhatsApp dans tous les sens.",
        "Vous avez oublié de facturer un contrat d'entretien ce mois-ci parce qu'il était noyé dans le planning.",
        "Vos devis de création prennent du temps : m² de gazon, ml de clôture, m³ de terre végétale, tout calculé à la main.",
        "Vous ne savez pas si un chantier de création est rentable une fois la main d'oeuvre et les végétaux déduits.",
      ],
    },
    features: {
      title: "Ce qu'Atelier change pour vous",
      items: [
        {
          titre: "Factures récurrentes automatiques",
          description:
            "Vos contrats d'entretien sont configurés une fois. Les factures partent automatiquement chaque mois à vos clients, à la date que vous avez définie. TVA 10% entretien jardins privés appliquée correctement.",
        },
        {
          titre: "Planning de tournées multi-sites",
          description:
            "Chaque membre de votre équipe voit ses adresses du jour depuis son téléphone via un simple lien, sans télécharger d'application. Vous voyez en temps réel qui est où et l'avancement de chaque site.",
        },
        {
          titre: "Devis de création au m² et au ml",
          description:
            "Votre catalogue paysage intègre vos tarifs au m², au ml et au m³. Gazon, clôture, dallage, terre végétale : vous entrez les dimensions, le devis se calcule seul. Envoyé avant de quitter le client.",
        },
      ],
    },
    faq: [
      {
        question: "Atelier gère la TVA 10% pour l'entretien de jardins de particuliers ?",
        answer:
          "Oui. La TVA à taux réduit s'applique aux prestations d'entretien de jardins de particuliers. Vous configurez le taux dans votre catalogue une fois, il s'applique automatiquement sur tous les devis et factures correspondants.",
      },
      {
        question: "Mes agents peuvent pointer leurs heures sur plusieurs sites dans la journée ?",
        answer:
          "Oui. Depuis leur lien personnel, ils sélectionnent le site, ils pointent leurs heures d'arrivée et de départ. Vous voyez tout en temps réel sans passer d'appel.",
      },
      {
        question: "Atelier gère les devis saisonniers (tonte printemps, taille haies automne) ?",
        answer:
          "Oui. Vous créez des prestations types par saison. Vous les dupliquez d'une année sur l'autre en ajustant juste les tarifs. Plus besoin de repartir de zéro à chaque saison.",
      },
      {
        question: "Je peux suivre les dépenses de végétaux et matériaux par chantier ?",
        answer:
          "Oui. Vous enregistrez chaque achat sur le chantier correspondant : plants, graviers, mobilier urbain. Atelier calcule votre marge réelle en déduisant ces dépenses du chiffre d'affaires.",
      },
      {
        question: "La facturation électronique Factur-X 2026 est gérée ?",
        answer:
          "Oui. Vos factures récurrentes d'entretien et vos factures de chantier sont générées au format Factur-X requis par la réforme obligatoire de septembre 2026.",
      },
      {
        question: "Quel est le délai pour être opérationnel ?",
        answer:
          "48 heures en moyenne. Un appel de démarrage avec Samuel, votre environnement est installé avec votre catalogue paysage et vos contrats d'entretien. Vous prenez la main le lendemain.",
      },
    ],
    cta: {
      headline: "Opérationnel en 48h. Sans formation.",
      subline: "Un appel de démarrage, on configure votre instance. Vous prenez la main.",
    },
    seo: {
      title: "Logiciel devis paysagiste | Contrats entretien et gestion tournées - Atelier",
      description:
        "Factures récurrentes automatiques pour vos contrats d'entretien, planning tournées multi-sites et devis de création au m². Conçu pour les paysagistes. Opérationnel en 48h.",
    },
  },
  {
    slug: "macon",
    metier: "Maçon / Rénovation",
    whatsapp: "maçon",
    hero: {
      headline: "Sachez si vous gagnez sur chaque chantier.",
      subheadline:
        "Marge visible pendant les travaux, dépenses terrain centralisées, situations de travaux générées en un clic.",
    },
    heroMockup: {
      primaryMetric: {
        label: "Marge rénovation",
        status: "Phase 2/4",
        value: "21%",
        target: "Budget cible : 20%",
        progress: "21%",
        detail: "Heures + matériaux + sous-traitants consolidés",
      },
      highlight: {
        badge: "À facturer",
        label: "Situation travaux",
        reference: "SIT-2026-006 · Maison Moreau",
        detail: "12 400€ générés à 45% d'avancement",
      },
      latest: {
        label: "Dépense terrain",
        time: "Il y a 4 min",
        reference: "ACH-2026-219",
        detail: "Location mini-pelle rattachée au bon chantier",
        amount: "690€",
      },
    },
    problems: {
      title: "Ce que vous vivez chaque semaine",
      items: [
        "Vous êtes à court en cours de chantier parce qu'une facture de situation n'est pas partie à temps.",
        "Vous avez du mal à calculer ce qu'un chantier de 3 mois vous a vraiment coûté : matériaux, sous-traitants, heures.",
        "Vos dépenses terrain s'accumulent : location de matériel, livraisons, carburant. Et vous les ressaisissez le soir.",
        "Vous ne savez pas si un chantier est rentable avant d'avoir reçu toutes les factures fournisseurs.",
      ],
    },
    features: {
      title: "Ce qu'Atelier change pour vous",
      items: [
        {
          titre: "Situations de travaux à l'avancement",
          description:
            "Vous entrez le pourcentage d'avancement réalisé. Atelier calcule automatiquement le net à facturer en déduisant les acomptes et la retenue de garantie configurée. La facture de situation se génère et part au client.",
        },
        {
          titre: "Dépenses chantier depuis le terrain",
          description:
            "Vous photographiez vos tickets de caisse depuis votre téléphone. Atelier extrait automatiquement le montant, le fournisseur et la catégorie. Chaque dépense est rattachée au bon chantier en temps réel.",
        },
        {
          titre: "Rentabilité chantier avant la fin",
          description:
            "Atelier consolide heures pointées, matériaux, sous-traitants et dépenses diverses. Vous voyez votre marge réelle pendant le chantier. Si les coûts dépassent votre budget cible, vous êtes alerté.",
        },
      ],
    },
    faq: [
      {
        question: "Atelier gère les 3 taux de TVA pour la maçonnerie (5,5%, 10%, 20%) ?",
        answer:
          "Oui. Vous configurez le taux par prestation : 5,5% pour les travaux d'amélioration énergétique, 10% pour la rénovation de logements de plus de 2 ans, 20% pour la construction neuve. Atelier applique le bon taux automatiquement sur chaque ligne de devis.",
      },
      {
        question: "Atelier gère la retenue de garantie ?",
        answer:
          "Oui. Vous configurez le pourcentage de retenue de garantie par chantier. Atelier la déduit automatiquement de chaque situation de travaux et la libère en fin de chantier selon vos conditions.",
      },
      {
        question: "Je peux suivre mes sous-traitants et leurs factures ?",
        answer:
          "Oui. Chaque sous-traitant est enregistré comme fournisseur. Ses factures sont rattachées au chantier correspondant et intégrées dans le calcul de rentabilité.",
      },
      {
        question: "Je peux voir ma marge chantier avant d'avoir toutes les factures fournisseurs ?",
        answer:
          "Oui. Atelier consolide en temps réel vos heures pointées, les dépenses saisies depuis le terrain et les factures fournisseurs enregistrées. Vous avez une estimation fiable de votre marge à tout moment, sans attendre la clôture.",
      },
      {
        question: "MaPrimeRénov s'affiche sur mes devis de rénovation ?",
        answer:
          "Oui. Pour les chantiers éligibles (rénovation énergétique, isolation, fenêtres), Atelier affiche le montant de l'aide MaPrimeRénov ou CEE et le reste à charge client sur le PDF du devis.",
      },
      {
        question: "La facturation électronique Factur-X 2026 est gérée ?",
        answer:
          "Oui. Atelier génère nativement vos factures et situations de travaux au format Factur-X requis par la réforme obligatoire de septembre 2026. Vous êtes en conformité sans rien changer.",
      },
    ],
    cta: {
      headline: "Opérationnel en 48h. Sans formation.",
      subline: "Un appel de démarrage, on configure votre instance. Vous prenez la main.",
    },
    seo: {
      title: "Logiciel gestion chantier maçon | Situations de travaux et rentabilité - Atelier",
      description:
        "Facturez à l'avancement, TVA auto 5,5%/10%/20%, suivez vos dépenses terrain et calculez votre rentabilité chantier en temps réel. Conçu pour les maçons et entreprises de rénovation.",
    },
  },
  {
    slug: "couvreur",
    metier: "Couvreur / Zingueur",
    whatsapp: "couvreur-zingueur",
    hero: {
      headline: "Le devis toiture part avant que l'échafaudage soit replié.",
      subheadline:
        "Surfaces, pentes, zinguerie : vos prix au m² s'appliquent tout seuls. Acomptes encaissés, relances envoyées, marge suivie chantier par chantier. Depuis le toit, sur votre téléphone.",
    },
    heroMockup: {
      primaryMetric: {
        label: "Marge réfection toiture",
        status: "En cours",
        value: "26%",
        target: "Budget cible : 24%",
        progress: "26%",
        detail: "Tuiles + zinguerie : CA facturé vs heures, échafaudage et fournitures",
      },
      highlight: {
        badge: "Ce matin",
        label: "Acompte encaissé",
        reference: "FAC-2026-063 · M. Perrin",
        detail: "5 590€ encaissés sur réfection 90 m²",
      },
      latest: {
        label: "Dernier devis",
        time: "Il y a 12 min",
        reference: "DEV-2026-138",
        detail: "Réfection 90 m² + gouttières envoyé depuis le toit",
        amount: "18 640€",
      },
    },
    problems: {
      title: "Ce que vous vivez chaque semaine",
      items: [
        "Le client attend son devis toiture depuis une semaine parce qu'il faut tout remesurer, tout recalculer, tout remettre en page.",
        "Une fuite en urgence chamboule le planning, et l'intervention dépannage n'est jamais facturée au bon prix.",
        "Vous avancez l'échafaudage, les tuiles et le zinc, mais l'acompte n'est pas encaissé.",
        "Entre location d'échafaudage, heures de pose et fournitures, impossible de dire combien la toiture vous a vraiment rapporté.",
      ],
    },
    features: {
      title: "Ce qu'Atelier change pour vous",
      items: [
        {
          titre: "Devis toiture au m² depuis le terrain",
          description:
            "Couverture, zinguerie, isolation : vos ouvrages sont dans votre catalogue avec vos prix au m² et la bonne TVA. Vous saisissez la surface, ajustez, envoyez. Le client a son devis avant que vous soyez redescendu.",
        },
        {
          titre: "Acomptes et relances qui partent sans vous",
          description:
            "Facture d'acompte générée à la signature, relances automatiques sur les impayés et les devis sans réponse. Vous ne financez plus l'échafaudage et les tuiles sur votre trésorerie.",
        },
        {
          titre: "Marge réelle, échafaudage compris",
          description:
            "Heures pointées, fournitures, location de matériel, dépannages intercalés : Atelier croise tout et vous donne la marge réelle de chaque toiture, pendant le chantier. Pas six mois après.",
        },
      ],
    },
    faq: [
      {
        question: "Atelier gère les devis au m² avec mes propres prix ?",
        answer:
          "Oui. Votre catalogue est configuré avec vos ouvrages (couverture tuile, ardoise, bac acier, zinguerie, isolation) et vos prix au m² ou au mètre linéaire. Vous saisissez les quantités, le calcul et la mise en page sont faits.",
      },
      {
        question: "Comment sont facturées les interventions d'urgence ?",
        answer:
          "Vous créez la facture de dépannage en quelques minutes depuis le chantier, avec vos forfaits urgence pré-enregistrés. L'intervention est facturée le jour même, plus jamais oubliée dans un coin de carnet.",
      },
      {
        question: "Je peux facturer un acompte à la signature du devis ?",
        answer:
          "Oui. Le devis accepté génère la facture d'acompte au pourcentage que vous avez défini, avec le solde qui suit l'avancement. Vous n'avancez plus les fournitures sur votre trésorerie.",
      },
      {
        question: "Mes gars peuvent pointer leurs heures depuis le toit ?",
        answer:
          "Oui. Chaque compagnon reçoit un lien personnel : il voit ses chantiers du jour et pointe ses heures depuis son téléphone. Sans application à installer, sans compte à créer.",
      },
      {
        question: "La facturation électronique Factur-X 2026 est gérée ?",
        answer:
          "Oui. Atelier génère nativement vos factures au format Factur-X requis par la réforme obligatoire de septembre 2026. Vous êtes en conformité sans rien changer à votre façon de travailler.",
      },
      {
        question: "Quel est le délai pour être opérationnel ?",
        answer:
          "48 heures en moyenne. Un appel de démarrage avec Samuel, votre catalogue couverture et vos tarifs sont installés. Vous prenez la main le lendemain.",
      },
    ],
    cta: {
      headline: "Opérationnel en 48h. Sans formation.",
      subline: "Un appel de démarrage, on configure votre instance. Vous prenez la main.",
    },
    seo: {
      title: "Logiciel devis couvreur | Chiffrage toiture au m² et rentabilité - Atelier",
      description:
        "Créez vos devis de couverture au m² depuis le terrain, encaissez vos acomptes, relancez les impayés automatiquement et suivez la marge réelle de chaque toiture. Opérationnel en 48h.",
    },
  },
  {
    slug: "charpentier",
    metier: "Charpentier bois",
    whatsapp: "charpentier",
    hero: {
      headline: "Du plan de charpente au devis signé, sans repasser par le bureau.",
      subheadline:
        "Débits, coefficients matière et heures d'atelier chiffrés d'un coup. Acomptes, situations et marge fabrication + pose suivis en temps réel. Vous restez à l'établi, pas derrière un tableur.",
    },
    heroMockup: {
      primaryMetric: {
        label: "Marge charpente + pose",
        status: "Atelier",
        value: "24%",
        target: "Budget cible : 22%",
        progress: "24%",
        detail: "Fermettes + levage : CA facturé vs bois, heures atelier et pose",
      },
      highlight: {
        badge: "Cette semaine",
        label: "Situation validée",
        reference: "SIT-2026-018 · Maison Roche",
        detail: "12 400€ facturés à l'avancement sur extension bois",
      },
      latest: {
        label: "Dernier devis",
        time: "Il y a 20 min",
        reference: "DEV-2026-141",
        detail: "Charpente traditionnelle 110 m² envoyé depuis l'atelier",
        amount: "27 900€",
      },
    },
    problems: {
      title: "Ce que vous vivez chaque semaine",
      items: [
        "Le chiffrage d'une charpente prend une soirée entière : débits, coefficients, heures d'atelier, pose. Le client, lui, attend.",
        "Vous achetez le bois des semaines avant la pose, et la trésorerie encaisse le décalage.",
        "Sur un chantier long, les situations de travaux partent en retard ou pas du tout.",
        "Entre les heures d'atelier et les heures de pose, vous ne savez jamais ce qu'un ouvrage vous a vraiment rapporté.",
      ],
    },
    features: {
      title: "Ce qu'Atelier change pour vous",
      items: [
        {
          titre: "Chiffrage charpente avec vos coefficients",
          description:
            "Vos essences, vos sections, vos coefficients matière et vos temps d'atelier sont dans votre catalogue. Vous composez l'ouvrage, Atelier calcule, le devis part le soir même. Plus de soirées tableur.",
        },
        {
          titre: "Acomptes et situations à l'avancement",
          description:
            "Acompte à la commande pour couvrir le bois, situations intermédiaires sur les chantiers longs, relances automatiques sur les retards. Le décalage fournisseur ne pèse plus sur votre trésorerie.",
        },
        {
          titre: "Marge atelier et pose, séparées et en temps réel",
          description:
            "Heures d'atelier, heures de pose, bois, quincaillerie, levage : Atelier croise tout par ouvrage. Vous voyez où vous gagnez de l'argent, fabrication comprise, pendant le chantier.",
        },
      ],
    },
    faq: [
      {
        question: "Atelier peut chiffrer la fabrication et la pose séparément ?",
        answer:
          "Oui. Vous structurez vos devis comme vous travaillez : lots fabrication, lots pose, levage, fournitures. Chaque ligne porte vos temps et vos coûts, et la marge se calcule sur l'ensemble comme sur chaque lot.",
      },
      {
        question: "Je peux facturer à l'avancement sur un chantier de plusieurs mois ?",
        answer:
          "Oui. Atelier génère vos situations de travaux au pourcentage d'avancement, avec le récapitulatif de ce qui a déjà été facturé. Les chantiers longs ne creusent plus votre trésorerie.",
      },
      {
        question: "Mes achats de bois sont pris en compte dans la marge ?",
        answer:
          "Oui. Vous enregistrez vos achats et vos factures fournisseurs sur le chantier concerné. Atelier les déduit de la marge en temps réel, avec les heures d'atelier et de pose.",
      },
      {
        question: "L'équipe peut pointer atelier et chantier séparément ?",
        answer:
          "Oui. Chaque compagnon pointe ses heures sur l'ouvrage en cours, à l'atelier comme sur le chantier, depuis un simple lien sur son téléphone. Vous savez enfin où passent les heures.",
      },
      {
        question: "La facturation électronique Factur-X 2026 est gérée ?",
        answer:
          "Oui. Atelier génère nativement vos factures et situations au format Factur-X requis par la réforme obligatoire de septembre 2026. Vous êtes en conformité sans rien changer.",
      },
      {
        question: "Quel est le délai pour être opérationnel ?",
        answer:
          "48 heures en moyenne. Un appel de démarrage avec Samuel, votre catalogue charpente et vos coefficients sont installés. Vous prenez la main le lendemain.",
      },
    ],
    cta: {
      headline: "Opérationnel en 48h. Sans formation.",
      subline: "Un appel de démarrage, on configure votre instance. Vous prenez la main.",
    },
    seo: {
      title: "Logiciel devis charpentier | Chiffrage charpente bois et rentabilité - Atelier",
      description:
        "Chiffrez vos charpentes avec vos coefficients, facturez à l'avancement, suivez la marge atelier + pose en temps réel. Conçu pour les charpentiers bois. Opérationnel en 48h.",
    },
  },
  {
    slug: "carreleur",
    metier: "Carreleur / Mosaïste",
    whatsapp: "carreleur",
    hero: {
      headline: "Le devis au m² prêt avant de quitter la salle de bain.",
      subheadline:
        "Surfaces, formats, préparation des supports : vos prix de pose s'appliquent tout seuls. TVA rénovation automatique, relances sans y penser, marge visible pendant le chantier.",
    },
    heroMockup: {
      primaryMetric: {
        label: "Marge salle de bain",
        status: "En cours",
        value: "29%",
        target: "Budget cible : 26%",
        progress: "29%",
        detail: "60x60 + faïence : CA facturé vs heures, colle et carrelage",
      },
      highlight: {
        badge: "Ce matin",
        label: "Relance automatique",
        reference: "FAC-2026-052 · Mme Diallo",
        detail: "2 180€ encaissés sur pose séjour 42 m²",
      },
      latest: {
        label: "Dernier devis",
        time: "Il y a 8 min",
        reference: "DEV-2026-129",
        detail: "SDB complète : dépose, ragréage, pose 24 m² + plinthes",
        amount: "4 860€",
      },
    },
    problems: {
      title: "Ce que vous vivez chaque semaine",
      items: [
        "Le devis attend le soir : remesurer les surfaces, compter les découpes, la préparation du support, remettre tout au propre.",
        "Le client compare trois carreleurs. Le premier devis arrivé gagne, et ce n'est pas toujours le vôtre.",
        "Les chutes, la colle, le ragréage : des coûts réels que votre prix au m² ne reflète plus depuis longtemps.",
        "Vous finissez la pose sans savoir si le chantier vous a rapporté ou juste occupé.",
      ],
    },
    features: {
      title: "Ce qu'Atelier change pour vous",
      items: [
        {
          titre: "Devis de pose au m² en quelques minutes",
          description:
            "Pose droite, diagonale, grands formats, faïence, préparation des supports : vos ouvrages sont dans votre catalogue avec vos prix et la bonne TVA (10% rénovation, 20% neuf). Vous saisissez les surfaces, le devis part.",
        },
        {
          titre: "Relances automatiques, encaissements suivis",
          description:
            "Devis sans réponse et factures en retard sont relancés automatiquement, avec un ton adapté au client. Vous posez, Atelier encaisse.",
        },
        {
          titre: "Marge au chantier, fournitures comprises",
          description:
            "Heures de pose, colle, ragréage, carrelage acheté pour le client : Atelier déduit tout et affiche la marge réelle par chantier. Vous ajustez vos prix au m² sur des chiffres, pas au feeling.",
        },
      ],
    },
    faq: [
      {
        question: "Atelier applique la bonne TVA sur la rénovation ?",
        answer:
          "Oui. 10% pour la rénovation de plus de deux ans, 20% pour le neuf, ligne par ligne selon votre catalogue. Le devis applique le bon taux sans que vous ayez à y penser.",
      },
      {
        question: "Je peux inclure la fourniture du carrelage dans mes devis ?",
        answer:
          "Oui. Vous distinguez fourniture et pose sur le devis, avec vos coefficients sur la fourniture. Les achats passés pour le client sont rattachés au chantier et déduits de votre marge réelle.",
      },
      {
        question: "Comment je gère les travaux supplémentaires découverts en cours de pose ?",
        answer:
          "Un support plus abîmé que prévu, un ragréage imprévu : vous créez l'avenant en quelques minutes depuis le chantier, le client valide, la facture suit. Plus de travaux offerts faute de papier.",
      },
      {
        question: "Le formulaire public de demande de devis fonctionne comment ?",
        answer:
          "Vous obtenez une page partageable sur vos réseaux et votre carte de visite. Le client décrit sa pièce et ses surfaces, vous recevez la demande qualifiée. Zéro appel manqué.",
      },
      {
        question: "La facturation électronique Factur-X 2026 est gérée ?",
        answer:
          "Oui. Atelier génère nativement vos factures au format Factur-X requis par la réforme obligatoire de septembre 2026. Vous êtes en conformité sans rien changer à votre façon de travailler.",
      },
      {
        question: "Quel est le délai pour être opérationnel ?",
        answer:
          "48 heures en moyenne. Un appel de démarrage avec Samuel, votre catalogue de pose et vos tarifs sont installés. Vous prenez la main le lendemain.",
      },
    ],
    cta: {
      headline: "Opérationnel en 48h. Sans formation.",
      subline: "Un appel de démarrage, on configure votre instance. Vous prenez la main.",
    },
    seo: {
      title: "Logiciel devis carreleur | Chiffrage pose au m² et rentabilité - Atelier",
      description:
        "Créez vos devis de carrelage au m² depuis le chantier, TVA rénovation automatique, relances impayés et marge réelle fournitures comprises. Opérationnel en 48h.",
    },
  },
];

export function getMetierBySlug(slug: string): MetierData | undefined {
  return metiers.find((m) => m.slug === slug);
}
