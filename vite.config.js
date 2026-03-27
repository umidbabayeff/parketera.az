import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import viteCompression from 'vite-plugin-compression'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // Emit gzip-compressed files (.gz)
    viteCompression({ algorithm: 'gzip', ext: '.gz', threshold: 1024 }),
    // Emit brotli-compressed files (.br) — even smaller than gzip
    viteCompression({ algorithm: 'brotliCompress', ext: '.br', threshold: 1024 }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate React runtime into its own cacheable file
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          // Separate animation library (heaviest dependency)
          'vendor-framer': ['framer-motion'],
          // Separate i18n
          'vendor-i18n': ['i18next', 'react-i18next', 'i18next-browser-languagedetector'],
          // Separate Supabase (rarely changes, benefits most from caching)
          'vendor-supabase': ['@supabase/supabase-js'],
          // Separate icon library
          'vendor-icons': ['lucide-react'],
        },
      },
    },
    // Increase chunk warning limit slightly since we're intentionally splitting large vendors
    chunkSizeWarningLimit: 600,
  },
})

