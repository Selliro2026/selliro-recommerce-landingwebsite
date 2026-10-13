import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { siteConfig } from "./config";
import { usePageMotion } from "./usePageMotion";
type ModalKind = "download" | "contact" | "privacy" | "terms" | "returns";

function Arrow({
  direction = "up-right",
}: {
  direction?: "up-right" | "right" | "left" | "down";
}) {
  return (
    <svg
      className={`arrow arrow-${direction}`}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path d="M5 19 19 5M5 5h14v14" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}
function keepDialogFocus(event: KeyboardEvent<HTMLDialogElement>) {
  if (event.key !== "Tab") return;
  const targets = event.currentTarget.querySelectorAll<HTMLElement>(
    "a[href], button:not(:disabled)",
  );
  const first = targets[0];
  const last = targets[targets.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last?.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first?.focus();
  }
}
function Brand({ onClick }: { onClick?: () => void }) {
  return (
    <a
      className="brand"
      href="#top"
      aria-label="Selliro home"
      onClick={onClick}
    >
      selliro<span>.</span>
    </a>
  );
}
function StoreIcon({ store }: { store: "apple" | "google" }) {
  return store === "apple" ? (
    <svg viewBox="0 0 24 28" aria-hidden="true">
      <path
        fill="currentColor"
        d="M19.6 14.7c0-3 2.5-4.5 2.6-4.6-1.4-2-3.5-2.2-4.3-2.2-1.8-.2-3.6 1.1-4.5 1.1-.9 0-2.3-1.1-3.8-1-2 0-3.8 1.1-4.8 2.8-2.1 3.5-.5 8.8 1.4 11.7.9 1.4 2 2.9 3.5 2.8 1.4 0 2-1 3.8-1 1.7 0 2.2 1 3.8 1 1.6 0 2.5-1.4 3.5-2.8 1.1-1.6 1.6-3.2 1.6-3.3-.1 0-2.8-1.1-2.8-4.5ZM16.6 6c.8-1 1.4-2.4 1.2-3.8-1.2.1-2.7.8-3.6 1.8-.8.9-1.5 2.3-1.3 3.6 1.4.1 2.8-.7 3.7-1.6Z"
      />
    </svg>
  ) : (
    <svg viewBox="0 0 28 30" aria-hidden="true">
      <path
        fill="currentColor"
        d="m3 2 13 13L3 28V2Zm2-1 16 9-4 4L5 1Zm12 15 4 4-16 9 12-13Zm1-1 5-4 4 3a1 1 0 0 1 0 2l-4 3-5-4Z"
      />
    </svg>
  );
}
function StoreButtons({ open }: { open: () => void }) {
  return (
    <div className="store-buttons">
      {(["apple", "google"] as const).map((store) => {
        const url =
          store === "apple" ? siteConfig.appStoreUrl : siteConfig.googlePlayUrl;
        const content = (
          <>
            <StoreIcon store={store} />
            <strong>{store === "apple" ? "App Store" : "Google Play"}</strong>
          </>
        );
        return url ? (
          <a
            key={store}
            className="store-button"
            aria-label={
              store === "apple"
                ? "Download on the App Store"
                : "GET IT ON Google Play"
            }
            href={url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {content}
          </a>
        ) : (
          <button
            key={store}
            className="store-button"
            aria-label={
              store === "apple"
                ? "Download on the App Store"
                : "GET IT ON Google Play"
            }
            onClick={open}
          >
            {content}
          </button>
        );
      })}
    </div>
  );
}
const buyingSteps = [
  [
    "Discover your next favourite.",
    "Browse pre-owned tech, furniture, and everyday finds. Take a closer look at the details.",
  ],
  [
    "Make an offer.",
    "Send the seller your price. Agree on a deal that feels right for both of you.",
  ],
  [
    "Make it yours.",
    "Review the listing and your purchase options, then take the next step in the app.",
  ],
];
const sellingSteps = [
  [
    "Create your listing.",
    "Take a few clear photos. Add the details and set your asking price.",
  ],
  [
    "Agree on a price.",
    "Hear from interested buyers and respond to their offers, all in one place.",
  ],
  [
    "Pass it on.",
    "Complete the sale and arrange the handover, with doorstep pickup where supported.",
  ],
];
const faqItems = [
  [
    "What is Selliro?",
    "Selliro is a mobile app for buying and selling pre-owned products. Discover something you love, make an offer, or give the things you no longer use a new home.",
  ],
  [
    "What can I buy and sell?",
    "Explore pre-owned smartphones, laptops, electronics, furniture, and lifestyle products. Check the app for available categories and listing guidelines.",
  ],
  [
    "How does Make an Offer work?",
    "Found something you like? Send the seller an offer through the app. You can agree on a price together before taking the next step.",
  ],
  [
    "How does secure delivery work?",
    "Delivery connects your purchase from seller to buyer through Selliro. Pickup and delivery availability depend on the product and location. Check the options and next steps shown in the app for your transaction.",
  ],
  [
    "How does the 3-day return window work?",
    "Selliro offers a 3-day return window to check your purchase and request a return. Eligibility and return terms apply; review the policy and the details for your transaction in the app.",
  ],
  [
    "What are Selliro Coins?",
    "Selliro Coins are part of the app’s rewards experience. Check the rewards section in the app for available ways to earn, use, and redeem them.",
  ],
];
function AppPreview({ eager = false }: { eager?: boolean }) {
  return (
    <div className="app-device">
      <div className="device-screen">
        <img
          className="app-home-image"
          src="/images/app-home.webp"
          alt="Selliro app home screen with the redesigned Buy. Sell. Repeat. banner"
          width="724"
          height="2171"
          loading={eager ? "eager" : "lazy"}
          fetchPriority={eager ? "high" : "auto"}
        />
        <div className="device-bottom-crop" aria-hidden="true" />
      </div>
    </div>
  );
}
function RecommercePhoto({
  scene,
  className = "",
}: {
  scene: "seller" | "delivery" | "buyer";
  className?: string;
}) {
  return (
    <div className={`recommerce-photo photo-${scene} ${className}`}>
      <img
        src={
          scene === "buyer"
            ? "/images/check-your-find.webp"
            : "/images/recommerce-stories.webp"
        }
        alt={
          scene === "seller"
            ? "A seller carefully packing a pre-owned camera for its next owner"
            : scene === "delivery"
              ? "A buyer receiving a securely packed parcel at her doorstep"
              : "A buyer checking her pre-owned camera after delivery"
        }
        width={scene === "buyer" ? 1448 : 2135}
        height={scene === "buyer" ? 1086 : 736}
        loading="lazy"
      />
    </div>
  );
}
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mode, setMode] = useState<"buy" | "sell">("buy");
  const [step, setStep] = useState(0);
  const [modal, setModal] = useState<ModalKind>("download");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [showDock, setShowDock] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const menuRef = useRef<HTMLDialogElement>(null);
  const pageRef = usePageMotion();
  const showModal = (kind: ModalKind) => {
    setModal(kind);
    dialogRef.current?.showModal();
  };
  const closeMenu = () => {
    menuRef.current?.close();
    setMenuOpen(false);
  };
  useEffect(() => {
    document.body.classList.toggle("menu-is-open", menuOpen);
    return () => document.body.classList.remove("menu-is-open");
  }, [menuOpen]);
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 901px)");
    const closeOnDesktop = () => {
      if (desktop.matches) {
        menuRef.current?.close();
        setMenuOpen(false);
      }
    };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);
  useEffect(() => {
    const hero = document.querySelector(".hero");
    const download = document.getElementById("download");
    if (!hero || !download) return;
    const update = () =>
      setShowDock(
        hero.getBoundingClientRect().bottom < 75 &&
          download.getBoundingClientRect().top > window.innerHeight,
      );
    const observer = new IntersectionObserver(update, {
      threshold: [0, 0.1, 0.5, 1],
    });
    observer.observe(hero);
    observer.observe(download);
    window.addEventListener("resize", update);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);
  const policyLink = (kind: "privacy" | "terms" | "returns", label: string) => {
    const url = siteConfig[`${kind}Url`];
    return url ? (
      <a href={url} target="_blank" rel="noopener noreferrer">
        {label}
      </a>
    ) : (
      <button onClick={() => showModal(kind)}>{label}</button>
    );
  };
  const steps = mode === "buy" ? buyingSteps : sellingSteps;
  return (
    <div ref={pageRef}>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div id="top" />
      <header className="site-header">
        <div className="nav-wrap container">
          <Brand />
          <nav className="desktop-nav" aria-label="Main navigation">
            <a href="#why-selliro">The app</a>
            <a href="#how-it-works">How it works</a>
            <a href="#trust">Delivery & returns</a>
          </nav>
          <div className="nav-actions">
            <a className="button button-purple nav-download" href="#download">
              Get the app <Arrow />
            </a>
            <button
              className="menu-toggle"
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              onClick={() => {
                menuRef.current?.showModal();
                setMenuOpen(true);
              }}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
        <div className="reading-progress" aria-hidden="true" />
      </header>
      <dialog
        ref={menuRef}
        className="menu-dialog"
        onKeyDown={keepDialogFocus}
        onClose={() => setMenuOpen(false)}
        onClick={(e) => {
          if (e.target === e.currentTarget) closeMenu();
        }}
        aria-label="Navigation menu"
      >
        <div className="mobile-menu-heading">
          <Brand onClick={closeMenu} />
          <button
            className="icon-button close-icon"
            onClick={closeMenu}
            aria-label="Close menu"
          >
            <span />
            <span />
          </button>
        </div>
        <nav
          id="mobile-navigation"
          className="mobile-nav"
          aria-label="Mobile navigation"
        >
          {[
            ["why-selliro", "The app"],
            ["how-it-works", "How it works"],
            ["trust", "Delivery & returns"],
            ["faqs", "FAQs"],
          ].map(([id, label], i) => (
            <a key={id} href={`#${id}`} onClick={closeMenu}>
              <span className="menu-number">0{i + 1}</span>
              {label}
              <Arrow />
            </a>
          ))}
          <a
            className="button button-purple"
            href="#download"
            onClick={closeMenu}
          >
            Get the app <Arrow />
          </a>
        </nav>
        <p className="mobile-menu-foot">Good things deserve another chapter.</p>
      </dialog>
      <main id="main">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-inner container">
            <div className="hero-copy">
              <h1 id="hero-title">
                <span className="hero-line">
                  <span>Buy. Sell.</span>
                </span>{" "}
                <span className="hero-line">
                  <span>Repeat.</span>
                </span>
              </h1>
              <p>
                Buy pre-owned. Sell with ease.
                <br />
                All in the Selliro app.
              </p>
              <StoreButtons open={() => showModal("download")} />
              <a className="hero-explore text-link" href="#how-it-works">
                See how it works <Arrow direction="down" />
              </a>
            </div>
            <div className="hero-stage">
              <div className="app-stage-backdrop" aria-hidden="true" />
              <div className="hero-phone">
                <AppPreview eager />
              </div>
            </div>
          </div>
          <div
            className="app-promises container"
            aria-label="Selliro app benefits"
          >
            <span>Buy & sell in one app</span>
            <span>Secure delivery</span>
            <span>3-day return window</span>
          </div>
        </section>
        <section
          className="why-section container section-space"
          id="why-selliro"
        >
          <div className="section-marker reveal">
            <span>Meet the Selliro app</span>
          </div>
          <div className="why-heading">
            <div className="why-story reveal">
              <h2>
                Your next find.
                <br />
                Someone’s fresh start.
              </h2>
              <p>
                A phone you’ve had your eye on. A camera ready for its next
                adventure. Selliro brings buyers and sellers together to give
                pre-owned things a new beginning.
              </p>
            </div>
            <RecommercePhoto scene="seller" className="life-photo" />
          </div>
          <div className="benefits">
            {[
              [
                "Find your kind of pre-owned.",
                "Browse the app for everyday essentials and unexpected favourites. Good things, ready for a second chapter.",
              ],
              [
                "Make space. Make a sale.",
                "A few photos, the details, your price. Turn the things you no longer use into someone’s next great find.",
              ],
              [
                "Make the offer yours.",
                "Send an offer, talk to the seller, and agree on a price you’re both happy with.",
              ],
            ].map(([title, copy]) => (
              <article className="reveal" key={title}>
                <div>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
        <section
          className="how-section container section-space"
          id="how-it-works"
        >
          <div className="section-marker reveal">
            <span>How it works</span>
          </div>
          <div className="how-layout">
            <div className="how-intro reveal">
              <h2>
                One app.
                <br />
                <span className="purple-text">Both sides of the deal.</span>
              </h2>
              <div
                className="mode-switch"
                role="group"
                aria-label="Choose buying or selling steps"
              >
                <button
                  aria-pressed={mode === "buy"}
                  onClick={() => {
                    setMode("buy");
                    setStep(0);
                  }}
                >
                  I’m buying
                </button>
                <button
                  aria-pressed={mode === "sell"}
                  onClick={() => {
                    setMode("sell");
                    setStep(0);
                  }}
                >
                  I’m selling
                </button>
              </div>
            </div>
            <div className={`journey-visual journey-${mode} reveal`}>
              <div className="journey-scene" key={`${mode}-${step}`}>
                <RecommercePhoto
                  scene={mode === "buy" ? "buyer" : "seller"}
                  className="journey-photo"
                />
                <div className="journey-card">
                  <div className="journey-card-top">
                    <span>
                      {mode === "buy"
                        ? [
                            "Find your favourite",
                            "Make it a conversation",
                            "Ready for the next step",
                          ][step]
                        : [
                            "Your listing looks good",
                            "A conversation worth having",
                            "Ready for a new home",
                          ][step]}
                    </span>
                  </div>
                  <strong>
                    {mode === "buy"
                      ? [
                          "A great find. Even better value.",
                          "Your find. Your offer.",
                          "From their shelf to yours.",
                        ][step]
                      : [
                          "A few details. A fresh start.",
                          "Find a price that works.",
                          "Good things keep going.",
                        ][step]}
                  </strong>
                  <a href="#download" className="journey-card-link">
                    {mode === "buy"
                      ? [
                          "Discover on Selliro",
                          "Talk to the seller",
                          "Review your purchase",
                        ][step]
                      : [
                          "Photos · Details · Your price",
                          "Respond to an offer",
                          "Arrange your handover",
                        ][step]}
                    <Arrow direction="right" />
                  </a>
                </div>
              </div>
              <div className="journey-bottomline">
                <span className="step-dots" aria-hidden="true">
                  {[0, 1, 2].map((i) => (
                    <span key={i} className={i === step ? "active" : ""} />
                  ))}
                </span>
              </div>
            </div>
            <div
              className="steps"
              aria-label={`${mode === "buy" ? "Buying" : "Selling"} steps`}
            >
              {steps.map(([title, description], index) => (
                <div
                  className={`step ${step === index ? "active" : ""}`}
                  key={title}
                >
                  <h3>
                    <button
                      aria-expanded={step === index}
                      aria-controls={`step-description-${index}`}
                      onClick={() => setStep(index)}
                    >
                      <span className="step-number">0{index + 1}</span>
                      {title}
                      <Arrow direction="right" />
                    </button>
                  </h3>
                  <div
                    className="step-description"
                    id={`step-description-${index}`}
                    inert={step !== index}
                    aria-hidden={step !== index}
                  >
                    <div>
                      <p>{description}</p>
                    </div>
                  </div>
                </div>
              ))}
              <a href="#download" className="text-link">
                Get started on Selliro <Arrow />
              </a>
            </div>
          </div>
        </section>
        <section className="trust-section" id="trust">
          <div className="container section-space">
            <div className="trust-heading reveal">
              <span className="eyebrow">From a good deal to your doorstep</span>
              <h2>
                A little more
                <br />
                <span>peace of mind.</span>
              </h2>
            </div>
            <div className="assurance-grid">
              <article className="delivery-story reveal">
                <RecommercePhoto scene="delivery" />
                <div className="assurance-copy">
                  <h3>Secure delivery.</h3>
                  <p>
                    From the seller’s hands to yours. Arrange delivery through
                    Selliro and follow the next steps in the app.
                  </p>
                  <a
                    href="#faqs"
                    className="text-link"
                    onClick={() => setOpenFaq(3)}
                  >
                    Delivery, explained <Arrow />
                  </a>
                </div>
              </article>
              <article className="return-story reveal">
                <div className="return-window" aria-hidden="true">
                  <span>3</span>
                  <span>
                    days to
                    <br />
                    check your find.
                  </span>
                </div>
                <div className="assurance-copy">
                  <h3>A 3-day return window.</h3>
                  <p>
                    Take a closer look at your pre-owned find. You have a 3-day
                    window to request a return, subject to eligibility and
                    return terms.
                  </p>
                  <a
                    href="#faqs"
                    className="text-link"
                    onClick={() => setOpenFaq(4)}
                  >
                    How returns work <Arrow />
                  </a>
                </div>
              </article>
            </div>
            <p className="trust-note">
              Delivery availability and return eligibility depend on the
              product, location, and transaction. Check the terms in the app
              before buying.
            </p>
          </div>
        </section>
        <section className="rewards-section container reveal">
          <div className="rewards-copy">
            <h2>Good finds. With rewards.</h2>
            <p>
              Buy. Sell. Discover Selliro Coins. Explore ways to earn and use
              rewards, right in the app.
            </p>
          </div>
          <a className="text-link" href="#download">
            Discover Coins <Arrow />
          </a>
        </section>
        <section className="faq-section container section-space" id="faqs">
          <div className="faq-intro reveal">
            <span className="eyebrow">Your questions, answered</span>
            <h2>
              A few things
              <br />
              before you start.
            </h2>
            <p>Buying, selling, and everything in between.</p>
          </div>
          <div className="faq-list">
            {faqItems.map(([question, answer], index) => (
              <article
                className={`faq-item ${openFaq === index ? "open" : ""}`}
                key={question}
              >
                <h3>
                  <button
                    aria-expanded={openFaq === index}
                    aria-controls={`faq-answer-${index}`}
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  >
                    {question}
                    <span className="plus" aria-hidden="true" />
                  </button>
                </h3>
                <div
                  id={`faq-answer-${index}`}
                  className="faq-answer"
                  inert={openFaq !== index}
                  aria-hidden={openFaq !== index}
                >
                  <div className="faq-answer-inner">
                    <p>{answer}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
        <section className="download-section" id="download">
          <div className="container download-layout">
            <div className="download-copy reveal">
              <h2>
                Your next chapter.
                <br />
                <span>Starts on Selliro.</span>
              </h2>
              <p>
                Great finds. More space. New possibilities.
                <br className="desktop-break" /> Download the app and get
                started.
              </p>
              <StoreButtons open={() => showModal("download")} />
            </div>
            <div className="download-art">
              <span className="download-background-word" aria-hidden="true">
                selliro.
              </span>
              <div className="download-phone">
                <AppPreview />
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="site-footer container">
        <div className="footer-top">
          <Brand />
          <p>Great things deserve a second life.</p>
          <a className="text-link back-top" href="#top">
            Back to top <Arrow />
          </a>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Selliro</span>
          <nav aria-label="Footer navigation">
            <button onClick={() => showModal("contact")}>Contact</button>
            <a href="#faqs">FAQs</a>
            {policyLink("privacy", "Privacy Policy")}
            {policyLink("terms", "Terms & Conditions")}
            {policyLink("returns", "Return & Refund Policy")}
          </nav>
        </div>
      </footer>
      <div
        className={`mobile-dock ${showDock && !menuOpen ? "visible" : ""}`}
        inert={!showDock || menuOpen}
      >
        <span>Your next great find.</span>
        <button
          className="button button-purple"
          onClick={() => showModal("download")}
        >
          Get Selliro <Arrow />
        </button>
      </div>
      <dialog
        ref={dialogRef}
        className="info-dialog"
        onKeyDown={keepDialogFocus}
        onClick={(e) => {
          if (e.target === e.currentTarget) dialogRef.current?.close();
        }}
        aria-labelledby="dialog-title"
      >
        <div className="dialog-inner">
          <button
            className="icon-button close-icon dialog-close"
            aria-label="Close dialog"
            onClick={() => dialogRef.current?.close()}
          >
            <span />
            <span />
          </button>
          <span className="eyebrow">Selliro</span>
          <h2 id="dialog-title">
            {modal === "download"
              ? "Your next find is on its way."
              : modal === "contact"
                ? "Let’s keep in touch."
                : {
                    privacy: "Privacy Policy",
                    terms: "Terms & Conditions",
                    returns: "Return & Refund Policy",
                  }[modal]}
          </h2>
          <p>
            {modal === "download"
              ? "Official App Store and Google Play download links will be available here soon. Check back to discover Selliro."
              : modal === "contact"
                ? siteConfig.contactEmail
                  ? "We’d love to hear from you."
                  : "Our official contact details will be available here soon. Thank you for your interest in Selliro."
                : "Our full policy will be published here before launch. Please check back for the approved terms before using Selliro."}
          </p>
          {modal === "contact" && siteConfig.contactEmail && (
            <a className="text-link" href={`mailto:${siteConfig.contactEmail}`}>
              {siteConfig.contactEmail}
              <Arrow />
            </a>
          )}
          <button
            className="button button-purple dialog-done"
            onClick={() => dialogRef.current?.close()}
          >
            Got it <Arrow direction="right" />
          </button>
        </div>
      </dialog>
    </div>
  );
}
