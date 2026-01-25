'use client';

import { motion } from 'framer-motion';

export default function Contact() {
    return (
        <section id="contact" className="py-32 bg-black text-white">
            <div className="container mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="text-gray-500 font-bold tracking-[0.2em] uppercase text-xs block mb-6">
                        Contact Us
                    </span>
                    <h2 className="text-5xl md:text-6xl font-bold tracking-widest uppercase mb-8">
                        Get In Touch
                    </h2>
                    <p className="text-gray-400 mb-12 max-w-xl mx-auto text-sm leading-loose">
                        Have a question? We would love to hear from you. <br />
                        Visit our showroom or send us a message.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
                        <a
                            href="tel:+994XXXXXXXXX"
                            className="bg-white text-black px-12 py-4 text-xs font-bold tracking-[0.2em] uppercase hover:bg-gray-200 transition-colors input-reset"
                        >
                            Call Us
                        </a>

                        <a
                            href="mailto:info@parketera.az"
                            className="border border-white/30 text-white px-12 py-4 text-xs font-bold tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-colors"
                        >
                            Email Us
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
