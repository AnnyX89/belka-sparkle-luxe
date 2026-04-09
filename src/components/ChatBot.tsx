import { useState } from "react";
import { X, Send, MessageCircle, CalendarDays } from "lucide-react";
import belkaIcon from "@/assets/belka-icon.png";

type Step = "welcome" | "service" | "area" | "result" | "booking";

const serviceOptions = [
  { label: "Послестроительный клининг", price: 200 },
  { label: "Генеральная уборка", price: 150 },
  { label: "Химчистка мебели", price: 1500, flat: true },
  { label: "Мойка окон", price: 400, flat: true },
];

const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("welcome");
  const [selectedService, setSelectedService] = useState<typeof serviceOptions[0] | null>(null);
  const [area, setArea] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");

  const reset = () => {
    setStep("welcome");
    setSelectedService(null);
    setArea("");
    setBookingDate("");
    setBookingTime("");
  };

  const calculatePrice = () => {
    if (!selectedService) return 0;
    if (selectedService.flat) return selectedService.price;
    return selectedService.price * (parseInt(area) || 0);
  };

  return (
    <>
      {/* FAB */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full gradient-gold shadow-gold flex items-center justify-center hover:scale-105 transition-transform"
        aria-label="Открыть чат"
      >
        {open ? (
          <X className="w-6 h-6 text-primary-foreground" />
        ) : (
          <img src={belkaIcon} alt="Белка" className="w-10 h-10 rounded-full" />
        )}
      </button>

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-48px)] bg-background rounded-2xl shadow-2xl border border-border overflow-hidden animate-fade-in-up">
          {/* Header */}
          <div className="gradient-gold p-4 flex items-center gap-3">
            <img src={belkaIcon} alt="Белка" className="w-10 h-10 rounded-full bg-background/20" />
            <div>
              <p className="font-heading font-semibold text-primary-foreground">БелкаClean</p>
              <p className="font-body text-xs text-primary-foreground/80">Онлайн-помощник</p>
            </div>
          </div>

          {/* Body */}
          <div className="p-4 h-[380px] overflow-y-auto space-y-4">
            {step === "welcome" && (
              <>
                <BotMessage text="Привет! 🐿️ Я помогу вам рассчитать стоимость клининга. Выберите услугу:" />
                <div className="space-y-2">
                  {serviceOptions.map((s) => (
                    <button
                      key={s.label}
                      onClick={() => { setSelectedService(s); setStep(s.flat ? "result" : "area"); }}
                      className="w-full text-left font-body text-sm px-4 py-3 rounded-lg border border-border hover:border-gold/40 hover:bg-gold/5 transition-colors"
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setStep("booking")}
                  className="w-full flex items-center justify-center gap-2 font-body text-sm px-4 py-3 rounded-lg bg-cream text-foreground hover:bg-gold/10 transition-colors"
                >
                  <CalendarDays className="w-4 h-4" />
                  Записаться на уборку
                </button>
              </>
            )}

            {step === "area" && (
              <>
                <BotMessage text={`Вы выбрали: ${selectedService?.label}. Укажите площадь в м²:`} />
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    placeholder="Например, 80"
                    className="flex-1 font-body text-sm px-4 py-3 rounded-lg border border-border bg-background focus:border-gold focus:outline-none"
                  />
                  <button
                    onClick={() => area && setStep("result")}
                    className="gradient-gold text-primary-foreground p-3 rounded-lg"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </>
            )}

            {step === "result" && (
              <>
                <BotMessage
                  text={
                    selectedService?.flat
                      ? `${selectedService.label}: от ${selectedService.price} ₽. Для точного расчёта отправьте видеообзор!`
                      : `${selectedService?.label}, ${area} м²: ≈ ${calculatePrice().toLocaleString("ru-RU")} ₽. Для точного расчёта отправьте видеообзор!`
                  }
                />
                <div className="space-y-2">
                  <a
                    href="https://t.me/BelkaAnny89"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center font-body text-sm px-4 py-3 rounded-lg gradient-gold text-primary-foreground"
                  >
                    📹 Отправить видеообзор в Telegram
                  </a>
                  <a
                    href="https://t.me/BelkaAnny89"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center font-body text-sm px-4 py-3 rounded-lg border border-gold/30 text-gold hover:bg-gold/5 transition-colors"
                  >
                    💬 Написать в Telegram @BelkaAnny89
                  </a>
                  <button
                    onClick={reset}
                    className="w-full font-body text-xs text-muted-foreground hover:text-foreground transition-colors mt-2"
                  >
                    ← Начать сначала
                  </button>
                </div>
              </>
            )}

            {step === "booking" && (
              <>
                <BotMessage text="Выберите удобную дату и время для уборки:" />
                <div className="space-y-3">
                  <input
                    type="date"
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="w-full font-body text-sm px-4 py-3 rounded-lg border border-border bg-background focus:border-gold focus:outline-none"
                  />
                  <input
                    type="time"
                    value={bookingTime}
                    onChange={(e) => setBookingTime(e.target.value)}
                    className="w-full font-body text-sm px-4 py-3 rounded-lg border border-border bg-background focus:border-gold focus:outline-none"
                  />
                  <a
                    href={`https://t.me/BelkaAnny89?text=${encodeURIComponent(
                      `Здравствуйте! Хочу записаться на уборку: ${bookingDate} в ${bookingTime}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center font-body text-sm px-4 py-3 rounded-lg gradient-gold text-primary-foreground"
                  >
                    Подтвердить запись
                  </a>
                  <button
                    onClick={reset}
                    className="w-full font-body text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    ← Назад
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

const BotMessage = ({ text }: { text: string }) => (
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
