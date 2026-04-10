import { Wrench, Droplets, Users, Shield } from "lucide-react";

const benefits = [
  {
    icon: Wrench,
    title: "Профессиональный арсенал",
    text: "Использование итальянского и немецкого оборудования (Santoemma, Karcher) для глубинной чистки.",
  },
  {
    icon: Droplets,
    title: "Гипоаллергенная химия",
    text: "pH-нейтральные и безопасные составы, которые сохраняют текстуру премиум-материалов.",
  },
  {
    icon: Users,
    title: "Штатные эксперты",
    text: "Обученные клинеры, прошедшие аттестацию по работе с деликатными поверхностями.",
  },
  {
    icon: Shield,
    title: "Материальная ответственность",
    text: "Мы полностью страхуем ваш интерьер и несём ответственность за сохранность каждой детали.",
  },
];

const BenefitsSection = () => {
  return (
    <section id="benefits" className="py-24 bg-cream">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-gold font-body text-sm tracking-[0.3em] uppercase">
            Почему мы
          </span>
          <div className="w-16 h-px gold-line mt-4 mb-6 mx-auto" />
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-foreground">
            Стандарты роскошного клининга от БелкаClean
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {benefits.map((b) => (
            <div
              key={b.title}
              className="bg-background rounded-2xl p-8 border border-border hover:border-gold/30 hover:shadow-gold transition-all duration-300 group"
            >
              <div className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center mb-6 group-hover:bg-gold/20 transition-colors">
                <b.icon className="w-7 h-7 text-gold" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground mb-3">
                {b.title}
              </h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                {b.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
