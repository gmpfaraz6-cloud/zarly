import { supabase } from '../lib/supabase';

export interface Order {
  id: string;
  user_id: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  shipping_address: any;
  payment_method: 'cod';
  created_at?: string;
  updated_at?: string;
}

export async function getOrders() {
  const { data, error } = await supabase
    .from('orders')
    .select('*, order_items(*, products(*))')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function getOrder(id: string) {
  const { data, error } = await supabase
    .from('orders')
    .select('*, order_items(*, products(*)), auth.users(email, raw_user_meta_data)')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}

export async function updateOrderStatus(id: string, status: Order['status']) {
  const { data, error } = await supabase
    .from('orders')
    .update({ status })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

