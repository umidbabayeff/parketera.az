import React, { useEffect, useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { categories } from '../data/products';
import { supabase } from '../lib/supabase';

const CategoryDetail = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const category = useMemo(() => categories.find(c => c.id === parseInt(id)), [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchCategoryProducts();
  }, [id]);

  const fetchCategoryProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('products').select('*').eq('categoryId', parseInt(id));
    if (data) {
      setProducts(data.map(p => ({
        ...p,
        categoryId: p.category_id,
        color: p.color || '',
        image: p.image_url || p.image,
        inStock: p.in_stock || p.inStock
      })));
    }
    setLoading(false);
  };

  if (!category) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center pt-32 pb-20">
        <div className="text-center text-white">
          <h2 className="text-3xl font-display mb-4">Kateqoriya tapılmadı</h2>
          <Link to="/" className="text-accent-gold hover:underline">Ana səhifəyə qayıt</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#050505] min-h-screen pt-32 pb-20">
      <div className="max-w-[1600px] px-8 md:px-12 mx-auto">
        <Link to="/katalog" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors uppercase tracking-[0.2em] text-[10px] font-bold mb-12">
          <ArrowLeft size={14} /> Kataloqa Qayıt
        </Link>

        {/* Hero Section for Category */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-accent-gold uppercase tracking-[0.4em] text-[10px] font-bold mb-6 block border-l-2 border-accent-gold pl-4">Kolleksiya</span>
            <h1 className="text-5xl md:text-7xl font-display text-white mb-6 leading-tight">
              {category.name}
            </h1>
            <p className="text-white/60 text-lg leading-relaxed max-w-xl mb-10">
              {category.description}
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-[400px] md:h-[600px] rounded-[2px] overflow-hidden border border-white/5"
          >
            <img src={category.image} alt={category.name} className="w-full h-full object-cover opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </motion.div>
        </div>

        {/* Product Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-12">
            <span className="w-12 h-[1px] bg-accent-gold" />
            <h2 className="text-3xl font-display text-white">Bütün Modellər</h2>
          </div>
          
          {loading ? (
             <div className="text-white/50 py-10">Məhsullar yüklənir...</div>
          ) : products.length === 0 ? (
             <div className="text-white/50 py-10">Bu kateqoriyada məhsul yoxdur.</div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
              {products.map((product, idx) => (
                <motion.div 
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group cursor-pointer flex flex-col h-full"
                >
                  <div className="relative h-[240px] md:h-[400px] lg:h-[480px] overflow-hidden bg-neutral-900 border border-white/5 mb-4 md:mb-6 rounded-[2px]">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105 opacity-80" />
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    
                    <Link 
                      to={`/mehsul/${product.id}`}
                      className="absolute bottom-3 left-3 right-3 md:bottom-6 md:left-6 md:right-6 text-center block"
                    >
                      <span className="w-full py-2 md:py-4 bg-white text-black font-bold uppercase tracking-widest text-[8px] md:text-[10px] hover:bg-accent-gold hover:text-black transition-colors block">
                        Ətraflı Bax
                      </span>
                    </Link>
                  </div>
                  <Link to={`/mehsul/${product.id}`} className="block mt-auto">
                    <h3 className="text-sm md:text-xl font-display text-white mb-1 md:mb-2 group-hover:text-accent-gold transition-colors">{product.name}</h3>
                    <p className="text-white/40 text-[9px] md:text-[11px] font-bold uppercase tracking-[0.2em]">{product.color}</p>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default CategoryDetail;
