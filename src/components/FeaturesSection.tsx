import { Utensils, Music, Camera, Users, Sparkles, Clock } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Utensils,
    title: "Özel Menüler",
    description: "Şeflerimizin hazırladığı zengin menü seçenekleri",
  },
  {
    icon: Music,
    title: "Canlı Müzik",
    description: "Profesyonel DJ ve canlı müzik organizasyonu",
  },
  {
    icon: Camera,
    title: "Fotoğraf & Video",
    description: "Anılarınızı ölümsüzleştiren profesyonel çekim",
  },
  {
    icon: Users,
    title: "150+ Kişi Kapasite",
    description: "Geniş ve ferah etkinlik alanları",
  },
  {
    icon: Sparkles,
    title: "Dekorasyon",
    description: "Hayalinizdeki konsepte uygun dekorasyon",
  },
  {
    icon: Clock,
    title: "Esnek Saatler",
    description: "Size uygun gün ve saat planlaması",
  },
];

const FeaturesSection = () => {
  return (
    <section id="about" className="py-24 bg-navy-light relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--gold)) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-gold text-sm font-medium uppercase tracking-widest">Neden Biz?</span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6 text-foreground">
              <span className="text-gradient-gold">15 Yıllık</span> Deneyim
              <br />Profesyonel Hizmet
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Selamet Kadir Davet Teknesi olarak, İstanbul Boğazı'nda düzenlediğimiz etkinliklerle 
              yüzlerce çiftin ve ailenin en özel günlerine eşlik ettik. Deneyimli ekibimiz ve 
              modern teknemizle hayalinizdeki organizasyonu gerçeğe dönüştürüyoruz.
            </p>

            <div className="flex flex-wrap gap-4">
              {["7/24 Destek", "Sigortalı Etkinlik", "Profesyonel Ekip"].map((item, i) => (
                <motion.div 
                  key={item}
                  className="flex items-center gap-2 text-foreground/80"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                >
                  <div className="w-2 h-2 rounded-full bg-gold" />
                  <span>{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Features Grid */}
          <div className="grid grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group p-6 rounded-2xl glass-card hover:border-gold/30 transition-all duration-300"
              >
                <motion.div 
                  className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors"
                  whileHover={{ rotate: 10 }}
                >
                  <feature.icon className="w-6 h-6 text-gold" />
                </motion.div>
                <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
