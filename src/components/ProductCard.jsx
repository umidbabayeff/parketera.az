import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Check, BarChart2, ShoppingBag } from 'lucide-react';
import { useComparison } from '../context/ComparisonContext';
import { useCart } from '../context/CartContext';
import { useTranslation } from 'react-i18next';

const ProductCard = ({ product, index = 0 }) => {
  const { t } = useTranslation();
  const { addToCompare, removeFromCompare, comparedProducts } = useComparison();
  const { addToCart } = useCart();
  const isCompared = comparedProducts.some(p => p.id === product.id);
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: (index % 4) * 0.1 }}
      className="group cursor-pointer flex flex-col h-full relative"
    >
      <Link to={`/mehsul/${product.id}`} className="flex flex-col h-full group/card">
        <div className="relative h-[240px] md:h-[400px] lg:h-[480px] overflow-hidden bg-neutral-900 border border-white/5 mb-4 md:mb-6 rounded-[2px]">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover/card:scale-105 opacity-80" 
          />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          
          <div className="absolute bottom-3 left-3 right-3 md:bottom-6 md:left-6 md:right-6 text-center block">
            <span className="w-full py-2 md:py-4 bg-white text-black font-bold uppercase tracking-widest text-[8px] md:text-[10px] group-hover/card:bg-accent-gold group-hover/card:text-black transition-colors block">
              {t('product.view_details')}
            </span>
          </div>

          {!product.inStock && (
            <div className="absolute top-4 right-4 bg-red-900/80 text-white text-[9px] uppercase tracking-widest px-3 py-1 border border-red-500/30 backdrop-blur-sm shadow-xl">
              {t('product.out_of_stock')}
            </div>
          )}
        </div>

        <div className="flex-grow flex flex-col">
          <h3 className="text-sm md:text-xl font-display text-white mb-1 md:mb-2 group-hover/card:text-accent-gold transition-colors">{product.name}</h3>
          <p className="text-white/40 text-[9px] md:text-[11px] font-bold uppercase tracking-[0.2em] mb-2 md:mb-4">{product.color}</p>
          <div className="mt-auto flex justify-between items-center pt-3 md:pt-4 border-t border-white/10">
            {product.price && (
              <span className="text-white font-display text-base md:text-lg">{product.price.toFixed(2)} AZN</span>
            )}
          </div>
        </div>
      </Link>

      {/* Add to Cart Button */}
      <button 
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          addToCart(product, 1);
        }}
        className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center transition-all bg-black/40 text-white border border-white/10 hover:border-accent-gold hover:text-accent-gold backdrop-blur-md rounded-none"
        title={t('cart.add')}
      >
        <ShoppingBag size={16} />
      </button>

      {/* Comparison Toggle */}
      <button 
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (isCompared) {
            removeFromCompare(product.id);
          } else {
            addToCompare(product);
          }
        }}
        className={`absolute top-4 left-4 z-20 w-10 h-10 flex items-center justify-center transition-all ${isCompared ? 'bg-accent-gold text-black border-accent-gold' : 'bg-black/40 text-white border-white/10 hover:border-accent-gold hover:text-accent-gold backdrop-blur-md'} border rounded-none`}
        title={t('compare.add')}
      >
        {isCompared ? <Check size={16} strokeWidth={3} /> : <BarChart2 size={16} />}
      </button>
    </motion.div>
  );
};

export default ProductCard;
