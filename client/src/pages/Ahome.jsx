import { useState, useEffect } from 'react';
import Anav from '../components/Anav';
import axios from 'axios';

export default function Ahome() {
  const [usersCount, setUsersCount] = useState(0);
  const [cabsCount, setCabsCount] = useState(0);
  const [bookingsCount, setBookingsCount] = useState(0);
  const [driversCount, setDriversCount] = useState(0);
  const [totalEarnings, setTotalEarnings] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };
        
        const [usersRes, cabsRes, bookingsRes, driversRes] = await Promise.all([
          axios.get('http://localhost:5000/api/admin/users', { headers }),
          axios.get('http://localhost:5000/api/cars'),
          axios.get('http://localhost:5000/api/bookings/all', { headers }),
          axios.get('http://localhost:5000/api/admin/drivers', { headers })
        ]);
        
        setUsersCount(usersRes.data.length);
        setCabsCount(cabsRes.data.length);
        setBookingsCount(bookingsRes.data.length);
        setDriversCount(driversRes.data.length);
        
        const earnings = bookingsRes.data.reduce((acc, curr) => acc + (curr.status === 'Completed' ? curr.totalAmount : 0), 0);
        setTotalEarnings(earnings);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'transparent' }}>
      <Anav />
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem' }}>Dashboard</h1>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px', marginTop: '40px' }}>
          <div className="glass-card" style={{ padding: '30px', width: '200px', textAlign: 'center' }}>
            <h3 style={{ margin: '0 0 10px 0', color: 'var(--color-primary-dark)' }}>USERS</h3>
            <p style={{ fontSize: '2.5rem', margin: 0, fontWeight: 'bold' }}>{usersCount}</p>
          </div>
          <div className="glass-card" style={{ padding: '30px', width: '200px', textAlign: 'center' }}>
            <h3 style={{ margin: '0 0 10px 0', color: 'var(--color-primary-dark)' }}>CABS</h3>
            <p style={{ fontSize: '2.5rem', margin: 0, fontWeight: 'bold' }}>{cabsCount}</p>
          </div>
          <div className="glass-card" style={{ padding: '30px', width: '200px', textAlign: 'center' }}>
            <h3 style={{ margin: '0 0 10px 0', color: 'var(--color-primary-dark)' }}>DRIVERS</h3>
            <p style={{ fontSize: '2.5rem', margin: 0, fontWeight: 'bold' }}>{driversCount}</p>
          </div>
          <div className="glass-card" style={{ padding: '30px', width: '200px', textAlign: 'center' }}>
            <h3 style={{ margin: '0 0 10px 0', color: 'var(--color-primary-dark)' }}>BOOKINGS</h3>
            <p style={{ fontSize: '2.5rem', margin: 0, fontWeight: 'bold' }}>{bookingsCount}</p>
          </div>
          <div className="glass-card" style={{ padding: '30px', width: '200px', textAlign: 'center', backgroundColor: 'var(--color-success)' }}>
            <h3 style={{ margin: '0 0 10px 0', color: 'white' }}>EARNINGS</h3>
            <p style={{ fontSize: '2.5rem', margin: 0, fontWeight: 'bold', color: 'white' }}>₹{totalEarnings}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
