import { useState } from 'react';
import Anav from '../components/Anav';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Addcar() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '', model: '', type: 'Sedan', ratePerKm: '', plateNumber: '', driverName: ''
  });
  const [image, setImage] = useState(null);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (let key in formData) {
      data.append(key, formData[key]);
    }
    if (image) data.append('image', image);

    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/cars/add', data, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Car added successfully');
      navigate('/acabs');
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to add car');
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'transparent' }}>
      <Anav />
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px', paddingBottom: '40px' }}>
        <div style={{ backgroundColor: 'var(--color-surface)', padding: '40px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', width: '500px' }}>
          <h2 style={{ textAlign: 'center' }}>Add New Cab</h2>
          <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Car Name" value={formData.name} onChange={handleChange} required style={{ width: '100%', padding: '10px', margin: '10px 0', border: '1px solid #ccc', borderRadius: '4px' }} />
            <input type="text" name="model" placeholder="Model" value={formData.model} onChange={handleChange} required style={{ width: '100%', padding: '10px', margin: '10px 0', border: '1px solid #ccc', borderRadius: '4px' }} />
            <select name="type" value={formData.type} onChange={handleChange} style={{ width: '100%', padding: '10px', margin: '10px 0', border: '1px solid #ccc', borderRadius: '4px' }}>
              <option value="Mini">Mini</option>
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
              <option value="Bike">Bike</option>
            </select>
            <input type="number" name="ratePerKm" placeholder="Rate Per Km" value={formData.ratePerKm} onChange={handleChange} required style={{ width: '100%', padding: '10px', margin: '10px 0', border: '1px solid #ccc', borderRadius: '4px' }} />
            <input type="text" name="plateNumber" placeholder="Plate Number" value={formData.plateNumber} onChange={handleChange} required style={{ width: '100%', padding: '10px', margin: '10px 0', border: '1px solid #ccc', borderRadius: '4px' }} />
            <input type="text" name="driverName" placeholder="Driver Name" value={formData.driverName} onChange={handleChange} required style={{ width: '100%', padding: '10px', margin: '10px 0', border: '1px solid #ccc', borderRadius: '4px' }} />
            <input type="file" onChange={(e) => setImage(e.target.files[0])} style={{ width: '100%', padding: '10px', margin: '10px 0', border: '1px solid #ccc', borderRadius: '4px' }} />
            
            <button type="submit" style={{ width: '100%', padding: '12px', backgroundColor: 'var(--color-primary)', color: 'var(--color-text)', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', marginTop: '10px' }}>Add Cab</button>
          </form>
        </div>
      </div>
    </div>
  );
}
