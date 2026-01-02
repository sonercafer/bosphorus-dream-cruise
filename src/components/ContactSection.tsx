import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, MessageCircle, Send } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="py-24 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <span className="text-gold text-sm font-medium uppercase tracking-widest">İletişim</span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6 text-foreground">
              Hayalinizdeki Etkinliği
              <br />
              <span className="text-gradient-gold">Birlikte Planlayalım</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Ücretsiz keşif ve fiyat teklifi için hemen bizimle iletişime geçin. 
              Deneyimli ekibimiz size en uygun paketi hazırlasın.
            </p>

            {/* Contact Info */}
            <div className="space-y-4 mb-8">
              <a href="tel:+905551234567" className="flex items-center gap-4 p-4 rounded-xl glass-card hover:border-gold/30 transition-all group">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                  <Phone className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Telefon</div>
                  <div className="text-foreground font-medium">0555 123 45 67</div>
                </div>
              </a>

              <a href="mailto:info@selametkadir.com" className="flex items-center gap-4 p-4 rounded-xl glass-card hover:border-gold/30 transition-all group">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                  <Mail className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">E-posta</div>
                  <div className="text-foreground font-medium">info@selametkadir.com</div>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 rounded-xl glass-card">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Adres</div>
                  <div className="text-foreground font-medium">Kabataş İskelesi, Beyoğlu / İstanbul</div>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="lg" className="flex-1">
                <Phone className="w-5 h-5" />
                <span>Hemen Arayın</span>
              </Button>
              <Button variant="whatsapp" size="lg" className="flex-1">
                <MessageCircle className="w-5 h-5" />
                <span>WhatsApp</span>
              </Button>
            </div>
          </div>

          {/* Right Form */}
          <div className="p-8 rounded-3xl glass-card border border-border/50">
            <h3 className="font-serif text-2xl font-semibold text-foreground mb-6">
              Ücretsiz Teklif Alın
            </h3>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-muted-foreground mb-2">Adınız</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border/50 text-foreground placeholder:text-muted-foreground focus:border-gold focus:outline-none transition-colors"
                    placeholder="Adınız"
                  />
                </div>
                <div>
                  <label className="block text-sm text-muted-foreground mb-2">Soyadınız</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border/50 text-foreground placeholder:text-muted-foreground focus:border-gold focus:outline-none transition-colors"
                    placeholder="Soyadınız"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-muted-foreground mb-2">Telefon</label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border/50 text-foreground placeholder:text-muted-foreground focus:border-gold focus:outline-none transition-colors"
                  placeholder="0555 123 45 67"
                />
              </div>

              <div>
                <label className="block text-sm text-muted-foreground mb-2">Etkinlik Türü</label>
                <select className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border/50 text-foreground focus:border-gold focus:outline-none transition-colors">
                  <option value="">Seçiniz</option>
                  <option value="dugun">Teknede Düğün</option>
                  <option value="nisan">Nişan & Evlilik Teklifi</option>
                  <option value="kina">Teknede Kına</option>
                  <option value="ozel">Özel Etkinlik</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-muted-foreground mb-2">Mesajınız</label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border/50 text-foreground placeholder:text-muted-foreground focus:border-gold focus:outline-none transition-colors resize-none"
                  placeholder="Etkinliğiniz hakkında bilgi verin..."
                />
              </div>

              <Button variant="hero" size="lg" className="w-full">
                <Send className="w-5 h-5" />
                <span>Teklif İsteyin</span>
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
