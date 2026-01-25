'use client';

import { motion } from 'framer-motion';

export default function Hero() {
    return (
        <section className="relative min-h-[90vh] bg-[#F2F2F2] flex items-center overflow-hidden pt-32">

            {/* Number Indicators (Left) */}
            <div className="absolute left-6 md:left-12 top-1/2 transform -translate-y-1/2 hidden xl:flex flex-col gap-8 z-20">
                {['01', '02', '03'].map((num, i) => (
                    <span key={num} className={`text-xs font-bold tracking-widest ${i === 1 ? 'text-black flex items-center gap-4' : 'text-gray-300'}`}>
                        {num}
                        {i === 1 && <span className="w-12 h-[1px] bg-black"></span>}
                    </span>
                ))}
            </div>

            <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full relative">

                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="z-10 mt-24 lg:mt-0 px-6 lg:px-0"
                >
                    <h1 className="text-5xl md:text-7xl xl:text-8xl font-bold text-black tracking-[0.05em] uppercase mb-8 leading-[0.9]">
                        Premium <br /> Comfort.
                    </h1>
                    <p className="text-gray-500 max-w-sm mb-10 leading-relaxed font-light text-sm tracking-wide">
                        One-click import feature lets you import the complete
                        Depot demo content with a single mouse click.
                    </p>

                    {/* "Related" / "Buy Now" Float */}
                    <div className="fixed right-0 top-1/2 z-50 transform -translate-y-1/2 hidden lg:flex flex-col items-end">
                        <button className="bg-black text-white text-xs font-bold tracking-widest px-6 py-4 uppercase mb-2 flex items-center gap-2 hover:bg-gray-800 transition-colors" aria-label="Related items">
                            <span className="bg-white rounded-full w-4 h-4 flex items-center justify-center text-black text-[8px]">●</span> Related
                        </button>
                        <button className="bg-white text-black text-xs font-bold tracking-widest px-6 py-4 uppercase shadow-lg flex items-center gap-2 hover:text-gray-500 transition-colors" aria-label="Buy now">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                            Buy Now
                        </button>
                    </div>

                </motion.div>

                {/* Hero Image - Minimalist Floating Object */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="relative h-[500px] lg:h-[700px] flex items-center justify-center"
                >
                    {/* Using a minimalist lamp/chair image to match "Depot" vibe */}
                    <img
                        src="/hero-parquet.png"
                        alt="Minimalist Design"
                        className="object-contain h-full w-auto drop-shadow-xl transition-all duration-700"
                    />
                </motion.div>
            </div>
        </section>
    );
}
