import { Link } from "react-router-dom";
import { useAuth } from "../context/auth-context";

const Profile = () => {
  const { user, logout } = useAuth();

  return (
    <main className="app-shell account-page">
      <nav className="account-nav">
        <Link className="app-nav-brand" to="/">
          <span className="brand-symbol">M</span>
          <span><strong>MDDS Address</strong><small>Intelligence Platform</small></span>
        </Link>
        <Link to="/dashboard">Dashboard</Link>
      </nav>

      <section className="profile-layout">
        <aside className="profile-summary">
          <span className="profile-avatar">
            {(user?.fullName || "U").charAt(0).toUpperCase()}
          </span>
          <span className="section-kicker">Verified account</span>
          <h1>{user?.fullName || "User profile"}</h1>
          <p>{user?.email || "No email available"}</p>
        </aside>

        <div className="profile-card">
          <div><span>Account role</span><strong>{user?.role || "USER"}</strong></div>
          <div><span>Platform access</span><strong>Active</strong></div>
          <div><span>Security</span><strong>Password protected</strong></div>
          <div className="button-group">
            <Link className="primary-button" to="/">Back to search</Link>
            <button className="secondary-button" onClick={logout} type="button">Sign out</button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Profile;
