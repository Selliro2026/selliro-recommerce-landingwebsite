import React, { useEffect } from "react";
import "./policy.css";

interface PolicyLayoutProps {
  title: string;
  classification?: string;
  subtitle?: string;
  lastUpdated?: string;
  effectiveDate?: string;
  children: React.ReactNode;
}

const DOC_LINKS = [
  { href: "/about-us", label: "About Us" },
  { href: "/contact-us", label: "Contact Us" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms & Conditions" },
  { href: "/refund-policy", label: "Cancellation & Refund Policy" },
];

export default function PolicyLayout({
  title,
  classification = "Legal & Compliance",
  subtitle,
  lastUpdated,
  effectiveDate,
  children,
}: PolicyLayoutProps) {
  const currentPath =
    typeof window !== "undefined"
      ? window.location.pathname.replace(/\/+$/, "") || "/"
      : "/";

  useEffect(() => {
    document.title = `${title} — Selliro`;
    window.scrollTo(0, 0);
  }, [title]);

  return (
    <div className="lp-page">
      {/* Minimal Top Bar */}
      <header className="lp-topbar">
        <div className="lp-topbar-inner">
          <a href="/" className="lp-back-link">
            <span aria-hidden="true">←</span> Back to Selliro
          </a>

          <nav className="lp-topbar-nav" aria-label="Company and legal documents">
            {DOC_LINKS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                aria-current={currentPath === item.href ? "page" : undefined}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Letterhead Page */}
      <main className="lp-main">
        {/* Letterhead Header */}
        <header className="lp-letterhead">
          <div>
            <a href="/" className="lp-wordmark" aria-label="Selliro home">
              selliro<span>.</span>
            </a>
            <div className="lp-lh-entity">
              Hardeep Ramalingam, trading as Selliro
            </div>
          </div>

          <div className="lp-lh-right">
            <div>
              <a href="https://selliro.in" target="_blank" rel="noopener noreferrer">
                selliro.in
              </a>
            </div>
            <div>
              <a href="mailto:admin@selliro.in">admin@selliro.in</a>
            </div>
            <div>Chennai, Tamil Nadu, India</div>
          </div>
        </header>

        {/* Document Title & Plain Metadata Lines */}
        <div className="lp-doc-header">
          <p className="lp-doc-classification">{classification}</p>
          <h1 className="lp-doc-title">{title}</h1>
          {subtitle && <p className="lp-doc-subtitle">{subtitle}</p>}

          {(lastUpdated || effectiveDate) && (
            <p className="lp-doc-meta">
              {lastUpdated && (
                <span className="lp-doc-meta-item">
                  <strong>Last Updated:</strong> {lastUpdated}
                </span>
              )}
              {lastUpdated && effectiveDate && (
                <span className="lp-doc-meta-sep" aria-hidden="true">
                  ·
                </span>
              )}
              {effectiveDate && (
                <span className="lp-doc-meta-item">
                  <strong>Effective Date:</strong> {effectiveDate}
                </span>
              )}
            </p>
          )}
        </div>

        {/* Document Content */}
        <div className="lp-body">{children}</div>

        {/* Minimal Letterhead Sign-off */}
        <div className="lp-signoff">
          <strong>SELLIRO – Buy Smart. Sell Easy. Reuse More.</strong>
          <div>
            Hardeep Ramalingam, trading as Selliro · Chennai, Tamil Nadu, India ·{" "}
            <a href="mailto:admin@selliro.in">admin@selliro.in</a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="lp-page-footer">
        <div className="lp-page-footer-inner">
          <span>© {new Date().getFullYear()} Selliro</span>
          <nav className="lp-page-footer-links" aria-label="Footer document links">
            {DOC_LINKS.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </footer>
    </div>
  );
}
