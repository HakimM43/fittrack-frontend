import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function SignupPage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Sign up failed");
        return;
      }

      navigate("/login");
    } catch (error) {
      setError("Could not connect to the server");
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-panel">
        <div className="auth-brand">
          <span className="auth-brand-mark" aria-hidden="true">
            F
          </span>
          <h1>FitTrack</h1>
        </div>

        <header className="auth-heading">
          <p className="auth-eyebrow">MEMBER ACCESS</p>
          <h2>Create your account</h2>
          <p className="auth-description">Sign up for FitTrack.</p>
        </header>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-field">
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="auth-field">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="auth-field">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="auth-error">{error}</p>}

          <button className="auth-submit" type="submit">
            Create Account
          </button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </section>
    </main>
  );
}

export default SignupPage;