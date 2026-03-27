import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Calculator } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import CalculatorModal from './CalculatorModal';

const Hero = () => {
  const { t } = useTranslation();
  const [isCalcOpen, setIsCalcOpen] = useState(false);
  const canvasRef = React.useRef(null);
  const totalFrames = 72;
  const frames = React.useRef([]);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Preload frames
  React.useEffect(() => {
    // Disable heavy sequence on mobile to save performance and prevent jank
    if (window.innerWidth < 768) {
      setIsLoaded(true);
      return;
    }

    let loadedCount = 0;
    const preloadFrames = [];

    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      const actualFrame = ((i - 1) * 4) + 1;
      const formattedId = actualFrame.toString().padStart(3, '0');
      img.src = `/images/hero_frames/ezgif-frame-${formattedId}.webp`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === totalFrames) {
          setIsLoaded(true);
        }
      };
      preloadFrames.push(img);
    }
    frames.current = preloadFrames;

    let frameIndex = 0;
    let lastTime = 0;
    const fps = 12;
    const interval = 1000 / fps;

    const render = (time) => {
      // Control FPS with requestAnimationFrame
      if (time - lastTime >= interval) {
        const canvas = canvasRef.current;
        const img = frames.current[frameIndex];
        
        if (canvas && img && img.complete && img.naturalWidth !== 0) {
          const ctx = canvas.getContext('2d');
          
          if (canvas.width !== canvas.clientWidth || canvas.height !== canvas.clientHeight) {
            canvas.width = canvas.clientWidth;
            canvas.height = canvas.clientHeight;
          }

          const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
          const x = (canvas.width / 2) - (img.width / 2) * scale;
          const y = (canvas.height / 2) - (img.height / 2) * scale;
          ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
          
          frameIndex = (frameIndex + 1) % totalFrames;
        }
        lastTime = time;
      }
      requestAnimationFrame(render);
    };

    const animationId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <section className="relative h-[55vh] md:h-screen min-h-[450px] md:min-h-[600px] w-full flex items-center justify-center overflow-hidden bg-black mt-[70px] md:mt-0">
      {/* Canvas Background Sequence (Desktop) or Static Image (Mobile) */}
      <div className={`absolute inset-0 z-0 transition-opacity duration-1000 ${isLoaded ? 'opacity-60' : 'opacity-0'}`}>
        <img 
          src="/images/hero_frames/ezgif-frame-001.webp" 
          alt="Parketera Premium" 
          className="w-full h-full object-cover md:hidden" 
        />
        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover hidden md:block"
        />
        
        {/* Minimal gradient for text contrast only at the bottom/left */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent z-[1]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-[1]" />
      </div>

      <div className="container relative z-10 px-8 mx-auto">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
          >
            <span className="inline-block px-4 md:px-6 py-1 md:py-2 border border-accent-gold/30 text-accent-gold uppercase tracking-[0.2em] md:tracking-[0.4em] text-xs md:text-sm font-bold mb-6 md:mb-8 backdrop-blur-sm">
              {t('hero.subtitle')}
            </span>
            <h1 className="text-[2.75rem] sm:text-5xl md:text-6xl lg:text-[6rem] font-display leading-[1.15] text-white mb-8 md:mb-12 tracking-tight text-shadow-premium">
              {t('hero.title_line1')} <br /> 
              <span className="italic pl-4 md:pl-10 text-white">{t('hero.title_italic')}</span>
            </h1>
            <div className="flex flex-wrap gap-8 items-center">
              <button className="btn-primary flex items-center gap-4 px-10 py-5 group bg-accent-gold border-none rounded-none">
                <span className="uppercase tracking-[0.2em] text-[12px] font-bold text-black">{t('hero.discover')}</span>
                <ChevronRight size={18} className="text-black group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => setIsCalcOpen(true)}
                className="flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-accent-gold transition-colors">
                  <Calculator size={18} className="text-accent-gold" />
                </div>
                <span className="uppercase tracking-[0.2em] text-[11px] font-bold text-white group-hover:text-accent-gold transition-colors text-shadow-premium">{t('hero.calculator')}</span>
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
            {t('hero.est')}
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
