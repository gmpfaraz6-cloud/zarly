import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getOrders, getCustomers, getProducts, getStore } from '../lib/supabase-queries';
import './AnalyticsPage.css';

function AnalyticsPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [store, setStore] = useState(null);
  const [analytics, setAnalytics] = useState({
    totalSales: 0,
    totalOrders: 0,
    totalCustomers: 0,
    totalProducts: 0,
    averageOrderValue: 0,
    conversionRate: 0
  });

  useEffect(() => {
    if (user) {
      loadAnalytics();
    }
  }, [user]);

  const loadAnalytics = async () => {
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

      const [orders, customers, products] = await Promise.all([
        getOrders(storeData.id),
        getCustomers(storeData.id),
        getProducts(storeData.id)
      ]);

      const totalSales = orders.reduce((sum, order) => sum + parseFloat(order.total_price || 0), 0);
      const totalOrders = orders.length;
      const totalCustomers = customers.length;
      const totalProducts = products.length;
      const averageOrderValue = totalOrders > 0 ? totalSales / totalOrders : 0;

      setAnalytics({
        totalSales,
        totalOrders,
        totalCustomers,
        totalProducts,
        averageOrderValue,
        conversionRate: totalCustomers > 0 ? (totalOrders / totalCustomers * 100) : 0
      });
    } catch (err) {
      console.error('Error loading analytics:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="analytics-page">
        <div className="analytics-loading">
          <div className="loading-spinner"></div>
          <p>Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="analytics-page">
        <div className="analytics-error">
          <p>Error: {error}</p>
          <button onClick={loadAnalytics} className="retry-btn">Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="analytics-page">
      <div className="analytics-content">
        <div className="analytics-header">
          <h1>Analytics</h1>
          <button className="time-selector-btn">📅 Last 30 days</button>
        </div>

        <div className="analytics-grid">
          <div className="analytics-card">
            <div className="card-label">Total sales</div>
            <div className="card-value">${analytics.totalSales.toFixed(2)}</div>
            <div className="card-trend neutral">—</div>
          </div>

          <div className="analytics-card">
            <div className="card-label">Total orders</div>
            <div className="card-value">{analytics.totalOrders}</div>
            <div className="card-trend neutral">—</div>
          </div>

          <div className="analytics-card">
            <div className="card-label">Average order value</div>
            <div className="card-value">${analytics.averageOrderValue.toFixed(2)}</div>
            <div className="card-trend neutral">—</div>
          </div>

          <div className="analytics-card">
            <div className="card-label">Total customers</div>
            <div className="card-value">{analytics.totalCustomers}</div>
            <div className="card-trend neutral">—</div>
          </div>

          <div className="analytics-card">
            <div className="card-label">Total products</div>
            <div className="card-value">{analytics.totalProducts}</div>
            <div className="card-trend neutral">—</div>
          </div>

          <div className="analytics-card">
            <div className="card-label">Conversion rate</div>
            <div className="card-value">{analytics.conversionRate.toFixed(1)}%</div>
            <div className="card-trend neutral">—</div>
          </div>
        </div>

        <div className="analytics-charts">
          <div className="chart-card">
            <h3>Sales over time</h3>
            <div className="chart-placeholder">
              <p>Chart visualization would appear here</p>
            </div>
          </div>

          <div className="chart-card">
            <h3>Top products</h3>
            <div className="chart-placeholder">
              <p>Top selling products would appear here</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsPage;
