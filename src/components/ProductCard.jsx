import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ProductCard = ({ product, index = 0 }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: (index % 4) * 0.1 }}
      className="group cursor-pointer flex flex-col h-full"
    >
      <div className="relative h-[400px] md:h-[480px] overflow-hidden bg-neutral-900 border border-white/5 mb-6 rounded-[2px]">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105 opacity-70 group-hover:opacity-100" 
        />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <Link 
          to={`/mehsul/${product.id}`}
          className="absolute bottom-6 left-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0 text-center block"
        >
          <span className="w-full py-4 bg-white text-black font-bold uppercase tracking-widest text-[10px] hover:bg-accent-gold hover:text-black transition-colors block">
            Ətraflı Bax
          </span>
        </Link>

        {/* Optional: Add an "Out of stock" badge */}
        {!product.inStock && (
          <div className="absolute top-4 right-4 bg-red-900/80 text-white text-[9px] uppercase tracking-widest px-3 py-1 border border-red-500/30 backdrop-blur-sm shadow-xl">
            Stokda Yoxdur
          </div>
        )}
      </div>

      <div className="flex-grow flex flex-col">
        <Link to={`/mehsul/${product.id}`} className="block flex-grow">
          <h3 className="text-xl font-display text-white mb-2 group-hover:text-accent-gold transition-colors">{product.name}</h3>
          <p className="text-white/40 text-[11px] font-bold uppercase tracking-[0.2em] mb-4">{product.color}</p>
        </Link>
        <div className="mt-auto flex justify-between items-center pt-4 border-t border-white/10">
          {product.price ? (
            <span className="text-white font-display text-lg">{product.price.toFixed(2)} AZN</span>
          ) : (
            <span className="text-accent-gold text-[10px] uppercase tracking-widest font-bold">Qiymət üçün əlaqə</span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
