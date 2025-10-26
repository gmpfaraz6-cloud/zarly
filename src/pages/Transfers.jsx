import './Transfers.css';

function Transfers() {
  return (
    <div className="transfers-page">
      <div className="empty-state-content">
        <div className="empty-state-illustration">
          <svg width="180" height="180" viewBox="0 0 180 180" fill="none">
            <circle cx="90" cy="90" r="90" fill="#F9F9F9"/>
            {/* Left Box */}
            <g className="box-left">
              <rect x="40" y="60" width="35" height="45" rx="4" fill="#E8F5F1" stroke="#00C896" strokeWidth="2"/>
              <text x="57.5" y="87" textAnchor="middle" fill="#00C896" fontSize="24" fontWeight="bold">6</text>
              <circle cx="47" cy="52" r="4" fill="#00C896"/>
              <path d="M47 48V44" stroke="#00C896" strokeWidth="2" strokeLinecap="round"/>
            </g>
            {/* Arrow */}
            <g className="arrow-transfer">
              <circle cx="90" cy="82.5" r="18" fill="#00C896"/>
              <path d="M83 82.5h14M93 78.5l4 4-4 4" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </g>
            {/* Right Box */}
            <g className="box-right">
              <rect x="105" y="60" width="35" height="45" rx="4" fill="#E3F2FD" stroke="#2196F3" strokeWidth="2"/>
              <text x="122.5" y="87" textAnchor="middle" fill="#2196F3" fontSize="24" fontWeight="bold">4</text>
              <circle cx="130" cy="52" r="4" fill="#2196F3"/>
              <path d="M130 48V44" stroke="#2196F3" strokeWidth="2" strokeLinecap="round"/>
            </g>
          </svg>
        </div>

        <h2 className="empty-state-title">Move inventory between locations</h2>
        <p className="empty-state-description">
          Move and track inventory between your business locations.
        </p>

        <button className="create-btn">Create transfer</button>

        <div className="empty-state-footer">
          <a href="#" className="learn-more-link">Learn more about transfers</a>
        </div>
      </div>
    </div>
  );
}

export default Transfers;

