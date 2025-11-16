import { supabase } from '../lib/supabase';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  stock: number;
  category_id: string | null;
  slug: string;
  featured: boolean;
  created_at?: string;
  updated_at?: string;
  categories?: {
    id: string;
    name: string;
    slug: string;
  };
}

export async function getProducts(filters?: {
  category?: string;
  featured?: boolean;
  search?: string;
}) {
  let query = supabase
    .from('products')
    .select('*, categories(*)')
    .order('created_at', { ascending: false });

  if (filters?.category) {
    query = query.eq('category_id', filters.category);
  }

  if (filters?.featured) {
    query = query.eq('featured', true);
  }

  if (filters?.search) {
    query = query.ilike('name', `%${filters.search}%`);
  }

  const { data, error } = await query;

  if (error) throw error;
  return data;
}

export async function getProduct(id: string) {
  const { data, error } = await supabase
    .from('products')
    .select('*, categories(*)')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}

export async function getProductBySlug(slug: string) {
  const { data, error } = await supabase
    .from('products')
    .select('*, categories(*)')
    .eq('slug', slug)
    .single();

  if (error) throw error;
  return data;
}

export async function getCategories() {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name', { ascending: true });

  if (error) throw error;
  return data;
}

