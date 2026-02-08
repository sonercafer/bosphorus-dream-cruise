import { Facebook, Instagram, Youtube, Phone, Mail } from "lucide-react";
import logoImage from "@/assets/logo-selamet.png";

const Footer = () => {
  return (
    <footer className="bg-navy-light border-t border-border/30">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="#home" className="inline-block mb-6">
              <img 
                src={logoImage} 
                alt="Selamet Kadir Davet Teknesi" 
                className="h-20 w-auto object-contain brightness-0 invert"
              />
            </a>
            <p className="text-muted-foreground max-w-md mb-6">
              15 yılı aşkın deneyimimizle İstanbul Boğazı'nda düğün, nişan, kına ve özel etkinliklerinizi 
              unutulmaz kılıyoruz.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full glass-card flex items-center justify-center hover:border-gold/50 transition-colors">
                <Facebook className="w-5 h-5 text-muted-foreground hover:text-gold transition-colors" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full glass-card flex items-center justify-center hover:border-gold/50 transition-colors">
                <Instagram className="w-5 h-5 text-muted-foreground hover:text-gold transition-colors" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full glass-card flex items-center justify-center hover:border-gold/50 transition-colors">
                <Youtube className="w-5 h-5 text-muted-foreground hover:text-gold transition-colors" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-6">Hizmetlerimiz</h4>
            <ul className="space-y-3">
              <li><a href="#services" className="text-muted-foreground hover:text-gold transition-colors">Teknede Düğün</a></li>
              <li><a href="#services" className="text-muted-foreground hover:text-gold transition-colors">Nişan & Evlilik Teklifi</a></li>
              <li><a href="#services" className="text-muted-foreground hover:text-gold transition-colors">Teknede Kına</a></li>
              <li><a href="#services" className="text-muted-foreground hover:text-gold transition-colors">Özel Etkinlikler</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-foreground mb-6">İletişim</h4>
            <ul className="space-y-3">
              <li>
                <a href="tel:+905432035037" className="flex items-center gap-2 text-muted-foreground hover:text-gold transition-colors">
                  <Phone className="w-4 h-4" />
                  0543 203 50 37
                </a>
              </li>
              <li>
                <a href="mailto:info@selametkadir.com" className="flex items-center gap-2 text-muted-foreground hover:text-gold transition-colors">
                  <Mail className="w-4 h-4" />
                  info@selametkadir.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border/30 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2025 Selamet Kadir Davet Teknesi. Tüm hakları saklıdır.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-gold transition-colors">Gizlilik Politikası</a>
            <a href="#" className="hover:text-gold transition-colors">Kullanım Şartları</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
