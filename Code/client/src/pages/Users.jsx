import { useState, useEffect } from 'react';
import Anav from '../components/Anav';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/admin/users', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUsers(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'transparent' }}>
      <Anav />
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h1>Users List</h1>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <table style={{ width: '80%', backgroundColor: 'var(--color-surface)', borderCollapse: 'collapse', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--color-primary)' }}>
                <th style={{ padding: '15px' }}>Name</th>
                <th style={{ padding: '15px' }}>Email</th>
                <th style={{ padding: '15px' }}>Phone</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u._id} style={{ borderBottom: '1px solid #ccc' }}>
                  <td style={{ padding: '15px' }}>{u.name}</td>
                  <td style={{ padding: '15px' }}>{u.email}</td>
                  <td style={{ padding: '15px' }}>{u.phone || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
