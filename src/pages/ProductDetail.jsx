import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Ruler, Shield, Layers, Calendar, Weight, Droplets, Zap } from 'lucide-react';
import { products } from '../data/products';

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

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const product = products.find(p => p.id === parseInt(id));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center pt-32 pb-20">
        <div className="text-center text-white">
          <h2 className="text-3xl font-display mb-4">Məhsul tapılmadı</h2>
          <Link to="/katalog" className="text-accent-gold hover:underline">Kataloqa qayıt</Link>
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
          <ArrowLeft size={14} /> Geri Qayıt
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
                Məhsul ID: {id}
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-display text-white mb-4 leading-tight">
              {product.name}
            </h1>
            
            <div className="flex flex-col gap-2 mb-8 border-b border-white/10 pb-6">
              {product.color && (
                <p className="text-white/60 text-sm uppercase tracking-[0.3em] font-bold">
                  Rəng: {product.color}
                </p>
              )}
              {product.price ? (
                <p className="text-accent-gold text-2xl font-display">
                  {product.price.toFixed(2)} AZN
                </p>
              ) : (
                <p className="text-accent-gold text-sm uppercase tracking-widest font-bold mt-2">
                  Qiymət üçün əlaqə
                </p>
              )}
            </div>

            {product.description && (
              <p className="text-white/60 text-lg leading-relaxed mb-12">
                {product.description}
              </p>
            )}

            <div className="grid grid-cols-2 md:grid-cols-2 gap-y-10 gap-x-6 mb-16">
              {product.specs.map((spec, index) => {
                const Icon = getIcon(spec.label);
                return (
                  <div key={index} className="flex gap-4 items-center border-l border-white/10 pl-4">
                    <div className="w-10 h-10 rounded-full border border-white/5 flex items-center justify-center shrink-0">
                      <Icon className="text-accent-gold/60" size={16} />
                    </div>
                    <div>
                      <span className="text-white/40 text-[9px] uppercase tracking-widest block mb-1">{spec.label}</span>
                      <span className="text-white text-sm font-bold block">{spec.value}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col sm:flex-row gap-6">
              <button className="btn-primary flex-1 py-5 bg-accent-gold text-black font-bold uppercase tracking-widest text-xs hover:bg-white transition-colors text-center">
                Sifariş Ver
              </button>
              <Link to="/elaqe" className="flex-1 py-5 border border-white/20 text-white font-bold uppercase tracking-widest text-xs hover:border-accent-gold hover:text-accent-gold transition-colors text-center">
                Məsləhətçi ilə Əlaqə
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
