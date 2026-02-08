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
    id: "karisik-menu",
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
    id: "et-menu",
    title: "Et Izgara Menü",
    description: "Geleneksel Türk mutfağının en sevilen tatlarından oluşan et menümüz.",
    price: "Kişi başı fiyat için iletişime geçin",
    icon: "👑",
    image: "/placeholder.svg",
    features: ["Mezeler", "Ara Sıcak", "Et Menü"],
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
          { name: "Özel Soslu Dana Antrikot", description: "Patates püresi eşliğinde" }
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
    id: "balik-menu",
    title: "Balık Menü",
    description: "Geleneksel Türk mutfağının en sevilen tatlarından oluşan balık menümüz.",
    price: "Kişi başı fiyat için iletişime geçin",
    icon: "✨",
    image: "/placeholder.svg",
    features: ["Mezeler", "Ara Sıcak", "Balık Menü"],
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
          { name: "Özel Soslu Levrek", description: "Roka ve özel salatası eşliğinde" },
          { name: "Çupra", description: "Roka ve özel salatası eşliğinde" }
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
];
