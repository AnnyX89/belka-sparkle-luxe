import { Link } from "react-router-dom";
import { HardHat, Sparkles, Sofa, AppWindow, RefreshCw, ShieldCheck, ArrowRight, Building2 } from "lucide-react";
import { GUARANTEE, SERVICES } from "@/data/services";

const ICONS: Record<string, typeof Sparkles> = {
  "generalnaya-uborka": Sparkles,
  "podderzhivayushchaya-uborka": RefreshCw,
  "uborka-posle-remonta": HardHat,
  "moyka-okon": AppWindow,
  "himchistka-mebeli": Sofa,
  "moyka-fasadov": Building2,
};

/** «Наши услуги»: каждая карточка — выгода для клиента + цена, ведёт на свою страницу */
const ServicesSection = () => (
  <section id="services" className="py-24 bg-ivory">
    <div className="container mx-auto px-6">
      <div className="text-center mb-12">
        <span className="text-gold font-body text-sm tracking-[0.3em] uppercase">Услуги</span>
        <div className="w-16 h-px gold-line mx-auto mt-4 mb-6" />
        <h2 className="font-heading text-3xl md:text-4xl font-semibold text-foreground">Наши услуги и цены</h2>
        <p className="font-body text-muted-foreground mt-4 max-w-2xl mx-auto">
          Приезжаем со своей профессиональной химией и инвентарём. Цену называем заранее — по фото или видео.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {SERVICES.map((s) => {
          const Icon = ICONS[s.slug] ?? Sparkles;
          return (
            <Link key={s.slug} to={`/uslugi/${s.slug}`}
              className="group bg-background rounded-xl p-6 border border-border hover:border-gold/40 hover:shadow-gold transition-all duration-300 flex flex-col">
              <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center mb-5 group-hover:bg-gold/20 transition-colors">
                <Icon className="w-6 h-6 text-gold" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground mb-1">{s.title}</h3>
              <p className="text-gold font-body font-semibold text-xl mb-3">{s.price}</p>
              <p className="font-body text-sm text-foreground/80 leading-relaxed flex-1">{s.benefit}</p>
              <span className="mt-5 inline-flex items-center gap-1 font-body text-sm text-gold group-hover:gap-2 transition-all">
                Подробнее и цены <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          );
        })}
      </div>
      <div className="max-w-6xl mx-auto mt-6 rounded-xl p-6 border border-gold/30 bg-gold/5 flex flex-col sm:flex-row sm:items-center gap-4">
        <ShieldCheck className="w-10 h-10 text-gold shrink-0" />
        <div>
          <h3 className="font-heading text-lg font-semibold mb-1">Гарантия результата</h3>
          <p className="font-body text-sm text-foreground/80 leading-relaxed">{GUARANTEE}</p>
        </div>
      </div>
    </div>
  </section>
);

export default ServicesSection;
