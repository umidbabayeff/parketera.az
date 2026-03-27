import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { MessageSquare, Ruler, PackageCheck, Truck, Hammer } from 'lucide-react';

const OrderJourney = () => {
  const { t } = useTranslation();

  const steps = [
    {
      icon: MessageSquare,
      title: t('journey.step1_title'),
      desc: t('journey.step1_desc'),
      number: '01'
    },
    {
      icon: Ruler,
      title: t('journey.step2_title'),
      desc: t('journey.step2_desc'),
      number: '02'
    },
    {
      icon: PackageCheck,
      title: t('journey.step3_title'),
      desc: t('journey.step3_desc'),
      number: '03'
    },
    {
      icon: Truck,
      title: t('journey.step4_title'),
      desc: t('journey.step4_desc'),
      number: '04'
    },
    {
      icon: Hammer,
      title: t('journey.step5_title'),
      desc: t('journey.step5_desc'),
      number: '05'
    }
  ];

  return (
    <section className="py-32 bg-[#050505] relative overflow-hidden">
      {/* Decorative background numbers */}
      <div className="absolute top-0 left-0 w-full h-full flex justify-between items-center px-10 pointer-events-none opacity-[0.02] select-none">
        <span className="text-[30vw] font-display">P</span>
        <span className="text-[30vw] font-display">A</span>
      </div>

      <div className="max-w-[1600px] px-8 md:px-12 mx-auto relative z-10">
        <div className="text-left lg:text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-accent-gold uppercase tracking-[0.4em] text-[10px] font-bold mb-6 block border-l-2 border-accent-gold pl-4 w-fit lg:mx-auto">
              {t('journey.title')}
            </span>
            <h2 className="text-4xl md:text-6xl font-display text-white mb-6">
              {t('journey.subtitle')}
            </h2>
          </motion.div>
        </div>

        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-8 relative">
          {/* Connector Line (Desktop) */}
          <div className="absolute top-[60px] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent-gold/20 to-transparent hidden lg:block" />

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex-1 w-full group"
              >
                <div className="flex lg:flex-col items-center lg:items-center text-left lg:text-center gap-8 lg:gap-10">
                  {/* Icon & Number Circle */}
                  <div className="relative">
                    <div className="w-24 h-24 lg:w-32 lg:h-32 bg-neutral-900 border border-white/5 rounded-full flex items-center justify-center relative z-10 group-hover:border-accent-gold/50 transition-all duration-500 shadow-2xl">
                      <Icon className="text-white/40 group-hover:text-accent-gold transition-colors duration-500" size={32} />
                    </div>
                    {/* Step Number */}
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-accent-gold text-black rounded-full flex items-center justify-center text-[10px] font-bold z-20 font-sans shadow-lg">
                      {step.number}
                    </div>
                    {/* Ring animation */}
                    <div className="absolute inset-0 rounded-full border border-accent-gold/20 scale-100 group-hover:scale-125 opacity-0 group-hover:opacity-100 transition-all duration-700" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 lg:max-w-[240px]">
                    <h3 className="text-xl lg:text-2xl font-display text-white mb-4 group-hover:text-accent-gold transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="text-white/40 text-sm leading-relaxed font-light">
                      {step.desc}
                    </p>
                  </div>
                </div>

                {/* Vertical Connector Line (Mobile) */}
                {index < steps.length - 1 && (
                  <div className="w-[1px] h-12 bg-accent-gold/20 mx-12 lg:hidden mt-4" />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default OrderJourney;
