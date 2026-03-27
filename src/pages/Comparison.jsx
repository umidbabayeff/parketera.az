import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useComparison } from '../context/ComparisonContext';
import { X, ArrowLeft, Check, Minus } from 'lucide-react';
import { Link } from 'react-router-dom';

const Comparison = () => {
  const { t, i18n } = useTranslation();
  const { comparedProducts, removeFromCompare, clearComparison } = useComparison();
  const currentLang = i18n.language;

  const specKeys = [
    { key: 'category', label: t('catalog.type') },
    { key: 'breed', label: t('specs.breed') },
    { key: 'size', label: t('specs.size') },
    { key: 'thickness', label: t('specs.thickness') },
    { key: 'layer', label: t('specs.layer') },
    { key: 'surface', label: t('specs.surface') },
    { key: 'warranty', label: t('specs.warranty') },
    { key: 'heating', label: t('specs.heating'), isBoolean: true },
  ];

  if (comparedProducts.length === 0) {
    return (
      <div className="pt-40 pb-20 bg-bg-dark min-h-screen text-center">
        <div className="max-w-xl mx-auto px-8">
          <h2 className="text-4xl font-display text-white mb-8">{t('compare.empty')}</h2>
          <Link to="/katalog" className="btn-primary px-10 py-4 uppercase tracking-widest text-xs inline-block">
            {t('compare.back')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 bg-bg-dark min-h-screen">
      <div className="max-w-[1600px] px-8 md:px-12 mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <div>
            <span className="text-accent-gold uppercase tracking-[0.4em] text-[10px] font-bold mb-4 block border-l-2 border-accent-gold pl-4">
              Parketera Tools
            </span>
            <h1 className="text-4xl md:text-7xl font-display text-white mt-2">
              {t('compare.title').split(' ')[0]} <br className="md:hidden" /><span className="luxury-gradient italic">{t('compare.title').split(' ').slice(1).join(' ')}</span>
            </h1>
          </div>
          <button 
            onClick={clearComparison}
            className="text-white/40 hover:text-white transition-colors text-[10px] uppercase tracking-widest font-bold border border-white/10 px-6 py-3"
          >
            {t('compare.clear')}
          </button>
        </div>

        <div className="overflow-x-auto overflow-y-hidden custom-scrollbar border border-white/5 bg-neutral-900/50 backdrop-blur-sm -mx-8 md:mx-0 px-8 md:px-0">
          <table className="w-full border-collapse min-w-max md:min-w-[800px]">
            <thead>
              <tr>
                <th className="min-w-[150px] md:w-1/5 p-4 md:p-8 text-left border-b border-r border-white/5 bg-black/20">
                  <h3 className="text-white/20 text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold">{t('compare.specs')}</h3>
                </th>
                {comparedProducts.map(product => (
                  <th key={product.id} className="p-4 md:p-8 border-b border-r border-white/5 relative group min-w-[200px] md:min-w-[250px]">
                    <button 
                      onClick={() => removeFromCompare(product.id)}
                      className="absolute top-4 right-4 text-white/20 hover:text-red-500 transition-colors"
                    >
                      <X size={18} />
                    </button>
                    <div className="aspect-[4/3] bg-black border border-white/5 mb-6 overflow-hidden">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover opacity-80" />
                    </div>
                    <Link to={`/mehsul/${product.id}`} className="block">
                      <h4 className="text-white font-display text-lg mb-2 group-hover:text-accent-gold transition-colors">{product.name}</h4>
                      <p className="text-accent-gold text-sm font-bold">{product.price} ₼ / m²</p>
                    </Link>
                  </th>
                ))}
                {/* Empty columns to fill up to 4 if needed on desktop */}
                {[...Array(Math.max(0, 4 - comparedProducts.length))].map((_, i) => (
                  <th key={`empty-${i}`} className="p-4 md:p-8 border-b border-r border-white/5 opacity-10 hidden md:table-cell">
                    <div className="aspect-[4/3] bg-white/5 border border-dashed border-white/20 flex items-center justify-center">
                       <span className="text-[10px] uppercase tracking-widest">+</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {specKeys.map(({ key, label, isBoolean }) => (
                <tr key={key} className="group hover:bg-white/[0.02] transition-colors">
                  <td className="p-4 md:p-8 border-r border-b border-white/5 bg-black/10">
                    <span className="text-white/40 text-[9px] md:text-[10px] uppercase tracking-widest font-bold">{label}</span>
                  </td>
                  {comparedProducts.map(product => (
                    <td key={`${product.id}-${key}`} className="p-4 md:p-8 border-r border-b border-white/5 text-center">
                      {isBoolean ? (
                        <div className="flex justify-center">
                          {product[key] ? (
                            <Check className="text-accent-gold" size={20} />
                          ) : (
                            <Minus className="text-white/10" size={20} />
                          )}
                        </div>
                      ) : (
                        <span className="text-white/80 text-sm font-light">
                          {product[key] || '-'}
                        </span>
                      )}
                    </td>
                  ))}
                  {[...Array(Math.max(0, 4 - comparedProducts.length))].map((_, i) => (
                    <td key={`empty-td-${key}-${i}`} className="p-4 md:p-8 border-r border-b border-white/5 opacity-5 hidden md:table-cell"></td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-16">
          <Link 
            to="/katalog" 
            className="inline-flex items-center gap-3 text-white/40 hover:text-accent-gold transition-colors group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-[10px] uppercase tracking-widest font-bold">{t('compare.back')}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Comparison;
