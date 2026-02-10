/* LoginPage Component */
function LoginPage({ onLogin }) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === TEST_USER.username && password === TEST_USER.password) {
      onLogin(TEST_USER);
    } else {
      setError('Invalid username or password. Please try again.');
    }
  };

  return (
    <div className="login-page">
      <div className="login-header">
        <div className="login-logo">
          <div className="shield">SS</div>
          <span>SecureShield</span>
        </div>
      </div>
      <div className="login-body">
        <div className="login-card">
          <h2>Welcome Back</h2>
          <p className="subtitle">Sign in to manage your accounts and policies.</p>
          {error && <div className="login-error">⚠️ {error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input id="username" type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Enter your username" autoComplete="username" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter your password" autoComplete="current-password" />
            </div>
            <button type="submit" className="login-btn">Log In</button>
          </form>
          <div className="login-hint">
            <strong>Test Credentials:</strong><br/>
            Username: <code>elizabeth.morgan</code><br/>
            Password: <code>Test1234!</code>
          </div>
        </div>
      </div>
      <div className="login-footer">
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Service</a>
        <a href="#">Contact Us</a>
      </div>
    </div>
  );
}
