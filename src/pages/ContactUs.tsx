import PolicyLayout from "./PolicyLayout";

export default function ContactUs() {
  return (
    <PolicyLayout
      title="Contact Us"
      classification="Customer Support & Grievance Redressal"
      subtitle="We are here to help!"
    >
      <section>
        <h2>Customer Support</h2>
        <p>
          At Selliro, we value our buyers and sellers. If you have questions about an order, product
          listing, payment, refund, delivery or seller account, our support team is available to
          assist you.
        </p>
        <div className="lp-contact-lines">
          <p>
            <strong>Business Name:</strong> Hardeep Ramalingam, trading as Selliro
          </p>
          <p>
            <strong>Brand Name:</strong> Selliro
          </p>
          <p>
            <strong>Website:</strong>{" "}
            <a href="https://selliro.in" target="_blank" rel="noopener noreferrer">
              https://selliro.in
            </a>
          </p>
          <p>
            <strong>Email:</strong>{" "}
            <a href="mailto:admin@selliro.in">admin@selliro.in</a>
          </p>
          <p>
            <strong>Operating Market:</strong> Chennai, Tamil Nadu, India
          </p>
        </div>
      </section>

      <section>
        <h2>How Can We Help You?</h2>
        <p>You can contact us for assistance with:</p>
        <ul>
          <li>Order and purchase enquiries.</li>
          <li>Seller registration and product listings.</li>
          <li>Payment and transaction issues.</li>
          <li>Delivery and shipping enquiries.</li>
          <li>Cancellation and refund requests.</li>
          <li>Returns and damaged product complaints.</li>
          <li>Account-related issues.</li>
          <li>Technical difficulties.</li>
          <li>Privacy-related requests.</li>
        </ul>
      </section>

      <section>
        <h2>Grievance Redressal</h2>
        <p>
          For complaints or unresolved issues, you may contact our designated Grievance Officer.
        </p>
        <div className="lp-contact-lines">
          <p>
            <strong>Grievance Officer:</strong> Hardeep Ramalingam
          </p>
          <p>
            <strong>Designation:</strong> Grievance Officer
          </p>
          <p>
            <strong>Business:</strong> Selliro
          </p>
          <p>
            <strong>Email:</strong>{" "}
            <a href="mailto:admin@selliro.in">admin@selliro.in</a>
          </p>
        </div>
        <p>
          We aim to acknowledge complaints within 48 hours of receipt and resolve them within 30
          days, subject to the nature of the complaint and applicable legal requirements.
        </p>
      </section>

      <section>
        <h2>What to Include in Your Complaint</h2>
        <p>To help us resolve your concern efficiently, please provide:</p>
        <ul>
          <li>Your registered name.</li>
          <li>Registered mobile number or email address.</li>
          <li>Order ID, if applicable.</li>
          <li>Description of the issue.</li>
          <li>Relevant photographs, videos or transaction details, where applicable.</li>
        </ul>
        <p>
          <strong>
            Please do not share your password, OTP, CVV or other confidential payment credentials.
          </strong>
        </p>
      </section>

      <section>
        <h2>Our Commitment</h2>
        <p>
          We are committed to providing a reliable marketplace experience and addressing customer
          concerns fairly.
        </p>
        <div className="lp-contact-lines">
          <p>
            <strong>Selliro Customer Support</strong>
          </p>
          <p>
            <strong>Email:</strong>{" "}
            <a href="mailto:admin@selliro.in">admin@selliro.in</a>
          </p>
          <p>
            <strong>Website:</strong>{" "}
            <a href="https://selliro.in" target="_blank" rel="noopener noreferrer">
              https://selliro.in
            </a>
          </p>
        </div>
        <p>We appreciate your trust in Selliro.</p>
      </section>
    </PolicyLayout>
  );
}

