import { Link, useNavigate } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

export default function Unav() {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <nav className="navbar glass-nav" style={{ padding: '15px 30px' }}>
      <div className="brand" style={{ color: 'var(--color-text)' }}>Ucab App</div>
      <div className="nav-links">
        <Link to="/uhome" style={{ color: 'var(--color-text)', fontWeight: 'bold', marginRight: '10px' }}>Home</Link>
        <Link to="/cabs" style={{ color: 'var(--color-text)', fontWeight: 'bold', marginRight: '10px' }}>Book Cab</Link>
        <Link to="/mybookings" style={{ color: 'var(--color-text)', fontWeight: 'bold', marginRight: '15px' }}>My Booking</Link>
        <ThemeToggle />
        <button className="glass-button" onClick={handleLogout} style={{ backgroundColor: 'var(--color-danger)', color: 'var(--color-surface)', borderRadius: '4px', padding: '5px 10px', border: 'none', cursor: 'pointer', marginRight: '10px' }}>Logout</button>
        {user && <span style={{ color: 'var(--color-text)', fontWeight: 'bold' }}>({user.name})</span>}
      </div>
    </nav>
  );
}
