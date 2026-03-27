import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { blogPosts } from '../data/blog';
import { Calendar, Clock, ChevronRight } from 'lucide-react';

const Blog = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;

  return (
    <div className="pt-32 pb-20 bg-bg-dark min-h-screen">
      <div className="max-w-[1600px] px-8 md:px-12 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 md:mb-24"
        >
          <span className="text-accent-gold uppercase tracking-[0.4em] text-[10px] font-bold mb-6 block border-l-2 border-accent-gold pl-4">
            {t('blog.subtitle')}
          </span>
          <h1 className="text-5xl md:text-7xl font-display leading-tight text-white">
            {t('blog.title').split(' ')[0]} <span className="luxury-gradient italic">{t('blog.title').split(' ').slice(1).join(' ')}</span>
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
          {blogPosts.map((post, index) => {
            const content = post[currentLang] || post.az;
            return (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <Link to={`/bloq/${post.slug}`} className="block">
                  <div className="relative aspect-[16/9] overflow-hidden bg-neutral-900 border border-white/5 mb-8">
                    <img 
                      src={post.image} 
                      alt={content.title} 
                      className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105 opacity-70 group-hover:opacity-100" 
                    />
                    <div className="absolute top-6 left-6">
                      <span className="px-4 py-1 bg-accent-gold text-black text-[9px] font-bold uppercase tracking-widest">
                        {content.category}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 text-white/30 text-[10px] uppercase tracking-widest font-bold mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="text-accent-gold" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={14} className="text-accent-gold" />
                      <span>5 {t('blog.time')}</span>
                    </div>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-display text-white mb-6 group-hover:text-accent-gold transition-colors leading-tight">
                    {content.title}
                  </h3>
                  
                  <p className="text-white/40 text-sm leading-relaxed mb-8 line-clamp-2 max-w-2xl">
                    {content.excerpt}
                  </p>

                  <div className="flex items-center gap-3 text-accent-gold text-[10px] uppercase tracking-widest font-bold group/btn">
                    <span>{t('blog.read_more')}</span>
                    <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Blog;
