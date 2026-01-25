'use client';

export default function Footer() {
    return (
        <footer className="bg-white text-black border-t border-gray-100">
            <div className="container mx-auto pb-20">
                {/* Spacer to guarantee distance from top */}
                <div className="h-64 w-full" />
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-left">

                    {/* Brand */}
                    <div className="col-span-1 md:col-span-2">
                        <h3 className="text-2xl font-bold tracking-[0.2em] uppercase mb-6">Parketera</h3>
                        <p className="text-gray-500 text-sm leading-loose max-w-sm">
                            We create spaces that inspire. Our commitment to quality and minimalist design ensures your home feels both modern and timeless.
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="text-xs font-bold tracking-[0.2em] uppercase mb-6">Menu</h4>
                        <ul className="space-y-4 text-sm text-gray-500">
                            <li><a href="/" className="hover:text-black transition-colors">Home</a></li>
                            <li><a href="/products" className="hover:text-black transition-colors">Shop</a></li>
                            <li><a href="/about" className="hover:text-black transition-colors">About</a></li>
                            <li><a href="/contact" className="hover:text-black transition-colors">Contact</a></li>
                        </ul>
                    </div>

                    {/* Social / Contact */}
                    <div>
                        <h4 className="text-xs font-bold tracking-[0.2em] uppercase mb-6">Connect</h4>
                        <ul className="space-y-4 text-sm text-gray-500">
                            <li><a href="#" className="hover:text-black transition-colors">Instagram</a></li>
                            <li><a href="#" className="hover:text-black transition-colors">Facebook</a></li>
                            <li><a href="#" className="hover:text-black transition-colors">Twitter</a></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-100 mt-20 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400 uppercase tracking-widest">
                    <p>&copy; {new Date().getFullYear()} Parketera. All Rights Reserved.</p>
                    <div className="flex gap-8 mt-4 md:mt-0">
                        <a href="#" className="hover:text-black text-[10px]">Privacy Policy</a>
                        <a href="#" className="hover:text-black text-[10px]">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
