import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getCollections, updateCollection, deleteCollection, getStore } from '../lib/supabase-queries';
import './Collections.css';

function Collections() {
  const { user } = useAuth();
  const [selectedCollections, setSelectedCollections] = useState([]);
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [store, setStore] = useState(null);

  useEffect(() => {
    if (user) {
      loadStoreAndCollections();
    }
  }, [user]);

  const loadStoreAndCollections = async () => {
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

      const collectionsData = await getCollections(storeData.id);
      setCollections(collectionsData || []);
    } catch (err) {
      console.error('Error loading collections:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleSelection = (id) => {
    if (selectedCollections.includes(id)) {
      setSelectedCollections(selectedCollections.filter(cid => cid !== id));
    } else {
      setSelectedCollections([...selectedCollections, id]);
    }
  };

  const toggleSelectAll = () => {
    if (selectedCollections.length === collections.length) {
      setSelectedCollections([]);
    } else {
      setSelectedCollections(collections.map(c => c.id));
    }
  };

  if (loading) {
    return (
      <div className="collections-page">
        <div className="collections-loading">
          <div className="loading-spinner"></div>
          <p>Loading collections...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="collections-page">
        <div className="collections-error">
          <p>Error: {error}</p>
          <button onClick={loadStoreAndCollections} className="retry-btn">Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="collections-page">
      <div className="collections-content">
        <div className="collections-table-container">
          <div className="collections-tabs">
            <button className="tab-btn active">All ({collections.length})</button>
            <button className="tab-btn add-tab">+</button>
            
            <div className="table-actions">
              <button className="icon-btn" title="Search">🔍</button>
              <button className="icon-btn" title="Filter">☰</button>
              <button className="icon-btn" title="Sort">⇅</button>
            </div>
          </div>

          {collections.length === 0 ? (
            <div className="empty-state">
              <h3>No collections yet</h3>
              <p>Group your products into collections to make it easier for customers to find them</p>
              <button className="btn-primary">Create collection</button>
            </div>
          ) : (
            <div className="collections-table-wrapper">
              <table className="collections-table">
                <thead>
                  <tr>
                    <th className="checkbox-col">
                      <input
                        type="checkbox"
                        checked={selectedCollections.length === collections.length}
                        onChange={toggleSelectAll}
                      />
                    </th>
                    <th>Title</th>
                    <th>Products</th>
                    <th>Product conditions</th>
                  </tr>
                </thead>
                <tbody>
                  {collections.map((collection) => (
                    <tr
                      key={collection.id}
                      className={selectedCollections.includes(collection.id) ? 'selected' : ''}
                    >
                      <td className="checkbox-col">
                        <input
                          type="checkbox"
                          checked={selectedCollections.includes(collection.id)}
                          onChange={() => toggleSelection(collection.id)}
                        />
                      </td>
                      <td className="collection-title">{collection.title}</td>
                      <td>{collection.collection_products?.length || 0} products</td>
                      <td className="conditions-col">{collection.conditions || 'Manual'}</td>
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

export default Collections;
