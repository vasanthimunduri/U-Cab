import { useState, useEffect } from 'react';
import Unav from '../components/Unav';
import axios from 'axios';

export default function Mybookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/bookings/mybookings', {
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
      <Unav />
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem' }}>My Bookings</h1>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <div className="glass-panel" style={{ padding: '20px', width: '95%', overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center' }}>
              <thead>
                <tr>
                  <th style={{ padding: '15px', borderBottom: '1px solid var(--color-border)', fontSize: '0.9rem' }}>Cab Booked Date</th>
                  <th style={{ padding: '15px', borderBottom: '1px solid var(--color-border)', fontSize: '0.9rem' }}>Trip</th>
                  <th style={{ padding: '15px', borderBottom: '1px solid var(--color-border)', fontSize: '0.9rem' }}>Pickup</th>
                  <th style={{ padding: '15px', borderBottom: '1px solid var(--color-border)', fontSize: '0.9rem' }}>Drop</th>
                  <th style={{ padding: '15px', borderBottom: '1px solid var(--color-border)', fontSize: '0.9rem' }}>Driver</th>
                  <th style={{ padding: '15px', borderBottom: '1px solid var(--color-border)', fontSize: '0.9rem' }}>Car</th>
                  <th style={{ padding: '15px', borderBottom: '1px solid var(--color-border)', fontSize: '0.9rem' }}>Car Type</th>
                  <th style={{ padding: '15px', borderBottom: '1px solid var(--color-border)', fontSize: '0.9rem' }}>Car No</th>
                  <th style={{ padding: '15px', borderBottom: '1px solid var(--color-border)', fontSize: '0.9rem' }}>Amount Paid</th>
                  <th style={{ padding: '15px', borderBottom: '1px solid var(--color-border)', fontSize: '0.9rem' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map(b => (
                  <tr key={b._id}>
                    <td style={{ padding: '15px', borderBottom: '1px solid var(--color-border)', fontSize: '0.9rem' }}>{new Date(b.createdAt).toLocaleDateString()}</td>
                    <td style={{ padding: '15px', borderBottom: '1px solid var(--color-border)', fontSize: '0.9rem', fontWeight: '600' }}>{b.pickupLocation} &rarr; {b.dropLocation}</td>
                    <td style={{ padding: '15px', borderBottom: '1px solid var(--color-border)', fontSize: '0.9rem' }}>{new Date(b.pickupDate).toLocaleString()}</td>
                    <td style={{ padding: '15px', borderBottom: '1px solid var(--color-border)', fontSize: '0.9rem' }}>{new Date(b.dropDate).toLocaleString()}</td>
                    <td style={{ padding: '15px', borderBottom: '1px solid var(--color-border)', fontSize: '0.9rem' }}>{b.carId?.driverName}</td>
                    <td style={{ padding: '15px', borderBottom: '1px solid var(--color-border)', fontSize: '0.9rem' }}>{b.carId?.name}</td>
                    <td style={{ padding: '15px', borderBottom: '1px solid var(--color-border)', fontSize: '0.9rem' }}>{b.carId?.type}</td>
                    <td style={{ padding: '15px', borderBottom: '1px solid var(--color-border)', fontSize: '0.9rem' }}>{b.carId?.plateNumber}</td>
                    <td style={{ padding: '15px', borderBottom: '1px solid var(--color-border)', fontSize: '1rem', fontWeight: 'bold' }}>₹{b.totalAmount}</td>
                    <td style={{ padding: '15px', borderBottom: '1px solid var(--color-border)' }}>
                      <span className={`status status--${b.status.toLowerCase().replace(' ', '-')}`}>{b.status}</span>
                      {b.status === 'Completed' && (
                        <div style={{ marginTop: '10px' }}>
                          <button className="glass-button" style={{ fontSize: '0.8rem', padding: '4px 8px', backgroundColor: 'var(--color-primary)' }} onClick={() => alert(`Receipt for ${b._id}:\nTotal: ₹${b.totalAmount}`)}>Receipt</button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
                {bookings.length === 0 && (
                  <tr>
                    <td colSpan="10" style={{ padding: '20px' }}>No bookings found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
