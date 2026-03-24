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

async function updateNames() {
  console.log("Fetching products...");
  const { data: products, error } = await supabase.from('products').select('id, name');
  
  if (error) {
    console.error("Error fetching products:", error);
    return;
  }

  let updatedCount = 0;
  for (const product of products) {
    // Remove "Bambook " or "Bambuk " at the start of the name, case-insensitive
    const oldName = product.name;
    const newName = oldName.replace(/^(bambook|bambuk)\s+/i, '').trim();
    
    if (oldName !== newName) {
      console.log(`Updating [${product.id}]: "${oldName}" -> "${newName}"`);
      const { error: updateError } = await supabase.from('products').update({ name: newName }).eq('id', product.id);
      
      if (updateError) {
        console.error(`Error updating ID ${product.id}:`, updateError);
      } else {
        updatedCount++;
      }
    }
  }
  console.log(`Successfully updated ${updatedCount} products.`);
}

updateNames();
