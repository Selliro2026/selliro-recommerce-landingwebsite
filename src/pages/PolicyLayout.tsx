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
      {/* Minimal Top Utility Bar */}
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

          <button
            type="button"
            className="lp-print-btn"
            onClick={() => window.print()}
          >
            Print / Save PDF
          </button>
        </div>
      </header>

      {/* Letter Pad Sheet */}
      <main className="lp-workspace">
        <article className="lp-sheet">
          {/* Corporate Letterhead Header */}
          <header className="lp-letterhead">
            <div className="lp-lh-left">
              <a href="/" className="lp-wordmark" aria-label="Selliro home">
                selliro<span>.</span>
              </a>
              <div className="lp-lh-entity">Hardeep Ramalingam, trading as Selliro</div>
              <div className="lp-lh-sub">
                Multi-Vendor Recommerce Marketplace
                <br />
                Chennai, Tamil Nadu, India
              </div>
            </div>

            <div className="lp-lh-right">
              <div>
                <strong>Website:</strong>{" "}
                <a href="https://selliro.in" target="_blank" rel="noopener noreferrer">
                  https://selliro.in
                </a>
              </div>
              <div>
                <strong>Email:</strong>{" "}
                <a href="mailto:admin@selliro.in">admin@selliro.in</a>
              </div>
              <div>
                <strong>Operating Market:</strong> Chennai, Tamil Nadu, India
              </div>
            </div>
          </header>

          {/* Document Title & Metadata Table */}
          <div className="lp-doc-header">
            <p className="lp-doc-classification">{classification}</p>
            <h1 className="lp-doc-title">{title}</h1>
            {subtitle && <p className="lp-doc-subtitle">{subtitle}</p>}

            {(lastUpdated || effectiveDate) && (
              <div className="lp-meta-grid" role="group" aria-label="Document details">
                {lastUpdated && (
                  <div className="lp-meta-cell">
                    <span className="lp-meta-key">Last Updated</span>
                    <span className="lp-meta-val">{lastUpdated}</span>
                  </div>
                )}
                {effectiveDate && (
                  <div className="lp-meta-cell">
                    <span className="lp-meta-key">Effective Date</span>
                    <span className="lp-meta-val">{effectiveDate}</span>
                  </div>
                )}
                <div className="lp-meta-cell">
                  <span className="lp-meta-key">Business Entity</span>
                  <span className="lp-meta-val">Hardeep Ramalingam (Selliro)</span>
                </div>
                <div className="lp-meta-cell">
                  <span className="lp-meta-key">Official Contact</span>
                  <span className="lp-meta-val">
                    <a href="mailto:admin@selliro.in">admin@selliro.in</a>
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Document Body */}
          <div className="lp-body">{children}</div>

          {/* Letterhead Sign-off Footer */}
          <footer className="lp-sheet-footer">
            <div>
              <strong>SELLIRO – Buy Smart. Sell Easy. Reuse More.</strong>
              <div>Issued by Hardeep Ramalingam, trading as Selliro · Chennai, Tamil Nadu, India</div>
            </div>
            <div>
              <a href="https://selliro.in" target="_blank" rel="noopener noreferrer">
                selliro.in
              </a>{" "}
              · <a href="mailto:admin@selliro.in">admin@selliro.in</a>
            </div>
          </footer>
        </article>
      </main>

      {/* Bottom Navigation Footer */}
      <footer className="lp-page-footer">
        <div className="lp-page-footer-inner">
          <span>© {new Date().getFullYear()} Selliro. All rights reserved.</span>
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
