import React from "react";
import "./policy.css";

interface PolicyLayoutProps {
  title: string;
  lastUpdated?: string;
  effectiveDate?: string;
  children: React.ReactNode;
}

export default function PolicyLayout({
  title,
  lastUpdated,
  effectiveDate,
  children,
}: PolicyLayoutProps) {
  return (
    <div className="policy-root">
      {/* ── NAV ── */}
      <header className="policy-nav">
        <div className="policy-nav-inner">
          <a href="/" className="policy-nav-logo" aria-label="Selliro home">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
              <rect width="28" height="28" rx="8" fill="var(--purple)" />
              <path
                d="M8 19.5C8 18.12 9.12 17 10.5 17h7c1.38 0 2.5 1.12 2.5 2.5S18.88 22 17.5 22h-7C9.12 22 8 20.88 8 19.5Z"
                fill="white"
              />
              <path
                d="M10.5 6h7C18.88 6 20 7.12 20 8.5S18.88 11 17.5 11h-7C9.12 11 8 9.88 8 8.5S9.12 6 10.5 6Z"
                fill="white"
                opacity=".6"
              />
              <path
                d="M8.5 12h11a1.5 1.5 0 0 1 0 3h-11a1.5 1.5 0 0 1 0-3Z"
                fill="white"
                opacity=".35"
              />
            </svg>
            <span className="policy-nav-wordmark brand">Selliro</span>
          </a>
          <a href="/" className="policy-nav-back">
            ← Back to home
          </a>
        </div>
      </header>

      {/* ── HERO ── */}
      <div className="policy-hero">
        <div className="policy-hero-inner container">
          <p className="policy-eyebrow">Legal</p>
          <h1 className="policy-title brand">{title}</h1>
          {(lastUpdated || effectiveDate) && (
            <div className="policy-meta">
              {lastUpdated && (
                <span>
                  <span className="policy-meta-label">Last Updated:</span> {lastUpdated}
                </span>
              )}
              {effectiveDate && (
                <span>
                  <span className="policy-meta-label">Effective Date:</span> {effectiveDate}
                </span>
              )}
            </div>
          )}
          <div className="policy-business-card">
            <span>Hardeep Ramalingam, trading as Selliro</span>
            <span className="policy-dot">·</span>
            <a href="mailto:admin@selliro.in">admin@selliro.in</a>
            <span className="policy-dot">·</span>
            <span>Chennai, Tamil Nadu, India</span>
          </div>
        </div>
      </div>

      {/* ── CONTENT ── */}
      <main className="policy-content container">{children}</main>

      {/* ── FOOTER ── */}
      <footer className="policy-footer">
        <div className="policy-footer-inner container">
          <p className="policy-footer-brand brand">
            SELLIRO – Buy Smart. Sell Easy. Reuse More.
          </p>
          <nav className="policy-footer-links" aria-label="Policy pages">
            <a href="/privacy-policy">Privacy Policy</a>
            <a href="/terms">Terms &amp; Conditions</a>
            <a href="/refund-policy">Return &amp; Refund Policy</a>
          </nav>
          <p className="policy-footer-copy">
            © {new Date().getFullYear()} Selliro. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

