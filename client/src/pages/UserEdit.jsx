import { useState, useEffect } from 'react';
import Anav from '../components/Anav';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function UserEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: '', email: '', phone: '' });

  useEffect(() => {
    // In a full implementation, you would fetch the user by ID
    // For now, this is a placeholder UI
    setUser({ name: 'Placeholder User', email: 'user@example.com', phone: '1234567890' });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('User edit functionality would be implemented here.');
    navigate('/users');
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'transparent' }}>
      <Anav />
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
        <div style={{ backgroundColor: 'var(--color-surface)', padding: '40px', borderRadius: '10px', width: '400px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
          <h2 style={{ textAlign: 'center' }}>Edit User</h2>
          <form onSubmit={handleSubmit}>
            <label>Name</label>
            <input type="text" value={user.name} onChange={e => setUser({...user, name: e.target.value})} style={{ width: '100%', padding: '10px', margin: '5px 0 15px' }} />
            <label>Email</label>
            <input type="email" value={user.email} onChange={e => setUser({...user, email: e.target.value})} style={{ width: '100%', padding: '10px', margin: '5px 0 15px' }} />
            <label>Phone</label>
            <input type="text" value={user.phone} onChange={e => setUser({...user, phone: e.target.value})} style={{ width: '100%', padding: '10px', margin: '5px 0 15px' }} />
            <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: 'var(--color-primary)', color: 'var(--color-text)', border: 'none', borderRadius: '4px', fontWeight: 'bold' }}>Save Changes</button>
          </form>
        </div>
      </div>
    </div>
  );
}
