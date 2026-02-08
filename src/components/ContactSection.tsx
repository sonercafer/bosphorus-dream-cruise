import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, MessageCircle, Send, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { menus } from "@/data/menus";

const quoteSchema = z.object({
  name: z.string().trim().min(2, "Ad en az 2 karakter olmalı").max(100, "Ad çok uzun"),
  email: z.string().trim().email("Geçerli bir e-posta adresi girin"),
  phone: z.string().trim().min(10, "Geçerli bir telefon numarası girin").max(20, "Telefon numarası çok uzun"),
  eventType: z.string().min(1, "Etkinlik türü seçin"),
  eventDate: z.string().optional(),
  guestCount: z.string().optional(),
  cateringOption: z.enum(["yemeksiz", "yemekli"]),
  selectedMenu: z.string().optional(),
  message: z.string().max(1000, "Mesaj çok uzun").optional(),
});

type QuoteFormData = z.infer<typeof quoteSchema>;

const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<QuoteFormData>({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    eventDate: "",
    guestCount: "",
    cateringOption: "yemeksiz",
    selectedMenu: "",
    message: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === "cateringOption" && value === "yemeksiz") {
      setFormData(prev => ({ ...prev, [name]: value, selectedMenu: "" }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form data
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
      const { data, error } = await supabase.functions.invoke('send-quote-email', {
        body: formData,
      });

      if (error) throw error;

      toast({
        title: "Başarılı!",
        description: "Teklif talebiniz alındı. En kısa sürede sizinle iletişime geçeceğiz.",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        eventType: "",
        eventDate: "",
        guestCount: "",
        cateringOption: "yemeksiz",
        selectedMenu: "",
        message: "",
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Hata",
        description: "Bir sorun oluştu. Lütfen daha sonra tekrar deneyin veya bizi arayın.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
                  <div className="text-foreground font-medium">0543 203 50 37</div>
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
            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="hero" size="lg" className="flex-1 min-w-0" asChild>
                <a href="tel:+905551234567" className="flex items-center justify-center gap-2">
                  <Phone className="w-5 h-5 shrink-0" />
                  <span className="truncate">Hemen Arayın</span>
                </a>
              </Button>
              <Button variant="whatsapp" size="lg" className="flex-1 min-w-0" asChild>
                <a href="https://wa.me/905551234567" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                  <MessageCircle className="w-5 h-5 shrink-0" />
                  <span className="truncate">WhatsApp</span>
                </a>
              </Button>
            </div>
          </div>

          {/* Right Form */}
          <div className="p-8 rounded-3xl glass-card border border-border/50">
            <h3 className="font-serif text-2xl font-semibold text-foreground mb-6">
              Ücretsiz Teklif Alın
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-muted-foreground mb-2">Ad Soyad *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border/50 text-foreground placeholder:text-muted-foreground focus:border-gold focus:outline-none transition-colors"
                    placeholder="Adınız Soyadınız"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-muted-foreground mb-2">E-posta *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border/50 text-foreground placeholder:text-muted-foreground focus:border-gold focus:outline-none transition-colors"
                    placeholder="ornek@email.com"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-muted-foreground mb-2">Telefon *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border/50 text-foreground placeholder:text-muted-foreground focus:border-gold focus:outline-none transition-colors"
                    placeholder="0543 203 50 37"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-muted-foreground mb-2">Kişi Sayısı</label>
                  <input
                    type="text"
                    name="guestCount"
                    value={formData.guestCount}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border/50 text-foreground placeholder:text-muted-foreground focus:border-gold focus:outline-none transition-colors"
                    placeholder="Yaklaşık kişi sayısı"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-muted-foreground mb-2">Etkinlik Türü *</label>
                  <select 
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border/50 text-foreground focus:border-gold focus:outline-none transition-colors"
                    required
                  >
                    <option value="">Seçiniz</option>
                    <option value="Teknede Düğün">Teknede Düğün</option>
                    <option value="Nişan & Evlilik Teklifi">Nişan & Evlilik Teklifi</option>
                    <option value="Teknede Kına">Teknede Kına</option>
                    <option value="Özel Etkinlik">Özel Etkinlik</option>
                    <option value="Kurumsal Etkinlik">Kurumsal Etkinlik</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-muted-foreground mb-2">Tarih</label>
                  <input
                    type="date"
                    name="eventDate"
                    value={formData.eventDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border/50 text-foreground focus:border-gold focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Yemek Seçeneği */}
              <div>
                <label className="block text-sm text-muted-foreground mb-2">Yemek Seçeneği</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="cateringOption"
                      value="yemeksiz"
                      checked={formData.cateringOption === "yemeksiz"}
                      onChange={handleInputChange}
                      className="w-4 h-4 accent-gold"
                    />
                    <span className="text-foreground">Yemeksiz</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="cateringOption"
                      value="yemekli"
                      checked={formData.cateringOption === "yemekli"}
                      onChange={handleInputChange}
                      className="w-4 h-4 accent-gold"
                    />
                    <span className="text-foreground">Yemekli</span>
                  </label>
                </div>
              </div>

              {/* Menü Seçimi - Sadece yemekli seçildiğinde görünür */}
              {formData.cateringOption === "yemekli" && (
                <div>
                  <label className="block text-sm text-muted-foreground mb-2">Menü Seçimi</label>
                  <select
                    name="selectedMenu"
                    value={formData.selectedMenu}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border/50 text-foreground focus:border-gold focus:outline-none transition-colors"
                  >
                    <option value="">Menü Seçiniz</option>
                    {menus.map((menu) => (
                      <option key={menu.id} value={menu.title}>
                        {menu.title} - {menu.price}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className="block text-sm text-muted-foreground mb-2">Mesajınız</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border/50 text-foreground placeholder:text-muted-foreground focus:border-gold focus:outline-none transition-colors resize-none"
                  placeholder="Etkinliğiniz hakkında bilgi verin..."
                />
              </div>

              <Button 
                type="submit" 
                variant="hero" 
                size="lg" 
                className="w-full"
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
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
