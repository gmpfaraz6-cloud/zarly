import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getGiftCards, getStore } from '../lib/supabase-queries';
import './GiftCards.css';

function GiftCards() {
  const { user } = useAuth();
  const [giftCards, setGiftCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [store, setStore] = useState(null);

  useEffect(() => {
    if (user) {
      loadStoreAndGiftCards();
    }
  }, [user]);

  const loadStoreAndGiftCards = async () => {
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

      const giftCardsData = await getGiftCards(storeData.id);
      setGiftCards(giftCardsData || []);
    } catch (err) {
      console.error('Error loading gift cards:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="giftcards-page">
        <div className="giftcards-loading">
          <div className="loading-spinner"></div>
          <p>Loading gift cards...</p>
        </div>
      </div>
    );
  }

  if (error || giftCards.length === 0) {
    return (
      <div className="giftcards-page">
        <div className="giftcards-content">
          <div className="giftcards-empty-state">
            <div className="empty-state-icon">🎁</div>
            <h2 className="empty-state-title">Manage gift cards</h2>
            <p className="empty-state-description">
              Issue gift cards to customers for store credit
            </p>
            <button className="empty-state-button">Issue gift card</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="giftcards-page">
      <div className="giftcards-content">
        <div className="giftcards-table-section">
          <div className="table-header">
            <h2>Gift cards ({giftCards.length})</h2>
            <button className="btn-primary">Issue gift card</button>
          </div>

          <div className="giftcards-table-wrapper">
            <table className="giftcards-table">
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Customer</th>
                  <th>Initial value</th>
                  <th>Balance</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {giftCards.map((card) => (
                  <tr key={card.id}>
                    <td className="card-code">{card.code}</td>
                    <td>{card.customers ? `${card.customers.first_name} ${card.customers.last_name}` : '—'}</td>
                    <td>${parseFloat(card.initial_value).toFixed(2)}</td>
                    <td>${parseFloat(card.balance).toFixed(2)}</td>
                    <td>
                      <span className={`status-badge ${card.status}`}>
                        {card.status}
                      </span>
                    </td>
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

export default GiftCards;
