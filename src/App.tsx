import {
  useEffect,
  lazy,
  Suspense,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
} from "react";
import { siteConfig } from "./config";
import { usePageMotion } from "./usePageMotion";
const ProductScene = lazy(() => import("./components/ProductScene"));

type Product = "headphones" | "phone" | "laptop" | "chair" | "shoes" | "camera";
type ModalKind = "download" | "contact" | "privacy" | "terms" | "returns";
const products: Record<Product, { x: string; y: string; label: string }> = {
  headphones: { x: "0%", y: "0%", label: "Silver over-ear headphones" },
  phone: { x: "50%", y: "0%", label: "Lavender smartphone" },
  laptop: { x: "100%", y: "0%", label: "Silver laptop" },
  chair: { x: "0%", y: "100%", label: "Leather and oak lounge chair" },
  shoes: { x: "50%", y: "100%", label: "White and green everyday sneakers" },
  camera: { x: "100%", y: "100%", label: "Silver mirrorless camera" },
};
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
const categories = [
  {
    product: "phone",
    title: "Smartphones",
    description: "Your next upgrade.",
    number: "01",
  },
  {
    product: "chair",
    title: "Furniture",
    description: "Make it feel like home.",
    number: "02",
  },
  {
    product: "headphones",
    title: "Electronics",
    description: "Good sound. Good company.",
    number: "03",
  },
  {
    product: "laptop",
    title: "Laptops",
    description: "Room for your next big idea.",
    number: "04",
  },
  {
    product: "shoes",
    title: "Lifestyle",
    description: "Find your everyday favourites.",
    number: "05",
  },
] as const;
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
function AppPreview() {
  return (
    <div
      className="app-device"
      role="img"
      aria-label="Illustrative Selliro app preview"
    >
      <div className="device-screen" aria-hidden="true">
        <div className="device-status">
          <span>9:41</span>
          <span className="device-camera" />
          <span>▰</span>
        </div>
        <div className="device-brand">
          selliro<span>.</span>
        </div>
        <div className="device-title">
          What will you
          <br />
          find today?
        </div>
        <div className="device-search">
          <span>⌕</span> Search Selliro
        </div>
        <div className="device-tabs">
          <span>For you</span>
          <span>Tech</span>
          <span>Home</span>
        </div>
        <div className="device-products">
          {(["headphones", "chair", "phone", "camera"] as const).map(
            (product, index) => (
              <div key={product}>
                <ProductPhoto product={product} />
                <span>
                  {
                    [
                      "Sound you’ll love",
                      "A new favourite seat",
                      "Your next upgrade",
                      "A different perspective",
                    ][index]
                  }
                </span>
                <strong>
                  {
                    ["Electronics", "Furniture", "Smartphones", "Cameras"][
                      index
                    ]
                  }
                </strong>
              </div>
            ),
          )}
        </div>
        <div className="device-bottom">
          <span>Explore</span>
          <span>Saved</span>
          <span className="device-add">+</span>
          <span>Inbox</span>
        </div>
        <div className="device-home" />
      </div>
    </div>
  );
}
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mode, setMode] = useState<"buy" | "sell">("buy");
  const [step, setStep] = useState(0);
  const [modal, setModal] = useState<ModalKind>("download");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [railPosition, setRailPosition] = useState({ start: true, end: false });
  const [showDock, setShowDock] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const menuRef = useRef<HTMLDialogElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
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
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const update = () =>
      setRailPosition({
        start: rail.scrollLeft < 8,
        end: rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 8,
      });
    const observer = new ResizeObserver(update);
    observer.observe(rail);
    rail.addEventListener("scroll", update, { passive: true });
    update();
    return () => {
      observer.disconnect();
      rail.removeEventListener("scroll", update);
    };
  }, []);
  const scrollRail = (direction: number) => {
    const rail = railRef.current;
    if (!rail) return;
    const card = rail.querySelector<HTMLElement>(".category");
    const distance =
      (card?.offsetWidth ?? 300) + parseFloat(getComputedStyle(rail).columnGap);
    rail.scrollBy({
      left: direction * distance,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  };
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
            <a href="#discover">Explore</a>
            <a href="#how-it-works">How it works</a>
            <a href="#why-selliro">Why Selliro</a>
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
            ["discover", "Explore"],
            ["how-it-works", "How it works"],
            ["why-selliro", "Why Selliro"],
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
                  <span>Great things.</span>
                </span>{" "}
                <span className="hero-line">
                  <span>Better prices.</span>
                </span>
              </h1>
              <p>
                Buy and sell pre-owned.
                <br />
                Find more of what you love.
              </p>
              <StoreButtons open={() => showModal("download")} />
              <a className="hero-explore text-link" href="#discover">
                Explore the good finds <Arrow direction="down" />
              </a>
            </div>
            <div className="hero-stage">
              <Suspense
                fallback={
                  <div
                    className="scene-loading"
                    role="img"
                    aria-label="Silver headphones and a smartphone"
                  >
                    <ProductPhoto product="headphones" />
                    <ProductPhoto product="phone" />
                  </div>
                }
              >
                <ProductScene />
              </Suspense>
            </div>
          </div>
        </section>
        <section
          className="why-section container section-space"
          id="why-selliro"
        >
          <div className="section-marker reveal">
            <span>Why Selliro</span>
          </div>
          <div className="why-heading">
            <div className="why-story reveal">
              <h2>
                Great taste.
                <br />A smaller price tag.
              </h2>
              <p>
                That phone you’ve had your eye on. The chair that makes the
                room. Find things you’ll love, with plenty of life left in them.
              </p>
            </div>
            <div className="life-photo">
              <img
                src="/images/selliro-editorial.webp"
                alt="A leather lounge chair and headphones in a sunlit home"
                width="1122"
                height="1402"
                loading="lazy"
              />
            </div>
          </div>
          <div className="benefits">
            {[
              [
                "Find more for your money.",
                "Shop pre-owned and make room in your budget for the things that matter.",
              ],
              [
                "Sell what’s sitting still.",
                "Your unused things could be exactly what someone else is looking for.",
              ],
              [
                "Make a deal together.",
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
        <section className="discovery-section" id="discover">
          <div className="container section-space">
            <div className="section-marker reveal">
              <span>Explore the collection</span>
            </div>
            <div className="discovery-heading reveal">
              <h2>
                A little discovery.
                <br />
                <span>A lot to love.</span>
              </h2>
              <div className="discovery-controls">
                <div className="rail-buttons">
                  <button
                    className="icon-button"
                    aria-label="Previous categories"
                    aria-controls="category-rail"
                    disabled={railPosition.start}
                    onClick={() => scrollRail(-1)}
                  >
                    <Arrow direction="left" />
                  </button>
                  <button
                    className="icon-button"
                    aria-label="Next categories"
                    aria-controls="category-rail"
                    disabled={railPosition.end}
                    onClick={() => scrollRail(1)}
                  >
                    <Arrow direction="right" />
                  </button>
                </div>
              </div>
            </div>
            <div
              className="category-rail"
              id="category-rail"
              ref={railRef}
              role="region"
              aria-label="Pre-owned categories"
              tabIndex={0}
            >
              {categories.map((item) => (
                <a className="category" href="#download" key={item.title}>
                  <div className="category-image">
                    <ProductPhoto product={item.product} />
                    <span className="category-action">
                      <Arrow />
                    </span>
                  </div>
                  <div className="category-caption">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </a>
              ))}
            </div>
            <div className="discovery-footer">
              <a href="#download" className="text-link">
                Explore Selliro <Arrow />
              </a>
            </div>
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
                Meet your next
                <br />
                <span className="purple-text">great deal.</span>
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
                <div className="journey-product">
                  <ProductPhoto
                    product={mode === "buy" ? "headphones" : "camera"}
                  />
                </div>
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
                          "Great sound. Even better value.",
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
          <div className="container trust-layout section-space">
            <div className="trust-intro reveal">
              <span className="eyebrow">Built around trust</span>
              <h2>
                A good deal
                <br />
                should <span>feel good.</span>
              </h2>
              <p>
                Know who you’re buying from, what you’re buying, and what comes
                next.
              </p>
              <a href="#faqs" className="text-link">
                Your questions, answered <Arrow />
              </a>
            </div>
            <div className="trust-features">
              {[
                [
                  "01",
                  "Know your seller.",
                  "Seller ratings and verification help you get to know the person behind the product.",
                ],
                [
                  "02",
                  "Know your purchase.",
                  "Review the details and explore buyer protection and product checks for eligible purchases.",
                ],
                [
                  "03",
                  "Plan the handover.",
                  "Supported doorstep pickup makes it easier to send your things on their way.",
                ],
              ].map(([number, title, copy]) => (
                <article className="reveal" key={number}>
                  <div>
                    <h3>{title}</h3>
                    <p>{copy}</p>
                  </div>
                </article>
              ))}
              <p className="trust-note">
                Protection, verification, and pickup depend on your location,
                product, and transaction. Check availability and terms in the
                app.
              </p>
            </div>
          </div>
        </section>
        <section className="rewards-section container reveal">
          <div className="rewards-copy">
            <h2>Good finds. With rewards.</h2>
            <p>
              Meet Selliro Coins. Explore ways to earn and use rewards in the
              app.
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
                It’s out there.
                <br />
                <span>Find it on Selliro.</span>
              </h2>
              <p>
                Your next great find. Someone’s next favourite.
                <br className="desktop-break" /> Buy and sell pre-owned, all in
                one app.
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
