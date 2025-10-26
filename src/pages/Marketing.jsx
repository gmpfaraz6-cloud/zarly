import './Marketing.css';

function Marketing() {
  return (
    <div className="marketing-page">
      <div className="marketing-content">
        {/* Info Banner */}
        <div className="info-banner">
          <div className="info-icon">ℹ️</div>
          <div className="info-text">
            Creation of Shopify Email activities is now managed from the app. <a href="#">Open Email</a>
          </div>
          <button className="close-banner">✕</button>
        </div>

        {/* Date Filter */}
        <div className="date-filter-bar">
          <button className="date-btn">📅 Last 30 days</button>
          <button className="comparison-btn">No comparison</button>
        </div>

        {/* Metrics Cards */}
        <div className="metrics-row">
          <div className="metric-card">
            <div className="metric-label">Sessions</div>
            <div className="metric-value">
              66
              <svg width="60" height="30" viewBox="0 0 60 30" className="mini-chart">
                <polyline points="0,25 10,20 20,22 30,15 40,18 50,10 60,12" fill="none" stroke="#008060" strokeWidth="2"/>
              </svg>
            </div>
          </div>
          <div className="metric-card">
            <div className="metric-label">Sales attributed to marketing</div>
            <div className="metric-value">$AR 0</div>
          </div>
          <div className="metric-card">
            <div className="metric-label">Orders attributed to marketing</div>
            <div className="metric-value">0</div>
          </div>
          <div className="metric-card">
            <div className="metric-label">Conversion rate</div>
            <div className="metric-value">0%</div>
          </div>
          <div className="metric-card">
            <div className="metric-label">AOV attribution</div>
            <div className="metric-value">$AR 0</div>
          </div>
        </div>

        {/* Marketing Channels */}
        <div className="marketing-section">
          <div className="section-header">
            <h2 className="section-title">Top marketing channels</h2>
            <a href="#" className="view-report-link">View report</a>
          </div>

          <div className="info-notice">
            <span className="info-icon-small">ℹ️</span>
            Cost, click, and impression metrics are now available for supported marketing apps. <a href="#">Learn more</a>
            <button className="close-notice">✕</button>
          </div>

          <div className="channels-table-container">
            <table className="channels-table">
              <thead>
                <tr>
                  <th>Channel</th>
                  <th>Type</th>
                  <th>Sessions</th>
                  <th>Sales</th>
                  <th>Orders</th>
                  <th>Conversion rate</th>
                  <th>ROAS</th>
                  <th>CPA</th>
                  <th>CTR</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div className="channel-name">
                      <span className="channel-icon">🏪</span>
                      Direct
                    </div>
                  </td>
                  <td>direct</td>
                  <td>64</td>
                  <td>SAR 0.00</td>
                  <td>0</td>
                  <td>0%</td>
                  <td>—</td>
                  <td>—</td>
                  <td>—</td>
                </tr>
                <tr>
                  <td>
                    <div className="channel-name">
                      <span className="channel-icon">🔍</span>
                      Google Search
                    </div>
                  </td>
                  <td>organic</td>
                  <td>2</td>
                  <td>SAR 0.00</td>
                  <td>0</td>
                  <td>0%</td>
                  <td>—</td>
                  <td>—</td>
                  <td>—</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Campaign Tracking Card */}
        <div className="campaign-card">
          <div className="campaign-card-content">
            <h3 className="campaign-card-title">Centralize your campaign tracking</h3>
            <p className="campaign-card-description">
              Create campaigns to evaluate how marketing initiatives drive business goals. Capture online and offline touchpoints, add campaign activities from multiple marketing channels, and monitor results.
            </p>
            <button className="create-campaign-btn" onClick={() => alert('Create campaign: This would open a form to create a new marketing campaign to track your marketing efforts.')}>Create campaign</button>
          </div>
          <div className="campaign-card-illustration">
            <svg width="200" height="150" viewBox="0 0 200 150" fill="none">
              <rect x="40" y="30" width="120" height="90" rx="8" fill="#E0F2FE"/>
              <circle cx="70" cy="60" r="15" fill="#3B82F6"/>
              <rect x="95" y="50" width="50" height="8" rx="4" fill="#60A5FA"/>
              <rect x="95" y="65" width="35" height="6" rx="3" fill="#93C5FD"/>
              <rect x="50" y="85" width="100" height="6" rx="3" fill="#BFDBFE"/>
              <rect x="50" y="97" width="80" height="6" rx="3" fill="#BFDBFE"/>
              <circle cx="130" cy="75" r="8" fill="#FBBF24" opacity="0.6"/>
            </svg>
          </div>
        </div>

        {/* Marketing App Activities */}
        <div className="marketing-section">
          <div className="section-header">
            <h2 className="section-title">Marketing app activities</h2>
            <a href="#" className="explore-apps-link">Explore apps</a>
          </div>

          <div className="activities-table-container">
            <table className="activities-table">
              <thead>
                <tr>
                  <th>App</th>
                  <th>Activities in progress</th>
                  <th>Last activity</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div className="app-name">
                      <div className="app-icon">📧</div>
                      Email
                    </div>
                  </td>
                  <td>
                    <span className="status-badge sending">Sending (1)</span>
                  </td>
                  <td>Aug 23, 2025</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="marketing-footer">
          Learn more about <a href="#">marketing campaigns</a> and how <a href="#">Shopify syncs report data.</a>
        </div>
      </div>
    </div>
  );
}

export default Marketing;

