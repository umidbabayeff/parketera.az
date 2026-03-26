import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Instagram, Facebook } from 'lucide-react';

const Contact = () => {
  return (
    <div className="pt-32 pb-20 bg-bg-dark">
      <div className="max-w-[1600px] px-8 md:px-12 mx-auto mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div className="text-left">
            <span className="text-accent-gold uppercase tracking-[0.4em] text-[10px] font-bold mb-6 block border-l-2 border-accent-gold pl-4">Bizimlə Əlaqə</span>
            <h1 className="text-6xl md:text-[8rem] lg:text-[7rem] font-display text-white mb-20 leading-none">Gəlin <br /> <span className="luxury-gradient italic">Yaradaq</span></h1>
            
            <div className="space-y-12 mb-16">
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
                    <p className="text-xl font-light">Bakı ş., Ceyhun bəy Hacıbəyli <br /> küç. 32A</p>
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
                    <p className="text-xl font-light group cursor-pointer hover:text-accent-gold transition-colors">
                      <a href="tel:+994702772277">+994 70 277 22 77</a>
                    </p>
                    <p className="text-xl font-light group cursor-pointer hover:text-accent-gold transition-colors">
                      <a href="https://wa.me/994702772240" target="_blank" rel="noopener noreferrer">+994 70 277 22 40</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-8 items-center pt-8 border-t border-white/5 justify-start">
              <a href="https://instagram.com/parketera.az" target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center border border-white/10 rounded-full hover:border-accent-gold hover:text-accent-gold transition-all text-white/60">
                <Instagram size={20} />
              </a>
              <a href="https://facebook.com/parketera.az" target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center border border-white/10 rounded-full hover:border-accent-gold hover:text-accent-gold transition-all text-white/60">
                <Facebook size={20} />
              </a>
              <a href="https://wa.me/994702772240" target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center border border-white/10 rounded-full hover:border-accent-gold hover:text-accent-gold transition-all text-white/60">
                <Phone size={20} />
              </a>
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
                  <input type="tel" className="w-full bg-transparent border-none outline-none text-white text-lg font-light" placeholder="+994 70 000 00 00" />
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

            {/* Map Section */}
            <div className="mt-12 rounded-xs overflow-hidden border border-white/5 grayscale hover:grayscale-0 transition-all duration-700 h-[300px]">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3039.02322!2d49.842378!3d40.3997982!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40307d007eaf16bf%3A0xb31e5639ce57c9de!2sParketera!5e0!3m2!1sen!2saz!4v1711411200000!5m2!1sen!2saz"
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="opacity-60 hover:opacity-100 transition-opacity duration-700"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
