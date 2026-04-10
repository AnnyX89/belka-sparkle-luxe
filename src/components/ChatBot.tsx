import { useState } from "react";
import { X, Send, MessageCircle, Phone, CheckCircle2 } from "lucide-react";
import belkaLogo from "@/assets/belkaclean-logo.jpg";

type Step = "calculator" | "booking" | "submitted";

const serviceOptions = [
  { label: "Генеральная уборка", pricePerM2: 150 },
  { label: "Послеремонтный клининг", pricePerM2: 200 },
  { label: "Премиум-поддержание", pricePerM2: 120 },
];

const WEBHOOK_URL = "http://205.196.80.138:8000/webhook";

const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("calculator");
  const [serviceIdx, setServiceIdx] = useState(0);
  const [area, setArea] = useState(80);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const price = serviceOptions[serviceIdx].pricePerM2 * area;

  const reset = () => {
    setStep("calculator");
    setServiceIdx(0);
    setArea(80);
    setName("");
    setPhone("");
  };

  const handleSubmit = async () => {
    if (!phone.trim()) return;
    setSubmitting(true);
    try {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          service: serviceOptions[serviceIdx].label,
          area,
          estimatedPrice: price,
        }),
      });
    } catch {
      // silently continue — show success regardless so user isn't stuck
    }
    setSubmitting(false);
    setStep("submitted");
  };

  return (
    <>
      {/* FAB */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full gradient-gold shadow-gold flex items-center justify-center hover:scale-105 transition-transform"
        aria-label="Открыть калькулятор"
      >
        {open ? (
          <X className="w-6 h-6 text-primary-foreground" />
        ) : (
          <img src={belkaLogo} alt="Белка" className="w-10 h-10 rounded-full object-cover" />
        )}
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] bg-background rounded-2xl shadow-2xl border border-border overflow-hidden animate-fade-in-up">
          {/* Header */}
          <div className="gradient-gold p-4 flex items-center gap-3">
            <img src={belkaLogo} alt="Белка" className="w-10 h-10 rounded-full object-cover border border-primary-foreground/20" />
            <div>
              <p className="font-heading font-semibold text-primary-foreground">БелкаClean</p>
              <p className="font-body text-xs text-primary-foreground/80">Калькулятор стоимости</p>
            </div>
          </div>

          {/* Body */}
          <div className="p-5 max-h-[420px] overflow-y-auto">
            {step === "calculator" && (
              <div className="space-y-5">
                <BotBubble text="Привет! 🐿️ Рассчитайте стоимость клининга прямо сейчас:" />

                {/* Service select */}
                <div>
                  <label className="font-body text-xs text-muted-foreground mb-1.5 block">Тип услуги</label>
                  <select
                    value={serviceIdx}
                    onChange={(e) => setServiceIdx(Number(e.target.value))}
                    className="w-full font-body text-sm px-4 py-3 rounded-lg border border-border bg-background focus:border-gold focus:outline-none appearance-none"
                  >
                    {serviceOptions.map((s, i) => (
                      <option key={s.label} value={i}>{s.label}</option>
                    ))}
                  </select>
                </div>

                {/* Area slider */}
                <div>
                  <label className="font-body text-xs text-muted-foreground mb-1.5 flex justify-between">
                    <span>Площадь</span>
                    <span className="text-gold font-semibold">{area} м²</span>
                  </label>
                  <input
                    type="range"
                    min={30}
                    max={300}
                    step={5}
                    value={area}
                    onChange={(e) => setArea(Number(e.target.value))}
                    className="w-full accent-[hsl(38,60%,52%)] h-2 rounded-lg"
                  />
                  <div className="flex justify-between font-body text-[10px] text-muted-foreground mt-1">
                    <span>30 м²</span>
                    <span>300 м²</span>
                  </div>
                </div>

                {/* Price */}
                <div className="bg-cream rounded-xl p-4 text-center">
                  <p className="font-body text-xs text-muted-foreground mb-1">Примерная стоимость</p>
                  <p className="font-heading text-3xl font-semibold text-gold">
                    {price.toLocaleString("ru-RU")} ₽
                  </p>
                  <p className="font-body text-[10px] text-muted-foreground mt-1">
                    {serviceOptions[serviceIdx].label} · {area} м²
                  </p>
                </div>

                <button
                  onClick={() => setStep("booking")}
                  className="w-full gradient-gold text-primary-foreground font-body font-semibold py-3 rounded-lg shadow-gold hover:opacity-90 transition-opacity"
                >
                  Забронировать уборку
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

            {step === "booking" && (
              <div className="space-y-4">
                <BotBubble text={`Отлично! ${serviceOptions[serviceIdx].label}, ${area} м² — ≈ ${price.toLocaleString("ru-RU")} ₽. Оставьте контакт, и Аня свяжется с вами:`} />

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
                  onClick={handleSubmit}
                  disabled={!phone.trim() || submitting}
                  className="w-full gradient-gold text-primary-foreground font-body font-semibold py-3 rounded-lg shadow-gold hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {submitting ? "Отправка…" : (
                    <>
                      <Send className="w-4 h-4" />
                      Отправить заявку
                    </>
                  )}
                </button>

                <button
                  onClick={() => setStep("calculator")}
                  className="w-full font-body text-xs text-muted-foreground hover:text-foreground transition-colors"
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
                <h3 className="font-heading text-xl font-semibold text-foreground">
                  Спасибо!
                </h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  Ваша заявка принята, Аня свяжется с вами в течение 15 минут
                </p>
                <button
                  onClick={reset}
                  className="font-body text-sm text-gold hover:underline"
                >
                  Рассчитать ещё
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

const BotBubble = ({ text }: { text: string }) => (
  <div className="flex gap-2">
    <div className="w-7 h-7 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0 mt-0.5">
      <MessageCircle className="w-3.5 h-3.5 text-gold" />
    </div>
    <p className="font-body text-sm text-foreground bg-cream rounded-xl rounded-tl-none px-4 py-3 leading-relaxed">
      {text}
    </p>
  </div>
);

export default ChatBot;
