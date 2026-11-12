import PolicyLayout from "./PolicyLayout";

export default function RefundPolicy() {
  return (
    <PolicyLayout
      title="Cancellation & Refund Policy"
      lastUpdated="6 November 2026"
      effectiveDate="6 November 2026"
    >
      {/* 1 */}
      <section className="policy-section">
        <h2 className="policy-section-title">1. Introduction</h2>
        <p>
          At Selliro, we aim to provide buyers and sellers with a smooth and reliable marketplace
          experience.
        </p>
        <p>
          This Cancellation and Refund Policy explains the conditions under which an order may be
          cancelled, a product may be returned and a refund may be issued.
        </p>
        <p>
          This policy applies to purchases made through the Selliro mobile application and website.
        </p>
      </section>

      {/* 2 */}
      <section className="policy-section">
        <h2 className="policy-section-title">2. Order Cancellation by Buyers</h2>

        <h3 className="policy-sub-title">2.1 Cancellation Before Dispatch</h3>
        <p>Buyers may request cancellation of an order before the seller dispatches the product.</p>
        <p>To request cancellation, buyers should:</p>
        <ol className="policy-ol">
          <li>Open the Selliro application.</li>
          <li>Visit their order history.</li>
          <li>Select the relevant order.</li>
          <li>
            Submit a cancellation request through the available option or contact customer support.
          </li>
        </ol>
        <p>
          If the cancellation is approved before dispatch, the eligible amount paid will be
          refunded.
        </p>

        <h3 className="policy-sub-title">2.2 Cancellation After Dispatch</h3>
        <p>
          Once the seller has dispatched the product or it has been handed over to the delivery
          partner, standard cancellation may no longer be available.
        </p>
        <p>
          However, buyers may raise an eligible complaint if the product is damaged, incorrect,
          defective or materially different from its listing.
        </p>
        <p>Such cases will be evaluated under the return and refund process.</p>
      </section>

      {/* 3 */}
      <section className="policy-section">
        <h2 className="policy-section-title">3. Cancellation by Sellers or Selliro</h2>
        <p>An order may need to be cancelled if:</p>
        <ul className="policy-list">
          <li>The seller cannot fulfil the order.</li>
          <li>The product is unavailable.</li>
          <li>The product is found to be incorrectly listed.</li>
          <li>A payment or verification issue prevents fulfilment.</li>
          <li>An operational or legal issue prevents the transaction.</li>
        </ul>
        <p>
          Where an order is cancelled by the seller or Selliro after payment has been collected,
          the eligible amount will be refunded to the buyer.
        </p>
        <p>
          Any cancellation charges, if applicable, will comply with the Consumer Protection
          (E-Commerce) Rules and other applicable laws.
        </p>
      </section>

      {/* 4 */}
      <section className="policy-section">
        <h2 className="policy-section-title">4. Eligible Return and Refund Situations</h2>
        <p>A buyer may request a return or refund review in situations including:</p>
        <ol className="policy-ol">
          <li>
            <strong>Damaged Product:</strong> The product arrives physically damaged.
          </li>
          <li>
            <strong>Wrong Product:</strong> The buyer receives a product different from the product
            ordered.
          </li>
          <li>
            <strong>Materially Not as Described:</strong> The product significantly differs from
            the seller's description or disclosed condition.
          </li>
          <li>
            <strong>Missing Components:</strong> Important accessories or components represented as
            included are missing.
          </li>
          <li>
            <strong>Functional Defect:</strong> The product has a material functional defect that
            was not disclosed in the listing.
          </li>
          <li>
            <strong>Non-Delivery:</strong> The order is not delivered despite payment and the
            applicable delivery process.
          </li>
        </ol>
        <p>
          Each request will be reviewed based on the available evidence, listing details and
          applicable consumer protection requirements.
        </p>
      </section>

      {/* 5 */}
      <section className="policy-section">
        <h2 className="policy-section-title">5. Non-Eligible Return Situations</h2>
        <p>A return request may not ordinarily be accepted solely because:</p>
        <ul className="policy-list">
          <li>The buyer changes their mind after receiving the product.</li>
          <li>The buyer no longer wants the product.</li>
          <li>
            The buyer selected an incorrect product despite the listing being accurate.
          </li>
          <li>
            The product has normal signs of wear that were clearly disclosed in the listing.
          </li>
          <li>
            The buyer dislikes the product's appearance where it matches the disclosed description
            and photographs.
          </li>
        </ul>
        <p>
          These exclusions do not apply where a return, refund or other remedy is required under
          applicable law or where the seller has offered a more generous return policy.
        </p>
      </section>

      {/* 6 */}
      <section className="policy-section">
        <h2 className="policy-section-title">6. 72-Hour Complaint Window</h2>
        <p>Buyers must report eligible product issues within 72 hours of delivery.</p>
        <p>
          To raise a complaint, buyers should contact Selliro through the application or email{" "}
          <a href="mailto:admin@selliro.in">admin@selliro.in</a>.
        </p>
        <p>The complaint should include:</p>
        <ul className="policy-list">
          <li>Order ID.</li>
          <li>Description of the issue.</li>
          <li>Photographs showing the product and packaging.</li>
          <li>Supporting video evidence.</li>
          <li>An unboxing video, wherever reasonably available.</li>
        </ul>
        <p>
          The unboxing video should ideally show the original package, opening process and product
          condition immediately after opening.
        </p>
        <p>
          Buyers should not dispose of the original packaging until the complaint has been reviewed.
        </p>
        <p>
          The 72-hour window is intended to support efficient investigation. It does not waive
          statutory consumer rights or prevent consideration of claims where applicable law provides
          a longer or different remedy.
        </p>
      </section>

      {/* 7 */}
      <section className="policy-section">
        <h2 className="policy-section-title">7. Return Review Process</h2>
        <p>After receiving a complaint:</p>
        <ol className="policy-ol">
          <li>Selliro will register the complaint.</li>
          <li>Our team will review the submitted information.</li>
          <li>Additional photographs, videos or clarification may be requested.</li>
          <li>The seller may be contacted for relevant information.</li>
          <li>The complaint will be evaluated.</li>
          <li>An appropriate resolution will be communicated to the buyer.</li>
        </ol>
        <p>Depending on the circumstances, the resolution may include:</p>
        <ul className="policy-list">
          <li>A refund.</li>
          <li>A replacement, where available and agreed.</li>
          <li>A return and refund.</li>
          <li>Another legally appropriate resolution.</li>
        </ul>
        <p>
          A return must be authorised through the Selliro support process before the buyer sends
          the product back, unless applicable law requires otherwise.
        </p>
      </section>

      {/* 8 */}
      <section className="policy-section">
        <h2 className="policy-section-title">8. Return Shipping and Collection</h2>
        <p>
          Where a return is approved, Selliro will communicate the applicable return procedure.
        </p>
        <p>
          The responsibility for return shipping costs will be determined based on the reason for
          the return, the seller's applicable policy and applicable legal requirements.
        </p>
        <p>
          Buyers must ensure that returned products include the relevant accessories, packaging and
          components, where reasonably required.
        </p>
        <p>
          Products should not be intentionally damaged, altered or misused after delivery.
        </p>
      </section>

      {/* 9 */}
      <section className="policy-section">
        <h2 className="policy-section-title">9. Refund Processing</h2>
        <p>
          Once a refund request is approved, Selliro will initiate the eligible refund through the
          applicable payment method or payment service provider.
        </p>
        <p>
          <strong>Expected refund processing time: 5–10 business days after refund approval.</strong>
        </p>
        <p>
          The actual time taken for the refund to appear in the buyer's account may depend on:
        </p>
        <ul className="policy-list">
          <li>Payment gateway processing.</li>
          <li>Bank processing timelines.</li>
          <li>Card issuer or UPI provider procedures.</li>
          <li>Other payment service provider requirements.</li>
        </ul>
        <p>
          Refunds will generally be credited through the original payment method, where supported.
        </p>
        <p>
          If a refund is delayed beyond the expected period, buyers may contact{" "}
          <a href="mailto:admin@selliro.in">admin@selliro.in</a> with their order ID and payment
          reference.
        </p>
      </section>

      {/* 10 */}
      <section className="policy-section">
        <h2 className="policy-section-title">10. Refund Amount</h2>
        <p>
          The refund amount will be determined based on the order and the approved resolution.
        </p>
        <p>Where applicable, the refund may include:</p>
        <ul className="policy-list">
          <li>The product amount paid.</li>
          <li>Applicable delivery charges, where refundable.</li>
          <li>Other charges that must legally be refunded.</li>
        </ul>
        <p>
          Any deductions or exclusions will be communicated and will be subject to applicable law.
        </p>
        <p>
          Where an order is cancelled because the seller cannot fulfil it or Selliro cannot provide
          the purchased service, the buyer will receive the applicable full refund.
        </p>
      </section>

      {/* 11 */}
      <section className="policy-section">
        <h2 className="policy-section-title">11. Seller Payouts and Pending Complaints</h2>
        <p>
          Seller payouts are subject to successful fulfilment and completion of the applicable
          complaint window.
        </p>
        <p>
          Selliro aims to process eligible seller payouts within two business days after the 72-hour
          complaint window closes, provided there is no pending eligible complaint, dispute, payment
          issue or other lawful reason for withholding the relevant amount.
        </p>
        <p>
          If a complaint is raised within the applicable period, the relevant settlement may be
          held until the complaint is reviewed and resolved.
        </p>
      </section>

      {/* 12 */}
      <section className="policy-section">
        <h2 className="policy-section-title">12. Delivery Failures</h2>
        <p>
          If a delivery attempt fails because of an incorrect address, unavailable recipient or
          other buyer-related delivery issue, Selliro or its delivery partner may coordinate another
          delivery attempt where available.
        </p>
        <p>
          If an order is returned to the seller or delivery origin, the case will be reviewed to
          determine the appropriate resolution.
        </p>
        <p>
          Any applicable delivery or return charges will be handled in accordance with the
          disclosed terms and applicable law.
        </p>
      </section>

      {/* 13 */}
      <section className="policy-section">
        <h2 className="policy-section-title">13. Fraudulent or Misuse-Related Claims</h2>
        <p>Selliro may investigate suspicious or fraudulent refund and return requests.</p>
        <p>Where appropriate, we may request additional information and supporting evidence.</p>
        <p>
          Any action taken will comply with applicable consumer protection requirements and shall
          not be used to deny legitimate claims unfairly.
        </p>
      </section>

      {/* 14 */}
      <section className="policy-section">
        <h2 className="policy-section-title">14. How to Request a Cancellation or Refund</h2>
        <p>For cancellation, return or refund assistance, contact:</p>
        <div className="policy-contact-box">
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
        <p>Please include:</p>
        <ul className="policy-list">
          <li>Your registered name.</li>
          <li>Order ID.</li>
          <li>Registered mobile number or email.</li>
          <li>Reason for the request.</li>
          <li>Supporting photographs or videos, where applicable.</li>
        </ul>
      </section>

      {/* 15 */}
      <section className="policy-section">
        <h2 className="policy-section-title">15. Grievance Redressal</h2>
        <p>
          For unresolved cancellation, refund or return complaints, contact:
        </p>
        <div className="policy-contact-box">
          <p><strong>Grievance Officer:</strong> Hardeep Ramalingam</p>
          <p><strong>Business:</strong> Hardeep Ramalingam, trading as Selliro</p>
          <p>
            <strong>Email:</strong>{" "}
            <a href="mailto:admin@selliro.in">admin@selliro.in</a>
          </p>
        </div>
        <p>
          We aim to acknowledge complaints within 48 hours and resolve them within 30 days, subject
          to applicable law.
        </p>
      </section>

      {/* 16 */}
      <section className="policy-section">
        <h2 className="policy-section-title">16. Policy Updates</h2>
        <p>
          Selliro may update this policy from time to time to reflect changes in business
          operations, payment systems, delivery arrangements or applicable laws.
        </p>
        <p>
          The latest version will be published on{" "}
          <a href="https://selliro.in" target="_blank" rel="noopener noreferrer">
            https://selliro.in
          </a>
          .
        </p>
      </section>

      {/* 17 */}
      <section className="policy-section">
        <h2 className="policy-section-title">17. Applicable Law</h2>
        <p>
          This policy shall be interpreted in accordance with the laws of India, including
          applicable consumer protection and e-commerce regulations.
        </p>
        <p>
          Nothing in this policy is intended to restrict any consumer right or remedy that cannot
          legally be excluded.
        </p>
      </section>
    </PolicyLayout>
  );
}

