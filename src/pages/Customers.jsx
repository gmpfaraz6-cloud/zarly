import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getCustomers, updateCustomer, deleteCustomer, getStore } from '../lib/supabase-queries';
import './Customers.css';

function Customers() {
  const { user } = useAuth();
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [store, setStore] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedCustomers, setSelectedCustomers] = useState([]);

  useEffect(() => {
    if (user) {
      loadStoreAndCustomers();
    }
  }, [user]);

  const loadStoreAndCustomers = async () => {
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

      const customersData = await getCustomers(storeData.id);
      setCustomers(customersData || []);
    } catch (err) {
      console.error('Error loading customers:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCustomer = () => {
    alert('Add customer: This would open a form to manually add a customer with contact information.');
  };

  const handleImportCustomers = () => {
    alert('Import customers: This would open a file picker to upload a CSV file with customer data.');
  };

  const filteredCustomers = customers.filter(customer => {
    if (!searchQuery) return true;
    return customer.first_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
           customer.last_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
           customer.email?.toLowerCase().includes(searchQuery.toLowerCase());
  });

  if (loading) {
    return (
      <div className="customers-page">
        <div className="customers-loading">
          <div className="loading-spinner"></div>
          <p>Loading customers...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="customers-page">
        <div className="customers-error">
          <p>Error: {error}</p>
          <button onClick={loadStoreAndCustomers} className="retry-btn">Retry</button>
        </div>
      </div>
    );
  }

  if (customers.length === 0) {
    return (
      <div className="customers-page">
        <div className="customers-content">
          <div className="customers-empty-state">
            <div className="empty-state-illustration">
              <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
                <circle cx="100" cy="100" r="100" fill="#F9FAFB"/>
                <g className="customer-card">
                  <rect x="50" y="50" width="100" height="100" rx="8" fill="white" stroke="#E5E7EB" strokeWidth="2"/>
                  <circle cx="100" cy="80" r="18" fill="#DBEAFE"/>
                  <path d="M100 74c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6z" fill="#60A5FA"/>
                  <rect x="70" y="105" width="60" height="6" rx="3" fill="#E5E7EB"/>
                  <rect x="80" y="118" width="40" height="4" rx="2" fill="#F3F4F6"/>
                  <rect x="75" y="128" width="50" height="4" rx="2" fill="#F3F4F6"/>
                </g>
              </svg>
            </div>
            
            <h2 className="empty-state-title">Everything customers-related in one place</h2>
            <p className="empty-state-description">
              Manage customer details, see customer order history, and group customers into segments.
            </p>
            
            <div className="empty-state-actions">
              <button className="primary-btn" onClick={handleAddCustomer}>Add customer</button>
              <button className="secondary-btn" onClick={handleImportCustomers}>Import customers</button>
            </div>
          </div>
          
          <div className="customers-info-section">
            <h3 className="info-section-title">Get customers with apps</h3>
            <p className="info-section-description">
              Grow your customer list by adding a lead capture form to your store and marketing.
            </p>
            <button className="info-section-btn" onClick={() => alert('See app recommendations')}>
              See app recommendations
            </button>
          </div>
          
          <div className="customers-footer">
            <a href="#" className="learn-more-link">Learn more about customers</a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="customers-page">
      <div className="customers-content">
        <div className="customers-table-section">
          <div className="customers-table-header">
            <div className="table-tabs">
              <button className="tab active">All customers ({customers.length})</button>
              <button className="tab">New customers</button>
              <button className="tab">Returning customers</button>
              <button className="tab-more">+</button>
            </div>
            <div className="table-header-actions">
              <input 
                type="text" 
                placeholder="Search customers..."
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="icon-btn">☰</button>
              <button className="icon-btn">⇅</button>
              <button className="primary-btn-small" onClick={handleAddCustomer}>Add customer</button>
            </div>
          </div>

          <div className="customers-table-wrapper">
            <table className="customers-table">
              <thead>
                <tr>
                  <th><input type="checkbox" /></th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Orders</th>
                  <th>Total spent</th>
                  <th>Location</th>
                  <th>Created</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((customer) => (
                  <tr key={customer.id}>
                    <td><input type="checkbox" /></td>
                    <td className="customer-name">
                      <div className="customer-avatar">
                        {customer.first_name?.[0]}{customer.last_name?.[0]}
                      </div>
                      {customer.first_name} {customer.last_name}
                    </td>
                    <td>{customer.email}</td>
                    <td>{customer.orders?.length || 0}</td>
                    <td className="customer-spent">
                      ${customer.total_spent ? parseFloat(customer.total_spent).toFixed(2) : '0.00'}
                    </td>
                    <td>{customer.country || '—'}</td>
                    <td>{new Date(customer.created_at).toLocaleDateString()}</td>
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

export default Customers;
