export interface MenuItem {
  name: string;
  description?: string;
}

export interface MenuCategory {
  title: string;
  items: MenuItem[];
}

export interface Menu {
  id: string;
  title: string;
  description: string;
  price: string;
  icon: string;
  image: string;
  categories: MenuCategory[];
  features: string[];
}

export const menus: Menu[] = [
  {
    id: "klasik",
    title: "Karışık Izgara Menü",
    description: "Geleneksel Türk mutfağının en sevilen tatlarından oluşan zengin menümüz.",
    price: "Kişi başı fiyat için iletişime geçin",
    icon: "🍽️",
    image: "/placeholder.svg",
    features: ["Soğuk Mezeler", "Ara Sıcak", "Ana Yemek"],
    categories: [
      {
        title: "Soğuk Mezeler",
        items: [
          { name: "Beyaz Peynir" },
          { name: "Domates, Salatalık" },
          { name: "Söğüş" },
          { name: "Haydari" },
          { name: "Patates Salatası" },
          { name: "Acılı Ezme" },
          { name: "Şakşuka" }
        ],
      },
      {
        title: "Girişte Çerez",
        items: [
          { name: "Karışık Çerez", description: "Fındık, fıstık, badem karışımı" }, 
        ],
      },{
        title: "Ara Sıcak",
        items: [
          { name: "Sigara Böreği", description: "Peynirli, kıtır kıtır" }
        ],
      },
      {
        title: "Ana Yemek",
        items: [
          { name: "Bonfile ve Kasap Köfte", description: "Pilav eşliğinde" },
          { name: "Izgara Tavuk", description: "Pilav eşliğinde" }
        ],
      },
      {
        title: "Salata",
        items: [
          { name: "Mevsim Salatası", description: "Taze mevsim yeşillikleri" },
        ],
      },
      {
        title: "Meyve",
        items: [
          { name: "Mevsim Meyveleri", description: "Taze mevsim meyveleri" },
        ],
      },
    ],
  },
  {
    id: "premium",
    title: "Premium Menü",
    description: "Özel günleriniz için hazırlanmış, seçkin lezzetlerden oluşan premium menümüz.",
    price: "Kişi başı fiyat için iletişime geçin",
    icon: "👑",
    image: "/placeholder.svg",
    features: ["Zengin Meze", "Deniz Ürünleri", "Et Çeşitleri", "Özel Tatlı"],
    categories: [
      {
        title: "Soğuk Mezeler",
        items: [
          { name: "Humus", description: "Nohut püresi, tahin, limon" },
          { name: "Patlıcan Salatası", description: "Közlenmiş patlıcan, sarımsak" },
          { name: "Haydari", description: "Süzme yoğurt, dereotu, sarımsak" },
          { name: "Rus Salatası", description: "Patates, havuç, bezelye, mayonez" },
          { name: "Atom", description: "Acılı domates ezmesi" },
          { name: "Deniz Börülcesi", description: "Zeytinyağlı" },
          { name: "Lakerda", description: "Marine edilmiş palamut" },
        ],
      },
      {
        title: "Ara Sıcaklar",
        items: [
          { name: "Sigara Böreği", description: "Peynirli, kıtır kıtır" },
          { name: "Karides Güveç", description: "Domates soslu, kaşar peynirli" },
          { name: "Midye Tava", description: "Tarator soslu" },
          { name: "Kalamar", description: "Kızarmış, limonlu" },
        ],
      },
      {
        title: "Ana Yemek",
        items: [
          { name: "Levrek Izgara", description: "Taze levrek, sebze garnitürü" },
          { name: "Kuzu Pirzola", description: "Özel marine, fırın patates" },
          { name: "Dana Bonfile", description: "Tereyağlı mantar sos" },
        ],
      },
      {
        title: "Tatlı",
        items: [
          { name: "Profiterol", description: "Çikolata soslu" },
          { name: "Mevsim Meyveleri", description: "Taze mevsim meyveleri" },
        ],
      },
    ],
  },
  {
    id: "vip",
    title: "VIP Menü",
    description: "En seçkin malzemeler ve şef özel tariflerle hazırlanan lüks menümüz.",
    price: "Kişi başı fiyat için iletişime geçin",
    icon: "✨",
    image: "/placeholder.svg",
    features: ["Şef Özel", "İthal Malzeme", "Canlı Pişirim", "Özel Sunum"],
    categories: [
      {
        title: "Aperatifler",
        items: [
          { name: "Truffle Carpaccio", description: "İnce dilimlenmiş dana, truffle yağı" },
          { name: "Istiridye", description: "Taze, limon ve sos" },
          { name: "Füme Somon", description: "Kapari, krema peyniri" },
        ],
      },
      {
        title: "Soğuk Mezeler",
        items: [
          { name: "Özel Meze Tabağı", description: "10 çeşit seçkin meze" },
          { name: "Havyar", description: "Rus havyarı, blini" },
          { name: "Füme Balık Çeşitleri", description: "3 çeşit füme balık" },
        ],
      },
      {
        title: "Ara Sıcaklar",
        items: [
          { name: "Jumbo Karides", description: "Tereyağlı, sarımsaklı" },
          { name: "Istakoz Kuyruğu", description: "Tereyağlı, limonlu" },
          { name: "Kalamar Dolma", description: "Deniz ürünleri dolgulu" },
        ],
      },
      {
        title: "Ana Yemek",
        items: [
          { name: "Wagyu Biftek", description: "Premium wagyu, özel sos" },
          { name: "Istakoz", description: "Bütün ıstakoz, tereyağlı" },
          { name: "Kuzu Incik", description: "12 saat pişirilmiş, sebze" },
        ],
      },
      {
        title: "Tatlı",
        items: [
          { name: "Çikolata Fondü", description: "Meyveler ile" },
          { name: "Tiramisu", description: "Klasik İtalyan tatlısı" },
          { name: "Macarons", description: "Fransız özel" },
        ],
      },
    ],
  },
];
