import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const categories = [
  {
    id: 1,
    title: 'Mühəndis Lövhəsi',
    description: 'Yüksək davamlılıq və estetik görünüşün mükəmməl balansı.',
    image: '/images/engineered.png',
    count: 136,
    span: 'col-span-1 md:col-span-6 lg:col-span-6'
  },
  {
    id: 2,
    title: 'Massiv Parket',
    description: 'Klassik və zamansız gözəllik.',
    image: '/images/massive.png',
    count: 84,
    span: 'col-span-1 md:col-span-6 lg:col-span-6'
  },
  {
    id: 3,
    title: 'Parket Kimyası',
    description: 'Parketinizin ömrünü uzadan peşəkar qulluq vasitələri.',
    image: '/images/chemistry.png',
    count: 2,
    span: 'col-span-1 md:col-span-6 lg:col-span-6'
  },
  {
    id: 4,
    title: 'Parket Yapışdırıcısı',
    description: 'Parketinizin uzunömürlü olmasını təmin edən etibarlı yapışdırıcılar.',
    image: '/images/chemistry.png',
    count: 5,
    span: 'col-span-1 md:col-span-6 lg:col-span-6'
  }
];

const CategoryGrid = () => {
  return (
    <section id="catalog" className="py-32 bg-[#050505]">
      <div className="max-w-[1600px] px-8 md:px-12 mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-accent-gold uppercase tracking-[0.4em] text-[10px] font-bold mb-6 block border-l-2 border-accent-gold pl-4">Seçilmiş Kolleksiyalar</span>
              <h2 className="text-5xl md:text-7xl font-display text-white leading-tight">Məkanınızı <br /> <span className="italic luxury-gradient">Dəyişdirən Seçimlər</span></h2>
            </motion.div>
          </div>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-white/40 text-lg font-light max-w-sm"
          >
            Hər bir məhsulumuz uzunmüddətli istifadə və vizual mükəmməllik üçün nəzərdə tutulub.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {categories.map((cat, index) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative overflow-hidden group cursor-pointer ${cat.span} h-[600px] bg-neutral-900 border border-white/5 rounded-[2px]`}
            >
              <img 
                src={cat.image} 
                alt={cat.title} 
                className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110 opacity-70 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10" />
              <Link to={`/kategoriya/${cat.id}`} className="absolute inset-0 z-30" />
              
              <div className="absolute inset-0 p-12 flex flex-col justify-end z-20 pointer-events-none">
                <span className="text-accent-gold text-[10px] font-bold uppercase tracking-[0.3em] mb-4 opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
                  {cat.count} model mövcuddur
                </span>
                <h3 className="text-3xl font-display text-white mb-4 transition-transform group-hover:-translate-y-2">{cat.title}</h3>
                <p className="text-white/40 text-sm font-light max-w-xs transition-all opacity-0 group-hover:opacity-100 group-hover:-translate-y-2">
                  {cat.description}
                </p>
                <div className="mt-8 flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
                  <span className="text-white text-[11px] uppercase tracking-widest font-bold">Kataloqa bax</span>
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
