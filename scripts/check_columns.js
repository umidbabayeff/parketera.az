import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

async function checkSchema() {
  const { data, error } = await supabase.from('products').select('*').limit(1);
  if (error) {
    console.error('Error fetching sample product:', error);
    return;
  }
  if (data && data.length > 0) {
    console.log('Sample product columns:', Object.keys(data[0]));
  } else {
    console.log('No products found in the database.');
  }
}

checkSchema();
