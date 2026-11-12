import PolicyLayout from "./PolicyLayout";

export default function AboutUs() {
  return (
    <PolicyLayout
      title="About Us"
      classification="Company Profile"
      subtitle="Buy Smart. Sell Easy. Reuse More."
    >
      <section>
        <h2>Welcome to Selliro</h2>
        <p>
          Selliro is a multi-vendor recommerce marketplace built to make buying and selling pre-owned
          products easier, more accessible and convenient.
        </p>
        <p>
          We believe that products deserve more than one life. Instead of allowing useful products
          to remain unused, Selliro creates an opportunity for individuals and businesses to sell
          their products and connect with buyers looking for value.
        </p>
      </section>

      <section>
        <h2>What We Do</h2>
        <p>Selliro brings buyers and sellers together on one platform.</p>
        <p>Through our mobile application and website, users can:</p>
        <ul>
          <li>Discover pre-owned products across multiple categories.</li>
          <li>Sell unused or pre-owned products.</li>
          <li>Connect with individual and business sellers.</li>
          <li>Explore affordable alternatives to buying brand-new products.</li>
          <li>Complete purchases through an integrated payment system.</li>
          <li>Get products delivered through our delivery partners.</li>
        </ul>
      </section>

      <section>
        <h2>Our Marketplace</h2>
        <p>Selliro supports multiple product categories, including:</p>
        <ul>
          <li>Mobiles and Electronics</li>
          <li>Fashion and Accessories</li>
          <li>Home and Furniture</li>
          <li>Home Appliances</li>
          <li>Beauty and Personal Care</li>
          <li>Books and Education</li>
          <li>Business and Industrial Products</li>
          <li>Other Pre-owned Products</li>
        </ul>
        <p>Our platform welcomes both individual sellers and business sellers.</p>
      </section>

      <section>
        <h2>How Selliro Works</h2>

        <h3>For Sellers</h3>
        <ol>
          <li>Register on Selliro.</li>
          <li>Upload your product details and photographs.</li>
          <li>Provide accurate product condition and pricing information.</li>
          <li>Receive orders through the marketplace.</li>
          <li>Pack your product for collection.</li>
          <li>Receive your eligible payout according to Selliro's settlement policy.</li>
        </ol>

        <h3>For Buyers</h3>
        <ol>
          <li>Browse products on Selliro.</li>
          <li>Select the product you want.</li>
          <li>Place your order and complete payment.</li>
          <li>The seller prepares the product for dispatch.</li>
          <li>Our delivery partners coordinate collection and delivery.</li>
          <li>Receive your purchase at your delivery address.</li>
        </ol>
      </section>

      <section>
        <h2>Our Mission</h2>
        <p>
          Our mission is to make recommerce a trusted and convenient choice for everyday consumers
          and businesses.
        </p>
        <p>
          We aim to build a marketplace where useful products find new owners, sellers get
          opportunities to earn and buyers get access to value-driven products.
        </p>
      </section>

      <section>
        <h2>Our Vision</h2>
        <p>
          We envision a future where buying pre-owned products becomes as convenient and accessible
          as buying new products.
        </p>
        <p>
          Selliro is building towards a more connected and sustainable marketplace ecosystem.
        </p>
      </section>

      <section>
        <h2>Join the Selliro Community</h2>
        <p>
          Whether you are looking to buy something useful or sell something you no longer need,
          Selliro welcomes you.
        </p>
        <div className="lp-contact-lines">
          <p>
            <strong>SELLIRO – Buy Smart. Sell Easy. Reuse More.</strong>
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
        </div>
      </section>
    </PolicyLayout>
  );
}

