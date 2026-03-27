import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, ChevronLeft, RefreshCcw, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { quizQuestions, getMatches } from '../data/quiz';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';

const QuizModal = ({ isOpen, onClose, products }) => {
  const { t, i18n } = useTranslation();
  const [step, setStep] = useState(0); // 0 is landing, 1-5 are questions, 6 is results
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState([]);

  const currentLang = i18n.language;

  useEffect(() => {
    if (!isOpen) {
      setStep(0);
      setAnswers({});
      setResults([]);
    }
  }, [isOpen]);

  const handleAnswer = (key, value) => {
    const newAnswers = { ...answers, [key]: value };
    setAnswers(newAnswers);
    
    if (step < quizQuestions.length) {
      setStep(step + 1);
    } else {
      // Calculate results
      const matches = getMatches(newAnswers, products);
      setResults(matches);
      setStep(quizQuestions.length + 1);
    }
  };

  const goBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const resetQuiz = () => {
    setStep(1);
    setAnswers({});
    setResults([]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/95 backdrop-blur-xl"
        onClick={onClose}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-4xl bg-neutral-900 border border-white/5 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-white/30 hover:text-white transition-colors z-10"
        >
          <X size={24} strokeWidth={1.5} />
        </button>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-8 md:p-16">
          <AnimatePresence mode="wait">
            {/* Landing Step */}
            {step === 0 && (
              <motion.div
                key="landing"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="text-center py-10"
              >
                <div className="w-20 h-20 rounded-full border border-accent-gold/20 flex items-center justify-center mx-auto mb-10">
                  <div className="w-12 h-12 rounded-full bg-accent-gold/10 flex items-center justify-center">
                    <ArrowRight className="text-accent-gold" size={24} />
                  </div>
                </div>
                <h2 className="text-4xl md:text-6xl font-display text-white mb-6">
                  {t('quiz.start_title')}
                </h2>
                <p className="text-white/40 text-lg font-light mb-12 max-w-xl mx-auto">
                  {t('quiz.start_desc')}
                </p>
                <button 
                  onClick={() => setStep(1)}
                  className="btn-primary px-12 py-5 uppercase tracking-[0.2em] text-xs"
                >
                  {t('quiz.start_btn')}
                </button>
              </motion.div>
            )}

            {/* Question Steps */}
            {step > 0 && step <= quizQuestions.length && (
              <motion.div
                key={`step-${step}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="w-full"
              >
                <div className="mb-12">
                  <div className="flex justify-between items-end mb-4">
                    <span className="text-accent-gold text-[10px] uppercase tracking-[0.4em] font-bold">
                      {String(step).padStart(2, '0')} / {String(quizQuestions.length).padStart(2, '0')}
                    </span>
                    <span className="text-white/20 text-[10px] uppercase tracking-widest font-bold">
                      Parketera Assistant
                    </span>
                  </div>
                  <div className="h-[2px] w-full bg-white/5">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${(step / quizQuestions.length) * 100}%` }}
                      className="h-full bg-accent-gold"
                    />
                  </div>
                </div>

                <h3 className="text-3xl md:text-5xl font-display text-white mb-12">
                  {t(`quiz.questions.${quizQuestions[step-1].key}.q`)}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {quizQuestions[step-1].options.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleAnswer(quizQuestions[step-1].key, option)}
                      className="p-6 text-left border border-white/10 bg-white/5 hover:border-accent-gold hover:bg-accent-gold/5 transition-all group flex justify-between items-center"
                    >
                      <span className="text-white/80 group-hover:text-white transition-colors uppercase tracking-widest text-xs font-bold">
                        {t(`quiz.questions.${quizQuestions[step-1].key}.${option}`)}
                      </span>
                      <ChevronRight size={18} className="text-white/10 group-hover:text-accent-gold group-hover:translate-x-1 transition-all" />
                    </button>
                  ))}
                </div>

                <div className="mt-12">
                  <button 
                    onClick={goBack}
                    className="flex items-center gap-2 text-white/30 hover:text-white transition-colors"
                  >
                    <ChevronLeft size={16} />
                    <span className="text-[10px] uppercase tracking-widest font-bold">{t('quiz.prev')}</span>
                  </button>
                </div>
              </motion.div>
            )}

            {/* Results Step */}
            {step > quizQuestions.length && (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full"
              >
                <div className="text-center mb-16">
                  <h2 className="text-4xl md:text-5xl font-display text-white mb-6">
                    {t('quiz.results_title')}
                  </h2>
                  <p className="text-white/40 mb-12">
                    {t('quiz.results_desc')}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                  {results.map((product, idx) => (
                    <div key={product.id} onClick={onClose}>
                      <ProductCard product={product} index={idx} />
                    </div>
                  ))}
                </div>

                <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
                  <button 
                    onClick={resetQuiz}
                    className="flex items-center gap-3 text-white/40 hover:text-accent-gold transition-colors px-6 py-3 border border-white/10 hover:border-accent-gold/50"
                  >
                    <RefreshCcw size={16} />
                    <span className="text-[10px] uppercase tracking-widest font-bold">{t('quiz.retake')}</span>
                  </button>
                  <Link 
                    to="/katalog"
                    onClick={onClose}
                    className="btn-primary px-8 py-4 text-[10px] uppercase tracking-widest font-bold"
                  >
                    {t('quiz.view_all')}
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default QuizModal;
