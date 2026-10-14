import founderPhoto from "@/assets/founder-anna-real.jpg";

const AboutSection = () => {
  return (
    <section id="about" className="py-24 bg-cream">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="absolute -inset-4 border border-gold/20 rounded-2xl" />
            <img
              src={founderPhoto}
              alt="Анна — основатель БелкаClean"
              loading="lazy"
              className="rounded-xl w-full object-cover object-top aspect-[4/5] relative z-10"
            />
          </div>
          <div>
            <span className="text-gold font-body text-sm tracking-[0.3em] uppercase">Кто за этим стоит</span>
            <div className="w-16 h-px gold-line mt-4 mb-6" />
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-foreground mb-6">
              Привет, я Анна
            </h2>
            <div className="space-y-4 font-body text-muted-foreground leading-relaxed">
              <p>
                Я Анна, основательница БелкаClean. Больше шести лет мы убираем квартиры и частные дома,
                офисы, магазины и коммерческие помещения в Челябинске. На каждую заявку отвечаю я сама,
                а не менеджер по скрипту.
              </p>
              <p>
                Перед выездом обсуждаю с командой, что важно именно вам: где хрупкая отделка, что лучше
                не трогать, на что обратить внимание. Работа для меня закончена, только когда результат
                нравится вам.
              </p>
              <p>
                Самое приятное в нашей работе — когда клиент заходит после уборки и не узнаёт своё
                помещение. Ради этого мы и стараемся.
              </p>
              <p className="text-foreground">
                Если что-то не так — просто напишите мне. Разберусь и исправлю.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
