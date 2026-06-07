import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/auth-context";

const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <main className="app-loading">
        <span className="app-loading-mark">M</span>
        <div className="app-loading-bar" />
        <p>Preparing your workspace</p>
      </main>
    );
  }

  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
