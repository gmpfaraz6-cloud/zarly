import './Customers.css';

function Customers() {
  return (
    <div className="customers-page">
      <div className="customers-content">
        <div className="customers-empty-state">
          <div className="empty-state-illustration">
            <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
              <circle cx="100" cy="100" r="100" fill="#F9FAFB"/>
              {/* Customer card */}
              <g className="customer-card">
                <rect x="50" y="50" width="100" height="100" rx="8" fill="white" stroke="#E5E7EB" strokeWidth="2"/>
                {/* Avatar */}
                <circle cx="100" cy="80" r="18" fill="#DBEAFE"/>
                <path d="M100 74c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6z" fill="#60A5FA"/>
                {/* Lines */}
                <rect x="70" y="105" width="60" height="6" rx="3" fill="#E5E7EB"/>
                <rect x="80" y="118" width="40" height="4" rx="2" fill="#F3F4F6"/>
                <rect x="75" y="128" width="50" height="4" rx="2" fill="#F3F4F6"/>
              </g>
            </svg>
          </div>
          
          <h2 className="empty-state-title">Everything customers-related in one place</h2>
          <p className="empty-state-description">
            Manage customer details, see customer order history, and group customers into segments.
          </p>
          
          <div className="empty-state-actions">
            <button className="primary-btn" onClick={() => alert('Add customer: This would open a form to manually add a customer with contact information.')}>Add customer</button>
            <button className="secondary-btn" onClick={() => alert('Import customers: This would open a file picker to upload a CSV file with customer data.')}>Import customers</button>
          </div>
        </div>
        
        <div className="customers-info-section">
          <h3 className="info-section-title">Get customers with apps</h3>
          <p className="info-section-description">
            Grow your customer list by adding a lead capture form to your store and marketing.
          </p>
          <button className="info-section-btn" onClick={() => alert('See app recommendations: This would show Shopify apps that help you collect customer information.')}>See app recommendations</button>
        </div>
        
        <div className="customers-footer">
          <a href="#" className="learn-more-link">Learn more about customers</a>
        </div>
      </div>
    </div>
  );
}

export default Customers;

