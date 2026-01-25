'use client';

import { motion } from 'framer-motion';

const services = [
    {
        title: "Eco Friendly",
        description: "Lorem ipsum dolor sit amet, consec tetur adipi scing elit.",
        icon: (
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
        ), // Leaf/Eco placeholder
    },
    {
        title: "Designing",
        description: "Lorem ipsum dolor sit amet, consec tetur adipi scing elit.",
        icon: (
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
        ),
    },
    {
        title: "Residential",
        description: "Lorem ipsum dolor sit amet, consec tetur adipi scing elit.",
        icon: (
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
        ),
    },
    {
        title: "Best Material",
        description: "Lorem ipsum dolor sit amet, consec tetur adipi scing elit.",
        icon: (
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
        ),
    }
];

export default function Services() {
    return (
        <section className="py-24 bg-white" id="features">
            <div className="container mx-auto">
                <div className="mb-20 text-center">
                    <span className="text-gray-400 font-bold tracking-[0.2em] uppercase text-xs block mb-4">
                        Our Features
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-black tracking-widest uppercase mb-6 leading-tight">
                        Flooring the <br /> World
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                            className="text-center group"
                        >
                            <div className="mb-8 mx-auto inline-block p-6 rounded-full border border-gray-200 transition-colors group-hover:border-black group-hover:bg-black group-hover:text-white text-black">
                                {service.icon}
                            </div>
                            <h3 className="text-sm font-bold uppercase tracking-[0.15em] mb-4 text-black">{service.title}</h3>
                            <p className="text-gray-500 text-sm leading-relaxed max-w-xs mx-auto">
                                {service.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
