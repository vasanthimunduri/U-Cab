import { Link, useNavigate } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

export default function Dnav() {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('driver');
    navigate('/dlogin');
  };

  const driver = JSON.parse(localStorage.getItem('driver'));

  return (
    <nav className="navbar glass-nav" style={{ padding: '15px 30px' }}>
      <div className="brand" style={{ color: 'var(--color-text)' }}>Driver Portal</div>
      <div className="nav-links">
        <Link to="/dhome" style={{ color: 'var(--color-text)', fontWeight: 'bold', marginRight: '10px' }}>Dashboard</Link>
        <ThemeToggle />
        <button className="glass-button" onClick={handleLogout} style={{ backgroundColor: 'var(--color-danger)', color: '#fff', borderRadius: '4px', padding: '5px 10px', border: 'none', cursor: 'pointer', marginRight: '10px' }}>Logout</button>
        {driver && <span style={{ color: 'var(--color-text)', fontWeight: 'bold' }}>({driver.name})</span>}
      </div>
    </nav>
  );
}
