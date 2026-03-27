import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, Unlock, User, Briefcase, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const ProAccessModal = ({ isOpen, onClose, onUnlock }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    role: 'role_arch'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name.trim()) {
      // Save info to simulate "logged in" state for pros
      localStorage.setItem('parketera_pro_user', JSON.stringify({
        ...formData,
        unlockedAt: new Date().toISOString()
      }));
      onUnlock();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/90 backdrop-blur-xl"
        onClick={onClose}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-md bg-neutral-900 border border-white/10 shadow-2xl p-8 md:p-10 rounded-sm"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-white/30 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-accent-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="text-accent-gold" size={24} />
          </div>
          <h2 className="text-3xl font-display text-white mb-4 uppercase tracking-wider">
            {t('pro.modal_title')}
          </h2>
          <p className="text-white/40 text-sm leading-relaxed">
            {t('pro.modal_desc')}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest text-accent-gold font-bold flex items-center gap-2">
              <User size={12} /> {t('pro.label_name')}
            </label>
            <input 
              required
              type="text" 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="Zaur Məmmədov"
              className="w-full bg-black/40 border border-white/10 text-white px-4 py-3 text-sm focus:border-accent-gold outline-none transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest text-accent-gold font-bold flex items-center gap-2">
              <Briefcase size={12} /> {t('pro.label_role')}
            </label>
            <select 
              value={formData.role}
              onChange={(e) => setFormData({...formData, role: e.target.value})}
              className="w-full bg-black/40 border border-white/10 text-white px-4 py-3 text-sm focus:border-accent-gold outline-none transition-colors appearance-none"
            >
              <option value="role_arch">{t('pro.role_arch')}</option>
              <option value="role_des">{t('pro.role_des')}</option>
              <option value="role_dev">{t('pro.role_dev')}</option>
            </select>
          </div>

          <button 
            type="submit"
            className="w-full btn-primary py-4 uppercase tracking-[0.2em] text-[10px] font-bold flex items-center justify-center gap-3 mt-4"
          >
            <span>{t('pro.unlock')}</span>
            <Unlock size={14} />
          </button>
        </form>

        <p className="mt-8 text-[9px] text-white/20 text-center uppercase tracking-widest leading-loose">
          Parketera Premium Studio <br /> Engineering Excellence
        </p>
      </motion.div>
    </div>
  );
};

export default ProAccessModal;
