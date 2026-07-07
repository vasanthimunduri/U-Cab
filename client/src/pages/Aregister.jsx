import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Aregister() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/admin/register', { name, email, password });
      navigate('/alogin');
    } catch (err) {
      alert(err.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'transparent' }}>
      <nav style={{ backgroundColor: 'var(--color-primary)', padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0, color: 'var(--color-text)' }}>Admin Portal</h2>
        <Link to="/alogin" style={{ color: 'var(--color-text)', textDecoration: 'none', fontWeight: 'bold' }}>Login Admin</Link>
      </nav>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '80px' }}>
        <div style={{ backgroundColor: 'var(--color-surface)', padding: '40px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', width: '400px', textAlign: 'center' }}>
          <h2>Admin Register</h2>
          <form onSubmit={handleRegister}>
            <input type="text" placeholder="Admin Name" value={name} onChange={(e) => setName(e.target.value)} required style={{ width: '100%', padding: '10px', margin: '10px 0', border: '1px solid #ccc', borderRadius: '4px' }} />
            <input type="email" placeholder="Admin Email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: '100%', padding: '10px', margin: '10px 0', border: '1px solid #ccc', borderRadius: '4px' }} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: '100%', padding: '10px', margin: '10px 0', border: '1px solid #ccc', borderRadius: '4px' }} />
            <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: 'var(--color-text)', color: 'var(--color-surface)', border: 'none', borderRadius: '4px', cursor: 'pointer', marginTop: '10px' }}>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
}
