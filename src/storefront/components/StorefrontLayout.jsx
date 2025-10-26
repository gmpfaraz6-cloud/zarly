import { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import { CartProvider } from '../context/CartContext';
import { supabase } from '../../lib/supabase';
import './StorefrontLayout.css';

function StorefrontLayout({ children }) {
  const [store, setStore] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStore();
  }, []);

  const loadStore = async () => {
    try {
      // Get current hostname to determine which store to load
      const hostname = window.location.hostname;
      
      // In production, load store based on domain
      if (hostname !== 'localhost' && hostname !== '127.0.0.1') {
        // Look up store by domain
        const { data: domainData } = await supabase
          .from('domains')
          .select('store_id, stores(*)')
          .eq('domain', hostname)
          .single();
        
        if (domainData && domainData.stores) {
          setStore(domainData.stores);
          return;
        }
      }
      
      // Fallback: Load first store (for development)
      const { data, error } = await supabase
        .from('stores')
        .select('*')
        .limit(1)
        .single();
      
      if (data) {
        setStore(data);
      }
    } catch (error) {
      console.error('Error loading store:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="storefront-loading">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (!store) {
    return (
      <div className="storefront-error">
        <h1>Store Not Found</h1>
        <p>This store is not yet configured.</p>
        <a href="/admin">Go to Admin</a>
      </div>
    );
  }

  return (
    <CartProvider storeId={store.id}>
      <div className="storefront">
        <Header store={store} />
        <main className="storefront-main">
          {children}
        </main>
        <Footer store={store} />
      </div>
    </CartProvider>
  );
}

export default StorefrontLayout;

