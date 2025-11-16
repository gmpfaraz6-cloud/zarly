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
}

export interface CreateProductData {
  name: string;
  description: string;
  price: number;
  images: string[];
  stock: number;
  category_id: string | null;
  slug: string;
  featured: boolean;
}

export async function getProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*, categories(*)')
    .order('created_at', { ascending: false });

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

export async function createProduct(product: CreateProductData) {
  const { data, error } = await supabase
    .from('products')
    .insert([product])
    .select()
    .single();

  if (error) throw error;
  
  // Create inventory record
  await supabase
    .from('inventory')
    .insert([{
      product_id: data.id,
      stock_quantity: product.stock,
      low_stock_threshold: 10,
    }]);

  return data;
}

export async function updateProduct(id: string, product: Partial<CreateProductData>) {
  const { data, error } = await supabase
    .from('products')
    .update(product)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;

  // Update inventory if stock changed
  if (product.stock !== undefined) {
    await supabase
      .from('inventory')
      .update({ stock_quantity: product.stock })
      .eq('product_id', id);
  }

  return data;
}

export async function deleteProduct(id: string) {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

export async function uploadProductImage(file: File, productId: string): Promise<string> {
  const fileExt = file.name.split('.').pop();
  const fileName = `${productId}/${Date.now()}.${fileExt}`;

  const { data, error } = await supabase.storage
    .from('product-images')
    .upload(fileName, file);

  if (error) throw error;

  const { data: { publicUrl } } = supabase.storage
    .from('product-images')
    .getPublicUrl(fileName);

  return publicUrl;
}

