import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { supabase } from '../lib/supabase';

const RelatedProducts = ({ categoryId, currentPrice, currentId }) => {
  const { t } = useTranslation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRelatedProducts();
  }, [categoryId, currentId]);

  const fetchRelatedProducts = async () => {
    if (!categoryId) {
      setLoading(false);
      return;
    }
    
    setLoading(true);
    
    // Similarity logic: 
    // 1. Same category
    // 2. Price proximity (+/- 30%)
    // 3. Not current product
    
    // Try both naming conventions for the query column if one fails, or just use the one that worked in Catalog.jsx
    // Note: Supabase columns are usually snake_case, but some projects use camelCase.
    // Based on subagent logs, 'category_id' was accepted (but eq.undefined failed).
    
    let query = supabase
      .from('products')
      .select('*')
      .neq('id', currentId);

    // Dynamic column selection (try to be smart)
    // Based on subagent logs, 'categoryId' is the correct column name.
    query = query.eq('categoryId', categoryId);

    if (currentPrice) {
      const minPrice = currentPrice * 0.7;
      const maxPrice = currentPrice * 1.3;
      query = query.gte('price', minPrice).lte('price', maxPrice);
    }

    const { data } = await query.limit(4);
    
    if (data) {
      setProducts(data);
    }
    setLoading(false);
  };

  if (loading || products.length === 0) return null;

  return (
    <div className="mt-32 pt-20 border-t border-white/5">
      <h3 className="text-3xl font-display text-white mb-12 uppercase tracking-wider text-center md:text-left">
        {t('product.related_products')}
      </h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <Link 
              to={`/mehsul/${item.id}`}
              className="group block"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-neutral-900 border border-white/5 mb-4">
                <img 
                  src={item.image_url || item.image} 
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <h4 className="text-white text-sm font-bold tracking-widest uppercase mb-1 transition-colors group-hover:text-accent-gold">
                {item.name}
              </h4>
              {item.price && (
                <p className="text-accent-gold text-xs font-display">
                  {item.price.toFixed(2)} AZN
                </p>
              )}
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
