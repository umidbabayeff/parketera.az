/**
 * Supabase client configuration for Parketera
 */

import { createClient } from '@supabase/supabase-js';

// Get environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
        'Missing Supabase environment variables. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY'
    );
}

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Type-safe database helpers
export type Database = {
    public: {
        Tables: {
            products: {
                Row: {
                    id: string;
                    legacy_id: number;
                    category: string;
                    name: string;
                    unit: string;
                    coverage_per_box: number;
                    price: number;
                    dimensions: string;
                    created_at: string;
                    updated_at: string;
                };
                Insert: Omit<Database['public']['Tables']['products']['Row'], 'id' | 'created_at' | 'updated_at'>;
                Update: Partial<Database['public']['Tables']['products']['Insert']>;
            };
        };
    };
};
