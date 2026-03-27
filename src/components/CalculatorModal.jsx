import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calculator as CalcIcon, ChevronDown, ShoppingBag, Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useCart } from '../context/CartContext';

const CustomSelect = ({ label, value, options, onChange, placeholder = 'Seçin' }) => {
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
        <span className="font-light text-sm">{selectedOption ? selectedOption.label : placeholder}</span>
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
            className="absolute z-[110] left-0 right-0 mt-2 bg-neutral-900 border border-white/10 shadow-2xl py-2 max-h-[200px] overflow-y-auto"
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

const CalculatorModal = ({ isOpen, onClose, preselectedProduct = null }) => {
  const { t, i18n } = useTranslation();
  const { addToCart } = useCart();
  const [area, setArea] = useState('');
  const [addedToCart, setAddedToCart] = useState(false);
  
  // Use category information to find the closest parquet type for the calculator pricing
  const getDefaultType = () => {
    if (!preselectedProduct) return 'bambuk';
    const catId = preselectedProduct.categoryId?.toString();
    const mapping = {
      '1': 'bambuk',
      '2': 'armosiya',
      '3': 'merbau',
      '4': 'engineered',
      '6': 'laminat'
    };
    return mapping[catId] || 'engineered';
  };

  const [parquetType, setParquetType] = useState(getDefaultType());
  const [layout, setLayout] = useState('straight');
  const [glueType, setGlueType] = useState('1k');
  const [includesInstallation, setIncludesInstallation] = useState(false);

  useEffect(() => {
    if (preselectedProduct) {
       setParquetType(getDefaultType());
    }
  }, [preselectedProduct]);

  const parquetOptions = [
    { value: 'bambuk', label: t('calc.parquet_options.bambuk') },
    { value: 'armosiya', label: t('calc.parquet_options.armosiya') },
    { value: 'merbau', label: t('calc.parquet_options.merbau') },
    { value: 'engineered', label: t('calc.parquet_options.engineered') },
    { value: 'laminat', label: t('calc.parquet_options.laminat') },
  ];

  const layoutOptions = [
    { value: 'straight', label: t('calc.layouts.straight') },
    { value: 'diagonal', label: t('calc.layouts.diagonal') },
    { value: 'herringbone', label: t('calc.layouts.herringbone') },
  ];

  const glueOptions = [
    { value: '1k', label: t('calc.glue_options.k1') },
    { value: '2k', label: t('calc.glue_options.k2') },
  ];

  const prices = {
    bambuk: 70,
    armosiya: 120,
    merbau: 150,
    engineered: 85,
    laminat: 25,
  };

  const layoutWaste = {
    straight: 0.05,
    diagonal: 0.10,
    herringbone: 0.15,
  };

  const gluePrices = {
    '1k': 180,
    '2k': 140,
  };

  const installationPrice = 12;
  const areaPerGlueBucket = 15;

  const numArea = parseFloat(area) || 0;
  const wastePercent = layoutWaste[layout];
  const wasteAmount = numArea * wastePercent;
  const totalAreaWithWaste = numArea + wasteAmount;
  
  const autoGlueBuckets = Math.ceil(totalAreaWithWaste / areaPerGlueBucket);
  
  // If we have a preselected product with its own price, use that!
  const actualParquetPrice = preselectedProduct?.price || prices[parquetType];
  const parquetCost = totalAreaWithWaste * actualParquetPrice;
  const glueCost = autoGlueBuckets * gluePrices[glueType];
  const laborCost = includesInstallation ? numArea * installationPrice : 0;
  const totalCost = parquetCost + glueCost + laborCost;

  const currentLang = i18n.language;
  const isAz = currentLang === 'az';
  const isRu = currentLang === 'ru';

  const handleWhatsAppShare = () => {
    const productName = preselectedProduct?.name || parquetOptions.find(o => o.value === parquetType)?.label || parquetType;
    const selectedLayout = layoutOptions.find(o => o.value === layout)?.label || layout;
    const selectedGlue = glueOptions.find(o => o.value === glueType)?.label || glueType;

    const message = encodeURIComponent(
      `Parketera.az - ${isRu ? 'Детали расчета' : isAz ? 'Hesablama detalları' : 'Calculation Details'}\n\n` +
      `Product: ${productName}\n` +
      `Area: ${numArea} m²\n` +
      `Layout: ${selectedLayout}\n` +
      `Waste: ${wasteAmount.toFixed(2)} m²\n` +
      `Total Material: ${totalAreaWithWaste.toFixed(2)} m²\n` +
      `Glue: ${autoGlueBuckets} buckets (${selectedGlue})\n` +
      `Installation: ${includesInstallation ? (isRu ? 'Да' : isAz ? 'Bəli' : 'Yes') : (isRu ? 'Нет' : isAz ? 'Xeyr' : 'No')}\n\n` +
      `Total: ${totalCost.toLocaleString()} AZN`
    );

    window.open(`https://wa.me/994702772277?text=${message}`, '_blank');
  };

  const handleAddToCart = () => {
    if (!numArea) return;
    
    const productToCart = preselectedProduct || {
      id: `custom-${parquetType}`,
      name: parquetOptions.find(o => o.value === parquetType).label.split('(')[0],
      price: prices[parquetType],
      image: 'https://images.unsplash.com/photo-1581850518616-bcb8186c443e?auto=format&fit=crop&q=80'
    };

    addToCart(productToCart, totalAreaWithWaste, 'm²');
    
    // Also optionally add glue
    addToCart({
      id: `glue-${glueType}`,
      name: `Yapışdırıcı: ${glueOptions.find(o => o.value === glueType).label.split('(')[0]}`,
      price: gluePrices[glueType],
      image: 'https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?q=80&w=2602&auto=format&fit=crop'
    }, autoGlueBuckets, 'pcs');

    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-6">
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
            className="relative w-full max-w-2xl bg-neutral-900 border border-white/10 p-6 md:p-8 shadow-2xl overflow-y-auto max-h-[95vh] custom-scrollbar"
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
                <h3 className="text-2xl font-display text-white">{preselectedProduct ? preselectedProduct.name : t('calc.title')}</h3>
                <p className="text-white/40 text-[10px] uppercase tracking-[0.2em] mt-1">{t('calc.subtitle')}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-white/50 block mb-2">{t('calc.area_label')}</label>
                  <input 
                     type="number" 
                     value={area}
                     onChange={(e) => setArea(e.target.value)}
                     placeholder={t('calc.area_placeholder')}
                     className="w-full bg-black/50 border border-white/10 text-white px-4 py-2.5 focus:outline-none focus:border-accent-gold transition-colors font-light text-sm"
                  />
                </div>
                {!preselectedProduct ? (
                  <CustomSelect 
                    label={t('calc.parquet_label')}
                    value={parquetType}
                    options={parquetOptions}
                    onChange={setParquetType}
                  />
                ) : (
                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-white/50 block mb-2">{t('calc.parquet_label')}</label>
                    <div className="w-full bg-white/5 border border-white/5 text-accent-gold px-4 py-2.5 font-bold text-sm">
                      {preselectedProduct.name}
                    </div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <CustomSelect 
                  label={t('calc.layout')}
                  value={layout}
                  options={layoutOptions}
                  onChange={setLayout}
                />
                <CustomSelect 
                  label={t('calc.glue_label')}
                  value={glueType}
                  options={glueOptions}
                  onChange={setGlueType}
                />
              </div>

              <div className="pt-2 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                <label 
                  className="flex items-center gap-4 cursor-pointer group"
                  onClick={() => setIncludesInstallation(!includesInstallation)}
                >
                  <div className={`w-5 h-5 border flex items-center justify-center transition-colors ${includesInstallation ? 'border-accent-gold bg-accent-gold' : 'border-white/20 group-hover:border-white/50'}`}>
                    {includesInstallation && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-2.5 h-2.5 bg-black" />}
                  </div>
                  <div>
                    <span className="text-xs text-white/90 group-hover:text-white transition-colors block leading-tight">{t('calc.install_label')}</span>
                    <span className="text-[9px] text-white/40 block leading-tight">{t('calc.install_sublabel')}</span>
                  </div>
                </label>

                <div className="flex gap-4 items-center bg-white/5 px-4 py-2 border border-white/5 mt-2 md:mt-0">
                   <div className="text-right">
                      <p className="text-[9px] uppercase tracking-widest text-white/30">{t('calc.material_total')}</p>
                      <p className="text-sm text-white font-medium">{totalAreaWithWaste.toFixed(2)} m²</p>
                   </div>
                   <div className="w-px h-6 bg-white/10" />
                   <div className="text-right">
                      <p className="text-[9px] uppercase tracking-widest text-white/30">{t('calc.glue_amount_label')}</p>
                      <p className="text-sm text-white font-medium">{autoGlueBuckets} {t('calc.pcs')}</p>
                   </div>
                </div>
              </div>

              <div className="mt-4 bg-black/50 border border-accent-gold/20 p-6">
                <div className="flex flex-col items-center mb-6">
                  <span className="text-[9px] uppercase tracking-widest text-white/40 block mb-1">{t('calc.total_label')}</span>
                  <div className="text-4xl font-display text-accent-gold luxury-text-shadow text-center">
                    {totalCost.toLocaleString(i18n.language === 'az' ? 'az-AZ' : i18n.language === 'ru' ? 'ru-RU' : 'en-US')} <span className="text-lg">AZN</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 pt-4 border-t border-white/5">
                  <div className="p-3 bg-white/[0.02] border border-white/5">
                    <p className="text-[8px] uppercase tracking-widest text-white/30 mb-0.5">{t('calc.parquet_label')}</p>
                    <p className="text-[11px] text-white/80 font-light truncate">{preselectedProduct?.name || parquetOptions.find(o => o.value === parquetType).label.split('(')[0]}: <span className="text-white font-bold">{parquetCost.toLocaleString()} AZN</span></p>
                  </div>
                  <div className="p-3 bg-white/[0.02] border border-white/5">
                    <p className="text-[8px] uppercase tracking-widest text-white/30 mb-0.5">{t('calc.glue_label')}</p>
                    <p className="text-[11px] text-white/80 font-light truncate">{autoGlueBuckets} {t('calc.pcs')}: <span className="text-white font-bold">{glueCost.toLocaleString()} AZN</span></p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={handleAddToCart}
                    disabled={!area}
                    className={`flex-1 py-4 flex items-center justify-center gap-4 transition-all duration-300 uppercase tracking-widest text-[10px] font-bold border ${addedToCart ? 'bg-green-600 border-green-600 text-white' : 'border-white/10 text-white hover:bg-white hover:text-black disabled:opacity-30'}`}
                  >
                    {addedToCart ? <Check size={16} /> : <ShoppingBag size={16} />}
                    <span>{addedToCart ? t('cart.added') : t('cart.add')}</span>
                  </button>
                  <button 
                    onClick={handleWhatsAppShare}
                    disabled={!area}
                    className="flex-1 bg-[#25D366] hover:bg-[#20bd5a] text-white py-4 flex items-center justify-center gap-4 transition-all duration-300 uppercase tracking-widest text-[10px] font-bold shadow-xl shadow-green-900/10 disabled:opacity-30"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    <span>{t('calc.share_whatsapp')}</span>
                  </button>
                </div>
                <p className="text-[8px] text-white/30 uppercase mt-4 text-center font-medium leading-none">{t('calc.disclaimer')}</p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CalculatorModal;
