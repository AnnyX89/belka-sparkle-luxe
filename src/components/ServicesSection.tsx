import { Building2, Sparkles, Sofa, Square } from "lucide-react";

const services = [
  {
    icon: Building2,
    title: "Послестроительный клининг",
    price: "от 200 ₽/м²",
    description: "Полная уборка после ремонта: удаление строительной пыли, следов краски и цемента",
  },
  {
    icon: Sparkles,
    title: "Генеральная уборка",
    price: "от 150 ₽/м²",
    description: "Глубокая уборка каждого уголка — от плинтусов до потолочных карнизов",
  },
  {
    icon: Sofa,
    title: "Химчистка мебели",
    price: "от 1 500 ₽",
    description: "Профессиональная химчистка диванов, кресел и матрасов с гипоаллергенными средствами",
  },
  {
    icon: Square,
    title: "Мойка окон",
    price: "от 400 ₽",
    description: "Мойка окон любой сложности, включая витражные и панорамные конструкции",
  },
];

const ServicesSection = () => {
  return (
    <section className="py-24 bg-ivory">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-gold font-body text-sm tracking-[0.3em] uppercase">
            Услуги
          </span>
          <div className="w-16 h-px gold-line mx-auto mt-4 mb-6" />
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-foreground">
            Наши услуги и цены
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {services.map((service) => (
            <div
              key={service.title}
              className="group bg-background rounded-xl p-6 border border-border hover:border-gold/40 hover:shadow-gold transition-all duration-300 cursor-pointer"
            >
              <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center mb-5 group-hover:bg-gold/20 transition-colors">
                <service.icon className="w-6 h-6 text-gold" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                {service.title}
              </h3>
              <p className="text-gold font-body font-semibold text-xl mb-3">
                {service.price}
              </p>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
