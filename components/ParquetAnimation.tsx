'use client';

import { useRef, MouseEvent } from 'react';
import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue } from 'framer-motion';

export default function ParquetAnimation() {
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = ({ currentTarget, clientX, clientY }: MouseEvent) => {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    };

    // Equalizer Effect Implementation
    // Create a set of varied speeds/directions
    const speed1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
    const speed2 = useTransform(scrollYProgress, [0, 1], [0, -50]);
    const speed3 = useTransform(scrollYProgress, [0, 1], [0, 50]);
    const speed4 = useTransform(scrollYProgress, [0, 1], [0, 150]);
    const speed5 = useTransform(scrollYProgress, [0, 1], [0, 200]); // Fast down
    const speed6 = useTransform(scrollYProgress, [0, 1], [0, -200]); // Fast up

    const speeds = [speed1, speed2, speed3, speed4, speed5, speed6];

    // Helper to get a stable random speed for a column index
    const getSpeedForColumn = (index: number) => {
        const randomish = (index * 7 + 3) % speeds.length;
        return speeds[randomish];
    };

    return (
        <section
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="relative min-h-[80vh] bg-neutral-200 overflow-hidden flex items-center justify-center group"
        >

            {/* Chevron Background Pattern */}
            <motion.div
                className="absolute inset-0 pointer-events-none grayscale overflow-hidden flex justify-center"
                style={{
                    opacity: 1, // Visible by default, but masked
                    maskImage: useMotionTemplate`radial-gradient(300px circle at ${mouseX}px ${mouseY}px, black 10%, rgba(0,0,0,0.2) 80%)`,
                    WebkitMaskImage: useMotionTemplate`radial-gradient(300px circle at ${mouseX}px ${mouseY}px, black 10%, rgba(0,0,0,0.2) 80%)`,
                }}
            >
                <motion.div
                    className="flex flex-row -ml-24" // Negative margin to handle tilt overlap
                    style={{ width: '120vw' }}
                >
                    {/* Columns */}
                    {Array.from({ length: 20 }).map((_, colIndex) => (
                        <div key={colIndex} className="flex flex-col -mt-20">
                            {/* Rows in each column */}
                            {Array.from({ length: 15 }).map((_, rowIndex) => {
                                const isEvenCol = colIndex % 2 === 0;
                                const columnY = getSpeedForColumn(colIndex);

                                return (
                                    <motion.div
                                        key={rowIndex}
                                        style={{
                                            marginBottom: '-15px', // Overlap to tighten the V-shape join
                                            y: columnY, // Apply random column speed
                                            backgroundImage: "url('/real-wood-parquet.jpg')",
                                        }}
                                        className={`w-32 h-12 bg-neutral-300 bg-cover bg-center shadow-sm ${isEvenCol ? 'rotate-45 origin-bottom-right' : '-rotate-45 origin-bottom-left'} z-${rowIndex}`}
                                    />
                                );
                            })}
                        </div>
                    ))}
                </motion.div>
            </motion.div>

            <div className="container mx-auto px-6 relative z-10 text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-5xl md:text-7xl font-bold text-black tracking-[0.05em] uppercase mb-8 leading-none"
                >
                    Perfection in <br /> Details.
                </motion.h2>

                <p className="text-gray-500 max-w-xl mx-auto mb-12 text-sm tracking-widest uppercase">
                    Discover the art of fine flooring with our exclusive minimalist collection.
                </p>

                <button className="border-b-2 border-black pb-1 text-xs font-bold tracking-[0.2em] uppercase text-black hover:text-gray-600 hover:border-gray-600 transition-colors">
                    Explore Collection
                </button>
            </div>
        </section>
    );
}
