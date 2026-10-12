import { useEffect, useRef, useState, type CSSProperties } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  ArrowDown,
  Check,
  CheckCheck,
  ShieldCheck,
  Truck,
  BadgeCheck,
  Heart,
  Search,
  SlidersHorizontal,
  Home,
  MessageCircle,
  UserRound,
  Plus,
  Menu,
  X,
  Sparkles,
  Leaf,
  Tag,
  Camera,
  Wifi,
  BatteryFull,
  Signal,
  MoveUpRight,
  Coins,
} from "lucide-react";
import { siteConfig } from "./config";
import { usePageMotion } from "./usePageMotion";

type Product = "headphones" | "phone" | "laptop" | "chair" | "shoes" | "camera";
type ModalKind = "download" | "contact" | "privacy" | "terms" | "returns";
const products: Record<Product, { x: string; y: string; label: string }> = {
  headphones: { x: "0%", y: "0%", label: "Silver over-ear headphones" },
  phone: { x: "50%", y: "0%", label: "Lavender smartphone" },
  laptop: { x: "100%", y: "0%", label: "Silver laptop" },
  chair: { x: "0%", y: "100%", label: "Caramel leather and oak lounge chair" },
  shoes: { x: "50%", y: "100%", label: "White and green everyday sneakers" },
  camera: { x: "100%", y: "100%", label: "Silver mirrorless camera" },
};
function ProductPhoto({
  product,
  className = "",
}: {
  product: Product;
  className?: string;
}) {
  const item = products[product];
  return (
    <div
      role="img"
      aria-label={item.label}
      className={`product-photo ${className}`}
      style={{ "--photo-x": item.x, "--photo-y": item.y } as CSSProperties}
    />
  );
}
function Brand({ light = false }: { light?: boolean }) {
  return (
    <a
      className={`brand ${light ? "brand-light" : ""}`}
      href="#top"
      aria-label="Selliro home"
    >
      <svg viewBox="0 0 36 40" aria-hidden="true">
        <path
          d="M28 7H15a8 8 0 0 0 0 16h6a4 4 0 0 1 0 8H8M8 33h13a8 8 0 0 0 0-16h-6a4 4 0 0 1 0-8h13"
          fill="none"
          stroke="currentColor"
          strokeWidth="4.5"
        />
      </svg>
      <span>
        selliro<span className="brand-period">.</span>
      </span>
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
      <path fill="#53E6D4" d="M2 2 16 15 2 28Z" />
      <path fill="#fff" d="m2 2 18 10-4 3Z" />
      <path fill="#b5a8ff" d="m16 15 4 3L2 28Z" />
      <path fill="#e6deff" d="m16 15 4-3 5 3-5 3Z" />
    </svg>
  );
}
function StoreButtons({
  open,
  compact = false,
}: {
  open: () => void;
  compact?: boolean;
}) {
  return (
    <div className={`store-buttons ${compact ? "compact" : ""}`}>
      {(["apple", "google"] as const).map((store) => {
        const url =
          store === "apple" ? siteConfig.appStoreUrl : siteConfig.googlePlayUrl;
        const content = (
          <>
            <StoreIcon store={store} />
            <span>
              <small>
                {store === "apple" ? "Download on the" : "GET IT ON"}
              </small>
              <strong>{store === "apple" ? "App Store" : "Google Play"}</strong>
            </span>
          </>
        );
        return url ? (
          <a
            key={store}
            className="store-button"
            href={url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {content}
          </a>
        ) : (
          <button key={store} className="store-button" onClick={open}>
            {content}
          </button>
        );
      })}
    </div>
  );
}
function PhonePreview({ small = false }: { small?: boolean }) {
  return (
    <div
      className={`phone ${small ? "phone-small" : ""}`}
      aria-label="Illustrative Selliro app preview"
      role="img"
    >
      <div className="phone-screen" aria-hidden="true">
        <div className="status-bar">
          <span>9:41</span>
          <div className="dynamic-island" />
          <span>
            <Signal size={12} />
            <Wifi size={12} />
            <BatteryFull size={16} />
          </span>
        </div>
        <div className="app-top">
          <span className="app-logo">selliro.</span>
          <div>
            <span className="coin-dot">s</span> Rewards
          </div>
        </div>
        <div className="app-greeting">
          A little discovery.
          <br />
          <strong>A lot to love.</strong>
          <Sparkles size={21} />
        </div>
        <div className="app-search">
          <Search size={13} />
          <span>Find your next favourite</span>
          <SlidersHorizontal size={13} />
        </div>
        <div className="app-chips">
          <span>For you</span>
          <span>Mobiles</span>
          <span>Furniture</span>
        </div>
        <div className="app-banner">
          <span>
            Good finds.
            <br />
            <strong>Great beginnings.</strong>
            <small>
              Discover pre-loved <ArrowUpRight size={10} />
            </small>
          </span>
          <ProductPhoto product="headphones" />
        </div>
        <div className="app-heading">
          Fresh finds{" "}
          <span>
            View all <ArrowRight size={9} />
          </span>
        </div>
        <div className="app-products">
          {(["phone", "chair", "camera", "shoes"] as const).map(
            (product, i) => (
              <div className="app-product" key={product}>
                <div className="app-product-image">
                  <ProductPhoto product={product} />
                  <Heart size={11} />
                </div>
                <small>
                  {
                    [
                      "A little upgrade",
                      "Your cosy corner",
                      "Capture more",
                      "Everyday favourites",
                    ][i]
                  }
                </small>
                <strong>
                  {["Smartphones", "Furniture", "Cameras", "Lifestyle"][i]}
                </strong>
                <span>
                  <BadgeCheck size={9} /> Explore on Selliro
                </span>
              </div>
            ),
          )}
        </div>
        <div className="app-nav">
          <span className="active">
            <Home />
            Home
          </span>
          <span>
            <Heart />
            Saved
          </span>
          <span className="app-sell">
            <Plus />
            Sell
          </span>
          <span>
            <MessageCircle />
            Chat
          </span>
          <span>
            <UserRound />
            You
          </span>
        </div>
        <div className="home-indicator" />
      </div>
    </div>
  );
}
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
    "Is doorstep pickup available everywhere?",
    "Doorstep pickup and product verification are available for supported locations and products. Check the options shown in the app for your transaction.",
  ],
  [
    "How does buyer protection work?",
    "Buyer protection is subject to eligibility and the terms for your transaction. Review the product details and applicable policies in the app before buying.",
  ],
  [
    "What are Selliro Coins?",
    "Selliro Coins are part of the app’s rewards experience. Check the rewards section in the app for available ways to earn, use, and redeem them.",
  ],
];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mode, setMode] = useState<"buy" | "sell">("buy");
  const [modal, setModal] = useState<ModalKind>("download");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const heroArtRef = usePageMotion();
  const showModal = (kind: ModalKind) => {
    setModal(kind);
    dialogRef.current?.showModal();
  };
  useEffect(() => {
    document.body.classList.toggle("menu-is-open", menuOpen);
    return () => document.body.classList.remove("menu-is-open");
  }, [menuOpen]);
  const closeMenu = () => setMenuOpen(false);
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
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div id="top" />
      <header className="site-header">
        <div className="nav-wrap">
          <Brand />
          <nav className="desktop-nav" aria-label="Main navigation">
            <a href="#why-selliro">Why Selliro</a>
            <a href="#how-it-works">How it works</a>
            <a href="#discover">Explore</a>
            <a href="#faqs">FAQs</a>
          </nav>
          <a className="button button-purple nav-download" href="#download">
            Get the app <ArrowUpRight size={17} />
          </a>
          <button
            className="menu-toggle"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
        {menuOpen && (
          <nav
            id="mobile-navigation"
            className="mobile-nav"
            aria-label="Mobile navigation"
            onKeyDown={(e) => {
              if (e.key === "Escape") closeMenu();
            }}
          >
            <a href="#why-selliro" onClick={closeMenu}>
              Why Selliro <ArrowUpRight />
            </a>
            <a href="#how-it-works" onClick={closeMenu}>
              How it works <ArrowUpRight />
            </a>
            <a href="#discover" onClick={closeMenu}>
              Explore <ArrowUpRight />
            </a>
            <a href="#faqs" onClick={closeMenu}>
              FAQs <ArrowUpRight />
            </a>
            <a
              className="button button-purple"
              href="#download"
              onClick={closeMenu}
            >
              Get the app <ArrowRight />
            </a>
          </nav>
        )}
      </header>
      <main id="main">
        <section className="hero container" aria-labelledby="hero-title">
          <div className="hero-copy">
            <h1 id="hero-title">
              <span className="hero-line">
                <span>Great things</span>
              </span>{" "}
              <span className="hero-line">
                <span>deserve a</span>
              </span>{" "}
              <span className="hero-line">
                <em>second life.</em>
              </span>
            </h1>
            <p>
              Find pre-owned favourites for less.
              <br />
              Sell the things you no longer need.
            </p>
            <StoreButtons open={() => showModal("download")} />
            <a className="hero-explore" href="#how-it-works">
              See how it works <ArrowDown size={17} />
            </a>
          </div>
          <div className="hero-art" ref={heroArtRef}>
            <div className="hero-phone">
              <PhonePreview />
            </div>
            <div className="find-card">
              <div className="find-card-top">
                <span>Worth discovering</span>
                <Heart size={15} />
              </div>
              <ProductPhoto product="headphones" />
              <div className="find-card-bottom">
                <span>
                  Good sound.
                  <br />
                  <strong>Better value.</strong>
                </span>
                <span className="circle-arrow">
                  <ArrowUpRight size={20} />
                </span>
              </div>
            </div>
            <div className="offer-toast">
              <div className="check-circle">
                <Check size={18} />
              </div>
              <span>
                <strong>It’s a match.</strong>
                <small>Find a price you both love.</small>
              </span>
            </div>
          </div>
        </section>
        <div className="brand-strip">
          <div className="container">
            <span>
              <Tag size={23} /> More value in every find.
            </span>
            <span>
              <MessageCircle size={23} /> A price you agree on.
            </span>
            <span>
              <Leaf size={23} /> Keep great things going.
            </span>
          </div>
        </div>
        <section
          className="why-section section-pad container reveal"
          id="why-selliro"
        >
          <div className="section-heading">
            <div>
              <span className="eyebrow">Why Selliro</span>
              <h2>
                Love the find.
                <br />
                <span className="muted-heading">Love the price.</span>
              </h2>
            </div>
            <p>
              Discover the things you want without paying for brand new. And
              turn what you’ve outgrown into someone else’s next great find.
            </p>
          </div>
          <div className="benefits">
            <article>
              <div className="benefit-icon">
                <Tag />
              </div>
              <span className="number">01 /</span>
              <h3>The upgrade, for less.</h3>
              <p>
                From your next phone to your favourite armchair. Find what you
                love at a price that works for you.
              </p>
            </article>
            <article>
              <div className="benefit-icon mint">
                <Sparkles />
              </div>
              <span className="number">02 /</span>
              <h3>Less clutter. More possibility.</h3>
              <p>
                Turn the things you no longer use into your next opportunity.
                List them, meet a buyer, and pass them on.
              </p>
            </article>
            <article>
              <div className="benefit-icon peach">
                <ShieldCheck />
              </div>
              <span className="number">03 /</span>
              <h3>Confidence comes first.</h3>
              <p>
                Get to know the seller, review the details, and explore buyer
                protection for eligible purchases.
              </p>
            </article>
          </div>
        </section>
        <section className="how-section section-pad" id="how-it-works">
          <div className="container how-layout reveal">
            <div className="how-visual">
              <div className="visual-heading">
                <span>
                  {mode === "buy"
                    ? "See it. Love it. Make an offer."
                    : "One listing. A new beginning."}
                </span>
                <ArrowUpRight size={27} />
              </div>
              <div
                key={mode}
                className={`transaction-card ${mode === "sell" ? "selling" : ""}`}
              >
                <div className="transaction-product">
                  <ProductPhoto product={mode === "buy" ? "chair" : "camera"} />
                  <span className="product-badge">
                    {mode === "buy" ? "Furniture" : "Electronics"}
                  </span>
                </div>
                <div className="transaction-info">
                  <span>
                    {mode === "buy"
                      ? "A home for your next favourite."
                      : "Great things are worth passing on."}
                  </span>
                  <h3>
                    {mode === "buy" ? "Make it yours." : "Pass the good on."}
                  </h3>
                  <div className="transaction-action">
                    {mode === "buy" ? (
                      <MessageCircle size={17} />
                    ) : (
                      <Camera size={17} />
                    )}
                    <span>
                      {mode === "buy"
                        ? "Make an offer"
                        : "Your listing looks good"}
                    </span>
                    <ArrowUpRight size={17} />
                  </div>
                </div>
              </div>
              <div className="transaction-toast">
                <span>
                  <CheckCheck size={19} />
                </span>
                <div>
                  <strong>
                    {mode === "buy"
                      ? "Your kind of find."
                      : "Hello, extra space."}
                  </strong>
                  <small>
                    {mode === "buy"
                      ? "Your kind of price."
                      : "Goodbye, gathering dust."}
                  </small>
                </div>
              </div>
              <div className="visual-footer">
                <span>Explore the Selliro app</span>
                <ArrowUpRight size={23} />
              </div>
            </div>
            <div className="how-copy">
              <span className="eyebrow">Buying & selling</span>
              <h2>
                A better deal.
                <br />A few taps away.
              </h2>
              <div
                className="mode-switch"
                role="group"
                aria-label="Choose buying or selling steps"
              >
                <button
                  aria-pressed={mode === "buy"}
                  onClick={() => setMode("buy")}
                >
                  I’m buying <ArrowDown size={14} />
                </button>
                <button
                  aria-pressed={mode === "sell"}
                  onClick={() => setMode("sell")}
                >
                  I’m selling <ArrowUpRight size={14} />
                </button>
              </div>
              <div className="steps" aria-live="polite" key={mode}>
                {(mode === "buy"
                  ? [
                      [
                        "Discover your next favourite.",
                        "Browse products that fit your life and your budget.",
                      ],
                      [
                        "Make an offer.",
                        "Find a price that works for you and the seller.",
                      ],
                      [
                        "Make it yours.",
                        "Review the details, then buy with confidence.",
                      ],
                    ]
                  : [
                      [
                        "Create your listing.",
                        "Add photos, a few details, and your asking price.",
                      ],
                      [
                        "Agree on a price.",
                        "Receive offers and agree on a price together.",
                      ],
                      [
                        "Pass it on.",
                        "Complete your sale, with pickup where supported.",
                      ],
                    ]
                ).map(([title, description], index) => (
                  <div className="step" key={title}>
                    <span>0{index + 1}</span>
                    <div>
                      <h3>{title}</h3>
                      <p>{description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <a href="#download" className="text-link">
                Get started on Selliro <ArrowUpRight size={18} />
              </a>
            </div>
          </div>
        </section>
        <section
          className="categories-section section-pad container reveal"
          id="discover"
        >
          <div className="section-heading">
            <div>
              <span className="eyebrow">Explore the collection</span>
              <h2>
                Find your next <em>favourite.</em>
              </h2>
            </div>
            <a className="text-link" href="#download">
              Explore on Selliro <ArrowUpRight size={18} />
            </a>
          </div>
          <div className="category-grid">
            {(
              [
                {
                  product: "phone",
                  title: "Smartphones",
                  subtitle: "A smarter upgrade.",
                },
                {
                  product: "laptop",
                  title: "Laptops",
                  subtitle: "Big ideas. Better value.",
                },
                {
                  product: "headphones",
                  title: "Electronics",
                  subtitle: "Tune into a good find.",
                },
                {
                  product: "chair",
                  title: "Furniture",
                  subtitle: "Make yourself at home.",
                },
                {
                  product: "shoes",
                  title: "Lifestyle",
                  subtitle: "A little more you.",
                },
              ] as const
            ).map((item) => (
              <a className="category" href="#download" key={item.title}>
                <div className="category-image">
                  <ProductPhoto product={item.product} />
                  <span className="category-arrow">
                    <ArrowUpRight size={19} />
                  </span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.subtitle}</p>
              </a>
            ))}
          </div>
          <p className="category-note">Discover more in the Selliro app.</p>
        </section>
        <section className="trust-section container reveal" id="trust">
          <div className="trust-intro">
            <span className="eyebrow">Built around trust</span>
            <h2>
              Know more.
              <br />
              Buy with <em>confidence.</em>
            </h2>
            <p>
              A great deal should feel right from the first offer to the final
              handover.
            </p>
            <div className="trust-seal">
              <ShieldCheck size={45} />
              <span>
                Your confidence matters.
                <br />
                <strong>At every step.</strong>
              </span>
            </div>
          </div>
          <div className="trust-features">
            <article>
              <BadgeCheck />
              <div>
                <h3>Know your seller.</h3>
                <p>
                  Seller ratings and verification help you make a more informed
                  choice.
                </p>
              </div>
            </article>
            <article>
              <ShieldCheck />
              <div>
                <h3>Support for your purchase.</h3>
                <p>
                  Buyer protection and supported product checks help you take
                  the next step.
                </p>
              </div>
            </article>
            <article>
              <Truck />
              <div>
                <h3>Pickup, made easier.</h3>
                <p>
                  Supported doorstep pickup makes passing things on a little
                  easier.
                </p>
              </div>
            </article>
            <p className="trust-note">
              Services and protection depend on your location, product, and
              transaction. Check availability and terms in the app.
            </p>
          </div>
        </section>
        <section className="rewards-section container reveal">
          <div className="rewards-symbol">
            <Coins size={37} />
          </div>
          <div>
            <h2>
              Meet <span>Selliro Coins.</span>
            </h2>
            <p>Explore the rewards waiting for you in the app.</p>
          </div>
          <a className="text-link" href="#download">
            Explore rewards <ArrowUpRight size={18} />
          </a>
        </section>
        <section className="faq-section section-pad container reveal" id="faqs">
          <div className="faq-intro">
            <span className="eyebrow">FAQs</span>
            <h2>
              Before you
              <br />
              <em>get started.</em>
            </h2>
            <p>A few answers to help you buy and sell with confidence.</p>
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
                    <Plus size={20} />
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
        <section className="download-section container" id="download">
          <div className="download-copy reveal">
            <h2>
              Your next great
              <br />
              find is <em>waiting.</em>
            </h2>
            <p>Download Selliro. Find something worth keeping.</p>
            <StoreButtons open={() => showModal("download")} />
          </div>
          <div className="download-art" aria-hidden="true">
            <div className="download-phone">
              <PhonePreview small />
            </div>
            <div className="download-sticker">
              <Heart size={22} />
              <span>
                LOVE IT.
                <br />
                RELIVE IT.
              </span>
            </div>
          </div>
        </section>
      </main>
      <footer className="site-footer container">
        <div className="footer-top">
          <div>
            <Brand />
            <p>Great things deserve a second life.</p>
          </div>
          <a className="back-top" href="#top">
            Back to top <MoveUpRight size={17} />
          </a>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} Selliro. All rights reserved.
          </span>
          <nav aria-label="Footer navigation">
            <button onClick={() => showModal("contact")}>Contact</button>
            <a href="#faqs">FAQs</a>
            {policyLink("privacy", "Privacy Policy")}
            {policyLink("terms", "Terms & Conditions")}
            {policyLink("returns", "Return & Refund Policy")}
          </nav>
        </div>
      </footer>
      <dialog
        ref={dialogRef}
        className="info-dialog"
        onClick={(e) => {
          if (e.target === e.currentTarget) dialogRef.current?.close();
        }}
        aria-labelledby="dialog-title"
      >
        <div className="dialog-inner">
          <button
            className="dialog-close"
            aria-label="Close dialog"
            onClick={() => dialogRef.current?.close()}
          >
            <X size={22} />
          </button>
          <span className="dialog-symbol">
            {modal === "download" ? (
              <Sparkles size={30} />
            ) : modal === "contact" ? (
              <MessageCircle size={30} />
            ) : (
              <ShieldCheck size={30} />
            )}
          </span>
          <span className="eyebrow">Selliro</span>
          <h2 id="dialog-title">
            {modal === "download"
              ? "Good things are on their way."
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
              <ArrowUpRight size={17} />
            </a>
          )}
          <button
            className="button button-purple dialog-done"
            onClick={() => dialogRef.current?.close()}
          >
            Got it <Check size={17} />
          </button>
        </div>
      </dialog>
    </>
  );
}
