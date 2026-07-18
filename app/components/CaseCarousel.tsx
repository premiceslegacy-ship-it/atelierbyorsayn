import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CASE_STUDIES } from "../data/site";

export function CaseCarousel({ title }: { title?: React.ReactNode }) {
  const scroller = useRef<HTMLDivElement>(null);
  const scroll = (direction: -1 | 1) => scroller.current?.scrollBy({ left: direction * 380, behavior: "smooth" });
  return (
    <section id="resultats" className="section section--results">
      <div className="section-heading section-heading--split">
        <div>
          <p className="eyebrow">Ils sont satisfaits</p>
          <h2>{title ?? <>Moins d'administratif.<br />Plus de maîtrise.</>}</h2>
        </div>
        <div className="carousel-controls">
          <button onClick={() => scroll(-1)} aria-label="Cas client précédent"><ChevronLeft /></button>
          <button onClick={() => scroll(1)} aria-label="Cas client suivant"><ChevronRight /></button>
        </div>
      </div>
      <div className="case-viewport" ref={scroller} tabIndex={0} aria-label="Témoignages clients">
        <div className="case-track">
          {[...CASE_STUDIES, ...CASE_STUDIES].map((item, index) => (
            <article className="case-card" key={`${item.id}-${index}`}>
              <picture>
                <source srcSet={item.portrait.replace(".webp", ".avif")} type="image/avif" />
                <img src={item.portrait} alt={`Portrait de ${item.name}, ${item.trade}`} width="720" height="900" loading="lazy" />
              </picture>
              <div className="case-card__overlay">
                <p className="case-result">{item.result}</p>
                <blockquote>« {item.quote} »</blockquote>
                <div className="case-person">
                  <strong>{item.name}</strong>
                  <span>{item.trade}</span>
                  <small>{item.team} · {item.region}</small>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
