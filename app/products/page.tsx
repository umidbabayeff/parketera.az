import ProductCatalog from '@/components/ProductCatalog';
import Link from 'next/link';

export default function ProductsPage() {
    return (
        <main className="min-h-screen bg-white pt-24">
            {/* Breadcrumb */}
            <div className="container mx-auto py-4">
                <nav className="flex items-center space-x-2 text-sm text-gray-600">
                    <Link href="/" className="hover:text-purple-600 transition-colors">
                        Ana Səhifə
                    </Link>
                    <span>/</span>
                    <span className="text-gray-900 font-medium">Məhsullar</span>
                </nav>
            </div>

            <ProductCatalog />
        </main>
    );
}
