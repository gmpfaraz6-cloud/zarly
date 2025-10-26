import './Attribution.css';

function Attribution() {
  return (
    <div className="attribution-page">
      <div className="attribution-content">
        <div className="attribution-filters">
          <button className="filter-btn">📅 Last 30 days</button>
          <button className="filter-btn">Daily</button>
          <button className="filter-btn">
            Channels
            <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" style={{ marginLeft: '6px' }}>
              <path d="M6 8l-3-3h6l-3 3z"/>
            </svg>
          </button>
        </div>

        {/* Chart Section */}
        <div className="chart-section">
          <div className="chart-header">
            <h3 className="chart-title">
              Sessions by top 5 channels over time
              <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" style={{ marginLeft: '6px' }}>
                <path d="M6 8l-3-3h6l-3 3z"/>
              </svg>
            </h3>
          </div>
          <div className="chart-container">
            <svg width="100%" height="300" viewBox="0 0 1200 300" preserveAspectRatio="none">
              {/* Grid lines */}
              <line x1="0" y1="60" x2="1200" y2="60" stroke="#E5E7EB" strokeWidth="1"/>
              <line x1="0" y1="120" x2="1200" y2="120" stroke="#E5E7EB" strokeWidth="1"/>
              <line x1="0" y1="180" x2="1200" y2="180" stroke="#E5E7EB" strokeWidth="1"/>
              <line x1="0" y1="240" x2="1200" y2="240" stroke="#E5E7EB" strokeWidth="1"/>
              
              {/* Direct (blue) line */}
              <path d="M0,250 L40,245 L80,248 L120,240 L160,230 L200,220 L240,210 L280,205 L320,200 L360,190 L400,100 L440,80 L480,70 L520,90 L560,110 L600,120 L640,130 L680,200 L720,210 L760,220 L800,225 L840,230 L880,235 L920,240 L960,245 L1000,80 L1040,75 L1080,85 L1120,90 L1160,95 L1200,100" 
                    fill="none" 
                    stroke="#0EA5E9" 
                    strokeWidth="2"/>
              
              {/* Google Search (purple) line */}
              <path d="M0,270 L40,268 L80,272 L120,265 L160,260 L200,258 L240,255 L280,252 L320,250 L360,248 L400,245 L440,242 L480,240 L520,238 L560,235 L600,233 L640,230 L680,228 L720,225 L760,223 L800,220 L840,218 L880,215 L920,213 L960,210 L1000,208 L1040,205 L1080,203 L1120,200 L1160,198 L1200,195" 
                    fill="none" 
                    stroke="#8B5CF6" 
                    strokeWidth="2"/>
            </svg>
          </div>
          <div className="chart-legend">
            <div className="legend-item">
              <span className="legend-dot" style={{ background: '#0EA5E9' }}></span>
              Direct
            </div>
            <div className="legend-item">
              <span className="legend-dot" style={{ background: '#8B5CF6' }}></span>
              Google Search (organic)
            </div>
          </div>
        </div>

        {/* Info Notice */}
        <div className="info-notice">
          <span className="info-icon">ℹ️</span>
          Cost, click, and impression metrics are now available for supported marketing apps. <a href="#">Learn more</a>
          <button className="close-notice">✕</button>
        </div>

        {/* Attribution Table */}
        <div className="attribution-table-container">
          <div className="table-toolbar">
            <button className="toolbar-btn">☰</button>
            <button className="toolbar-btn">🗑️</button>
          </div>
          <table className="attribution-table">
            <thead>
              <tr>
                <th>Channel</th>
                <th>Type</th>
                <th>Sessions <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor"><path d="M5 7L2 4h6L5 7z"/></svg></th>
                <th>Sales</th>
                <th>Orders</th>
                <th>Conversion rate</th>
                <th>Cost</th>
                <th>ROAS</th>
                <th>CPA</th>
                <th>CTR</th>
                <th>AOV</th>
                <th>Orders from new customers</th>
                <th>Orders from returning customers</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div className="channel-cell">
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
                <td>—</td>
                <td>—</td>
                <td>0</td>
                <td>0</td>
              </tr>
              <tr>
                <td>
                  <div className="channel-cell">
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
                <td>—</td>
                <td>—</td>
                <td>0</td>
                <td>0</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Attribution;

