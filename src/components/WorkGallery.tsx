import { useState } from "react";

const FIRST_VISIBLE = 6;

interface WorkGalleryProps {
  title: string;
  photos: string[];
  alt: string;
}

/** Галерея работ «до / после» на странице услуги: сначала 6 лучших, остальные — по кнопке */
const WorkGallery = ({ title, photos, alt }: WorkGalleryProps) => {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? photos : photos.slice(0, FIRST_VISIBLE);

  return (
    <section className="py-20">
      <div className="container mx-auto px-6 max-w-6xl text-center">
        <h2 className="font-heading text-3xl font-semibold text-foreground mb-2">{title}</h2>
        <p className="font-body text-muted-foreground mb-8">Реальные объекты нашей команды</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {visible.map((src, i) => (
            <a key={src} href={src} target="_blank" rel="noopener noreferrer"
              className="group block overflow-hidden rounded-2xl bg-cream shadow-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold">
              <img src={src} alt={`${alt}: ${title.toLowerCase()}, фото ${i + 1}`} loading="lazy" decoding="async"
                className="w-full h-72 object-contain transition-transform duration-300 group-hover:scale-[1.03]" />
            </a>
          ))}
        </div>
        {photos.length > FIRST_VISIBLE && (
          <button type="button" onClick={() => setShowAll((v) => !v)}
            className="mt-8 px-8 py-3 rounded-full border border-gold text-gold font-body font-semibold hover:bg-gold hover:text-white transition-colors">
            {showAll ? "Свернуть" : `Показать все работы (${photos.length})`}
          </button>
        )}
      </div>
    </section>
  );
};

export default WorkGallery;
