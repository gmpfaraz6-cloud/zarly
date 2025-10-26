import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import './CollectionPage.css';

function CollectionPage() {
  const { handle } = useParams();
  const [collection, setCollection] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCollection();
  }, [handle]);

  const loadCollection = async () => {
    try {
      setLoading(true);

      const { data: storeData } = await supabase
        .from('stores')
        .select('id')
        .limit(1)
        .single();

      if (storeData) {
        // Get collection
        const { data: collectionData } = await supabase
          .from('collections')
          .select('*')
          .eq('store_id', storeData.id)
          .eq('handle', handle)
          .eq('published', true)
          .single();

        if (collectionData) {
          setCollection(collectionData);

          // Get products in this collection
          const { data: collectionProducts } = await supabase
            .from('collection_products')
            .select('product_id')
            .eq('collection_id', collectionData.id);

          if (collectionProducts && collectionProducts.length > 0) {
            const productIds = collectionProducts.map(cp => cp.product_id);

            const { data: productsData } = await supabase
              .from('products')
              .select('*, product_images(url)')
              .in('id', productIds)
              .eq('status', 'active');

            setProducts(productsData || []);
          }
        }
      }
    } catch (error) {
      console.error('Error loading collection:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="collection-loading">Loading...</div>;
  }

  if (!collection) {
    return (
      <div className="collection-not-found">
        <h1>Collection Not Found</h1>
        <Link to="/products">View All Products</Link>
      </div>
    );
  }

  return (
    <div className="collection-page">
      <div className="collection-header">
        {collection.image_url && (
          <div className="collection-banner">
            <img src={collection.image_url} alt={collection.title} />
          </div>
        )}
        <div className="collection-header-content">
          <h1>{collection.title}</h1>
          {collection.description && <p>{collection.description}</p>}
        </div>
      </div>

      <div className="collection-container">
        {products.length === 0 ? (
          <div className="no-products">
            <p>No products in this collection yet.</p>
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
                  {product.price && (
                    <p className="product-price">${parseFloat(product.price).toFixed(2)}</p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CollectionPage;

