import Unav from '../components/Unav';
import { Link } from 'react-router-dom';

export default function Uhome() {
  const user = JSON.parse(localStorage.getItem('user'));
  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'transparent' }}>
      <Unav />
      <div style={{ textAlign: 'center', marginTop: '100px' }}>
        <h1 style={{ fontSize: '3rem', color: '#1b2430' }}>Welcome, {user?.name}!</h1>
        <p style={{ color: '#6b7280', fontSize: '1.2rem' }}>Ready to book your next ride?</p>
        <Link to="/cabs" style={{ display: 'inline-block', marginTop: '20px', padding: '15px 30px', backgroundColor: 'var(--color-text)', color: 'var(--color-surface)', textDecoration: 'none', borderRadius: '5px', fontWeight: 'bold' }}>Find a Cab</Link>
      </div>
    </div>
  );
}
