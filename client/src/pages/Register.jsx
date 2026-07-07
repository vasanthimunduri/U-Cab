import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await register(name, email, password);
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'transparent' }}>
      <nav style={{ backgroundColor: 'var(--color-primary)', padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0, color: 'var(--color-text)' }}>Cab Booking App</h2>
        <Link to="/login" style={{ color: 'var(--color-text)', textDecoration: 'none', fontWeight: 'bold' }}>Login</Link>
      </nav>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '80px' }}>
        <div style={{ backgroundColor: 'var(--color-surface)', padding: '40px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', width: '400px', textAlign: 'center' }}>
          <h2>Register</h2>
          <form onSubmit={handleRegister}>
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required style={{ width: '100%', padding: '10px', margin: '10px 0', border: '1px solid #ccc', borderRadius: '4px' }} />
            <input type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: '100%', padding: '10px', margin: '10px 0', border: '1px solid #ccc', borderRadius: '4px' }} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: '100%', padding: '10px', margin: '10px 0', border: '1px solid #ccc', borderRadius: '4px' }} />
            <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: 'var(--color-text)', color: 'var(--color-surface)', border: 'none', borderRadius: '4px', cursor: 'pointer', marginTop: '10px' }}>Signup</button>
          </form>
          <p style={{ marginTop: '20px' }}>Already have an account?</p>
          <Link to="/login" style={{ display: 'block', width: '100%', padding: '10px', backgroundColor: 'var(--color-primary)', color: 'var(--color-text)', textDecoration: 'none', borderRadius: '4px', boxSizing: 'border-box' }}>Login</Link>
        </div>
      </div>
    </div>
  );
}
