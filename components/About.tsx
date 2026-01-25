'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function About() {
    return (
        <section id="about" className="py-32 bg-white">
            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row items-center gap-20">
                    {/* Text Section */}
                    <motion.div
                        className="flex-1 order-2 md:order-1"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-gray-400 font-bold tracking-[0.2em] uppercase text-xs block mb-6">
                            Since 1985
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold text-black tracking-widest uppercase mb-8 leading-tight">
                            Crafting Essential <br /> Comfort
                        </h2>
                        <div className="space-y-6 text-sm text-gray-500 leading-loose max-w-md">
                            <p>
                                Parketera has been defining luxury flooring for over a decade.
                                We believe in the power of minimalism and the strength of quality materials.
                            </p>
                            <p>
                                Our mission is simple: To provide the finest parquet, varnish, and adhesive solutions
                                that stand the test of time and trend.
                            </p>
                        </div>
                        <div className="mt-12">
                            <Link href="/about" className="overflow-hidden relative group inline-block">
                                <span className="text-xs font-bold tracking-[0.2em] uppercase text-black">Read Our Story</span>
                                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-black transform origin-left transition-transform duration-300 group-hover:scale-x-100 scale-x-0"></span>
                            </Link>
                        </div>
                    </motion.div>

                    {/* Stats Section (Minimal) */}
                    <motion.div
                        className="flex-1 order-1 md:order-2 w-full"
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="grid grid-cols-2 gap-px bg-gray-100 border border-gray-100">
                            <div className="bg-white p-12 text-center aspect-square flex flex-col justify-center">
                                <div className="text-4xl font-light text-black mb-2">10+</div>
                                <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400">Years</div>
                            </div>
                            <div className="bg-white p-12 text-center aspect-square flex flex-col justify-center">
                                <div className="text-4xl font-light text-black mb-2">500+</div>
                                <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400">Products</div>
                            </div>
                            <div className="bg-white p-12 text-center aspect-square flex flex-col justify-center">
                                <div className="text-4xl font-light text-black mb-2">1K+</div>
                                <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400">Clients</div>
                            </div>
                            <div className="bg-white p-12 text-center aspect-square flex flex-col justify-center">
                                <div className="text-4xl font-light text-black mb-2">100%</div>
                                <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400">Quality</div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
