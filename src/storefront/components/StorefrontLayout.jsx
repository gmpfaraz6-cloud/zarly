import { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import MobileBottomNav from './MobileBottomNav';
import { CartProvider } from '../context/CartContext';
import { ToastProvider } from './Toast';
import { PageLoader } from './LoadingStates';
import { supabase } from '../../lib/supabase';
import { initAllScrollAnimations, cleanupScrollAnimations } from '../utils/scrollAnimations';
import '../styles/variables.css';
import './StorefrontLayout.css';

function StorefrontLayout({ children }) {
  const [store, setStore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState('up');

  useEffect(() => {
    loadStore();
    
    // Initialize scroll animations
    const observers = initAllScrollAnimations();
    
    // Track scroll position
    let lastScrollY = window.pageYOffset;
    const handleScroll = () => {
      const currentScrollY = window.pageYOffset;
      setScrollY(currentScrollY);
      setScrollDirection(currentScrollY > lastScrollY ? 'down' : 'up');
      lastScrollY = currentScrollY;
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (Array.isArray(observers)) {
        cleanupScrollAnimations(...observers);
      }
    };
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
    return <PageLoader message="Loading store..." />;
  }

  if (!store) {
    return (
      <div className="storefront-error">
        <h1>Store Not Found</h1>
        <p>This store is not yet configured.</p>
        <a href="/admin" className="error-link">Go to Admin</a>
      </div>
    );
  }

  return (
    <ToastProvider>
      <CartProvider storeId={store.id}>
        <div 
          className="storefront" 
          data-scroll-y={scrollY}
          data-scroll-direction={scrollDirection}
        >
          <Header store={store} scrollY={scrollY} scrollDirection={scrollDirection} />
          <main className="storefront-main">
            {children}
          </main>
          <Footer store={store} />
          <MobileBottomNav />
        </div>
      </CartProvider>
    </ToastProvider>
  );
}

export default StorefrontLayout;

