import { useState } from "react";
import AuthLayout from "../components/auth/AuthLayout";
import SubmitButton from "../components/auth/SubmitButton";
import api from "../api/axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");
    setIsLoading(true);

    try {
      const response = await api.post("/api/auth/forgot-password", { email });
      setMessage(
        response.data?.message ||
          "Password reset instructions have been sent to your email.",
      );
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
          requestError.message ||
          "We could not process the request. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      eyebrow="Account recovery"
      title="Reset your password"
      subtitle="Enter your account email and we will send a secure reset link."
      footerText="Remembered your password?"
      footerLink="/login"
      footerLabel="Return to sign in"
    >
      <form className="auth-form" onSubmit={handleSubmit}>
        {error && <div className="auth-alert error" role="alert">{error}</div>}
        {message && <div className="auth-alert success" role="status">{message}</div>}

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
          <small>We never reveal whether an email is registered.</small>
        </label>

        <SubmitButton loading={isLoading}>Send secure reset link</SubmitButton>
      </form>
    </AuthLayout>
  );
};

export default ForgotPassword;
