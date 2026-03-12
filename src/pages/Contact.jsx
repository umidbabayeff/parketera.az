import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
  return (
    <div className="pt-32 pb-20 bg-bg-dark">
      <div className="max-w-[1600px] px-8 md:px-12 mx-auto mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div className="text-left">
            <span className="text-accent-gold uppercase tracking-[0.4em] text-[10px] font-bold mb-6 block border-l-2 border-accent-gold pl-4">Bizimlə Əlaqə</span>
            <h1 className="text-6xl md:text-[8rem] lg:text-[7rem] font-display text-white mb-20 leading-none">Gəlin <br /> <span className="luxury-gradient italic">Yaradaq</span></h1>
            
            <div className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="flex gap-6 items-start">
                  <div className="w-12 h-12 flex items-center justify-center border border-accent-gold/30 rounded-full shrink-0">
                    <Mail size={20} className="text-accent-gold" />
                  </div>
                  <div>
                    <h4 className="text-white/40 text-[10px] uppercase tracking-[0.3em] font-bold mb-4">Email</h4>
                    <p className="text-xl font-light">info@parketera.az</p>
                  </div>
                </div>
                <div className="flex gap-6 items-start">
                  <div className="w-12 h-12 flex items-center justify-center border border-accent-gold/30 rounded-full shrink-0">
                    <MapPin size={20} className="text-accent-gold" />
                  </div>
                  <div>
                    <h4 className="text-white/40 text-[10px] uppercase tracking-[0.3em] font-bold mb-4">Ünvan</h4>
                    <p className="text-xl font-light">Bakı ş., Nərimanov r., <br /> Heydər Əliyev pr. 115</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-6 items-start pt-4 border-t border-white/5">
                <div className="w-12 h-12 flex items-center justify-center border border-accent-gold/30 rounded-full shrink-0">
                  <Phone size={20} className="text-accent-gold" />
                </div>
                <div>
                  <h4 className="text-white/40 text-[10px] uppercase tracking-[0.3em] font-bold mb-4">Telefon</h4>
                  <div className="flex flex-col gap-2">
                    <p className="text-xl font-light">+994 50 123 45 67</p>
                    <p className="text-xl font-light">+994 12 444 55 66</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-neutral-900 p-12 border border-white/5">
            <form className="space-y-8 text-left">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="group border-b border-white/10 pb-4 focus-within:border-accent-gold transition-colors">
                  <label className="text-[10px] uppercase tracking-widest text-white/30 block mb-2">Ad Soyad</label>
                  <input type="text" className="w-full bg-transparent border-none outline-none text-white text-lg font-light" placeholder="John Doe" />
                </div>
                <div className="group border-b border-white/10 pb-4 focus-within:border-accent-gold transition-colors">
                  <label className="text-[10px] uppercase tracking-widest text-white/30 block mb-2">Telefon</label>
                  <input type="tel" className="w-full bg-transparent border-none outline-none text-white text-lg font-light" placeholder="+994 50 000 00 00" />
                </div>
              </div>
              <div className="group border-b border-white/10 pb-4 focus-within:border-accent-gold transition-colors">
                <label className="text-[10px] uppercase tracking-widest text-white/30 block mb-2">Mesajınız</label>
                <textarea className="w-full bg-transparent border-none outline-none text-white text-lg font-light min-h-[120px]" placeholder="Layihəniz haqqında qısa məlumat..."></textarea>
              </div>
              <button className="btn-primary w-full flex items-center justify-center gap-4 py-6 group">
                <span className="uppercase tracking-[0.2em] text-xs font-bold">Göndər</span>
                <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
