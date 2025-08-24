import React from 'react';

const Testimonials = () => {
  return (
    <div className="testimonials-section">
      <div className="container">
        <h3>What Our Customers Say</h3>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <p>"Amazing service! My dog loves coming here for grooming."</p>
            <span>- Sarah M.</span>
          </div>
          <div className="testimonial-card">
            <p>"Best pet shop in Singapore. Great products and friendly staff."</p>
            <span>- John D.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
