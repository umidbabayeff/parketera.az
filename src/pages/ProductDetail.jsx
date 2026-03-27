import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Ruler, Shield, Layers, Calendar, Weight, Droplets, Zap, BarChart2, Check, ShoppingBag } from 'lucide-react';
import { useComparison } from '../context/ComparisonContext';
import { useCart } from '../context/CartContext';
import { supabase } from '../lib/supabase';
import RelatedProducts from '../components/RelatedProducts';
import CalculatorModal from '../components/CalculatorModal';
import ProAccessModal from '../components/ProAccessModal';
import { Image as ImageIcon, FileCode, FileText, Lock as LockIcon } from 'lucide-react';

// Helper to map label names to icons
const getIcon = (label) => {
  const iconMap = {
    'Ölçü': Ruler,
    'Qalınlıq': Layers,
    'Səth': Shield,
    'Zəmanət': Calendar,
    'Çəki': Weight,
    'Sərfiyyat': Droplets,
    'Xüsusiyyət': Shield,
    'Quruma': Zap,
    'Növ': Zap,
    'Qablaşdırma': Layers,
  };
  return iconMap[label] || Shield;
};

// Map spec labels to translation keys
const specKeyMap = {
  'Ölçü': 'size',
  'Qalınlıq': 'thickness',
  'Səth': 'surface',
  'Zəmanət': 'warranty',
  'Çəki': 'weight',
  'Sərfiyyat': 'consumption',
  'Xüsusiyyət': 'feature',
  'Quruma': 'drying',
  'Növ': 'type',
  'Qablaşdırma': 'packaging',
};

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { comparedProducts, addToCompare, removeFromCompare } = useComparison();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);
  const [isCalcOpen, setIsCalcOpen] = useState(false);
  const [isProUnlocked, setIsProUnlocked] = useState(false);
  const [isProModalOpen, setIsProModalOpen] = useState(false);

  useEffect(() => {
    const proUser = localStorage.getItem('parketera_pro_user');
    if (proUser) setIsProUnlocked(true);
    window.scrollTo(0, 0);
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    setLoading(true);
    const { data } = await supabase.from('products').select('*').eq('id', id).single();
    if (data) {
      setProduct({
        ...data,
        categoryId: data.categoryId || data.category_id,
        color: data.color || '',
        image: data.image_url || data.image,
        inStock: data.in_stock || data.inStock,
        specs: data.specs || []
      });
    }
    setLoading(false);
  };

  if (loading) {
     return (
       <div className="min-h-screen bg-[#050505] flex items-center justify-center">
         <div className="text-white/50">{t('product.loading')}</div>
       </div>
     );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center pt-32 pb-20">
        <div className="text-center text-white">
          <h2 className="text-3xl font-display mb-4">{t('product.not_found')}</h2>
          <Link to="/katalog" className="text-accent-gold hover:underline">{t('product.back_to_catalog')}</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#050505] min-h-screen pt-32 pb-20">
      <div className="max-w-[1600px] px-8 md:px-12 mx-auto">
        <button 
          onClick={() => navigate(-1)} 
          className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors uppercase tracking-[0.2em] text-[10px] font-bold mb-12"
        >
          <ArrowLeft size={14} /> {t('product.go_back')}
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Output Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative h-[500px] md:h-[700px] rounded-[2px] overflow-hidden bg-neutral-900 border border-white/5 group"
          >
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110 opacity-80"
            />
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="text-accent-gold uppercase tracking-[0.2em] text-[10px] font-bold">
                {t('product.id_label')}: {id}
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-display text-white mb-4 leading-tight">
              {product.name}
            </h1>
            
            <div className="flex flex-col gap-2 mb-8 border-b border-white/10 pb-6">
              {product.color && (
                <p className="text-white/60 text-sm uppercase tracking-[0.3em] font-bold">
                  {t('product.color_label')}: {product.color}
                </p>
              )}
              {product.price && (
                <p className="text-accent-gold text-2xl font-display">
                  {product.price.toFixed(2)} AZN
                </p>
              )}
              
              <div className="mt-10 flex flex-wrap items-center gap-x-12 gap-y-6">
                {/* Calculator */}
                <button 
                  onClick={() => setIsCalcOpen(true)}
                  className="flex items-center gap-3 text-accent-gold hover:text-white transition-colors group px-6 py-2.5 bg-accent-gold/5 border border-accent-gold/20 rounded-full"
                >
                  <Ruler size={14} />
                  <span className="text-[10px] uppercase tracking-widest font-bold">
                    {t('hero.calculator')}
                  </span>
                </button>

                <div className="hidden sm:block h-6 w-[1px] bg-white/10" />

                {/* PRO Assets Row */}
                <div className="flex items-center gap-8">
                  <div>
                    <span className="text-[9px] uppercase tracking-[0.3em] text-white/20 font-bold hidden xs:block">PRO</span>
                  </div>
                  <div className="flex gap-4">
                    {[
                      { icon: ImageIcon, label: 'HD', action: () => isProUnlocked ? window.open('https://example.com/texture-sample.jpg', '_blank') : setIsProModalOpen(true) },
                      { icon: FileCode, label: 'CAD', action: () => isProUnlocked ? window.open('https://example.com/cad-sample.dwg', '_blank') : setIsProModalOpen(true) },
                      { icon: FileText, label: 'PDF', action: () => isProUnlocked ? window.open('https://example.com/spec-sample.pdf', '_blank') : setIsProModalOpen(true) }
                    ].map((asset, i) => (
                      <button
                        key={i}
                        onClick={asset.action}
                        className="group/asset relative flex flex-col items-center gap-3"
                        title={asset.label}
                      >
                        <div className={`w-20 h-20 flex items-center justify-center border transition-all duration-300 ${isProUnlocked ? 'border-accent-gold/50 bg-accent-gold/15' : 'border-white/10 hover:border-accent-gold/40'}`}>
                          <asset.icon size={28} className={`${isProUnlocked ? 'text-accent-gold' : 'text-white/40 group-hover/asset:text-accent-gold'}`} />
                          {!isProUnlocked && (
                            <div className="absolute top-0 right-0 w-7 h-7 bg-black flex items-center justify-center translate-x-1/3 -translate-y-1/3 border border-accent-gold/50 shadow-[0_0_10px_rgba(212,175,55,0.2)]">
                              <LockIcon size={12} className="text-accent-gold" />
                            </div>
                          )}
                        </div>
                        <span className="text-[11px] uppercase tracking-[0.2em] font-bold text-white/30 group-hover/asset:text-white/60 transition-colors">
                          {asset.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {product.description && (
              <p className="text-white/60 text-lg leading-relaxed mb-12">
                {product.description}
              </p>
            )}

            <div className="grid grid-cols-2 md:grid-cols-2 gap-y-10 gap-x-6 mb-16">
              {product.specs.map((spec, index) => {
                const Icon = getIcon(spec.label);
                const specKey = specKeyMap[spec.label];
                return (
                  <div key={index} className="flex gap-4 items-center border-l border-white/10 pl-4">
                    <div className="w-10 h-10 rounded-full border border-white/5 flex items-center justify-center shrink-0">
                      <Icon className="text-accent-gold/60" size={16} />
                    </div>
                    <div>
                      <span className="text-white/40 text-[9px] uppercase tracking-widest block mb-1">
                        {specKey ? t(`specs.${specKey}`) : spec.label}
                      </span>
                      <span className="text-white text-sm font-bold block">{spec.value}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col sm:flex-row gap-6 mb-8">
              <button 
                onClick={() => {
                  addToCart(product, 1);
                  setAdded(true);
                  setTimeout(() => setAdded(false), 2000);
                }}
                className={`btn-primary flex-1 py-5 flex items-center justify-center gap-3 font-bold uppercase tracking-widest text-xs transition-all ${added ? 'bg-green-600 text-white' : 'bg-accent-gold text-black hover:bg-white'}`}
              >
                {added ? (
                  <>
                    <Check size={16} strokeWidth={3} />
                    <span>{t('cart.added')}</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag size={16} />
                    <span>{t('cart.add')}</span>
                  </>
                )}
              </button>
              <Link to="/elaqe" className="flex-1 py-5 border border-white/20 text-white font-bold uppercase tracking-widest text-xs hover:border-accent-gold hover:text-accent-gold transition-colors text-center">
                {t('product.contact_consultant')}
              </Link>
            </div>

            <button 
              onClick={() => {
                const isCompared = comparedProducts.find(p => p.id === product.id);
                if (isCompared) {
                  removeFromCompare(product.id);
                } else {
                  addToCompare(product);
                }
              }}
              className={`w-full py-4 flex items-center justify-center gap-3 border transition-all uppercase tracking-widest text-[10px] font-bold ${comparedProducts.find(p => p.id === product.id) ? 'bg-accent-gold text-black border-accent-gold' : 'border-white/10 text-white/40 hover:text-white hover:border-white/20'}`}
            >
              {comparedProducts.find(p => p.id === product.id) ? (
                <>
                  <Check size={16} strokeWidth={3} />
                  <span>{t('compare.selected')}</span>
                </>
              ) : (
                <>
                  <BarChart2 size={16} />
                  <span>{t('compare.add')}</span>
                </>
              )}
            </button>
          </motion.div>
        </div>

        {/* Smart Recommendations */}
        <RelatedProducts 
          categoryId={product.categoryId} 
          currentPrice={product.price} 
          currentId={product.id} 
        />

      </div>

      <CalculatorModal 
        isOpen={isCalcOpen} 
        onClose={() => setIsCalcOpen(false)} 
        preselectedProduct={product}
      />

      <ProAccessModal 
        isOpen={isProModalOpen} 
        onClose={() => setIsProModalOpen(false)} 
        onUnlock={() => setIsProUnlocked(true)}
      />
    </div>
  );
};

export default ProductDetail;
