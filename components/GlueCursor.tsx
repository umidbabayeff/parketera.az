'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CURSOR_SIZE = 28;

export default function GlueCursor() {
    const [isVisible, setIsVisible] = useState(false);
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    // Spring config for the "heavy" trowel feel
    const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
    const springX = useSpring(cursorX, springConfig);
    const springY = useSpring(cursorY, springConfig);

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const pointsRef = useRef<{ x: number; y: number; age: number }[]>([]);
    const requestRef = useRef<number>();

    useEffect(() => {
        // Force visible on all devices for now to ensure user sees it
        setIsVisible(true);
        document.body.style.cursor = 'none';

        // Add a class to buttons/links to ensure the custom cursor stays visible
        const addCursorNone = () => {
            const style = document.createElement('style');
            style.innerHTML = `
           * { cursor: none !important; }
         `;
            style.id = 'hide-cursor-style';
            document.head.appendChild(style);
        };
        addCursorNone();

        return () => {
            document.body.style.cursor = '';
            const style = document.getElementById('hide-cursor-style');
            if (style) style.remove();
        };
    }, []);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            cursorX.set(e.clientX - CURSOR_SIZE / 2);
            cursorY.set(e.clientY - CURSOR_SIZE / 2);

            // Add point for trail
            // Adjusted offset for rotated spatula
            pointsRef.current.push({
                x: e.clientX - 8, // Adjusted for smaller cursor
                y: e.clientY + 15, // Adjusted for smaller cursor
                age: 1.0
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [cursorX, cursorY]);

    // Animation Loop for the Glue Trail
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const updateCanvasSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        updateCanvasSize();
        window.addEventListener('resize', updateCanvasSize);

        // Parse the GLUE_COLOR for use in rgba
        // Simple hex to rgb conversion for #C69C6D
        // R: C6 -> 198, G: 9C -> 156, B: 6D -> 109
        const rVal = 198;
        const gVal = 156;
        const bVal = 109;

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Filter out old points
            pointsRef.current = pointsRef.current.filter(p => p.age > 0);

            // Draw trails
            if (pointsRef.current.length > 1) {
                ctx.lineCap = 'butt';
                ctx.lineJoin = 'round';

                for (let i = 0; i < pointsRef.current.length - 1; i++) {
                    const p1 = pointsRef.current[i];
                    const p2 = pointsRef.current[i + 1];

                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);

                    const opacity = p1.age;

                    // Main glue color - thick
                    ctx.lineWidth = 28;
                    ctx.strokeStyle = `rgba(${rVal}, ${gVal}, ${bVal}, ${opacity * 0.8})`; // High opacity
                    ctx.stroke();

                    // Comb ridges (darker lines)
                    const ridgeGap = 5;
                    for (let r = -2; r <= 2; r++) {
                        ctx.beginPath();
                        ctx.moveTo(p1.x + r * ridgeGap, p1.y + r * ridgeGap);
                        ctx.lineTo(p2.x + r * ridgeGap, p2.y + r * ridgeGap);
                        ctx.lineWidth = 2;
                        // Darker version of glue color
                        ctx.strokeStyle = `rgba(160, 110, 60, ${opacity * 0.9})`;
                        ctx.stroke();
                    }

                    // Decrease age
                    p1.age -= 0.008; // Fade speed (slower)
                }
                // Last point needs aging too
                if (pointsRef.current.length > 0) {
                    pointsRef.current[pointsRef.current.length - 1].age -= 0.008;
                }
            }

            requestRef.current = requestAnimationFrame(animate);
        };

        requestRef.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('resize', updateCanvasSize);
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, []);

    if (!isVisible) return null;

    return (
        <>
            {/* Canvas for Glue Trail - Behind everything */}
            <canvas
                ref={canvasRef}
                className="pointer-events-none fixed inset-0 z-[9998]"
            />

            {/* Trowel Cursor - Top layer */}
            <motion.div
                style={{
                    x: springX,
                    y: springY,
                    rotate: 0,
                }}
                className="pointer-events-none fixed top-0 left-0 z-[9999]"
            >
                <img
                    src="/spatula.png"
                    alt="Spatula"
                    width={CURSOR_SIZE * 1.5}
                    height={CURSOR_SIZE * 1.5}
                    className="drop-shadow-[2px_2px_2px_rgba(0,0,0,0.2)] -rotate-45"
                />
            </motion.div>
        </>
    );
}
