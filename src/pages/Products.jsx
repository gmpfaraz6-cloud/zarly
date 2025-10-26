import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getProducts, updateProduct, deleteProduct, bulkUpdateProducts, getStore } from '../lib/supabase-queries';
import './Products.css';

function Products({ onAddProduct }) {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('all');
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSort, setShowSort] = useState(false);
  const [sortBy, setSortBy] = useState('created');
  const [sortOrder, setSortOrder] = useState('newest');
  const [showMoreActions, setShowMoreActions] = useState(false);
  const [hideAnalytics, setHideAnalytics] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [store, setStore] = useState(null);

  useEffect(() => {
    if (user) {
      loadStoreAndProducts();
    }
  }, [user, activeTab]);

  const loadStoreAndProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      // Get store for this user
      const storeData = await getStore(user.id);
      if (!storeData) {
        setError('No store found. Please create a store first.');
        setLoading(false);
        return;
      }
      setStore(storeData);

      // Get products based on active tab
      const filters = {};
      if (activeTab === 'active') {
        filters.status = 'active';
      } else if (activeTab === 'draft') {
        filters.status = 'draft';
      } else if (activeTab === 'archived') {
        filters.status = 'archived';
      }

      const productsData = await getProducts(storeData.id, filters);
      setProducts(productsData || []);
    } catch (err) {
      console.error('Error loading products:', err);
      setError(err.message || 'Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const toggleProductSelection = (productId) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter(id => id !== productId));
    } else {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };

  const toggleSelectAll = () => {
    if (selectedProducts.length === products.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(products.map(p => p.id));
    }
  };

  const handleStatusChange = async (productId, newStatus) => {
    try {
      await updateProduct(productId, { status: newStatus });
      await loadStoreAndProducts();
    } catch (err) {
      alert('Failed to update product status');
      console.error(err);
    }
  };

  const handleBulkStatusChange = async (newStatus) => {
    if (selectedProducts.length === 0) {
      alert('Please select products first');
      return;
    }

    try {
      await bulkUpdateProducts(selectedProducts, { status: newStatus });
      setSelectedProducts([]);
      await loadStoreAndProducts();
      alert(`${selectedProducts.length} product(s) updated to ${newStatus}`);
    } catch (err) {
      alert('Failed to update products');
      console.error(err);
    }
  };

  const handleBulkDelete = async () => {
    if (selectedProducts.length === 0) {
      alert('Please select products first');
      return;
    }

    if (!confirm(`Delete ${selectedProducts.length} product(s)? This cannot be undone.`)) {
      return;
    }

    try {
      for (const productId of selectedProducts) {
        await deleteProduct(productId);
      }
      setSelectedProducts([]);
      await loadStoreAndProducts();
      alert(`${selectedProducts.length} product(s) deleted`);
    } catch (err) {
      alert('Failed to delete products');
      console.error(err);
    }
  };

  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
  };

  const handleSortOrderChange = (order) => {
    setSortOrder(order);
  };

  const toggleAnalytics = () => {
    setHideAnalytics(!hideAnalytics);
    setShowMoreActions(false);
  };

  const handleSaveSearch = () => {
    if (searchQuery.trim()) {
      alert(`Saved search: "${searchQuery}"`);
      setShowSearch(false);
    } else {
      alert('Please enter a search term first');
    }
  };

  const handleApplySort = () => {
    setShowSort(false);
    // Sort products based on sortBy and sortOrder
    const sorted = [...products].sort((a, b) => {
      let aVal, bVal;
      
      switch(sortBy) {
        case 'product-title':
          aVal = a.title?.toLowerCase() || '';
          bVal = b.title?.toLowerCase() || '';
          break;
        case 'created':
          aVal = new Date(a.created_at);
          bVal = new Date(b.created_at);
          break;
        case 'updated':
          aVal = new Date(a.updated_at);
          bVal = new Date(b.updated_at);
          break;
        case 'inventory':
          aVal = a.product_variants?.[0]?.inventory_quantity || 0;
          bVal = b.product_variants?.[0]?.inventory_quantity || 0;
          break;
        case 'product-type':
          aVal = a.product_type || '';
          bVal = b.product_type || '';
          break;
        case 'vendor':
          aVal = a.vendor || '';
          bVal = b.vendor || '';
          break;
        default:
          return 0;
      }

      if (sortOrder === 'newest' || sortOrder === 'oldest') {
        return sortOrder === 'newest' ? (aVal > bVal ? -1 : 1) : (aVal < bVal ? -1 : 1);
      }
      return aVal < bVal ? -1 : 1;
    });
    
    setProducts(sorted);
  };

  const filteredProducts = products.filter(product => {
    if (!searchQuery) return true;
    return product.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
           product.product_type?.toLowerCase().includes(searchQuery.toLowerCase()) ||
           product.vendor?.toLowerCase().includes(searchQuery.toLowerCase());
  });

  if (loading) {
    return (
      <div className="products-page">
        <div className="products-loading">
          <div className="loading-spinner"></div>
          <p>Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="products-page">
        <div className="products-error">
          <p>Error: {error}</p>
          <button onClick={loadStoreAndProducts} className="retry-btn">Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="products-page">
      {/* Search Overlay */}
      {showSearch && (
        <div className="search-overlay">
          <div className="search-modal">
            <div className="search-header">
              <div className="search-input-wrapper">
                <span className="search-icon">🔍</span>
                <input
                  type="text"
                  placeholder="Searching all products"
                  className="search-modal-input"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
              </div>
              <div className="search-actions">
                  <button className="search-cancel-btn" onClick={() => setShowSearch(false)}>
                    Cancel
                  </button>
                  <button className="search-save-btn" onClick={handleSaveSearch}>Save as</button>
                <button className="search-filter-btn">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M3 6h14M6 10h8M8 14h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>
            </div>
            <div className="search-results">
              {filteredProducts.length > 0 ? (
                <div className="search-results-list">
                  {filteredProducts.map(product => (
                    <div key={product.id} className="search-result-item">
                      <span>{product.title}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="search-empty">
                  <p>{searchQuery ? 'No products found' : 'Start typing to search products'}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Sort Dropdown */}
      {showSort && (
        <div className="sort-overlay" onClick={() => setShowSort(false)}>
          <div className="sort-dropdown" onClick={(e) => e.stopPropagation()}>
            <div className="sort-header">
              <span>Sort by</span>
            </div>
            <div className="sort-options">
              <label className="sort-option">
                <input
                  type="radio"
                  name="sort"
                  value="product-title"
                  checked={sortBy === 'product-title'}
                  onChange={() => handleSortChange('product-title')}
                />
                <span>Product title</span>
              </label>
              <label className="sort-option">
                <input
                  type="radio"
                  name="sort"
                  value="created"
                  checked={sortBy === 'created'}
                  onChange={() => handleSortChange('created')}
                />
                <span>Created</span>
              </label>
              <label className="sort-option">
                <input
                  type="radio"
                  name="sort"
                  value="updated"
                  checked={sortBy === 'updated'}
                  onChange={() => handleSortChange('updated')}
                />
                <span>Updated</span>
              </label>
              <label className="sort-option">
                <input
                  type="radio"
                  name="sort"
                  value="inventory"
                  checked={sortBy === 'inventory'}
                  onChange={() => handleSortChange('inventory')}
                />
                <span>Inventory</span>
              </label>
              <label className="sort-option">
                <input
                  type="radio"
                  name="sort"
                  value="product-type"
                  checked={sortBy === 'product-type'}
                  onChange={() => handleSortChange('product-type')}
                />
                <span>Product type</span>
              </label>
              <label className="sort-option">
                <input
                  type="radio"
                  name="sort"
                  value="vendor"
                  checked={sortBy === 'vendor'}
                  onChange={() => handleSortChange('vendor')}
                />
                <span>Vendor</span>
              </label>
            </div>
            <div className="sort-divider"></div>
            <div className="sort-order">
              <button 
                className={`sort-order-btn ${sortOrder === 'oldest' ? 'active' : ''}`}
                onClick={() => handleSortOrderChange('oldest')}
              >
                <span className="arrow-up">↑</span>
                <span>Oldest first</span>
              </button>
              <button 
                className={`sort-order-btn ${sortOrder === 'newest' ? 'active' : ''}`}
                onClick={() => handleSortOrderChange('newest')}
              >
                <span className="arrow-down">↓</span>
                <span>Newest first</span>
              </button>
            </div>
              <div className="sort-footer">
                <button className="sort-cancel-btn" onClick={() => setShowSort(false)}>
                  Cancel
                </button>
                <button className="sort-save-btn" onClick={handleApplySort}>Apply</button>
              </div>
          </div>
        </div>
      )}

      {/* Bulk Actions */}
      {selectedProducts.length > 0 && (
        <div className="bulk-actions-bar">
          <span>{selectedProducts.length} selected</span>
          <div className="bulk-actions-buttons">
            <button onClick={() => handleBulkStatusChange('active')} className="bulk-btn">
              Set Active
            </button>
            <button onClick={() => handleBulkStatusChange('draft')} className="bulk-btn">
              Set Draft
            </button>
            <button onClick={() => handleBulkStatusChange('archived')} className="bulk-btn">
              Archive
            </button>
            <button onClick={handleBulkDelete} className="bulk-btn bulk-delete">
              Delete
            </button>
          </div>
        </div>
      )}

      <div className="products-content">
        {!hideAnalytics && (
        <div className="products-metrics">
          <div className="metric-item time-selector">
            <button className="time-btn">
              📅 30 days
            </button>
          </div>
          <div className="metric-item">
            <div className="metric-label">Total products</div>
            <div className="metric-value">{products.length}</div>
          </div>
          <div className="metric-item">
            <div className="metric-label">Active products</div>
            <div className="metric-value">{products.filter(p => p.status === 'active').length}</div>
          </div>
          <div className="metric-item">
            <div className="metric-label">Draft products</div>
            <div className="metric-value">{products.filter(p => p.status === 'draft').length}</div>
          </div>
        </div>
        )}

        <div className="products-table-container">
          <div className="products-tabs">
            <button 
              className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
              onClick={() => setActiveTab('all')}
            >
              All ({products.length})
            </button>
            <button 
              className={`tab-btn ${activeTab === 'active' ? 'active' : ''}`}
              onClick={() => setActiveTab('active')}
            >
              Active
            </button>
            <button 
              className={`tab-btn ${activeTab === 'draft' ? 'active' : ''}`}
              onClick={() => setActiveTab('draft')}
            >
              Draft
            </button>
            <button 
              className={`tab-btn ${activeTab === 'archived' ? 'active' : ''}`}
              onClick={() => setActiveTab('archived')}
            >
              Archived
            </button>
            
            <div className="table-actions">
              <button className="icon-btn" title="Search" onClick={() => setShowSearch(true)}>
                🔍
              </button>
              <button className="icon-btn" title="Sort" onClick={() => setShowSort(true)}>
                ⇅
              </button>
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-content">
                <h3>No products yet</h3>
                <p>Start by adding your first product</p>
                <button onClick={onAddProduct} className="btn-primary">
                  Add Product
                </button>
              </div>
            </div>
          ) : (
            <div className="products-table-wrapper">
              <table className="products-table">
                <thead>
                  <tr>
                    <th className="checkbox-col">
                      <input 
                        type="checkbox" 
                        checked={selectedProducts.length === filteredProducts.length && filteredProducts.length > 0}
                        onChange={toggleSelectAll}
                      />
                    </th>
                    <th className="product-col">Product</th>
                    <th>Status</th>
                    <th>Inventory</th>
                    <th>Type</th>
                    <th>Vendor</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className={selectedProducts.includes(product.id) ? 'selected' : ''}>
                      <td className="checkbox-col">
                        <input 
                          type="checkbox" 
                          checked={selectedProducts.includes(product.id)}
                          onChange={() => toggleProductSelection(product.id)}
                        />
                      </td>
                      <td className="product-col">
                        <div className="product-info">
                          <div className="product-image">
                            {product.product_images?.[0]?.url ? (
                              <img src={product.product_images[0].url} alt={product.title} />
                            ) : (
                              <span>📦</span>
                            )}
                          </div>
                          <span className="product-name">{product.title}</span>
                        </div>
                      </td>
                      <td>
                        <select 
                          className={`status-select status-${product.status}`}
                          value={product.status}
                          onChange={(e) => handleStatusChange(product.id, e.target.value)}
                        >
                          <option value="active">Active</option>
                          <option value="draft">Draft</option>
                          <option value="archived">Archived</option>
                        </select>
                      </td>
                      <td className="inventory-col">
                        {product.product_variants?.[0]?.inventory_quantity || 0} in stock
                      </td>
                      <td className="category-col">{product.product_type || '—'}</td>
                      <td className="vendor-col">{product.vendor || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Products;
