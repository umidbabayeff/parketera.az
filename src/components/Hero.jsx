import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import CalculatorModal from './CalculatorModal';

const Hero = () => {
  const [isCalcOpen, setIsCalcOpen] = useState(false);

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
      {/* Background with Vignette */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          initial={{ scale: 1.15, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="w-full h-full bg-[url('/images/hero.jpg')] bg-cover bg-center"
        />
        {/* Minimal gradient for text contrast only at the bottom/left */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent z-1" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-1" />
      </div>

      <div className="container relative z-10 px-8 mx-auto">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
          >
            <span className="inline-block px-4 py-1 border border-accent-gold/30 text-accent-gold uppercase tracking-[0.4em] text-[10px] font-bold mb-8 backdrop-blur-sm">
              Eksklüziv Parket Dünyası
            </span>
            <h1 className="text-5xl md:text-[5rem] font-display leading-[1.1] text-white mb-12 tracking-tight text-shadow-premium">
              Hər Addımda <br /> 
              <span className="italic pl-4 md:pl-10 luxury-gradient">Keyfiyyəti Hiss Edin</span>
            </h1>
            <div className="flex flex-wrap gap-8 items-center">
              <button className="btn-primary flex items-center gap-4 px-10 py-5 group bg-accent-gold border-none rounded-none">
                <span className="uppercase tracking-[0.2em] text-[12px] font-bold text-black">Kolleksiyanı kəşf et</span>
                <ChevronRight size={18} className="text-black group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => setIsCalcOpen(true)}
                className="flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-accent-gold transition-colors">
                  <div className="w-2 h-2 bg-accent-gold rounded-full" />
                </div>
                <span className="uppercase tracking-[0.2em] text-[11px] font-bold text-white group-hover:text-accent-gold transition-colors text-shadow-premium">Kalkulyator</span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Side Label */}
      <div className="absolute right-12 bottom-12 hidden xl:block">
        <div className="flex flex-col items-center gap-6">
          <div className="w-[1px] h-32 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
          <span className="text-white uppercase tracking-[0.5em] text-[9px] [writing-mode:vertical-lr] font-bold text-shadow-premium">
            EST. 2012 / PREMIUM QUALITY
          </span>
        </div>
      </div>

      <CalculatorModal 
        isOpen={isCalcOpen} 
        onClose={() => setIsCalcOpen(false)} 
      />
    </section>
  );
};

export default Hero;
