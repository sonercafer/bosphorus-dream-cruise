import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, Anchor } from "lucide-react";

const navItems = [
  { label: "Anasayfa", href: "#home" },
  { label: "Hizmetlerimiz", href: "#services" },
  { label: "Teknemiz", href: "#about" },
  { label: "Referanslar", href: "#references" },
  { label: "İletişim", href: "#contact" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold to-gold-light flex items-center justify-center shadow-gold transition-transform duration-300 group-hover:scale-110">
              <Anchor className="w-6 h-6 text-primary-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-serif font-semibold text-foreground">Selamet Kadir</span>
              <span className="text-xs text-muted-foreground tracking-wider uppercase">Davet Teknesi</span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-gold transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gold after:transition-all after:duration-300 hover:after:w-full"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <a href="tel:+905551234567" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-gold transition-colors">
              <Phone className="w-4 h-4" />
              <span>0555 123 45 67</span>
            </a>
            <Button variant="hero" size="default">
              Teklif Al
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border/50 animate-fade-in">
            <nav className="flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-base font-medium text-foreground hover:text-gold transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <Button variant="hero" className="mt-4 w-full">
                Teklif Al
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
