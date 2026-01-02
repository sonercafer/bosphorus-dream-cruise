import { Button } from "@/components/ui/button";
import { MessageCircle, ArrowRight } from "lucide-react";
import weddingImage from "@/assets/service-wedding.jpg";
import engagementImage from "@/assets/service-engagement.jpg";
import hennaImage from "@/assets/service-henna.jpg";

const services = [
  {
    id: 1,
    title: "Teknede Düğün",
    description: "İstanbul Boğazı'nda hayalinizdeki düğünü gerçekleştirin. Büyüleyici manzara eşliğinde denizin ortasında unutulmaz bir gece yaşayın.",
    image: weddingImage,
    icon: "💒",
  },
  {
    id: 2,
    title: "Nişan & Evlilik Teklifi",
    description: "Aşkınızı İstanbul Boğazı'nın büyüleyici ışıkları arasında kutlayın. Romantik bir ortamda hayatınızın en özel anını yaşayın.",
    image: engagementImage,
    icon: "💍",
  },
  {
    id: 3,
    title: "Teknede Kına",
    description: "Geleneksel kına gecenizi Boğaz'ın sularında kutlayın. Işıl ışıl köprülerin altında unutulmaz bir gece geçirin.",
    image: hennaImage,
    icon: "🌙",
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-24 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-gold text-sm font-medium uppercase tracking-widest">Hizmetlerimiz</span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6 text-foreground">
            Özel Anlarınız İçin <span className="text-gradient-gold">Benzersiz Deneyimler</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Hayatınızın en özel günlerini İstanbul Boğazı'nın eşsiz atmosferinde kutlayın
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="group relative rounded-2xl overflow-hidden bg-card border border-border/50 hover:border-gold/30 transition-all duration-500 hover:shadow-elegant"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                
                {/* Icon Badge */}
                <div className="absolute top-4 left-4 w-12 h-12 rounded-full glass-card flex items-center justify-center text-2xl">
                  {service.icon}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-serif text-xl font-semibold text-foreground mb-3 group-hover:text-gold transition-colors">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  {service.description}
                </p>
                
                {/* Buttons */}
                <div className="flex gap-3">
                  <Button variant="hero" size="sm" className="flex-1">
                    <span>Teklif Al</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                  <Button variant="whatsapp" size="sm">
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp</span>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
