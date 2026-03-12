import React from 'react';
import Hero from '../components/Hero';
import CategoryGrid from '../components/CategoryGrid';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <div>
      <Hero />
      <div className="py-20 bg-bg-darker">
        <div className="max-w-[1600px] px-8 md:px-12 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
            <div className="flex flex-col gap-6">
              <span className="text-accent-gold text-2xl font-display italic">01. Precision</span>
              <p className="text-white/40 text-sm leading-relaxed">Hər bir plankanın yerləşdirilməsində riyazi dəqiqlik və sənətkarlıq tələb olunur.</p>
            </div>
            <div className="flex flex-col gap-6">
              <span className="text-accent-gold text-2xl font-display italic">02. Heritage</span>
              <p className="text-white/40 text-sm leading-relaxed">Ənənəvi iş üsullarını müasir texnologiyalarla birləşdirərək uzun ömürlü nəticələr əldə edirik.</p>
            </div>
            <div className="flex flex-col gap-6">
              <span className="text-accent-gold text-2xl font-display italic">03. Quality</span>
              <p className="text-white/40 text-sm leading-relaxed">Dünyanın ən prestijli brendlərindən seçilmiş xammal və materiallar.</p>
            </div>
          </div>
        </div>
      </div>
      <CategoryGrid />
    </div>
  );
};

export default Home;
