import { Link } from "react-router-dom";
import { useAuth } from "../context/auth-context";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <main className="app-shell account-page">
      <nav className="account-nav">
        <Link className="app-nav-brand" to="/">
          <span className="brand-symbol">M</span>
          <span><strong>MDDS Address</strong><small>Intelligence Platform</small></span>
        </Link>
        <Link to="/profile">Profile</Link>
      </nav>

      <section className="hero-section account-hero">
        <div className="hero-copy">
          <span className="eyebrow">Personal dashboard</span>
          <h1>Welcome, {user?.fullName || "User"}.</h1>
          <p>
            Your precision workspace for Indian administrative geography,
            official MDDS records, and clear address intelligence.
          </p>
          <div className="button-group">
            <Link className="primary-button" to="/">Open address search</Link>
            <Link className="secondary-button" to="/profile">View profile</Link>
          </div>
        </div>
      </section>

      <section className="account-feature-grid">
        <article><span>01</span><h2>Explore hierarchy</h2><p>Move from state to village with guided, reliable selections.</p></article>
        <article><span>02</span><h2>Validate records</h2><p>Inspect official MDDS codes and complete administrative paths.</p></article>
        <article><span>03</span><h2>Export insights</h2><p>Download clean records and search analytics for your workflow.</p></article>
      </section>
    </main>
  );
};

export default Dashboard;
