import { useState } from 'react';
import './Account.css';

function Account() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login/register logic here
    alert(isLogin ? 'Login functionality coming soon!' : 'Registration functionality coming soon!');
  };

  return (
    <div className="account">
      <div className="account-container">
        <div className="account-form">
          <h1>{isLogin ? 'Login' : 'Create Account'}</h1>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="submit-btn">
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <div className="account-toggle">
            {isLogin ? (
              <>
                Don't have an account?{' '}
                <button onClick={() => setIsLogin(false)}>Sign up</button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button onClick={() => setIsLogin(true)}>Sign in</button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;

