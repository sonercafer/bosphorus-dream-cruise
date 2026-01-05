import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, Sparkles, Play } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import heroImage from "@/assets/hero-selamet-kadir.jpg";
import { useQuoteModal } from "@/contexts/QuoteModalContext";

const HeroSection = () => {
  const ref = useRef<HTMLElement>(null);
  const { openModal } = useQuoteModal();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Animated counter hook
  const useCounter = (end: number, duration: number = 2000) => {
    const [count, setCount] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
      if (hasAnimated) return;
      
      const timer = setTimeout(() => {
        setHasAnimated(true);
        let start = 0;
        const increment = end / (duration / 16);
        const animate = () => {
          start += increment;
          if (start < end) {
            setCount(Math.floor(start));
            requestAnimationFrame(animate);
          } else {
            setCount(end);
          }
        };
        animate();
      }, 500);

      return () => clearTimeout(timer);
    }, [end, duration, hasAnimated]);

    return count;
  };

  const yearsCount = useCounter(15);
  const customersCount = useCounter(500);
  const satisfactionCount = useCounter(100);

  return (
    <section ref={ref} id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Parallax Background Image */}
      <motion.div className="absolute inset-0" style={{ y }}>
        <img
          src={heroImage}
          alt="İstanbul Boğazı'nda Tekne Turu"
          className="w-full h-[120%] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background" />
      </motion.div>

      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gold/30 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [null, -100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div 
        className="relative z-10 container mx-auto px-4 text-center pt-20"
        style={{ opacity }}
      >
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div 
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-card mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Sparkles className="w-4 h-4 text-gold" />
            <span className="text-sm text-foreground/90">İstanbul'un En Özel Tekne Turu Deneyimi</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1 
            className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span className="text-foreground">Boğaz'ın Büyüsünü</span>
            <br />
            <span className="text-gradient-gold">Yaşayın</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Düğün, nişan, kına ve özel etkinlikleriniz için İstanbul Boğazı'nın eşsiz manzarasında 
            unutulmaz anılar biriktirin.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Button variant="hero" size="xl" className="group" onClick={openModal}>
              <span>Hemen Teklif Alın</span>
              <motion.span
                className="ml-2"
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                →
              </motion.span>
            </Button>
            <Button variant="heroOutline" size="xl" className="group">
              <Play className="w-4 h-4 mr-2 fill-current" />
              <span>Tanıtım Videosu</span>
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div 
            className="grid grid-cols-3 gap-8 mt-16 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="text-center group">
              <motion.div 
                className="text-4xl md:text-5xl font-serif font-bold text-gold"
                whileHover={{ scale: 1.1 }}
              >
                {yearsCount}+
              </motion.div>
              <div className="text-sm text-foreground/60 mt-1">Yıllık Deneyim</div>
            </div>
            <div className="text-center border-x border-border/30 group">
              <motion.div 
                className="text-4xl md:text-5xl font-serif font-bold text-gold"
                whileHover={{ scale: 1.1 }}
              >
                {customersCount}+
              </motion.div>
              <div className="text-sm text-foreground/60 mt-1">Mutlu Müşteri</div>
            </div>
            <div className="text-center group">
              <motion.div 
                className="text-4xl md:text-5xl font-serif font-bold text-gold"
                whileHover={{ scale: 1.1 }}
              >
                %{satisfactionCount}
              </motion.div>
              <div className="text-sm text-foreground/60 mt-1">Memnuniyet</div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <a href="#services" className="flex flex-col items-center gap-2 text-foreground/50 hover:text-gold transition-colors">
            <span className="text-xs uppercase tracking-widest">Keşfet</span>
            <ChevronDown className="w-5 h-5" />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
