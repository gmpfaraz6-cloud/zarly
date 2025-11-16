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
  order_items?: Array<{
    id: string;
    product_id: string;
    quantity: number;
    price: number;
    products?: any;
  }>;
}

export interface CreateOrderData {
  total: number;
  shipping_address: any;
  payment_method: 'cod';
  order_items: Array<{
    product_id: string;
    quantity: number;
    price: number;
  }>;
}

export async function createOrder(order: CreateOrderData) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('User not authenticated');

  // Create order
  const { data: orderData, error: orderError } = await supabase
    .from('orders')
    .insert([{
      user_id: user.id,
      ...order,
    }])
    .select()
    .single();

  if (orderError) throw orderError;

  // Create order items
  const orderItems = order.order_items.map((item) => ({
    order_id: orderData.id,
    ...item,
  }));

  const { error: itemsError } = await supabase
    .from('order_items')
    .insert(orderItems);

  if (itemsError) throw itemsError;

  return orderData;
}

export async function getUserOrders() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('User not authenticated');

  const { data, error } = await supabase
    .from('orders')
    .select('*, order_items(*, products(*))')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

