import { useEffect, useState } from "react";
import { X, Phone, CheckCircle2, Squirrel } from "lucide-react";
import logo from "@/assets/belkaclean-logo.jpg";

/** Прайс как в CRM (src/lib/priceList.ts в belka-srm) — всё «от», зависит от степени загрязнения */
const services = [
  { label: "Поддерживающая уборка", pricePerM2: 100 },
  { label: "Генеральная уборка", pricePerM2: 150 },
  { label: "Уборка после ремонта", pricePerM2: 200 },
  { label: "Мойка окон и балконов", pricePerM2: 0 },
  { label: "Химчистка мебели", pricePerM2: 0 },
  { label: "Мойка фасадов и вывесок", pricePerM2: 130 },
  { label: "Бытовая техника внутри", pricePerM2: 0 },
  { label: "Уборка офисов", pricePerM2: 120 },
  { label: "Кухонный гарнитур", pricePerM2: 0 },
];
const MIN_ORDER = 5000;

type Extra = { id: string; label: string; price: number; unit: string; qty?: boolean; min?: number };
const CLEANING_EXTRAS: Extra[] = [
  { id: "kitchen", label: "Кухонный гарнитур снаружи", price: 2500, unit: "шт" },
  { id: "drawers", label: "Шкафы и ящики внутри", price: 150, unit: "ящик", qty: true },
  { id: "oven", label: "Духовка", price: 1200, unit: "шт" },
  { id: "fridge", label: "Холодильник", price: 1200, unit: "шт" },
  { id: "microwave", label: "Микроволновка", price: 350, unit: "шт" },
  { id: "sash", label: "Окна", price: 400, unit: "створка", qty: true },
  { id: "balcony", label: "Балкон (пол, стены)", price: 2500, unit: "шт" },
];
const WINDOW_EXTRAS: Extra[] = [
  { id: "sash", label: "Створки окон", price: 400, unit: "створка", qty: true },
  { id: "balcony_glass", label: "Остекление балкона", price: 500, unit: "створка", qty: true, min: 3000 },
  { id: "panoramic", label: "Панорамное остекление", price: 1000, unit: "секция", qty: true },
  { id: "balcony", label: "Балкон (пол, стены)", price: 2500, unit: "шт" },
  { id: "mosquito", label: "Москитные сетки", price: 100, unit: "шт", qty: true },
];
const FURNITURE_EXTRAS: Extra[] = [
  { id: "sofa2", label: "Диван 2-местный", price: 4000, unit: "шт", qty: true },
  { id: "sofa_corner", label: "Диван угловой", price: 6000, unit: "шт", qty: true },
  { id: "armchair", label: "Кресло", price: 2000, unit: "шт", qty: true },
  { id: "chair", label: "Стул", price: 500, unit: "шт", qty: true },
  { id: "mattress1", label: "Матрас односпальный", price: 2000, unit: "шт", qty: true },
  { id: "mattress2", label: "Матрас двуспальный", price: 3000, unit: "шт", qty: true },
  { id: "carpet", label: "Ковёр, палас", price: 450, unit: "м²", qty: true },
  { id: "drying", label: "Сушка после химчистки", price: 1000, unit: "шт", qty: true },
];
const FACADE_EXTRAS: Extra[] = [
  { id: "panoramic", label: "Витражи и витрины", price: 1000, unit: "секция", qty: true },
];
const APPLIANCE_EXTRAS: Extra[] = [
  { id: "oven", label: "Духовой шкаф", price: 1200, unit: "шт", qty: true },
  { id: "fridge", label: "Холодильник", price: 1200, unit: "шт", qty: true },
  { id: "microwave", label: "Микроволновка", price: 350, unit: "шт", qty: true },
];
const KITCHEN_EXTRAS: Extra[] = [
  { id: "kitchen", label: "Гарнитур снаружи", price: 2500, unit: "шт" },
  { id: "drawers", label: "Шкафы и ящики внутри", price: 150, unit: "ящик", qty: true },
  { id: "oven", label: "Духовка", price: 1200, unit: "шт" },
  { id: "fridge", label: "Холодильник", price: 1200, unit: "шт" },
];
const extrasFor = (idx: number) => (idx === 3 ? WINDOW_EXTRAS : idx === 4 ? FURNITURE_EXTRAS : idx === 5 ? FACADE_EXTRAS : idx === 6 ? APPLIANCE_EXTRAS : idx === 8 ? KITCHEN_EXTRAS : CLEANING_EXTRAS);

const WEBHOOK_URL = "https://crm.belkaclean74.ru/api/site-lead";

/** Открыть форму заявки из любого места сайта: window.dispatchEvent(new Event(OPEN_BOOKING_EVENT)) */
export const OPEN_BOOKING_EVENT = "belka:open-booking";
/** Открыть калькулятор сразу с нужной услугой (индекс в services) */
export const openBooking = (serviceIdx?: number) =>
  window.dispatchEvent(new CustomEvent(OPEN_BOOKING_EVENT, { detail: { serviceIdx } }));

const BotMessage = ({ text }: { text: string }) => (
  <div className="flex gap-2">
    <div className="w-7 h-7 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0 mt-0.5">
      <Squirrel className="w-3.5 h-3.5 text-gold" />
    </div>
    <div className="bg-cream rounded-2xl rounded-tl-sm px-4 py-3 font-body text-sm text-foreground leading-relaxed">
      {text}
    </div>
  </div>
);

const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<"calculator" | "booking" | "submitted">("calculator");
  const [serviceIdx, setServiceIdx] = useState(0);
  const [area, setArea] = useState(80);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [sending, setSending] = useState(false);

  const [picked, setPicked] = useState<Record<string, number>>({});
  const hasArea = services[serviceIdx].pricePerM2 > 0;
  const extras = extrasFor(serviceIdx);
  const extrasSum = extras.reduce((s, e) => {
    const q = picked[e.id] || 0;
    return q > 0 ? s + Math.max(e.price * q, e.min ?? 0) : s;
  }, 0);
  const rawPrice = (hasArea ? services[serviceIdx].pricePerM2 * area : 0) + extrasSum;
  const price = rawPrice > 0 ? Math.max(rawPrice, MIN_ORDER) : 0;
  const pickedLabels = extras.filter((e) => (picked[e.id] || 0) > 0)
    .map((e) => (e.qty ? `${e.label} × ${picked[e.id]}` : e.label));
  const summary = [services[serviceIdx].label + (hasArea ? `, ${area} м²` : ""), ...pickedLabels].join(" + ");
  const setQty = (id: string, q: number) => setPicked((p) => ({ ...p, [id]: Math.max(0, q) }));

  useEffect(() => {
    const openBooking = (e: Event) => {
      const idx = (e as CustomEvent<{ serviceIdx?: number }>).detail?.serviceIdx;
      if (typeof idx === "number") { setServiceIdx(idx); setPicked({}); }
      setStep((s) => (s === "submitted" ? "calculator" : s));
      setOpen(true);
    };
    window.addEventListener(OPEN_BOOKING_EVENT, openBooking);
    return () => window.removeEventListener(OPEN_BOOKING_EVENT, openBooking);
  }, []);

  const reset = () => {
    setStep("calculator");
    setServiceIdx(0);
    setArea(80);
    setPicked({});
    setName("");
    setPhone("");
  };

  const submit = async () => {
    if (!phone.trim()) return;
    setSending(true);
    try {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          service: summary,
          area: hasArea ? area : undefined,
          estimatedPrice: price,
        }),
      });
    } catch {
      // ignore network errors — the lead is still confirmed to the client
    }
    setSending(false);
    setStep("submitted");
  };

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className={`fixed bottom-6 right-6 z-50 flex items-center justify-center gap-2 rounded-full gradient-gold text-white border-2 border-white shadow-[0_8px_32px_hsl(38_60%_52%/0.45)] hover:scale-105 transition-transform ${open ? "w-16 h-16" : "pl-2 pr-6 py-2"}`}
        aria-label="Открыть калькулятор"
      >
        {open ? (
          <X className="w-8 h-8" />
        ) : (
          <>
            <img src={logo} alt="" className="w-12 h-12 rounded-full object-cover border-2 border-white" />
            <span className="font-body text-base font-bold uppercase tracking-wide">Заказать</span>
          </>
        )}
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] bg-background rounded-2xl shadow-2xl border border-border overflow-hidden animate-fade-in-up">
          <div className="gradient-gold p-4 flex items-center gap-3">
            <img
              src={logo}
              alt="Белка"
              className="w-10 h-10 rounded-full object-cover border border-primary-foreground/20"
            />
            <div>
              <p className="font-heading font-semibold text-primary-foreground">БелкаClean</p>
              <p className="font-body text-xs text-primary-foreground/80">Калькулятор стоимости</p>
            </div>
          </div>

          <div className="p-5 max-h-[min(420px,55vh)] overflow-y-auto">
            {step === "calculator" && (
              <div className="space-y-5">
                <BotMessage text="Привет! 🐿️ Рассчитайте стоимость клининга прямо сейчас:" />

                <div>
                  <label className="font-body text-xs text-muted-foreground mb-1.5 block">Тип услуги</label>
                  <select
                    value={serviceIdx}
                    onChange={(e) => { setServiceIdx(Number(e.target.value)); setPicked({}); }}
                    className="w-full font-body text-sm px-4 py-3 rounded-lg border border-border bg-background focus:border-gold focus:outline-none appearance-none"
                  >
                    {services.map((s, i) => (
                      <option key={s.label} value={i}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                </div>

                {hasArea && <div>
                  <label className="font-body text-xs text-muted-foreground mb-1.5 flex justify-between">
                    <span>Площадь</span>
                    <span className="text-gold font-semibold">{area} м²</span>
                  </label>
                  <input
                    type="range"
                    min={30}
                    max={serviceIdx === 5 || serviceIdx === 7 ? 1000 : 300}
                    step={5}
                    value={area}
                    onChange={(e) => setArea(Number(e.target.value))}
                    className="w-full accent-[hsl(38,60%,52%)] h-2 rounded-lg"
                  />
                  <div className="flex justify-between font-body text-[10px] text-muted-foreground mt-1">
                    <span>30 м²</span>
                    <span>{serviceIdx === 5 || serviceIdx === 7 ? 1000 : 300} м²</span>
                  </div>
                </div>}

                <div>
                  <label className="font-body text-xs text-muted-foreground mb-1.5 block">
                    {hasArea ? "Дополнительно" : "Что нужно"}
                  </label>
                  <div className="space-y-1.5">
                    {extras.map((e) => {
                      const q = picked[e.id] || 0;
                      return (
                        <div key={e.id} className="flex items-center gap-2 min-h-8">
                          <input type="checkbox" id={`x-${e.id}`} checked={q > 0}
                            onChange={(ev) => setQty(e.id, ev.target.checked ? 1 : 0)}
                            className="w-4 h-4 accent-[hsl(38,60%,52%)]" />
                          <label htmlFor={`x-${e.id}`} className="flex-1 font-body text-sm cursor-pointer leading-tight">
                            {e.label}
                            <span className="text-[11px] text-muted-foreground"> · от {e.price.toLocaleString("ru-RU")} ₽/{e.unit}</span>
                          </label>
                          {q > 0 && e.qty && (
                            <input type="number" min={1} value={q} aria-label={`Количество: ${e.label}`}
                              onChange={(ev) => setQty(e.id, Math.max(1, Number(ev.target.value) || 1))}
                              className="w-16 font-body text-sm px-2 py-1 rounded-md border border-border bg-background focus:border-gold focus:outline-none" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="bg-cream rounded-xl p-4 text-center">
                  <p className="font-body text-xs text-muted-foreground mb-1">Примерная стоимость</p>
                  <p className="font-heading text-3xl font-semibold text-gold">
                    {price > 0 ? `от ${price.toLocaleString("ru-RU")} ₽` : "отметьте, что нужно"}
                  </p>
                  <p className="font-body text-[10px] text-muted-foreground mt-1 leading-snug">{summary}</p>
                  <p className="font-body text-[10px] text-muted-foreground mt-1 leading-snug">
                    {rawPrice > 0 && rawPrice < MIN_ORDER ? `Минимальный заказ — ${MIN_ORDER.toLocaleString("ru-RU")} ₽. ` : ""}
                    Зависит от степени загрязнения. Точная стоимость — при оценке по фото или видео.
                  </p>
                </div>

              </div>
            )}

            {step === "booking" && (
              <div className="space-y-4">
                <BotMessage
                  text={`Отлично! ${summary} — от ${price.toLocaleString("ru-RU")} ₽. Оставьте контакт, и Анна свяжется с вами:`}
                />

                <div>
                  <label className="font-body text-xs text-muted-foreground mb-1.5 block">Ваше имя</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Имя"
                    className="w-full font-body text-sm px-4 py-3 rounded-lg border border-border bg-background focus:border-gold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-body text-xs text-muted-foreground mb-1.5 block">Телефон *</label>
                  <div className="flex gap-2">
                    <div className="flex items-center gap-1.5 px-3 border border-border rounded-lg">
                      <Phone className="w-3.5 h-3.5 text-muted-foreground" />
                    </div>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+7 (___) ___-__-__"
                      className="flex-1 font-body text-sm px-4 py-3 rounded-lg border border-border bg-background focus:border-gold focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  onClick={submit}
                  disabled={!phone.trim() || sending}
                  className="w-full gradient-gold text-primary-foreground font-body font-semibold py-3 rounded-lg shadow-gold hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {sending ? "Отправка…" : "Отправить заявку"}
                </button>

                <button
                  onClick={() => setStep("calculator")}
                  className="w-full text-center font-body text-sm text-muted-foreground hover:text-gold transition-colors"
                >
                  ← Назад к калькулятору
                </button>
              </div>
            )}

            {step === "submitted" && (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8 text-gold" />
                </div>
                <h3 className="font-heading text-xl font-semibold text-foreground">Спасибо!</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  Ваша заявка принята, Анна свяжется с вами в течение 15 минут
                </p>
                <button onClick={reset} className="font-body text-sm text-gold hover:underline">
                  Рассчитать ещё
                </button>
              </div>
            )}
          </div>

          {step === "calculator" && (
            <div className="border-t border-border bg-background p-4 space-y-2">
              <button
                onClick={() => setStep("booking")}
                disabled={price === 0}
                className="w-full disabled:opacity-50 gradient-gold text-primary-foreground font-body font-semibold py-3 rounded-lg shadow-gold hover:opacity-90 transition-opacity"
              >
                {price > 0 ? `Забронировать · от ${price.toLocaleString("ru-RU")} ₽` : "Забронировать"}
              </button>
              <a
                href="https://t.me/BelkaAnny89"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center font-body text-sm text-gold hover:underline"
              >
                💬 Написать в Telegram
              </a>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ChatBot;
