'use client';

import { motion } from 'framer-motion';

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-white pt-32 md:pt-40 pb-20">
            <div className="container mx-auto">

                {/* Header Section */}
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xs font-bold tracking-[0.2em] uppercase text-gray-400 block mb-4"
                    >
                        Since 1985
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-bold text-black tracking-widest uppercase mb-8"
                    >
                        Crafting Essential <br /> Comfort
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-500 leading-loose mx-auto"
                    >
                        We believe that the way you floor your home determines the way you live your life.
                        Our philosophy is simple: create quality materials that stand the test of time,
                        using sustainable wood and timeless designs.
                    </motion.p>
                </div>

                {/* Image Grid - Gallery Style */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="h-[400px] md:h-[600px] bg-gray-100 relative overflow-hidden"
                    >
                        <img
                            src="https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?q=80&w=1200&auto=format&fit=crop"
                            alt="Interior"
                            className="object-cover w-full h-full transition-all duration-700"
                        />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="h-[400px] md:h-[600px] bg-gray-100 relative overflow-hidden mt-0 md:mt-20"
                    >
                        <img
                            src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200&auto=format&fit=crop"
                            alt="Interior Detail"
                            className="object-cover w-full h-full transition-all duration-700"
                        />
                    </motion.div>
                </div>

                {/* Team / Signature Section */}
                <div className="text-center max-w-2xl mx-auto">
                    <h3 className="text-sm font-bold tracking-[0.2em] uppercase text-black mb-6">
                        The Creators
                    </h3>
                    <p className="text-gray-500 italic font-serif text-lg">
                        "Design is not just what it looks like and feels like. Design is how it works."
                    </p>
                    <div className="mt-8 text-black font-signature text-2xl">
                        Parketera Team
                    </div>
                </div>
            </div>
        </main>
    );
}
