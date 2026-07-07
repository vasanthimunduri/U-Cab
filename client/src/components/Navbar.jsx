import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="brand">
        Ucab
      </Link>
      <div className="nav-links">
        {user ? (
          <>
            <Link to="/book">Book a ride</Link>
            <Link to="/history">History</Link>
            <span className="nav-user">Hi, {user.name.split(" ")[0]}</span>
            <button className="link-button" onClick={handleLogout}>
              Log out
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Log in</Link>
            <Link to="/register" className="cta">
              Sign up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
