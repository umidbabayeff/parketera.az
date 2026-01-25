'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { Product, ProductCategory, ProductFilters } from '@/types/product';
import { motion } from 'framer-motion';
import { useCart } from '@/context/CartContext';

export default function ProductCatalog() {
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filters, setFilters] = useState<ProductFilters>({
        category: 'all',
        searchQuery: '',
    });

    useEffect(() => {
        async function fetchProducts() {
            try {
                setLoading(true);
                const { data, error } = await supabase
                    .from('products')
                    .select('*')
                    .order('category', { ascending: true })
                    .order('name', { ascending: true });

                if (error) throw error;

                setProducts(data || []);
                setFilteredProducts(data || []);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch products');
            } finally {
                setLoading(false);
            }
        }
        fetchProducts();
    }, []);

    useEffect(() => {
        let filtered = [...products];
        if (filters.category && filters.category !== 'all') {
            filtered = filtered.filter((p) => p.category === filters.category);
        }
        if (filters.searchQuery) {
            const query = filters.searchQuery.toLowerCase();
            filtered = filtered.filter((p) =>
                p.name.toLowerCase().includes(query) ||
                p.category.toLowerCase().includes(query)
            );
        }
        setFilteredProducts(filtered);
    }, [filters, products]);

    const categories: Array<{ value: ProductCategory | 'all'; label: string }> = [
        { value: 'all', label: 'All' },
        { value: 'Parket', label: 'Home Decor' }, // Mapping for demo
        { value: 'Yapışdırıcı', label: 'Lighting' },
        { value: 'Lak', label: 'Decoration' },
        { value: 'Təmizləyici vasitə', label: 'Vases' },
    ];

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="w-1 h-8 bg-black animate-pulse"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-12 text-red-500 text-xs tracking-widest uppercase">
                <p>Error: {error}</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-6 py-20">
            <div className="flex flex-col lg:flex-row gap-16">

                {/* Left Sidebar - Depot Style */}
                <div className="w-full lg:w-1/4 flex-shrink-0 space-y-12">
                    <div>
                        <span className="text-xs font-bold tracking-[0.2em] uppercase text-black block mb-4">
                            Depot
                        </span>
                        <h1 className="text-3xl font-bold tracking-[0.1em] uppercase text-black mb-6 leading-tight">
                            Collection of <br /> Elements
                        </h1>
                        <p className="text-gray-500 text-sm leading-loose">
                            Successful brands get into the mind slowly. A blurb in a magazine. A mention in a newspaper. A comment from a friend.
                        </p>
                    </div>

                    {/* Sidebar Menu / Filters */}
                    <div>
                        <h3 className="text-xs font-bold tracking-[0.15em] uppercase text-black mb-6 flex items-center justify-between">
                            Shop Categories
                            <span className="text-[10px]">▼</span>
                        </h3>
                        <div className="flex flex-col space-y-4 border-l border-gray-200 pl-6">
                            {categories.map((cat) => (
                                <button
                                    key={cat.value}
                                    onClick={() => setFilters({ ...filters, category: cat.value as any })}
                                    className={`text-xs text-left font-bold tracking-[0.1em] uppercase transition-colors ${filters.category === cat.value
                                        ? 'text-black'
                                        : 'text-gray-400 hover:text-black'
                                        }`}
                                >
                                    {cat.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Grid Content */}
                <div className="flex-1">
                    {/* Minimalist Top Bar (optional, maybe sort?) */}

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-12">
                        {filteredProducts.map((product, index) => (
                            <ProductCard key={product.id} product={product} index={index} />
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}

function ProductCard({ product, index }: { product: Product, index: number }) {
    const { addToCart } = useCart();

    // Hardcoded Image Mapping for Demo
    const imageMap: Record<string, string> = {
        'HOME MAXI GLOSSY 5LT': 'https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?q=80&w=800&auto=format&fit=crop', // Replaced with known working (Frosty)
        'BALTICWOOD 1R NOUGAT': 'https://plus.unsplash.com/premium_photo-1675841668725-50280eb46d0a?q=80&w=800&auto=format&fit=crop', // Bamboo (Working)
        'BALTICWOOD 3R FORSTY': 'https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?q=80&w=800&auto=format&fit=crop', // Working
        'PARLAQ BAMBUK': 'https://plus.unsplash.com/premium_photo-1675841668725-50280eb46d0a?q=80&w=800&auto=format&fit=crop', // Working
        'MERBAU - 120 MEDIUM': 'https://images.unsplash.com/photo-1543857778-c4a1a3e0b2eb?q=80&w=800&auto=format&fit=crop', // Merbau
    };

    const handleAddToCart = () => {
        addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
            image: imageMap[product.name.toUpperCase()] || 'https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?q=80&w=800&auto=format&fit=crop'
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className="group cursor-pointer"
        >
            {/* Image Container - Clean, No Border */}
            <div className="bg-[#F8F8F8] h-[350px] relative overflow-hidden flex items-center justify-center mb-6">
                <img
                    src={imageMap[product.name.toUpperCase()] || 'https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?q=80&w=800&auto=format&fit=crop'}
                    alt={product.name}
                    className="w-full h-full object-cover transition-all duration-700"
                    onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?q=80&w=800&auto=format&fit=crop';
                    }}
                />

                {/* Minimalist 'New' Badge */}
                <span className="absolute top-4 left-4 text-[10px] font-bold tracking-widest uppercase text-gray-400">
                    New
                </span>

                {/* Hover Actions */}
                <div className="absolute bottom-0 left-0 right-0 bg-white/90 py-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex items-center justify-center gap-4 border-t border-gray-100">
                    <button className="text-[10px] font-bold tracking-widest uppercase text-black hover:text-gray-500">
                        Quick Look
                    </button>
                    <span className="w-[1px] h-3 bg-gray-300"></span>
                    <button
                        onClick={handleAddToCart}
                        className="text-[10px] font-bold tracking-widest uppercase text-black hover:text-gray-500"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>

            {/* Info */}
            <div className="text-center">
                <h3 className="text-sm font-bold tracking-[0.1em] uppercase text-black mb-2">
                    {product.name}
                </h3>
                <span className="text-xs text-gray-500 tracking-wider">
                    {product.price > 0 ? `$${product.price}` : 'Contact'}
                </span>
            </div>
        </motion.div>
    );
}
