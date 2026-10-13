import PromoButton from "@/components/PromoButton";
import HeroSection from "@/components/HeroSection";
import BenefitsSection from "@/components/BenefitsSection";
import ServicesSection from "@/components/ServicesSection";
import AboutSection from "@/components/AboutSection";
import GallerySection from "@/components/GallerySection";
import ReviewsSection from "@/components/ReviewsSection";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <BenefitsSection />
      <ServicesSection />
      <AboutSection />
      <GallerySection />
      <ReviewsSection />
      <Footer />
      <ChatBot />
      <PromoButton />
    </div>
  );
};

export default Index;
