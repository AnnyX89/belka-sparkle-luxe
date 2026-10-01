import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import p2 from "@/assets/portfolio-2.jpg";
import p3 from "@/assets/portfolio-3.jpg";
import p4 from "@/assets/portfolio-4.jpg";
import p5 from "@/assets/portfolio-5.jpg";
import p6 from "@/assets/portfolio-6.jpg";
import p7 from "@/assets/portfolio-7.jpg";
import p8 from "@/assets/portfolio-8.jpg";
import p9 from "@/assets/portfolio-9.jpg";
import p13 from "@/assets/portfolio-13.jpg";
import p15 from "@/assets/portfolio-15.jpg";

const photos = [p2, p3, p4, p5, p6, p7, p8, p9, p13, p15];

const GallerySection = () => {
  const [current, setCurrent] = useState(0);
  const prev = () => setCurrent((i) => (i === 0 ? photos.length - 1 : i - 1));
  const next = () => setCurrent((i) => (i === photos.length - 1 ? 0 : i + 1));

  return (
    <section id="gallery" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-gold font-body text-sm tracking-[0.3em] uppercase">Портфолио</span>
          <div className="w-16 h-px gold-line mt-4 mb-6 mx-auto" />
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-foreground">Наши результаты</h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative bg-cream rounded-2xl overflow-hidden border border-border">
            <div className="aspect-square md:aspect-[16/9] flex items-center justify-center">
              <img
                src={photos[current]}
                alt={`Результат клининга — фото ${current + 1}`}
                loading="lazy"
                className="w-full h-full object-contain"
              />
            </div>
            <button
              onClick={prev}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 border border-border flex items-center justify-center hover:border-gold/40 transition-colors"
              aria-label="Предыдущий"
            >
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>
            <button
              onClick={next}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 border border-border flex items-center justify-center hover:border-gold/40 transition-colors"
              aria-label="Следующий"
            >
              <ChevronRight className="w-5 h-5 text-foreground" />
            </button>
          </div>

          <div className="flex items-center justify-center gap-2 mt-6 flex-wrap">
            {photos.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  i === current ? "bg-gold w-8" : "bg-border hover:bg-gold/40 w-2.5"
                }`}
                aria-label={`Слайд ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
