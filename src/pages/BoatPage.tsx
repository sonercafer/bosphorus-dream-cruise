import { motion } from "framer-motion";
import { Ship, Users, Ruler, Anchor, Music, Utensils, Camera, Sparkles, ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuoteModal } from "@/contexts/QuoteModalContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import QuoteModal from "@/components/QuoteModal";
import { QuoteModalProvider } from "@/contexts/QuoteModalContext";
import boatHeroImage from "@/assets/boat-hero.jpg";

// Tekne özellikleri
const boatSpecs = [
  { icon: Ruler, label: "Uzunluk", value: "35 Metre" },
  { icon: Users, label: "Kapasite", value: "150+ Kişi" },
  { icon: Anchor, label: "Yapım Yılı", value: "2018" },
  { icon: Ship, label: "Tip", value: "Lüks Davet Teknesi" },
];

// Tekne hizmetleri
const boatFeatures = [
  {
    icon: Utensils,
    title: "Mutfak",
    description: "Tam donanımlı profesyonel mutfak, taze ve lezzetli yemekler için",
  },
  {
    icon: Music,
    title: "Ses Sistemi",
    description: "Profesyonel DJ kabini ve yüksek kaliteli ses sistemi",
  },
  {
    icon: Camera,
    title: "Işıklandırma",
    description: "LED aydınlatma sistemi ve atmosfer ışıkları",
  },
  {
    icon: Sparkles,
    title: "Dekorasyon",
    description: "Özel günlere uygun dekorasyon imkanları",
  },
];

// Tekne görselleri (placeholder - gerçek görseller eklenecek)
const boatGallery = [
  { id: 1, src: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80", alt: "Tekne Dış Görünüm" },
  { id: 2, src: "https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?w=800&q=80", alt: "Tekne İç Mekan" },
  { id: 3, src: "https://images.unsplash.com/photo-1548574505-5e239809ee19?w=800&q=80", alt: "Güverte" },
  { id: 4, src: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80", alt: "Boğaz Manzarası" },
  { id: 5, src: "https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=800&q=80", alt: "Gece Görünümü" },
  { id: 6, src: "https://images.unsplash.com/photo-1540946485063-a40da27545f8?w=800&q=80", alt: "Davet Alanı" },
];

const BoatPageContent = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [showVideo, setShowVideo] = useState(false);
  const { openModal } = useQuoteModal();

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const nextImage = () => setLightboxIndex((prev) => (prev !== null ? (prev + 1) % boatGallery.length : 0));
  const prevImage = () => setLightboxIndex((prev) => (prev !== null ? (prev - 1 + boatGallery.length) % boatGallery.length : 0));

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0">
          <img 
            src={boatHeroImage} 
            alt="Selamet Kadir Davet Teknesi" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/30" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-gold text-sm font-medium uppercase tracking-widest mb-4 block">
              Lüks Davet Teknesi
            </span>
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6">
              <span className="text-gradient-gold">Selamet Kadir</span>
              <br />Davet Teknesi
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              İstanbul Boğazı'nın eşsiz güzelliğinde, lüks ve konforun buluştuğu teknemizle 
              unutulmaz anılar yaratın.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="hero" 
                size="lg"
                onClick={() => setShowVideo(true)}
                className="group"
              >
                <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Tanıtım Videosu
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={openModal}
                className="border-gold/50 text-gold hover:bg-gold/10"
              >
                Teklif Al
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="w-6 h-10 border-2 border-gold/50 rounded-full flex items-start justify-center p-2">
            <motion.div 
              className="w-1.5 h-1.5 bg-gold rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
          </div>
        </motion.div>
      </section>

      {/* Boat Specs Section */}
      <section className="py-16 bg-navy-light">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {boatSpecs.map((spec, index) => (
              <motion.div
                key={spec.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 glass-card rounded-2xl"
              >
                <spec.icon className="w-10 h-10 text-gold mx-auto mb-3" />
                <p className="text-2xl font-bold text-foreground">{spec.value}</p>
                <p className="text-sm text-muted-foreground">{spec.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-gold text-sm font-medium uppercase tracking-widest">Galeri</span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mt-4 text-foreground">
              Teknemizden <span className="text-gradient-gold">Kareler</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {boatGallery.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer group"
                onClick={() => openLightbox(index)}
              >
                <img 
                  src={image.src} 
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-foreground font-medium">{image.alt}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-navy-light relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--gold)) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-gold text-sm font-medium uppercase tracking-widest">Donanım</span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mt-4 text-foreground">
              Tekne <span className="text-gradient-gold">Özellikleri</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {boatFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="p-6 glass-card rounded-2xl text-center"
              >
                <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-gold" />
                </div>
                <h3 className="font-semibold text-foreground text-lg mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Hayalinizdeki Organizasyon İçin
              <br /><span className="text-gradient-gold">Bize Ulaşın</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Düğün, nişan, kına gecesi veya özel etkinlikleriniz için teknemizi inceleyin ve 
              size özel teklif alın.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg" onClick={openModal}>
                Teklif Al
              </Button>
              <Link to="/#contact">
                <Button variant="outline" size="lg" className="border-gold/50 text-gold hover:bg-gold/10">
                  İletişime Geç
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
      <FloatingWhatsApp />
      <QuoteModal />

      {/* Video Modal */}
      {showVideo && (
        <motion.div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-xl p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button 
            onClick={() => setShowVideo(false)}
            className="absolute top-6 right-6 p-2 rounded-full bg-muted/50 hover:bg-muted transition-colors"
          >
            <X className="w-6 h-6 text-foreground" />
          </button>
          <div className="w-full max-w-4xl aspect-video bg-muted rounded-2xl flex items-center justify-center">
            <p className="text-muted-foreground text-center">
              Video buraya eklenecek
              <br />
              <span className="text-sm">(YouTube veya Vimeo embed)</span>
            </p>
          </div>
        </motion.div>
      )}

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <motion.div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-xl p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeLightbox}
        >
          <button 
            onClick={closeLightbox}
            className="absolute top-6 right-6 p-2 rounded-full bg-muted/50 hover:bg-muted transition-colors z-10"
          >
            <X className="w-6 h-6 text-foreground" />
          </button>
          
          <button
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            className="absolute left-4 md:left-8 p-3 rounded-full bg-gold/20 hover:bg-gold/40 transition-colors"
          >
            <ChevronLeft className="w-8 h-8 text-gold" />
          </button>
          
          <motion.img
            key={lightboxIndex}
            src={boatGallery[lightboxIndex].src}
            alt={boatGallery[lightboxIndex].alt}
            className="max-w-full max-h-[80vh] rounded-2xl object-contain"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={(e) => e.stopPropagation()}
          />
          
          <button
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            className="absolute right-4 md:right-8 p-3 rounded-full bg-gold/20 hover:bg-gold/40 transition-colors"
          >
            <ChevronRight className="w-8 h-8 text-gold" />
          </button>
          
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-foreground">
            {lightboxIndex + 1} / {boatGallery.length}
          </div>
        </motion.div>
      )}
    </div>
  );
};

const BoatPage = () => {
  return (
    <QuoteModalProvider>
      <BoatPageContent />
    </QuoteModalProvider>
  );
};

export default BoatPage;
