import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const directoriesToProcess = [
  path.join(__dirname, '../public/images'),
  path.join(__dirname, '../public/images/hero_frames')
];

async function processDirectory(dir) {
  if (!fs.existsSync(dir)) return;
  
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const fullPath = path.join(dir, file);
    
    // Process subdirectories recursively if needed
    if (fs.statSync(fullPath).isDirectory()) {
      if (!directoriesToProcess.includes(fullPath)) {
         await processDirectory(fullPath);
      }
      continue;
    }
    
    // Only process jpg, jpeg, png
    if (/\.(jpe?g|png)$/i.test(file)) {
      const outputPath = fullPath.replace(/\.(jpe?g|png)$/i, '.webp');
      
      // Skip if webp already exists
      if (fs.existsSync(outputPath)) {
        continue;
      }
      
      try {
        console.log(`Converting ${file} to WebP...`);
        // We will resize hero frames max 1920 width, others max 1200
        const image = sharp(fullPath);
        const metadata = await image.metadata();
        
        // Define maximum width
        let maxWidth = 1200;
        if (dir.includes('hero_frames')) {
          maxWidth = 1920;
        }

        // Only resize if the image actually exceeds the maximum width
        if (metadata.width > maxWidth) {
          image.resize({ width: maxWidth, withoutEnlargement: true });
        }
        
        await image.webp({ quality: 80 }).toFile(outputPath);
        console.log(`  -> Saved ${outputPath}`);
        
        // Optionally delete the original file to save space
        // fs.unlinkSync(fullPath); 
      } catch (err) {
        console.error(`Error processing ${file}:`, err);
      }
    }
  }
}

async function run() {
  console.log('Starting image optimization...');
  for (const dir of directoriesToProcess) {
    await processDirectory(dir);
  }
  console.log('Optimization complete!');
}

run();
