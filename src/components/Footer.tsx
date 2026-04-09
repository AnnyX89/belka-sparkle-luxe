import { Phone, ExternalLink } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-12 bg-foreground">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="font-heading text-2xl font-semibold text-primary-foreground">
              <span className="text-gold">Белка</span>Clean
            </span>
            <p className="font-body text-sm text-primary-foreground/50 mt-1">
              Экспертный клининг в Челябинске
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            <a
              href="tel:89642423000"
              className="flex items-center gap-2 font-body text-primary-foreground/80 hover:text-gold transition-colors"
            >
              <Phone className="w-4 h-4" />
              8 (964) 242-30-00
            </a>
            <a
              href="https://vk.com/belkaclean74"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-body text-primary-foreground/80 hover:text-gold transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              VK: belkaclean74
            </a>
            <a
              href="https://t.me/BelkaAnny89"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-body text-primary-foreground/80 hover:text-gold transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              Telegram
            </a>
          </div>
        </div>

        <div className="w-full h-px bg-primary-foreground/10 my-8" />
        <p className="text-center font-body text-xs text-primary-foreground/30">
          © {new Date().getFullYear()} БелкаClean. Все права защищены.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
