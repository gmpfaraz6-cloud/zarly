import './LiveView.css';

function LiveView() {
  return (
    <div className="live-view-page">
      <div className="live-view-content">
        <div className="live-view-header">
          <div className="live-status">
            <span className="live-dot"></span>
            <span className="live-text">Just now</span>
          </div>
          <div className="live-view-actions">
            <input 
              type="text" 
              placeholder="Search location" 
              className="location-search"
            />
            <button className="view-btn">⚙️</button>
            <button className="view-btn">📋</button>
            <button className="view-btn">⛶</button>
          </div>
        </div>

        <div className="live-view-grid">
          {/* Left Panel */}
          <div className="live-view-left">
            <div className="live-metric-small">
              <div className="metric-label-small">Visitors right now</div>
              <div className="metric-value-small">0</div>
            </div>

            <div className="live-metric-small">
              <div className="metric-label-small">Total sales</div>
              <div className="metric-value-small">SAR 0 <span className="metric-trend-small">—</span></div>
            </div>

            <div className="live-metric-small">
              <div className="metric-label-small">Sessions</div>
              <div className="metric-value-small">
                1
                <svg width="60" height="30" viewBox="0 0 60 30" style={{marginLeft: '8px'}}>
                  <polyline points="0,25 15,20 30,22 45,18 60,15" fill="none" stroke="#60A5FA" strokeWidth="2"/>
                </svg>
              </div>
            </div>

            <div className="live-metric-small">
              <div className="metric-label-small">Orders</div>
              <div className="metric-value-small">0 <span className="metric-trend-small">—</span></div>
            </div>

            <div className="live-section">
              <div className="live-section-title">Customer behavior</div>
              <div className="behavior-grid">
                <div className="behavior-item">
                  <div className="behavior-label">Active carts</div>
                  <div className="behavior-value">0</div>
                </div>
                <div className="behavior-item">
                  <div className="behavior-label">Checking out</div>
                  <div className="behavior-value">0</div>
                </div>
                <div className="behavior-item">
                  <div className="behavior-label">Purchased</div>
                  <div className="behavior-value">0</div>
                </div>
              </div>
            </div>

            <div className="live-section">
              <div className="live-section-title">Sessions by location</div>
              <div className="location-item">
                <div className="location-bar" style={{width: '100%', background: '#60A5FA'}}>
                  <span className="location-label">United States - Iowa - Council Bluffs</span>
                  <span className="location-count">1</span>
                </div>
              </div>
            </div>

            <div className="live-section">
              <div className="live-section-title">New vs returning customers</div>
              <div className="no-data">No data for this date range</div>
            </div>

            <div className="live-section">
              <div className="live-section-title">Total sales by product</div>
              <div className="no-data">No data</div>
            </div>
          </div>

          {/* Right Panel - Globe */}
          <div className="live-view-right">
            <div className="globe-container">
              <svg width="100%" height="600" viewBox="0 0 600 600">
                <defs>
                  <radialGradient id="globeGradient">
                    <stop offset="0%" stopColor="#E0F2FE" />
                    <stop offset="100%" stopColor="#BAE6FD" />
                  </radialGradient>
                </defs>
                
                {/* Globe */}
                <circle cx="300" cy="300" r="250" fill="url(#globeGradient)" opacity="0.3"/>
                
                {/* Dot pattern for 3D effect */}
                {Array.from({length: 20}).map((_, i) => (
                  <g key={i}>
                    {Array.from({length: 40}).map((_, j) => (
                      <circle 
                        key={j}
                        cx={300 + 200 * Math.sin((j / 40) * Math.PI * 2) * Math.cos((i / 20) * Math.PI)}
                        cy={300 + 200 * Math.sin((i / 20) * Math.PI)}
                        r="2"
                        fill="#60A5FA"
                        opacity="0.3"
                      />
                    ))}
                  </g>
                ))}
                
                {/* Sample location marker */}
                <circle cx="250" cy="280" r="8" fill="#FF6B6B" opacity="0.8"/>
                <circle cx="250" cy="280" r="12" fill="#FF6B6B" opacity="0.3"/>
              </svg>
            </div>

            <div className="globe-legend">
              <div className="legend-item-globe">
                <span className="legend-dot-globe orders"></span>
                <span>Orders</span>
              </div>
              <div className="legend-item-globe">
                <span className="legend-dot-globe visitors"></span>
                <span>Visitors right now</span>
              </div>
            </div>

            <button className="zoom-btn">+</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LiveView;

