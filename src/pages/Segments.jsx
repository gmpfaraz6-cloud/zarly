import { useState } from 'react';
import './Segments.css';

function Segments() {
  const [selectedSegments, setSelectedSegments] = useState([]);
  
  const segments = [
    {
      id: 1,
      name: 'Customers who have purchased at least once',
      customers: '',
      lastActivity: 'Created on Aug 10, 2025',
      createdBy: 'Shopify'
    },
    {
      id: 2,
      name: 'Email subscribers',
      customers: '',
      lastActivity: 'Created on Aug 10, 2025',
      createdBy: 'Shopify'
    },
    {
      id: 3,
      name: 'Abandoned checkouts in the last 30 days',
      customers: '',
      lastActivity: 'Created on Aug 10, 2025',
      createdBy: 'Shopify'
    },
    {
      id: 4,
      name: 'Customers who have purchased more than once',
      customers: '',
      lastActivity: 'Created on Aug 10, 2025',
      createdBy: 'Shopify'
    },
    {
      id: 5,
      name: "Customers who haven't purchased",
      customers: '',
      lastActivity: 'Created on Aug 10, 2025',
      createdBy: 'Shopify'
    }
  ];

  const toggleSelectAll = () => {
    if (selectedSegments.length === segments.length) {
      setSelectedSegments([]);
    } else {
      setSelectedSegments(segments.map(s => s.id));
    }
  };

  const toggleSegment = (id) => {
    if (selectedSegments.includes(id)) {
      setSelectedSegments(selectedSegments.filter(sId => sId !== id));
    } else {
      setSelectedSegments([...selectedSegments, id]);
    }
  };

  const handleSegmentClick = (name) => {
    alert(`Opening segment: ${name}\nThis would show all customers in this segment with their details.`);
  };

  const handleMoreActions = (name) => {
    alert(`More actions for: ${name}\nOptions:\n- Edit segment\n- Duplicate segment\n- Delete segment\n- Export customers`);
  };

  return (
    <div className="segments-page">
      <div className="segments-content">
        <div className="segments-search-bar">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="search-icon">
            <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            <path d="M11 11L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <input 
            type="text" 
            placeholder="Search segments" 
            className="segments-search-input"
          />
        </div>

        <div className="segments-table-container">
          <table className="segments-table">
            <thead>
              <tr>
                <th className="checkbox-col">
                  <input 
                    type="checkbox" 
                    checked={selectedSegments.length === segments.length}
                    onChange={toggleSelectAll}
                  />
                </th>
                <th className="name-col">Name</th>
                <th className="customers-col">% of customers</th>
                <th className="activity-col">
                  Last activity
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" className="sort-icon">
                    <path d="M6 8l-3-3h6l-3 3z"/>
                  </svg>
                </th>
                <th className="created-col">Created by</th>
                <th className="actions-col"></th>
              </tr>
            </thead>
            <tbody>
              {segments.map((segment) => (
                <tr key={segment.id}>
                  <td className="checkbox-col">
                    <input 
                      type="checkbox"
                      checked={selectedSegments.includes(segment.id)}
                      onChange={() => toggleSegment(segment.id)}
                    />
                  </td>
                  <td className="name-col">
                    <a href="#" className="segment-name-link" onClick={(e) => { e.preventDefault(); handleSegmentClick(segment.name); }}>{segment.name}</a>
                  </td>
                  <td className="customers-col">{segment.customers}</td>
                  <td className="activity-col">{segment.lastActivity}</td>
                  <td className="created-col">
                    <div className="created-by">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shopify-icon">
                        <rect width="16" height="16" rx="3" fill="#95BF47"/>
                        <path d="M10.5 4.5c0-.3-.2-.5-.5-.5h-.3c-.1-.6-.4-1-1-1-.1 0-.2 0-.3.1-.2-.2-.4-.3-.7-.3-.5 0-1 .4-1.2 1H6c-.3 0-.5.2-.5.5v.1L4 5.2v4.3c0 .3.2.5.5.5h7c.3 0 .5-.2.5-.5V5.2l-1.5-.8v-.4zm-2.8-.8c.2 0 .3.1.4.2-.3.1-.5.3-.7.6 0-.4.1-.8.3-.8zm1 0c.2 0 .3.3.3.7-.2-.3-.4-.5-.7-.6.1-.1.2-.1.4-.1z" fill="white"/>
                      </svg>
                      <span>{segment.createdBy}</span>
                    </div>
                  </td>
                  <td className="actions-col">
                    <button className="more-actions-icon" onClick={() => handleMoreActions(segment.name)}>⋯</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="segments-footer">
          <a href="#" className="learn-more-link">Learn more about segments</a>
        </div>
      </div>
    </div>
  );
}

export default Segments;

