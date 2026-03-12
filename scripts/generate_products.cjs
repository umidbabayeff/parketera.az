const fs = require('fs');
const path = require('path');

const categories = [
  { id: 1, name: 'Bambuk Parket', description: 'Ekoloji və davamlı bambuk parketi. Müxtəlif rəng və naxış seçimləri ilə məkanınıza təbiət gözəlliyi qatır.', image: '/images/engineered.png' },
  { id: 2, name: 'Herringbone Parket', description: 'Klassik yolka naxışlı parket. Zərif və əlvan dizaynı ilə məkanınıza lüks görünüş verir.', image: '/images/engineered.png' },
  { id: 3, name: 'Merbau / Armosia / Teak', description: 'Ekzotik tropik ağac növlərindən hazırlanmış premium parketlər. Yüksək davamlılıq və unikal təbii naxışlar.', image: '/images/massive.png' },
  { id: 4, name: 'EK Herringbone', description: 'Kiçik formatlı ekzotik yolka parket. İncə detal işləməsi ilə klassik interyerlər üçün ideal seçim.', image: '/images/engineered.png' },
  { id: 5, name: 'BalticWood', description: 'Avropa keyfiyyətli BalticWood mühəndis lövhələri. Müxtəlif ölçü və rəng variantları ilə premium döşəmə həlli.', image: '/images/engineered.png' },
  { id: 6, name: 'Yapışdırıcı', description: 'Parketinizin uzunömürlü olmasını təmin edən peşəkar yapışdırıcılar.', image: '/images/chemistry.png' },
  { id: 7, name: 'Lak və Qruntovka', description: 'Parket səthini qoruyan və gözəlləşdirən lak, qruntovka və yağ məhsulları.', image: '/images/chemistry.png' },
  { id: 8, name: 'Parket Kimyası', description: 'Təmizləyici vasitələr, aradolducular və digər parket qulluq məhsulları.', image: '/images/chemistry.png' },
];

const rawProducts = [
  // Bambuk (cat 1)
  [1,'Mat Bambuk','m²','2,652','1020x130x15'],
  [1,'Parlaq Bambuk','m²','2,652','1020x130x15'],
  [1,'Massiv Bambook','m²','1,943','920x132x14'],
  [1,'Bambook PO001','m²','2,652','1020x130x15'],
  [1,'Bambook PO002','m²','2,652','1020x130x16'],
  [1,'Bambook N001','m²','2,652','1020x130x17'],
  [1,'Bambook HP02','m²','2,652','1020x130x18'],
  [1,'Bambook N003','m²','2,652','1020x130x19'],
  [1,'Bambook N004','m²','2,652','1020x130x20'],
  [1,'Bambook HP04','m²','2,652','1020x130x21'],
  [1,'Bambook EK004','m²','2,652','1020x130x22'],
  [1,'Bambook N005','m²','2,652','1020x130x23'],
  [1,'Bambook EK006','m²','2,652','1020x130x24'],
  [1,'Bambook EK009','m²','2,652','1020x130x25'],
  [1,'Bambook EK010','m²','2,652','1020x130x26'],
  [1,'Bambook EK015','m²','2,652','1020x130x27'],
  [1,'Bambook EK017','m²','2,652','1020x130x28'],
  [1,'Bambook EK018','m²','2,652','1020x130x29'],
  [1,'Bambook EK020','m²','2,652','1020x130x30'],
  [1,'Bambook EK027','m²','2,652','1020x130x31'],
  [1,'Bambook N19','m²','2,652','1020x130x32'],
  [1,'Bambook N2011','m²','2,652','1020x130x33'],
  [1,'Bambook N230','m²','2,652','1020x130x34'],
  [1,'Bambook N312','m²','2,652','1020x130x35'],
  [1,'Bambook N212','m²','2,652','1020x130x36'],
  [1,'Bambook N215','m²','2,652','1020x130x37'],
  [1,'Bambook HP01','m²','2,652','1020x130x38'],
  [1,'Bambook HP03','m²','2,652','1020x130x39'],
  [1,'Bambook HP04','m²','2,652','1020x130x40'],
  [1,'Bambook HP05','m²','2,652','1020x130x41'],
  [1,'Bambook HP06','m²','2,652','1020x130x42'],
  [1,'Bambook HP07','m²','2,652','1020x130x43'],
  [1,'Massiv Chevron','m²','1,99','580x132x14'],
  [1,'Massiv Herringbone','m²','1,9325','610x132x14'],
  // Herringbone (cat 2)
  [2,'Herringbone N 001','m²','2,4','600x100x15'],
  [2,'Herringbone N 003','m²','2,4','600x100x15'],
  [2,'Herringbone N 004','m²','2,4','600x100x15'],
  [2,'Herringbone N 005','m²','2,4','600x100x15'],
  [2,'Herringbone N 007','m²','2,4','600x100x15'],
  [2,'Herringbone N 03T','m²','2,4','600x100x15'],
  [2,'Herringbone N 019','m²','2,4','600x100x15'],
  [2,'Herringbone N 31','m²','2,4','600x100x15'],
  [2,'Herringbone N 91','m²','2,4','600x100x15'],
  [2,'Herringbone N 2011','m²','2,4','600x100x15'],
  [2,'Herringbone N 215','m²','2,4','600x100x15'],
  [2,'Herringbone N 230','m²','2,4','600x100x15'],
  [2,'Herringbone N 303','m²','2,4','600x100x15'],
  [2,'Herringbone N 314','m²','2,4','600x100x15'],
  [2,'Herringbone N 1','m²','1,176','500x98x15'],
  [2,'Herringbone N 5','m²','1,176','500x98x15'],
  [2,'Herringbone N 7','m²','1,176','500x98x15'],
  [2,'Herringbone N 8','m²','1,176','500x98x15'],
  [2,'Herringbone N 3','m²','1,176','500x98x15'],
  [2,'Herringbone N 4','m²','1,176','500x98x15'],
  // Merbau/Armosia/Teak (cat 3)
  [3,'Merbau - 120 Medium','m²','1,44','15x120x1500(300-1200)'],
  [3,'Merbau - 120 Light','m²','1,44','15x120x1500(300-1200)'],
  [3,'Merbau - 120 Dark','m²','1,44','15x120x1500(300-1200)'],
  [3,'Merbau - 90 Medium','m²','1,35','15x90x1500(300-1200)'],
  [3,'Merbau - 90 Light','m²','1,35','15x90x1500(300-1200)'],
  [3,'Merbau - 90 Dark','m²','1,35','15x90x1500(300-1200)'],
  [3,'Armosia 120','m²','1,44','16x120x1500(300-1200)'],
  [3,'Armosia 90','m²','1,35','15x90x1500(300-1200)'],
  [3,'Teak 120','m²','1,44','15x120x1500(300-1200)'],
  // EK Herringbone (cat 4)
  [4,'EK Herringbone Natural','m²','0,672','120x56x14'],
  [4,'EK Herringbone Coffee','m²','0,672','120x56x14'],
  [4,'EK Herringbone PA9GR-M','m²','0,649','118x55x14'],
  [4,'EK Herringbone PA9GR-Cream','m²','0,649','118x55x14'],
  [4,'EK Herringbone Venge N5540','m²','0,649','118x55x14'],
  // BalticWood (cat 5)
  [5,'BalticWood 1R Nougat','m²','1,439','1080x148x13.3'],
  [5,'BalticWood 1R Amber','m²','1,439','1080x148x13.3'],
  [5,'BalticWood 1R Taupe','m²','1,439','1080x148x13.3'],
  [5,'BalticWood 1R Coffee','m²','1,439','1080x148x13.3'],
  [5,'BalticWood 1R Cream','m²','1,439','1080x148x13.3'],
  [5,'BalticWood 1R Smooky','m²','1,439','1080x148x13.3'],
  [5,'BalticWood 1R Black Amber','m²','1,439','1080x148x13.3'],
  [5,'BalticWood 1R Forsty','m²','1,439','1080x148x13.3'],
  [5,'BalticWood 1R Villa Cream 182','m²','1,769','1080x182x13.3'],
  [5,'BalticWood 1R Villa Amber 182','m²','1,769','1080x182x13.3'],
  [5,'BalticWood 1R Villa Forsty 182','m²','1,769','1080x182x13.3'],
  [5,'BalticWood 1R Villa Smoky 182','m²','1,769','1080x182x13.3'],
  [5,'BalticWood 3R Forsty','m²','3,58722','2190x182x13.3'],
  [5,'BalticWood 3R Taupe','m²','3,58722','2190x182x13.3'],
  [5,'BalticWood 3R Amber','m²','3,58722','2190x182x13.3'],
  [5,'BalticWood 3R Black Amber','m²','3,58722','2190x182x13.3'],
  [5,'BalticWood 3R Smoky','m²','3,58722','2190x182x13.3'],
  [5,'BalticWood 3R Cream','m²','3,58722','2190x182x13.3'],
  [5,'BalticWood 3R Nougat','m²','3,58722','2190x182x13.3'],
  [5,'BalticWood 3R Coffee','m²','3,58722','2190x182x13.3'],
  [5,'BalticWood 3R Nougat 1090','m²','1,78542','1090x182x13.3'],
  [5,'BalticWood 3R Amber 1090','m²','1,78542','1090x182x13.3'],
  [5,'BalticWood 3R Taupe 1090','m²','1,78542','1090x182x13.3'],
  [5,'BalticWood 3R Black Amber 1090','m²','1,78542','1090x182x13.3'],
  [5,'BalticWood 3R Coffee 1090','m²','1,78542','1090x182x13.3'],
  [5,'BalticWood 3R Cream 1090','m²','1,78542','1090x182x13.3'],
  // Yapışdırıcı (cat 6)
  [6,'Tovcol MS Start 15kg','əd','',''],
  [6,'Tovcol MS 15kg','əd','',''],
  [6,'Tovcol TA 11kg','əd','',''],
  [6,'Tovcol TP2C 11kg','əd','',''],
  // Lak və Qruntovka (cat 7)
  [7,'Home Maxi Glossy 5lt','əd','',''],
  [7,'Home Maxi Semi Glossy 5lt','əd','',''],
  [7,'İdrofondo H20 5lt','əd','',''],
  [7,'MAXI OIL GLOSSY 2,5lt','əd','',''],
  [7,'MAXI OIL SEMI GLOSSY 2,5lt','əd','',''],
  // Parket Kimyası (cat 8)
  [8,'Darağ','əd','',''],
  [8,'LEGA STUCCO RS/A 5lt','əd','',''],
  [8,'Tover PULİTO PARQUET 1lt','əd','',''],
  [8,'Tover DETEROIL 1lt','əd','',''],
  [8,'Tover LUX 1lt','əd','',''],
  [8,'Tover Stripcoll 1lt','əd','',''],
  [8,'Tover TOVCLEAN 310ml','əd','',''],
  [8,'Tover FullGap White 310ml','əd','',''],
  [8,'Tover FullGap Venge 310ml','əd','',''],
  [8,'Tover FullGap OAP 310ml','əd','',''],
  [8,'Tover FullGap Teak 310ml','əd','',''],
];

const catImages = {1:'/images/engineered.png',2:'/images/engineered.png',3:'/images/massive.png',4:'/images/engineered.png',5:'/images/engineered.png',6:'/images/chemistry.png',7:'/images/chemistry.png',8:'/images/chemistry.png'};

const products = rawProducts.map(([catId,name,unit,boxArea,dims], i) => ({
  id: catId * 1000 + i + 1,
  name,
  categoryId: catId,
  unit,
  boxArea: boxArea || null,
  dimensions: dims || null,
  price: null,
  inStock: true,
  image: catImages[catId],
  description: '',
  specs: [
    ...(dims ? [{ label: 'Ölçü', value: dims + ' mm' }] : []),
    ...(boxArea ? [{ label: '1 qutuda', value: boxArea + ' m²' }] : []),
    { label: 'Ölçü vahidi', value: unit },
  ]
}));

let output = `// Auto-generated from Google Sheets - Məhsullar
export const categories = ${JSON.stringify(categories, null, 2)};

export const products = ${JSON.stringify(products, null, 2)};
`;

const outputPath = path.join(__dirname, '..', 'src', 'data', 'products.js');
fs.writeFileSync(outputPath, output);
console.log(`Generated ${products.length} products in ${categories.length} categories to ${outputPath}`);
