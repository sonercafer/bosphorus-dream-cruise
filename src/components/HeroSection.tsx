import { Button } from "@/components/ui/button";
import { ChevronDown, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-bosphorus.jpg";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="İstanbul Boğazı'nda Tekne Turu"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-hero" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center pt-20">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            <Sparkles className="w-4 h-4 text-gold" />
            <span className="text-sm text-foreground/90">İstanbul'un En Özel Tekne Turu Deneyimi</span>
          </div>

          {/* Main Heading */}
          <h1 className="font-serif text-4xl md:text-5xl lg:text-7xl font-bold mb-6 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            <span className="text-foreground">Boğaz'ın Büyüsünü</span>
            <br />
            <span className="text-gradient-gold">Yaşayın</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-up" style={{ animationDelay: "0.3s" }}>
            Düğün, nişan, kına ve özel etkinlikleriniz için İstanbul Boğazı'nın eşsiz manzarasında 
            unutulmaz anılar biriktirin.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up" style={{ animationDelay: "0.4s" }}>
            <Button variant="hero" size="xl">
              Hemen Teklif Alın
            </Button>
            <Button variant="heroOutline" size="xl">
              Hizmetlerimizi Keşfedin
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 max-w-xl mx-auto animate-fade-up" style={{ animationDelay: "0.5s" }}>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-serif font-bold text-gold">15+</div>
              <div className="text-sm text-foreground/60 mt-1">Yıllık Deneyim</div>
            </div>
            <div className="text-center border-x border-border/30">
              <div className="text-3xl md:text-4xl font-serif font-bold text-gold">500+</div>
              <div className="text-sm text-foreground/60 mt-1">Mutlu Müşteri</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-serif font-bold text-gold">%100</div>
              <div className="text-sm text-foreground/60 mt-1">Memnuniyet</div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
          <a href="#services" className="flex flex-col items-center gap-2 text-foreground/50 hover:text-gold transition-colors">
            <span className="text-xs uppercase tracking-widest">Keşfet</span>
            <ChevronDown className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
