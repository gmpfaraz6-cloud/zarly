import { useState } from 'react';
import './Discounts.css';

function Discounts() {
  const [activeTab, setActiveTab] = useState('all');

  const handleDiscountClick = (code) => {
    alert(`Opening discount: ${code}\nThis would show the discount details and usage statistics.`);
  };

  const handleExport = () => {
    alert('Export discounts: This would download your discounts as a CSV file.');
  };

  const handleCreateDiscount = () => {
    alert('Create discount: This would open a form to create a new discount code with conditions and values.');
  };

  const discount = {
    code: 'KSA2025',
    title: 'Buy 2 items, get 1 item at 5% off',
    status: 'Active',
    method: 'Code',
    type: 'Buy X Get Y',
    combinations: ['💰', '📧', '⋯'],
    used: 0
  };

  return (
    <div className="discounts-page">
      <div className="discounts-content">
        <div className="discounts-tabs">
          <button 
            className={`discount-tab ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            All
          </button>
          <button 
            className={`discount-tab ${activeTab === 'active' ? 'active' : ''}`}
            onClick={() => setActiveTab('active')}
          >
            Active
          </button>
          <button 
            className={`discount-tab ${activeTab === 'scheduled' ? 'active' : ''}`}
            onClick={() => setActiveTab('scheduled')}
          >
            Scheduled
          </button>
          <button 
            className={`discount-tab ${activeTab === 'expired' ? 'active' : ''}`}
            onClick={() => setActiveTab('expired')}
          >
            Expired
          </button>
          <button className="discount-tab-add">+</button>
        </div>

        <div className="discounts-table-container">
          <div className="table-toolbar">
            <button className="toolbar-icon-btn">🔍</button>
            <button className="toolbar-icon-btn">☰</button>
            <button className="toolbar-icon-btn">↕️</button>
          </div>

          <table className="discounts-table">
            <thead>
              <tr>
                <th className="checkbox-th">
                  <input type="checkbox" />
                </th>
                <th>Title</th>
                <th>Status</th>
                <th>Method</th>
                <th>Type</th>
                <th>Combinations</th>
                <th>Used</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="checkbox-td">
                  <input type="checkbox" />
                </td>
                <td>
                  <div className="discount-title-cell" onClick={() => handleDiscountClick(discount.code)} style={{ cursor: 'pointer' }}>
                    <div className="discount-code">{discount.code}</div>
                    <div className="discount-description">{discount.title}</div>
                  </div>
                </td>
                <td>
                  <span className="status-badge active">{discount.status}</span>
                </td>
                <td>{discount.method}</td>
                <td>
                  <div className="type-cell">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="type-icon">
                      <path d="M8 2L10 6L14 7L11 10L12 14L8 12L4 14L5 10L2 7L6 6L8 2Z" fill="currentColor"/>
                    </svg>
                    {discount.type}
                  </div>
                </td>
                <td>
                  <div className="combinations-cell">
                    {discount.combinations.map((icon, idx) => (
                      <span key={idx} className="combination-icon">{icon}</span>
                    ))}
                  </div>
                </td>
                <td>{discount.used}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="discounts-footer">
          <a href="#" className="learn-more-link">Learn more about discounts</a>
        </div>
      </div>
    </div>
  );
}

export default Discounts;

