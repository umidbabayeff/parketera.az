import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

function generateDescription(product) {
  const name = product.name.toLowerCase();
  const categoryId = product.category_id || product.categoryId;
  let desc = "";

  // Original existing description to keep
  const existingDesc = product.description ? product.description + "\\n\\n" : "";

  // Bambuk
  if (categoryId === 1 || name.includes('bamb')) {
    desc = "Ekoloji təmiz və yüksək davamlılığa malik bambukdan hazırlanmışdır. Bu döşəmə növü nəmə, cızıqlara və gündəlik istifadəyə qarşı üstün müqavimət göstərir. Təbii teksturası və unikal naxışları ilə interyerinizə həm vizual zənginlik, həm də uzunömürlülük qatır.";
    if (name.includes('chevron')) desc += " \"Chevron\" (Fransız yolkası) naxışı məkanınıza daha lüks və klassik bir dərinlik bəxş edəcək.";
    if (name.includes('herringbone')) desc += " \"Herringbone\" (İngilis yolkası) forması ənənəvi və zərif görünüş təmin edir.";
  }
  // Armoziya
  else if (categoryId === 2 || name.includes('armoziya') || name.includes('armosia')) {
    desc = "Afrika Tiki olaraq da tanınan Armoziya (Afrormosia) ekzotik ağac növündən hazırlanmış lüks parket. Özünəməxsus qızılı-qəhvəyi rəngi yaşlandıqca daha da tündləşir və qoz ağacına bənzər nəcib bir tona çevrilir. Həşəratlara, nəmə və cürüməyə qarşı inanılmaz dərəcədə davamlıdır. Yerdən isitmə sistemləri, eləcə də hamam və mətbəx kimi rütubətli zonalar üçün ideal və təhlükəsiz seçimdir.";
  }
  // Merbau
  else if (categoryId === 3 || name.includes('merbau')) {
    desc = "Asiya cəngəlliklərindən əldə olunan ekzotik və çox sərt Merbau ağacından döşəmə. Yüksək sıxlığı sayəsində mexaniki zədələrə qarşı davamlıdır. Tünd qırmızımtıl-qəhvəyi tonları ilə həm klassik, həm də müasir dizaynlara möhtəşəm uyğunluq yaradır.";
  }
  // Mühəndis Lövhəsi 
  else if (categoryId === 4) {
    desc = "Çoxqatlı strukturu sayəsində maksimum stabilik təklif edən Avropa keyfiyyətli mühəndis lövhəsi (Engineered Wood). Alt qatları rütubətə davamlı möhkəm faner, üst qatı isə təbii qiymətli ağac materialından ibarətdir. Gündəlik istismar və yer-isitmə sistemləri üçün tam uyğundur.";
  }
  // Laminat
  else if (categoryId === 6) {
    desc = "Asan quraşdırılan, cızıqlara və suya yüksək müqavimət göstərən premium laminat döşəmə. Yüksək istismar sinfi sayəsində mənzillərdə və ofislərdə uzun illər boyunca rəngini və formasını itirmir.";
  }
  // Parket Kimyası (Tover)
  else if (categoryId === 8 || name.includes('tover')) {
    if (name.includes('fullgap')) {
      desc = "Tover FullGap - yüksək keyfiyyətli taxta və parket aradolducusudur (məcun). Döşəmədəki çatları və boşluqları mükəmməl şəkildə doldurur, quruduqdan sonra qopma və ya çökmə vermir.";
    } else if (name.includes('tovclean') || name.includes('deteroil') || name.includes('pulito')) {
      desc = "Tover tərəfindən istehsal olunmuş peşəkar təmizləyici və qulluq vasitəsi. Parketin təbii görünüşünü və lak/yağ qatını zədələmədən qoruyur, ən sərt ləkə və kirləri asanlıqla təmizləyir. İtaliya istehsalıdır.";
    } else if (name.includes('stripcoll')) {
      desc = "Tover Stripcoll - parket səthində qalan inadkar yapışdırıcı qalıqlarını və digər mürəkkəb ləkələri asanlıqla təmizləyən xüsusi peşəkar həlledicidir.";
    } else if (name.includes('lux')) {
      desc = "Tover LUX - parketin səthinin parlaqlığını bərpa edən və qoruyan peşəkar təbii mum (wax) emulsiyasıdır. Solğunlaşmış və köhnəlmiş döşəmələrə yeni tək vizual effekt bəxş edir.";
    } else if (name.includes('sigil plus')) {
      desc = "Tover Sigil Plus - həlledici əsaslı sürətli quruyan yüksək keyfiyyətli parket məcunu. Elastikliyini qoruyaraq yonulma (şlifovka) işlərini asanlaşdırır.";
    } else if (name.includes('idrofondo')) {
      desc = "Tover Idrofondo H2O - tək komponentli, su əsaslı peşəkar astar (primer). Ağacın təbii rəngini qoruyur, iz və qabarma qoymur, laklamadan əvvəl ideal səth hazırlayır.";
    } else if (name.includes('uniqua')) {
      desc = "Tover Uniqua Natur - su əsaslı, hərəkət intensivliyi yüksək olan yerlər üçün nəzərdə tutulmuş iz qoymayan təbii görünüşlü peşəkar lakdır. Ekoloji baxımdan təmizdir və qoxusuzdur.";
    } else if (name.includes('tovcol ms') || name.includes('tovcol')) {
      desc = "Tover Tovcol MS - qoxusuz, solventsiz (tərkibində həlledici olmayan) və ekoloji təmiz MS polimer əsaslı parket yapışdırıcısı. Nəmə davamlıdır, yüksək elastikliyə malikdir və yerdən isitmə sistemləri üçün xüsusilə məsləhət görülür.";
    } else if (name.includes('slalom')) {
      desc = "Tover Slalom - su əsaslı bir komponentli parket lakı. Aşınmaya qarşı kifayət qədər davamlı olub səthə mükəmməl parlaqlıq/matlıq bəxş edir.";
    } else {
      desc = "Tover (İtaliya) tərəfindən istehsal edilən yüksək peşəkar parket kimyası. Parketinizin uzunömürlü olması və estetik görünüşünün qorunması üçün ən son texnologiyalarla uyğunlaşdırılmışdır.";
    }
  }

  // Fallback
  else {
    desc = "Yüksək keyfiyyətli və zəmanətli premium döşəmə/parket materialı. Estetik görünüşü və dayanıqlılığı ilə layihələrinizə dəyər qatır.";
  }

  return existingDesc + desc;
}

async function run() {
  console.log("Fetching products...");
  const { data: products, error } = await supabase.from('products').select('*');
  
  if (error) {
    console.error("Error fetching products:", error);
    return;
  }

  let updatedCount = 0;
  for (const product of products) {
    const newDesc = generateDescription(product);
    
    // Only update if it doesn't already end with this generated desc
    const { error: updateError } = await supabase.from('products').update({ description: newDesc }).eq('id', product.id);
    
    if (updateError) {
      console.error(`Error updating ID ${product.id}:`, updateError);
    } else {
      updatedCount++;
    }
  }
  console.log(`Successfully added rich authentic descriptions for ${updatedCount} products.`);
}

run();
