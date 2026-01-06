import { Button } from "@/components/ui/button";
import { MessageCircle, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback, useEffect } from "react";
import weddingImage from "@/assets/service-wedding.jpg";
import engagementImage from "@/assets/service-engagement.jpg";
import hennaImage from "@/assets/service-henna.jpg";
import { useQuoteModal } from "@/contexts/QuoteModalContext";

const services = [
  {
    id: 1,
    title: "Teknede Düğün",
    description: "İstanbul Boğazı'nda hayalinizdeki düğünü gerçekleştirin. Büyüleyici manzara eşliğinde denizin ortasında unutulmaz bir gece yaşayın.",
    image: weddingImage,
    icon: "💒",
    features: ["150+ Kişi Kapasitesi", "Profesyonel DJ", "Özel Menü"]
  },
  {
    id: 2,
    title: "Nişan & Evlilik Teklifi",
    description: "Aşkınızı İstanbul Boğazı'nın büyüleyici ışıkları arasında kutlayın. Romantik bir ortamda hayatınızın en özel anını yaşayın.",
    image: engagementImage,
    icon: "💍",
    features: ["Romantik Dekorasyon", "Sürpriz Organizasyon", "Fotoğraf Çekimi"]
  },
  {
    id: 3,
    title: "Teknede Kına",
    description: "Geleneksel kına gecenizi Boğaz'ın sularında kutlayın. Işıl ışıl köprülerin altında unutulmaz bir gece geçirin.",
    image: hennaImage,
    icon: "🌙",
    features: ["Canlı Müzik", "Geleneksel Ritüeller", "LED Işıklandırma"]
  },
  {
    id: 4,
    title: "Kurumsal Etkinlikler",
    description: "Şirket toplantıları, lansman etkinlikleri ve kurumsal kutlamalarınız için eşsiz bir mekan. Profesyonel hizmet anlayışımızla fark yaratın.",
    image: weddingImage,
    icon: "🏢",
    features: ["Sunum Ekipmanları", "Catering Hizmeti", "VIP Transfer"]
  },
  {
    id: 5,
    title: "Doğum Günü Partisi",
    description: "Boğaz'ın büyüleyici manzarası eşliğinde unutulmaz bir doğum günü kutlaması. Özel pasta, dekorasyon ve eğlence sizleri bekliyor.",
    image: engagementImage,
    icon: "🎂",
    features: ["Özel Dekorasyon", "Müzik & DJ", "Pasta Hizmeti"]
  },
  {
    id: 6,
    title: "Baby Shower",
    description: "Bebeğinizin gelişini İstanbul Boğazı'nın romantik atmosferinde kutlayın. Özel tema ve dekorasyonlarla hayalinizdeki partiyi yaratın.",
    image: hennaImage,
    icon: "👶",
    features: ["Tema Dekorasyonu", "Oyun Aktiviteleri", "Fotoğraf Köşesi"]
  },
];

const ServicesSection = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const { openModal } = useQuoteModal();
  
  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const itemsPerPage = isMobile ? 1 : 3;
  const totalPages = Math.ceil(services.length / itemsPerPage);
  
  const currentServices = services.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const goToPrevious = useCallback(() => {
    setCurrentPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  }, [totalPages]);

  const goToNext = useCallback(() => {
    setCurrentPage((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
  }, [totalPages]);

  // Swipe handlers
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrevious();
    }
  };

  return (
    <section id="services" className="py-24 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.span 
            className="text-gold text-sm font-medium uppercase tracking-widest"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Hizmetlerimiz
          </motion.span>
          <motion.h2 
            className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6 text-foreground"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Özel Anlarınız İçin <span className="text-gradient-gold">Benzersiz Deneyimler</span>
          </motion.h2>
          <motion.p 
            className="text-muted-foreground text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Hayatınızın en özel günlerini İstanbul Boğazı'nın eşsiz atmosferinde kutlayın
          </motion.p>
        </div>

        {/* Services Grid with Navigation */}
        <div className="relative">
          {/* Navigation Arrows */}
          {totalPages > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-12 z-20 w-12 h-12 rounded-full glass-card border border-border/50 hover:border-gold/50 flex items-center justify-center text-foreground hover:text-gold transition-all duration-300 hover:scale-110 shadow-lg"
                aria-label="Önceki hizmetler"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-12 z-20 w-12 h-12 rounded-full glass-card border border-border/50 hover:border-gold/50 flex items-center justify-center text-foreground hover:text-gold transition-all duration-300 hover:scale-110 shadow-lg"
                aria-label="Sonraki hizmetler"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Services Cards */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              {currentServices.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="group relative rounded-3xl overflow-hidden bg-card border border-border/50 hover:border-gold/30 transition-all duration-500 hover:shadow-elegant"
                >
                  {/* Image */}
                  <div className="relative h-72 overflow-hidden">
                    <motion.img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.7 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                    
                    {/* Icon Badge */}
                    <motion.div 
                      className="absolute top-4 left-4 w-14 h-14 rounded-2xl glass-card flex items-center justify-center text-3xl"
                      whileHover={{ rotate: 10, scale: 1.1 }}
                    >
                      {service.icon}
                    </motion.div>

                    {/* Features tags */}
                    <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
                      {service.features.map((feature) => (
                        <span 
                          key={feature}
                          className="px-3 py-1 rounded-full text-xs bg-gold/20 backdrop-blur-sm text-gold border border-gold/30"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="font-serif text-2xl font-semibold text-foreground mb-3 group-hover:text-gold transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                      {service.description}
                    </p>
                    
                    {/* Buttons */}
                    <div className="flex gap-3">
                      <Button variant="hero" size="sm" className="flex-1 group/btn" onClick={openModal}>
                        <span>Teklif Al</span>
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                      <Button variant="whatsapp" size="sm" asChild>
                        <a href="https://wa.me/905551234567" target="_blank" rel="noopener noreferrer">
                          <MessageCircle className="w-4 h-4" />
                          <span>WhatsApp</span>
                        </a>
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Pagination Dots */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentPage
                      ? "bg-gold w-8"
                      : "bg-border hover:bg-gold/50"
                  }`}
                  aria-label={`Sayfa ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
