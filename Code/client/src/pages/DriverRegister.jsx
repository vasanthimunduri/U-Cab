import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function DriverRegister() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/drivers/register', { name, email, password });
      navigate('/dlogin');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div className="auth-page" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="auth-card glass-panel">
        <h2 style={{ textAlign: 'center', marginBottom: '10px' }}>Apply to Drive</h2>
        <p className="auth-subtitle" style={{ textAlign: 'center' }}>Join our team of drivers.</p>
        
        {error && <div className="form-error">{error}</div>}
        
        <form onSubmit={handleRegister}>
          <label>Full Name</label>
          <input type="text" placeholder="Enter your name" value={name} onChange={e => setName(e.target.value)} required />

          <label>Email</label>
          <input type="email" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} required />
          
          <label>Password</label>
          <input type="password" placeholder="Create a password" value={password} onChange={e => setPassword(e.target.value)} required />
          
          <button type="submit" style={{ width: '100%', marginTop: '10px' }}>Submit Application</button>
        </form>
        
        <div className="auth-switch">
          Already a driver? <Link to="/dlogin">Login</Link>
        </div>
      </div>
    </div>
  );
}
