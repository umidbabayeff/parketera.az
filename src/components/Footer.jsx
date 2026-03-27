import React from 'react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="py-20 bg-bg-darker border-t border-white/5 mt-auto">
      <div className="max-w-[1600px] px-8 md:px-12 mx-auto text-center md:text-left">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-20">
          <div className="md:col-span-2 flex flex-col items-center md:items-start">
            <div className="logo-golden mobile-center-mask w-[260px] md:w-[340px] h-[60px] md:h-[75px] mb-8" />
            <p className="text-white/30 max-w-sm mb-10 text-center md:text-left">{t('footer.tagline')}</p>
          </div>
          <div>
            <h4 className="text-white text-xs uppercase tracking-widest font-bold mb-8">{t('footer.menu')}</h4>
            <ul className="space-y-4 text-sm text-white/40">
              <li><a href="/" className="hover:text-accent-gold transition-colors">{t('footer.home')}</a></li>
              <li><a href="/haqqimizda" className="hover:text-accent-gold transition-colors">{t('nav.haqqimizda')}</a></li>
              <li><a href="/layiheler" className="hover:text-accent-gold transition-colors">{t('nav.layiheler')}</a></li>
              <li><a href="/bloq" className="hover:text-accent-gold transition-colors">{t('nav.bloq')}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white text-xs uppercase tracking-widest font-bold mb-8">{t('footer.social')}</h4>
            <ul className="space-y-4 text-sm text-white/40">
              <li><a href="https://instagram.com/parketera.az" target="_blank" rel="noopener noreferrer" className="hover:text-accent-gold transition-colors">Instagram</a></li>
              <li><a href="https://wa.me/994702772240" target="_blank" rel="noopener noreferrer" className="hover:text-accent-gold transition-colors">WhatsApp</a></li>
              <li><a href="https://facebook.com/parketera.az" target="_blank" rel="noopener noreferrer" className="hover:text-accent-gold transition-colors">Facebook</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/20 text-xs">{t('footer.rights')}</p>
          <p className="text-white/20 text-xs uppercase tracking-widest">Designed for Excellence</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
