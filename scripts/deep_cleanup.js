import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

async function deepCleanup() {
  const { data: products, error } = await supabase.from('products').select('id, name, categoryId');
  if (error) {
    console.error('Error fetching products:', error);
    return;
  }

  console.log(`Processing ${products.length} products...`);
  let updatedCount = 0;

  for (const product of products) {
    let newName = product.name;
    let newCategoryId = product.categoryId;
    let needsUpdate = false;

    // 1. Name Cleaning
    if (newName.toLowerCase().includes('bambook') || newName.toLowerCase().includes('bambuk')) {
      newName = newName.replace(/bambook/gi, '').replace(/bambuk/gi, '').trim();
      needsUpdate = true;
    }

    // 2. Category Correction (Logic: if it's bamboo stuff but in category 8, move to 1)
    // We assume codes starting with PO, HP, N, EK, etc. are bamboo if they were in cat 8.
    if (product.categoryId === 8 && /^(PO|HP|N|EK|M|K|W)/i.test(newName)) {
       newCategoryId = 1; // Move to Bambuk
       needsUpdate = true;
    }
    
    // Explicitly check for category 1 for anything that is actually bamboo
    if (product.name.toLowerCase().includes('bambuk') || product.name.toLowerCase().includes('bambook')) {
       newCategoryId = 1;
       needsUpdate = true;
    }

    if (needsUpdate) {
      const { error: updateError } = await supabase
        .from('products')
        .update({ name: newName, categoryId: newCategoryId })
        .eq('id', product.id);
      
      if (!updateError) updatedCount++;
    }
  }

  console.log(`Successfully updated ${updatedCount} products.`);
}

deepCleanup();
