import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/uhome');
    } catch (err) {
      alert(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'transparent' }}>
      <nav style={{ backgroundColor: 'var(--color-primary)', padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0, color: 'var(--color-text)' }}>Cab Booking App</h2>
        <Link to="/register" style={{ color: 'var(--color-text)', textDecoration: 'none', fontWeight: 'bold' }}>Register</Link>
      </nav>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '80px' }}>
        <div style={{ backgroundColor: 'var(--color-surface)', padding: '40px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', width: '400px', textAlign: 'center' }}>
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <input type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: '100%', padding: '10px', margin: '10px 0', border: '1px solid #ccc', borderRadius: '4px' }} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: '100%', padding: '10px', margin: '10px 0', border: '1px solid #ccc', borderRadius: '4px' }} />
            <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: 'var(--color-text)', color: 'var(--color-surface)', border: 'none', borderRadius: '4px', cursor: 'pointer', marginTop: '10px' }}>Login</button>
          </form>
          <p style={{ marginTop: '20px' }}>Don't have an account?</p>
          <Link to="/register" style={{ display: 'block', width: '100%', padding: '10px', backgroundColor: 'var(--color-primary)', color: 'var(--color-text)', textDecoration: 'none', borderRadius: '4px', boxSizing: 'border-box' }}>Signup</Link>
        </div>
      </div>
    </div>
  );
}
