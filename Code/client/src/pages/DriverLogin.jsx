import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function DriverLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/drivers/login', { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('driver', JSON.stringify(res.data.driver));
      navigate('/dhome');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="auth-page" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="auth-card glass-panel">
        <h2 style={{ textAlign: 'center', marginBottom: '10px' }}>Driver Login</h2>
        <p className="auth-subtitle" style={{ textAlign: 'center' }}>Welcome back, partner.</p>
        
        {error && <div className="form-error">{error}</div>}
        
        <form onSubmit={handleLogin}>
          <label>Email</label>
          <input type="email" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} required />
          
          <label>Password</label>
          <input type="password" placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} required />
          
          <button type="submit" style={{ width: '100%', marginTop: '10px' }}>Login</button>
        </form>
        
        <div className="auth-switch">
          Don't have a driver account? <Link to="/dregister">Apply here</Link>
        </div>
      </div>
    </div>
  );
}
