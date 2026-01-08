import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback, useEffect } from "react";
import { menus, Menu } from "@/data/menus";
import { useQuoteModal } from "@/contexts/QuoteModalContext";

const MenuCard = ({ menu, onViewDetails }: { menu: Menu; onViewDetails: (menu: Menu) => void }) => {
  const { openModal } = useQuoteModal();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -10 }}
      className="group relative rounded-3xl overflow-hidden bg-card border border-border/50 hover:border-gold/30 transition-all duration-500 hover:shadow-elegant"
    >
      {/* Header with Icon */}
      <div className="relative h-48 bg-gradient-to-br from-gold/20 via-gold/10 to-transparent flex items-center justify-center">
        <motion.div 
          className="text-7xl"
          whileHover={{ rotate: 10, scale: 1.1 }}
        >
          {menu.icon}
        </motion.div>
        
        {/* Features tags */}
        <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
          {menu.features.slice(0, 3).map((feature) => (
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
          {menu.title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-4">
          {menu.description}
        </p>
        <p className="text-gold text-sm font-medium mb-6">
          {menu.price}
        </p>
        
        {/* Buttons */}
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 group/btn border-gold/30 hover:border-gold hover:bg-gold/10"
            onClick={() => onViewDetails(menu)}
          >
            <span>Detayları Gör</span>
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </Button>
          <Button variant="hero" size="sm" className="flex-1" onClick={openModal}>
            <span>Teklif Al</span>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

const MenuDetailModal = ({ menu, isOpen, onClose }: { menu: Menu | null; isOpen: boolean; onClose: () => void }) => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const { openModal } = useQuoteModal();

  if (!menu) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl bg-card border border-border/50 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 z-10 bg-gradient-to-br from-gold/20 via-gold/10 to-transparent p-6 border-b border-border/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-5xl">{menu.icon}</span>
                  <div>
                    <h2 className="font-serif text-2xl font-bold text-foreground">{menu.title}</h2>
                    <p className="text-muted-foreground text-sm">{menu.description}</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-full bg-background/50 hover:bg-background flex items-center justify-center text-foreground transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Categories */}
            <div className="p-6 space-y-4">
              {menu.categories.map((category) => (
                <div key={category.title} className="border border-border/50 rounded-2xl overflow-hidden">
                  <button
                    onClick={() => setExpandedCategory(expandedCategory === category.title ? null : category.title)}
                    className="w-full flex items-center justify-between p-4 bg-muted/30 hover:bg-muted/50 transition-colors"
                  >
                    <h3 className="font-serif text-lg font-semibold text-foreground">{category.title}</h3>
                    {expandedCategory === category.title ? (
                      <ChevronUp className="w-5 h-5 text-gold" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-muted-foreground" />
                    )}
                  </button>
                  
                  <AnimatePresence>
                    {expandedCategory === category.title && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="p-4 space-y-3">
                          {category.items.map((item, idx) => (
                            <div key={idx} className="flex justify-between items-start">
                              <div>
                                <p className="font-medium text-foreground">{item.name}</p>
                                {item.description && (
                                  <p className="text-sm text-muted-foreground">{item.description}</p>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Footer CTA */}
            <div className="sticky bottom-0 p-6 bg-card border-t border-border/50">
              <Button variant="hero" size="lg" className="w-full" onClick={() => { onClose(); openModal(); }}>
                <span>Bu Menü İle Teklif Al</span>
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const MenuSection = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [selectedMenu, setSelectedMenu] = useState<Menu | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const itemsPerPage = isMobile ? 1 : 3;
  const totalPages = Math.ceil(menus.length / itemsPerPage);
  
  const currentMenus = menus.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const goToPrevious = useCallback(() => {
    setCurrentPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  }, [totalPages]);

  const goToNext = useCallback(() => {
    setCurrentPage((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
  }, [totalPages]);

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

  const handleViewDetails = (menu: Menu) => {
    setSelectedMenu(menu);
    setIsModalOpen(true);
  };

  return (
    <>
      <section id="menu" className="py-24 bg-muted/30 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
        
        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <motion.span 
              className="text-gold text-sm font-medium uppercase tracking-widest"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Menülerimiz
            </motion.span>
            <motion.h2 
              className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6 text-foreground"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Lezzetli <span className="text-gradient-gold">Yemek Seçenekleri</span>
            </motion.h2>
            <motion.p 
              className="text-muted-foreground text-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Etkinliğinize özel hazırlanan zengin menü seçeneklerimizi keşfedin
            </motion.p>
          </div>

          {/* Menu Grid with Navigation */}
          <div className="relative">
            {/* Navigation Arrows */}
            {totalPages > 1 && (
              <>
                <button
                  onClick={goToPrevious}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-12 z-20 w-12 h-12 rounded-full glass-card border border-border/50 hover:border-gold/50 flex items-center justify-center text-foreground hover:text-gold transition-all duration-300 hover:scale-110 shadow-lg"
                  aria-label="Önceki menüler"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={goToNext}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-12 z-20 w-12 h-12 rounded-full glass-card border border-border/50 hover:border-gold/50 flex items-center justify-center text-foreground hover:text-gold transition-all duration-300 hover:scale-110 shadow-lg"
                  aria-label="Sonraki menüler"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Menu Cards */}
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
                {currentMenus.map((menu) => (
                  <MenuCard key={menu.id} menu={menu} onViewDetails={handleViewDetails} />
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

      <MenuDetailModal 
        menu={selectedMenu} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
};

export default MenuSection;
