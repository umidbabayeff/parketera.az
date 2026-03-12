import React, { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Kataloq', href: '/katalog' },
    { name: 'Haqqımızda', href: '/haqqimizda' },
    { name: 'Layihələr', href: '/layiheler' },
    { name: 'Əlaqə', href: '/elaqe' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${isScrolled ? 'py-2 bg-black/90 backdrop-blur-2xl border-b border-white/5' : 'py-5 bg-black/40 backdrop-blur-sm'}`}>
      <div className="max-w-[1600px] px-8 md:px-12 mx-auto flex justify-between items-center">
        <Link to="/" className="group flex items-center h-[50px] md:h-[60px]">
          <div className="logo-golden w-[220px] md:w-[280px] h-full transition-transform duration-500 group-hover:scale-105" />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-12">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.href} 
              className={`text-[13px] uppercase tracking-[0.2em] font-bold transition-all duration-300 text-shadow-premium ${location.pathname === link.href ? 'text-accent-gold' : 'text-white hover:text-accent-gold'}`}
            >
              {link.name}
            </Link>
          ))}
          <a href="tel:+994501234567" className="btn-primary flex items-center gap-3 px-8 py-4 rounded-none uppercase tracking-[0.2em] text-[12px]">
            <Phone size={14} strokeWidth={2.5} />
            <span>Zəng edin</span>
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="lg:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={32} strokeWidth={1} /> : <Menu size={32} strokeWidth={1} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 top-0 left-0 w-full h-screen bg-black z-40 lg:hidden flex flex-col items-center justify-center gap-10"
          >
            <button className="absolute top-10 right-8 text-white" onClick={() => setIsMobileMenuOpen(false)}>
              <X size={32} strokeWidth={1} />
            </button>
            {navLinks.map((link, i) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 + 0.2 }}
              >
                <Link 
                  to={link.href} 
                  className="text-4xl font-display font-light text-white/90 hover:text-accent-gold transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <a href="tel:+994501234567" className="btn-primary mt-10">
                Bizimlə əlaqə
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
