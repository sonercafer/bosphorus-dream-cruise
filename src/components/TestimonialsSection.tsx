import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Elif & Murat",
    event: "Düğün",
    text: "Hayalinizdeki düğünü Boğaz'da gerçekleştirmek istedik ve Selamet Kadir ekibi beklentilerimizin çok ötesine geçti. Her detay mükemmeldi!",
    rating: 5,
    date: "Haziran 2024"
  },
  {
    id: 2,
    name: "Ayşe & Can",
    event: "Nişan",
    text: "Nişanımız için harika bir deneyimdi. Misafirlerimiz hâlâ o geceyi konuşuyor. Profesyonel ekip ve muhteşem manzara!",
    rating: 5,
    date: "Mayıs 2024"
  },
  {
    id: 3,
    name: "Zeynep & Burak",
    event: "Kına",
    text: "Kına gecemiz çok eğlenceli ve unutulmaz oldu. Dekorasyon, yemekler ve hizmet mükemmeldi. Kesinlikle tavsiye ediyoruz!",
    rating: 5,
    date: "Temmuz 2024"
  },
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="references" className="py-24 bg-navy-light relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.span 
            className="text-gold text-sm font-medium uppercase tracking-widest"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Referanslar
          </motion.span>
          <motion.h2 
            className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6 text-foreground"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Mutlu Çiftlerimiz <span className="text-gradient-gold">Ne Diyor?</span>
          </motion.h2>
        </div>

        {/* Testimonial Slider */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="glass-card rounded-3xl p-8 md:p-12 text-center relative"
              >
                {/* Quote Icon */}
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-gold flex items-center justify-center">
                  <Quote className="w-6 h-6 text-primary-foreground" />
                </div>

                {/* Stars */}
                <div className="flex justify-center gap-1 mb-6 mt-4">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-gold text-gold" />
                  ))}
                </div>

                {/* Text */}
                <p className="text-lg md:text-xl text-foreground/90 leading-relaxed mb-8 italic">
                  "{testimonials[currentIndex].text}"
                </p>

                {/* Author */}
                <div>
                  <h4 className="font-serif text-xl font-semibold text-gold">
                    {testimonials[currentIndex].name}
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    {testimonials[currentIndex].event} • {testimonials[currentIndex].date}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex justify-center items-center gap-4 mt-8">
              <button
                onClick={prev}
                className="w-12 h-12 rounded-full glass-card flex items-center justify-center hover:border-gold/50 transition-colors group"
              >
                <ChevronLeft className="w-5 h-5 text-muted-foreground group-hover:text-gold transition-colors" />
              </button>

              {/* Dots */}
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      i === currentIndex ? "w-8 bg-gold" : "bg-muted-foreground/30"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={next}
                className="w-12 h-12 rounded-full glass-card flex items-center justify-center hover:border-gold/50 transition-colors group"
              >
                <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-gold transition-colors" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
