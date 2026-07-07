import { useState, useEffect } from 'react';
import Unav from '../components/Unav';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Cabs() {
  const [cabs, setCabs] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [searchType, setSearchType] = useState('');
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'

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

  let filteredCabs = cabs.filter(cab => 
    cab.name.toLowerCase().includes(searchName.toLowerCase()) && 
    cab.type.toLowerCase().includes(searchType.toLowerCase())
  );

  filteredCabs = filteredCabs.sort((a, b) => {
    if (sortOrder === 'asc') return a.ratePerKm - b.ratePerKm;
    else return b.ratePerKm - a.ratePerKm;
  });

  const handleSortToggle = () => {
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'transparent' }}>
      <Unav />
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem' }}>Available Cabs</h1>
        <div style={{ margin: '20px 0', display: 'flex', justifyContent: 'center', gap: '10px' }}>
          <input type="text" placeholder="Search by car name" value={searchName} onChange={e => setSearchName(e.target.value)} style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc', width: '200px', backgroundColor: 'transparent' }} />
          <input type="text" placeholder="Search by car type" value={searchType} onChange={e => setSearchType(e.target.value)} style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc', width: '200px', backgroundColor: 'transparent' }} />
          <button onClick={handleSortToggle} style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-text)', padding: '10px 20px', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>
            Sort Price: {sortOrder === 'asc' ? 'Low to High' : 'High to Low'}
          </button>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px', marginTop: '40px' }}>
          {filteredCabs.map(cab => (
            <div key={cab._id} className="glass-card" style={{ padding: '20px', width: '320px', textAlign: 'left' }}>
              {cab.image ? (
                <img src={`http://localhost:5000/uploads/${cab.image}`} alt={cab.name} style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '8px', backgroundColor: 'var(--color-surface)' }} />
              ) : (
                <div style={{ width: '100%', height: '180px', backgroundColor: 'var(--color-surface)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>No Image</div>
              )}
              <h3 style={{ margin: '15px 0 5px', fontSize: '1rem' }}>🚗 Model: {cab.name}</h3>
              <p style={{ margin: '5px 0', fontSize: '0.9rem' }}><b>Type:</b> {cab.type}</p>
              <p style={{ margin: '5px 0', fontSize: '0.9rem' }}><b>Car No:</b> {cab.plateNumber}</p>
              <p style={{ margin: '5px 0', fontSize: '0.9rem' }}><b>Driver:</b> {cab.driverName}</p>
              <p style={{ margin: '5px 0', fontSize: '0.9rem' }}><b>Fare:</b> ₹{cab.ratePerKm}/Km</p>
              <Link to={`/bookcab/${cab._id}`} className="glass-button" style={{ display: 'block', textAlign: 'center', marginTop: '15px', padding: '12px', backgroundColor: 'var(--color-primary)', color: 'var(--color-text)', textDecoration: 'none', borderRadius: '8px', fontWeight: 'bold' }}>Book Cab</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
