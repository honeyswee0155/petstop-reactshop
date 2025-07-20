import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-4 pb-3 mt-5">
      <div className="container text-center">
        <img 
          src="/images/petstop-logo.png" 
          alt="PetStop Logo" 
          style={{ width: '120px', marginBottom: '1rem' }} 
        />
        <p className="mb-2">© {new Date().getFullYear()} PetStop Singapore. All rights reserved.</p>
        <div className="d-flex justify-content-center gap-3">
          <a href="/about.html" className="text-white text-decoration-none">About</a>
          <a href="/contact.html" className="text-white text-decoration-none">Contact</a>
          <a href="/privacy" className="text-white text-decoration-none">Privacy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
