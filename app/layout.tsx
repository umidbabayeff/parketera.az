import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GlueCursor from '@/components/GlueCursor';

export const metadata: Metadata = {
    title: 'Parketera - Keyfiyyətli Döşəmə Həlləri',
    description: 'Parketera online mağazası - Parket, lak, yapışdırıcı və təmizləyici məhsullar',
};

import { CartProvider } from '@/context/CartContext';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="az">
            <body>
                <CartProvider>
                    <GlueCursor />
                    <Header />
                    {children}
                    <Footer />
                </CartProvider>
            </body>
        </html>
    );
}
