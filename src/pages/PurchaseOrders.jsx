import './PurchaseOrders.css';

function PurchaseOrders() {
  return (
    <div className="purchase-orders-page">
      <div className="empty-state-content">
        <div className="empty-state-illustration">
          <svg width="180" height="180" viewBox="0 0 180 180" fill="none">
            <circle cx="90" cy="90" r="90" fill="#F9F9F9"/>
            <g className="document">
              <rect x="50" y="40" width="50" height="70" rx="4" fill="white" stroke="#E1E3E5" strokeWidth="2"/>
              <rect x="58" y="50" width="20" height="4" rx="2" fill="#00C896"/>
              <rect x="58" y="60" width="34" height="3" rx="1.5" fill="#E1E3E5"/>
              <rect x="58" y="68" width="34" height="3" rx="1.5" fill="#E1E3E5"/>
              <rect x="58" y="76" width="28" height="3" rx="1.5" fill="#E1E3E5"/>
            </g>
            <g className="package">
              <rect x="80" y="65" width="50" height="50" rx="4" fill="#FF9F40" opacity="0.9"/>
              <rect x="100" y="65" width="10" height="50" fill="#FF8C1A"/>
              <path d="M80 85h50" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="105" cy="85" r="3" fill="white"/>
            </g>
          </svg>
        </div>

        <h2 className="empty-state-title">Manage your purchase orders</h2>
        <p className="empty-state-description">
          Track and receive inventory ordered from suppliers.
        </p>

        <button className="create-btn">Create purchase order</button>

        <div className="empty-state-footer">
          <a href="#" className="learn-more-link">Learn more about purchase orders</a>
        </div>
      </div>
    </div>
  );
}

export default PurchaseOrders;

