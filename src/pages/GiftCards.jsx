import './GiftCards.css';

function GiftCards() {
  return (
    <div className="gift-cards-page">
      <div className="empty-state-content">
        <div className="empty-state-illustration">
          <svg width="180" height="180" viewBox="0 0 180 180" fill="none">
            <circle cx="90" cy="90" r="90" fill="#F9F9F9"/>
            {/* Gift Card */}
            <g className="gift-card">
              <rect x="50" y="70" width="80" height="50" rx="6" fill="url(#giftGradient)" stroke="#E1E3E5" strokeWidth="2"/>
              <defs>
                <linearGradient id="giftGradient" x1="50" y1="70" x2="130" y2="120">
                  <stop offset="0%" stopColor="#4FD1C5"/>
                  <stop offset="100%" stopColor="#38B2AC"/>
                </linearGradient>
              </defs>
              {/* Ribbon */}
              <circle cx="90" cy="80" r="8" fill="#FFD700"/>
              <path d="M90 80v40" stroke="#FFD700" strokeWidth="6"/>
              <path d="M82 75l-8-8M98 75l8-8" stroke="#FFD700" strokeWidth="3" strokeLinecap="round"/>
            </g>
          </svg>
        </div>

        <h2 className="empty-state-title">Start selling gift cards</h2>
        <p className="empty-state-description">
          Add gift card products to sell or create gift cards and send them directly to your customers.
        </p>

        <div className="button-group">
          <button className="create-btn secondary">Create gift card</button>
          <button className="create-btn">Add gift card product</button>
        </div>

        <p className="terms-text">
          By using gift cards, you agree to our <a href="#" className="terms-link">Terms of Service</a>
        </p>

        <div className="empty-state-footer">
          <a href="#" className="learn-more-link">Learn more about gift cards</a>
        </div>
      </div>
    </div>
  );
}

export default GiftCards;

