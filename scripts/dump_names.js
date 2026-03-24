import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';
dotenv.config({ path: '.env.local' });

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

async function dump() {
  const { data } = await supabase.from('products').select('*');
  fs.writeFileSync('product_dump.json', JSON.stringify(data, null, 2));
  console.log('Dumped to product_dump.json');
}
dump();
