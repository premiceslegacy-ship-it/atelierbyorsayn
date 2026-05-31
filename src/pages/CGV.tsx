import { Link } from "react-router-dom";

export default function CGV() {
  return (
    <div className="bg-[#050505] min-h-screen text-white">
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <Link to="/#footer" className="text-xs text-text-secondary hover:text-white transition-colors mb-10 inline-block">
          ← Retour
        </Link>
        <h1 className="font-display text-3xl md:text-4xl font-extrabold text-white mb-2 tracking-tight">
          Conditions Générales de Vente
        </h1>
        <p className="text-xs text-text-secondary mb-1">Version 1.0 — mai 2026</p>
        <p className="text-xs text-text-secondary/60 mb-10">
          Ces CGV s'appliquent à toutes les prestations réalisées par Orsayn (Samuel Mbeboura, entrepreneur individuel, SIRET 98920815200011) au bénéfice de ses clients professionnels. Elles prévalent sur tout document d'achat du client, sauf accord écrit contraire.
        </p>

        <div className="space-y-10 text-sm text-neutral-300 leading-relaxed">

          <Section title="Article 1 — Champ d'application">
            <p>Les présentes CGV régissent :</p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-neutral-400">
              <li>Les prestations de déploiement one-shot du logiciel Atelier (setup).</li>
              <li>Les abonnements mensuels aux modules IA (MRR).</li>
              <li>Les prestations annexes : facturation électronique B2Brouter, migration de données, formation, accompagnement.</li>
            </ul>
            <p className="mt-3">
              Elles sont communicables à tout client professionnel sur demande, conformément à l'article L.441-1 IV du Code de commerce.
            </p>
          </Section>

          <Section title="Article 2 — Prestataire">
            <p>
              Samuel Mbeboura<br />
              Entrepreneur individuel exerçant sous le nom commercial <strong className="text-white">Orsayn</strong><br />
              1 rue des héraults<br />
              SIRET 98920815200011<br />
              <a href="mailto:contact@orsayn.fr" className="text-accent hover:underline">contact@orsayn.fr</a>
            </p>
            <p className="mt-3">
              TVA non applicable — régime de franchise en base, article 293 B du CGI. Cette mention figure sur chaque facture émise par Orsayn.
            </p>
          </Section>

          <Section title="Article 3 — Description des prestations">
            <SubSection title="3.1 Setup one-shot">
              <p>
                Prestation de déploiement de l'application Atelier incluant : création et configuration de l'instance Supabase (base de données, authentification, stockage), déploiement sur Cloudflare Workers, configuration du domaine et des emails transactionnels, exécution des migrations SQL, initialisation du profil entreprise et du catalogue, onboarding du compte propriétaire, tests de mise en service, et 30 jours de support au démarrage.
              </p>
              <p className="mt-2">Le setup est une prestation de service unique, non un transfert de propriété du code source.</p>
            </SubSection>
            <SubSection title="3.2 Abonnement MRR — modules IA">
              <p>
                Abonnement mensuel donnant accès aux modules d'intelligence artificielle de l'application selon le tier souscrit (Starter 39 € HT/mois, Pro 69 € HT/mois, Expert 119 € HT/mois). Les fonctionnalités non-IA de l'application (devis, factures, chantiers, catalogue, exports, signatures) fonctionnent sans abonnement MRR.
              </p>
            </SubSection>
            <SubSection title="3.3 Prestations annexes">
              <ul className="list-disc list-inside space-y-1 text-neutral-400">
                <li>Conformité facturation électronique (connexion au réseau légal via partenaire PDP) : 450 € HT/an la 1ère année, puis à partir de 250 € HT/an dès la 2e année selon le volume d'activité.</li>
                <li>Migration depuis un ancien logiciel : sur devis, 150 € HT/heure.</li>
                <li>Formation et accompagnement : 150 € HT/heure ou forfait 3 heures à 350 € HT.</li>
              </ul>
            </SubSection>
          </Section>

          <Section title="Article 4 — Tarifs">
            <p className="mb-4">
              Les tarifs sont exprimés hors taxes (HT). Orsayn étant en franchise de TVA (article 293 B du CGI), aucune TVA n'est collectée ni facturée à la date des présentes.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-2 pr-4 text-text-secondary font-medium">Prestation</th>
                    <th className="text-right py-2 text-text-secondary font-medium">Tarif HT</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {[
                    ["Setup — app seule (sans abonnement IA)", "2 000 € HT"],
                    ["Setup — app seule (avec abonnement IA)", "800 € HT"],
                    ["Setup — app + conformité facturation électronique (sans abonnement IA)", "2 450 € HT"],
                    ["Setup — app + conformité facturation électronique (avec abonnement IA)", "1 250 € HT"],
                    ["MRR IA Starter", "39 € HT/mois"],
                    ["MRR IA Pro", "69 € HT/mois"],
                    ["MRR IA Expert", "119 € HT/mois"],
                    ["Conformité facturation électronique (PDP partenaire)", "450 € HT/an la 1ère année, puis à partir de 250 € HT/an dès la 2e année selon volume"],
                    ["Migration données", "150 € HT/heure"],
                    ["Formation / accompagnement", "150 € HT/heure — forfait 3h : 350 € HT"],
                  ].map(([label, price]) => (
                    <tr key={label}>
                      <td className="py-2.5 pr-4 text-neutral-300">{label}</td>
                      <td className="py-2.5 text-right text-white font-medium whitespace-nowrap">{price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-text-secondary">
              Orsayn se réserve le droit de modifier ses tarifs avec un préavis de 30 jours. Les abonnements en cours sont maintenus au tarif contractualisé jusqu'à leur prochain renouvellement mensuel suivant la notification.
            </p>
          </Section>

          <Section title="Article 5 — Conditions de paiement">
            <SubSection title="5.1 Setup one-shot">
              <p>Paiement intégral à la commande, avant le début du déploiement, par virement bancaire ou tout autre moyen convenu par écrit.</p>
            </SubSection>
            <SubSection title="5.2 Abonnement MRR">
              <p>Facturation mensuelle à terme échu. Le premier mois est facturé au prorata de la date d'activation. Le paiement est dû dans un délai de <strong className="text-white">15 jours</strong> à compter de la date de facture.</p>
            </SubSection>
            <SubSection title="5.3 Pénalités de retard">
              <p className="mb-2">Conformément à l'article L.441-10 du Code de commerce, tout retard de paiement entraîne de plein droit, sans mise en demeure préalable :</p>
              <ul className="list-disc list-inside space-y-1 text-neutral-400">
                <li>Des pénalités de retard au taux de <strong className="text-white">3 fois le taux d'intérêt légal</strong> en vigueur, calculées sur le montant TTC de la facture, à compter de la date d'échéance.</li>
                <li>Une indemnité forfaitaire pour frais de recouvrement de <strong className="text-white">40 €</strong> par facture impayée (article D.441-5 du Code de commerce).</li>
              </ul>
            </SubSection>
            <SubSection title="5.4 Défaut de paiement">
              <p>En cas de non-paiement à l'échéance, Orsayn se réserve le droit de suspendre l'accès à l'application après mise en demeure restée sans effet pendant 8 jours, sans que cette suspension ne constitue une rupture du contrat.</p>
            </SubSection>
          </Section>

          <Section title="Article 6 — Durée et résiliation">
            <SubSection title="6.1 Setup">
              <p>La prestation de setup est conclue pour une durée déterminée prenant fin à la livraison confirmée et à l'expiration des 30 jours de support au démarrage. Elle ne comporte pas d'engagement de durée postérieur.</p>
            </SubSection>
            <SubSection title="6.2 Abonnement MRR">
              <p>L'abonnement est conclu pour une durée indéterminée à compter de la date d'activation. Chaque partie peut y mettre fin à tout moment avec un préavis de <strong className="text-white">30 jours calendaires</strong> notifié par email.</p>
            </SubSection>
            <SubSection title="6.3 Résiliation pour manquement">
              <p>En cas de manquement grave de l'une des parties à ses obligations contractuelles (notamment non-paiement répété, usage contraire aux conditions d'utilisation, atteinte à la sécurité du service), l'autre partie peut résilier le contrat de plein droit après mise en demeure restée sans effet pendant <strong className="text-white">15 jours</strong>.</p>
            </SubSection>
            <SubSection title="6.4 Effets de la résiliation">
              <ul className="list-disc list-inside space-y-1 text-neutral-400">
                <li>L'abonnement MRR est arrêté à la fin de la période de préavis. Aucun remboursement du setup one-shot n'est dû.</li>
                <li>Orsayn met à disposition un export complet des données du client dans les 30 jours suivant la résiliation effective, conformément à l'Annexe RGPD / DPA.</li>
                <li>Passé ce délai d'export, l'instance est supprimée, sous réserve des durées légales de conservation.</li>
              </ul>
            </SubSection>
          </Section>

          <Section title="Article 7 — Propriété intellectuelle">
            <p>
              Le code source du logiciel Atelier, son architecture, ses composants réutilisables et ses évolutions restent la propriété exclusive d'Orsayn. Le contrat confère au Client une <strong className="text-white">licence d'usage non exclusive, non cessible et non sous-licenciable</strong> pendant la durée du contrat.
            </p>
            <p className="mt-3">
              Le Client reste propriétaire de l'intégralité de ses données, de ses contenus métier (devis, factures, photos, documents) et de ses paramètres de configuration.
            </p>
          </Section>

          <Section title="Article 8 — Responsabilité et limitation">
            <SubSection title="8.1 Obligations d'Orsayn">
              <p>Orsayn est soumis à une obligation de moyens dans la fourniture du service. Orsayn s'engage à maintenir le service en état de fonctionnement, à appliquer les correctifs de sécurité dans des délais raisonnables et à sauvegarder les données selon les modalités de l'Annexe RGPD / DPA.</p>
            </SubSection>
            <SubSection title="8.2 Exclusion des dommages indirects">
              <p>Orsayn ne saurait être tenu responsable des dommages indirects ou immatériels subis par le Client, notamment : perte de chiffre d'affaires, manque à gagner, atteinte à l'image, perte de données résultant d'un manquement du Client à ses propres obligations de sauvegarde, ou préjudice causé par un tiers.</p>
            </SubSection>
            <SubSection title="8.3 Plafond de responsabilité">
              <p>La responsabilité totale d'Orsayn au titre du contrat, toutes causes confondues, est plafonnée au montant total des sommes effectivement versées par le Client à Orsayn au cours des <strong className="text-white">12 mois précédant</strong> le fait générateur du dommage.</p>
            </SubSection>
            <SubSection title="8.4 Faute lourde et dol">
              <p>Les limitations prévues aux articles 8.2 et 8.3 ne s'appliquent pas en cas de faute lourde ou dolosive d'Orsayn.</p>
            </SubSection>
            <SubSection title="8.5 Garantie contre les vices cachés">
              <p>La garantie légale contre les vices cachés (article 1641 du Code civil) est applicable. Toutefois, les parties conviennent que le Client, professionnel de son secteur, a effectué les vérifications nécessaires avant la commande. Toute réclamation à ce titre doit être formulée dans un délai raisonnable à compter de la découverte du vice.</p>
            </SubSection>
          </Section>

          <Section title="Article 9 — Force majeure">
            <p>
              Orsayn ne saurait être tenu responsable d'un manquement à ses obligations résultant d'un cas de force majeure au sens de l'article 1218 du Code civil, notamment : panne ou indisponibilité des infrastructures tierces (Supabase, Cloudflare, Twilio, OpenRouter), décisions de régulateurs, défaillances réseau généralisées, cyberattaques à grande échelle, pandémie ou catastrophe naturelle.
            </p>
            <p className="mt-3">
              Orsayn notifie le Client dans les meilleurs délais et prend les mesures raisonnables pour remédier à la situation. Si la situation de force majeure persiste au-delà de 30 jours, chaque partie peut résilier le contrat sans indemnité.
            </p>
          </Section>

          <Section title="Article 10 — Disponibilité du service">
            <p>
              Orsayn s'engage à maintenir le service disponible dans la mesure du possible (objectif best effort : 99 % hors maintenances planifiées). Les maintenances planifiées sont annoncées par email avec un préavis minimum de 24 heures sauf urgence de sécurité. Orsayn ne garantit pas un niveau de disponibilité contractuellement défini au-delà du présent article.
            </p>
          </Section>

          <Section title="Article 11 — Données personnelles">
            <p>
              Le traitement des données personnelles dans le cadre de l'utilisation d'Atelier est encadré par l'Annexe RGPD / DPA, remise au Client lors du déploiement et disponible sur demande à{" "}
              <a href="mailto:contact@orsayn.fr" className="text-accent hover:underline">contact@orsayn.fr</a>.
            </p>
          </Section>

          <Section title="Article 12 — Facturation électronique — Statut d'Orsayn">
            <p>
              Atelier génère des fichiers de facturation au format <strong className="text-white">Factur-X (XML EN 16931)</strong> conformes à la norme européenne, en complément du PDF habituel.
            </p>
            <p className="mt-3 p-3 rounded-lg bg-white/[0.03] border border-white/10 text-neutral-400">
              <strong className="text-white">Orsayn est un opérateur de dématérialisation (OD) et non une plateforme de dématérialisation partenaire (PDP) au sens du Décret 2022-1299.</strong>
            </p>
            <p className="mt-3">
              En mode <em>export_only</em> (défaut) : Atelier génère le fichier Factur-X. La transmission à une plateforme (PPF Chorus Pro ou PDP de son choix) demeure de la responsabilité exclusive du Client jusqu'à l'entrée en vigueur de l'obligation d'émission applicable à sa taille d'entreprise.
            </p>
            <p className="mt-3">
              En mode <em>B2Brouter</em> : Atelier transmet les factures via B2Brouter, plateforme immatriculée PDP par la DGFiP. La responsabilité de la conformité légale de la transmission incombe à B2Brouter et au Client. Orsayn ne saurait être tenu responsable d'un manquement aux obligations de facturation électronique du Client résultant d'une indisponibilité de B2Brouter ou d'une décision de la DGFiP.
            </p>
          </Section>

          <Section title="Article 13 — Loi applicable et juridiction compétente">
            <p>
              Les présentes CGV et tous les contrats conclus sur leur base sont soumis au <strong className="text-white">droit français</strong>.
            </p>
            <p className="mt-3">
              Tout litige relatif à la formation, à l'interprétation ou à l'exécution des présentes, qui ne pourrait être réglé amiablement dans un délai de 30 jours à compter de sa notification écrite, sera soumis à la compétence exclusive des <strong className="text-white">tribunaux du ressort du siège d'Orsayn</strong>.
            </p>
          </Section>

          <Section title="Article 14 — Dispositions diverses">
            <dl className="space-y-3">
              <div>
                <dt className="font-medium text-white">Intégralité du contrat.</dt>
                <dd className="text-neutral-400">Les présentes CGV, le bon de commande ou devis signé, et l'Annexe RGPD / DPA constituent l'intégralité de l'accord entre les parties et remplacent tout accord antérieur portant sur le même objet.</dd>
              </div>
              <div>
                <dt className="font-medium text-white">Divisibilité.</dt>
                <dd className="text-neutral-400">Si l'une des clauses des présentes CGV est déclarée nulle ou inapplicable, les autres clauses demeurent en vigueur.</dd>
              </div>
              <div>
                <dt className="font-medium text-white">Non-renonciation.</dt>
                <dd className="text-neutral-400">Le fait pour Orsayn de ne pas se prévaloir d'un manquement du Client à l'une de ses obligations ne vaut pas renonciation à s'en prévaloir ultérieurement.</dd>
              </div>
              <div>
                <dt className="font-medium text-white">Modification.</dt>
                <dd className="text-neutral-400">Orsayn se réserve le droit de modifier les présentes CGV. Les modifications sont notifiées par email avec un préavis de 30 jours. L'absence d'opposition dans ce délai vaut acceptation.</dd>
              </div>
            </dl>
          </Section>

          <p className="text-[10px] text-text-secondary/40 border-t border-white/5 pt-6">
            CGV Orsayn — Version 1.0 — mai 2026 · Samuel Mbeboura EI — SIRET 98920815200011
          </p>

        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-display font-bold mb-4 uppercase tracking-wide text-xs text-accent">
        {title}
      </h2>
      {children}
    </section>
  );
}

function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-4">
      <h3 className="font-medium text-white text-xs mb-2">{title}</h3>
      {children}
    </div>
  );
}
