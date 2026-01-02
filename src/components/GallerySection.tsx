import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Play } from "lucide-react";
import weddingImage from "@/assets/service-wedding.jpg";
import engagementImage from "@/assets/service-engagement.jpg";
import hennaImage from "@/assets/service-henna.jpg";
import heroImage from "@/assets/hero-bosphorus.jpg";

const galleryImages = [
  { id: 1, src: heroImage, alt: "Tekne Dış Görünüm", category: "tekne" },
  { id: 2, src: weddingImage, alt: "Düğün Organizasyonu", category: "düğün" },
  { id: 3, src: engagementImage, alt: "Nişan Töreni", category: "nişan" },
  { id: 4, src: hennaImage, alt: "Kına Gecesi", category: "kına" },
  { id: 5, src: heroImage, alt: "Boğaz Manzarası", category: "tekne" },
  { id: 6, src: weddingImage, alt: "Özel Etkinlik", category: "etkinlik" },
];

const categories = ["tümü", "tekne", "düğün", "nişan", "kına", "etkinlik"];

const GallerySection = () => {
  const [selectedCategory, setSelectedCategory] = useState("tümü");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredImages = selectedCategory === "tümü" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  
  const nextImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredImages.length);
    }
  };
  
  const prevImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredImages.length) % filteredImages.length);
    }
  };

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <motion.span 
            className="text-gold text-sm font-medium uppercase tracking-widest"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Galeri
          </motion.span>
          <motion.h2 
            className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6 text-foreground"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Unutulmaz <span className="text-gradient-gold">Anlardan</span>
          </motion.h2>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category
                  ? "bg-gold text-primary-foreground"
                  : "glass-card text-muted-foreground hover:text-foreground hover:border-gold/30"
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <motion.div 
          layout
          className="grid grid-cols-2 md:grid-cols-3 gap-4"
        >
          <AnimatePresence>
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="relative group cursor-pointer overflow-hidden rounded-2xl aspect-square"
                onClick={() => openLightbox(index)}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-gold/20 backdrop-blur-sm flex items-center justify-center">
                    <Play className="w-6 h-6 text-gold fill-gold" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button
              className="absolute top-6 right-6 w-12 h-12 rounded-full glass-card flex items-center justify-center"
              onClick={closeLightbox}
            >
              <X className="w-6 h-6 text-foreground" />
            </button>

            <button
              className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass-card flex items-center justify-center"
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
            >
              <ChevronLeft className="w-6 h-6 text-foreground" />
            </button>

            <motion.img
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              src={filteredImages[lightboxIndex].src}
              alt={filteredImages[lightboxIndex].alt}
              className="max-w-full max-h-[80vh] rounded-2xl object-contain"
              onClick={(e) => e.stopPropagation()}
            />

            <button
              className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass-card flex items-center justify-center"
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
            >
              <ChevronRight className="w-6 h-6 text-foreground" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GallerySection;
