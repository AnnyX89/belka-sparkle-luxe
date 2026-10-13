import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import logo from "@/assets/belkaclean-logo.jpg";
import { SERVICES } from "@/data/services";

/** Шапка сайта: «Услуги» раскрывает плашку со списком направлений (у каждого своя страница) */
const SiteNav = ({ onHome = true }: { onHome?: boolean }) => {
  const [open, setOpen] = useState(false);
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
      </div>
    </nav>
  );
};

export default SiteNav;
