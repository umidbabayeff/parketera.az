import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Globe, BarChart2, Trash2, ArrowRight, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useComparison } from '../context/ComparisonContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const comparison = useComparison();
  const { comparedProducts = [], removeFromCompare = () => {}, clearComparison = () => {} } = comparison || {};

  const { 
    cartItems = [], 
    removeFromCart = () => {}, 
    getCartCount = () => 0, 
    getCartTotal = () => 0 
  } = useCart() || {};

  const handleCheckout = () => {
    const phone = "994702772240";
    const itemsList = cartItems.map(item => 
      `• ${item.name} (${item.quantity} ${item.unit || 'm²'}) - ${((item.price || 0) * item.quantity).toFixed(2)} AZN`
    ).join('%0A');
    
    const message = `Parketera.az - Sifariş:%0A%0A${itemsList}%0A%0A*Yekun Məbləğ: ${getCartTotal().toFixed(2)} AZN*`;
    window.open(`https://api.whatsapp.com/send?phone=${phone}&text=${message}`, '_blank');
  };

  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { name: t('nav.katalog'), href: '/katalog' },
    { name: t('nav.haqqimizda'), href: '/haqqimizda' },
    { name: t('nav.layiheler'), href: '/layiheler' },
    { name: t('nav.bloq'), href: '/bloq' },
    { name: t('nav.elaqe'), href: '/elaqe' },
  ];

  const languages = [
    { code: 'az', label: 'AZ' },
    { code: 'ru', label: 'RU' },
    { code: 'en', label: 'EN' },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 ${isScrolled ? 'py-2 bg-black/90 backdrop-blur-2xl border-b border-white/5' : 'py-5 bg-black/40 backdrop-blur-sm'}`}>
        <div className="max-w-[1600px] px-8 md:px-12 mx-auto flex justify-between items-center">
        <Link to="/" className="group flex items-center h-[50px] md:h-[60px]">
          <div className="logo-golden w-[140px] sm:w-[220px] md:w-[280px] h-full" />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-10">
          <div className="flex items-center gap-8 mr-4">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.href} 
                className={`text-[13px] uppercase tracking-[0.2em] font-bold transition-all duration-300 text-shadow-premium ${location.pathname === link.href ? 'text-accent-gold' : 'text-white hover:text-accent-gold'}`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-6 border-l border-white/10 pl-8">
            {/* Language Switcher */}
            <div className="flex items-center gap-4 mr-4 border-r border-white/10 pr-6">
              {languages.map((lng) => (
                <button
                  key={lng.code}
                  onClick={() => i18n.changeLanguage(lng.code)}
                  className={`text-[10px] font-bold tracking-widest transition-colors ${i18n.language === lng.code ? 'text-accent-gold' : 'text-white/40 hover:text-white'}`}
                >
                  {lng.label}
                </button>
              ))}
            </div>

            {/* Comparison Tool in Header */}
            {comparedProducts.length >= 2 && (
              <div className="relative mr-2">
                <button 
                  onClick={() => setIsCompareOpen(!isCompareOpen)}
                  className={`relative p-2 transition-colors ${isCompareOpen ? 'text-accent-gold' : 'text-white/60 hover:text-accent-gold'}`}
                >
                  <BarChart2 size={20} />
                  <span className="absolute -top-1 -right-1 bg-accent-gold text-black text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-black">
                    {comparedProducts.length}
                  </span>
                </button>


              </div>
            )}

            {/* Shopping Cart */}
            <div className="relative mr-4 border-l border-white/10 pl-6 h-10 flex items-center">
              <button 
                onClick={() => setIsCartOpen(!isCartOpen)}
                className={`relative p-2 transition-colors ${isCartOpen ? 'text-accent-gold' : 'text-white/60 hover:text-accent-gold'}`}
              >
                <ShoppingBag size={20} />
                {getCartCount() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent-gold text-black text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-black">
                    {getCartCount()}
                  </span>
                )}
              </button>


            </div>

            <a href="tel:+994702772240" className="btn-primary flex items-center gap-3 px-8 py-4 rounded-none uppercase tracking-[0.2em] text-[12px]">
              <Phone size={14} strokeWidth={2.5} />
              <span>{t('nav.zeng_edin')}</span>
            </a>
          </div>
        </div>

          <div className="flex items-center gap-4 sm:gap-6 lg:hidden">
            {getCartCount() > 0 && (
              <button onClick={() => setIsCartOpen(true)} className="relative p-2 text-accent-gold transition-transform active:scale-95">
                <ShoppingBag size={24} />
                <span className="absolute -top-1 -right-1 bg-accent-gold text-black text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-black">
                  {getCartCount()}
                </span>
              </button>
            )}
            {comparedProducts.length >= 2 && (
              <Link to="/muqayise" className="relative p-2 text-accent-gold transition-transform active:scale-95">
                <BarChart2 size={24} />
                <span className="absolute -top-1 -right-1 bg-accent-gold text-black text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-black">
                  {comparedProducts.length}
                </span>
              </Link>
            )}
            <button 
              className="text-white p-2 transition-transform active:scale-95 ml-2" 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={32} strokeWidth={1} /> : <Menu size={32} strokeWidth={1} />}
            </button>
          </div>
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
              className="flex flex-col items-center gap-6"
            >
              <a href="tel:+994702772240" className="btn-primary mt-10">
                {t('nav.zeng_edin')}
              </a>
              
              <div className="flex items-center gap-6 mt-4">
                {languages.map((lng) => (
                  <button
                    key={lng.code}
                    onClick={() => changeLanguage(lng.code)}
                    className={`text-sm font-bold tracking-[0.2em] ${i18n.language === lng.code ? 'text-accent-gold border-b border-accent-gold pb-1' : 'text-white/40'}`}
                  >
                    {lng.label}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      </nav>

      {/* Relocated Modals for Mobile Access - MUST BE OUTSIDE NAV DUE TO BACKDROP-BLUR CREATING A CONTAINING BLOCK */}
      <AnimatePresence>
        {isCompareOpen && (
          <>
            <div className="fixed inset-0 z-[45] bg-black/50" onClick={() => setIsCompareOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              className="fixed bottom-0 md:bottom-auto left-0 md:left-auto right-0 md:right-12 top-auto md:top-[90px] w-full md:w-80 bg-neutral-900 border-t md:border border-white/10 shadow-[0_-10px_30px_rgba(0,0,0,0.8)] md:shadow-2xl p-6 md:p-8 backdrop-blur-xl origin-bottom md:origin-top-right z-50"
            >
              <div className="flex justify-between items-center mb-6">
                <h4 className="text-white text-xs uppercase tracking-widest font-bold">
                  {t('compare.title')}
                </h4>
                <button onClick={clearComparison} className="text-white/40 hover:text-white text-[10px] uppercase font-bold transition-colors">
                  {t('compare.clear')}
                </button>
              </div>
              
              <div className="space-y-4 mb-8 max-h-60 overflow-y-auto custom-scrollbar pr-2">
                {comparedProducts.map(product => (
                  <div key={product.id} className="flex items-center gap-4 group">
                    <div className="w-12 h-12 bg-black border border-white/5 overflow-hidden shrink-0">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover opacity-60" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-[11px] font-bold truncate uppercase tracking-widest leading-tight">{product.name}</p>
                      <p className="text-accent-gold text-[10px] font-bold">{product.price} ₼</p>
                    </div>
                    <button 
                      onClick={() => removeFromCompare(product.id)}
                      className="text-white/20 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>

              <Link 
                to="/muqayise" 
                onClick={() => setIsCompareOpen(false)}
                className="btn-primary w-full flex items-center justify-center gap-3 py-4 text-[10px] uppercase tracking-widest"
              >
                <span>{t('compare.view')}</span>
                <ArrowRight size={14} />
              </Link>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isCartOpen && (
          <>
            <div className="fixed inset-0 z-[45] bg-black/50" onClick={() => setIsCartOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              className="fixed bottom-0 md:bottom-auto left-0 md:left-auto right-0 md:right-12 top-auto md:top-[90px] w-full md:w-96 bg-neutral-900 border-t md:border border-white/10 shadow-[0_-10px_30px_rgba(0,0,0,0.8)] md:shadow-2xl p-6 md:p-8 backdrop-blur-xl origin-bottom md:origin-top-right z-50 max-h-[85vh] flex flex-col"
            >
              <h4 className="text-white text-xs uppercase tracking-widest font-bold mb-6">
                {t('cart.title')}
              </h4>
              
              {cartItems.length === 0 ? (
                <div className="py-12 text-center">
                  <ShoppingBag size={40} className="mx-auto text-white/10 mb-4" />
                  <p className="text-white/40 text-[10px] uppercase tracking-widest">{t('cart.empty')}</p>
                </div>
              ) : (
                <>
                  <div className="overflow-y-auto mb-8 max-h-[50vh] md:max-h-[400px] custom-scrollbar pr-2 space-y-4">
                    {cartItems.map(item => (
                      <div key={item.id} className="flex items-center gap-4 group border-b border-white/5 pb-4 last:border-0">
                        <Link to={`/mehsul/${item.id}`} className="w-16 h-16 bg-black border border-white/5 overflow-hidden shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover opacity-60" />
                        </Link>
                        <div className="flex-1 min-w-0">
                          <Link to={`/mehsul/${item.id}`} className="text-white text-[11px] font-bold truncate uppercase tracking-widest leading-tight block hover:text-accent-gold transition-colors">
                            {item.name}
                          </Link>
                          <div className="flex justify-between items-center mt-2">
                            <p className="text-white/40 text-[10px]">{item.quantity} {item.unit || 'm²'}</p>
                            <p className="text-accent-gold text-[11px] font-bold">{((item.price || 0) * item.quantity).toFixed(2)} ₼</p>
                          </div>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-white/20 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-white/10 pt-6 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-white/40 text-[10px] uppercase tracking-widest">{t('cart.total')}</span>
                      <span className="text-white font-display text-xl">{getCartTotal().toFixed(2)} ₼</span>
                    </div>
                  </div>

                  <button 
                    onClick={handleCheckout}
                    className="btn-primary w-full flex items-center justify-center gap-3 py-4 text-[11px] uppercase tracking-widest"
                  >
                    <span>{t('cart.checkout')}</span>
                    <ArrowRight size={14} />
                  </button>
                </>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
