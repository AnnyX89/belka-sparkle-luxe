import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Check, ShieldCheck, Camera, Clock, ArrowLeft } from "lucide-react";
import SiteNav from "@/components/SiteNav";
import Footer from "@/components/Footer";
import ChatBot, { openBooking } from "@/components/ChatBot";
import NotFound from "@/pages/NotFound";
import { GUARANTEE, SERVICES, findService } from "@/data/services";

const setMeta = (name: string, content: string) => {
  let el = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.name = name;
    document.head.appendChild(el);
  }
  el.content = content;
};

/** Страница направления: оффер, что входит, цены «от», гарантия, кнопка расчёта (калькулятор с этой услугой) */
const ServicePage = () => {
  const { slug } = useParams();
  const service = findService(slug);

  useEffect(() => {
    if (!service) return;
    document.title = service.seoTitle;
    setMeta("description", service.seoDescription);
    window.scrollTo(0, 0);
  }, [service]);

  if (!service) return <NotFound />;
  const others = SERVICES.filter((s) => s.slug !== service.slug);

  return (
    <div className="min-h-screen bg-background">
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={service.hero} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/75 via-foreground/55 to-foreground/80" />
        </div>
        <SiteNav onHome={false} />
        <div className="relative z-10 container mx-auto px-6 pt-28 pb-16 max-w-4xl">
          <Link to="/#services" className="inline-flex items-center gap-1.5 font-body text-sm text-primary-foreground/70 hover:text-gold mb-6">
            <ArrowLeft className="w-4 h-4" /> Все услуги
          </Link>
          <span className="block text-gold font-body text-sm tracking-[0.3em] uppercase mb-4">{service.title} · {service.price}</span>
          <h1 className="font-heading text-4xl md:text-6xl font-semibold text-primary-foreground leading-tight mb-6">{service.offer}</h1>
          <p className="font-body text-lg text-primary-foreground/85 max-w-2xl leading-relaxed mb-8">{service.subtitle}</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button type="button" onClick={() => openBooking(service.calcIdx)}
              className="gradient-gold text-primary-foreground font-body font-semibold px-8 py-4 rounded-lg text-lg shadow-gold hover:opacity-90 transition-opacity">
              Рассчитать стоимость
            </button>
            <a href="https://t.me/BelkaAnny89" target="_blank" rel="noopener noreferrer"
              className="border border-gold/50 text-primary-foreground/90 font-body px-8 py-4 rounded-lg text-lg hover:bg-gold/10 transition-colors text-center">
              Прислать фото в Telegram
            </a>
          </div>
        </div>
      </section>

      <section className="py-20 bg-ivory">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-10 max-w-6xl">
          <div>
            <h2 className="font-heading text-3xl font-semibold text-foreground mb-6">Что входит</h2>
            <ul className="space-y-3">
              {service.includes.map((i) => (
                <li key={i} className="flex gap-3 font-body text-foreground/90">
                  <Check className="w-5 h-5 text-gold shrink-0 mt-0.5" /> {i}
                </li>
              ))}
            </ul>
            <h3 className="font-heading text-xl font-semibold text-foreground mt-10 mb-4">Кому подходит</h3>
            <ul className="space-y-2">
              {service.forWhom.map((i) => (
                <li key={i} className="font-body text-muted-foreground">— {i}</li>
              ))}
            </ul>
          </div>
          <div className="bg-background rounded-2xl border border-border p-6 md:p-8 h-fit">
            <h2 className="font-heading text-3xl font-semibold text-foreground mb-6">Цены</h2>
            <div className="divide-y divide-border">
              {service.prices.map((p) => (
                <div key={p.name} className="flex justify-between gap-4 py-3 font-body">
                  <span className="text-foreground/90">{p.name}</span>
                  <span className="text-gold font-semibold whitespace-nowrap">{p.price}</span>
                </div>
              ))}
            </div>
            <p className="font-body text-xs text-muted-foreground mt-4 leading-relaxed">
              Стоимость зависит от степени загрязнения. Точная цена — при оценке по фото или видео. Минимальный заказ — 5 000 ₽.
            </p>
            <button type="button" onClick={() => openBooking(service.calcIdx)}
              className="w-full mt-6 gradient-gold text-primary-foreground font-body font-semibold py-3 rounded-lg shadow-gold hover:opacity-90 transition-opacity">
              Посчитать для своей квартиры
            </button>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <h2 className="font-heading text-3xl font-semibold text-foreground mb-2">До и после</h2>
          <p className="font-body text-muted-foreground mb-8">Реальная работа нашей команды</p>
          <img src={service.image} alt={`${service.title}: до и после`} loading="lazy"
            className="mx-auto max-h-[560px] w-auto rounded-2xl shadow-gold object-contain" />
        </div>
      </section>

      <section className="pb-20">
        <div className="container mx-auto px-6 grid sm:grid-cols-3 gap-6 max-w-6xl">
          {[
            { icon: ShieldCheck, title: "Гарантия результата", text: GUARANTEE },
            { icon: Camera, title: "Цена до начала работ", text: "Пришлите фото или видео — назовём стоимость заранее, без сюрпризов на месте." },
            { icon: Clock, title: "Всё своё", text: "Привозим профессиональную химию и инвентарь. От вас — только доступ в квартиру." },
          ].map((b) => (
            <div key={b.title} className="rounded-2xl border border-gold/20 p-6 bg-background">
              <b.icon className="w-8 h-8 text-gold mb-4" />
              <h3 className="font-heading text-lg font-semibold mb-2">{b.title}</h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">{b.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="pb-24">
        <div className="container mx-auto px-6 max-w-6xl">
          <h2 className="font-heading text-2xl font-semibold mb-6">Другие услуги</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {others.map((s) => (
              <Link key={s.slug} to={`/uslugi/${s.slug}`}
                className="rounded-xl border border-border p-5 hover:border-gold/40 hover:shadow-gold transition-all">
                <p className="font-heading font-semibold">{s.title}</p>
                <p className="font-body text-sm text-gold mt-1">{s.price}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <ChatBot />
    </div>
  );
};

export default ServicePage;
