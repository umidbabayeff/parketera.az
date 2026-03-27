import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import Contact from './pages/Contact';
import Catalog from './pages/Catalog';
import CategoryDetail from './pages/CategoryDetail';
import ProductDetail from './pages/ProductDetail';
import Comparison from './pages/Comparison';
import ScrollToTop from './components/ScrollToTop';
import AdminLayout from './pages/admin/AdminLayout';
import ProductsAdmin from './pages/admin/ProductsAdmin';
import ProductFormPage from './pages/admin/ProductFormPage';

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
                <Route index element={<div className="text-white text-xl">Admin Panelə Xoş Gəlmisiniz!</div>} />
                <Route path="products" element={<ProductsAdmin />} />
                <Route path="products/new" element={<ProductFormPage />} />
                <Route path="products/edit/:id" element={<ProductFormPage />} />
              </Route>
            </Routes>
          </main>
          <Footer />
        </div>
      </ComparisonProvider>
    </CartProvider>
  </Router>
);
}

export default App;
