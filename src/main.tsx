import React from "react";
import ReactDOM from "react-dom/client";
import "@fontsource/manrope/latin-500.css";
import "@fontsource/manrope/latin-600.css";
import "@fontsource/manrope/latin-800.css";
import "@fontsource/dm-sans/latin-400.css";
import "@fontsource/dm-sans/latin-500.css";
import "@fontsource/dm-sans/latin-600.css";
import App from "./App";
import "./styles.css";
import "./premium.css";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";
import RefundPolicy from "./pages/RefundPolicy";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";

const path = window.location.pathname.replace(/\/+$/, "") || "/";

let root: React.ReactNode;
if (path === "/privacy-policy") {
  root = <PrivacyPolicy />;
} else if (path === "/terms") {
  root = <TermsAndConditions />;
} else if (path === "/refund-policy") {
  root = <RefundPolicy />;
} else if (path === "/about-us") {
  root = <AboutUs />;
} else if (path === "/contact-us") {
  root = <ContactUs />;
} else {
  root = <App />;
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>{root}</React.StrictMode>,
);
