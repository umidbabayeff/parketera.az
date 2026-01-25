# Parketera - Online Flooring Store

Product catalog system for Parketera flooring store built with React, TypeScript, Tailwind CSS, and Supabase.

## Features

- 📦 Product catalog with 11+ flooring products
- 🔍 Search functionality by product name
- 🏷️ Category filtering (Parket, Yapışdırıcı, Lak, Təmizləyici vasitə)
- 📱 Responsive grid layout (mobile, tablet, desktop)
- 🎨 Modern UI with Tailwind CSS
- 🔐 Supabase backend with Row Level Security

## Setup

### 1. Install Dependencies

```bash
npm install @supabase/supabase-js
```

### 2. Configure Supabase

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Copy `.env.local.example` to `.env.local`
3. Fill in your Supabase credentials:
   - `NEXT_PUBLIC_SUPABASE_URL`: Your project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your anonymous key

### 3. Run Database Migrations

In your Supabase SQL Editor, run the migrations in order:

1. `supabase/migrations/001_create_products_table.sql` - Creates the products table
2. `supabase/migrations/002_seed_products.sql` - Seeds the database with product data

### 4. Use the Component

```tsx
import ProductCatalog from '@/components/ProductCatalog';

export default function Page() {
  return <ProductCatalog />;
}
```

## Project Structure

```
parketera.az/
├── components/
│   └── ProductCatalog.tsx      # Main product catalog component
├── lib/
│   └── supabase.ts             # Supabase client configuration
├── types/
│   └── product.ts              # TypeScript type definitions
├── supabase/
│   └── migrations/
│       ├── 001_create_products_table.sql
│       └── 002_seed_products.sql
└── .env.local.example          # Environment variables template
```

## Database Schema

### Products Table

| Column            | Type      | Description                    |
|-------------------|-----------|--------------------------------|
| id                | UUID      | Primary key                    |
| legacy_id         | INTEGER   | Original ID from source data   |
| category          | TEXT      | Product category               |
| name              | TEXT      | Product name                   |
| unit              | TEXT      | Measurement unit               |
| coverage_per_box  | NUMERIC   | Coverage per box in m²         |
| price             | NUMERIC   | Price in AZN                   |
| dimensions        | TEXT      | Product dimensions             |
| created_at        | TIMESTAMP | Creation timestamp             |
| updated_at        | TIMESTAMP | Last update timestamp          |

## TypeScript Types

```typescript
interface Product {
  id: string;
  legacy_id: number;
  category: string;
  name: string;
  unit: string;
  coverage_per_box: number;
  price: number;
  dimensions: string;
  created_at: string;
  updated_at: string;
}

type ProductCategory = 'Parket' | 'Yapışdırıcı' | 'Lak' | 'Təmizləyici vasitə';
```

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## License

MIT
