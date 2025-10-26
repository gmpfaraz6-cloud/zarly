import { useState } from 'react';
import './Collections.css';

function Collections() {
  const [selectedCollections, setSelectedCollections] = useState([]);

  const collections = [
    { id: 1, name: 'BEST SELLING', products: 5 },
    { id: 2, name: 'Winter Collection', products: 4 },
    { id: 3, name: 'Summer Collection', products: 4 },
    { id: 4, name: 'Hot Products', products: 4 },
  ];

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

  return (
    <div className="collections-page">
      <div className="collections-content">
        <div className="collections-table-container">
          <div className="collections-tabs">
            <button className="tab-btn active">All</button>
            <button className="tab-btn add-tab">+</button>
            
            <div className="table-actions">
              <button className="icon-btn" title="Search">🔍</button>
              <button className="icon-btn" title="Filter">☰</button>
              <button className="icon-btn" title="Sort">⇅</button>
            </div>
          </div>

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
                  <tr key={collection.id} className={selectedCollections.includes(collection.id) ? 'selected' : ''}>
                    <td className="checkbox-col">
                      <input
                        type="checkbox"
                        checked={selectedCollections.includes(collection.id)}
                        onChange={() => toggleSelection(collection.id)}
                      />
                    </td>
                    <td>
                      <div className="collection-name">
                        <span className="drag-icon">⋮⋮</span>
                        <span>{collection.name}</span>
                      </div>
                    </td>
                    <td>{collection.products}</td>
                    <td></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="table-footer">
            <a href="#" className="learn-more-link">Learn more about collections</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Collections;

