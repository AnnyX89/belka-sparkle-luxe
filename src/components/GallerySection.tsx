import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    title: "Послестроительный клининг — квартира 120 м²",
    description: "Полная очистка после ремонта: удаление строительной пыли, мойка окон, химчистка всех поверхностей.",
  },
  {
    title: "Генеральная уборка — коттедж 250 м²",
    description: "Глубинная чистка всех помещений, обработка кухни и санузлов профессиональными средствами.",
  },
  {
    title: "Химчистка мебели — дизайнерская квартира",
    description: "Бережная обработка мягкой мебели итальянскими составами с сохранением цвета и текстуры тканей.",
  },
  {
    title: "Премиум-поддержание — пентхаус",
    description: "Регулярная уборка с учётом особенностей натурального камня и дорогих отделочных материалов.",
  },
];

const GallerySection = () => {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? slides.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === slides.length - 1 ? 0 : c + 1));

  return (
    <section id="gallery" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-gold font-body text-sm tracking-[0.3em] uppercase">
            Портфолио
          </span>
          <div className="w-16 h-px gold-line mt-4 mb-6 mx-auto" />
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-foreground">
            Наши результаты
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative bg-cream rounded-2xl overflow-hidden border border-border">
            {/* Slide content */}
            <div className="aspect-[16/9] flex items-center justify-center p-8 md:p-16">
              <div className="text-center max-w-xl">
                <div className="w-20 h-20 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-6">
                  <span className="font-heading text-2xl text-gold font-semibold">
                    {String(current + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="font-heading text-xl md:text-2xl font-semibold text-foreground mb-4">
                  {slides[current].title}
                </h3>
                <p className="font-body text-muted-foreground leading-relaxed">
                  {slides[current].description}
                </p>
              </div>
            </div>

            {/* Navigation arrows */}
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

          {/* Dots */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  i === current ? "bg-gold w-8" : "bg-border hover:bg-gold/40"
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
