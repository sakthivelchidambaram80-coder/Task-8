
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  BookOpen, LockKeyhole, Mail, UserRound
} from "lucide-react";
import { useApp } from "../context/AppContext";

export default function Registration() {
  const { register } = useApp();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = event => {
    event.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const result = register(name, email, password);

    if (!result.success) {
      setError(result.message);
      return;
    }

    navigate("/my-learning", { replace: true });
  };

  return (
    <section className="auth-page">
      <div className="auth-card">
        <Link to="/" className="brand auth-brand">
          <span className="brand-icon"><BookOpen size={23} /></span>
          E-<span>Learn</span>
        </Link>

        <div className="auth-heading">
          <h1>Create Your Account</h1>
          <p>Join LearnHub and start learning something new.</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <label htmlFor="register-name">Full Name</label>
          <div className="input-wrapper">
            <UserRound size={18} />
            <input
              id="register-name"
              type="text"
              autoComplete="name"
              placeholder="Enter your full name"
              value={name}
              onChange={event => setName(event.target.value)}
              required
            />
          </div>

          <label htmlFor="register-email">Email Address</label>
          <div className="input-wrapper">
            <Mail size={18} />
            <input
              id="register-email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={event => setEmail(event.target.value)}
              required
            />
          </div>

          <label htmlFor="register-password">Password</label>
          <div className="input-wrapper">
            <LockKeyhole size={18} />
            <input
              id="register-password"
              type="password"
              autoComplete="new-password"
              placeholder="At least 6 characters"
              minLength={6}
              value={password}
              onChange={event => setPassword(event.target.value)}
              required
            />
          </div>

          <label htmlFor="confirm-password">Confirm Password</label>
          <div className="input-wrapper">
            <LockKeyhole size={18} />
            <input
              id="confirm-password"
              type="password"
              autoComplete="new-password"
              placeholder="Re-enter your password"
              value={confirmPassword}
              onChange={event => setConfirmPassword(event.target.value)}
              required
            />
          </div>

          {error && <p className="form-error" role="alert">{error}</p>}

          <button type="submit" className="btn btn-primary btn-full">
            Create Account
          </button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </section>
  );
}
