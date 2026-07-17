import { Link } from "react-router-dom";

export default function Confidentialite() {
  return (
    <div className="bg-[#050505] min-h-screen text-white">
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <Link to="/#footer" className="text-xs text-text-secondary hover:text-white transition-colors mb-10 inline-block">
          ← Retour
        </Link>
        <h1 className="font-display text-3xl md:text-4xl font-extrabold text-white mb-2 tracking-tight">
          Politique de confidentialité
        </h1>
        <p className="text-xs text-text-secondary mb-10">Dernière mise à jour : mai 2026</p>

        <div className="space-y-10 text-sm text-neutral-300 leading-relaxed">

          <section>
            <h2 className="font-display font-bold text-white mb-3 uppercase tracking-wide text-xs text-accent">
              1. Qui traite vos données ?
            </h2>
            <p>
              Samuel Mbeboura, entrepreneur individuel exerçant sous le nom commercial <strong className="text-white">Orsayn</strong> (SIRET 98920815200011), est responsable du traitement des données collectées sur ce site et dans l'application Atelier pour ses propres traitements (gestion des contacts, support, facturation, sécurité).
            </p>
            <p className="mt-3">
              Pour les données métier saisies dans l'application par les artisans (données de leurs propres clients, collaborateurs, chantiers), Orsayn intervient comme sous-traitant au sens du RGPD. L'artisan est alors responsable de traitement. Un accord de traitement des données (DPA) est remis à chaque client lors du déploiement.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-white mb-3 uppercase tracking-wide text-xs text-accent">
              2. Quelles données sont collectées sur ce site ?
            </h2>
            <div className="space-y-4">
              <div>
                <p className="font-medium text-white mb-1">Formulaire de contact / demande de démo :</p>
                <ul className="list-disc list-inside space-y-1 text-neutral-400">
                  <li>Nom, prénom, email, téléphone, nom de l'entreprise</li>
                  <li>Finalité : répondre à votre demande, vous contacter pour une démo</li>
                  <li>Base légale : exécution de mesures précontractuelles (art. 6(1)(b) RGPD)</li>
                  <li>Durée de conservation : 3 ans après le dernier contact</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Données de navigation (logs serveur) :</p>
                <ul className="list-disc list-inside space-y-1 text-neutral-400">
                  <li>Adresse IP, type de navigateur, pages consultées, horodatage</li>
                  <li>Finalité : sécurité, détection d'abus</li>
                  <li>Base légale : intérêt légitime (art. 6(1)(f) RGPD)</li>
                  <li>Durée de conservation : 1 an</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-display font-bold text-white mb-3 uppercase tracking-wide text-xs text-accent">
              3. Cookies
            </h2>
            <p>
              Ce site utilise uniquement des cookies techniques strictement nécessaires au fonctionnement (maintien de session si espace connecté). Aucun cookie publicitaire, aucun tracker tiers, aucune régie publicitaire. Aucun consentement supplémentaire n'est requis pour ces cookies fonctionnels (directive ePrivacy, art. 82 LIL).
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-white mb-3 uppercase tracking-wide text-xs text-accent">
              4. Destinataires des données
            </h2>
            <p className="mb-3">Vos données peuvent être transmises aux prestataires techniques suivants dans le cadre de la fourniture du service :</p>
            <ul className="list-disc list-inside space-y-2 text-neutral-400">
              <li><strong className="text-white">Cloudflare, Inc.</strong> (USA) - exécution applicative. Certifié Data Privacy Framework UE-USA.</li>
              <li><strong className="text-white">Supabase, Inc.</strong> (USA, données stockées UE Frankfurt) - base de données. Certifié Data Privacy Framework UE-USA.</li>
              <li><strong className="text-white">Resend, Inc.</strong> (USA) - emails transactionnels. DPA RGPD, clauses contractuelles types.</li>
            </ul>
            <p className="mt-3">Aucune vente de données à des tiers. Aucune utilisation à des fins publicitaires.</p>
          </section>

          <section>
            <h2 className="font-display font-bold text-white mb-3 uppercase tracking-wide text-xs text-accent">
              5. Vos droits
            </h2>
            <p>
              Conformément au RGPD (articles 15 à 22), vous disposez des droits suivants : accès, rectification, effacement, limitation, portabilité, opposition.
            </p>
            <p className="mt-3">
              Pour exercer vos droits : <a href="mailto:contact@orsayn.fr" className="text-accent hover:underline">contact@orsayn.fr</a><br />
              Délai de réponse : 30 jours calendaires.
            </p>
            <p className="mt-3">
              Si vous estimez que le traitement de vos données ne respecte pas le RGPD, vous pouvez déposer une réclamation auprès de la CNIL :{" "}
              <a href="https://www.cnil.fr/fr/plaintes" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">cnil.fr/fr/plaintes</a>
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-white mb-3 uppercase tracking-wide text-xs text-accent">
              6. Autorité de contrôle
            </h2>
            <p>
              Commission Nationale de l'Informatique et des Libertés (CNIL)<br />
              3 Place de Fontenoy - TSA 80715 - 75334 PARIS CEDEX 07<br />
              <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">www.cnil.fr</a>
            </p>
          </section>

          <p className="text-[10px] text-text-secondary/40 border-t border-white/5 pt-6">
            Samuel Mbeboura EI - SIRET 98920815200011
          </p>
        </div>
      </div>
    </div>
  );
}
