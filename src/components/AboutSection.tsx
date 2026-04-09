import founderImage from "@/assets/founder-anna.jpg";

const AboutSection = () => {
  return (
    <section className="py-24 bg-cream">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="absolute -inset-4 border border-gold/20 rounded-2xl" />
            <img
              src={founderImage}
              alt="Анна — основатель БелкаClean"
              width={800}
              height={1024}
              loading="lazy"
              className="rounded-xl w-full object-cover aspect-[4/5] relative z-10"
            />
          </div>

          <div>
            <span className="text-gold font-body text-sm tracking-[0.3em] uppercase">
              Основатель
            </span>
            <div className="w-16 h-px gold-line mt-4 mb-6" />
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-foreground mb-6">
              Анна — душа БелкаClean
            </h2>
            <div className="space-y-4 font-body text-muted-foreground leading-relaxed">
              <p>
                «Каждый объект для меня — это личная ответственность. Я лично контролирую
                качество на каждом этапе и не сдаю работу, пока результат не станет безупречным.»
              </p>
              <p>
                Более 6 лет опыта в профессиональном клининге. Специализация —
                дизайнерские интерьеры, натуральный камень, дорогие ткани и сложные
                послестроительные объекты.
              </p>
              <p>
                Каждый клиент получает персональный подход и прямую связь с руководителем.
                Никаких менеджеров-посредников.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
