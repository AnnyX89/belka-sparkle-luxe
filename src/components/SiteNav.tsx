import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Menu, X, Phone } from "lucide-react";
import logo from "@/assets/belkaclean-logo.jpg";
import { SERVICES } from "@/data/services";

/** Шапка сайта: «Услуги» раскрывает плашку со списком направлений (у каждого своя страница) */
const SiteNav = ({ onHome = true }: { onHome?: boolean }) => {
  const [open, setOpen] = useState(false);
  const [mobile, setMobile] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const close = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);
  const anchor = (id: string) => (onHome ? `#${id}` : `/#${id}`);
  const link = "font-body text-sm text-primary-foreground/80 hover:text-gold transition-colors";
  return (
    <nav className="absolute top-0 left-0 right-0 z-30 py-4">
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="БелкаClean логотип" className="w-12 h-12 rounded-full object-cover border-2 border-gold/30" />
          <span className="font-heading text-xl font-semibold text-primary-foreground">
            <span className="text-gold">Белка</span>Clean
          </span>
        </Link>
        <div className="hidden md:flex items-center gap-6">
          <a href={anchor("benefits")} className={link}>Преимущества</a>
          <div ref={ref} className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
            <button type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open}
              className={`${link} inline-flex items-center gap-1 ${open ? "text-gold" : ""}`}>
              Услуги <ChevronDown className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} />
            </button>
            {open && (
              <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 w-80">
                <div className="rounded-xl border border-gold/20 bg-background/95 backdrop-blur shadow-gold p-2">
                  {SERVICES.map((s) => (
                    <Link key={s.slug} to={`/uslugi/${s.slug}`} onClick={() => setOpen(false)}
                      className="flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 hover:bg-gold/10 transition-colors">
                      <span className="font-body text-sm font-medium text-foreground">{s.title}</span>
                      <span className="font-body text-xs text-gold whitespace-nowrap">{s.price}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
          <a href={anchor("about")} className={link}>О нас</a>
          <a href={anchor("gallery")} className={link}>Результаты</a>
          <a href="tel:89642423000" className="font-body text-sm text-gold border border-gold/40 px-4 py-2 rounded-lg hover:bg-gold/10 transition-colors">
            8 (964) 242-30-00
          </a>
        </div>

        {/* Телефон: кнопка звонка + меню */}
        <div className="flex md:hidden items-center gap-2">
          <a href="tel:89642423000" aria-label="Позвонить" className="w-11 h-11 rounded-full border border-gold/40 flex items-center justify-center text-gold">
            <Phone className="w-5 h-5" />
          </a>
          <button type="button" onClick={() => setMobile(true)} aria-label="Открыть меню"
            className="w-11 h-11 rounded-full border border-gold/40 flex items-center justify-center text-primary-foreground">
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {mobile && (
        <div className="fixed inset-0 z-50 md:hidden bg-foreground/95 backdrop-blur overflow-y-auto">
          <div className="container mx-auto px-6 py-4 flex items-center justify-between">
            <span className="font-heading text-xl font-semibold text-primary-foreground"><span className="text-gold">Белка</span>Clean</span>
            <button type="button" onClick={() => setMobile(false)} aria-label="Закрыть меню"
              className="w-11 h-11 rounded-full border border-gold/40 flex items-center justify-center text-primary-foreground">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="container mx-auto px-6 pb-10">
            <p className="font-body text-xs tracking-[0.3em] uppercase text-gold mt-4 mb-2">Услуги</p>
            {SERVICES.map((s) => (
              <Link key={s.slug} to={`/uslugi/${s.slug}`} onClick={() => setMobile(false)}
                className="flex items-center justify-between py-3 border-b border-primary-foreground/10">
                <span className="font-body text-base text-primary-foreground">{s.title}</span>
                <span className="font-body text-xs text-gold">{s.price}</span>
              </Link>
            ))}
            <div className="mt-6 space-y-1">
              {[["benefits", "Преимущества"], ["about", "О нас"], ["gallery", "Результаты"]].map(([id, label]) => (
                <a key={id} href={anchor(id)} onClick={() => setMobile(false)}
                  className="block py-3 font-body text-base text-primary-foreground/80">{label}</a>
              ))}
            </div>
            <a href="tel:89642423000" className="mt-6 block text-center gradient-gold text-primary-foreground font-body font-semibold py-4 rounded-lg">
              Позвонить: 8 (964) 242-30-00
            </a>
            <a href="https://t.me/BelkaAnny89" target="_blank" rel="noopener noreferrer"
              className="mt-3 block text-center border border-gold/50 text-primary-foreground font-body py-4 rounded-lg">
              Написать в Telegram
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default SiteNav;
