import './Reports.css';

function Reports() {
  const reports = [
    { name: 'Products by sell-through rate', category: 'Inventory', lastViewed: 'Oct 25, 2025', createdBy: 'Shopify' },
    { name: 'Sessions by location', category: 'Acquisition', lastViewed: 'Oct 25, 2025', createdBy: 'Shopify' },
    { name: 'Sessions by referrer', category: 'Acquisition', lastViewed: 'Oct 25, 2025', createdBy: 'Shopify' },
    { name: 'Sessions by social referrer', category: 'Acquisition', lastViewed: 'Oct 25, 2025', createdBy: 'Shopify' },
    { name: 'Sessions over time', category: 'Acquisition', lastViewed: 'Oct 25, 2025', createdBy: 'Shopify' },
    { name: 'Visitors over time', category: 'Acquisition', lastViewed: 'Oct 25, 2025', createdBy: 'Shopify' },
    { name: 'Visitors right now', category: 'Acquisition', lastViewed: 'Oct 25, 2025', createdBy: 'Shopify' },
    { name: 'Bounce rate over time', category: 'Behavior', lastViewed: 'Oct 25, 2025', createdBy: 'Shopify' },
    { name: 'Checkout conversion rate over time', category: 'Behavior', lastViewed: 'Oct 25, 2025', createdBy: 'Shopify' },
    { name: 'Conversion rate breakdown', category: 'Behavior', lastViewed: 'Oct 25, 2025', createdBy: 'Shopify' },
  ];

  return (
    <div className="reports-page">
      <div className="reports-content">
        <div className="reports-search-bar">
          <span className="search-icon-reports">🔍</span>
          <input 
            type="text" 
            placeholder="Search reports" 
            className="reports-search-input"
          />
        </div>

        <div className="reports-filters">
          <button className="reports-filter-btn">
            Created by <span className="filter-arrow">▼</span>
          </button>
          <button className="reports-filter-btn">
            Category <span className="filter-arrow">▼</span>
          </button>
          <button className="reports-benchmark-btn">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{marginRight: '6px'}}>
              <path d="M8 2v12M4 6l4-4 4 4M4 10l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Benchmarks available
          </button>
          <button className="reports-sort-btn">↕️</button>
        </div>

        <div className="reports-table-container">
          <table className="reports-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Last viewed <span className="sort-arrow-up">▲</span></th>
                <th>Created by</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report, idx) => (
                <tr key={idx}>
                  <td>
                    <a href="#" className="report-name-link">{report.name}</a>
                  </td>
                  <td className="report-category">{report.category}</td>
                  <td className="report-date">{report.lastViewed}</td>
                  <td>
                    <div className="created-by-cell">
                      <div className="shopify-icon-small">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <rect width="16" height="16" rx="3" fill="#95BF47"/>
                        </svg>
                      </div>
                      {report.createdBy}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="reports-pagination">
            <button className="pagination-btn-reports">‹</button>
            <span className="pagination-text-reports">1-50</span>
            <button className="pagination-btn-reports">›</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reports;

