import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import './ProductList.css';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    loadProducts();
  }, [sortBy]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      
      const { data: storeData } = await supabase
        .from('stores')
        .select('id')
        .limit(1)
        .single();

      if (storeData) {
        let query = supabase
          .from('products')
          .select('*, product_images(url), product_variants(price)')
          .eq('store_id', storeData.id)
          .eq('status', 'active');

        // Apply sorting
        if (sortBy === 'newest') {
          query = query.order('created_at', { ascending: false });
        } else if (sortBy === 'price_low') {
          query = query.order('price', { ascending: true });
        } else if (sortBy === 'price_high') {
          query = query.order('price', { ascending: false });
        }

        const { data, error } = await query;
        
        if (error) throw error;
        setProducts(data || []);
      }
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const getProductPrice = (product) => {
    if (product.price) return parseFloat(product.price);
    if (product.product_variants?.[0]?.price) return parseFloat(product.product_variants[0].price);
    return 0;
  };

  return (
    <div className="product-list">
      <div className="product-list-container">
        <div className="product-list-header">
          <h1>All Products</h1>
          <div className="product-list-controls">
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="newest">Newest</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="loading">Loading products...</div>
        ) : products.length === 0 ? (
          <div className="no-products">
            <p>No products available at the moment.</p>
          </div>
        ) : (
          <div className="products-grid">
            {products.map((product) => (
              <Link 
                key={product.id} 
                to={`/products/${product.handle}`}
                className="product-card"
              >
                <div className="product-image">
                  {product.product_images?.[0]?.url ? (
                    <img src={product.product_images[0].url} alt={product.title} />
                  ) : (
                    <div className="no-image">No Image</div>
                  )}
                </div>
                <div className="product-info">
                  <h3 className="product-title">{product.title}</h3>
                  <p className="product-price">${getProductPrice(product).toFixed(2)}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductList;

