import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/auth/AuthLayout";
import SubmitButton from "../components/auth/SubmitButton";
import { useAuth } from "../context/auth-context";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await login(email, password);
      navigate("/");
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
          requestError.message ||
          "Failed to sign in. Please check your credentials.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      eyebrow="Secure sign in"
      title="Welcome back"
      subtitle="Enter your credentials to continue to your address intelligence workspace."
      footerText="New to MDDS Address?"
      footerLink="/signup"
      footerLabel="Create an account"
    >
      <form className="auth-form" onSubmit={handleSubmit}>
        {error && <div className="auth-alert error" role="alert">{error}</div>}

        <label className="auth-field" htmlFor="email">
          <span>Email address</span>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
          />
        </label>

        <label className="auth-field" htmlFor="password">
          <span className="auth-label-row">
            Password
            <Link to="/forgot-password">Forgot password?</Link>
          </span>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter your password"
          />
        </label>

        <SubmitButton loading={isLoading}>Sign in securely</SubmitButton>
      </form>
    </AuthLayout>
  );
};

export default Login;
