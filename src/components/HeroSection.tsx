import { useEffect } from "react";
import heroImage from "@/assets/hero-interior.jpg";
import SiteNav from "@/components/SiteNav";
import { OPEN_BOOKING_EVENT } from "@/components/ChatBot";

const HeroSection = () => {
  useEffect(() => {
    document.title = "Клининг в Челябинске — уборка квартир, после ремонта, мойка окон | БелкаClean";
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Роскошный интерьер после профессионального клининга"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/60 via-foreground/40 to-foreground/70" />
      </div>

      <SiteNav />

      <div className="relative z-10 container mx-auto px-6 text-center max-w-4xl">
        <div className="animate-fade-in-up">
          <div className="inline-block mb-6">
            <span className="text-gold font-heading text-lg tracking-[0.3em] uppercase">Челябинск · с 2018 года</span>
          </div>
          <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-semibold text-primary-foreground mb-6 leading-tight">
            <span className="text-gold">Чисто за один день.</span> Цена заранее. Гарантия результата
          </h1>
          <p className="font-body text-xl md:text-2xl text-primary-foreground/90 mb-10 max-w-2xl mx-auto leading-relaxed">
            Уборка квартир, домов и офисов в Челябинске от 100 ₽/м²
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => window.dispatchEvent(new Event(OPEN_BOOKING_EVENT))}
              className="gradient-gold text-primary-foreground font-body font-semibold px-8 py-4 rounded-lg text-lg shadow-gold hover:opacity-90 transition-opacity"
            >
              Рассчитать стоимость и записаться
            </button>
            <a
              href="tel:89642423000"
              className="border border-gold/50 text-primary-foreground/90 font-body px-8 py-4 rounded-lg text-lg hover:bg-gold/10 transition-colors"
            >
              8 (964) 242-30-00
            </a>
          </div>
          <a
            href="https://t.me/BelkaAnny89"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-block font-body text-sm text-primary-foreground/80 underline-offset-4 hover:text-gold hover:underline"
          >
            или пришлите видеообзор в Telegram — рассчитаем точнее
          </a>
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
