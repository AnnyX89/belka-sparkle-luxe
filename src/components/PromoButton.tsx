import { useEffect, useState } from "react";
import { Gift, X, Users, Cake, Camera } from "lucide-react";
import { openBooking } from "@/components/ChatBot";

/** Условия — те же, что клиенты получают в сообщениях после уборки и на день рождения (CRM / belka_notify) */
const PROMOS = [
  {
    icon: Users,
    title: "Белка собирает орешки — собирай и ты! 🐿",
    text: [
      "Приводи друзей — 10-я уборка бесплатно. Каждый приведённый друг — 1 орешек 🌰",
      "1 орешек — скидка 10%, 4 орешка — 40%, 10 орешков — 10-я уборка бесплатно 🎁",
      "Другу — скидка 15% на первую уборку от 12 000 ₽. Пусть просто назовёт ваше имя при заказе.",
    ],
  },
  {
    icon: Cake,
    title: "Скидка 15% на день рождения",
    text: ["Дарим скидку 15% на комплексную уборку за неделю до и неделю после вашего дня рождения."],
  },
  {
    icon: Camera,
    title: "Цена заранее — по фото",
    text: ["Пришлите фото или видео — назовём точную стоимость до приезда, без доплат на месте."],
  },
];

/** Плавающая кнопка «Акции» слева внизу (справа — калькулятор) */
const PromoButton = () => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  return (
    <>
      <button type="button" onClick={() => setOpen(true)} aria-label="Акции"
        className="fixed bottom-6 left-6 z-40 flex items-center gap-2 rounded-full gradient-gold text-primary-foreground font-body text-base font-bold uppercase tracking-wide px-6 py-4 shadow-[0_8px_32px_hsl(38_60%_52%/0.45)] border-2 border-white hover:scale-105 transition-transform">
        <span className="absolute inset-0 rounded-full animate-ping bg-gold/40 -z-10" />
        <Gift className="w-5 h-5" /> Акции!
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-foreground/60 backdrop-blur-sm p-4" onClick={() => setOpen(false)}>
          <div role="dialog" aria-modal="true" aria-label="Акции БелкаClean" onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-2xl bg-background border border-gold/30 shadow-2xl">
            <div className="gradient-gold p-5 flex items-center justify-between">
              <div className="flex items-center gap-3 text-primary-foreground">
                <Gift className="w-7 h-7" />
                <p className="font-heading text-2xl font-semibold">Акции БелкаClean</p>
              </div>
              <button type="button" onClick={() => setOpen(false)} aria-label="Закрыть"
                className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-primary-foreground hover:bg-white/30">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5 space-y-4">
              {PROMOS.map((p) => (
                <div key={p.title} className="rounded-xl border border-border p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <p.icon className="w-6 h-6 text-gold shrink-0" />
                    <h3 className="font-heading text-lg font-semibold">{p.title}</h3>
                  </div>
                  {p.text.map((t) => <p key={t} className="font-body text-base text-foreground/85 leading-relaxed mt-1.5">{t}</p>)}
                </div>
              ))}
              <p className="font-body text-base font-semibold text-foreground rounded-lg bg-gold/10 border border-gold/30 px-3 py-2">
                ⚠️ Акции не суммируются — действует одна, самая выгодная для вас.
              </p>
              <p className="font-body text-sm text-muted-foreground">Подробности — по телефону 8 (964) 242-30-00.</p>
              <button type="button" onClick={() => { setOpen(false); openBooking(); }}
                className="w-full gradient-gold text-primary-foreground font-body font-semibold py-3 rounded-lg shadow-gold hover:opacity-90">
                Рассчитать стоимость
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PromoButton;
