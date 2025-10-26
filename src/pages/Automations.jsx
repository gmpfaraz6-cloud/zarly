import './Automations.css';

function Automations() {
  return (
    <div className="automations-page">
      <div className="automations-content">
        {/* Date Range */}
        <div className="date-range-filters">
          <button className="date-range-btn">📅 Sep 25–Oct 24, 2025</button>
          <button className="date-range-btn">📊 Aug 26–Sep 24, 2025</button>
        </div>

        {/* Metrics */}
        <div className="automations-metrics">
          <div className="auto-metric-card">
            <div className="auto-metric-label">Reach</div>
            <div className="auto-metric-value">0 <span className="metric-change">—</span></div>
          </div>
          <div className="auto-metric-card">
            <div className="auto-metric-label">Sessions</div>
            <div className="auto-metric-value">0 <span className="metric-change">—</span></div>
          </div>
          <div className="auto-metric-card">
            <div className="auto-metric-label">Orders</div>
            <div className="auto-metric-value">0 <span className="metric-change">—</span></div>
            <div className="metric-bar">
              <div className="bar-segment"></div>
            </div>
          </div>
          <div className="auto-metric-card">
            <div className="auto-metric-label">Sales</div>
            <div className="auto-metric-value">SAR 0 <span className="metric-change">—</span></div>
            <div className="metric-bar">
              <div className="bar-segment"></div>
            </div>
          </div>
          <div className="auto-metric-card">
            <div className="auto-metric-label">Average order value</div>
            <div className="auto-metric-value">SAR 0 <span className="metric-change">—</span></div>
          </div>
        </div>

        {/* Tabs and Table */}
        <div className="automations-table-section">
          <div className="automations-tabs">
            <button className="auto-tab active">All</button>
          </div>

          <div className="automations-table-wrapper">
            <div className="table-actions">
              <button className="table-action-btn">🔍</button>
              <button className="table-action-btn">☰</button>
              <button className="table-action-btn">↕️</button>
            </div>

            <table className="automations-table">
              <thead>
                <tr>
                  <th>Marketing automation</th>
                  <th>Status</th>
                  <th>Reach</th>
                  <th>Sessions</th>
                  <th>Orders</th>
                  <th>Conversion rate</th>
                  <th>Sales</th>
                  <th>Average order value</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Recover abandoned checkout</td>
                  <td>
                    <span className="status-badge active">Active</span>
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>
                    <button className="more-btn">⋯</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Flow Section */}
        <div className="flow-section">
          <h3 className="flow-title">Manage automations in Flow</h3>
          <p className="flow-description">
            View, edit, import, export, and duplicate automations by installing Flow.
          </p>
          <div className="flow-card">
            <div className="flow-icon">
              <div className="flow-logo">⚡</div>
              <span className="flow-badge">Shopify Flow</span>
            </div>
            <button className="install-btn">⬇️ Install</button>
          </div>
        </div>

        {/* Templates Section */}
        <div className="templates-section">
          <div className="templates-progress">
            <div className="progress-icon">↻</div>
            1 of 5 tasks complete
          </div>

          <h3 className="templates-title">Start with these essential templates</h3>
          <p className="templates-subtitle">
            Automate customer communications to increase engagement, sales, and return on your marketing spend.
          </p>

          <div className="templates-list">
            <div className="template-item completed">
              <div className="template-check">✓</div>
              <div className="template-content">
                <h4 className="template-title">Recover abandoned checkout</h4>
              </div>
            </div>

            <div className="template-item">
              <div className="template-check"></div>
              <div className="template-content">
                <h4 className="template-title">Recover abandoned cart</h4>
                <p className="template-description">
                  Convert motivated customers who have added products to their cart but haven't proceeded to checkout. Send them an email with a link to their abandoned cart making it easier to come back and complete their purchase.
                </p>
                <button className="preview-btn">Preview template</button>
              </div>
              <div className="template-illustration">
                <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
                  <rect x="20" y="30" width="60" height="40" rx="4" fill="#1A1A1A"/>
                  <circle cx="45" cy="45" r="8" fill="#FF6B6B"/>
                  <path d="M40 45L43 48L50 41" stroke="white" strokeWidth="2" fill="none"/>
                  <rect x="35" y="60" width="30" height="3" rx="1.5" fill="#E0E0E0"/>
                  <rect x="30" y="25" width="25" height="3" rx="1.5" fill="#FFA500"/>
                </svg>
              </div>
            </div>

            <div className="template-item">
              <div className="template-check"></div>
              <div className="template-content">
                <h4 className="template-title">Convert abandoned product browse</h4>
              </div>
            </div>

            <div className="template-item">
              <div className="template-check"></div>
              <div className="template-content">
                <h4 className="template-title">Welcome new subscribers with a discount email</h4>
              </div>
            </div>

            <div className="template-item">
              <div className="template-check"></div>
              <div className="template-content">
                <h4 className="template-title">Thank customers after they purchase</h4>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="automations-footer">
          Learn more about <a href="#">automations</a>
        </div>
      </div>
    </div>
  );
}

export default Automations;

