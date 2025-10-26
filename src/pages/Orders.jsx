import { useState, useEffect, useRef } from 'react';
import './Orders.css';

function Orders({ type = 'orders' }) {
  const [showMoreActions, setShowMoreActions] = useState(false);
  const [hideAnalytics, setHideAnalytics] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowMoreActions(false);
      }
    };

    if (showMoreActions) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMoreActions]);
  const getTitleContent = () => {
    switch(type) {
      case 'drafts':
        return (
          <>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ marginRight: '8px' }}>
              <rect x="3" y="2" width="14" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
              <path d="M6 6h8M6 9h8M6 12h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            Drafts
          </>
        );
      case 'abandoned':
        return '🛒 Abandoned checkouts';
      default:
        return '📦 Orders';
    }
  };

  const getEmptyStateText = () => {
    switch(type) {
      case 'drafts':
        return {
          title: 'Manually create orders and invoices',
          description: 'Use draft orders to take orders over the phone, email invoices to customers, and collect payments.',
          buttonText: 'Create draft order',
          learnMore: 'Learn more about creating draft orders'
        };
      case 'abandoned':
        return {
          title: 'Your abandoned checkouts will show here',
          description: 'Checkouts that customers started but didn\'t complete will appear here.',
          buttonText: 'Create order',
          learnMore: 'Learn more about abandoned checkouts'
        };
      default:
        return {
          title: 'Your orders will show here',
          description: 'This is where you\'ll fulfill orders, collect payments, and track order progress.',
          buttonText: 'Create order',
          learnMore: 'Learn more about orders'
        };
    }
  };

  const emptyState = getEmptyStateText();
  const showMetrics = type === 'orders'; // Only show metrics on main orders page
  const metrics = [
    { label: 'Orders', value: '0', trend: 'neutral' },
    { label: 'Items ordered', value: '0', trend: 'neutral' },
    { label: 'Returns', value: 'SAR 0', trend: 'neutral' },
    { label: 'Orders fulfilled', value: '0', trend: 'neutral' },
    { label: 'Orders delivered', value: '0', trend: 'neutral' },
    { label: 'Order to fulfillment time', value: '0', trend: 'neutral' },
  ];

  const toggleMoreActions = () => {
    setShowMoreActions(!showMoreActions);
  };

  const toggleAnalytics = () => {
    setHideAnalytics(!hideAnalytics);
    setShowMoreActions(false);
  };

  const handleExport = () => {
    alert('Export functionality: This would download your orders data as a CSV or Excel file.');
    setShowMoreActions(false);
  };

  const handleCreateOrder = () => {
    alert('Create order functionality: This would open a form to create a new order manually.');
  };

  return (
    <div className="orders-page">
      <div className="orders-content">
        {showMetrics && !hideAnalytics && (
          <>
            <div className="orders-toolbar">
              <button className="today-filter">
                <span className="calendar-icon">📅</span>
                Today
              </button>
            </div>

            <div className="orders-metrics">
              {metrics.map((metric, index) => (
                <div key={index} className="metric-card">
                  <div className="metric-header">
                    <span className="metric-label">{metric.label}</span>
                  </div>
                  <div className="metric-value">{metric.value}</div>
                  <div className="metric-trend">
                    <span className="trend-indicator">—</span>
                  </div>
                  <div className="metric-chart">
                    <svg width="100%" height="40" viewBox="0 0 120 40" preserveAspectRatio="none">
                      <path
                        d="M0,20 L20,18 L40,22 L60,20 L80,19 L100,21 L120,20"
                        fill="none"
                        stroke="#E1E3E5"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        <div className="orders-empty-state">
          <div className="empty-state-illustration">
            {type === 'drafts' ? (
              <svg width="140" height="140" viewBox="0 0 140 140" fill="none">
                <circle cx="70" cy="70" r="70" fill="#F1F2F4"/>
                <circle cx="70" cy="95" r="45" fill="#008060" opacity="0.1"/>
                {/* Product card */}
                <rect x="40" y="30" width="60" height="75" rx="6" fill="white" stroke="#E1E3E5" strokeWidth="2"/>
                {/* T-shirt illustration */}
                <rect x="52" y="42" width="36" height="30" rx="3" fill="#FF6B6B"/>
                <rect x="52" y="42" width="12" height="6" rx="2" fill="#FF6B6B"/>
                <rect x="76" y="42" width="12" height="6" rx="2" fill="#FF6B6B"/>
                <circle cx="70" cy="52" r="3" fill="white"/>
                {/* Product details lines */}
                <rect x="48" y="78" width="20" height="3" rx="1.5" fill="#FFA07A"/>
                <rect x="48" y="84" width="15" height="2" rx="1" fill="#E1E3E5"/>
                <rect x="48" y="89" width="18" height="2" rx="1" fill="#E1E3E5"/>
                <rect x="48" y="94" width="12" height="2" rx="1" fill="#E1E3E5"/>
              </svg>
            ) : (
              <svg width="140" height="140" viewBox="0 0 140 140" fill="none">
                <circle cx="70" cy="70" r="70" fill="#F1F2F4"/>
                <circle cx="70" cy="90" r="45" fill="#008060" opacity="0.1"/>
                <rect x="45" y="35" width="50" height="65" rx="4" fill="white" stroke="#E1E3E5" strokeWidth="2"/>
                <rect x="52" y="45" width="15" height="3" rx="1.5" fill="#008060"/>
                <rect x="52" y="53" width="36" height="2" rx="1" fill="#E1E3E5"/>
                <rect x="52" y="59" width="36" height="2" rx="1" fill="#E1E3E5"/>
                <circle cx="60" cy="73" r="8" fill="#50B83C" opacity="0.2"/>
                <circle cx="60" cy="73" r="5" fill="#50B83C"/>
                <rect x="52" y="85" width="20" height="3" rx="1.5" fill="#FF6B6B" opacity="0.3"/>
                <rect x="52" y="91" width="15" height="2" rx="1" fill="#E1E3E5"/>
              </svg>
            )}
          </div>
          
          <h2 className="empty-state-title">{emptyState.title}</h2>
          <p className="empty-state-description">
            {emptyState.description}
          </p>
          
          <button className="create-order-btn">{emptyState.buttonText}</button>
        </div>

        <div className="orders-footer">
          <a href="#" className="learn-more-link">{emptyState.learnMore}</a>
        </div>
      </div>
    </div>
  );
}

export default Orders;

