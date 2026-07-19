import { useState, useEffect } from 'react';
import Anav from '../components/Anav';
import axios from 'axios';

export default function Bookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/bookings/all', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setBookings(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBookings();
  }, []);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'transparent' }}>
      <Anav />
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem' }}>All Bookings</h1>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <div style={{ backgroundColor: 'var(--color-surface)', borderRadius: '10px', padding: '20px', width: '90%', overflowX: 'auto', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center' }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--color-primary)' }}>
                  <th style={{ padding: '15px' }}>User</th>
                  <th style={{ padding: '15px' }}>Pickup</th>
                  <th style={{ padding: '15px' }}>Drop</th>
                  <th style={{ padding: '15px' }}>Car No</th>
                  <th style={{ padding: '15px' }}>Amount</th>
                  <th style={{ padding: '15px' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map(b => (
                  <tr key={b._id}>
                    <td style={{ padding: '15px', borderBottom: '1px solid #eee' }}>{b.userId?.name}</td>
                    <td style={{ padding: '15px', borderBottom: '1px solid #eee' }}>{b.pickupLocation}</td>
                    <td style={{ padding: '15px', borderBottom: '1px solid #eee' }}>{b.dropLocation}</td>
                    <td style={{ padding: '15px', borderBottom: '1px solid #eee' }}>{b.carId?.plateNumber}</td>
                    <td style={{ padding: '15px', borderBottom: '1px solid #eee' }}>₹{b.totalAmount}</td>
                    <td style={{ padding: '15px', borderBottom: '1px solid #eee', color: '#c94a4a', fontWeight: 'bold' }}>{b.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
