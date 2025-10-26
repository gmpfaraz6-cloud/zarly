import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Header.css';

function Header({ store }) {
  const { getItemCount } = useCart();
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const itemCount = getItemCount();

  return (
    <header className="storefront-header">
      <div className="header-container">
        <div className="header-content">
          {/* Mobile Menu Button */}
          <button 
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M2 4h16M2 10h16M2 16h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>

          {/* Logo */}
          <Link to="/" className="store-logo">
            <h1>{store.name || 'Store'}</h1>
          </Link>

          {/* Main Navigation */}
          <nav className={`main-nav ${mobileMenuOpen ? 'open' : ''}`}>
            <Link to="/products" className="nav-link">Products</Link>
            <Link to="/collections/all" className="nav-link">Collections</Link>
            <Link to="/about" className="nav-link">About</Link>
          </nav>

          {/* Right Actions */}
          <div className="header-actions">
            <button 
              className="header-action-btn"
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="2"/>
                <path d="M14 14l4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>

            <Link to="/account" className="header-action-btn">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
                <path d="M3 18c0-3.5 3-6 7-6s7 2.5 7 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </Link>

            <Link to="/cart" className="header-action-btn cart-btn">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M2 2h2l1.6 9.6c.1.6.6 1 1.2 1h8.4c.6 0 1.1-.4 1.2-1L18 6H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="8" cy="18" r="1" fill="currentColor"/>
                <circle cx="16" cy="18" r="1" fill="currentColor"/>
              </svg>
              {itemCount > 0 && (
                <span className="cart-count">{itemCount}</span>
              )}
            </Link>
          </div>
        </div>

        {/* Search Bar */}
        {searchOpen && (
          <div className="search-bar">
            <input 
              type="text" 
              placeholder="Search products..." 
              className="search-input"
              autoFocus
            />
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;

