import { useState, useEffect } from 'react';
import Dnav from '../components/Dnav';
import axios from 'axios';

export default function DriverDashboard() {
  const [rides, setRides] = useState([]);
  const [driver, setDriver] = useState(JSON.parse(localStorage.getItem('driver')));

  useEffect(() => {
    fetchRides();
  }, []);

  const fetchRides = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/drivers/rides', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRides(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/drivers/rides/${id}/status`, { status }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchRides(); // Refresh list
    } catch (err) {
      console.error(err);
    }
  };

  const getStatusButton = (ride) => {
    if (ride.status === 'Pending') {
      return (
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={() => handleUpdateStatus(ride._id, 'Accepted')} style={{ backgroundColor: 'var(--color-success)' }}>Accept</button>
          <button onClick={() => handleUpdateStatus(ride._id, 'Rejected')} style={{ backgroundColor: 'var(--color-danger)' }}>Reject</button>
        </div>
      );
    } else if (ride.status === 'Accepted') {
      return <button onClick={() => handleUpdateStatus(ride._id, 'Started')} style={{ backgroundColor: 'var(--color-primary)' }}>Start Ride</button>;
    } else if (ride.status === 'Started') {
      return <button onClick={() => handleUpdateStatus(ride._id, 'Completed')} style={{ backgroundColor: 'var(--color-success)' }}>Complete Ride</button>;
    }
    return <span className={`status status--${ride.status.toLowerCase()}`}>{ride.status}</span>;
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'transparent' }}>
      <Dnav />
      <div className="page" style={{ padding: '40px' }}>
        <h1 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '30px' }}>Driver Dashboard</h1>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
          {rides.map(ride => (
            <div key={ride._id} className="glass-card" style={{ padding: '20px', width: '350px' }}>
              <h3 style={{ margin: '0 0 10px 0', borderBottom: '1px solid var(--color-border)', paddingBottom: '10px' }}>
                Ride Request
              </h3>
              <p><b>From:</b> {ride.pickupLocation}</p>
              <p><b>To:</b> {ride.dropLocation}</p>
              <p><b>Customer:</b> {ride.userId?.name} ({ride.userId?.phone})</p>
              <p><b>Date:</b> {new Date(ride.pickupDate).toLocaleString()}</p>
              <p><b>Fare:</b> ₹{ride.totalAmount}</p>
              
              <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
                {getStatusButton(ride)}
              </div>
            </div>
          ))}
          
          {rides.length === 0 && (
            <div className="glass-panel" style={{ padding: '40px', textAlign: 'center', width: '100%' }}>
              <h3>No assigned rides yet.</h3>
              <p style={{ color: 'var(--color-muted)' }}>When a user books a ride with your car, it will appear here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
