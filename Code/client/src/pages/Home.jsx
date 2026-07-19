import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'transparent' }}>
      <nav style={{ backgroundColor: 'var(--color-primary)', padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0, color: 'var(--color-text)' }}>Cab Booking App</h2>
        <Link to="/login" style={{ color: 'var(--color-text)', textDecoration: 'none', fontWeight: 'bold' }}>Login</Link>
      </nav>
      <div style={{ textAlign: 'center', marginTop: '100px' }}>
        <h1 style={{ fontSize: '3rem', color: '#1b2430' }}>Your Ride, Your Way</h1>
        <p style={{ color: '#6b7280', fontSize: '1.2rem' }}>Reliable. Fast. Affordable. Book cabs anytime, anywhere.</p>
        <Link to="/cabs" style={{ display: 'inline-block', marginTop: '20px', padding: '15px 30px', backgroundColor: 'var(--color-text)', color: 'var(--color-surface)', textDecoration: 'none', borderRadius: '5px', fontWeight: 'bold' }}>Explore Services</Link>
        <div style={{ marginTop: '50px' }}>
          <img src="https://cdn-icons-png.flaticon.com/512/1048/1048314.png" alt="Taxi" style={{ width: '300px' }} />
        </div>
      </div>
    </div>
  );
}
