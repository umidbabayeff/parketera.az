import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home'; // Synchronous load for initial render

// Lazy loaded auxiliary pages to prevent unused JS execution
const About = React.lazy(() => import('./pages/About'));
const Projects = React.lazy(() => import('./pages/Projects'));
const Blog = React.lazy(() => import('./pages/Blog'));
const BlogDetail = React.lazy(() => import('./pages/BlogDetail'));
const Contact = React.lazy(() => import('./pages/Contact'));
const Catalog = React.lazy(() => import('./pages/Catalog'));
const CategoryDetail = React.lazy(() => import('./pages/CategoryDetail'));
const ProductDetail = React.lazy(() => import('./pages/ProductDetail'));
const Comparison = React.lazy(() => import('./pages/Comparison'));

// Lazy loaded Admin
const AdminLayout = React.lazy(() => import('./pages/admin/AdminLayout'));
const ProductsAdmin = React.lazy(() => import('./pages/admin/ProductsAdmin'));
const ProductFormPage = React.lazy(() => import('./pages/admin/ProductFormPage'));

import { ComparisonProvider } from './context/ComparisonContext';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <Router>
      <CartProvider>
        <ComparisonProvider>
        <div className="flex flex-col min-h-screen bg-bg-dark text-white font-sans selection:bg-accent-gold selection:text-black">
          <ScrollToTop />
          <Navbar />
          <main className="flex-grow">
            <Suspense fallback={<div className="h-screen w-full bg-black flex items-center justify-center"><div className="w-8 h-8 border-2 border-accent-gold border-t-transparent rounded-full animate-spin"></div></div>}>
              <Routes>
                {/* Public Routes */}
                <Route index element={<Home />} />
                <Route path="haqqimizda" element={<About />} />
                <Route path="layiheler" element={<Projects />} />
                <Route path="bloq" element={<Blog />} />
                <Route path="bloq/:slug" element={<BlogDetail />} />
                <Route path="elaqe" element={<Contact />} />
                <Route path="katalog" element={<Catalog />} />
                <Route path="muqayise" element={<Comparison />} />
                <Route path="kategoriya/:id" element={<CategoryDetail />} />
                <Route path="mehsul/:id" element={<ProductDetail />} />

                {/* Admin Routes */}
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<div className="text-white text-xl p-8">Admin Panelə Xoş Gəlmisiniz!</div>} />
                  <Route path="products" element={<ProductsAdmin />} />
                  <Route path="products/new" element={<ProductFormPage />} />
                  <Route path="products/edit/:id" element={<ProductFormPage />} />
                </Route>
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </div>
      </ComparisonProvider>
    </CartProvider>
  </Router>
);
}

export default App;
