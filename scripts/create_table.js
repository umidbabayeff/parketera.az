import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

async function createTable() {
  console.log('Creating products table...');
  
  // Note: Anon keys usually don't have permission to execute DDL. 
  // We'll try calling an existing rpc or see if we can do it via REST.
  // Actually, standard REST API doesn't allow CREATE TABLE.
  console.log('We cannot execute CREATE TABLE via the anon key REST API.');
  console.log('Please run this SQL in your Supabase SQL Editor:');
  console.log(`
CREATE TABLE IF NOT EXISTS products (
  id bigint primary key,
  name text not null,
  "categoryId" bigint,
  color text,
  price numeric,
  "inStock" boolean default true,
  image text,
  description text,
  specs jsonb
);
  `);
}
createTable();
