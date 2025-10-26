import { useState } from 'react';
import './Inventory.css';

function Inventory() {
  const [selectedItems, setSelectedItems] = useState([]);

  const inventoryItems = [
    { id: 1, name: 'Astronaut Projector 40.00', image: '👨‍🚀', sku: 'ATP-BLK-HAE-ZAM', unavailable: 0, committed: 0, available: 889, onHand: 889 },
    { id: 2, name: 'Auto Rebound Abs Wheel', image: '⚙️', sku: 'ARW-N-FE-ZAM', unavailable: 0, committed: 0, available: 99, onHand: 99 },
    { id: 3, name: 'Baby Foldable Backpack', image: '🎒', sku: 'BFD-N-GF-ZAM', unavailable: 0, committed: 0, available: 88, onHand: 88 },
    { id: 4, name: 'Baby Nail Trimmer', image: '💅', sku: 'BNT-N-GF-ZAM', unavailable: 0, committed: 0, available: 100, onHand: 100 },
    { id: 5, name: 'Curling Straightener', image: '💇', sku: 'CSE-N-GF-ZAM-KSA', unavailable: 0, committed: 0, available: 100, onHand: 100 },
    { id: 6, name: 'Electric Clothes Drying Machine', image: '👕', sku: 'CDM-N-HAE-ZAM', unavailable: 0, committed: 0, available: 100, onHand: 100 },
    { id: 7, name: 'Footbath Massage Bucket', image: '🦶', sku: 'FMB-N-GF-ZAM', unavailable: 0, committed: 0, available: 99, onHand: 99 },
    { id: 8, name: 'Inflatable Bubble Ball', image: '⚽', sku: 'IBB-N-TY-ZAM', unavailable: 0, committed: 0, available: 99, onHand: 99 },
    { id: 9, name: 'Nano Spray Disinfectant Mist Gun', image: '🔫', sku: 'NSD-N-HAE-ZAM-SMR', unavailable: 0, committed: 0, available: 100, onHand: 100 },
    { id: 10, name: 'Portable Juicer Bottle', image: '🧃', sku: 'PJB-N-KA-ZAM-KSA', unavailable: 0, committed: 0, available: 100, onHand: 100 },
  ];

  const toggleSelection = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(iid => iid !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const toggleSelectAll = () => {
    if (selectedItems.length === inventoryItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(inventoryItems.map(i => i.id));
    }
  };

  return (
    <div className="inventory-page">
      <div className="inventory-content">
        <div className="inventory-table-container">
          <div className="inventory-tabs">
            <button className="tab-btn active">All</button>
            <button className="tab-btn add-tab">+</button>
            
            <div className="table-actions">
              <button className="icon-btn" title="Search">🔍</button>
              <button className="icon-btn" title="Filter">☰</button>
              <button className="icon-btn" title="View">▦</button>
              <button className="icon-btn" title="Sort">⇅</button>
            </div>
          </div>

          <div className="inventory-table-wrapper">
            <table className="inventory-table">
              <thead>
                <tr>
                  <th className="checkbox-col">
                    <input
                      type="checkbox"
                      checked={selectedItems.length === inventoryItems.length}
                      onChange={toggleSelectAll}
                    />
                  </th>
                  <th className="product-col">
                    Product <span className="sort-arrow">▲</span>
                  </th>
                  <th>SKU</th>
                  <th>Unavailable</th>
                  <th>Committed</th>
                  <th>Available</th>
                  <th>On hand</th>
                </tr>
              </thead>
              <tbody>
                {inventoryItems.map((item) => (
                  <tr key={item.id} className={selectedItems.includes(item.id) ? 'selected' : ''}>
                    <td className="checkbox-col">
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(item.id)}
                        onChange={() => toggleSelection(item.id)}
                      />
                    </td>
                    <td className="product-col">
                      <div className="product-info">
                        <div className="product-image">{item.image}</div>
                        <span className="product-name">{item.name}</span>
                      </div>
                    </td>
                    <td className="sku-col">{item.sku}</td>
                    <td className="number-col">{item.unavailable}</td>
                    <td className="number-col">{item.committed}</td>
                    <td className="editable-col">
                      <input type="number" className="inventory-input" value={item.available} readOnly />
                    </td>
                    <td className="editable-col">
                      <input type="number" className="inventory-input" value={item.onHand} readOnly />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="table-pagination">
            <div className="pagination-controls">
              <button className="pagination-btn" disabled>‹</button>
              <button className="pagination-btn" disabled>›</button>
              <span className="pagination-text">1-10</span>
            </div>
          </div>

          <div className="table-footer">
            <a href="#" className="learn-more-link">Learn more about managing inventory</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Inventory;

