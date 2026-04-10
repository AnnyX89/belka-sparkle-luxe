import heroImage from "@/assets/hero-interior.jpg";
import logo from "@/assets/belkaclean-logo.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Роскошный интерьер после профессионального клининга"
          width={1920}
          height={1080}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/60 via-foreground/40 to-foreground/70" />
      </div>

      {/* Navigation bar with logo */}
      <nav className="absolute top-0 left-0 right-0 z-20 py-4">
        <div className="container mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="БелкаClean логотип"
              className="w-12 h-12 rounded-full object-cover border-2 border-gold/30"
            />
            <span className="font-heading text-xl font-semibold text-primary-foreground">
              <span className="text-gold">Белка</span>Clean
            </span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <a href="#benefits" className="font-body text-sm text-primary-foreground/80 hover:text-gold transition-colors">Преимущества</a>
            <a href="#services" className="font-body text-sm text-primary-foreground/80 hover:text-gold transition-colors">Услуги</a>
            <a href="#about" className="font-body text-sm text-primary-foreground/80 hover:text-gold transition-colors">О нас</a>
            <a href="#gallery" className="font-body text-sm text-primary-foreground/80 hover:text-gold transition-colors">Результаты</a>
            <a
              href="tel:89642423000"
              className="font-body text-sm text-gold border border-gold/40 px-4 py-2 rounded-lg hover:bg-gold/10 transition-colors"
            >
              8 (964) 242-30-00
            </a>
          </div>
        </div>
      </nav>

      <div className="relative z-10 container mx-auto px-6 text-center max-w-4xl">
        <div className="animate-fade-in-up">
          <div className="inline-block mb-6">
            <span className="text-gold font-heading text-lg tracking-[0.3em] uppercase">
              Челябинск · с 2018 года
            </span>
          </div>

          <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-semibold text-primary-foreground mb-6 leading-tight">
            <span className="text-gold">БелкаClean</span> — экспертный клининг
            для тех, кто ценит детали
          </h1>

          <p className="font-body text-lg md:text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto leading-relaxed">
            Специализируемся на дизайнерских интерьерах и сложных послестроях
            в Челябинске более 6 лет
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://t.me/BelkaAnny89"
              target="_blank"
              rel="noopener noreferrer"
              className="gradient-gold text-primary-foreground font-body font-semibold px-8 py-4 rounded-lg text-lg shadow-gold hover:opacity-90 transition-opacity"
            >
              Рассчитать стоимость по видеообзору
            </a>
            <a
              href="tel:89642423000"
              className="border border-gold/50 text-primary-foreground/90 font-body px-8 py-4 rounded-lg text-lg hover:bg-gold/10 transition-colors"
            >
              8 (964) 242-30-00
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gold/40 rounded-full flex justify-center pt-2">
          <div className="w-1 h-3 bg-gold/60 rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
