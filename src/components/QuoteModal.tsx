import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Send, Loader2, Sparkles, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { useQuoteModal } from "@/contexts/QuoteModalContext";
import { menus } from "@/data/menus";

const quoteSchema = z.object({
  name: z.string().trim().min(2, "Ad en az 2 karakter olmalı").max(100, "Ad çok uzun"),
  email: z.string().trim().email("Geçerli bir e-posta adresi girin"),
  phone: z.string().trim().min(10, "Geçerli bir telefon numarası girin").max(20, "Telefon numarası çok uzun"),
  eventType: z.string().min(1, "Etkinlik türü seçin"),
  eventDate: z.string().optional(),
  guestCount: z.string().optional(),
  cateringOption: z.enum(["with-food", "without-food"]),
  selectedMenu: z.string().optional(),
  message: z.string().max(1000, "Mesaj çok uzun").optional(),
});

type QuoteFormData = z.infer<typeof quoteSchema>;

const RATE_LIMIT_KEY = "quote_submissions";
const RATE_LIMIT_DURATION = 60 * 60 * 1000; // 1 hour in ms
const MAX_SUBMISSIONS = 3;

const QuoteModal = () => {
  const { isOpen, closeModal } = useQuoteModal();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [remainingSubmissions, setRemainingSubmissions] = useState(MAX_SUBMISSIONS);
  const [formData, setFormData] = useState<QuoteFormData>({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    eventDate: "",
    guestCount: "",
    cateringOption: "without-food",
    selectedMenu: "",
    message: "",
  });

  // Check rate limit on mount and when modal opens
  const checkRateLimit = useCallback(() => {
    const stored = localStorage.getItem(RATE_LIMIT_KEY);
    if (stored) {
      const { submissions, timestamp } = JSON.parse(stored);
      const now = Date.now();
      
      // Reset if duration has passed
      if (now - timestamp > RATE_LIMIT_DURATION) {
        localStorage.removeItem(RATE_LIMIT_KEY);
        setRemainingSubmissions(MAX_SUBMISSIONS);
        return MAX_SUBMISSIONS;
      }
      
      const remaining = MAX_SUBMISSIONS - submissions;
      setRemainingSubmissions(remaining);
      return remaining;
    }
    setRemainingSubmissions(MAX_SUBMISSIONS);
    return MAX_SUBMISSIONS;
  }, []);

  useEffect(() => {
    if (isOpen) {
      checkRateLimit();
    }
  }, [isOpen, checkRateLimit]);

  const recordSubmission = () => {
    const stored = localStorage.getItem(RATE_LIMIT_KEY);
    const now = Date.now();
    
    if (stored) {
      const { submissions, timestamp } = JSON.parse(stored);
      if (now - timestamp < RATE_LIMIT_DURATION) {
        localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify({
          submissions: submissions + 1,
          timestamp,
        }));
        setRemainingSubmissions(MAX_SUBMISSIONS - submissions - 1);
        return;
      }
    }
    
    localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify({
      submissions: 1,
      timestamp: now,
    }));
    setRemainingSubmissions(MAX_SUBMISSIONS - 1);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const newData = { ...prev, [name]: value };
      // Reset selectedMenu when switching to without-food
      if (name === "cateringOption" && value === "without-food") {
        newData.selectedMenu = "";
      }
      return newData;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check rate limit
    const remaining = checkRateLimit();
    if (remaining <= 0) {
      toast({
        title: "Limit Aşıldı",
        description: "Çok fazla teklif talebi gönderdiniz. Lütfen 1 saat sonra tekrar deneyin.",
        variant: "destructive",
      });
      return;
    }

    const validation = quoteSchema.safeParse(formData);
    if (!validation.success) {
      const firstError = validation.error.errors[0];
      toast({
        title: "Form Hatası",
        description: firstError.message,
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke("send-quote-email", {
        body: formData,
      });

      if (error) throw error;

      recordSubmission();

      toast({
        title: "Başarılı!",
        description: "Teklif talebiniz alındı. En kısa sürede sizinle iletişime geçeceğiz.",
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        eventType: "",
        eventDate: "",
        guestCount: "",
        cateringOption: "without-food",
        selectedMenu: "",
        message: "",
      });
      
      closeModal();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Hata",
        description: "Bir sorun oluştu. Lütfen daha sonra tekrar deneyin veya bizi arayın.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses =
    "w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-muted/50 border border-border/50 text-foreground text-sm sm:text-base placeholder:text-muted-foreground focus:border-gold focus:ring-1 focus:ring-gold/50 focus:outline-none transition-all";

  const isRateLimited = remainingSubmissions <= 0;

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="w-[95vw] max-w-[600px] max-h-[90vh] overflow-y-auto p-0 bg-background border-gold/20">
        {/* Header with gradient */}
        <div className="relative bg-gradient-to-r from-gold/20 via-gold/10 to-gold/20 px-4 sm:px-6 pt-6 sm:pt-8 pb-4 sm:pb-6">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(var(--gold)/0.3),transparent_50%)]" />
          <DialogHeader className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-gold" />
              <span className="text-gold text-xs sm:text-sm font-medium uppercase tracking-widest">
                Ücretsiz Teklif
              </span>
            </div>
            <DialogTitle className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-foreground">
              Hayalinizdeki Etkinlik İçin
              <br />
              <span className="text-gradient-gold">Teklif Alın</span>
            </DialogTitle>
            <DialogDescription className="text-muted-foreground text-sm mt-2">
              Formu doldurun, size özel fiyat teklifimizi hemen gönderelim.
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Rate limit warning */}
        {isRateLimited && (
          <div className="mx-4 sm:mx-6 mt-4 p-3 rounded-lg bg-destructive/10 border border-destructive/30 flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
            <p className="text-sm text-destructive">
              Çok fazla teklif talebi gönderdiniz. Lütfen 1 saat sonra tekrar deneyin.
            </p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-3 sm:space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="block text-xs sm:text-sm text-muted-foreground mb-1.5 sm:mb-2">
                Ad Soyad *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={inputClasses}
                placeholder="Adınız Soyadınız"
                required
                disabled={isRateLimited}
              />
            </div>
            <div>
              <label className="block text-xs sm:text-sm text-muted-foreground mb-1.5 sm:mb-2">
                E-posta *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={inputClasses}
                placeholder="ornek@email.com"
                required
                disabled={isRateLimited}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="block text-xs sm:text-sm text-muted-foreground mb-1.5 sm:mb-2">
                Telefon *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={inputClasses}
                placeholder="0543 203 50 37"
                required
                disabled={isRateLimited}
              />
            </div>
            <div>
              <label className="block text-xs sm:text-sm text-muted-foreground mb-1.5 sm:mb-2">
                Kişi Sayısı
              </label>
              <input
                type="text"
                name="guestCount"
                value={formData.guestCount}
                onChange={handleInputChange}
                className={inputClasses}
                placeholder="Yaklaşık kişi sayısı"
                disabled={isRateLimited}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="block text-xs sm:text-sm text-muted-foreground mb-1.5 sm:mb-2">
                Etkinlik Türü *
              </label>
              <select
                name="eventType"
                value={formData.eventType}
                onChange={handleInputChange}
                className={inputClasses}
                required
                disabled={isRateLimited}
              >
                <option value="">Seçiniz</option>
                <option value="Teknede Düğün">Teknede Düğün</option>
                <option value="Nişan & Evlilik Teklifi">Nişan & Evlilik Teklifi</option>
                <option value="Teknede Kına">Teknede Kına</option>
                <option value="Doğum Günü">Doğum Günü</option>
                <option value="Baby Shower">Baby Shower</option>
                <option value="Özel Etkinlik">Özel Etkinlik</option>
                <option value="Kurumsal Etkinlik">Kurumsal Etkinlik</option>
              </select>
            </div>
            <div>
              <label className="block text-xs sm:text-sm text-muted-foreground mb-1.5 sm:mb-2">
                Tarih
              </label>
              <input
                type="date"
                name="eventDate"
                value={formData.eventDate}
                onChange={handleInputChange}
                className={inputClasses}
                disabled={isRateLimited}
              />
            </div>
          </div>

          {/* Catering Options */}
          <div>
            <label className="block text-xs sm:text-sm text-muted-foreground mb-1.5 sm:mb-2">
              Yemek Seçeneği *
            </label>
            <div className="grid grid-cols-2 gap-3">
              <label 
                className={`flex items-center justify-center p-3 rounded-xl border cursor-pointer transition-all ${
                  formData.cateringOption === "without-food" 
                    ? "border-gold bg-gold/10 text-gold" 
                    : "border-border/50 bg-muted/30 text-muted-foreground hover:border-gold/50"
                }`}
              >
                <input
                  type="radio"
                  name="cateringOption"
                  value="without-food"
                  checked={formData.cateringOption === "without-food"}
                  onChange={handleInputChange}
                  className="sr-only"
                  disabled={isRateLimited}
                />
                <span className="text-sm font-medium">🚢 Yemeksiz</span>
              </label>
              <label 
                className={`flex items-center justify-center p-3 rounded-xl border cursor-pointer transition-all ${
                  formData.cateringOption === "with-food" 
                    ? "border-gold bg-gold/10 text-gold" 
                    : "border-border/50 bg-muted/30 text-muted-foreground hover:border-gold/50"
                }`}
              >
                <input
                  type="radio"
                  name="cateringOption"
                  value="with-food"
                  checked={formData.cateringOption === "with-food"}
                  onChange={handleInputChange}
                  className="sr-only"
                  disabled={isRateLimited}
                />
                <span className="text-sm font-medium">🍽️ Yemekli</span>
              </label>
            </div>
          </div>

          {/* Menu Selection - Only shown when with-food is selected */}
          {formData.cateringOption === "with-food" && (
            <div>
              <label className="block text-xs sm:text-sm text-muted-foreground mb-1.5 sm:mb-2">
                Menü Seçimi
              </label>
              <select
                name="selectedMenu"
                value={formData.selectedMenu}
                onChange={handleInputChange}
                className={inputClasses}
                disabled={isRateLimited}
              >
                <option value="">Menü Seçiniz</option>
                {menus.map((menu) => (
                  <option key={menu.id} value={menu.id}>
                    {menu.icon} {menu.title}
                  </option>
                ))}
              </select>
              <p className="text-xs text-muted-foreground mt-1">
                Menü detaylarını görmek için <a href="#menu" className="text-gold hover:underline" onClick={closeModal}>Menüler</a> bölümünü ziyaret edin.
              </p>
            </div>
          )}

          <div>
            <label className="block text-xs sm:text-sm text-muted-foreground mb-1.5 sm:mb-2">
              Mesajınız
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows={3}
              className={`${inputClasses} resize-none`}
              placeholder="Etkinliğiniz hakkında bilgi verin..."
              disabled={isRateLimited}
            />
          </div>

          <Button
            type="submit"
            variant="hero"
            size="lg"
            className="w-full mt-2"
            disabled={isSubmitting || isRateLimited}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Gönderiliyor...</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span>Teklif İsteyin</span>
              </>
            )}
          </Button>

          <p className="text-center text-xs text-muted-foreground mt-3 sm:mt-4">
            Bilgileriniz gizli tutulacak ve sadece teklif hazırlamak için kullanılacaktır.
            {!isRateLimited && remainingSubmissions < MAX_SUBMISSIONS && (
              <span className="block mt-1 text-gold/80">
                Kalan teklif hakkı: {remainingSubmissions}
              </span>
            )}
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default QuoteModal;
