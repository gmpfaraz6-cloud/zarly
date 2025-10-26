import './Catalogs.css';

function Catalogs() {
  return (
    <div className="catalogs-page">
      <div className="catalogs-content">
        <div className="catalogs-empty">
          <div className="catalogs-illustration">
            <svg width="180" height="180" viewBox="0 0 180 180" fill="none">
              <circle cx="90" cy="90" r="90" fill="#F9FAFB"/>
              <rect x="60" y="50" width="60" height="80" rx="8" fill="white" stroke="#E5E7EB" strokeWidth="2"/>
              <circle cx="75" cy="70" r="8" fill="#60A5FA"/>
              <rect x="88" y="65" width="25" height="4" rx="2" fill="#E5E7EB"/>
              <rect x="88" y="73" width="20" height="3" rx="1.5" fill="#E5E7EB"/>
              <line x1="65" y1="85" x2="115" y2="85" stroke="#E5E7EB" strokeWidth="2"/>
              <rect x="65" y="95" width="50" height="4" rx="2" fill="#E5E7EB"/>
              <rect x="65" y="105" width="40" height="4" rx="2" fill="#E5E7EB"/>
              <rect x="65" y="115" width="45" height="4" rx="2" fill="#E5E7EB"/>
              <circle cx="110" cy="60" r="4" fill="#34D399"/>
            </svg>
          </div>

          <h2 className="catalogs-empty-title">Personalize buying with catalogs</h2>
          <p className="catalogs-empty-description">
            Create custom product and pricing offerings for your customers with catalogs.
          </p>

          <button className="catalogs-create-btn" onClick={() => alert('Create catalog: This would open a form to create a custom product catalog with specific pricing for different customer groups.')}>Create catalog</button>

          <div className="catalogs-footer-link">
            Learn more about <a href="#">catalogs</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Catalogs;

