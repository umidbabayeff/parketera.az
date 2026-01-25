'use client';

import { motion } from 'framer-motion';

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-white pt-32 md:pt-40 pb-20">
            <div className="container mx-auto">

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                    {/* Info Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-xs font-bold tracking-[0.2em] uppercase text-gray-400 block mb-4">
                            Get in Touch
                        </span>
                        <h1 className="text-4xl font-bold text-black tracking-widest uppercase mb-10">
                            Visit Our <br /> Showroom
                        </h1>

                        <div className="space-y-8 text-gray-500">
                            <div>
                                <h3 className="text-xs font-bold tracking-[0.1em] uppercase text-black mb-2">Address</h3>
                                <p>123 Nizami Street, Baku<br />Azerbaijan, AZ1000</p>
                            </div>
                            <div>
                                <h3 className="text-xs font-bold tracking-[0.1em] uppercase text-black mb-2">Contact</h3>
                                <p>+994 50 123 45 67<br />hello@parketera.az</p>
                            </div>
                            <div>
                                <h3 className="text-xs font-bold tracking-[0.1em] uppercase text-black mb-2">Hours</h3>
                                <p>Mon - Fri: 10am - 7pm<br />Sat - Sun: 11am - 5pm</p>
                            </div>
                        </div>

                        <div className="mt-12">
                            <button className="text-xs font-bold tracking-[0.15em] uppercase text-black border-b border-black pb-1 hover:text-gray-500 hover:border-gray-500 transition-colors">
                                View on Map
                            </button>
                        </div>
                    </motion.div>

                    {/* Form Section */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <form className="space-y-8">
                            <div>
                                <input
                                    type="text"
                                    placeholder="NAME *"
                                    className="w-full border-b border-gray-200 py-4 text-xs font-bold tracking-[0.1em] uppercase placeholder-gray-400 focus:outline-none focus:border-black transition-colors"
                                />
                            </div>
                            <div>
                                <input
                                    type="email"
                                    placeholder="EMAIL *"
                                    className="w-full border-b border-gray-200 py-4 text-xs font-bold tracking-[0.1em] uppercase placeholder-gray-400 focus:outline-none focus:border-black transition-colors"
                                />
                            </div>
                            <div>
                                <textarea
                                    placeholder="MESSAGE"
                                    rows={4}
                                    className="w-full border-b border-gray-200 py-4 text-xs font-bold tracking-[0.1em] uppercase placeholder-gray-400 focus:outline-none focus:border-black transition-colors resize-none"
                                />
                            </div>

                            <button className="bg-black text-white px-10 py-4 text-xs font-bold tracking-[0.2em] uppercase hover:bg-gray-800 transition-colors w-full md:w-auto">
                                Send Message
                            </button>
                        </form>
                    </motion.div>
                </div>

            </div>
        </main>
    );
}
