import React, { useState } from "react";
import "./style.css";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(email);

    if (isValidEmail) {
      setIsSubmitted(true);
    } else {
    }
  };

  return (
    <footer className="footer-container">
      <div className="footer-header">
        {isSubmitted ? (
          <p>Thank You!</p>
        ) : (
          <>
            <h4>SIGN UP</h4>
            <p>Get Exclusive Promotions, Coupons, and the Latest Events</p>
            <form onSubmit={handleSubmit} className="email-input">
              <input
                type="email"
                placeholder="Enter Your E-mail"
                value={email}
                onChange={handleEmailChange}
              />
              <button type="submit">Subscribe</button>
            </form>
          </>
        )}
      </div>
      <div className="footer-section">
        <h4>GET HELP</h4>
        <ul>
          <li>Frequently Asked Questions</li>
          <li>Order Status</li>
          <li>Returns</li>
        </ul>
      </div>

      <div className="footer-section">
        <h4>LEGAL & PRIVACY</h4>
        <ul>
          <li>CA Privacy Rights</li>
          <li>CA Transparency Act</li>
          <li>Conditions of Use</li>
          <li>Privacy Policy</li>
        </ul>
      </div>

      <div className="footer-section">
        <h4>ABOUT US</h4>
        <ul>
          <li>Accessibility</li>
          <li>Affiliates</li>
          <li>Careers</li>
          <li>Find a Store</li>
          <li>Investors</li>
        </ul>
      </div>

      <div className="copyright-section">
        <img
          src="/images/GameGoText.png"
          style={{ width: "200px" }}
          alt="Copyright Image"
        />
        <p>©2023 Game Go</p>
      </div>
    </footer>
  );
};

export default Footer;
