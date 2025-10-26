import { useState } from 'react';
import { useToast } from './Toast';
import './Newsletter.css';

function Newsletter() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { success, error } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      error('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      success('Successfully subscribed! Check your email for 10% OFF code', {
        duration: 5000
      });
      setEmail('');
      
      setTimeout(() => setIsSuccess(false), 3000);
    }, 1000);
  };

  return (
    <section className="newsletter-section">
      <div className="newsletter-container">
        <div className="newsletter-content">
          <div className="newsletter-text">
            <h2 className="newsletter-title">Get 10% Off Your First Order</h2>
            <p className="newsletter-description">
              Subscribe to our newsletter for exclusive deals, new arrivals, and insider updates.
            </p>
          </div>

          <form className="newsletter-form" onSubmit={handleSubmit}>
            <div className="newsletter-input-wrapper">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="newsletter-icon">
                <rect x="2" y="4" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M2 6l8 5 8-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="newsletter-input"
                required
              />
            </div>
            <button
              type="submit"
              className="newsletter-button"
              disabled={isLoading || isSuccess}
            >
              {isLoading ? 'Subscribing...' : isSuccess ? 'Subscribed!' : 'Subscribe'}
            </button>
          </form>

          <p className="newsletter-privacy">
            By subscribing, you agree to our{' '}
            <a href="/privacy" className="privacy-link">Privacy Policy</a>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Newsletter;

