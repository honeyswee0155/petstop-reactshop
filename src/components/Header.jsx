import React from 'react';
import { Link } from 'react-router-dom'; // ✅ Important: Import Link

const Header = () => (
  <>
    {/* Top Bar */}
    <div className="top-bar py-2">
      <div className="container d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center gap-3">
          <span><i className="fas fa-phone-alt"></i> Call us at <span className="highlight">6281-2271</span></span>
          <span className="divider">|</span>
          <a href="https://maps.google.com" target="_blank" rel="noreferrer">
            <i className="fas fa-map-marker-alt"></i> 800 Upper Serangoon Road
          </a>
        </div>
        <a href="/login" className="auth-link"><i className="fas fa-user"></i> Login</a>
      </div>
    </div>

    {/* Navbar */}
    <nav className="navbar navbar-expand-lg navbar-light bg-white sticky-top shadow-sm py-3">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img 
            src={process.env.PUBLIC_URL + '/petstop-logo.jpg'}
            alt="PetStop" 
            className="logo"
            style={{ height: '80px', width: 'auto' }}
          />
        </Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/booking">Book Appointment</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/"><i className="fas fa-shopping-bag"></i> Shop</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </>
);

export default Header;
