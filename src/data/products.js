// Centralized mock data source for all products and categories
export const categories = [
  { 
    id: 1, 
    name: 'Mühəndis Lövhəsi', 
    description: 'Yüksək davamlılıq və estetik görünüşün mükəmməl balansı. Çox qatlı quruluşu sayəsində rütubətə və temperatur dəyişikliklərinə qarşı xüsusi dayanıqlılıq göstərir.',
    image: '/images/engineered.png'
  },
  { 
    id: 2, 
    name: 'Massiv Parket', 
    description: 'Klassik və zamansız gözəllik. 100% təbii ağacdan hazırlanmış forması ilə məkanınıza istilik və təbiilik qatır.',
    image: '/images/massive.png'
  },
  { 
    id: 3, 
    name: 'Parket Kimyası', 
    description: 'Parketinizin ömrünü uzadan peşəkar qulluq vasitələri. Təmizləmə, qoruma və bərpa üçün ən yaxşı həllər.',
    image: '/images/chemistry.png'
  },
  { 
    id: 4, 
    name: 'Parket Yapışdırıcısı', 
    description: 'Parketinizin uzunömürlü olmasını təmin edən etibarlı yapışdırıcılar.',
    image: '/images/chemistry.png'
  },
];

export const products = [
  // Mühəndis Lövhəsi (Category 1)
  { 
    id: 101, 
    name: 'Oak Classic', 
    categoryId: 1, 
    color: 'Təbii Palıd', 
    price: 85, 
    inStock: true,
    image: '/images/engineered.png',
    description: 'Təbii palıdın bütün istiliyini və gözəlliyini özündə cəmləşdirən, klassik və heç vaxt dəbdən düşməyən bir seçim.',
    specs: [
      { label: 'Ölçü', value: '190x1900 mm' },
      { label: 'Qalınlıq', value: '14/3 mm' },
      { label: 'Səth', value: 'Fırçalanmış, Təbii Yağ' },
      { label: 'Zəmanət', value: '15 İl' }
    ]
  },
  { 
    id: 102, 
    name: 'Walnut Dark', 
    categoryId: 1, 
    color: 'Tünd Qoz', 
    price: 110, 
    inStock: true,
    image: '/images/engineered.png',
    description: 'Premium tünd qoz ağacı, dəbdəbəli məkanlar üçün mükəmməl seçimdir.',
    specs: [
      { label: 'Ölçü', value: '190x1900 mm' },
      { label: 'Qalınlıq', value: '14/3 mm' },
      { label: 'Səth', value: 'Lak' },
      { label: 'Zəmanət', value: '15 İl' }
    ]
  },
  { 
    id: 103, 
    name: 'Ash Light', 
    categoryId: 1, 
    color: 'Açıq Göyrüş', 
    price: 75, 
    inStock: true,
    image: '/images/engineered.png',
    description: 'Məkanı daha geniş və işıqlı göstərən zərif göyrüş toxuması.',
    specs: [
      { label: 'Ölçü', value: '190x1900 mm' },
      { label: 'Qalınlıq', value: '14/3 mm' },
      { label: 'Səth', value: 'Mat Lak' },
      { label: 'Zəmanət', value: '15 İl' }
    ]
  },
  { 
    id: 104, 
    name: 'Smoked Oak', 
    categoryId: 1, 
    color: 'Hissə Verilmiş Palıd', 
    price: 95, 
    inStock: false,
    image: '/images/engineered.png',
    description: 'Xüsusi texnologiya ilə tündləşdirilmiş, xarakterik naxışlı palıd.',
    specs: [
      { label: 'Ölçü', value: '190x1900 mm' },
      { label: 'Qalınlıq', value: '14/3 mm' },
      { label: 'Səth', value: 'Fırçalanmış, Yağ' },
      { label: 'Zəmanət', value: '15 İl' }
    ]
  },

  // Massiv Parket (Category 2)
  { 
    id: 201, 
    name: 'Royal Oak', 
    categoryId: 2, 
    color: 'Kral Palıdı', 
    price: 130, 
    inStock: true,
    image: '/images/massive.png',
    description: '100% təmiz palıd ağacından hazırlanmış, nəsillərdən nəsillərə ötürüləcək davamlılıq simvolu.',
    specs: [
      { label: 'Ölçü', value: '150x500-2000 mm' },
      { label: 'Qalınlıq', value: '20 mm' },
      { label: 'Səth', value: 'Cilalanmış, Lak' },
      { label: 'Zəmanət', value: '25 İl' }
    ]
  },
  { 
    id: 202, 
    name: 'Vintage Pine', 
    categoryId: 2, 
    color: 'Vintaj Şam', 
    price: 90, 
    inStock: true,
    image: '/images/massive.png',
    description: 'Retro stili sevənlər üçün xüsusi yaşlandırılmış təbii şam taxtası.',
    specs: [
      { label: 'Ölçü', value: '140x1000-2000 mm' },
      { label: 'Qalınlıq', value: '20 mm' },
      { label: 'Səth', value: 'Fırçalanmış, Təbii Yağ' },
      { label: 'Zəmanət', value: '20 İl' }
    ]
  },
  { 
    id: 203, 
    name: 'Classic Maple', 
    categoryId: 2, 
    color: 'Klassik Ağcaqayın', 
    price: 115, 
    inStock: true,
    image: '/images/massive.png',
    description: 'Açıq rəngli və incə naxışlı, zərif klassik interyerlər üçün ağcaqayın parketi.',
    specs: [
      { label: 'Ölçü', value: '130x500-1500 mm' },
      { label: 'Qalınlıq', value: '18 mm' },
      { label: 'Səth', value: 'Cilalanmış, Lak' },
      { label: 'Zəmanət', value: '20 İl' }
    ]
  },
  { 
    id: 204, 
    name: 'Rich Mahogany', 
    categoryId: 2, 
    color: 'Zəngin Maqahoni', 
    price: 160, 
    inStock: false,
    image: '/images/massive.png',
    description: 'Əsl lüksün göstəricisi olan qırmızımtıl-qəhvəyi tonlarda nadir maqahoni ağacı.',
    specs: [
      { label: 'Ölçü', value: '150x600-1800 mm' },
      { label: 'Qalınlıq', value: '21 mm' },
      { label: 'Səth', value: 'Lak' },
      { label: 'Zəmanət', value: '30 İl' }
    ]
  },

  // Parket Kimyası (Category 3)
  { 
    id: 301, 
    name: 'Nourishing Oil', 
    categoryId: 3, 
    color: 'Şəffaf', 
    price: 45, 
    inStock: true,
    image: '/images/chemistry.png',
    description: 'Taxtanı dərindən qidalandıran və qoruyan peşəkar parket yağı.',
    specs: [
      { label: 'Sərfiyyat', value: '1 L / 20 m²' },
      { label: 'Quruma', value: '12 saat' },
      { label: 'Növ', value: 'Təbii Yağ' },
      { label: 'Qablaşdırma', value: '2.5 L' }
    ]
  },
  { 
    id: 302, 
    name: 'Floor Wax', 
    categoryId: 3, 
    color: 'Mat', 
    price: 35, 
    inStock: true,
    image: '/images/chemistry.png',
    description: 'Parket səthində qoruyucu mat təbəqə yaradan mum.',
    specs: [
      { label: 'Sərfiyyat', value: '1 L / 30 m²' },
      { label: 'Quruma', value: '4 saat' },
      { label: 'Növ', value: 'Mum' },
      { label: 'Qablaşdırma', value: '1 L' }
    ]
  },
  { 
    id: 303, 
    name: 'Wood Cleaner', 
    categoryId: 3, 
    color: 'Gündəlik', 
    price: 25, 
    inStock: true,
    image: '/images/chemistry.png',
    description: 'Gündəlik qulluq üçün zərərsiz və təsirli təmizləyici vasitə.',
    specs: [
      { label: 'Qarışım', value: 'Su ilə seyrəldilir' },
      { label: 'İstifadə', value: 'Gündəlik' },
      { label: 'Növ', value: 'Maye Sabun' },
      { label: 'Qablaşdırma', value: '5 L' }
    ]
  },

  // Parket Yapışdırıcısı (Category 4)
  { 
    id: 401, 
    name: 'Tovcol MS 15kg', 
    categoryId: 4, 
    color: 'Poliuretan Yapışdırıcı', 
    price: 225, 
    inStock: true,
    image: '/images/chemistry.png',
    description: 'Həm mühəndis lövhəsi, həm də massiv parketlərin taxta və ya beton səthlərə möhkəm yapışdırılması üçün ideal həlldir.',
    specs: [
      { label: 'Çəki', value: '15 kg/Qutu' },
      { label: 'Sərfiyyat', value: '1 - 1.5 kg/m²' },
      { label: 'Xüsusiyyət', value: 'Rütubətə Davamlı' },
      { label: 'Quruma', value: '24-48 Saat' }
    ]
  }
];
