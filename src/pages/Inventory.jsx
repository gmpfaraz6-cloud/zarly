import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getProducts, updateProduct, getStore } from '../lib/supabase-queries';
import './Inventory.css';

function Inventory() {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [store, setStore] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (user) {
      loadStoreAndInventory();
    }
  }, [user]);

  const loadStoreAndInventory = async () => {
    try {
      setLoading(true);
      setError(null);

      const storeData = await getStore(user.id);
      if (!storeData) {
        setError('No store found');
        setLoading(false);
        return;
      }
      setStore(storeData);

      const productsData = await getProducts(storeData.id);
      setProducts(productsData || []);
    } catch (err) {
      console.error('Error loading inventory:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStock = async (productId, variantId, newQuantity) => {
    try {
      await updateProduct(productId, { 
        inventory_quantity: parseInt(newQuantity) 
      });
      await loadStoreAndInventory();
    } catch (err) {
      alert('Failed to update inventory');
      console.error(err);
    }
  };

  const filteredProducts = products.filter(product => {
    if (!searchQuery) return true;
    return product.title?.toLowerCase().includes(searchQuery.toLowerCase());
  });

  if (loading) {
    return (
      <div className="inventory-page">
        <div className="inventory-loading">
          <div className="loading-spinner"></div>
          <p>Loading inventory...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="inventory-page">
        <div className="inventory-error">
          <p>Error: {error}</p>
          <button onClick={loadStoreAndInventory} className="retry-btn">Retry</button>
        </div>
      </div>
    );
  }

  const totalInventory = products.reduce((sum, p) => sum + (p.product_variants?.[0]?.inventory_quantity || 0), 0);
  const lowStock = products.filter(p => (p.product_variants?.[0]?.inventory_quantity || 0) < 10).length;

  return (
    <div className="inventory-page">
      <div className="inventory-content">
        <div className="inventory-stats">
          <div className="stat-card">
            <div className="stat-label">Total inventory</div>
            <div className="stat-value">{totalInventory}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Low stock items</div>
            <div className="stat-value">{lowStock}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Products</div>
            <div className="stat-value">{products.length}</div>
          </div>
        </div>

        <div className="inventory-table-section">
          <div className="table-header">
            <input 
              type="text" 
              placeholder="Search inventory..."
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {filteredProducts.length === 0 ? (
            <div className="empty-state">
              <h3>No inventory yet</h3>
              <p>Add products to start tracking inventory</p>
            </div>
          ) : (
            <div className="inventory-table-wrapper">
              <table className="inventory-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>SKU</th>
                    <th>Available</th>
                    <th>On hand</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => {
                    const variant = product.product_variants?.[0];
                    const quantity = variant?.inventory_quantity || 0;
                    return (
                      <tr key={product.id}>
                        <td className="product-name">{product.title}</td>
                        <td>{variant?.sku || '—'}</td>
                        <td className={quantity < 10 ? 'low-stock' : ''}>{quantity}</td>
                        <td>{quantity}</td>
                        <td>
                          <button 
                            className="btn-small"
                            onClick={() => {
                              const newQty = prompt('Enter new quantity:', quantity);
                              if (newQty !== null) {
                                handleUpdateStock(product.id, variant?.id, newQty);
                              }
                            }}
                          >
                            Adjust
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Inventory;
