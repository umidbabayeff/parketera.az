import { createClient } from '@supabase/supabase-js';
import { products } from '../src/data/products.js';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials in .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seedProducts() {
  console.log(`Starting to seed ${products.length} products...`);
  
  // Create table if it doesn't exist (using SQL editor or migrations normally, 
  // but we'll try to insert and it will fail if table is missing)
  
  const formattedProducts = products.map(p => ({
    id: p.id,
    name: p.name,
    categoryId: p.categoryId,
    color: p.color || null,
    price: p.price,
    inStock: p.inStock,
    image: p.image,
    description: p.description,
    specs: p.specs
  }));

  const { data, error } = await supabase
    .from('products')
    .upsert(formattedProducts, { onConflict: 'id' });

  if (error) {
    console.error('Error seeding data:', error.message);
    if (error.code === '42P01') {
      console.log('The "products" table does not exist. Please create it first in the Supabase Dashboard SQL editor.');
      console.log(`
CREATE TABLE products (
  id integer primary key,
  name text not null,
  category_id integer not null,
  color text,
  price numeric,
  in_stock boolean default true,
  image_url text,
  description text,
  specs jsonb
);
      `);
    }
  } else {
    console.log('Successfully seeded database!');
  }
}

seedProducts();
