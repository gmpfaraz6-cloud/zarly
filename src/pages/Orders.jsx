import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { getOrders, updateOrder, getStore } from '../lib/supabase-queries';
import './Orders.css';

function Orders({ type = 'orders' }) {
  const { user } = useAuth();
  const [showMoreActions, setShowMoreActions] = useState(false);
  const [hideAnalytics, setHideAnalytics] = useState(false);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [store, setStore] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
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

  useEffect(() => {
    if (user) {
      loadStoreAndOrders();
    }
  }, [user, type]);

  const loadStoreAndOrders = async () => {
    try {
      setLoading(true);
      setError(null);

      const storeData = await getStore(user.id);
      if (!storeData) {
        setError('No store found');
        setLoading(false);
        return;
      }
      setStore(storeData);

      const filters = {};
      if (type === 'drafts') {
        filters.financial_status = 'pending';
      }
      
      const ordersData = await getOrders(storeData.id, filters);
      setOrders(ordersData || []);
    } catch (err) {
      console.error('Error loading orders:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, field, newStatus) => {
    try {
      await updateOrder(orderId, { [field]: newStatus });
      await loadStoreAndOrders();
    } catch (err) {
      alert(`Failed to update order ${field}`);
      console.error(err);
    }
  };

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
  const showMetrics = type === 'orders';
  
  const totalOrders = orders.length;
  const totalItems = orders.reduce((sum, order) => sum + (order.order_items?.length || 0), 0);
  const fulfilledOrders = orders.filter(o => o.fulfillment_status === 'fulfilled').length;
  const totalRevenue = orders.reduce((sum, order) => sum + parseFloat(order.total_price || 0), 0);

  const metrics = [
    { label: 'Orders', value: totalOrders.toString(), trend: 'neutral' },
    { label: 'Items ordered', value: totalItems.toString(), trend: 'neutral' },
    { label: 'Revenue', value: `$${totalRevenue.toFixed(2)}`, trend: 'neutral' },
    { label: 'Orders fulfilled', value: fulfilledOrders.toString(), trend: 'neutral' },
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

  if (loading) {
    return (
      <div className="orders-page">
        <div className="orders-loading">
          <div className="loading-spinner"></div>
          <p>Loading orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="orders-page">
        <div className="orders-error">
          <p>Error: {error}</p>
          <button onClick={loadStoreAndOrders} className="retry-btn">Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <div className="orders-content">
        {showMetrics && !hideAnalytics && (
          <div className="orders-metrics">
            <div className="metric-time-selector">
              <button className="time-selector-btn">
                📅 Last 30 days
              </button>
            </div>
            {metrics.map((metric, index) => (
              <div key={index} className="metric-card">
                <div className="metric-label">{metric.label}</div>
                <div className="metric-value-row">
                  <span className="metric-value">{metric.value}</span>
                  {metric.trend === 'up' && <span className="metric-trend up">↑ 12%</span>}
                  {metric.trend === 'down' && <span className="metric-trend down">↓ 5%</span>}
                  {metric.trend === 'neutral' && <span className="metric-trend neutral">—</span>}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="orders-table-section">
          <div className="orders-table-header">
            <div className="table-tabs">
              <button className="tab active">All</button>
              <button className="tab">Unfulfilled</button>
              <button className="tab">Unpaid</button>
              <button className="tab">Open</button>
              <button className="tab">Closed</button>
              <button className="tab-more">+</button>
            </div>
            <div className="table-header-actions">
              <button className="icon-btn">🔍</button>
              <button className="icon-btn">☰</button>
              <button className="icon-btn">⇅</button>
              <div className="more-actions-wrapper" ref={dropdownRef}>
                <button className="icon-btn" onClick={toggleMoreActions}>⋮</button>
                {showMoreActions && (
                  <div className="dropdown-menu">
                    <button className="dropdown-item" onClick={handleExport}>
                      Export
                    </button>
                    <button className="dropdown-item" onClick={toggleAnalytics}>
                      {hideAnalytics ? 'Show' : 'Hide'} analytics
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {orders.length === 0 ? (
            <div className="orders-empty-state">
              <div className="empty-state-icon">
                <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                  <rect x="10" y="15" width="40" height="35" rx="2" stroke="#8C9196" strokeWidth="2" fill="none"/>
                  <path d="M20 15V10a5 5 0 0110 0v5M30 30v5" stroke="#8C9196" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <h2 className="empty-state-title">{emptyState.title}</h2>
              <p className="empty-state-description">{emptyState.description}</p>
              <button className="empty-state-button" onClick={handleCreateOrder}>
                {emptyState.buttonText}
              </button>
              <a href="#" className="empty-state-link">{emptyState.learnMore}</a>
            </div>
          ) : (
            <div className="orders-table-wrapper">
              <table className="orders-table">
                <thead>
                  <tr>
                    <th><input type="checkbox" /></th>
                    <th>Order</th>
                    <th>Date</th>
                    <th>Customer</th>
                    <th>Total</th>
                    <th>Payment</th>
                    <th>Fulfillment</th>
                    <th>Items</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td><input type="checkbox" /></td>
                      <td className="order-number">#{order.order_number}</td>
                      <td>{new Date(order.created_at).toLocaleDateString()}</td>
                      <td>
                        {order.customers ? 
                          `${order.customers.first_name} ${order.customers.last_name}` : 
                          order.email || 'Guest'}
                      </td>
                      <td className="order-total">${parseFloat(order.total_price).toFixed(2)}</td>
                      <td>
                        <select 
                          className={`status-badge payment-${order.financial_status}`}
                          value={order.financial_status}
                          onChange={(e) => handleStatusChange(order.id, 'financial_status', e.target.value)}
                        >
                          <option value="pending">Pending</option>
                          <option value="authorized">Authorized</option>
                          <option value="paid">Paid</option>
                          <option value="refunded">Refunded</option>
                        </select>
                      </td>
                      <td>
                        <select 
                          className={`status-badge fulfillment-${order.fulfillment_status}`}
                          value={order.fulfillment_status}
                          onChange={(e) => handleStatusChange(order.id, 'fulfillment_status', e.target.value)}
                        >
                          <option value="unfulfilled">Unfulfilled</option>
                          <option value="partial">Partial</option>
                          <option value="fulfilled">Fulfilled</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td>{order.order_items?.length || 0} items</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Orders;
