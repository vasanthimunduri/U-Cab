import { Link, useNavigate } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

export default function Anav() {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('admin');
    navigate('/alogin');
  };

  const admin = JSON.parse(localStorage.getItem('admin'));

  return (
    <nav className="navbar glass-nav" style={{ padding: '15px 30px' }}>
      <div className="brand" style={{ color: 'var(--color-text)' }}>Admin Panel</div>
      <div className="nav-links">
        <Link to="/ahome" style={{ color: 'var(--color-text)', fontWeight: 'bold', marginRight: '10px' }}>Dashboard</Link>
        <Link to="/users" style={{ color: 'var(--color-text)', fontWeight: 'bold', marginRight: '10px' }}>Users</Link>
        <Link to="/adrivers" style={{ color: 'var(--color-text)', fontWeight: 'bold', marginRight: '10px' }}>Drivers</Link>
        <Link to="/acabs" style={{ color: 'var(--color-text)', fontWeight: 'bold', marginRight: '10px' }}>Cabs</Link>
        <Link to="/bookings" style={{ color: 'var(--color-text)', fontWeight: 'bold', marginRight: '15px' }}>Bookings</Link>
        <ThemeToggle />
        <button className="glass-button" onClick={handleLogout} style={{ backgroundColor: 'var(--color-danger)', color: 'var(--color-surface)', borderRadius: '4px', padding: '5px 10px', border: 'none', cursor: 'pointer', marginRight: '10px' }}>Logout</button>
        {admin && <span style={{ color: 'var(--color-text)', fontWeight: 'bold' }}>({admin.name})</span>}
      </div>
    </nav>
  );
}
