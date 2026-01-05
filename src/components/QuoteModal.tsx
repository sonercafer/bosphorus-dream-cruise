import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { X, Send, Loader2, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const quoteSchema = z.object({
  name: z.string().trim().min(2, "Ad en az 2 karakter olmalı").max(100, "Ad çok uzun"),
  email: z.string().trim().email("Geçerli bir e-posta adresi girin"),
  phone: z.string().trim().min(10, "Geçerli bir telefon numarası girin").max(20, "Telefon numarası çok uzun"),
  eventType: z.string().min(1, "Etkinlik türü seçin"),
  eventDate: z.string().optional(),
  guestCount: z.string().optional(),
  message: z.string().max(1000, "Mesaj çok uzun").optional(),
});

type QuoteFormData = z.infer<typeof quoteSchema>;

interface QuoteModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const QuoteModal = ({ open, onOpenChange }: QuoteModalProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<QuoteFormData>({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    eventDate: "",
    guestCount: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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
        message: "",
      });
      
      onOpenChange(false);
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
    "w-full px-4 py-3 rounded-xl bg-muted/50 border border-border/50 text-foreground placeholder:text-muted-foreground focus:border-gold focus:ring-1 focus:ring-gold/50 focus:outline-none transition-all";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden bg-background border-gold/20">
        {/* Header with gradient */}
        <div className="relative bg-gradient-to-r from-gold/20 via-gold/10 to-gold/20 px-6 pt-8 pb-6">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(var(--gold)/0.3),transparent_50%)]" />
          <DialogHeader className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-gold" />
              <span className="text-gold text-sm font-medium uppercase tracking-widest">
                Ücretsiz Teklif
              </span>
            </div>
            <DialogTitle className="font-serif text-2xl md:text-3xl font-bold text-foreground">
              Hayalinizdeki Etkinlik İçin
              <br />
              <span className="text-gradient-gold">Teklif Alın</span>
            </DialogTitle>
            <DialogDescription className="text-muted-foreground mt-2">
              Formu doldurun, size özel fiyat teklifimizi hemen gönderelim.
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-muted-foreground mb-2">
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
              />
            </div>
            <div>
              <label className="block text-sm text-muted-foreground mb-2">
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
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-muted-foreground mb-2">
                Telefon *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={inputClasses}
                placeholder="0555 123 45 67"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-muted-foreground mb-2">
                Kişi Sayısı
              </label>
              <input
                type="text"
                name="guestCount"
                value={formData.guestCount}
                onChange={handleInputChange}
                className={inputClasses}
                placeholder="Yaklaşık kişi sayısı"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-muted-foreground mb-2">
                Etkinlik Türü *
              </label>
              <select
                name="eventType"
                value={formData.eventType}
                onChange={handleInputChange}
                className={inputClasses}
                required
              >
                <option value="">Seçiniz</option>
                <option value="Teknede Düğün">Teknede Düğün</option>
                <option value="Nişan & Evlilik Teklifi">Nişan & Evlilik Teklifi</option>
                <option value="Teknede Kına">Teknede Kına</option>
                <option value="Doğum Günü">Doğum Günü</option>
                <option value="Özel Etkinlik">Özel Etkinlik</option>
                <option value="Kurumsal Etkinlik">Kurumsal Etkinlik</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-muted-foreground mb-2">
                Tarih
              </label>
              <input
                type="date"
                name="eventDate"
                value={formData.eventDate}
                onChange={handleInputChange}
                className={inputClasses}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-muted-foreground mb-2">
              Mesajınız
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows={3}
              className={`${inputClasses} resize-none`}
              placeholder="Etkinliğiniz hakkında bilgi verin..."
            />
          </div>

          <Button
            type="submit"
            variant="hero"
            size="lg"
            className="w-full mt-2"
            disabled={isSubmitting}
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

          <p className="text-center text-xs text-muted-foreground mt-4">
            Bilgileriniz gizli tutulacak ve sadece teklif hazırlamak için kullanılacaktır.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default QuoteModal;
