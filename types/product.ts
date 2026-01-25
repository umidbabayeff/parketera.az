/**
 * Product type definitions for Parketera flooring store
 */

export interface Product {
    id: string; // UUID
    legacy_id: number; // Original ID from source data
    category: string; // Product category (Məhsulun növü)
    name: string; // Product name (Məhsul adı)
    unit: string; // Measurement unit (Ölçü vahidi)
    coverage_per_box: number; // Coverage per box in m² (1 qutuda m²)
    price: number; // Price (Qiymət)
    dimensions: string; // Dimensions (Ölçülər)
    created_at: string;
    updated_at: string;
}

export type ProductCategory = 'Parket' | 'Yapışdırıcı' | 'Lak' | 'Təmizləyici vasitə';

export interface ProductFilters {
    category?: ProductCategory | 'all';
    searchQuery?: string;
}

export interface ProductCardProps {
    product: Product;
}
