import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calculator as CalcIcon, ChevronDown } from 'lucide-react';

const CustomSelect = ({ label, value, options, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div className="relative" ref={containerRef}>
      <label className="text-[10px] uppercase tracking-widest text-white/50 block mb-3">{label}</label>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-black/50 border border-white/10 text-white px-4 py-3 flex items-center justify-between hover:border-accent-gold/50 transition-colors group"
      >
        <span className="font-light text-sm">{selectedOption ? selectedOption.label : 'Seçin'}</span>
        <ChevronDown 
          size={16} 
          className={`text-white/30 group-hover:text-accent-gold transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute z-[110] left-0 right-0 mt-2 bg-neutral-900 border border-white/10 shadow-2xl py-2"
          >
            {options.map((option) => (
              <button
                key={option.value}
                className={`w-full text-left px-4 py-3 text-sm transition-colors hover:bg-white/5 ${value === option.value ? 'text-accent-gold bg-white/5' : 'text-white/70'}`}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
              >
                {option.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const CalculatorModal = ({ isOpen, onClose }) => {
  const [area, setArea] = useState('');
  const [parquetType, setParquetType] = useState('engineered');
  const [glueType, setGlueType] = useState('standard');
  const [includesInstallation, setIncludesInstallation] = useState(false);

  const parquetOptions = [
    { value: 'engineered', label: 'Mühəndis Lövhəsi' },
    { value: 'massive', label: 'Massiv Parket' },
    { value: 'modular', label: 'Modul Parket' },
  ];

  const glueOptions = [
    { value: 'none', label: 'Yoxdur (0 AZN/m²)' },
    { value: 'standard', label: 'Standart (~8 AZN/m²)' },
    { value: 'premium', label: 'Premium Tovcol MS (~15 AZN/m²)' },
  ];

  const prices = {
    engineered: 85,
    massive: 130,
    modular: 200,
  };

  const gluePrices = {
    none: 0,
    standard: 8,
    premium: 15,
  };

  const installationPrice = 12;

  const calculateTotal = () => {
    const numArea = parseFloat(area) || 0;
    let basePrice = numArea * prices[parquetType];
    basePrice += numArea * gluePrices[glueType];
    if (includesInstallation) {
      basePrice += numArea * installationPrice;
    }
    return basePrice;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-neutral-900 border border-white/10 p-8 shadow-2xl overflow-y-auto max-h-[90vh]"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
            >
              <X size={24} strokeWidth={1.5} />
            </button>

            <div className="flex items-center gap-4 mb-8 border-b border-white/10 pb-6">
              <div className="w-12 h-12 rounded-full border border-accent-gold/30 flex items-center justify-center shrink-0">
                <CalcIcon className="text-accent-gold" size={20} />
              </div>
              <div>
                <h3 className="text-2xl font-display text-white">Xərc Kalkulyatoru</h3>
                <p className="text-white/40 text-[10px] uppercase tracking-[0.2em] mt-1">Təxmini büdcə hesablanması</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="text-[10px] uppercase tracking-widest text-white/50 block mb-3">Məkanın Sahəsi (m²)</label>
                <input 
                   type="number" 
                   value={area}
                   onChange={(e) => setArea(e.target.value)}
                   placeholder="Məsələn, 50"
                   className="w-full bg-black/50 border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-accent-gold transition-colors font-light"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <CustomSelect 
                  label="Parket Növü"
                  value={parquetType}
                  options={parquetOptions}
                  onChange={setParquetType}
                />
                <CustomSelect 
                  label="Yapışdırıcı (Kley)"
                  value={glueType}
                  options={glueOptions}
                  onChange={setGlueType}
                />
              </div>

              <div className="pt-2">
                <label 
                  className="flex items-center gap-4 cursor-pointer group"
                  onClick={() => setIncludesInstallation(!includesInstallation)}
                >
                  <div className={`w-5 h-5 border flex items-center justify-center transition-colors ${includesInstallation ? 'border-accent-gold bg-accent-gold' : 'border-white/20 group-hover:border-white/50'}`}>
                    {includesInstallation && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-2.5 h-2.5 bg-black" />}
                  </div>
                  <div>
                    <span className="text-sm text-white/90 group-hover:text-white transition-colors block">Montaj daxil edilsin</span>
                    <span className="text-[10px] text-white/40 block">Yalnız usta xidməti haqqı (+12 AZN/m²)</span>
                  </div>
                </label>
              </div>

              <div className="mt-8 bg-black/50 border border-accent-gold/20 p-6 text-center">
                <span className="text-[10px] uppercase tracking-widest text-white/40 block mb-2">Təxmini Yekun Məbləğ</span>
                <div className="text-4xl font-display text-accent-gold">
                  {calculateTotal().toLocaleString('az-AZ')} <span className="text-lg">AZN</span>
                </div>
                <p className="text-[9px] text-white/30 uppercase mt-4">* Bu qiymət yalnız təxminidir və xərcin həcmi rəsmi ölçü götürüldükdən sonra dəqiqləşəcəkdir.</p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CalculatorModal;
