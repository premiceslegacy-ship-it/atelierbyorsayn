import { BadgeCheck, Clock, FileWarning, MapPin, Star, TrendingUp, Users, Wrench } from "lucide-react";

const testimonials = [
  {
    id: "testi-stephane",
    initial: "S",
    name: "Stéphane M.",
    profession: "Menuisier & charpentier métallique",
    effectif: "4 salariés",
    location: "Rhône-Alpes",
    quote:
      "Avant Atelier, je passais mes dimanches après-midi à rédiger mes devis et je traînais plus de 12 500 € de factures impayées. En moins d'un mois, j'ai récupéré 100% de mes retards grâce aux relances automatiques.",
  },
  {
    id: "testi-julien",
    initial: "J",
    name: "Julien R.",
    profession: "Électricien du bâtiment",
    effectif: "Indépendant",
    location: "Gironde",
    quote:
      "Dicter mes infos de chantier à la voix depuis mon camion et voir le devis généré en 1 minute, ça m'a retiré la boule au ventre du dimanche soir.",
  },
  {
    id: "testi-sandrine",
    initial: "S",
    name: "Sandrine T.",
    profession: "Plâtrerie & rénovation intégrale",
    effectif: "7 salariés",
    location: "Occitanie",
    quote:
      "Grâce au suivi des marges en direct, notre rentabilité nette a bondi de 18% en un semestre. Je sais enfin si un chantier tient la route avant la fin.",
  },
  {
    id: "testi-marc",
    initial: "M",
    name: "Marc D.",
    profession: "Peintre en bâtiment",
    effectif: "2 salariés",
    location: "Bretagne",
    quote:
      "Depuis que j'utilise Atelier, le délai de paiement moyen de mes clients est tombé de 45 à 12 jours. Je respire enfin côté trésorerie.",
  },
  {
    id: "testi-karim",
    initial: "K",
    name: "Karim B.",
    profession: "Plombier-chauffagiste",
    effectif: "Indépendant",
    location: "Île-de-France",
    quote:
      "Avec le chiffrage guidé, je sors mes propositions en moins de 3 minutes. Je réponds avant les concurrents et je signe plus vite.",
  },
  {
    id: "testi-sophie",
    initial: "S",
    name: "Sophie L.",
    profession: "Maçonnerie générale",
    effectif: "12 salariés",
    location: "Normandie",
    quote:
      "Les rappels automatiques m'ont fait économiser 10 heures par mois, et notre encours client a chuté de 30 k€. C'est devenu beaucoup plus calme.",
  },
  {
    id: "testi-antoine",
    initial: "A",
    name: "Antoine V.",
    profession: "Couvreur-zingueur",
    effectif: "5 salariés",
    location: "Grand Est",
    quote:
      "J'ai divisé par 3 le temps administratif. Retrouver mes soirées tout en facturant 20% de plus a changé mon quotidien.",
  },
];

const stats = [
  {
    id: "stat-admin",
    metric: "15h",
    label: "récupérables par semaine",
    desc: "Atelier automatise devis, relances et suivi pour remettre du temps dans votre agenda.",
    icon: Clock,
    color: "text-accent",
  },
  {
    id: "stat-payments",
    metric: "1 sur 4",
    label: "factures BTP payées en retard",
    desc: "Les relances partent sans appel gênant et sans oubli dans un coin de carnet.",
    icon: FileWarning,
    color: "text-red-400",
  },
  {
    id: "stat-legal",
    metric: "Factur-X",
    label: "prêt pour la conformité",
    desc: "Atelier génère vos fichiers structurés pour avancer sereinement vers la réforme.",
    icon: BadgeCheck,
    color: "text-emerald-400",
  },
];

export default function Comparison() {
  return (
    <section id="change" className="px-4 md:px-6 py-20 md:py-28 bg-[#050505] relative overflow-hidden scroll-mt-20">
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] select-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]" />
      </div>
      <div className="absolute top-[20%] left-[10%] w-[560px] h-[560px] rounded-full bg-accent/5 blur-[140px] opacity-40 pointer-events-none" />
      <div className="absolute bottom-[10%] right-[10%] w-[560px] h-[560px] rounded-full bg-emerald-500/5 blur-[140px] opacity-30 pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <div className="max-w-3xl mb-12 md:mb-16">
          <span className="text-[11px] font-display text-accent uppercase tracking-[0.2em] block mb-4 font-extrabold">
            Preuve terrain
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.1] mb-5">
            Du temps repris. Des factures relancées. Des marges enfin visibles.
          </h2>
          <p className="font-body text-base sm:text-lg text-text-secondary leading-relaxed max-w-2xl">
            Atelier vous aide à sortir la tête de l'administratif sans embaucher quelqu'un au bureau.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 mb-12">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            // Determine 3D Keycap styles based on stat index
            const get3DKeycapStyles = () => {
              if (i === 0) {
                return "border-accent border-b-[3px] border-b-[#92400e] bg-gradient-to-b from-accent to-[#d97706] text-bg-base shadow-[0_2.5px_6px_rgba(255,159,28,0.35),inset_0_1.5px_1.5px_rgba(255,255,255,0.4)]";
              }
              if (i === 1) {
                return "border-red-500 border-b-[3px] border-b-[#7f1d1d] bg-gradient-to-b from-red-500 to-[#b91c1c] text-white shadow-[0_2.5px_6px_rgba(239,68,68,0.35),inset_0_1.5px_1.5px_rgba(255,255,255,0.3)]";
              }
              return "border-[#b4f481] border-b-[3px] border-b-[#3f6212] bg-gradient-to-b from-[#b4f481] to-[#65a30d] text-black shadow-[0_2.5px_6px_rgba(180,244,129,0.35),inset_0_1.5px_1.5px_rgba(255,255,255,0.4)]";
            };
            
            return (
              <div
                key={stat.id}
                className="rounded-2xl border border-white/10 bg-gradient-to-b from-[#14141a] to-[#0d0d10] p-5 shadow-[0_6px_0_0_#000,0_6px_0_1px_rgba(255,255,255,0.05),0_18px_34px_rgba(0,0,0,0.65),inset_0_1.5px_0_rgba(255,255,255,0.06)] hover:-translate-y-1.5 hover:shadow-[0_10px_0_0_#000,0_10px_0_1.5px_rgba(255,255,255,0.08),0_24px_44px_rgba(0,0,0,0.85)] active:translate-y-0.5 active:shadow-[0_2px_0_0_#000] transition-all duration-300"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-display text-3xl font-black tracking-tight text-white">{stat.metric}</p>
                    <p className="mt-1 font-display text-xs font-bold uppercase tracking-[0.12em] text-accent">{stat.label}</p>
                  </div>
                  {/* Solid 3D Relief Keycap Icon Stamp */}
                  <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${get3DKeycapStyles()}`}>
                    <Icon className="h-5.5 w-5.5 stroke-[2.5]" />
                  </div>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-text-secondary">{stat.desc}</p>
              </div>
            );
          })}
        </div>

        <div className="-mx-4 overflow-hidden px-4 [mask-image:_linear-gradient(to_right,transparent_0,_black_40px,_black_calc(100%-40px),transparent_100%)]">
          <div className="flex w-max gap-5 animate-marquee">
            {[...testimonials, ...testimonials].map((testimonial, index) => (
            <article
              key={`${testimonial.id}-${index}`}
              className="w-[315px] md:w-[365px] shrink-0 rounded-[1.65rem] border border-white/10 bg-gradient-to-b from-[#14141a] to-[#0d0d10] p-5 shadow-[0_7px_0_0_#000,0_7px_0_1px_rgba(255,255,255,0.05),0_18px_34px_rgba(0,0,0,0.65),inset_0_1.5px_0_rgba(255,255,255,0.06)] hover:-translate-y-1.5 hover:shadow-[0_12px_0_0_#000,0_12px_0_1px_rgba(255,255,255,0.08),0_24px_44px_rgba(0,0,0,0.85)] active:translate-y-0 active:shadow-[0_2px_0_0_#000] transition-all duration-300"
            >
              <div className="flex items-center justify-between gap-4 mb-4">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
                  ))}
                </div>
              </div>

              <p className="min-h-[128px] font-body text-sm leading-relaxed text-white/88 italic">
                "{testimonial.quote}"
              </p>

              <div className="mt-5 border-t border-white/6 pt-4">
                <div className="flex items-center gap-3">
                  {/* Avatar styled as a round mechanical 3D keycap */}
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 border-b-[3px] border-b-black bg-gradient-to-b from-[#2e2e3a] to-[#16161d] font-display text-sm font-black text-white shadow-[0_2px_4px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.08)]">
                    {testimonial.initial}
                  </div>
                  <div className="min-w-0">
                    <p className="font-display text-sm font-extrabold text-white">{testimonial.name}</p>
                    <p className="mt-0.5 flex items-center gap-1.5 text-xs text-text-secondary">
                      {/* Mini 3D keycap badge for wrench icon */}
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-accent border-b-[2px] border-b-[#92400e] bg-gradient-to-b from-accent to-[#d97706] text-bg-base shadow-[0_1px_2px_rgba(255,159,28,0.2),inset_0_0.5px_0.5px_rgba(255,255,255,0.4)] mr-0.5">
                        <Wrench className="h-3 w-3 stroke-[2.5]" />
                      </span>
                      <span className="truncate">{testimonial.profession}</span>
                    </p>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <div className="rounded-xl border border-white/6 bg-black/20 p-2 text-xs text-text-secondary flex items-center gap-2">
                    {/* Mini 3D keycap badge for users icon */}
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-white/15 border-b-[2px] border-b-black bg-gradient-to-b from-[#2a2a35] to-[#141419] text-white shadow-[0_1.5px_3px_rgba(0,0,0,0.4),inset_0_0.75px_0.75px_rgba(255,255,255,0.08)]">
                      <Users className="h-3.5 w-3.5 text-white/80" />
                    </span>
                    {testimonial.effectif}
                  </div>
                  <div className="rounded-xl border border-white/6 bg-black/20 p-2 text-xs text-text-secondary flex items-center gap-2">
                    {/* Mini 3D keycap badge for map-pin icon */}
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-white/15 border-b-[2px] border-b-black bg-gradient-to-b from-[#2a2a35] to-[#141419] text-white shadow-[0_1.5px_3px_rgba(0,0,0,0.4),inset_0_0.75px_0.75px_rgba(255,255,255,0.08)]">
                      <MapPin className="h-3.5 w-3.5 text-white/80" />
                    </span>
                    {testimonial.location}
                  </div>
                </div>
              </div>
            </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
