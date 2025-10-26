import './MarketsPage.css';

function MarketsPage() {
  const markets = [
    {
      name: 'International',
      status: 'Active',
      regions: '2 regions'
    },
    {
      name: 'Pakistan',
      status: 'Active',
      customization: '🇵🇰 Pakistan'
    }
  ];

  return (
    <div className="markets-page-container">
      <div className="markets-page-content">
        <div className="markets-toolbar">
          <button className="markets-collapse-btn">◀</button>
          <div className="markets-search">
            <span className="search-icon-markets">🔍</span>
            <input 
              type="text" 
              placeholder="Search in all markets" 
              className="markets-search-input"
            />
          </div>
          <button className="markets-filter-btn">☰</button>
          <button className="markets-sort-btn">↕️</button>
        </div>

        <table className="markets-table">
          <thead>
            <tr>
              <th>Market <span className="sort-arrow">▲</span></th>
              <th>Status</th>
              <th>Includes</th>
              <th>Customizations</th>
            </tr>
          </thead>
          <tbody>
            {markets.map((market, idx) => (
              <tr key={idx}>
                <td>
                  <div className="market-name-cell">
                    <span className="market-icon">🌍</span>
                    <a href="#" className="market-link">{market.name}</a>
                  </div>
                </td>
                <td>
                  <span className="status-badge-market active">{market.status}</span>
                </td>
                <td>
                  {market.regions && (
                    <div className="regions-cell">
                      <span className="regions-icon">🌐</span>
                      {market.regions}
                    </div>
                  )}
                </td>
                <td>
                  {market.customization && (
                    <span className="customization-text">{market.customization}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="markets-footer-link">
          <a href="#">Learn more about markets</a>
        </div>
      </div>
    </div>
  );
}

export default MarketsPage;

