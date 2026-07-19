import { useState, useEffect } from 'react';
import Anav from '../components/Anav';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Acabs() {
  const [cabs, setCabs] = useState([]);

  useEffect(() => {
    const fetchCabs = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/cars');
        setCabs(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCabs();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/cars/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCabs(cabs.filter(c => c._id !== id));
    } catch (err) {
      alert('Delete failed');
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'transparent' }}>
      <Anav />
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h1>Manage Cabs</h1>
        <Link to="/addcar" style={{ display: 'inline-block', padding: '10px 20px', backgroundColor: 'var(--color-text)', color: 'var(--color-surface)', textDecoration: 'none', borderRadius: '5px', marginBottom: '20px' }}>Add New Cab</Link>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
          {cabs.map(cab => (
            <div key={cab._id} style={{ backgroundColor: 'var(--color-surface)', padding: '20px', borderRadius: '10px', width: '300px', textAlign: 'left', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
              {cab.image && <img src={`http://localhost:5000/uploads/${cab.image}`} alt={cab.name} style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px' }} />}
              <h3 style={{ margin: '10px 0' }}>{cab.name} ({cab.model})</h3>
              <p>Type: {cab.type}</p>
              <p>Plate: {cab.plateNumber}</p>
              <p>Rate: ₹{cab.ratePerKm}/Km</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px' }}>
                <button onClick={() => handleDelete(cab._id)} style={{ padding: '8px 15px', backgroundColor: '#c94a4a', color: 'var(--color-surface)', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
