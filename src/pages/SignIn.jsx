import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPasswordField, setShowPasswordField] = useState(false);
  const { signIn, signInWithProvider } = useAuth();
  const navigate = useNavigate();

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setError('Please enter your email');
      return;
    }

    if (!showPasswordField) {
      setShowPasswordField(true);
      return;
    }

    if (!password) {
      setError('Please enter your password');
      return;
    }

    setError('');
    setLoading(true);

    const { data, error: signInError } = await signIn(email, password);

    if (signInError) {
      setError(signInError.message);
      setLoading(false);
    } else {
      navigate('/admin/dashboard');
    }
  };

  const handleSocialLogin = async (provider) => {
    setError('');
    setLoading(true);
    
    const { error: socialError } = await signInWithProvider(provider);
    
    if (socialError) {
      setError(socialError.message);
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="shopify-logo">
          <svg width="120" height="34" viewBox="0 0 120 34" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M95.4 0C95.1 0 94.9 0.2 94.8 0.4L92.6 11.8C91.9 11.5 91.1 11.3 90.2 11.3C87.3 11.3 86.1 13.2 86.1 15.3C86.1 18.1 87.7 19.9 90.1 19.9C91.8 19.9 92.8 19.1 93.6 18.2L93.5 18.8C93.5 19.1 93.6 19.3 93.9 19.3H96.9C97.2 19.3 97.5 19.1 97.5 18.7L99.4 0.6C99.4 0.3 99.3 0 99 0H95.4ZM93.1 15C92.6 15.9 91.8 16.5 90.9 16.5C90 16.5 89.5 15.9 89.5 14.9C89.5 13.5 90.2 12.5 91.5 12.5C92.1 12.5 92.7 12.7 93.2 12.9L93.1 15Z" fill="#95BF47"/>
            <path d="M24.3 11.3C22.9 11.3 21.9 11.9 21.1 12.7L21 11.9C21 11.6 20.8 11.4 20.5 11.4H17.8C17.5 11.4 17.2 11.6 17.2 12L15.3 23.7C15.3 24 15.4 24.2 15.7 24.2H18.8C19.1 24.2 19.4 24 19.4 23.6L20.4 18.1C20.7 16.2 21.6 15.2 23 15.2C23.4 15.2 23.7 15.2 24 15.3L24.4 11.5C24.4 11.4 24.3 11.3 24.3 11.3Z" fill="#5E8E3E"/>
            <path d="M79.4 11.4C76.3 11.4 74.1 13.5 74.1 16.9C74.1 19.3 75.5 20.9 78 20.9C81 20.9 83.3 18.8 83.3 15.4C83.3 13.1 81.9 11.4 79.4 11.4ZM78.7 17.9C77.8 17.9 77.3 17.3 77.3 16.3C77.3 14.9 78.1 13.5 79.5 13.5C80.4 13.5 80.9 14.1 80.9 15.1C80.9 16.5 80.1 17.9 78.7 17.9Z" fill="#5E8E3E"/>
            <path d="M69.1 11.4C66.8 11.4 65.3 12.5 64.5 14.3L64.6 11.9C64.6 11.6 64.4 11.4 64.1 11.4H61.3C61 11.4 60.7 11.6 60.7 12L58.8 23.7C58.8 24 58.9 24.2 59.2 24.2H62.3C62.6 24.2 62.9 24 62.9 23.6L63.9 18.2C64.2 16.4 65.3 15.2 66.8 15.2C67.9 15.2 68.5 15.8 68.5 17C68.5 17.4 68.5 17.8 68.4 18.2L67.5 23.7C67.5 24 67.6 24.2 67.9 24.2H71C71.3 24.2 71.6 24 71.6 23.6L72.6 17.7C72.7 17.2 72.8 16.6 72.8 16C72.8 13 71.4 11.4 69.1 11.4Z" fill="#5E8E3E"/>
            <path d="M51.8 11.4C48.7 11.4 46.5 13.5 46.5 16.9C46.5 19.3 47.9 20.9 50.4 20.9C53.4 20.9 55.7 18.8 55.7 15.4C55.7 13.1 54.3 11.4 51.8 11.4ZM51.1 17.9C50.2 17.9 49.7 17.3 49.7 16.3C49.7 14.9 50.5 13.5 51.9 13.5C52.8 13.5 53.3 14.1 53.3 15.1C53.3 16.5 52.5 17.9 51.1 17.9Z" fill="#5E8E3E"/>
            <path d="M42.8 7.2C41.8 7.2 41 7.6 40.5 8.4L40.6 7.7C40.6 7.4 40.4 7.2 40.1 7.2H37.3C37 7.2 36.7 7.4 36.7 7.8L33.9 23.7C33.9 24 34 24.2 34.3 24.2H37.4C37.7 24.2 38 24 38 23.6L39.3 16.5C39.7 14.3 40.7 13.2 42.3 13.2C42.6 13.2 42.9 13.2 43.2 13.3L43.7 7.4C43.2 7.3 43 7.2 42.8 7.2Z" fill="#5E8E3E"/>
            <path d="M30.5 7.2C29.9 7.2 29.4 7.6 29.4 8.2C29.4 9 30 9.4 30.6 9.4C31.2 9.4 31.7 9 31.7 8.4C31.7 7.6 31.1 7.2 30.5 7.2Z" fill="#5E8E3E"/>
            <path d="M30.9 11.4H28.1C27.8 11.4 27.5 11.6 27.5 12L25.6 23.7C25.6 24 25.7 24.2 26 24.2H29.1C29.4 24.2 29.7 24 29.7 23.6L31.6 11.9C31.6 11.6 31.5 11.4 30.9 11.4Z" fill="#5E8E3E"/>
            <path d="M113.6 7.2H110.5C110.2 7.2 109.9 7.4 109.9 7.8L109.7 9.4L109.4 9C108.5 7.7 106.8 7.2 105.1 7.2C101.7 7.2 98.8 10 98.8 13.9C98.8 16.6 100.4 18.5 103 18.5C104.6 18.5 105.8 17.8 106.7 16.7L106.6 17.2C106.6 17.5 106.7 17.7 107 17.7H109.7C110 17.7 110.3 17.5 110.3 17.1L112.3 7.7C112.3 7.4 112.2 7.2 113.6 7.2ZM107.6 13.7C107.6 15.2 106.6 16.4 105.2 16.4C104 16.4 103.3 15.6 103.3 14.3C103.3 12.4 104.4 11.1 106 11.1C106.7 11.1 107.3 11.4 107.7 11.9C108 12.3 108.1 12.9 107.6 13.7Z" fill="#5E8E3E"/>
            <path d="M119.5 11.4C118.9 11.4 118.5 11.7 118.2 12.3L115.6 17L114.4 12.4C114.3 12 114 11.8 113.6 11.8H110.7C110.4 11.8 110.2 12.1 110.3 12.4L113.1 22.6L110.5 26.6C110.3 26.9 110.5 27.3 110.8 27.3H113.9C114.5 27.3 114.9 27 115.2 26.4L123.9 12.4C124.1 12.1 123.9 11.7 123.6 11.7L119.5 11.4Z" fill="#5E8E3E"/>
            <path d="M11.3 3.8C11.3 3.7 11.2 3.6 11.1 3.6C11 3.6 9.1 3.6 9.1 3.6C9.1 3.6 7.5 2 7.3 1.8C7.1 1.6 6.7 1.7 6.6 1.7C6.6 1.7 6.3 1.8 5.9 1.9C5.8 1.5 5.6 1 5.3 0.5C4.6 -0.5 3.6 -0.1 3.2 0.1C3.2 0.1 3.1 0.2 3.1 0.2C2.9 0.3 2.7 0.4 2.5 0.5C2 0.3 1.4 0.2 0.8 0.2C-0.7 0.2 -1.5 1 -1.8 2.1C-3.5 2.6 -4.6 3 -4.7 3C-5.3 3.2 -5.4 3.2 -5.5 3.8C-5.5 4.2 -7.3 19.4 -7.3 19.4L7.4 21.7L16.2 19.8C16.2 19.8 11.3 4 11.3 3.8ZM5.2 2.2C4.8 2.3 4.4 2.5 3.9 2.6C3.9 2 3.8 1.4 3.6 0.9C4.5 1 5 1.5 5.2 2.2ZM3.2 3C2.4 3.3 1.5 3.5 0.7 3.8C0.9 2.9 1.4 2.2 2 1.8C2.1 1.7 2.3 1.6 2.4 1.5C2.7 2.1 2.9 2.6 3.2 3ZM2.4 0.6C2.5 0.6 2.6 0.6 2.7 0.7C2.6 0.7 2.5 0.8 2.3 0.9C1.6 1.4 1 2.3 0.8 3.5C0.1 3.7 -0.6 3.9 -1.2 4.1C-0.8 2.4 0.3 0.7 2.4 0.6Z" fill="#95BF47"/>
            <path d="M11.1 3.6C11 3.6 9.1 3.6 9.1 3.6C9.1 3.6 7.5 2 7.3 1.8C7.2 1.7 7.1 1.7 7 1.7V21.7L16.2 19.8C16.2 19.8 11.3 4 11.3 3.8C11.3 3.7 11.2 3.6 11.1 3.6Z" fill="#5E8E3E"/>
            <path d="M5.3 7.1L4.6 9.5C4.6 9.5 3.9 9.2 3.1 9.2C1.9 9.2 1.8 9.9 1.8 10.1C1.8 11.3 4.5 11.8 4.5 14.5C4.5 16.6 3.2 17.9 1.5 17.9C-0.5 17.9 -1.6 16.7 -1.6 16.7L-1.1 14.7C-1.1 14.7 -0 15.6 0.9 15.6C1.5 15.6 1.7 15.1 1.7 14.8C1.7 13.3 -0.6 13.2 -0.6 10.7C-0.6 8.7 0.7 6.7 3.3 6.7C4.3 6.7 5.3 7.1 5.3 7.1Z" fill="white"/>
          </svg>
        </div>

        <h1 className="auth-title">Log in</h1>
        <p className="auth-subtitle">Continue to Shopify</p>

        {error && <div className="error-message">{error}</div>}

        <form className="auth-form" onSubmit={handleEmailSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder=""
              disabled={loading}
            />
          </div>

          {showPasswordField && (
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input 
                type="password" 
                id="password" 
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder=""
                disabled={loading}
                autoFocus
              />
            </div>
          )}

          <button 
            type="submit" 
            className={`btn-primary ${email ? 'btn-primary-dark' : ''}`}
            disabled={loading || !email}
          >
            {loading ? 'Loading...' : showPasswordField ? 'Sign in' : 'Continue with email'}
          </button>

          <div className="divider">
            <span>or</span>
          </div>

          <div className="social-buttons">
            <button 
              type="button" 
              className="btn-social" 
              onClick={() => handleSocialLogin('apple')}
              disabled={loading}
              title="Sign in with Apple"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M17.5 9C17.5 13.7 13.7 17.5 9 17.5C4.3 17.5 0.5 13.7 0.5 9C0.5 4.3 4.3 0.5 9 0.5C13.7 0.5 17.5 4.3 17.5 9Z" fill="#000"/>
                <path d="M9 5.5C10.4 5.5 11.5 6.6 11.5 8C11.5 9.4 10.4 10.5 9 10.5C7.6 10.5 6.5 9.4 6.5 8C6.5 6.6 7.6 5.5 9 5.5Z" fill="#fff"/>
              </svg>
            </button>
            <button 
              type="button" 
              className="btn-social"
              onClick={() => handleSocialLogin('facebook')}
              disabled={loading}
              title="Sign in with Facebook"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M18 9C18 4 14 0 9 0C4 0 0 4 0 9C0 13.5 3.3 17.2 7.5 17.9V11.6H5.3V9H7.5V7C7.5 4.8 8.9 3.5 10.9 3.5C11.9 3.5 12.9 3.7 12.9 3.7V5.8H11.8C10.7 5.8 10.4 6.5 10.4 7.2V9H12.8L12.4 11.6H10.4V17.9C14.7 17.2 18 13.5 18 9Z" fill="#1877F2"/>
              </svg>
            </button>
            <button 
              type="button" 
              className="btn-social"
              onClick={() => handleSocialLogin('google')}
              disabled={loading}
              title="Sign in with Google"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M17.6 9.2C17.6 8.6 17.5 8 17.5 7.5H9V10.7H13.8C13.6 11.7 13 12.5 12.2 13V15H15C16.5 13.6 17.6 11.6 17.6 9.2Z" fill="#4285F4"/>
                <path d="M9 17.5C11.2 17.5 13 16.8 15 15L12.2 13C11.5 13.5 10.6 13.8 9 13.8C6.9 13.8 5.1 12.4 4.5 10.5H1.6V12.6C3.1 15.6 5.9 17.5 9 17.5Z" fill="#34A853"/>
                <path d="M4.5 10.5C4.3 10 4.2 9.5 4.2 9C4.2 8.5 4.3 8 4.5 7.5V5.4H1.6C1.1 6.4 0.8 7.7 0.8 9C0.8 10.3 1.1 11.6 1.6 12.6L4.5 10.5Z" fill="#FBBC05"/>
                <path d="M9 4.2C10.7 4.2 12.2 4.8 13.4 5.9L15.8 3.5C14.2 2 12.1 1 9 1C5.9 1 3.1 2.9 1.6 5.9L4.5 8C5.1 6.1 6.9 4.7 9 4.2Z" fill="#EA4335"/>
              </svg>
            </button>
          </div>
        </form>

        <div className="auth-footer-link">
          New to Shopify? <Link to="/admin/signup">Get started →</Link>
        </div>

        <div className="auth-footer-links">
          <a href="#">Help</a>
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
