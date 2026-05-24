import { Link } from "react-router-dom";

export default function MentionsLegales() {
  return (
    <div className="bg-[#050505] min-h-screen text-white">
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <Link to="/#footer" className="text-xs text-text-secondary hover:text-white transition-colors mb-10 inline-block">
          ← Retour
        </Link>
        <h1 className="font-display text-3xl md:text-4xl font-extrabold text-white mb-10 tracking-tight">
          Mentions légales
        </h1>

        <div className="space-y-8 text-sm text-neutral-300 leading-relaxed">
          <section>
            <h2 className="font-display font-bold text-white text-base mb-3 uppercase tracking-wide text-xs text-accent">
              Éditeur du site
            </h2>
            <p>
              Samuel Mbeboura, entrepreneur individuel exerçant sous le nom commercial <strong className="text-white">Orsayn</strong><br />
              1 rue des héraults<br />
              SIRET : 98920815200011<br />
              Téléphone : 06 51 66 40 68<br />
              Email : <a href="mailto:contact@orsayn.fr" className="text-accent hover:underline">contact@orsayn.fr</a><br />
              TVA non applicable — article 293 B du CGI
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-white text-base mb-3 uppercase tracking-wide text-xs text-accent">
              Directeur de la publication
            </h2>
            <p>Samuel Mbeboura</p>
          </section>

          <section>
            <h2 className="font-display font-bold text-white text-base mb-3 uppercase tracking-wide text-xs text-accent">
              Hébergement
            </h2>
            <p>
              Cloudflare, Inc.<br />
              101 Townsend St, San Francisco, CA 94107, USA<br />
              <a href="https://cloudflare.com" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">cloudflare.com</a>
            </p>
            <p className="mt-3">
              Les données présentées sur ce site et collectées via les formulaires sont hébergées sur l'infrastructure de Cloudflare, Inc. (exécution applicative) et Supabase, Inc. (données, région EU West — Frankfurt, Allemagne).
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
