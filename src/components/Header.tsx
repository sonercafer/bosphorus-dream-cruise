import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuoteModal } from "@/contexts/QuoteModalContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logoImage from "@/assets/logo-selamet.png";

const navItems = [
  { label: "Anasayfa", href: "#home", isExternal: false },
  { label: "Hizmetlerimiz", href: "#services", isExternal: false },
  { label: "Menüler", href: "#menu", isExternal: false },
  { label: "Teknemiz", href: "/teknemiz", isExternal: true },
  { label: "Galeri", href: "#gallery", isExternal: false },
  { label: "Referanslar", href: "#references", isExternal: false },
  { label: "İletişim", href: "#contact", isExternal: false },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { openModal } = useQuoteModal();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToElement = (hash: string) => {
    const element = document.querySelector(hash);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, item: typeof navItems[0], closeMobileMenu = false) => {
    if (item.isExternal) {
      // External page link - close menu but let Link handle navigation
      if (closeMobileMenu) {
        setIsMenuOpen(false);
      }
      return;
    }
    
    e.preventDefault();

    // Close mobile menu first if needed
    if (closeMobileMenu) {
      setIsMenuOpen(false);
    }
    
    if (location.pathname !== "/") {
      // Navigate to home page first, then scroll after a short delay
      navigate("/");
      setTimeout(() => {
        scrollToElement(item.href);
      }, 150);
    } else {
      // Small delay to allow menu animation to complete on mobile
      setTimeout(() => {
        scrollToElement(item.href);
      }, closeMobileMenu ? 100 : 0);
    }
  };

  return (
    <motion.header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? "bg-background/95 backdrop-blur-xl border-b border-border/50 shadow-lg" 
          : "bg-background/80 backdrop-blur-md"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center group"
          >
            <motion.img 
              src={logoImage} 
              alt="Selamet Kadir Davet Teknesi" 
              className="h-20 md:h-28 w-auto object-contain transition-transform duration-300 group-hover:scale-105 brightness-0 invert"
              whileHover={{ scale: 1.02 }}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item, index) => (
              item.isExternal ? (
                <motion.div key={item.label}>
                  <Link
                    to={item.href}
                    className="text-sm font-medium text-muted-foreground hover:text-gold transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gold after:transition-all after:duration-300 hover:after:w-full"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ) : (
                <motion.a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item, false)}
                  className="text-sm font-medium text-muted-foreground hover:text-gold transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gold after:transition-all after:duration-300 hover:after:w-full"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item.label}
                </motion.a>
              )
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <a href="tel:+905551234567" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-gold transition-colors">
              <Phone className="w-4 h-4" />
              <span>0555 123 45 67</span>
            </a>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="hero" size="default" onClick={openModal}>
                Teklif Al
              </Button>
            </motion.div>
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
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              className="lg:hidden py-4 border-t border-border/50 bg-background/95 backdrop-blur-xl -mx-4 px-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              <nav className="flex flex-col gap-4">
                {navItems.map((item, index) => (
                  item.isExternal ? (
                    <motion.div key={item.label}>
                      <Link
                        to={item.href}
                        className="text-base font-medium text-foreground hover:text-gold transition-colors py-2 block"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  ) : (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      className="text-base font-medium text-foreground hover:text-gold transition-colors py-2"
                      onClick={(e) => handleNavClick(e, item, true)}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      {item.label}
                    </motion.a>
                  )
                ))}
                <Button 
                  variant="hero" 
                  className="mt-4 w-full"
                  onClick={() => {
                    setIsMenuOpen(false);
                    openModal();
                  }}
                >
                  Teklif Al
                </Button>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;
