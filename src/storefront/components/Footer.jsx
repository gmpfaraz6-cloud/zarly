import { Link } from 'react-router-dom';
import './Footer.css';

function Footer({ store }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="storefront-footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">Shop</h3>
            <ul className="footer-links">
              <li><Link to="/products">All Products</Link></li>
              <li><Link to="/collections/all">Collections</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Information</h3>
            <ul className="footer-links">
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/shipping">Shipping Policy</Link></li>
              <li><Link to="/returns">Returns</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Customer Service</h3>
            <ul className="footer-links">
              <li><Link to="/account">My Account</Link></li>
              <li><Link to="/track-order">Track Order</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Contact</h3>
            <ul className="footer-contact">
              {store.email && <li>Email: {store.email}</li>}
              {store.phone && <li>Phone: {store.phone}</li>}
              {store.address_line1 && (
                <li>
                  {store.address_line1}
                  {store.city && `, ${store.city}`}
                  {store.state && `, ${store.state}`}
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} {store.name}. All rights reserved.</p>
          <div className="footer-social">
            {/* Add social media links here */}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

