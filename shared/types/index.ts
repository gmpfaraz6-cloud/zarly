export interface User {
  id: string;
  email: string;
  phone?: string;
  full_name?: string;
  role?: 'admin' | 'customer';
  created_at?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image?: string;
  description?: string;
  created_at?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  stock: number;
  category_id: string;
  slug: string;
  featured?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface CartItem {
  id: string;
  user_id: string;
  product_id: string;
  quantity: number;
  created_at?: string;
  product?: Product;
}

export interface Order {
  id: string;
  user_id: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  shipping_address: Address;
  payment_method: 'cod';
  created_at?: string;
  updated_at?: string;
  order_items?: OrderItem[];
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  price: number;
  product?: Product;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone?: string;
}

export interface StoreSettings {
  id: string;
  store_name: string;
  email: string;
  phone: string;
  address: Address;
  shipping_rates: ShippingRate[];
  tax_rate: number;
  created_at?: string;
  updated_at?: string;
}

export interface ShippingRate {
  name: string;
  price: number;
  estimated_days: number;
}

export interface Inventory {
  id: string;
  product_id: string;
  stock_quantity: number;
  low_stock_threshold: number;
  updated_at?: string;
}

