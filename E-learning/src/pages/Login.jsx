
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BookOpen, LockKeyhole, Mail } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function Login() {
  const { login } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = event => {
    event.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }

    const result = login(email, password);

    if (!result.success) {
      setError(result.message);
      return;
    }

    navigate(location.state?.from || "/my-learning", {
      replace: true
    });
  };

  return (
    <section className="auth-page">
      <div className="auth-card">
        <Link to="/" className="brand auth-brand">
          <span className="brand-icon"><BookOpen size={23} /></span>
           E-<span>Learn</span>
        </Link>

        <div className="auth-heading">
          <h1>Welcome Back!</h1>
          <p>Log in to continue your learning journey.</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <label htmlFor="login-email">Email Address</label>
          <div className="input-wrapper">
            <Mail size={18} />
            <input
              id="login-email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={event => setEmail(event.target.value)}
              required
            />
          </div>

          <label htmlFor="login-password">Password</label>
          <div className="input-wrapper">
            <LockKeyhole size={18} />
            <input
              id="login-password"
              type="password"
              autoComplete="current-password"
              placeholder="Enter your password"
              value={password}
              onChange={event => setPassword(event.target.value)}
              required
            />
          </div>

          {error && <p className="form-error" role="alert">{error}</p>}

          <button type="submit" className="btn btn-primary btn-full">
            Login to Your Account
          </button>
        </form>

        <p className="auth-switch">
          Don't have an account? <Link to="/registration">Sign up</Link>
        </p>

        <p className="auth-note">
          Demo project: register an account first, then log in with the same details.
        </p>
      </div>
    </section>
  );
}
