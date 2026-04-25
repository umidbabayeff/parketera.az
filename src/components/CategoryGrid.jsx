import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { categories as staticCategories } from '../data/products';
import { supabase } from '../lib/supabase';

const CategoryGrid = () => {
  const { t } = useTranslation();
  const [categories, setCategories] = useState(
    staticCategories.map(c => ({
      ...c,
      count: 0,
      span: 'col-span-1 md:col-span-6 lg:col-span-4'
    }))
  );

  useEffect(() => {
    async function fetchCounts() {
      const { data, error } = await supabase.from('products').select('categoryId').eq('inStock', true);
      if (!error && data) {
        const counts = {};
        data.forEach(p => {
          const id = p.categoryId;
          counts[id] = (counts[id] || 0) + 1;
        });
        
        setCategories(prev => prev.map(c => ({
          ...c,
          count: counts[c.id] || 0
        })));
      }
    }
    fetchCounts();
  }, []);

  return (
    <section id="catalog" className="py-32 bg-[#050505]">
      <div className="max-w-[1600px] px-8 md:px-12 mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-12">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-accent-gold uppercase tracking-[0.4em] text-[10px] font-bold mb-6 block border-l-2 border-accent-gold pl-4">{t('cat_grid.title')}</span>
              <h2 className="text-5xl md:text-7xl font-display text-white leading-tight">{t('cat_grid.heading')} <br /> <span className="italic luxury-gradient">{t('cat_grid.heading_italic')}</span></h2>
            </motion.div>
          </div>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-white/40 text-lg font-light max-w-sm"
          >
            {t('cat_grid.description')}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-4 md:gap-10">
          {categories.map((cat, index) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative overflow-hidden group cursor-pointer ${cat.span} h-[250px] md:h-[600px] bg-neutral-900 border border-white/5 rounded-[2px]`}
            >
              <img 
                src={cat.image} 
                alt={cat.title} 
                className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110 opacity-70 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10" />
              <Link to={`/kategoriya/${cat.id}`} className="absolute inset-0 z-30" />
              
              <div className="absolute inset-0 p-4 md:p-12 flex flex-col justify-end z-20 pointer-events-none">
                <span className="text-accent-gold text-[8px] md:text-[10px] font-bold uppercase tracking-[0.3em] mb-2 md:mb-4">
                  {cat.count} {t('cat_grid.models')}
                </span>
                <h3 className="text-lg md:text-3xl font-display text-white mb-2 md:mb-4">{t(`categories.${cat.id}.name`, cat.name)}</h3>
                <p className="text-white/40 text-[10px] md:text-sm font-light max-w-xs">
                  {t(`categories.${cat.id}.desc`, cat.description)}
                </p>
                <div className="mt-4 md:mt-8 flex items-center gap-2 md:gap-4">
                  <span className="text-white text-[8px] md:text-[11px] uppercase tracking-widest font-bold">{t('cat_grid.view_catalog')}</span>
                  <div className="w-12 h-[1px] bg-white/20 group-hover:w-24 group-hover:bg-accent-gold transition-all" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
