import { Link } from "react-router-dom";

const AuthLayout = ({
  eyebrow,
  title,
  subtitle,
  footerText,
  footerLink,
  footerLabel,
  children,
}) => (
  <main className="auth-page">
    <div className="auth-orb auth-orb-one" />
    <div className="auth-orb auth-orb-two" />

    <section className="auth-shell">
      <aside className="auth-showcase">
        <Link className="brand-mark" to="/" aria-label="MDDS Address home">
          <span className="brand-symbol">M</span>
          <span>
            <strong>MDDS Address</strong>
            <small>Intelligence Platform</small>
          </span>
        </Link>

        <div className="auth-showcase-copy">
          <span className="auth-kicker">India, precisely mapped</span>
          <h1>Address intelligence built for confident decisions.</h1>
          <p>
            Search official administrative hierarchies, validate village
            records, and work with dependable MDDS codes in one secure space.
          </p>
        </div>

        <div className="auth-proof-grid">
          <article><strong>512K+</strong><span>Village records</span></article>
          <article><strong>35</strong><span>States and regions</span></article>
          <article><strong>&lt;100ms</strong><span>Fast discovery</span></article>
        </div>

        <p className="auth-trust">
          <span className="auth-trust-dot" />
          Structured, secure, and ready for production workflows
        </p>
      </aside>

      <section className="auth-form-panel">
        <div className="auth-mobile-brand">
          <span className="brand-symbol">M</span>
          <strong>MDDS Address</strong>
        </div>

        <div className="auth-card">
          <div className="auth-heading">
            <span>{eyebrow}</span>
            <h2>{title}</h2>
            <p>{subtitle}</p>
          </div>

          {children}

          {footerLink && (
            <p className="auth-footer">
              {footerText} <Link to={footerLink}>{footerLabel}</Link>
            </p>
          )}
        </div>

        <p className="auth-legal">
          Protected access to the MDDS Address Intelligence Platform
        </p>
      </section>
    </section>
  </main>
);

export default AuthLayout;
