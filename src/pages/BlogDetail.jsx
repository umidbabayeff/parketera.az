import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { blogPosts } from '../data/blog';
import { Calendar, Clock, ArrowLeft, Share2 } from 'lucide-react';

const BlogDetail = () => {
  const { slug } = useParams();
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;

  const post = blogPosts.find(p => p.slug === slug);
  
  if (!post) {
    return <Navigate to="/bloq" replace />;
  }

  const content = post[currentLang] || post.az;
  const relatedPosts = blogPosts.filter(p => p.id !== post.id).slice(0, 2);

  return (
    <div className="pt-32 pb-20 bg-bg-dark min-h-screen">
      <div className="max-w-[1000px] px-8 md:px-12 mx-auto">
        {/* Back Button */}
        <Link 
          to="/bloq" 
          className="inline-flex items-center gap-3 text-white/40 hover:text-accent-gold transition-colors mb-12 group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-[10px] uppercase tracking-widest font-bold">{t('blog.back')}</span>
        </Link>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <span className="text-accent-gold text-[10px] uppercase tracking-[0.3em] font-bold mb-6 block">
            {content.category}
          </span>
          <h1 className="text-4xl md:text-6xl font-display text-white mb-8 leading-tight">
            {content.title}
          </h1>

          <div className="flex items-center gap-8 py-8 border-y border-white/5">
            <div className="flex items-center gap-3 text-white/40 text-[10px] uppercase tracking-widest font-bold">
              <Calendar size={14} className="text-accent-gold" />
              <span>{t('blog.published')}: {post.date}</span>
            </div>
            <div className="flex items-center gap-3 text-white/40 text-[10px] uppercase tracking-widest font-bold">
              <Clock size={14} className="text-accent-gold" />
              <span>5 {t('blog.time')}</span>
            </div>
          </div>
        </motion.div>

        {/* Main Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="aspect-video bg-neutral-900 border border-white/5 mb-16 overflow-hidden"
        >
          <img 
            src={post.image} 
            alt={content.title} 
            className="w-full h-full object-cover opacity-80"
          />
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="prose prose-invert prose-gold max-w-none mb-20"
        >
          <div 
            className="blog-content text-white/70 text-lg font-light leading-relaxed space-y-8"
            dangerouslySetInnerHTML={{ __html: content.content }}
          />
        </motion.div>

        {/* Footer / Share */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-32">
          <div className="flex gap-4">
             {/* Share icons could go here */}
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div>
            <h4 className="text-white font-display text-2xl mb-12">{t('blog.related')}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {relatedPosts.map(rp => {
                const rpContent = rp[currentLang] || rp.az;
                return (
                  <Link key={rp.id} to={`/bloq/${rp.slug}`} className="group">
                    <div className="aspect-video overflow-hidden bg-neutral-900 border border-white/5 mb-6">
                      <img src={rp.image} alt={rpContent.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                    </div>
                    <h5 className="text-white text-lg font-display group-hover:text-accent-gold transition-colors">{rpContent.title}</h5>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogDetail;
