import React from 'react';

const Newsletter = () => {
  return (
    <div className="newsletter-section">
      <div className="container">
        <h3>Subscribe to Our Newsletter</h3>
        <p>Get updates on new products and special offers!</p>
        <form className="newsletter-form">
          <input 
            type="email" 
            placeholder="Enter your email" 
            className="newsletter-input"
          />
          <button type="submit" className="newsletter-btn">
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default Newsletter;
