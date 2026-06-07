import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../components/auth/AuthLayout";
import SubmitButton from "../components/auth/SubmitButton";
import { useAuth } from "../context/auth-context";

const PASSWORD_PATTERN =
  /^.{4,}$/;

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!PASSWORD_PATTERN.test(password)) {
      setError(
        "Use at least 4 characters.",
      );
      return;
    }

    setIsLoading(true);

    try {
      await register({ fullName, email, password });
      navigate("/login");
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
          requestError.message ||
          "Failed to create your account. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      eyebrow="Start exploring"
      title="Create your account"
      subtitle="Join the platform and unlock precise, structured address discovery."
      footerText="Already have an account?"
      footerLink="/login"
      footerLabel="Sign in"
    >
      <form className="auth-form" onSubmit={handleSubmit}>
        {error && <div className="auth-alert error" role="alert">{error}</div>}

        <label className="auth-field" htmlFor="fullName">
          <span>Full name</span>
          <input
            id="fullName"
            name="fullName"
            type="text"
            autoComplete="name"
            required
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
            placeholder="Your full name"
          />
        </label>

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
          <span>Password</span>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Create a strong password"
          />
          <small>4+ characters.</small>
        </label>

        <SubmitButton loading={isLoading}>Create my account</SubmitButton>
      </form>
    </AuthLayout>
  );
};

export default Signup;
