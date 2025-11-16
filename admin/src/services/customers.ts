import { supabase } from '../lib/supabase';

export async function getCustomers() {
  // Note: This requires admin access to auth.users table
  // In production, you might want to create a public profiles table
  const { data: { users }, error } = await supabase.auth.admin.listUsers();

  if (error) throw error;
  return users;
}

export async function getCustomerOrders(userId: string) {
  const { data, error } = await supabase
    .from('orders')
    .select('*, order_items(*, products(*))')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

