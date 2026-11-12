import PolicyLayout from "./PolicyLayout";

export default function PrivacyPolicy() {
  return (
    <PolicyLayout
      title="Privacy Policy"
      lastUpdated="3 November 2026"
      effectiveDate="3 November 2026"
    >
      {/* 1 */}
      <section className="policy-section">
        <h2 className="policy-section-title">1. Introduction</h2>
        <p>Welcome to Selliro.</p>
        <p>
          Selliro operates a multi-vendor recommerce marketplace that enables individuals and
          businesses to buy and sell new and pre-owned products through our mobile application and
          website.
        </p>
        <p>
          We respect your privacy and are committed to protecting your personal information. This
          Privacy Policy explains how we collect, use, store, process, disclose and protect your
          personal information when you access or use our application, website and related services.
        </p>
        <p>This policy applies to all users, including:</p>
        <ul className="policy-list">
          <li>Buyers purchasing products through Selliro.</li>
          <li>Individual sellers listing products.</li>
          <li>Business sellers and registered merchants.</li>
          <li>Visitors accessing our website or application.</li>
        </ul>
        <p>
          By accessing or using Selliro, you acknowledge that you have read this Privacy Policy.
          Where consent is legally required, we will obtain it through an appropriate consent
          mechanism.
        </p>
      </section>

      {/* 2 */}
      <section className="policy-section">
        <h2 className="policy-section-title">2. Information We Collect</h2>
        <p>
          We may collect the following categories of information depending on how you use Selliro.
        </p>

        <h3 className="policy-sub-title">2.1 Personal Information</h3>
        <p>When you register or use our services, we may collect:</p>
        <ul className="policy-list">
          <li>Full name.</li>
          <li>Mobile number.</li>
          <li>Email address.</li>
          <li>Residential or delivery address.</li>
          <li>Account login and authentication information.</li>
          <li>User profile information.</li>
        </ul>
        <p>
          We use this information to create and manage your account, verify your identity through
          OTP authentication and provide marketplace services.
        </p>

        <h3 className="policy-sub-title">2.2 Seller Information</h3>
        <p>If you register as a seller, we may collect:</p>
        <ul className="policy-list">
          <li>Seller or business name.</li>
          <li>Mobile number and email address.</li>
          <li>Business information.</li>
          <li>Bank account details required for seller payouts.</li>
          <li>GSTIN, where voluntarily provided or applicable.</li>
          <li>Product photographs and descriptions.</li>
          <li>Product condition and pricing details.</li>
          <li>Other information necessary to manage seller accounts and transactions.</li>
        </ul>
        <p>
          Seller information is used for seller verification, marketplace operations, payment
          settlements, compliance and customer support.
        </p>

        <h3 className="policy-sub-title">2.3 Buyer Information</h3>
        <p>When you purchase products, we may collect:</p>
        <ul className="policy-list">
          <li>Name and contact details.</li>
          <li>Shipping and delivery address.</li>
          <li>Order details.</li>
          <li>Transaction reference numbers.</li>
          <li>Payment status.</li>
          <li>Order history.</li>
          <li>Customer support and complaint information.</li>
        </ul>
        <p>
          This information helps us process orders, coordinate delivery, manage refunds and provide
          customer support.
        </p>

        <h3 className="policy-sub-title">2.4 Product and Listing Information</h3>
        <p>When sellers upload products, we collect:</p>
        <ul className="policy-list">
          <li>Product images and videos, where supported.</li>
          <li>Product descriptions.</li>
          <li>Product category.</li>
          <li>Product condition.</li>
          <li>Selling price.</li>
          <li>Availability and stock information.</li>
          <li>Related listing information.</li>
        </ul>
        <p>
          This information is displayed on Selliro to enable buyers to discover and purchase
          products.
        </p>
      </section>

      {/* 3 */}
      <section className="policy-section">
        <h2 className="policy-section-title">3. Device Permissions and Information</h2>
        <p>
          Selliro may request access to certain permissions on your device to provide specific app
          features.
        </p>

        <h3 className="policy-sub-title">3.1 Camera</h3>
        <p>
          We may request camera access to allow sellers to capture product photographs and upload
          listings or allow users to submit supporting images for complaints.
        </p>

        <h3 className="policy-sub-title">3.2 Photos and Gallery</h3>
        <p>
          We may request access to photos or media files to allow users to upload product images,
          profile pictures and supporting photographs.
        </p>

        <h3 className="policy-sub-title">3.3 Location</h3>
        <p>
          We may request location access to support delivery-related services, location-based
          functionality and address-related features.
        </p>
        <p>Location access will be subject to your device permission settings.</p>

        <h3 className="policy-sub-title">3.4 Notifications</h3>
        <p>We may send push notifications regarding:</p>
        <ul className="policy-list">
          <li>Order confirmations.</li>
          <li>Order status updates.</li>
          <li>Delivery updates.</li>
          <li>Payment confirmations.</li>
          <li>Seller account updates.</li>
          <li>Important service announcements.</li>
          <li>Promotional messages, where permitted.</li>
        </ul>
        <p>You can manage notification permissions through your device settings.</p>

        <h3 className="policy-sub-title">3.5 Contacts</h3>
        <p>
          If a feature requires contacts access, we may request permission to access the relevant
          contact information for that feature.
        </p>
        <p>
          We will not use contacts information for unrelated purposes or access it without the
          required device permission.
        </p>
        <p>
          You may deny or revoke permissions through your device settings. However, certain features
          may not function without the relevant permission.
        </p>
      </section>

      {/* 4 */}
      <section className="policy-section">
        <h2 className="policy-section-title">4. Payment Information</h2>
        <p>
          Selliro uses third-party payment service providers, including Razorpay, to facilitate
          payments and related transactions.
        </p>
        <p>When you make a payment:</p>
        <ul className="policy-list">
          <li>Your payment may be processed through the payment provider's secure systems.</li>
          <li>
            We may receive transaction IDs, payment status, payment method details and related
            transaction information.
          </li>
          <li>
            Payment processing and sensitive payment credentials are handled in accordance with the
            payment provider's applicable policies.
          </li>
          <li>
            Selliro may use payment-related information to verify transactions, process refunds,
            manage disputes and facilitate seller settlements.
          </li>
        </ul>
        <p>
          We do not intend to collect or store complete card numbers, CVV numbers or internet
          banking passwords on our own systems.
        </p>
        <p>
          Sellers may be required to provide bank account information for receiving eligible
          payouts.
        </p>
        <p>
          Please refer to Razorpay's Privacy Policy for additional information about its data
          practices.
        </p>
      </section>

      {/* 5 */}
      <section className="policy-section">
        <h2 className="policy-section-title">5. How We Use Your Information</h2>
        <p>We collect and process information for the following purposes:</p>
        <ol className="policy-ol">
          <li>Creating and managing buyer and seller accounts.</li>
          <li>Verifying mobile numbers through OTP authentication.</li>
          <li>Enabling product listings and purchases.</li>
          <li>Processing payments and seller payouts.</li>
          <li>Coordinating product pickup and delivery.</li>
          <li>Managing cancellations, returns, refunds and complaints.</li>
          <li>Providing customer support.</li>
          <li>Detecting fraudulent transactions and suspicious activities.</li>
          <li>Improving application performance and user experience.</li>
          <li>Analysing user behaviour and application usage.</li>
          <li>Sending important service-related communications.</li>
          <li>Conducting marketing and promotional activities where permitted.</li>
          <li>Complying with applicable laws and regulatory requirements.</li>
        </ol>
        <p>
          We will not knowingly use personal information for purposes unrelated to the purposes
          disclosed in this policy without an appropriate legal basis.
        </p>
      </section>

      {/* 6 */}
      <section className="policy-section">
        <h2 className="policy-section-title">6. Third-Party Services and Data Sharing</h2>
        <p>
          Selliro works with selected third-party service providers to operate its marketplace.
        </p>
        <p>
          We may share relevant information with the following categories of service providers.
        </p>

        <h3 className="policy-sub-title">6.1 Payment Service Providers</h3>
        <p>
          We use Razorpay and other authorised payment-related service providers, where applicable,
          to facilitate payment processing, refunds and seller settlements.
        </p>

        <h3 className="policy-sub-title">6.2 Delivery and Logistics Partners</h3>
        <p>
          We may share relevant buyer and order information with third-party delivery partners to
          facilitate product pickup and delivery.
        </p>
        <p>This may include:</p>
        <ul className="policy-list">
          <li>Buyer's name.</li>
          <li>Mobile number.</li>
          <li>Delivery address.</li>
          <li>Order identification details.</li>
          <li>Pickup and delivery instructions.</li>
        </ul>
        <p>
          Such information is shared only to the extent reasonably necessary to fulfil the delivery
          service.
        </p>

        <h3 className="policy-sub-title">6.3 Sellers</h3>
        <p>
          To fulfil orders, relevant buyer information, including delivery details and order
          information, may be shared with the seller responsible for the order.
        </p>

        <h3 className="policy-sub-title">6.4 Analytics Services</h3>
        <p>Selliro uses the following analytics and marketing technologies:</p>
        <p>
          <strong>Firebase Analytics and Firebase Crashlytics (Google)</strong>
          <br />
          These services may collect application usage events, device information, diagnostic
          information, crash reports and performance-related data to help us understand application
          performance and improve our services.
        </p>
        <p>
          <strong>Meta SDK (Meta Platforms)</strong>
          <br />
          We may use Meta SDK technologies to measure advertising performance, understand campaign
          effectiveness, attribute app-related events and improve our marketing activities.
          Depending on the SDK configuration and device settings, these services may process device
          identifiers, app events, technical information and advertising-related information.
        </p>
        <p>
          These providers process information under their respective privacy policies and applicable
          terms. Users may manage certain tracking and advertising preferences through their device
          settings and available platform controls.
        </p>

        <h3 className="policy-sub-title">6.5 Legal and Regulatory Authorities</h3>
        <p>
          We may disclose information when required by applicable law, court orders, lawful
          government requests or regulatory obligations.
        </p>

        <h3 className="policy-sub-title">6.6 Business Transfers</h3>
        <p>
          If Selliro undergoes a merger, acquisition, restructuring or transfer of business assets,
          relevant information may be transferred as part of that transaction, subject to applicable
          privacy requirements.
        </p>
        <p>We do not sell users' personal information as a standalone commercial product.</p>
      </section>

      {/* 7 */}
      <section className="policy-section">
        <h2 className="policy-section-title">7. Data Storage and Security</h2>
        <p>
          We take reasonable technical and organisational measures to protect personal information
          against unauthorised access, misuse, alteration, disclosure, loss or destruction.
        </p>
        <p>Our security practices may include:</p>
        <ul className="policy-list">
          <li>Restricted access to personal information.</li>
          <li>Authentication and access controls.</li>
          <li>Secure payment processing through payment providers.</li>
          <li>Appropriate technical safeguards.</li>
          <li>Monitoring and maintenance of application systems.</li>
        </ul>
        <p>
          However, no electronic storage or internet transmission method can be guaranteed to be
          completely secure.
        </p>
        <p>
          Users are responsible for maintaining the confidentiality of their login credentials and
          OTPs.
        </p>
      </section>

      {/* 8 */}
      <section className="policy-section">
        <h2 className="policy-section-title">8. Data Retention</h2>
        <p>We retain personal information only for as long as reasonably necessary to:</p>
        <ul className="policy-list">
          <li>Maintain user accounts.</li>
          <li>Complete orders and transactions.</li>
          <li>Process payments and refunds.</li>
          <li>Manage complaints and disputes.</li>
          <li>Prevent fraud and misuse.</li>
          <li>Comply with applicable legal, tax and accounting requirements.</li>
        </ul>
        <p>
          When information is no longer required, we will take reasonable steps to delete or
          anonymise it, subject to applicable legal obligations and legitimate retention
          requirements.
        </p>
        <p>
          Certain transaction, financial or compliance-related records may need to be retained even
          after an account deletion request.
        </p>
      </section>

      {/* 9 */}
      <section className="policy-section">
        <h2 className="policy-section-title">9. Account Deletion</h2>
        <p>
          Users may request deletion of their Selliro accounts through the account deletion
          functionality available in the application or by contacting us at:
        </p>
        <div className="policy-contact-box">
          <p>
            Email:{" "}
            <a href="mailto:admin@selliro.in">admin@selliro.in</a>
          </p>
        </div>
        <p>
          Upon receiving a valid deletion request, we will take appropriate steps to delete or
          anonymise personal information associated with the account, subject to applicable legal
          retention obligations.
        </p>
        <p>
          Information required for tax records, financial transactions, fraud prevention, pending
          disputes or legal compliance may be retained for the period required by law.
        </p>
        <p>
          Deletion of an account may result in the loss of access to account history, saved
          information and certain marketplace services.
        </p>
      </section>

      {/* 10 */}
      <section className="policy-section">
        <h2 className="policy-section-title">10. User Rights and Choices</h2>
        <p>Subject to applicable laws, users may have the right to:</p>
        <ul className="policy-list">
          <li>Request information about personal data processed by Selliro.</li>
          <li>Request correction of inaccurate or incomplete information.</li>
          <li>Request deletion of personal information where legally permissible.</li>
          <li>Withdraw consent for processing where processing is based on consent.</li>
          <li>Raise privacy-related complaints.</li>
          <li>
            Nominate another individual to exercise applicable rights in certain circumstances.
          </li>
        </ul>
        <p>
          Users may submit privacy-related requests to{" "}
          <a href="mailto:admin@selliro.in">admin@selliro.in</a>.
        </p>
        <p>
          We will verify requests where reasonably necessary and respond in accordance with
          applicable legal requirements.
        </p>
        <p>
          Withdrawing consent may affect our ability to provide certain services or features.
        </p>
      </section>

      {/* 11 */}
      <section className="policy-section">
        <h2 className="policy-section-title">11. Cookies and Website Technologies</h2>
        <p>Our website may use cookies and similar technologies to:</p>
        <ul className="policy-list">
          <li>Maintain website functionality.</li>
          <li>Remember user preferences.</li>
          <li>Improve website performance.</li>
          <li>Understand website traffic.</li>
          <li>Measure marketing effectiveness.</li>
        </ul>
        <p>
          Users may manage cookies through their browser settings. Disabling certain cookies may
          affect website functionality.
        </p>
      </section>

      {/* 12 */}
      <section className="policy-section">
        <h2 className="policy-section-title">12. Third-Party Websites and Services</h2>
        <p>
          Our application and website may contain links to third-party websites, payment services
          or other external platforms.
        </p>
        <p>Selliro does not control the privacy practices of these third parties.</p>
        <p>
          Users are encouraged to review the relevant third-party privacy policies before sharing
          their personal information with them.
        </p>
      </section>

      {/* 13 */}
      <section className="policy-section">
        <h2 className="policy-section-title">13. Children's Privacy</h2>
        <p>Selliro is intended for individuals aged 18 years and above.</p>
        <p>
          We do not knowingly permit individuals under 18 years of age to register or use our
          marketplace services independently.
        </p>
        <p>
          If we become aware that personal information has been collected from an individual under
          18 in circumstances where such collection is not legally permitted, we will take
          appropriate steps to address the issue.
        </p>
      </section>

      {/* 14 */}
      <section className="policy-section">
        <h2 className="policy-section-title">14. Marketing and Promotional Communications</h2>
        <p>
          We may send users service-related notifications, including order updates, payment
          confirmations and important account communications.
        </p>
        <p>
          Where permitted and subject to applicable consent requirements, we may also send
          promotional messages, offers and marketing communications.
        </p>
        <p>
          Users may opt out of promotional communications through available unsubscribe options or
          by contacting <a href="mailto:admin@selliro.in">admin@selliro.in</a>.
        </p>
        <p>
          Opting out of marketing communications will not prevent essential transactional or
          service-related notifications.
        </p>
      </section>

      {/* 15 */}
      <section className="policy-section">
        <h2 className="policy-section-title">15. International Data Processing</h2>
        <p>
          Some of our third-party technology, analytics, payment or infrastructure providers may
          process information through systems located outside India.
        </p>
        <p>
          Where applicable, such processing will be subject to relevant contractual safeguards and
          applicable Indian legal requirements, including restrictions or conditions imposed by the
          Government of India.
        </p>
      </section>

      {/* 16 */}
      <section className="policy-section">
        <h2 className="policy-section-title">16. Changes to This Privacy Policy</h2>
        <p>
          Selliro may update this Privacy Policy from time to time to reflect changes in our
          application, business operations, third-party services or applicable laws.
        </p>
        <p>
          Any revised policy will be published on our website and/or application with an updated
          revision date.
        </p>
        <p>
          Where required by law, we will notify users or obtain fresh consent before implementing
          material changes.
        </p>
      </section>

      {/* 17 */}
      <section className="policy-section">
        <h2 className="policy-section-title">17. Grievance Officer and Privacy Contact</h2>
        <p>
          For questions, complaints, privacy requests or concerns relating to this Privacy Policy,
          users may contact:
        </p>
        <div className="policy-contact-box">
          <p><strong>Grievance Officer:</strong> Hardeep Ramalingam</p>
          <p><strong>Business:</strong> Hardeep Ramalingam, trading as Selliro</p>
          <p>
            <strong>Email:</strong>{" "}
            <a href="mailto:admin@selliro.in">admin@selliro.in</a>
          </p>
          <p><strong>Jurisdiction:</strong> Chennai, Tamil Nadu, India</p>
        </div>
        <p>
          We aim to acknowledge privacy-related complaints within 48 hours and make reasonable
          efforts to resolve them within 30 days, subject to the nature of the complaint and
          applicable legal requirements.
        </p>
      </section>

      {/* 18 */}
      <section className="policy-section">
        <h2 className="policy-section-title">18. Governing Law</h2>
        <p>
          This Privacy Policy shall be governed by and interpreted in accordance with the laws of
          India.
        </p>
        <p>
          Any disputes arising in connection with this Privacy Policy shall be subject to the
          jurisdiction of competent courts in Chennai, Tamil Nadu, to the extent legally
          permissible.
        </p>
      </section>

      {/* 19 */}
      <section className="policy-section">
        <h2 className="policy-section-title">19. Contact Us</h2>
        <p>
          For any questions or concerns regarding this Privacy Policy, please contact:
        </p>
        <div className="policy-contact-box">
          <p><strong>Selliro</strong></p>
          <p>Hardeep Ramalingam</p>
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
        </div>
        <p>Thank you for trusting Selliro.</p>
      </section>
    </PolicyLayout>
  );
}

