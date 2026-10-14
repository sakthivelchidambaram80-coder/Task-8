
import { Link } from "react-router-dom";
import { BookOpen, Mail, ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <Link to="/" className="brand">
            <span className="brand-icon"><BookOpen size={23} /></span>
            E-<span>Learn</span>
          </Link>
          <p>Learn new skills. Build your future.</p>
        </div>

        <div className="footer-links">
          <h4>Explore</h4>
          <Link to="/">Home</Link>
          <Link to="/courses">All Courses</Link>
          <Link to="/my-learning">My Learning</Link>
        </div>

        <div className="footer-links">
          <h4>Account</h4>
          <Link to="/login">Login</Link>
          <Link to="/registration">Create Account</Link>
        </div>

        <div className="footer-contact">
          <h4>Keep Learning</h4>
          <p><Mail size={16} /> hello@learnhub.example</p>
          <Link to="/courses">Explore courses <ArrowUpRight size={16} /></Link>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} LearnHub. Demo learning platform.</p>
      </div>
    </footer>
  );
}
