import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import Catalog from './pages/Catalog';
import CategoryDetail from './pages/CategoryDetail';
import ProductDetail from './pages/ProductDetail';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <main className="bg-bg-dark min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/haqqimizda" element={<About />} />
          <Route path="/layiheler" element={<Projects />} />
          <Route path="/elaqe" element={<Contact />} />
          <Route path="/katalog" element={<Catalog />} />
          <Route path="/kategoriya/:id" element={<CategoryDetail />} />
          <Route path="/mehsul/:id" element={<ProductDetail />} />
        </Routes>
        
        <footer className="py-20 bg-bg-darker border-t border-white/5">
          <div className="max-w-[1600px] px-8 md:px-12 mx-auto text-center md:text-left">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-20">
              <div className="md:col-span-2 flex flex-col items-center md:items-start">
                <div className="logo-golden w-[260px] md:w-[340px] h-[60px] md:h-[75px] mb-8" />
                <p className="text-white/30 max-w-sm mb-10 text-center md:text-left">Mükəmməl parket həlləri ilə məkanınıza dəyər qatırıq. Hər Addımda Keyfiyyəti Hiss Edin.</p>
              </div>
              <div>
                <h4 className="text-white text-xs uppercase tracking-widest font-bold mb-8">Menu</h4>
                <ul className="space-y-4 text-sm text-white/40">
                  <li><a href="/" className="hover:text-accent-gold transition-colors">Ana Səhifə</a></li>
                  <li><a href="/haqqimizda" className="hover:text-accent-gold transition-colors">Haqqımızda</a></li>
                  <li><a href="/layiheler" className="hover:text-accent-gold transition-colors">Layihələr</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white text-xs uppercase tracking-widest font-bold mb-8">Sosial Media</h4>
                <ul className="space-y-4 text-sm text-white/40">
                  <li><a href="#" className="hover:text-accent-gold transition-colors">Instagram</a></li>
                  <li><a href="#" className="hover:text-accent-gold transition-colors">WhatsApp</a></li>
                  <li><a href="#" className="hover:text-accent-gold transition-colors">Facebook</a></li>
                </ul>
              </div>
            </div>
            <div className="mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
              <p className="text-white/20 text-xs">© 2026 Parketera.az. Bütün hüquqlar qorunur.</p>
              <p className="text-white/20 text-xs uppercase tracking-widest">Designed for Excellence</p>
            </div>
          </div>
        </footer>
      </main>
    </Router>
  );
}

export default App;
