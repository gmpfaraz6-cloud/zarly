import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getMenus, getStore } from '../lib/supabase-queries';
import './Menus.css';

function Menus() {
  const { user } = useAuth();
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [store, setStore] = useState(null);

  useEffect(() => {
    if (user) {
      loadStoreAndMenus();
    }
  }, [user]);

  const loadStoreAndMenus = async () => {
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

      const menusData = await getMenus(storeData.id);
      setMenus(menusData || []);
    } catch (err) {
      console.error('Error loading menus:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="menus-page">
        <div className="menus-loading">
          <div className="loading-spinner"></div>
          <p>Loading menus...</p>
        </div>
      </div>
    );
  }

  if (error || menus.length === 0) {
    return (
      <div className="menus-page">
        <div className="menus-content">
          <div className="menus-empty-state">
            <div className="empty-state-icon">📋</div>
            <h2 className="empty-state-title">Organize your navigation</h2>
            <p className="empty-state-description">
              Create menus to help customers navigate your store
            </p>
            <button className="empty-state-button">Create menu</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="menus-page">
      <div className="menus-content">
        <div className="menus-table-section">
          <div className="table-header">
            <h2>Menus ({menus.length})</h2>
            <button className="btn-primary">Create menu</button>
          </div>

          <div className="menus-table-wrapper">
            <table className="menus-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Items</th>
                </tr>
              </thead>
              <tbody>
                {menus.map((menu) => (
                  <tr key={menu.id}>
                    <td className="menu-title">{menu.title}</td>
                    <td>{menu.menu_items?.length || 0} items</td>
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

export default Menus;
