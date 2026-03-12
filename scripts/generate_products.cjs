const fs = require('fs');
const path = require('path');
const https = require('https');

const SHEET_URL = 'https://docs.google.com/spreadsheets/d/1tuDat6D1AQyBWaeJS_YO2Gqp0_JM2E4LY9mIRQ11Jc8/export?format=csv&gid=1225405711';

function fetchCSV(url = SHEET_URL) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return resolve(fetchCSV(res.headers.location));
      }
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => { resolve(data); });
    }).on('error', (err) => { reject(err); });
  });
}

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

const catImages = {1:'/images/engineered.png',2:'/images/engineered.png',3:'/images/massive.png',4:'/images/engineered.png',5:'/images/engineered.png',6:'/images/chemistry.png',7:'/images/chemistry.png',8:'/images/chemistry.png'};

async function run() {
  try {
    const csvData = await fetchCSV();
    console.log('CSV Data sample:', csvData.substring(0, 500));
    const lines = csvData.split(/\r?\n/).filter(l => l.trim() !== '').slice(1);
    console.log(`Total lines found: ${lines.length}`);
    const products = [];
    
    lines.forEach((line, i) => {
      // Robust CSV parser that handles quotes and empty cells
      const cells = [];
      let current = '';
      let inQuotes = false;
      for (let char of line) {
        if (char === '"') inQuotes = !inQuotes;
        else if (char === ',' && !inQuotes) {
          cells.push(current.trim());
          current = '';
        } else {
          current += char;
        }
      }
      cells.push(current.trim());

      if (cells.length < 3) return;
      
      const clean = (s) => s.replace(/^"|"$/g, '').trim();
      
      const no = clean(cells[0]);
      const type = clean(cells[1]);
      const name = clean(cells[2]);
      const unit = cells[3] ? clean(cells[3]) : '';
      const boxArea = cells[4] ? clean(cells[4]) : null;
      const price = cells[5] ? clean(cells[5]) : null;
      const dims = cells[6] ? clean(cells[6]) : null;
      
      if (!name || name === '') return;

      // Map spreadsheet categories to our category IDs
      let catId = 8; // Default to Parket Kimyası
      if (type.includes('Parket')) {
        if (name.includes('Bambuk')) catId = 1;
        else if (name.includes('Herringbone') || name.includes('Yolka')) {
          if (name.includes('EK ')) catId = 4;
          else catId = 2;
        }
        else if (name.match(/Merbau|Armosia|Teak/i)) catId = 3;
        else if (name.includes('BalticWood')) catId = 5;
        else if (name.includes('Chevron')) catId = 1; // Or add separate cat
      } else if (type.includes('Yapışdırıcı')) catId = 6;
      else if (type.includes('Lak') || type.includes('Qruntovka')) catId = 7;
      
      products.push({
        id: parseInt(no) || (catId * 1000 + i + 1),
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
      });
    });

    let output = `// Auto-generated from Google Sheets - Məhsullar
export const categories = ${JSON.stringify(categories, null, 2)};

export const products = ${JSON.stringify(products, null, 2)};
`;

    const outputPath = path.join(__dirname, '..', 'src', 'data', 'products.js');
    fs.writeFileSync(outputPath, output);
    console.log(`Generated ${products.length} products in ${categories.length} categories to ${outputPath}`);
  } catch (err) {
    console.error('Failed to sync:', err);
    process.exit(1);
  }
}

run();
