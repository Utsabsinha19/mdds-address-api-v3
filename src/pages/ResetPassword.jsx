import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import AuthLayout from "../components/auth/AuthLayout";
import SubmitButton from "../components/auth/SubmitButton";
import api from "../api/axios";

const PASSWORD_PATTERN =
  /^.{4,}$/;

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");

    if (!token) {
      setError("This reset link is invalid or missing its secure token.");
      return;
    }

    if (password !== confirmPassword) {
      setError("The passwords do not match.");
      return;
    }

    if (!PASSWORD_PATTERN.test(password)) {
      setError(
        "Use at least 4 characters.",
      );
      return;
    }

    setIsLoading(true);

    try {
      const response = await api.post("/api/auth/reset-password", {
        token,
        newPassword: password,
      });
      setMessage(
        response.data?.message ||
          "Password updated successfully. Redirecting to sign in...",
      );
      setTimeout(() => navigate("/login"), 2500);
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
          requestError.message ||
          "The reset link may have expired. Please request a new one.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      eyebrow="Secure password update"
      title="Create a new password"
      subtitle="Choose a strong password that you have not used for this account before."
      footerText="Need a fresh reset link?"
      footerLink="/forgot-password"
      footerLabel="Request another"
    >
      <form className="auth-form" onSubmit={handleSubmit}>
        {error && <div className="auth-alert error" role="alert">{error}</div>}
        {message && <div className="auth-alert success" role="status">{message}</div>}

        <label className="auth-field" htmlFor="password">
          <span>New password</span>
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

        <label className="auth-field" htmlFor="confirmPassword">
          <span>Confirm new password</span>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            required
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            placeholder="Repeat your new password"
          />
        </label>

        <SubmitButton loading={isLoading} disabled={!token}>
          Update password
        </SubmitButton>
      </form>
    </AuthLayout>
  );
};

export default ResetPassword;
