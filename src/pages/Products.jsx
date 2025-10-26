import { useState } from 'react';
import './Products.css';

function Products({ onAddProduct }) {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSort, setShowSort] = useState(false);
  const [sortBy, setSortBy] = useState('created');
  const [sortOrder, setSortOrder] = useState('newest');
  const [showMoreActions, setShowMoreActions] = useState(false);
  const [hideAnalytics, setHideAnalytics] = useState(false);

  const products = [
    { id: 1, name: 'Nano Spray Disinfectant Mist Gun', image: '🔫', status: 'Active', inventory: '100 in stock', category: 'Household Disinfectants', channels: 2 },
    { id: 2, name: 'Electric Clothes Drying Machine', image: '👕', status: 'Active', inventory: '100 in stock', category: 'Dryers', channels: 2 },
    { id: 3, name: 'Curling Straightener', image: '💇', status: 'Active', inventory: '100 in stock', category: 'Hair Straighteners', channels: 2 },
    { id: 4, name: 'Baby Foldable Backpack', image: '🎒', status: 'Active', inventory: '88 in stock', category: 'Diaper Bags', channels: 2 },
    { id: 5, name: 'Footbath Massage Bucket', image: '🦶', status: 'Active', inventory: '99 in stock', category: 'Electric Massagers', channels: 2 },
    { id: 6, name: 'Baby Nail Trimmer', image: '💅', status: 'Active', inventory: '100 in stock', category: 'Baby Health & Grooming Kits', channels: 2 },
    { id: 7, name: 'Auto Rebound Abs Wheel', image: '⚙️', status: 'Active', inventory: '99 in stock', category: 'Ab Wheels', channels: 2 },
    { id: 8, name: 'Portable Juicer Bottle', image: '🧃', status: 'Active', inventory: '100 in stock', category: 'Food Blenders', channels: 2 },
    { id: 9, name: 'Astronaut Projector 40.00', image: '👨‍🚀', status: 'Active', inventory: '889 in stock', category: 'Projectors', channels: 2 },
    { id: 10, name: 'Inflatable Bubble Ball', image: '⚽', status: 'Active', inventory: '99 in stock', category: 'Beach Balls', channels: 2 },
  ];

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

  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
  };

  const handleSortOrderChange = (order) => {
    setSortOrder(order);
    console.log('Sort order:', order);
  };

  const toggleAnalytics = () => {
    setHideAnalytics(!hideAnalytics);
    setShowMoreActions(false);
    console.log('Analytics bar:', hideAnalytics ? 'shown' : 'hidden');
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
    alert(`Sorted by: ${sortBy}, Order: ${sortOrder}`);
  };

  const handleCreateEmailCampaign = () => {
    alert('Create email campaign: This would open the marketing section to create a campaign for these products.');
    setShowMoreActions(false);
  };

  const handleViewReviews = () => {
    alert('View reviews: This would show all product reviews.');
    setShowMoreActions(false);
  };

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
              <div className="search-empty">
                <p>Start typing to search products</p>
              </div>
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
                  value="publishing-error"
                  checked={sortBy === 'publishing-error'}
                  onChange={() => handleSortChange('publishing-error')}
                />
                <span>Publishing error</span>
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

      <div className="products-content">
        {!hideAnalytics && (
        <div className="products-metrics">
          <div className="metric-item time-selector">
            <button className="time-btn">
              📅 30 days
            </button>
          </div>
          <div className="metric-item">
            <div className="metric-label">Average sell-through rate</div>
            <div className="metric-value">0% <span className="metric-trend">—</span></div>
          </div>
          <div className="metric-item">
            <div className="metric-label">Products by days of inventory remaining</div>
            <div className="metric-value-text">No data</div>
          </div>
          <div className="metric-item">
            <div className="metric-label">ABC product analysis</div>
            <div className="metric-placeholder"></div>
          </div>
        </div>
        )}

        <div className="products-table-container">
          <div className="products-tabs">
            <button 
              className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
              onClick={() => setActiveTab('all')}
            >
              All
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
            <button className="tab-btn add-tab">+</button>
            
            <div className="table-actions">
              <button className="icon-btn" title="Search" onClick={() => setShowSearch(true)}>
                🔍
              </button>
              <button className="icon-btn" title="Filter">
                ☰
              </button>
              <button className="icon-btn" title="Sort" onClick={() => setShowSort(true)}>
                ⇅
              </button>
            </div>
          </div>

          <div className="products-table-wrapper">
            <table className="products-table">
              <thead>
                <tr>
                  <th className="checkbox-col">
                    <input 
                      type="checkbox" 
                      checked={selectedProducts.length === products.length}
                      onChange={toggleSelectAll}
                    />
                  </th>
                  <th className="product-col">Product</th>
                  <th>Status</th>
                  <th>Inventory</th>
                  <th>Category</th>
                  <th className="channels-col">Channels</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
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
                        <div className="product-image">{product.image}</div>
                        <span className="product-name">{product.name}</span>
                      </div>
                    </td>
                    <td>
                      <span className="status-badge active">{product.status}</span>
                    </td>
                    <td className="inventory-col">{product.inventory}</td>
                    <td className="category-col">{product.category}</td>
                    <td className="channels-col">{product.channels}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;

