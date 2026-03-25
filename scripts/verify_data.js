import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

async function checkData() {
  const { data: products, error } = await supabase.from('products').select('name, categoryId').limit(10);
  if (error) {
    console.error('Error:', error);
    return;
  }
  console.log('Sample Products (First 10):');
  products.forEach(p => console.log(`- ${p.name} (Cat: ${p.categoryId})`));

  const { data: counts, error: countError } = await supabase.from('products').select('categoryId');
  if (!countError) {
    const countsMap = {};
    counts.forEach(p => countsMap[p.categoryId] = (countsMap[p.categoryId] || 0) + 1);
    console.log('Category mapping in DB:', countsMap);
  }
}

checkData();
