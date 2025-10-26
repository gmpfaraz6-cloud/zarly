import './AnalyticsPage.css';

function AnalyticsPage() {
  return (
    <div className="analytics-main-page">
      <div className="analytics-main-content">
        <div className="analytics-filters">
          <button className="analytics-filter-btn">📅 Today</button>
          <button className="analytics-filter-btn">📅 Oct 24, 2025</button>
          <button className="analytics-filter-btn">💰 PKR Rs</button>
        </div>

        {/* Top Metrics */}
        <div className="analytics-metrics-grid">
          <div className="analytics-metric-card">
            <div className="metric-label">Gross sales</div>
            <div className="metric-value">PKR 0 <span className="metric-trend">—</span></div>
            <div className="metric-chart">
              <svg width="100%" height="40" viewBox="0 0 200 40">
                <line x1="0" y1="38" x2="200" y2="38" stroke="#60A5FA" strokeWidth="2"/>
              </svg>
            </div>
          </div>

          <div className="analytics-metric-card">
            <div className="metric-label">Returning customer rate</div>
            <div className="metric-value">0% <span className="metric-trend">—</span></div>
            <div className="metric-chart">
              <svg width="100%" height="40" viewBox="0 0 200 40">
                <line x1="0" y1="38" x2="200" y2="38" stroke="#60A5FA" strokeWidth="2"/>
              </svg>
            </div>
          </div>

          <div className="analytics-metric-card">
            <div className="metric-label">Orders fulfilled</div>
            <div className="metric-value">0 <span className="metric-trend">—</span></div>
            <div className="metric-chart">
              <svg width="100%" height="40" viewBox="0 0 200 40">
                <line x1="0" y1="38" x2="200" y2="38" stroke="#60A5FA" strokeWidth="2"/>
              </svg>
            </div>
          </div>

          <div className="analytics-metric-card">
            <div className="metric-label">Orders</div>
            <div className="metric-value">0 <span className="metric-trend">—</span></div>
            <div className="metric-chart">
              <svg width="100%" height="40" viewBox="0 0 200 40">
                <line x1="0" y1="38" x2="200" y2="38" stroke="#60A5FA" strokeWidth="2"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Main Chart */}
        <div className="analytics-main-chart">
          <h3 className="chart-title">Total sales over time</h3>
          <div className="chart-subtitle">PKR 0 <span className="chart-subtitle-note">—</span></div>
          <div className="chart-subtitle-detail">PKR 10</div>
          
          <div className="main-chart-area">
            <svg width="100%" height="300" viewBox="0 0 1000 300">
              {/* Grid lines */}
              <line x1="0" y1="60" x2="1000" y2="60" stroke="#E5E7EB" strokeWidth="1"/>
              <line x1="0" y1="120" x2="1000" y2="120" stroke="#E5E7EB" strokeWidth="1"/>
              <line x1="0" y1="180" x2="1000" y2="180" stroke="#E5E7EB" strokeWidth="1"/>
              <line x1="0" y1="240" x2="1000" y2="240" stroke="#E5E7EB" strokeWidth="1"/>
              
              {/* Flat line */}
              <line x1="0" y1="280" x2="1000" y2="280" stroke="#60A5FA" strokeWidth="2"/>
            </svg>
          </div>

          <div className="chart-legend">
            <div className="legend-item">
              <span className="legend-dot" style={{background: '#60A5FA'}}></span>
              <span>Oct 25, 2025</span>
            </div>
            <div className="legend-item">
              <span className="legend-dot" style={{background: '#93C5FD'}}></span>
              <span>Oct 24, 2025</span>
            </div>
          </div>
        </div>

        {/* Additional sections */}
        <div className="analytics-grid-sections">
          <div className="analytics-section-card">
            <h4 className="section-card-title">Total sales breakdown</h4>
            <div className="breakdown-list">
              <div className="breakdown-item">
                <a href="#" className="breakdown-link">Gross sales</a>
                <span className="breakdown-value">PKR 0.00 <span className="breakdown-trend">—</span></span>
              </div>
              <div className="breakdown-item">
                <a href="#" className="breakdown-link">Discounts</a>
                <span className="breakdown-value">PKR 0.00 <span className="breakdown-trend">—</span></span>
              </div>
              <div className="breakdown-item">
                <a href="#" className="breakdown-link">Returns</a>
                <span className="breakdown-value">PKR 0.00 <span className="breakdown-trend">—</span></span>
              </div>
              <div className="breakdown-item">
                <a href="#" className="breakdown-link">Net sales</a>
                <span className="breakdown-value">PKR 0.00 <span className="breakdown-trend">—</span></span>
              </div>
              <div className="breakdown-item">
                <a href="#" className="breakdown-link">Shipping charges</a>
                <span className="breakdown-value">PKR 0.00 <span className="breakdown-trend">—</span></span>
              </div>
              <div className="breakdown-item">
                <a href="#" className="breakdown-link">Return fees</a>
                <span className="breakdown-value">PKR 0.00 <span className="breakdown-trend">—</span></span>
              </div>
              <div className="breakdown-item">
                <a href="#" className="breakdown-link">Taxes</a>
                <span className="breakdown-value">PKR 0.00 <span className="breakdown-trend">—</span></span>
              </div>
              <div className="breakdown-item strong">
                <a href="#" className="breakdown-link">Total sales</a>
                <span className="breakdown-value">PKR 0.00 <span className="breakdown-trend">—</span></span>
              </div>
            </div>
          </div>

          <div className="analytics-section-card">
            <h4 className="section-card-title">Total sales by sales channel</h4>
            <div className="no-data-message">No data for this date range</div>
          </div>

          <div className="analytics-section-card">
            <h4 className="section-card-title">Average order value over time</h4>
            <div className="chart-subtitle">PKR 0 <span className="chart-subtitle-note">—</span></div>
            <div className="small-chart">
              <svg width="100%" height="200" viewBox="0 0 400 200">
                <line x1="0" y1="190" x2="400" y2="190" stroke="#60A5FA" strokeWidth="2"/>
              </svg>
            </div>
          </div>

          <div className="analytics-section-card">
            <h4 className="section-card-title">Total sales by product</h4>
            <div className="no-data-message">No data for this date range</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsPage;

