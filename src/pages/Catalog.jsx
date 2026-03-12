import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, X } from 'lucide-react';
import { products, categories } from '../data/products';
import ProductCard from '../components/ProductCard';

const Catalog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Filter products based on search term and selected categories
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            product.color.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.categoryId);
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategories]);

  const toggleCategory = (categoryId) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(c => c !== categoryId)
        : [...prev, categoryId]
    );
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategories([]);
  };

  return (
    <div className="pt-32 pb-20 bg-bg-dark min-h-screen">
      <div className="max-w-[1600px] px-8 md:px-12 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 md:mb-20"
        >
          <span className="text-accent-gold uppercase tracking-[0.4em] text-[10px] font-bold mb-6 block border-l-2 border-accent-gold pl-4">Məhsul Portfeli</span>
          <h1 className="text-5xl md:text-7xl font-display leading-tight text-white shadow-sm">
            Eksklüziv <span className="luxury-gradient italic">Kataloq</span>
          </h1>
        </motion.div>

        {/* Mobile Filter Toggle Button */}
        <div className="lg:hidden mb-8 flex justify-end">
          <button 
            onClick={() => setIsMobileFiltersOpen(true)}
            className="flex items-center gap-2 text-white border border-white/20 px-4 py-2 hover:border-accent-gold hover:text-accent-gold transition-colors text-xs font-bold uppercase tracking-widest"
          >
            <Filter size={16} /> Filterlər
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 xl:gap-20">
          
          {/* Sidebar / Filters */}
          <div className={`
            fixed inset-0 z-50 bg-bg-dark/95 backdrop-blur-xl p-8 transform transition-transform duration-300 lg:relative lg:p-0 lg:bg-transparent lg:backdrop-blur-none lg:z-auto lg:w-1/4 lg:transform-none lg:translate-x-0 lg:block
            ${isMobileFiltersOpen ? 'translate-x-0' : '-translate-x-full'}
          `}>
            
            <div className="flex justify-between items-center mb-10 lg:hidden">
              <h3 className="text-white font-display text-2xl">Filterlər</h3>
              <button onClick={() => setIsMobileFiltersOpen(false)} className="text-white/60 hover:text-white">
                <X size={24} />
              </button>
            </div>

            <div className="sticky top-32 space-y-12">
              {/* Search */}
              <div>
                <h4 className="text-white/40 text-[10px] uppercase tracking-[0.2em] font-bold mb-4">Axtarış</h4>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Məhsul adı və ya rəng..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-neutral-900 border border-white/10 text-white px-4 py-3 pl-10 focus:outline-none focus:border-accent-gold transition-colors"
                  />
                  <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                </div>
              </div>

              {/* Categories */}
              <div>
                <h4 className="text-white/40 text-[10px] uppercase tracking-[0.2em] font-bold mb-4">Kateqoriyalar</h4>
                <div className="space-y-3">
                  {categories.map((cat) => (
                    <label key={cat.id} className="flex items-center gap-3 cursor-pointer group" onClick={(e) => { e.preventDefault(); toggleCategory(cat.id); }}>
                      <div className={`w-4 h-4 border flex items-center justify-center transition-colors ${selectedCategories.includes(cat.id) ? 'border-accent-gold bg-accent-gold' : 'border-white/20 group-hover:border-white/50'}`}>
                        {selectedCategories.includes(cat.id) && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-2 h-2 bg-black" />}
                      </div>
                      <span className={`text-sm transition-colors ${selectedCategories.includes(cat.id) ? 'text-white font-medium' : 'text-white/60 group-hover:text-white'}`}>
                        {cat.name}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Active Filters Clear */}
              {(searchTerm || selectedCategories.length > 0) && (
                <button 
                  onClick={clearFilters}
                  className="text-accent-gold text-xs uppercase tracking-widest hover:underline"
                >
                  Filterləri Təmizlə ({selectedCategories.length + (searchTerm ? 1 : 0)})
                </button>
              )}
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="h-64 flex flex-col items-center justify-center border border-white/5 bg-neutral-900/50">
                <h3 className="text-white text-xl font-display mb-2">Məhsul Tapılmadı</h3>
                <p className="text-white/40 text-sm">Axtarış meyarlarınıza uyğun məhsul yoxdur.</p>
                <button onClick={clearFilters} className="mt-6 btn-primary px-6 py-2 uppercase tracking-widest text-[10px] bg-accent-gold text-black">
                  Filterləri Sıfırla
                </button>
              </div>
            ) : (
              <div>
                <div className="mb-6 text-white/40 text-sm">
                  Cəmi <span className="text-white font-bold">{filteredProducts.length}</span> məhsul tapıldı
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-10">
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
