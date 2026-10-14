import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { SERVICES } from "@/data/services";

const worksWord = (n: number) => {
  const d = n % 10, dd = n % 100;
  if (d === 1 && dd !== 11) return "работа";
  if (d >= 2 && d <= 4 && (dd < 12 || dd > 14)) return "работы";
  return "работ";
};

/** «Портфолио» на главной: по лучшему коллажу «до / после» из каждой услуги, клик — на страницу услуги со всеми работами */
const GallerySection = () => (
  <section id="gallery" className="py-24 bg-background">
    <div className="container mx-auto px-6">
      <div className="text-center mb-12">
        <span className="text-gold font-body text-sm tracking-[0.3em] uppercase">Портфолио</span>
        <div className="w-16 h-px gold-line mt-4 mb-6 mx-auto" />
        <h2 className="font-heading text-3xl md:text-4xl font-semibold text-foreground">Наши результаты</h2>
        <p className="font-body text-muted-foreground mt-4 max-w-2xl mx-auto">
          Реальные объекты нашей команды. Нажмите на услугу — покажем все работы по ней.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {SERVICES.filter((s) => s.gallery.length > 0).map((s) => (
          <Link key={s.slug} to={`/uslugi/${s.slug}#raboty`}
            className="group block rounded-2xl overflow-hidden bg-cream border border-border hover:border-gold/40 hover:shadow-gold transition-all duration-300">
            <div className="h-72 flex items-center justify-center overflow-hidden">
              <img src={s.gallery[0]} alt={`${s.title}: до и после`} loading="lazy" decoding="async"
                className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-[1.03]" />
            </div>
            <div className="px-5 py-4 flex flex-col items-start gap-1 bg-background">
              <span className="font-heading text-lg font-semibold text-foreground">{s.title}</span>
              <span className="inline-flex items-center gap-1 font-body text-sm text-gold whitespace-nowrap group-hover:gap-2 transition-all">
                Смотреть все {s.gallery.length} {worksWord(s.gallery.length)} <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export default GallerySection;
