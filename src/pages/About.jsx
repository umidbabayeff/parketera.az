import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="pt-32 pb-20 bg-bg-dark">
      <div className="max-w-[1600px] px-8 md:px-12 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <span className="text-accent-gold uppercase tracking-[0.4em] text-[10px] font-bold mb-6 block border-l-2 border-accent-gold pl-4">Haqqımızda</span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display mb-10 leading-tight">Parket Sahəsində <br className="hidden md:block"/> <span className="luxury-gradient italic">30 İllik Təcrübə</span></h1>
            <p className="text-white/60 text-lg font-light leading-relaxed mb-8">
              Parketera olaraq, biz sadəcə döşəmə örtükləri satmırıq — biz sizin məkanınızın təməlini və atmosferini yaradırıq. 30 ildən artıq təcrübəmizlə, Azərbaycan bazarında ən keyfiyyətli ağac materiallarını sənətkarlıqla birləşdiririk.
            </p>
            <div className="grid grid-cols-2 gap-10 mt-12">
              <div>
                <h4 className="text-accent-gold text-3xl font-display mb-2">500+</h4>
                <p className="text-white/40 text-xs uppercase tracking-widest font-bold">Tamamlanmış Layihə</p>
              </div>
              <div>
                <h4 className="text-accent-gold text-3xl font-display mb-2">30+</h4>
                <p className="text-white/40 text-[10px] md:text-xs uppercase tracking-widest font-bold">Parket Sahəsində İllik Təcrübə</p>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="aspect-[4/5] bg-neutral-900 overflow-hidden">
              <img src="/images/about.png" alt="Showroom" className="w-full h-full object-cover opacity-80" />
            </div>
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-accent-gold/10 backdrop-blur-3xl rounded-full -z-10" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;
