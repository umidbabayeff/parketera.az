import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  az: {
    translation: {
      nav: {
        katalog: 'Kataloq',
        haqqimizda: 'Haqqımızda',
        layiheler: 'Layihələr',
        elaqe: 'Əlaqə',
        bloq: 'Bloq',
        zeng_edin: 'Zəng edin'
      },
      hero: {
        subtitle: 'Eksklüziv Parket Dünyası',
        title_line1: 'Hər Addımda',
        title_italic: 'Keyfiyyəti Hiss Edin',
        discover: 'Kolleksiyanı kəşf et',
        calculator: 'Kalkulyator',
        est: 'EST. 2012 / PREMIUM QUALITY'
      },
      home: {
        precision: '01. Dəqiqlik',
        precision_text: 'Hər bir plankanın yerləşdirilməsində riyazi dəqiqlik və sənətkarlıq tələb olunur.',
        heritage: '02. İrs',
        heritage_text: 'Ənənəvi iş üsullarını müasir texnologiyalarla birləşdirərək uzun ömürlü nəticələr əldə edirik.',
        quality: '03. Keyfiyyət',
        quality_text: 'Dünyanın ən prestijli brendlərindən seçilmiş xammal və materiallar.'
      },
      footer: {
        tagline: 'Mükəmməl parket həlləri ilə məkanınıza dəyər qatırıq. Hər Addımda Keyfiyyəti Hiss Edin.',
        menu: 'Menu',
        social: 'Sosial Media',
        home: 'Ana Səhifə',
        rights: '© 2026 Parketera.az. Bütün hüquqlar qorunur.'
      },
      contact: {
        title: 'Bizimlə Əlaqə',
        heading: 'Gəlin',
        heading_italic: 'Yaradaq',
        email: 'Email',
        address: 'Ünvan',
        address_value: 'Bakı ş., Ceyhun bəy Hacıbəyli küç. 32A',
        phone: 'Telefon',
        name_placeholder: 'Ad Soyad',
        phone_placeholder: 'Telefon',
        message_placeholder: 'Mesajınız',
        send: 'Göndər',
        success_msg: 'Mesajınız göndərildi!',
        error_msg: 'Xəta baş verdi. Yenidən cəhd edin.'
      },
      about: {
        title: 'Haqqımızda',
        heading: 'Parket Sahəsində',
        heading_italic: '30 İllik Təcrübə',
        description: 'Parketera olaraq, biz sadəcə döşəmə örtükləri satmırıq — biz sizin məkanınızın təməlini və atmosferini yaradırıq. 30 ildən artıq təcrübəmizlə, Azərbaycan bazarında ən keyfiyyətli ağac materiallarını sənətkarlıqla birləşdiririk.',
        stats: {
          projects: 'Tamamlanmış Layihə',
          experience: 'Parket Sahəsində İllik Təcrübə'
        }
      },
      calc: {
        title: 'Xərc Kalkulyatoru',
        subtitle: 'Təxmini büdcə hesablanması',
        area_label: 'Məkanın Sahəsi (m²)',
        area_placeholder: 'Məsələn, 50',
        parquet_label: 'Parket Növü',
        glue_label: 'Yapışdırıcı növü',
        glue_amount_label: 'Yapışdırıcı miqdarı (ədəd)',
        install_label: 'Montaj daxil edilsin',
        install_sublabel: 'Yalnız usta xidməti haqqı (+12 AZN/m²)',
        total_label: 'Təxmini Yekun Məbləğ',
        disclaimer: '* Bu qiymət yalnız təxminidir və xərcin həcmi rəsmi ölçü götürüldükdən sonra dəqiqləşəcəkdir.',
        select_placeholder: 'Seçin',
        parquet_options: {
          bambuk: 'Bambuk (~70 AZN/m²)',
          armosiya: 'Armoziya (~120 AZN/m²)',
          merbau: 'Merbau (~150 AZN/m²)',
          engineered: 'Mühəndis Lövhəsi (~85 AZN/m²)',
          laminat: 'Laminat (~25 AZN/m²)'
        },
        glue_options: {
          k1: '1 Komponent (~180 AZN)',
          k2: '2 Komponent (~140 AZN)'
        },
        layout: 'Döşəmə üsulu',
        layouts: {
          straight: 'Düz (5% itki)',
          diagonal: 'Diaqonal (10% itki)',
          herringbone: 'Herringbone / Chevron (15% itki)'
        },
        share_whatsapp: 'Smeta təklifini WhatsApp-la al',
        material_total: 'Ümumi material',
        waste_amount: 'İtki miqdarı',
        pcs: 'ədəd'
      },
      catalog: {
        all: 'Hamısı',
        filter: 'Filter',
        view_product: 'Məhsula bax',
        similar_products: 'Oxşar məhsullar',
        no_products: 'Məhsul tapılmadı.',
        portfolio: 'Məhsul Portfeli',
        search: 'Axtarış',
        search_placeholder: 'Məhsul adı və ya rəng...',
        categories: 'Kateqoriyalar',
        clear_filters: 'Filterləri Təmizlə',
        loading: 'Yüklənir...',
        no_products_title: 'Məhsul Tapılmadı',
        no_products_text: 'Axtarış meyarlarınıza uyğun məhsul yoxdur.',
        reset_filters: 'Filterləri Sıfırla',
        found_start: 'Cəmi',
        found_end: 'məhsul tapıldı',
        type: 'Növ'
      },
      product: {
        view_details: 'Ətraflı Bax',
        out_of_stock: 'Stokda Yoxdur',
        price_on_request: 'Qiymət üçün əlaqə',
        loading: 'Məhsul yüklənir...',
        not_found: 'Məhsul tapılmadı',
        back_to_catalog: 'Kataloqa qayıt',
        go_back: 'Geri Qayıt',
        id_label: 'Məhsul ID',
        related_products: 'Bəyənə biləcəyiniz digər məhsullar',
        color_label: 'Rəng',
        order_now: 'Sifariş Ver',
        contact_consultant: 'Məsləhətçi ilə Əlaqə'
      },
      category: {
        not_found: 'Kateqoriya tapılmadı',
        back_to_home: 'Ana səhifəyə qayıt',
        collection_label: 'Kolleksiya',
        all_models: 'Bütün Modellər',
        no_products: 'Bu kateqoriyada məhsul yoxdur.'
      },
      categories: {
        '1': { name: 'Bambuk', desc: 'Ekoloji və davamlı bambuk parketi. Müxtəlif rəng və naxış seçimləri ilə məkanınıza təbiət gözəlliyi qatır.' },
        '2': { name: 'Armoziya', desc: 'Zərif və lüks görünüşlü Armoziya parketi.' },
        '3': { name: 'Merbau', desc: 'Ekzotik ağac növlərindən hazırlanmış premium Merbau parket. Yüksək davamlılıq.' },
        '4': { name: 'Mühəndis Lövhəsi', desc: 'Avropa keyfiyyətli mühəndis lövhələri. Müxtəlif ölçü və rəng variantları.' },
        '8': { name: 'Parket Kimyası', desc: 'Təmizləyici vasitələr, yapışdırıcılar və digər parket qulluq məhsulları.' },
        '6': { name: 'Laminat', desc: 'Yüksək keyfiyyətli və suya davamlı laminat döşəmələr.' }
      },
      projects: {
        title: 'Layihələrimiz',
        heading: 'İmza',
        heading_italic: 'İşlərimiz'
      },
      specs: {
        size: 'Ölçü',
        thickness: 'Qalınlıq',
        surface: 'Səth',
        warranty: 'Zəmanət',
        weight: 'Çəki',
        consumption: 'Sərfiyyat',
        feature: 'Xüsusiyyət',
        drying: 'Quruma',
        type: 'Növ',
        packaging: 'Qablaşdırma',
        exclusive: 'Eksklüziv',
        breed: 'Cins',
        layer: 'Üst qat',
        heating: 'İsti döşəmə'
      },
      subcats: {
        'Dekorativ': 'Dekorativ',
        'Sadə': 'Sadə',
        'Massiv': 'Massiv',
        'Herringbone': 'Herringbone',
        'Düz': 'Düz',
        'Parlaq': 'Parlaq',
        'Mat': 'Mat',
        'Chevron': 'Chevron',
        'Maxi plank': 'Maxi plank',
        '1R': '1R',
        '3R': '3R'
      },
      cat_grid: {
        title: 'Kataloq',
        heading: 'Məkanınıza',
        heading_italic: 'Dəyər Qatın',
        description: 'Geniş çeşidli premium parket kolleksiyalarımızla tanış olun və öz stilinizə uyğun olanı seçin.',
        models: 'Model',
        view_catalog: 'Kataloqa bax'
      },
      blog: {
        title: 'Bloq və Bələdçilər',
        subtitle: 'Faydalı Məsləhətlər',
        read_more: 'Davamını oxu',
        back: 'Bloqa qayıt',
        published: 'Nəşr tarixi',
        time: 'dəq oxuma',
        related: 'Oxşar məqalələr'
      },
      compare: {
        title: 'Məhsulların Müqayisəsi',
        add: 'Müqayisəyə əlavə et',
        remove: 'Sil',
        clear: 'Təmizlə',
        limit: 'Maksimum 4 məhsul seçilə bilər',
        selected: 'seçilib',
        view: 'Müqayisə et',
        empty: 'Müqayisə üçün məhsul seçilməyib',
        back: 'Kataloqa qayıt',
        specs: 'Texniki Göstəricilər'
      },
      quiz: {
        start_title: 'Düzgün seçimi necə etməli?',
        start_desc: '5 sadə suala cavab verərək sizin üçün ən uyğun parketi tapın.',
        start_btn: 'Köməkçini başlat',
        next: 'Növbəti',
        prev: 'Geri',
        results_title: 'Sizin üçün ən yaxşı seçimlər',
        results_desc: 'Ehtiyaclarınıza əsasən seçilmiş 3 ideal məhsul:',
        retake: 'Yenidən keç',
        view_all: 'Bütün kataloqa bax',
        questions: {
          room: {
            q: 'Məkanın növü hansıdır?',
            living: 'Qonaq otağı',
            bedroom: 'Yataq otağı',
            kitchen: 'Mətbəx / Dəhliz',
            office: 'Ofis',
            commercial: 'Kommersiya sahəsi'
          },
          heating: {
            q: 'İsti döşəmə sisteminiz varmı?',
            yes: 'Bəli, var',
            no: 'Xeyr, yoxdur'
          },
          style: {
            q: 'Üstünlük verdiyiniz interyer stili?',
            modern: 'Modern',
            classic: 'Klassik',
            minimalist: 'Minimalist',
            luxury: 'Lüks'
          },
          usage: {
            q: 'Məkanda hərəkət intensivliyi necədir?',
            high: 'Yüksək (uşaqlar/ev heyvanları)',
            low: 'Aşağı (sakit mühit)'
          },
          tone: {
            q: 'Hansı rəng tonlarına üstünlük verirsiniz?',
            light: 'Açıq tonlar',
            medium: 'Orta tonlar',
            dark: 'Tünd tonlar'
          }
        }
      },
      cart: {
        title: 'Səbət',
        add: 'Səbətə əlavə et',
        added: 'Səbətə əlavə olundu',
        empty: 'Səbətiniz boşdur',
        total: 'Cəmi',
        checkout: 'WhatsApp ilə sifariş et',
        remove: 'Sil',
        items: 'məhsul',
        quantity: 'Miqdar'
      },
      pro: {
        title: 'PRO Zona',
        subtitle: 'Memarlar və Dizaynerlər üçün',
        texture_hd: 'HD Tekstura (Seamless)',
        cad_dwg: 'CAD / BIM Faylları',
        tech_spec: 'Texniki Məlumat Vərəqi',
        download: 'Yüklə',
        request: 'Sorğu göndər',
        modal_title: 'Professional Giriş',
        modal_desc: 'Texniki faylları yükləmək üçün məlumatlarınızı daxil edin.',
        label_name: 'Ad Soyad',
        label_role: 'Peşə',
        role_arch: 'Memar',
        role_des: 'Dizayner',
        role_dev: 'Podratçı / Developer',
        unlock: 'Girişi aç'
      },
      journey: {
        title: 'Parketera ilə Yolunuz',
        subtitle: 'Mükəmməl döşəməyə gedən 5 addım',
        step1_title: 'Peşəkar Konsultasiya',
        step1_desc: 'Məkanınıza uyğun ağac növü və dizayn seçimi.',
        step2_title: 'Texniki Ölçü',
        step2_desc: 'Mütəxəssis tərəfindən yerində dəqiq ölçmə.',
        step3_title: 'Məhsul və Kimya Seçimi',
        step3_desc: 'Parketə uyğun yapışqan və lakların seçilməsi.',
        step4_title: 'Ehtiyatlı Çatdırılma',
        step4_desc: 'Məhsulların təhlükəsiz şəkildə ünvana çatdırılması.',
        step5_title: 'Usta Montajı',
        step5_desc: 'Peşəkar ustalar tərəfindən zəmanətli quraşdırma.'
      }
    }
  },
  ru: {
    translation: {
      nav: {
        katalog: 'Каталог',
        haqqimizda: 'О нас',
        layiheler: 'Проекты',
        elaqe: 'Контакты',
        bloq: 'Блог',
        zeng_edin: 'Позвоните нам'
      },
      hero: {
        subtitle: 'Мир Эксклюзивного Паркета',
        title_line1: 'Чувствуйте Качество',
        title_italic: 'В Каждом Шаге',
        discover: 'Открыть коллекцию',
        calculator: 'Калькулятор',
        est: 'Осн. 2012 / ПРЕМИУМ КАЧЕСТВО'
      },
      home: {
        precision: '01. Точность',
        precision_text: 'Математическая точность и мастерство необходимы при укладке каждой планки.',
        heritage: '02. Наследие',
        heritage_text: 'Мы сочетаем традиционные методы работы с современными технологиями для достижения долговечных результатов.',
        quality: '03. Качество',
        quality_text: 'Сырье и материалы, отобранные среди самых престижных мировых брендов.'
      },
      footer: {
        tagline: 'Мы добавляем ценность вашему пространству с помощью идеальных паркетных решений. Чувствуйте качество в каждом шаге.',
        menu: 'Меню',
        social: 'Социальные сети',
        home: 'Главная',
        rights: '© 2026 Parketera.az. Все права защищены.'
      },
      contact: {
        title: 'Свяжитесь с нами',
        heading: 'Давайте',
        heading_italic: 'Творить',
        email: 'Электронная почта',
        address: 'Адрес',
        address_value: 'г. Баку, ул. Джейхунбея Гаджибейли, 32А',
        phone: 'Телефон',
        name_placeholder: 'Имя Фамилия',
        phone_placeholder: 'Телефон',
        message_placeholder: 'Ваше сообщение',
        send: 'Отправить',
        success_msg: 'Ваше сообщение отправлено!',
        error_msg: 'Произошла ошибка. Попробуйте еще раз.'
      },
      about: {
        title: 'О нас',
        heading: '30 лет опыта в сфере',
        heading_italic: 'Паркетного искусства',
        description: 'В Parketera мы не просто продаем напольные покрытия — мы создаем основу и атмосферу вашего дома. Имея более 30 лет опыта, мы сочетаем самые качественные древесные материалы на рынке Азербайджана с мастерством исполнения.',
        stats: {
          projects: 'Завершенных проектов',
          experience: 'Лет опыта в сфере паркета'
        }
      },
      calc: {
        title: 'Калькулятор расходов',
        subtitle: 'Расчет предварительного бюджета',
        area_label: 'Площадь помещения (м²)',
        area_placeholder: 'Например, 50',
        parquet_label: 'Тип паркета',
        glue_label: 'Тип клея',
        glue_amount_label: 'Количество клея (шт.)',
        install_label: 'Включить монтаж',
        install_sublabel: 'Только стоимость работы мастера (+12 AZN/м²)',
        total_label: 'Предварительная итоговая сумма',
        disclaimer: '* Эта цена является лишь оценочной и уточняется после официального замера.',
        select_placeholder: 'Выберите',
        parquet_options: {
          bambuk: 'Бамбук (~70 AZN/м²)',
          armosiya: 'Армозия (~120 AZN/м²)',
          merbau: 'Мербау (~150 AZN/м²)',
          engineered: 'Инженерная доска (~85 AZN/м²)',
          laminat: 'Ламинат (~25 AZN/м²)'
        },
        glue_options: {
          k1: '1 Компонент (~180 AZN)',
          k2: '2 Компонента (~140 AZN)'
        },
        layout: 'Способ укладки',
        layouts: {
          straight: 'Прямая (5% запаса)',
          diagonal: 'Диагональная (10% запаса)',
          herringbone: 'Ёлочка / Шеврон (15% запаса)'
        },
        share_whatsapp: 'Получить смету в WhatsApp',
        material_total: 'Всего материала',
        waste_amount: 'Объем запаса (итки)',
        pcs: 'шт'
      },
      catalog: {
        all: 'Все',
        filter: 'Фильтр',
        view_product: 'Посмотреть товар',
        similar_products: 'Похожие товары',
        no_products: 'Товары не найдены.',
        portfolio: 'Портфолио продуктов',
        search: 'Поиск',
        search_placeholder: 'Название товара или цвет...',
        categories: 'Категории',
        clear_filters: 'Очистить фильтры',
        loading: 'Загрузка...',
        no_products_title: 'Товары не найдены',
        no_products_text: 'Нет товаров, соответствующих вашим критериям поиска.',
        reset_filters: 'Сбросить фильтры',
        found_start: 'Всего найдено',
        found_end: 'товаров',
        type: 'Тип'
      },
      product: {
        view_details: 'Подробнее',
        out_of_stock: 'Нет в наличии',
        price_on_request: 'Цена по запросу',
        loading: 'Загрузка товара...',
        not_found: 'Товар не найден',
        back_to_catalog: 'Вернуться в каталог',
        go_back: 'Назад',
        id_label: 'ID товара',
        related_products: 'Вам также может понравиться',
        color_label: 'Цвет',
        order_now: 'Заказать',
        contact_consultant: 'Связаться с консультантом'
      },
      category: {
        not_found: 'Категория не найдена',
        back_to_home: 'На главную',
        collection_label: 'Коллекция',
        all_models: 'Все модели',
        no_products: 'В этой категории нет товаров.'
      },
      categories: {
        '1': { name: 'Бамбук', desc: 'Экологичный и долговечный бамбуковый паркет. Придает естественную красоту вашему пространству благодаря разнообразию цветов и узоров.' },
        '2': { name: 'Армозия', desc: 'Стильный и роскошный паркет Армозия.' },
        '3': { name: 'Мербау', desc: 'Паркет премиум-класса Мербау из экзотических пород дерева. Высокая прочность.' },
        '4': { name: 'Инженерная доска', desc: 'Инженерная доска европейского качества. Различные варианты размеров и цветов.' },
        '8': { name: 'Химия для паркета', desc: 'Чистящие средства, клеи и другие средства по уходу за паркетом.' },
        '6': { name: 'Ламинат', desc: 'Высококачественные и водостойкие ламинатные полы.' }
      },
      projects: {
        title: 'Наши проекты',
        heading: 'Наши знаковые',
        heading_italic: 'Работы'
      },
      specs: {
        size: 'Размер',
        thickness: 'Толщина',
        surface: 'Поверхность',
        warranty: 'Гарантия',
        weight: 'Вес',
        consumption: 'Расход',
        feature: 'Особенность',
        drying: 'Сушка',
        type: 'Тип',
        packaging: 'Упаковка',
        exclusive: 'Эксклюзивный',
        breed: 'Порода',
        layer: 'Верхний слой',
        heating: 'Теплый пол'
      },
      subcats: {
        'Dekorativ': 'Декоративный',
        'Sadə': 'Простой',
        'Massiv': 'Массивный',
        'Herringbone': 'Ёлочка (Herringbone)',
        'Düz': 'Прямой',
        'Parlaq': 'Глянцевый',
        'Mat': 'Матовый',
        'Chevron': 'Шеврон (Chevron)',
        'Maxi plank': 'Макси планка',
        '1R': '1-полосный',
        '3R': '3-полосный'
      },
      cat_grid: {
        title: 'Каталог',
        heading: 'Добавьте',
        heading_italic: 'Ценность вашему пространству',
        description: 'Ознакомьтесь с нашей широкой коллекцией паркета премиум-класса и выберите тот, который подходит именно вашему стилю.',
        models: 'Моделей',
        view_catalog: 'Посмотреть каталог'
      },
      blog: {
        title: 'Блог и Гайды',
        subtitle: 'Полезные Советы',
        read_more: 'Читать далее',
        back: 'Вернуться в блог',
        published: 'Опубликовано',
        time: 'мин на чтение',
        related: 'Похожие статьи'
      },
      compare: {
        title: 'Сравнение товаров',
        add: 'Добавить к сравнению',
        remove: 'Удалить',
        clear: 'Очистить',
        limit: 'Можно выбрать максимум 4 товара',
        selected: 'выбрано',
        view: 'Сравнить',
        empty: 'Товары для сравнения не выбраны',
        back: 'Вернуться в каталог',
        specs: 'Технические характеристики'
      },
      quiz: {
        start_title: 'Как сделать правильный выбор?',
        start_desc: 'Ответьте на 5 простых вопросов, чтобы найти идеальный паркет для вас.',
        start_btn: 'Запустить помощника',
        next: 'Далее',
        prev: 'Назад',
        results_title: 'Лучшие варианты для вас',
        results_desc: '3 идеальных продукта, выбранных на основе ваших потребностей:',
        retake: 'Пройти заново',
        view_all: 'Посмотреть весь каталог',
        questions: {
          room: {
            q: 'Каков тип помещения?',
            living: 'Гостиная',
            bedroom: 'Спальня',
            kitchen: 'Кухня / Коридор',
            office: 'Офис',
            commercial: 'Коммерческое помещение'
          },
          heating: {
            q: 'Есть ли у вас система теплого пола?',
            yes: 'Да, есть',
            no: 'Нет'
          },
          style: {
            q: 'Ваш предпочтительный стиль интерьера?',
            modern: 'Модерн',
            classic: 'Классика',
            minimalist: 'Минимализм',
            luxury: 'Люкс'
          },
          usage: {
            q: 'Какова интенсивность движения в помещении?',
            high: 'Высокая (дети/животные)',
            low: 'Низкая (тихая атмосфера)'
          },
          tone: {
            q: 'Каким цветовым тонам вы отдаете предпочтение?',
            light: 'Светлые тона',
            medium: 'Средние тона',
            dark: 'Темные тона'
          }
        }
      },
      cart: {
        title: 'Корзина',
        add: 'В корзину',
        added: 'Добавлено',
        empty: 'Ваша корзина пуста',
        total: 'Итого',
        checkout: 'Заказать через WhatsApp',
        remove: 'Удалить',
        items: 'товаров',
        quantity: 'Количество'
      },
      pro: {
        title: 'PRO Зона',
        subtitle: 'Для Архитекторов и Дизайнеров',
        texture_hd: 'HD Текстура (Seamless)',
        cad_dwg: 'CAD / BIM файлы',
        tech_spec: 'Технический паспорт',
        download: 'Скачать',
        request: 'Запросить',
        modal_title: 'Профессиональный доступ',
        modal_desc: 'Введите ваши данные, чтобы открыть доступ к техническим файлам.',
        label_name: 'Имя Фамилия',
        label_role: 'Профессия',
        role_arch: 'Архитектор',
        role_des: 'Дизайнер',
        role_dev: 'Подрядчик / Девелопер',
        unlock: 'Открыть доступ'
      },
      journey: {
        title: 'Ваш путь с Parketera',
        subtitle: '5 шагов к идеальному полу',
        step1_title: 'Профессиональная консультация',
        step1_desc: 'Подбор породы дерева и дизайна под ваш интерьер.',
        step2_title: 'Технический замер',
        step2_desc: 'Точный замер объекта нашим специалистом.',
        step3_title: 'Подбор химии и материалов',
        step3_desc: 'Выбор правильного клея и лака под ваш паркет.',
        step4_title: 'Бережная доставка',
        step4_desc: 'Безопасная транспортировка материалов на объект.',
        step5_title: 'Мастерский монтаж',
        step5_desc: 'Профессиональная укладка с гарантией качества.'
      }
    }
  },
  en: {
    translation: {
      nav: {
        katalog: 'Catalog',
        haqqimizda: 'About',
        layiheler: 'Projects',
        elaqe: 'Contact',
        bloq: 'Blog',
        zeng_edin: 'Call Us'
      },
      hero: {
        subtitle: 'Exclusive Parquet World',
        title_line1: 'Feel the Quality',
        title_italic: 'In Every Step',
        discover: 'Discover Collection',
        calculator: 'Calculator',
        est: 'EST. 2012 / PREMIUM QUALITY'
      },
      home: {
        precision: '01. Precision',
        precision_text: 'Mathematical precision and craftsmanship are required in the placement of each plank.',
        heritage: '02. Heritage',
        heritage_text: 'We combine traditional working methods with modern technologies to achieve long-lasting results.',
        quality: '03. Quality',
        quality_text: 'Raw materials and materials selected from the world\'s most prestigious brands.'
      },
      footer: {
        tagline: 'We add value to your space with perfect parquet solutions. Feel the Quality in Every Step.',
        menu: 'Menu',
        social: 'Social Media',
        home: 'Home',
        rights: '© 2026 Parketera.az. All rights reserved.'
      },
      contact: {
        title: 'Contact Us',
        heading: 'Let\'s',
        heading_italic: 'Create',
        email: 'Email',
        address: 'Address',
        address_value: '32A Jeyhunbey Hajibeyli St, Baku',
        phone: 'Phone',
        name_placeholder: 'Full Name',
        phone_placeholder: 'Phone Number',
        message_placeholder: 'Your Message',
        send: 'Send',
        success_msg: 'Your message has been sent!',
        error_msg: 'An error occurred. Please try again.'
      },
      about: {
        title: 'About us',
        heading: '30 Years of Experience',
        heading_italic: 'in Parquet Business',
        description: 'At Parketera, we don\'t just sell floor coverings — we create the foundation and atmosphere of your space. With over 30 years of experience, we masterfully combine the highest quality wood materials in the Azerbaijan market.',
        stats: {
          projects: 'Completed Projects',
          experience: 'Years of Experience in Parquet'
        }
      },
      calc: {
        title: 'Cost Calculator',
        subtitle: 'Estimated budget calculation',
        area_label: 'Space Area (m²)',
        area_placeholder: 'For example, 50',
        parquet_label: 'Parquet Type',
        glue_label: 'Glue Type',
        glue_amount_label: 'Glue Amount (pcs)',
        install_label: 'Include Installation',
        install_sublabel: 'Craftsman service fee only (+12 AZN/m²)',
        total_label: 'Estimated Total Amount',
        disclaimer: '* This price is only an estimate and will be clarified after official measurement.',
        select_placeholder: 'Select',
        parquet_options: {
          bambuk: 'Bamboo (~70 AZN/m²)',
          armosiya: 'Armoziya (~120 AZN/m²)',
          merbau: 'Merbau (~150 AZN/m²)',
          engineered: 'Engineered Board (~85 AZN/m²)',
          laminat: 'Laminate (~25 AZN/m²)'
        },
        glue_options: {
          k1: '1 Component (~180 AZN)',
          k2: '2 Component (~140 AZN)'
        },
        layout: 'Installation Layout',
        layouts: {
          straight: 'Straight (5% waste)',
          diagonal: 'Diagonal (10% waste)',
          herringbone: 'Herringbone / Chevron (15% waste)'
        },
        share_whatsapp: 'Get Quote via WhatsApp',
        material_total: 'Total Material',
        waste_amount: 'Waste Amount',
        pcs: 'pcs'
      },
      catalog: {
        all: 'All',
        filter: 'Filter',
        view_product: 'View product',
        similar_products: 'Similar products',
        no_products: 'No products found.',
        portfolio: 'Product Portfolio',
        search: 'Search',
        search_placeholder: 'Product name or color...',
        categories: 'Categories',
        clear_filters: 'Clear Filters',
        loading: 'Loading...',
        no_products_title: 'No Products Found',
        no_products_text: 'No products matching your search criteria.',
        reset_filters: 'Reset Filters',
        found_start: 'Total',
        found_end: 'products found',
        type: 'Type'
      },
      product: {
        view_details: 'View Details',
        out_of_stock: 'Out of Stock',
        price_on_request: 'Price on request',
        loading: 'Loading product...',
        not_found: 'Product not found',
        back_to_catalog: 'Back to catalog',
        go_back: 'Go Back',
        id_label: 'Product ID',
        related_products: 'You might also like',
        color_label: 'Color',
        order_now: 'Order Now',
        contact_consultant: 'Contact Consultant'
      },
      category: {
        not_found: 'Category not found',
        back_to_home: 'Back to home',
        collection_label: 'Collection',
        all_models: 'All Models',
        no_products: 'No products in this category.'
      },
      categories: {
        '1': { name: 'Bamboo', desc: 'Eco-friendly and durable bamboo parquet. Adds natural beauty to your space with a variety of color and pattern options.' },
        '2': { name: 'Armoziya', desc: 'Elegant and luxurious Armoziya parquet.' },
        '3': { name: 'Merbau', desc: 'Premium Merbau parquet made from exotic wood species. High durability.' },
        '4': { name: 'Engineered Board', desc: 'European quality engineered boards. Various size and color options.' },
        '8': { name: 'Parquet Chemistry', desc: 'Cleaning agents, adhesives and other parquet care products.' },
        '6': { name: 'Laminate', desc: 'High quality and water resistant laminate floors.' }
      },
      projects: {
        title: 'Our Projects',
        heading: 'Our Signature',
        heading_italic: 'Works'
      },
      specs: {
        size: 'Size',
        thickness: 'Thickness',
        surface: 'Surface',
        warranty: 'Warranty',
        weight: 'Weight',
        consumption: 'Consumption',
        feature: 'Feature',
        drying: 'Drying',
        type: 'Type',
        packaging: 'Packaging',
        exclusive: 'Exclusive',
        breed: 'Species',
        layer: 'Top layer',
        heating: 'Underfloor heating'
      },
      subcats: {
        'Dekorativ': 'Decorative',
        'Sadə': 'Simple',
        'Massiv': 'Massive',
        'Herringbone': 'Herringbone',
        'Düz': 'Straight',
        'Parlaq': 'Glossy',
        'Mat': 'Matte',
        'Chevron': 'Chevron',
        'Maxi plank': 'Maxi plank',
        '1R': '1st Strip',
        '3R': '3rd Strip'
      },
      cat_grid: {
        title: 'Catalog',
        heading: 'Add Value',
        heading_italic: 'To Your Space',
        description: 'Explore our wide collection of premium parquet and choose the one that fits your style.',
        models: 'Models',
        view_catalog: 'View Catalog'
      },
      blog: {
        title: 'Blog & Guides',
        subtitle: 'Useful Tips',
        read_more: 'Read More',
        back: 'Back to Blog',
        published: 'Published',
        time: 'min read',
        related: 'Related Articles'
      },
      quiz: {
        start_title: 'How to make the right choice?',
        start_desc: 'Answer 5 simple questions to find the perfect parquet for you.',
        start_btn: 'Start Assistant',
        next: 'Next',
        prev: 'Back',
        results_title: 'Best matches for you',
        results_desc: '3 ideal products selected based on your needs:',
        retake: 'Retake Quiz',
        view_all: 'View entire catalog',
        questions: {
          room: {
            q: 'What is the room type?',
            living: 'Living Room',
            bedroom: 'Bedroom',
            kitchen: 'Kitchen / Corridor',
            office: 'Office',
            commercial: 'Commercial space'
          },
          heating: {
            q: 'Do you have underfloor heating?',
            yes: 'Yes, I do',
            no: 'No'
          },
          style: {
            q: 'What is your preferred interior style?',
            modern: 'Modern',
            classic: 'Classic',
            minimalist: 'Minimalist',
            luxury: 'Luxury'
          },
          usage: {
            q: 'What is the traffic intensity?',
            high: 'High (kids/pets)',
            low: 'Low (peaceful environment)'
          },
          tone: {
            q: 'Which color tones do you prefer?',
            light: 'Light tones',
            medium: 'Medium tones',
            dark: 'Dark tones'
          }
        }
      },
      compare: {
        title: 'Product Comparison',
        add: 'Add to Compare',
        remove: 'Remove',
        clear: 'Clear',
        limit: 'Maximum 4 products can be selected',
        selected: 'selected',
        view: 'Compare',
        empty: 'No products selected for comparison',
        back: 'Back to Catalog',
        specs: 'Technical Specifications'
      },
      cart: {
        title: 'Shopping Cart',
        add: 'Add to Cart',
        added: 'Added to Cart',
        empty: 'Your cart is empty',
        total: 'Total',
        checkout: 'Order via WhatsApp',
        remove: 'Remove',
        items: 'items',
        quantity: 'Quantity'
      },
      pro: {
        title: 'PRO Zone',
        subtitle: 'For Architects & Designers',
        texture_hd: 'HD Texture (Seamless)',
        cad_dwg: 'CAD / BIM Files',
        tech_spec: 'Technical Datasheet',
        download: 'Download',
        request: 'Request Assets',
        modal_title: 'Professional Access',
        modal_desc: 'Please enter your professional details to unlock technical assets.',
        label_name: 'Full Name',
        label_role: 'Profession',
        role_arch: 'Architect',
        role_des: 'Designer',
        role_dev: 'Contractor / Developer',
        unlock: 'Unlock Access'
      },
      journey: {
        title: 'Your Journey with Parketera',
        subtitle: '5 steps to the perfect floor',
        step1_title: 'Professional Consultation',
        step1_desc: 'Expert advice on wood types and interior design.',
        step2_title: 'Technical Measurement',
        step2_desc: 'Precise onsite measurement by our specialist.',
        step3_title: 'Product & Care Selection',
        step3_desc: 'Matching the right adhesives and finishes.',
        step4_title: 'White-Glove Delivery',
        step4_desc: 'Safe and timely delivery to your location.',
        step5_title: 'Master Installation',
        step5_desc: 'Expert installation with full quality warranty.'
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'az',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
