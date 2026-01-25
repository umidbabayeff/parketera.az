# Quick Setup Guide

## Prerequisites

Make sure you have Node.js installed (v18 or higher recommended).

## Installation Steps

### 1. Install Dependencies

```bash
npm install
```

This will install all required packages:

- React & React DOM
- Next.js
- Supabase client
- TypeScript
- Tailwind CSS

### 2. Configure Environment Variables

Copy the example environment file:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

You can find these values in your Supabase project dashboard under **Settings > API**.

### 3. Set Up Database

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Run the migrations in order:
   - First: `supabase/migrations/001_create_products_table.sql`
   - Second: `supabase/migrations/002_seed_products.sql`

### 4. Start Development Server

```bash
npm run dev
```

Visit [http://localhost:3000/products](http://localhost:3000/products) to see your product catalog!

## Troubleshooting

### TypeScript Errors

If you see TypeScript errors about missing types, make sure all dependencies are installed:

```bash
npm install
```

### Supabase Connection Issues

- Verify your `.env.local` file has the correct credentials
- Check that your Supabase project is active
- Ensure RLS policies are enabled (they're created by the migration)

### Build Errors

Run type checking to see detailed errors:

```bash
npm run type-check
```

## Next Steps

Once everything is running:

1. ✅ View the product catalog at `/products`
2. ✅ Test the search functionality
3. ✅ Try filtering by category
4. 🔄 Add product images (see README for enhancement ideas)
5. 🔄 Customize the styling to match your brand

For more details, see [README.md](./README.md).
