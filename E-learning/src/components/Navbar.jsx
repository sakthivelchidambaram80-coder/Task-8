
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { BookOpen, Menu, X, LogOut, UserRound } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { currentUser, logout } = useApp();
  const navigate = useNavigate();

  const closeMenu = () => setOpen(false);

  const handleLogout = () => {
    logout();
    closeMenu();
    navigate("/");
  };

  return (
    <header className="navbar">
      <div className="nav-container">
        <Link to="/" className="brand" onClick={closeMenu}>
          <span className="brand-icon"><BookOpen size={23} /></span>
          E-<span>Learn</span>
        </Link>

        <button
          className="menu-toggle"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
          aria-expanded={open}
        >
          {open ? <X /> : <Menu />}
        </button>

        <nav className={`nav-links ${open ? "nav-open" : ""}`}>
          <NavLink to="/" end onClick={closeMenu}>Home</NavLink>
          <NavLink to="/courses" onClick={closeMenu}>Courses</NavLink>
          <NavLink to="/my-learning" onClick={closeMenu}>My Learning</NavLink>

          {currentUser ? (
            <div className="nav-user">
              <span className="user-greeting">
                <UserRound size={17} />
                {currentUser.name.split(" ")[0]}
              </span>
              <button className="btn btn-outline btn-small" onClick={handleLogout}>
                <LogOut size={15} /> Logout
              </button>
            </div>
          ) : (
            <div className="nav-actions">
              <Link to="/login" className="nav-login" onClick={closeMenu}>Login</Link>
              <Link to="/registration" className="btn btn-primary btn-small" onClick={closeMenu}>
                Get Started
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
