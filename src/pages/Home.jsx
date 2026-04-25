import React from 'react';
import Hero from '../components/Hero';
import CategoryGrid from '../components/CategoryGrid';
import QuizModal from '../components/QuizModal';
import OrderJourney from '../components/OrderJourney';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ChevronRight, Sparkles } from 'lucide-react';
import { supabase } from '../lib/supabase';

const Home = () => {
  const { t } = useTranslation();
  const [isQuizOpen, setIsQuizOpen] = React.useState(false);
  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await supabase.from('products').select('*').eq('inStock', true);
      if (data) setProducts(data);
    };
    fetchProducts();
  }, []);
  return (
    <div>
      <Hero />
      <div className="py-20 bg-bg-darker">
        <div className="max-w-[1600px] px-8 md:px-12 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
            <div className="flex flex-col gap-6">
              <span className="text-accent-gold text-2xl font-display italic">{t('home.precision')}</span>
              <p className="text-white/40 text-sm leading-relaxed">{t('home.precision_text')}</p>
            </div>
            <div className="flex flex-col gap-6">
              <span className="text-accent-gold text-2xl font-display italic">{t('home.heritage')}</span>
              <p className="text-white/40 text-sm leading-relaxed">{t('home.heritage_text')}</p>
            </div>
            <div className="flex flex-col gap-6">
              <span className="text-accent-gold text-2xl font-display italic">{t('home.quality')}</span>
              <p className="text-white/40 text-sm leading-relaxed">{t('home.quality_text')}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Quiz Assistant Section */}
      <section className="py-24 bg-black relative overflow-hidden">
        <div className="max-w-[1600px] px-8 md:px-12 mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16 md:gap-24">
            <div className="w-full lg:w-1/2">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="w-12 h-12 rounded-full bg-accent-gold/10 flex items-center justify-center mb-8">
                  <Sparkles className="text-accent-gold" size={24} />
                </div>
                <h2 className="text-4xl md:text-6xl font-display text-white mb-8 leading-tight">
                  {t('quiz.start_title')}
                </h2>
                <p className="text-white/40 text-lg font-light leading-relaxed mb-12">
                  {t('quiz.start_desc')}
                </p>
                <button 
                  onClick={() => setIsQuizOpen(true)}
                  className="btn-primary group flex items-center gap-4 px-10 py-5 uppercase tracking-widest text-[11px]"
                >
                  <span>{t('quiz.start_btn')}</span>
                  <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            </div>
            <div className="w-full lg:w-1/2">
               <motion.div
                 initial={{ opacity: 0, scale: 0.95 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 viewport={{ once: true }}
                 className="relative aspect-video bg-neutral-900 border border-white/5 overflow-hidden"
               >
                 <img 
                   src="/images/about.webp" 
                   alt="Quiz Assistant" 
                   className="w-full h-full object-cover opacity-60"
                 />
                 <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black to-transparent" />
               </motion.div>
            </div>
          </div>
        </div>
        
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-accent-gold/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-1/4 h-3/4 bg-accent-gold/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2" />
      </section>

      <CategoryGrid />

      <OrderJourney />

      {/* Quiz Modal */}
      <QuizModal 
        isOpen={isQuizOpen} 
        onClose={() => setIsQuizOpen(false)} 
        products={products}
      />
    </div>
  );
};

export default Home;
