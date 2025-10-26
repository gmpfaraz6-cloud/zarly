import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getDiscounts, updateDiscount, deleteDiscount, getStore } from '../lib/supabase-queries';
import './Discounts.css';

function Discounts() {
  const { user } = useAuth();
  const [discounts, setDiscounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [store, setStore] = useState(null);

  useEffect(() => {
    if (user) {
      loadStoreAndDiscounts();
    }
  }, [user]);

  const loadStoreAndDiscounts = async () => {
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

      const discountsData = await getDiscounts(storeData.id);
      setDiscounts(discountsData || []);
    } catch (err) {
      console.error('Error loading discounts:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="discounts-page">
        <div className="discounts-loading">
          <div className="loading-spinner"></div>
          <p>Loading discounts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="discounts-page">
        <div className="discounts-error">
          <p>Error: {error}</p>
          <button onClick={loadStoreAndDiscounts} className="retry-btn">Retry</button>
        </div>
      </div>
    );
  }

  if (discounts.length === 0) {
    return (
      <div className="discounts-page">
        <div className="discounts-content">
          <div className="discounts-empty-state">
            <div className="empty-state-icon">📊</div>
            <h2 className="empty-state-title">Manage discounts and promotions</h2>
            <p className="empty-state-description">
              Create discount codes and automatic discounts that apply at checkout
            </p>
            <button className="empty-state-button">Create discount</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="discounts-page">
      <div className="discounts-content">
        <div className="discounts-table-section">
          <div className="table-header">
            <h2>Discounts ({discounts.length})</h2>
            <button className="btn-primary">Create discount</button>
          </div>

          <div className="discounts-table-wrapper">
            <table className="discounts-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Status</th>
                  <th>Method</th>
                  <th>Type</th>
                  <th>Uses</th>
                </tr>
              </thead>
              <tbody>
                {discounts.map((discount) => (
                  <tr key={discount.id}>
                    <td className="discount-title">{discount.code}</td>
                    <td>
                      <span className={`status-badge ${discount.status}`}>
                        {discount.status}
                      </span>
                    </td>
                    <td>{discount.type === 'code' ? 'Discount code' : 'Automatic'}</td>
                    <td>{discount.value_type === 'percentage' ? `${discount.value}%` : `$${discount.value}`}</td>
                    <td>{discount.usage_count || 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Discounts;
