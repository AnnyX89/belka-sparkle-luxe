import { useEffect, useState } from "react";
import { Star, Quote } from "lucide-react";

interface Review { name: string; text: string; service: string; date: string }
interface ReviewsData { rating: number; count: number; source: string; reviews: Review[] }

const AVITO_PROFILE = "https://www.avito.ru/user/0b244228bc17ff1c2102c8ccb30d1897/profile";
const PAGE = 6;

/** Настоящие отзывы с Авито: /reviews.json обновляет сервер раз в день (avito_reviews_export.py) */
/** На странице услуги: сначала отзывы о ней (по объявлению и тексту), потом — о похожих, потом остальные */
const ReviewsSection = ({ match, related }: { match?: RegExp; related?: RegExp }) => {
  const [data, setData] = useState<ReviewsData | null>(null);
  const [shown, setShown] = useState(PAGE);
  useEffect(() => {
    fetch("/reviews.json", { cache: "no-cache" }).then(r => (r.ok ? r.json() : null)).then(setData).catch(() => setData(null));
  }, []);
  if (!data || data.reviews.length === 0) return null;
  const score = (r: Review) => {
    const t = `${r.service} ${r.text}`;
    return match?.test(t) ? 2 : related?.test(t) ? 1 : 0;
  };
  const sorted = match ? [...data.reviews].sort((a, b) => score(b) - score(a)) : data.reviews;
  const about = match ? data.reviews.filter(r => match.test(`${r.service} ${r.text}`)).length : 0;
  const list = sorted.slice(0, shown);
  return (
    <section id="reviews" className="py-24 bg-ivory">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-12">
          <span className="text-gold font-body text-sm tracking-[0.3em] uppercase">Отзывы</span>
          <div className="w-16 h-px gold-line mx-auto mt-4 mb-6" />
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-foreground">
            {about >= 3 ? "Отзывы об этой услуге" : "Что говорят клиенты"}
          </h2>
          <div className="mt-5 inline-flex items-center gap-3 rounded-full border border-gold/30 bg-background px-5 py-2.5">
            <span className="font-heading text-2xl font-semibold text-gold">{data.rating.toFixed(1)}</span>
            <span className="flex">{[0, 1, 2, 3, 4].map(i => <Star key={i} className="w-4 h-4 fill-gold text-gold" />)}</span>
            <span className="font-body text-sm text-muted-foreground">{data.count} отзывов на {data.source}</span>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map((r, i) => (
            <figure key={i} className="bg-background rounded-xl border border-border p-6 flex flex-col">
              <Quote className="w-6 h-6 text-gold/50 mb-3" />
              <blockquote className="font-body text-sm text-foreground/90 leading-relaxed flex-1">{r.text}</blockquote>
              <figcaption className="mt-5 flex items-center justify-between gap-2">
                <span className="font-heading font-semibold">{r.name}</span>
                <span className="flex">{[0, 1, 2, 3, 4].map(k => <Star key={k} className="w-3.5 h-3.5 fill-gold text-gold" />)}</span>
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          {shown < sorted.length && (
            <button type="button" onClick={() => setShown(n => n + PAGE)}
              className="border border-gold/50 text-foreground font-body px-6 py-3 rounded-lg hover:bg-gold/10 transition-colors">
              Показать ещё отзывы
            </button>
          )}
          <a href={AVITO_PROFILE} target="_blank" rel="noopener noreferrer" className="font-body text-sm text-gold hover:underline">
            Все {data.count} отзывов на Авито →
          </a>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
