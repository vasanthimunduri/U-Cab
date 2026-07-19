import { useState, useEffect } from 'react';
import Unav from '../components/Unav';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function BookCab() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [pickup, setPickup] = useState('');
  const [drop, setDrop] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const [dropDate, setDropDate] = useState('');
  const [dropTime, setDropTime] = useState('');
  const [fare, setFare] = useState(0);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/cars');
        const selected = res.data.find(c => c._id === id);
        setCar(selected);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCar();
  }, [id]);

  const getCoordinates = async (city) => {
    try {
      const res = await axios.get(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(city)}&format=json`);
      if (res.data && res.data.length > 0) {
        return { lat: parseFloat(res.data[0].lat), lon: parseFloat(res.data[0].lon) };
      }
      return null;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * 
      Math.sin(dLon / 2) * Math.sin(dLon / 2); 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
    const distance = R * c; 
    return distance * 1.3; // 1.3 multiplier to approximate road driving distance
  };

  const calculateFare = async () => {
    if (!pickup || !drop) {
      return alert("Please enter both Pickup and Drop locations to calculate fare");
    }
    if (pickup.toLowerCase() === drop.toLowerCase()) {
      return alert("Pickup and Drop locations cannot be the same");
    }
    
    const pickupCoords = await getCoordinates(pickup);
    if (!pickupCoords) return alert(`Invalid city: "${pickup}"`);
    
    const dropCoords = await getCoordinates(drop);
    if (!dropCoords) return alert(`Invalid city: "${drop}"`);

    const distanceInKm = calculateDistance(pickupCoords.lat, pickupCoords.lon, dropCoords.lat, dropCoords.lon);
    
    if (car) {
      const calculatedFare = Math.round(distanceInKm * car.ratePerKm);
      setFare(calculatedFare > 0 ? calculatedFare : car.ratePerKm * 5); // Minimum fare fallback
    }
  };

  const handleBook = async () => {
    if (!pickup || !drop || !pickupDate || !pickupTime || !dropDate || !dropTime) {
      return alert("Please fill all fields");
    }
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/bookings/book', {
        carId: id,
        pickupLocation: pickup,
        dropLocation: drop,
        pickupDate: `${pickupDate}T${pickupTime}`,
        dropDate: `${dropDate}T${dropTime}`,
        totalAmount: fare > 0 ? fare : 500
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Booking successful!');
      navigate('/mybookings');
    } catch (err) {
      alert(err.response?.data?.error || 'Booking failed');
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'transparent' }}>
      <Unav />
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px', paddingBottom: '40px' }}>
        <div style={{ backgroundColor: 'var(--color-surface)', padding: '40px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', width: '600px' }}>
          <h2 style={{ textAlign: 'center' }}>Book a Ride</h2>
          
          <div style={{ marginTop: '20px' }}>
            <label style={{ display: 'block', fontWeight: 'bold', fontSize: '0.9rem' }}>Pickup Location</label>
            <input type="text" value={pickup} onChange={e => setPickup(e.target.value)} style={{ width: '100%', padding: '10px', margin: '5px 0 15px', borderRadius: '4px', border: '1px solid #ccc' }} />

            <label style={{ display: 'block', fontWeight: 'bold', fontSize: '0.9rem' }}>Drop Location</label>
            <input type="text" value={drop} onChange={e => setDrop(e.target.value)} style={{ width: '100%', padding: '10px', margin: '5px 0 15px', borderRadius: '4px', border: '1px solid #ccc' }} />

            <p style={{ textAlign: 'center', color: '#c94a4a', fontSize: '0.9rem', margin: '15px 0 5px' }}>Pickup Date</p>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
              <input type="date" value={pickupDate} onChange={e => setPickupDate(e.target.value)} style={{ flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
            </div>
            
            <p style={{ textAlign: 'center', color: '#c94a4a', fontSize: '0.9rem', margin: '5px 0' }}>Pickup Time</p>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
              <input type="time" value={pickupTime} onChange={e => setPickupTime(e.target.value)} style={{ flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
            </div>

            <p style={{ textAlign: 'center', color: '#c94a4a', fontSize: '0.9rem', margin: '15px 0 5px' }}>Drop Date</p>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
              <input type="date" value={dropDate} onChange={e => setDropDate(e.target.value)} style={{ flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
            </div>
            
            <p style={{ textAlign: 'center', color: '#c94a4a', fontSize: '0.9rem', margin: '5px 0' }}>Drop Time</p>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
              <input type="time" value={dropTime} onChange={e => setDropTime(e.target.value)} style={{ flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
            </div>

            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <button onClick={calculateFare} style={{ padding: '10px 20px', backgroundColor: 'var(--color-primary)', color: 'var(--color-text)', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Calculate Fare</button>
              {fare > 0 && (
                <div style={{ marginTop: '15px', padding: '10px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '8px', border: '1px solid var(--color-success)' }}>
                  <p style={{ margin: 0, fontWeight: 'bold', fontSize: '1.2rem', color: 'var(--color-success)' }}>Estimated Fare: ₹{fare}</p>
                  <p style={{ margin: '5px 0 0 0', fontSize: '0.8rem', color: 'var(--color-text)' }}>Based on real-time distance calculation.</p>
                </div>
              )}
            </div>

            <button onClick={handleBook} style={{ width: '100%', padding: '12px', backgroundColor: 'var(--color-primary)', color: 'var(--color-text)', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1.1rem' }}>Book Ride</button>
          </div>
        </div>
      </div>
    </div>
  );
}
