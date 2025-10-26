import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useCart } from '../context/CartContext';
import './ProductDetail.css';

function ProductDetail() {
  const { handle } = useParams();
  const { addItem } = useCart();
  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadProduct();
  }, [handle]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      
      const { data: storeData } = await supabase
        .from('stores')
        .select('id')
        .limit(1)
        .single();

      if (storeData) {
        const { data, error } = await supabase
          .from('products')
          .select('*, product_images(*), product_variants(*)')
          .eq('store_id', storeData.id)
          .eq('handle', handle)
          .eq('status', 'active')
          .single();

        if (error) throw error;
        
        setProduct(data);
        if (data.product_variants && data.product_variants.length > 0) {
          setSelectedVariant(data.product_variants[0]);
        }
      }
    } catch (error) {
      console.error('Error loading product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    try {
      setAdding(true);
      setMessage('');
      
      const variantId = selectedVariant?.id || null;
      await addItem(product.id, variantId, quantity);
      
      setMessage('Added to cart!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error adding to cart:', error);
      setMessage('Error adding to cart');
    } finally {
      setAdding(false);
    }
  };

  if (loading) {
    return <div className="product-detail-loading">Loading...</div>;
  }

  if (!product) {
    return (
      <div className="product-not-found">
        <h1>Product Not Found</h1>
        <Link to="/products">Back to Products</Link>
      </div>
    );
  }

  const currentPrice = selectedVariant?.price || product.price || 0;

  return (
    <div className="product-detail">
      <div className="product-detail-container">
        <div className="product-images">
          {product.product_images && product.product_images.length > 0 ? (
            <div className="main-image">
              <img src={product.product_images[0].url} alt={product.title} />
            </div>
          ) : (
            <div className="no-image">No Image Available</div>
          )}
        </div>

        <div className="product-details">
          <h1 className="product-title">{product.title}</h1>
          <p className="product-price">${parseFloat(currentPrice).toFixed(2)}</p>

          {product.description && (
            <div className="product-description">
              <p>{product.description}</p>
            </div>
          )}

          {product.product_variants && product.product_variants.length > 1 && (
            <div className="product-variants">
              <label className="variant-label">Variant:</label>
              <div className="variant-options">
                {product.product_variants.map((variant) => (
                  <button
                    key={variant.id}
                    className={`variant-option ${selectedVariant?.id === variant.id ? 'active' : ''}`}
                    onClick={() => setSelectedVariant(variant)}
                  >
                    {variant.title}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="quantity-selector">
            <label className="quantity-label">Quantity:</label>
            <div className="quantity-controls">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="quantity-btn"
              >
                -
              </button>
              <input 
                type="number" 
                value={quantity} 
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="quantity-input"
              />
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="quantity-btn"
              >
                +
              </button>
            </div>
          </div>

          <button 
            className="add-to-cart-btn"
            onClick={handleAddToCart}
            disabled={adding}
          >
            {adding ? 'Adding...' : 'Add to Cart'}
          </button>

          {message && (
            <div className={`message ${message.includes('Error') ? 'error' : 'success'}`}>
              {message}
            </div>
          )}

          {selectedVariant && selectedVariant.sku && (
            <div className="product-meta">
              <p><strong>SKU:</strong> {selectedVariant.sku}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;

