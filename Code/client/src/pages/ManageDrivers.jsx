import { useState, useEffect } from 'react';
import Anav from '../components/Anav';
import axios from 'axios';

export default function ManageDrivers() {
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/admin/drivers', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setDrivers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleApproval = async (id, currentStatus) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/admin/drivers/${id}/approve`, 
        { isApproved: !currentStatus }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchDrivers();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'transparent' }}>
      <Anav />
      <div className="page" style={{ padding: '40px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem' }}>Manage Drivers</h1>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <div className="glass-panel" style={{ padding: '20px', width: '90%', overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center' }}>
              <thead>
                <tr>
                  <th style={{ padding: '15px', borderBottom: '1px solid var(--color-border)' }}>Name</th>
                  <th style={{ padding: '15px', borderBottom: '1px solid var(--color-border)' }}>Email</th>
                  <th style={{ padding: '15px', borderBottom: '1px solid var(--color-border)' }}>Status</th>
                  <th style={{ padding: '15px', borderBottom: '1px solid var(--color-border)' }}>Earnings</th>
                  <th style={{ padding: '15px', borderBottom: '1px solid var(--color-border)' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {drivers.map(driver => (
                  <tr key={driver._id}>
                    <td style={{ padding: '15px', borderBottom: '1px solid var(--color-border)' }}>{driver.name}</td>
                    <td style={{ padding: '15px', borderBottom: '1px solid var(--color-border)' }}>{driver.email}</td>
                    <td style={{ padding: '15px', borderBottom: '1px solid var(--color-border)', color: driver.isApproved ? 'var(--color-success)' : 'var(--color-danger)', fontWeight: 'bold' }}>
                      {driver.isApproved ? 'Approved' : 'Pending'}
                    </td>
                    <td style={{ padding: '15px', borderBottom: '1px solid var(--color-border)' }}>₹{driver.totalEarnings}</td>
                    <td style={{ padding: '15px', borderBottom: '1px solid var(--color-border)' }}>
                      <button 
                        onClick={() => handleApproval(driver._id, driver.isApproved)}
                        style={{ backgroundColor: driver.isApproved ? 'var(--color-danger)' : 'var(--color-success)', color: 'white' }}
                      >
                        {driver.isApproved ? 'Suspend' : 'Approve'}
                      </button>
                    </td>
                  </tr>
                ))}
                {drivers.length === 0 && (
                  <tr><td colSpan="5" style={{ padding: '20px' }}>No drivers found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
