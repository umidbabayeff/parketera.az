import Hero from '@/components/Hero';
import Features from '@/components/Features';
import ParquetAnimation from '@/components/ParquetAnimation';
import Categories from '@/components/Categories';
import About from '@/components/About';
import Contact from '@/components/Contact';

export default function HomePage() {
    return (
        <main className="overflow-hidden">
            <Hero />
            <ParquetAnimation />
            <Features />
            <Categories />
            <About />
            <Contact />
        </main>
    );
}
