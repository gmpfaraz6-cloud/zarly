import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import './Home.css';

function Home() {
  const [store, setStore] = useState(null);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // Get store
      const { data: storeData } = await supabase
        .from('stores')
        .select('*')
        .limit(1)
        .single();
      
      if (storeData) {
        setStore(storeData);

        // Get featured products
        const { data: productsData } = await supabase
          .from('products')
          .select('*, product_images(url)')
          .eq('store_id', storeData.id)
          .eq('status', 'active')
          .limit(8);
        
        setFeaturedProducts(productsData || []);

        // Get collections
        const { data: collectionsData } = await supabase
          .from('collections')
          .select('*')
          .eq('store_id', storeData.id)
          .eq('published', true)
          .limit(4);
        
        setCollections(collectionsData || []);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="home-loading">Loading...</div>;
  }

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to {store?.name || 'Our Store'}</h1>
          <p className="hero-subtitle">Discover our amazing products</p>
          <Link to="/products" className="hero-cta">
            Shop Now
          </Link>
        </div>
      </section>

      {/* Collections Section */}
      {collections.length > 0 && (
        <section className="collections-section">
          <div className="section-container">
            <h2 className="section-title">Shop by Collection</h2>
            <div className="collections-grid">
              {collections.map((collection) => (
                <Link 
                  key={collection.id} 
                  to={`/collections/${collection.handle}`}
                  className="collection-card"
                >
                  {collection.image_url && (
                    <img src={collection.image_url} alt={collection.title} />
                  )}
                  <div className="collection-info">
                    <h3>{collection.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Products Section */}
      {featuredProducts.length > 0 && (
        <section className="featured-products-section">
          <div className="section-container">
            <h2 className="section-title">Featured Products</h2>
            <div className="products-grid">
              {featuredProducts.map((product) => (
                <Link 
                  key={product.id} 
                  to={`/products/${product.handle}`}
                  className="product-card"
                >
                  {product.product_images?.[0]?.url && (
                    <div className="product-image">
                      <img src={product.product_images[0].url} alt={product.title} />
                    </div>
                  )}
                  <div className="product-info">
                    <h3 className="product-title">{product.title}</h3>
                    {product.price && (
                      <p className="product-price">${parseFloat(product.price).toFixed(2)}</p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Start Shopping Today</h2>
          <p>Browse our full catalog of products</p>
          <Link to="/products" className="cta-button">
            View All Products
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;

