'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Categories() {
    const categories = [
        {
            title: 'PARKET',
            description: 'Bamboo, Solid, Engineered',
            link: '/products?category=Parket'
        },
        {
            title: 'VARNISH',
            description: 'High Quality Finishes',
            link: '/products?category=Lak'
        },
        {
            title: 'ADHESIVES',
            description: 'Professional Bonding',
            link: '/products?category=Yapışdırıcı'
        }
    ];

    return (
        <section className="py-24 bg-[#F8F8F8]">
            <div className="container mx-auto">
                <div className="text-center mb-20">
                    <span className="text-gray-400 font-bold tracking-[0.2em] uppercase text-xs block mb-4">
                        Selection
                    </span>
                    <motion.h2
                        className="text-4xl md:text-5xl font-bold text-black tracking-widest uppercase mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        Categories
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {categories.map((category, index) => (
                        <Link href={category.link} key={index} className="block group">
                            <motion.div
                                className="relative overflow-hidden cursor-pointer bg-white"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: index * 0.1 }}
                            >
                                <div className="h-96 bg-gray-200 relative">
                                    {/* Placeholder Image */}
                                    <div className="absolute inset-0 bg-gray-300 group-hover:bg-gray-400 transition-colors duration-500" />

                                    {/* Center Content */}
                                    <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-black/5 group-hover:bg-black/20 transition-colors duration-500">
                                        <h3 className="text-2xl font-bold tracking-[0.2em] text-black bg-white px-8 py-4 uppercase mb-4">
                                            {category.title}
                                        </h3>
                                        <p className="text-white text-xs tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-sm">
                                            {category.description}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>

                <motion.div
                    className="text-center mt-16"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                >
                    <Link href="/products" className="border-b-2 border-black pb-1 text-xs font-bold tracking-[0.2em] uppercase text-black hover:text-gray-600 hover:border-gray-600 transition-colors">
                        View All Products
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
