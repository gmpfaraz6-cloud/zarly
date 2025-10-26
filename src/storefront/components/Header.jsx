import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { supabase } from '../../lib/supabase';
import { debounce } from '../utils/performance';
import './Header.css';

function Header({ store, scrollY, scrollDirection }) {
  const { getItemCount, items: cartItems } = useCart();
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showCartPreview, setShowCartPreview] = useState(false);
  const [categories, setCategories] = useState([]);
  const [showCategoriesMenu, setShowCategoriesMenu] = useState(false);
  const searchInputRef = useRef(null);
  const cartItemCount = getItemCount();

  const isScrolled = scrollY > 50;

  useEffect(() => {
    loadCategories();
  }, [store]);

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  const loadCategories = async () => {
    try {
      const { data } = await supabase
        .from('collections')
        .select('id, title, handle')
        .eq('store_id', store?.id)
        .eq('published', true)
        .limit(8);
      
      setCategories(data || []);
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };

  const handleSearch = debounce(async (query) => {
    if (!query.trim() || !store?.id) {
      setSearchResults([]);
      return;
    }

    try {
      const { data } = await supabase
        .from('products')
        .select('id, title, handle, price, product_images(url)')
        .eq('store_id', store.id)
        .eq('status', 'active')
        .ilike('title', `%${query}%`)
        .limit(5);
      
      setSearchResults(data || []);
    } catch (error) {
      console.error('Error searching products:', error);
    }
  }, 300);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    handleSearch(value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
      setSearchQuery('');
      setSearchResults([]);
    }
  };

  const closeSearch = () => {
    setSearchOpen(false);
    setSearchQuery('');
    setSearchResults([]);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className={`storefront-header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="header-container">
          <div className="header-content">
            {/* Mobile Menu Button */}
            <button 
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path 
                  d={mobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M3 6h18M3 12h18M3 18h18'} 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round"
                />
              </svg>
            </button>

            {/* Logo */}
            <Link to="/" className="store-logo">
              <h1>{store?.name || 'Store'}</h1>
            </Link>

            {/* Desktop Navigation */}
            <nav className="main-nav desktop-nav">
              <div 
                className="nav-item-with-dropdown"
                onMouseEnter={() => setShowCategoriesMenu(true)}
                onMouseLeave={() => setShowCategoriesMenu(false)}
              >
                <Link to="/products" className="nav-link">
                  Products
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </Link>
                
                {/* Mega Menu Dropdown */}
                {showCategoriesMenu && categories.length > 0 && (
                  <div className="mega-menu">
                    <div className="mega-menu-content">
                      <div className="mega-menu-section">
                        <h3>Shop by Category</h3>
                        <div className="categories-grid">
                          {categories.map((category) => (
                            <Link
                              key={category.id}
                              to={`/collections/${category.handle}`}
                              className="category-link"
                              onClick={() => setShowCategoriesMenu(false)}
                            >
                              {category.title}
                            </Link>
                          ))}
                        </div>
                      </div>
                      <div className="mega-menu-section featured">
                        <h3>Featured</h3>
                        <Link to="/products?filter=new" className="featured-link">
                          New Arrivals
                        </Link>
                        <Link to="/products?filter=bestsellers" className="featured-link">
                          Best Sellers
                        </Link>
                        <Link to="/products?filter=sale" className="featured-link">
                          On Sale
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <Link to="/collections/all" className="nav-link">Collections</Link>
              <Link to="/about" className="nav-link">About</Link>
              <Link to="/contact" className="nav-link">Contact</Link>
            </nav>

            {/* Right Actions */}
            <div className="header-actions">
              <button 
                className="header-action-btn"
                onClick={() => setSearchOpen(!searchOpen)}
                aria-label="Search"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="2"/>
                  <path d="M14 14l4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>

              <Link to="/wishlist" className="header-action-btn" aria-label="Wishlist">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path 
                    d="M17.5 4.167a4.167 4.167 0 00-5.889 0L10 5.778 8.389 4.167a4.167 4.167 0 10-5.889 5.889l1.61 1.61L10 17.556l5.889-5.889 1.611-1.61a4.167 4.167 0 000-5.89z" 
                    stroke="currentColor" 
                    strokeWidth="1.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>

              <Link to="/account" className="header-action-btn" aria-label="Account">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
                  <path d="M3 18c0-3.5 3-6 7-6s7 2.5 7 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </Link>

              <div 
                className="cart-wrapper"
                onMouseEnter={() => setShowCartPreview(true)}
                onMouseLeave={() => setShowCartPreview(false)}
              >
                <Link to="/cart" className="header-action-btn cart-btn" aria-label="Cart">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M2 2h2l1.6 9.6c.1.6.6 1 1.2 1h8.4c.6 0 1.1-.4 1.2-1L18 6H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="8" cy="18" r="1" fill="currentColor"/>
                    <circle cx="16" cy="18" r="1" fill="currentColor"/>
                  </svg>
                  {cartItemCount > 0 && (
                    <span className="cart-count">{cartItemCount}</span>
                  )}
                </Link>

                {/* Cart Preview Dropdown */}
                {showCartPreview && cartItemCount > 0 && (
                  <div className="cart-preview-dropdown">
                    <div className="cart-preview-items">
                      {cartItems.slice(0, 3).map((item) => (
                        <div key={item.id} className="cart-preview-item">
                          <div className="cart-preview-item-image">
                            {item.image ? (
                              <img src={item.image} alt={item.title} />
                            ) : (
                              <div className="no-image">📦</div>
                            )}
                          </div>
                          <div className="cart-preview-item-details">
                            <div className="cart-preview-item-title">{item.title}</div>
                            <div className="cart-preview-item-price">
                              ${parseFloat(item.price).toFixed(2)} × {item.quantity}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    {cartItems.length > 3 && (
                      <div className="cart-preview-more">
                        +{cartItems.length - 3} more items
                      </div>
                    )}
                    <div className="cart-preview-footer">
                      <Link to="/cart" className="btn-view-cart">
                        View Cart
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Search Overlay */}
      {searchOpen && (
        <div className="search-overlay" onClick={closeSearch}>
          <div className="search-modal" onClick={(e) => e.stopPropagation()}>
            <div className="search-modal-header">
              <form onSubmit={handleSearchSubmit} className="search-form">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="2"/>
                  <path d="M14 14l4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <input 
                  ref={searchInputRef}
                  type="text" 
                  placeholder="Search products..." 
                  className="search-modal-input"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                <button 
                  type="button"
                  className="search-close-btn"
                  onClick={closeSearch}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>
              </form>
            </div>
            
            <div className="search-modal-body">
              {searchResults.length > 0 ? (
                <div className="search-results">
                  {searchResults.map((product) => (
                    <Link
                      key={product.id}
                      to={`/products/${product.handle}`}
                      className="search-result-item"
                      onClick={closeSearch}
                    >
                      <div className="search-result-image">
                        {product.product_images?.[0]?.url ? (
                          <img src={product.product_images[0].url} alt={product.title} />
                        ) : (
                          <div className="no-image">📦</div>
                        )}
                      </div>
                      <div className="search-result-details">
                        <div className="search-result-title">{product.title}</div>
                        <div className="search-result-price">${parseFloat(product.price).toFixed(2)}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : searchQuery.length > 0 ? (
                <div className="search-empty">No products found</div>
              ) : (
                <div className="search-suggestions">
                  <h3>Popular Searches</h3>
                  <div className="search-suggestion-tags">
                    <button onClick={() => setSearchQuery('headphones')}>Headphones</button>
                    <button onClick={() => setSearchQuery('laptop')}>Laptop</button>
                    <button onClick={() => setSearchQuery('phone')}>Phone</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={closeMobileMenu}>
          <div className="mobile-menu-panel" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-menu-header">
              <h2>Menu</h2>
              <button onClick={closeMobileMenu} className="mobile-menu-close">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
            <nav className="mobile-menu-nav">
              <Link to="/" className="mobile-nav-link" onClick={closeMobileMenu}>Home</Link>
              <Link to="/products" className="mobile-nav-link" onClick={closeMobileMenu}>Products</Link>
              <Link to="/collections/all" className="mobile-nav-link" onClick={closeMobileMenu}>Collections</Link>
              <Link to="/about" className="mobile-nav-link" onClick={closeMobileMenu}>About</Link>
              <Link to="/contact" className="mobile-nav-link" onClick=

{closeMobileMenu}>Contact</Link>
              
              <div className="mobile-menu-divider"></div>
              
              {categories.length > 0 && (
                <div className="mobile-menu-section">
                  <h3>Categories</h3>
                  {categories.map((category) => (
                    <Link
                      key={category.id}
                      to={`/collections/${category.handle}`}
                      className="mobile-nav-link secondary"
                      onClick={closeMobileMenu}
                    >
                      {category.title}
                    </Link>
                  ))}
                </div>
              )}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
