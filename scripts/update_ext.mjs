import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const files = [
  '../src/data/products.js',
  '../src/data/blog.js',
  '../src/data/quiz.js',
  '../src/components/About.jsx',
  '../src/pages/Home.jsx',
  '../src/pages/Projects.jsx',
  '../src/components/ProductCard.jsx',
  '../src/components/CategoryGrid.jsx',
  '../src/components/Navbar.jsx'
];

for (const file of files) {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(/\.(png|jpg|jpeg)/gi, '.webp');
    fs.writeFileSync(filePath, content);
    console.log(`Updated ${file}`);
  }
}
