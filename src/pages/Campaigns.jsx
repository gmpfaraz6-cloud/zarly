import './Campaigns.css';

function Campaigns() {
  return (
    <div className="campaigns-page">
      <div className="campaigns-content">
        <div className="campaigns-badge">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 2L10 6L14 7L11 10L12 14L8 12L4 14L5 10L2 7L6 6L8 2Z" fill="currentColor"/>
          </svg>
          2 unassigned activities
        </div>

        <div className="campaigns-tabs">
          <button className="tab-btn active">All</button>
          <button className="tab-btn plus-tab">+</button>
        </div>

        <div className="campaign-tracking-card">
          <div className="tracking-card-content">
            <h2 className="tracking-title">Centralize your campaign tracking</h2>
            <p className="tracking-description">
              Create campaigns to evaluate how marketing initiatives drive business goals. Capture online and offline touchpoints, add campaign activities from multiple marketing channels, and monitor results.
            </p>
            <div className="tracking-actions">
              <button className="create-btn" onClick={() => alert('Create campaign: This would open a form to create and track a new marketing campaign.')}>Create campaign</button>
              <button className="learn-more-btn" onClick={() => alert('Learn more: This would open documentation about campaign tracking and marketing analytics.')}>Learn more</button>
            </div>
          </div>
          <div className="tracking-illustration">
            <svg width="250" height="200" viewBox="0 0 250 200" fill="none">
              <rect x="50" y="40" width="150" height="120" rx="12" fill="#E0F2FE"/>
              <circle cx="85" cy="80" r="20" fill="#3B82F6"/>
              <rect x="115" y="65" width="70" height="10" rx="5" fill="#60A5FA"/>
              <rect x="115" y="85" width="50" height="8" rx="4" fill="#93C5FD"/>
              <rect x="60" y="110" width="130" height="8" rx="4" fill="#BFDBFE"/>
              <rect x="60" y="125" width="100" height="8" rx="4" fill="#BFDBFE"/>
              <circle cx="165" cy="95" r="12" fill="#FBBF24" opacity="0.6"/>
              <rect x="135" y="145" width="50" height="6" rx="3" fill="#93C5FD"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Campaigns;

