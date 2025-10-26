import { createContext, useContext, useState, useEffect } from 'react';
import { getCartItems, addToCart as addToCartDB, updateCartItem, removeFromCart as removeFromCartDB, clearCart as clearCartDB } from '../../lib/supabase-queries';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children, storeId }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sessionId, setSessionId] = useState('');

  // Generate or retrieve session ID
  useEffect(() => {
    let sid = localStorage.getItem('cart_session_id');
    if (!sid) {
      sid = 'session_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      localStorage.setItem('cart_session_id', sid);
    }
    setSessionId(sid);
  }, []);

  // Load cart items
  useEffect(() => {
    if (storeId && sessionId) {
      loadCart();
    }
  }, [storeId, sessionId]);

  const loadCart = async () => {
    try {
      setLoading(true);
      const items = await getCartItems(storeId, sessionId);
      setCartItems(items || []);
    } catch (error) {
      console.error('Error loading cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const addItem = async (productId, variantId, quantity = 1) => {
    try {
      await addToCartDB(storeId, sessionId, productId, variantId, quantity);
      await loadCart();
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    }
  };

  const updateItem = async (cartItemId, quantity) => {
    try {
      await updateCartItem(cartItemId, quantity);
      await loadCart();
    } catch (error) {
      console.error('Error updating cart:', error);
      throw error;
    }
  };

  const removeItem = async (cartItemId) => {
    try {
      await removeFromCartDB(cartItemId);
      await loadCart();
    } catch (error) {
      console.error('Error removing from cart:', error);
      throw error;
    }
  };

  const clearCart = async () => {
    try {
      await clearCartDB(storeId, sessionId);
      setCartItems([]);
    } catch (error) {
      console.error('Error clearing cart:', error);
      throw error;
    }
  };

  const getItemCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getSubtotal = () => {
    return cartItems.reduce((total, item) => {
      const price = item.product_variants?.price || item.products?.price || 0;
      return total + (price * item.quantity);
    }, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        loading,
        addItem,
        updateItem,
        removeItem,
        clearCart,
        getItemCount,
        getSubtotal,
        refreshCart: loadCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

