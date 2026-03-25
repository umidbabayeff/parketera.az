import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

async function cleanNames() {
  const { data: products, error } = await supabase.from('products').select('id, name');
  if (error) {
    console.error('Error fetching products:', error);
    return;
  }

  let updateCount = 0;
  for (const product of products) {
    // Remove "Bambuk" or "Bambook" (case-insensitive) from the start/content of the name
    // The user said: "убери слово Бамбук в названии... оставь только цифры которые там есть с буквами это коды"
    // e.g., "Bambuk PO001" -> "PO001"
    
    const newName = product.name.replace(/Bambook|Bambuk/gi, '').trim();
    
    if (newName !== product.name) {
      const { error: updateError } = await supabase.from('products').update({ name: newName }).eq('id', product.id);
      if (updateError) {
        console.error(`Error updating product ${product.id}:`, updateError);
      } else {
        updateCount++;
        console.log(`Updated: "${product.name}" -> "${newName}"`);
      }
    }
  }

  console.log(`Cleaned up ${updateCount} product names.`);
}

cleanNames();
