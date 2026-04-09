import { Shield, Wrench, CheckCircle } from "lucide-react";

const benefits = [
  {
    icon: Shield,
    title: "Бережный подход",
    description: "Используем только pH-нейтральную химию, безопасную для деликатных покрытий и материалов",
  },
  {
    icon: Wrench,
    title: "Профессиональное оснащение",
    description: "Работаем на оборудовании Santoemma и Kärcher — стандарт европейского клининга",
  },
  {
    icon: CheckCircle,
    title: "Полная гарантия сохранности",
    description: "Гарантируем сохранность всех материалов интерьера. Несём полную ответственность за результат",
  },
];

const BenefitsSection = () => {
  return (
    <section className="py-24 bg-cream">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-gold font-body text-sm tracking-[0.3em] uppercase">
            Почему выбирают нас
          </span>
          <div className="w-16 h-px gold-line mx-auto mt-4 mb-6" />
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-foreground">
            Безупречный результат в каждой детали
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="bg-background rounded-xl p-8 text-center shadow-sm hover:shadow-gold transition-shadow duration-300 border border-border"
            >
              <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-6">
                <benefit.icon className="w-7 h-7 text-gold" />
              </div>
              <h3 className="font-heading text-xl font-semibold text-foreground mb-3">
                {benefit.title}
              </h3>
              <p className="font-body text-muted-foreground leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
