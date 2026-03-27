import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { categories } from '../data/products';
import ProductCard from '../components/ProductCard';
import { supabase } from '../lib/supabase';

const Catalog = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [selectedSubType, setSelectedSubType] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('products').select('*').order('id', { ascending: false });
    if (data) {
      setProducts(data.map(p => ({
        ...p,
        categoryId: p.categoryId || p.category_id,
        color: p.color || '',
        image: p.image || p.image_url,
        inStock: p.inStock || p.in_stock
      })));
    }
    setLoading(false);
  };

  // Filter products based on search term and selected categories
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = (product.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) || 
                            (product.color?.toLowerCase() || '').includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.categoryId);
      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, selectedCategories]);

  const toggleCategory = (categoryId) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(c => c !== categoryId)
        : [...prev, categoryId]
    );
    // Reset subcategories if deselecting Bambuk
    if (categoryId === 1 && selectedCategories.includes(1)) {
      setSelectedSubCategory(null);
      setSelectedSubType(null);
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategories([]);
    setSelectedSubCategory(null);
    setSelectedSubType(null);
  };

  // Helper for dynamic labels in translations
  const L = (key, defaultVal) => {
    const translated = t(key);
    return translated === key ? defaultVal : translated;
  };

  const bambukSubCategories = {
    'Dekorativ': ['Herringbone', 'Düz'],
    'Sadə': ['Parlaq', 'Mat'],
    'Massiv': ['Herringbone', 'Chevron', 'Düz']
  };

  const muhendisSubCategories = [
    'Maxi plank', 
    '1R', 
    '3R', 
    'Herringbone'
  ];

  return (
    <div className="pt-32 pb-20 bg-bg-dark min-h-screen">
      <div className="max-w-[1600px] px-8 md:px-12 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 md:mb-20"
        >
          <span className="text-accent-gold uppercase tracking-[0.4em] text-[10px] font-bold mb-6 block border-l-2 border-accent-gold pl-4">{t('catalog.portfolio', 'Məhsul Portfeli')}</span>
          <h1 className="text-5xl md:text-7xl font-display leading-tight text-white shadow-sm">
            {t('specs.exclusive')} <span className="luxury-gradient italic">{t('nav.katalog')}</span>
          </h1>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12 xl:gap-20">
          
          {/* Sidebar / Filters (Inline on Mobile) */}
          <div className="w-full lg:w-1/4 lg:sticky lg:top-32 h-fit mb-4 mt-8 lg:mt-0 lg:max-h-[calc(100vh-160px)] lg:overflow-y-auto lg:pr-6 custom-scrollbar">
            <div className="space-y-10 pr-2 pb-10">
              {/* Search */}
              <div>
                <h4 className="text-white/40 text-[10px] uppercase tracking-[0.2em] font-bold mb-4">{t('catalog.search', 'Axtarış')}</h4>
                <div className="relative">
                  <input
                    type="text"
                    placeholder={t('catalog.search_placeholder', 'Məhsul adı və ya rəng...')}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-neutral-900 border border-white/10 rounded-[2px] text-white px-4 py-3 pl-10 focus:outline-none focus:border-accent-gold transition-colors"
                  />
                  <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                </div>
              </div>

              {/* Categories */}
              <div>
                <h4 className="text-white/40 text-[10px] uppercase tracking-[0.2em] font-bold mb-4">{t('catalog.categories', 'Kateqoriyalar')}</h4>
                <div className="space-y-4">
                  {categories.map((cat) => (
                    <div key={cat.id} className="space-y-3">
                      <label className="flex items-center gap-3 cursor-pointer group" onClick={(e) => { e.preventDefault(); toggleCategory(cat.id); }}>
                        <div className={`w-4 h-4 border flex items-center justify-center transition-colors ${selectedCategories.includes(cat.id) ? 'border-accent-gold bg-accent-gold' : 'border-white/20 group-hover:border-white/50'}`}>
                          {selectedCategories.includes(cat.id) && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-2.5 h-2.5 bg-black" />}
                        </div>
                        <span className={`text-sm tracking-wide transition-colors ${selectedCategories.includes(cat.id) ? 'text-white font-medium' : 'text-white/60 group-hover:text-white'}`}>
                          {t(`categories.${cat.id}.name`, cat.name)}
                        </span>
                      </label>

                      {/* Nested Subcategories for Bambuk (ID 1) */}
                      {cat.id === 1 && selectedCategories.includes(1) && (
                        <motion.div 
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="pl-7 space-y-4 pt-1 border-l border-white/5 ml-2"
                        >
                          {Object.keys(bambukSubCategories).map((subCat) => (
                            <div key={subCat} className="space-y-3">
                              <label className="flex items-center gap-3 cursor-pointer group" onClick={(e) => { e.preventDefault(); setSelectedSubCategory(selectedSubCategory === subCat ? null : subCat); }}>
                                <div className={`w-3.5 h-3.5 border flex items-center justify-center transition-colors ${selectedSubCategory === subCat ? 'border-accent-gold bg-accent-gold/40' : 'border-white/10 group-hover:border-white/30'}`}>
                                  {selectedSubCategory === subCat && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-1.5 h-1.5 bg-accent-gold" />}
                                </div>
                                <span className={`text-[12px] transition-colors ${selectedSubCategory === subCat ? 'text-accent-gold' : 'text-white/50 group-hover:text-white/70'}`}>
                                  {t(`subcats.${subCat}`, subCat)}
                                </span>
                              </label>

                              {/* Nested SubTypes */}
                              {selectedSubCategory === subCat && (
                                <motion.div 
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  className="pl-6 space-y-2 pb-2"
                                >
                                  {bambukSubCategories[subCat].map((type) => (
                                    <label key={type} className="flex items-center gap-3 cursor-pointer group" onClick={(e) => { e.preventDefault(); setSelectedSubType(selectedSubType === type ? null : type); }}>
                                      <div className={`w-1.5 h-1.5 rounded-full border transition-colors ${selectedSubType === type ? 'bg-accent-gold border-accent-gold' : 'border-white/20 group-hover:border-white/40'}`} />
                                      <span className={`text-[10px] uppercase tracking-widest transition-colors ${selectedSubType === type ? 'text-white' : 'text-white/30 group-hover:text-white/50'}`}>
                                        {t(`subcats.${type}`, type)}
                                      </span>
                                    </label>
                                  ))}
                                </motion.div>
                              )}
                            </div>
                          ))}
                        </motion.div>
                      )}

                      {/* Nested Subcategories for Mühəndis Lövhəsi (ID 4) */}
                      {cat.id === 4 && selectedCategories.includes(4) && (
                        <motion.div 
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="pl-7 space-y-3 pt-1 border-l border-white/5 ml-2"
                        >
                          {muhendisSubCategories.map((subCat) => (
                            <label key={subCat} className="flex items-center gap-3 cursor-pointer group" onClick={(e) => { e.preventDefault(); setSelectedSubCategory(selectedSubCategory === subCat ? null : subCat); }}>
                              <div className={`w-3.5 h-3.5 border flex items-center justify-center transition-colors ${selectedSubCategory === subCat ? 'border-accent-gold bg-accent-gold/40' : 'border-white/10 group-hover:border-white/30'}`}>
                                {selectedSubCategory === subCat && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-1.5 h-1.5 bg-accent-gold" />}
                              </div>
                              <span className={`text-[12px] transition-colors ${selectedSubCategory === subCat ? 'text-accent-gold' : 'text-white/50 group-hover:text-white/70'}`}>
                                {t(`subcats.${subCat}`, subCat)}
                              </span>
                            </label>
                          ))}
                        </motion.div>
                      )}
                    </div>
                  ))}
                </div>
              </div>


              {/* Active Filters Clear */}
              {(searchTerm || selectedCategories.length > 0 || selectedSubCategory || selectedSubType) && (
                <button 
                  onClick={clearFilters}
                  className="text-accent-gold text-[10px] uppercase tracking-widest hover:underline pt-4 block"
                >
                  {t('catalog.clear_filters', 'Filterləri Təmizlə')} ({selectedCategories.length + (searchTerm ? 1 : 0) + (selectedSubCategory ? 1 : 0) + (selectedSubType ? 1 : 0)})
                </button>
              )}
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="h-64 flex items-center justify-center border border-white/5 bg-neutral-900/50">
                 <p className="text-white/40 text-sm">{t('catalog.loading', 'Yüklənir...')}</p>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="h-64 flex flex-col items-center justify-center border border-white/5 bg-neutral-900/50">
                <h3 className="text-white text-xl font-display mb-2">{t('catalog.no_products_title', 'Məhsul Tapılmadı')}</h3>
                <p className="text-white/40 text-sm">{t('catalog.no_products_text', 'Axtarış meyarlarınıza uyğun məhsul yoxdur.')}</p>
                <button onClick={clearFilters} className="mt-6 btn-primary px-6 py-2 uppercase tracking-widest text-[10px] bg-accent-gold text-black">
                  {t('catalog.reset_filters', 'Filterləri Sıfırla')}
                </button>
              </div>
            ) : (
              <div>
                <div className="mb-6 text-white/40 text-sm">
                  {t('catalog.found_start', 'Cəmi')} <span className="text-white font-bold">{filteredProducts.length}</span> {t('catalog.found_end', 'məhsul tapıldı')}
                </div>
                <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 lg:gap-10">
                  {filteredProducts.map((product, index) => (
                    <ProductCard key={product.id} product={product} index={index} />
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Catalog;
