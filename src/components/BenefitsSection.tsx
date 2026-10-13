import { Wrench, Droplets, Users, ShieldCheck } from "lucide-react";

const benefits = [
  {
    icon: Wrench,
    title: "Профессиональное оборудование",
    text: "Итальянские и немецкие машины Santoemma и Karcher — отмывают то, что не берёт обычная уборка.",
  },
  {
    icon: Droplets,
    title: "Безопасная химия",
    text: "Подбираем средства под каждую поверхность: мрамор, дерево, ткань — без разводов и повреждений. Безопасно для детей и питомцев.",
  },
  {
    icon: Users,
    title: "Своя команда",
    text: "Работают проверенные клинеры, а не случайные люди. Я лично присутствую на заказах и контролирую качество.",
  },
  {
    icon: ShieldCheck,
    title: "Гарантия результата",
    text: "Если что-то не устроит — сообщите в течение 24 часов, и мы бесплатно переделаем.",
  },
];

const BenefitsSection = () => {
  return (
    <section id="benefits" className="py-24 bg-cream">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-gold font-body text-sm tracking-[0.3em] uppercase">Почему мы</span>
          <div className="w-16 h-px gold-line mt-4 mb-6 mx-auto" />
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-foreground">
            Почему клиенты возвращаются к нам снова
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
              <h3 className="font-heading text-lg font-semibold text-foreground mb-3">{b.title}</h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">{b.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
